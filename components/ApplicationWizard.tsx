"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, FileUp, Loader2, Send } from "lucide-react";
import { disclosures, entityTypes, brand } from "@/data/site";
import { statesAndTerritories } from "@/data/states";
import { buildPayload, OwnerFields, serializeFiles } from "@/lib/application";
import { formatEin, formatSsn, isAdultDob } from "@/lib/utils";
import { SignatureCanvas } from "@/components/SignatureCanvas";

type Errors = Record<string, string>;
type HasSecondOwner = "Yes" | "No" | "";

const maxFileSize = 10 * 1024 * 1024;
const einPattern = /^\d{2}-\d{7}$/;
const ssnPattern = /^\d{3}-\d{2}-\d{4}$/;

const emptyOwner: OwnerFields = {
  firstName: "",
  lastName: "",
  ownerEmail: "",
  ssn: "",
  dateOfBirth: "",
  cellPhone: "",
  ownerAddress: "",
  ownerCity: "",
  ownerState: "",
  ownerZip: "",
  ownershipPercentage: ""
};

const emptyBusiness = {
  legalCompanyName: "",
  entityType: "",
  federalTaxId: "",
  stateOfIncorporation: "",
  businessInceptionDate: "",
  businessAddress: "",
  businessCity: "",
  businessState: "",
  businessZip: ""
};

const steps = ["Business", "Primary Owner", "Second Owner", "Documents", "Review"];

export function ApplicationWizard() {
  const [step, setStep] = useState(0);
  const [business, setBusiness] = useState(emptyBusiness);
  const [primaryOwner, setPrimaryOwner] = useState<OwnerFields>(emptyOwner);
  const [hasSecondOwner, setHasSecondOwner] = useState<HasSecondOwner>("");
  const [secondOwner, setSecondOwner] = useState<OwnerFields>(emptyOwner);
  const [bankFiles, setBankFiles] = useState<File[]>([]);
  const [taxFiles, setTaxFiles] = useState<File[]>([]);
  const [signatureDataUrl, setSignatureDataUrl] = useState("");
  const [disclosureAccepted, setDisclosureAccepted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [submissionId, setSubmissionId] = useState("");

  const ownerTotal = useMemo(() => {
    return Number(primaryOwner.ownershipPercentage || 0) + (hasSecondOwner === "Yes" ? Number(secondOwner.ownershipPercentage || 0) : 0);
  }, [primaryOwner.ownershipPercentage, secondOwner.ownershipPercentage, hasSecondOwner]);

  function updateBusiness(key: keyof typeof emptyBusiness, value: string) {
    setBusiness((current) => ({ ...current, [key]: value }));
  }

  function updateOwner(which: "primary" | "second", key: keyof OwnerFields, value: string) {
    const setter = which === "primary" ? setPrimaryOwner : setSecondOwner;
    setter((current) => ({ ...current, [key]: value }));
  }

  function validateFiles(files: File[], kind: "bank" | "tax") {
    if (!files.length) return kind === "bank" ? "Last 4 months of bank statements are required." : "Business Tax Return is required.";
    const allowed = kind === "bank" ? ["application/pdf", "image/jpeg", "image/jpg", "image/png"] : ["application/pdf"];
    const invalid = files.find((file) => file.size > maxFileSize || !allowed.includes(file.type));
    if (!invalid) return "";
    return kind === "bank"
      ? "Bank statements must be PDF, JPG, JPEG or PNG and 10MB or less each."
      : "Business tax return files must be PDFs and 10MB or less each.";
  }

  function validate(targetStep = step) {
    const next: Errors = {};
    if (targetStep === 0) {
      if (!business.legalCompanyName.trim()) next.legalCompanyName = "Legal Company Name is required.";
      if (!business.entityType) next.entityType = "Entity Type is required.";
      if (!einPattern.test(business.federalTaxId)) next.federalTaxId = "Federal Tax ID must use format 12-3456789.";
      if (!business.stateOfIncorporation) next.stateOfIncorporation = "State of Incorporation is required.";
      if (!business.businessInceptionDate) next.businessInceptionDate = "Business Inception Date is required.";
    }
    if (targetStep === 1) validateOwner(primaryOwner, next, "");
    if (targetStep === 1 && !hasSecondOwner) next.hasSecondOwner = "Select Yes or No.";
    if (targetStep === 2 && hasSecondOwner === "Yes") validateOwner(secondOwner, next, "second");
    if ((targetStep === 1 || targetStep === 2) && ownerTotal > 100) next.ownershipTotal = "Owner 1 percentage + Owner 2 percentage must be 100 or less.";
    if (targetStep === 3) {
      const bankError = validateFiles(bankFiles, "bank");
      const taxError = validateFiles(taxFiles, "tax");
      if (bankError) next.bankStatements = bankError;
      if (taxError) next.businessTaxReturn = taxError;
      if (!signatureDataUrl.startsWith("data:image/png;base64,")) next.signatureDataUrl = "Owner 1 signature is required.";
      if (!disclosureAccepted) next.disclosureAccepted = "Disclosure acceptance is required.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function validateOwner(owner: OwnerFields, next: Errors, prefix: "second" | "") {
    const label = prefix ? "Second owner" : "Owner";
    if (!owner.firstName.trim()) next[`${prefix}firstName`] = `${label} first name is required.`;
    if (!owner.lastName.trim()) next[`${prefix}lastName`] = `${label} last name is required.`;
    if (!ssnPattern.test(owner.ssn)) next[`${prefix}ssn`] = "SSN must use format 123-45-6789.";
    if (!isAdultDob(owner.dateOfBirth)) next[`${prefix}dateOfBirth`] = "DOB must not be in the future and owner must be 18+.";
    if (!owner.ownershipPercentage || Number(owner.ownershipPercentage) < 0 || Number(owner.ownershipPercentage) > 100) {
      next[`${prefix}ownershipPercentage`] = "Ownership Percentage is required and must be between 0 and 100.";
    }
  }

  function nextStep() {
    if (!validate(step)) return;
    if (step === 1 && hasSecondOwner === "No") setStep(3);
    else setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function backStep() {
    if (step === 3 && hasSecondOwner === "No") setStep(1);
    else setStep((current) => Math.max(current - 1, 0));
  }

  function filesFrom(event: ChangeEvent<HTMLInputElement>, setter: (files: File[]) => void) {
    setter(Array.from(event.target.files || []));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    const requiredSteps = [0, 1, hasSecondOwner === "Yes" ? 2 : -1, 3].filter((item) => item >= 0);
    if (!requiredSteps.every((item) => validate(item))) {
      setStep(0);
      return;
    }
    setStatus("submitting");
    try {
      const [bankStatements, businessTaxReturn] = await Promise.all([serializeFiles(bankFiles), serializeFiles(taxFiles)]);
      const payload = buildPayload({
        business,
        primaryOwner,
        hasSecondOwner: hasSecondOwner || "No",
        secondOwner: hasSecondOwner === "Yes" ? secondOwner : null,
        bankStatements,
        businessTaxReturn,
        disclosureAccepted,
        signatureDataUrl
      });

      await fetch(brand.webhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: JSON.stringify(payload)
      });
      setSubmissionId(payload.submissionId);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-gold/30 bg-white/70 p-8 shadow-premium">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Submitted</p>
        <h2 className="mt-4 font-serif text-5xl text-navy">Your application has been sent.</h2>
        <p className="mt-5 text-charcoal/70">
          Because the submission uses no-cors, the browser cannot expose the webhook HTTP status. The request completed and the n8n execution log is the source of truth.
        </p>
        <p className="mt-5 border-l border-gold/40 pl-4 font-semibold text-navy">Submission ID: {submissionId}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[260px_1fr_330px]">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <ol className="grid gap-4 border-l border-gold/30 pl-5">
          {steps.map((item, index) => (
            <li key={item} className={index === step ? "text-navy" : index < step ? "text-gold" : "text-charcoal/45"}>
              <button type="button" className="text-left" onClick={() => index < step && setStep(index)} disabled={index > step}>
                <span className="block text-xs font-semibold uppercase tracking-[0.18em]">Step {index + 1}</span>
                <span className="mt-1 block font-serif text-2xl">{item}</span>
              </button>
            </li>
          ))}
        </ol>
      </aside>
      <div className="border border-gold/30 bg-white/65 p-6 lg:p-8">
        {step === 0 ? <BusinessStep business={business} updateBusiness={updateBusiness} errors={errors} /> : null}
        {step === 1 ? <OwnerStep owner={primaryOwner} update={(key, value) => updateOwner("primary", key, value)} hasSecondOwner={hasSecondOwner} setHasSecondOwner={setHasSecondOwner} errors={errors} /> : null}
        {step === 2 ? <SecondOwnerStep owner={secondOwner} update={(key, value) => updateOwner("second", key, value)} hasSecondOwner={hasSecondOwner} errors={errors} /> : null}
        {step === 3 ? (
          <DocumentsStep
            bankFiles={bankFiles}
            taxFiles={taxFiles}
            signatureDataUrl={signatureDataUrl}
            disclosureAccepted={disclosureAccepted}
            setSignatureDataUrl={setSignatureDataUrl}
            setDisclosureAccepted={setDisclosureAccepted}
            onBank={(event) => filesFrom(event, setBankFiles)}
            onTax={(event) => filesFrom(event, setTaxFiles)}
            errors={errors}
          />
        ) : null}
        {step === 4 ? <ReviewStep business={business} primaryOwner={primaryOwner} hasSecondOwner={hasSecondOwner} ownerTotal={ownerTotal} bankFiles={bankFiles} taxFiles={taxFiles} /> : null}
        {errors.ownershipTotal ? <p className="error-text">{errors.ownershipTotal}</p> : null}
        {status === "error" ? <p className="error-text">The application could not be prepared or sent. Please review the files and try again.</p> : null}
        <div className="mt-10 flex flex-col gap-3 border-t border-gold/25 pt-6 sm:flex-row sm:justify-between">
          <button type="button" className="btn-secondary" onClick={backStep} disabled={step === 0 || status === "submitting"}><ArrowLeft size={17} aria-hidden /> Back</button>
          {step < steps.length - 1 ? (
            <button type="button" className="btn-primary" onClick={nextStep}>Continue <ArrowRight size={17} aria-hidden /></button>
          ) : (
            <button type="submit" className="btn-primary" disabled={status === "submitting"}>
              {status === "submitting" ? <Loader2 size={17} className="animate-spin" aria-hidden /> : <Send size={17} aria-hidden />}
              Submit Application
            </button>
          )}
        </div>
      </div>
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="border border-gold/30 bg-navy p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">Application Summary</p>
          <Summary label="Company" value={business.legalCompanyName || "Not entered"} />
          <Summary label="Owner" value={`${primaryOwner.firstName} ${primaryOwner.lastName}`.trim() || "Not entered"} />
          <Summary label="Second Owner" value={hasSecondOwner || "Not selected"} />
          <Summary label="Ownership Total" value={`${ownerTotal || 0}%`} />
          <Summary label="Bank Statements" value={`${bankFiles.length} file(s)`} />
          <Summary label="Tax Return" value={`${taxFiles.length} file(s)`} />
        </div>
      </aside>
    </form>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return <div className="mt-5 border-t border-gold/25 pt-4"><p className="text-xs uppercase tracking-[0.16em] text-white/45">{label}</p><p className="mt-1 text-white/86">{value}</p></div>;
}

function Error({ name, errors }: { name: string; errors: Errors }) {
  return errors[name] ? <p className="error-text">{errors[name]}</p> : null;
}

function StateSelect({ id, label, value, onChange, required, errors }: { id: string; label: string; value: string; onChange: (value: string) => void; required?: boolean; errors: Errors }) {
  return (
    <div>
      <label className="label" htmlFor={id}>{label}{required ? " *" : ""}</label>
      <select id={id} className="field" value={value} onChange={(event) => onChange(event.target.value)} required={required}>
        <option value="">Select</option>
        {statesAndTerritories.map((state) => <option key={state.code} value={state.code}>{state.name}</option>)}
      </select>
      <Error name={id} errors={errors} />
    </div>
  );
}

function TextInput({ id, label, value, onChange, errors, required, type = "text" }: { id: string; label: string; value: string; onChange: (value: string) => void; errors: Errors; required?: boolean; type?: string }) {
  return <div><label className="label" htmlFor={id}>{label}{required ? " *" : ""}</label><input id={id} className="field" type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} /><Error name={id} errors={errors} /></div>;
}

function BusinessStep({ business, updateBusiness, errors }: { business: typeof emptyBusiness; updateBusiness: (key: keyof typeof emptyBusiness, value: string) => void; errors: Errors }) {
  return <section><StepHeader eyebrow="Business" title="Company identity" /><div className="mt-8 grid gap-6 sm:grid-cols-2">
    <TextInput id="legalCompanyName" label="Legal Company Name" value={business.legalCompanyName} onChange={(value) => updateBusiness("legalCompanyName", value)} errors={errors} required />
    <div><label className="label" htmlFor="entityType">Entity Type *</label><select id="entityType" className="field" value={business.entityType} onChange={(event) => updateBusiness("entityType", event.target.value)} required><option value="">Select</option>{entityTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select><Error name="entityType" errors={errors} /></div>
    <TextInput id="federalTaxId" label="Federal Tax ID" value={business.federalTaxId} onChange={(value) => updateBusiness("federalTaxId", formatEin(value))} errors={errors} required />
    <StateSelect id="stateOfIncorporation" label="State of Incorporation" value={business.stateOfIncorporation} onChange={(value) => updateBusiness("stateOfIncorporation", value)} errors={errors} required />
    <TextInput id="businessInceptionDate" label="Business Inception Date" type="date" value={business.businessInceptionDate} onChange={(value) => updateBusiness("businessInceptionDate", value)} errors={errors} required />
    <TextInput id="businessAddress" label="Business Address" value={business.businessAddress} onChange={(value) => updateBusiness("businessAddress", value)} errors={errors} />
    <TextInput id="businessCity" label="Business City" value={business.businessCity} onChange={(value) => updateBusiness("businessCity", value)} errors={errors} />
    <StateSelect id="businessState" label="Business State / Province" value={business.businessState} onChange={(value) => updateBusiness("businessState", value)} errors={errors} />
    <TextInput id="businessZip" label="Business ZIP / Postal Code" value={business.businessZip} onChange={(value) => updateBusiness("businessZip", value)} errors={errors} />
  </div></section>;
}

function OwnerStep({ owner, update, hasSecondOwner, setHasSecondOwner, errors }: { owner: OwnerFields; update: (key: keyof OwnerFields, value: string) => void; hasSecondOwner: HasSecondOwner; setHasSecondOwner: (value: HasSecondOwner) => void; errors: Errors }) {
  return <section><StepHeader eyebrow="Primary Owner" title="Owner 1 details" /><OwnerFieldsGrid owner={owner} update={update} errors={errors} prefix="" required /><div className="mt-6"><label className="label" htmlFor="hasSecondOwner">Is there a 2nd Owner? *</label><select id="hasSecondOwner" className="field" value={hasSecondOwner} onChange={(event) => setHasSecondOwner(event.target.value as HasSecondOwner)} required><option value="">Select</option><option value="Yes">Yes</option><option value="No">No</option></select><Error name="hasSecondOwner" errors={errors} /></div></section>;
}

function SecondOwnerStep({ owner, update, hasSecondOwner, errors }: { owner: OwnerFields; update: (key: keyof OwnerFields, value: string) => void; hasSecondOwner: HasSecondOwner; errors: Errors }) {
  if (hasSecondOwner !== "Yes") return <section><StepHeader eyebrow="Second Owner" title="No second owner selected" /><p className="mt-6 text-charcoal/70">This section will be sent as secondOwner: null.</p></section>;
  return <section><StepHeader eyebrow="Second Owner" title="Owner 2 details" /><OwnerFieldsGrid owner={owner} update={update} errors={errors} prefix="second" required /></section>;
}

function OwnerFieldsGrid({ owner, update, errors, prefix, required }: { owner: OwnerFields; update: (key: keyof OwnerFields, value: string) => void; errors: Errors; prefix: "second" | ""; required?: boolean }) {
  return <div className="mt-8 grid gap-6 sm:grid-cols-2">
    <TextInput id={`${prefix}firstName`} label="First Name" value={owner.firstName} onChange={(value) => update("firstName", value)} errors={errors} required={required} />
    <TextInput id={`${prefix}lastName`} label="Last Name" value={owner.lastName} onChange={(value) => update("lastName", value)} errors={errors} required={required} />
    <TextInput id={`${prefix}ownerEmail`} label={prefix ? "Email" : "Owner Email"} type="email" value={owner.ownerEmail} onChange={(value) => update("ownerEmail", value)} errors={errors} />
    <TextInput id={`${prefix}ssn`} label="SSN" value={owner.ssn} onChange={(value) => update("ssn", formatSsn(value))} errors={errors} required={required} />
    <TextInput id={`${prefix}dateOfBirth`} label="Date of Birth" type="date" value={owner.dateOfBirth} onChange={(value) => update("dateOfBirth", value)} errors={errors} required={required} />
    <TextInput id={`${prefix}cellPhone`} label="Cell Phone" value={owner.cellPhone} onChange={(value) => update("cellPhone", value)} errors={errors} />
    <TextInput id={`${prefix}ownerAddress`} label="Address" value={owner.ownerAddress} onChange={(value) => update("ownerAddress", value)} errors={errors} />
    <TextInput id={`${prefix}ownerCity`} label="City" value={owner.ownerCity} onChange={(value) => update("ownerCity", value)} errors={errors} />
    <StateSelect id={`${prefix}ownerState`} label="State / Province" value={owner.ownerState} onChange={(value) => update("ownerState", value)} errors={errors} />
    <TextInput id={`${prefix}ownerZip`} label="ZIP / Postal Code" value={owner.ownerZip} onChange={(value) => update("ownerZip", value)} errors={errors} />
    <TextInput id={`${prefix}ownershipPercentage`} label="Ownership Percentage" type="number" value={owner.ownershipPercentage} onChange={(value) => update("ownershipPercentage", value)} errors={errors} required={required} />
  </div>;
}

function DocumentsStep({ bankFiles, taxFiles, signatureDataUrl, disclosureAccepted, setSignatureDataUrl, setDisclosureAccepted, onBank, onTax, errors }: { bankFiles: File[]; taxFiles: File[]; signatureDataUrl: string; disclosureAccepted: boolean; setSignatureDataUrl: (value: string) => void; setDisclosureAccepted: (value: boolean) => void; onBank: (event: ChangeEvent<HTMLInputElement>) => void; onTax: (event: ChangeEvent<HTMLInputElement>) => void; errors: Errors }) {
  return <section><StepHeader eyebrow="Documents & Signature" title="Secure intake materials" /><div className="mt-8 grid gap-8">
    <div className="border border-line bg-ivory/70 p-5"><label className="label" htmlFor="bankStatements">Last 4 months of bank statements *</label><input id="bankStatements" className="field bg-white" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" onChange={onBank} /><p className="mt-3 flex gap-2 text-sm text-charcoal/60"><FileUp size={16} aria-hidden /> PDF, JPG, JPEG, or PNG. 10MB each.</p><FileList files={bankFiles} /><Error name="bankStatements" errors={errors} /></div>
    <div className="border border-line bg-ivory/70 p-5"><label className="label" htmlFor="businessTaxReturn">Business Tax Return *</label><input id="businessTaxReturn" className="field bg-white" type="file" multiple accept=".pdf,application/pdf" onChange={onTax} /><p className="mt-3 flex gap-2 text-sm text-charcoal/60"><FileUp size={16} aria-hidden /> PDF only. 10MB each.</p><FileList files={taxFiles} /><Error name="businessTaxReturn" errors={errors} /></div>
    <div className="grid gap-4 border border-line bg-ivory/70 p-5 text-sm leading-7 text-charcoal/78">{disclosures.map((text) => <p key={text}>{text}</p>)}<label className="mt-2 flex gap-3 text-sm font-semibold text-navy"><input type="checkbox" className="mt-1 h-4 w-4 accent-gold" checked={disclosureAccepted} onChange={(event) => setDisclosureAccepted(event.target.checked)} />I accept the disclosures above.</label><Error name="disclosureAccepted" errors={errors} /></div>
    <SignatureCanvas value={signatureDataUrl} onChange={setSignatureDataUrl} error={errors.signatureDataUrl} />
  </div></section>;
}

function FileList({ files }: { files: File[] }) {
  if (!files.length) return null;
  return <ul className="mt-3 grid gap-2 text-xs text-charcoal/65">{files.map((file) => <li key={`${file.name}-${file.lastModified}`}>{file.name} - {(file.size / 1024 / 1024).toFixed(2)}MB</li>)}</ul>;
}

function ReviewStep({ business, primaryOwner, hasSecondOwner, ownerTotal, bankFiles, taxFiles }: { business: typeof emptyBusiness; primaryOwner: OwnerFields; hasSecondOwner: HasSecondOwner; ownerTotal: number; bankFiles: File[]; taxFiles: File[] }) {
  const rows = [
    ["Company", business.legalCompanyName],
    ["Entity Type", business.entityType],
    ["Federal Tax ID", business.federalTaxId],
    ["Primary Owner", `${primaryOwner.firstName} ${primaryOwner.lastName}`.trim()],
    ["Has Second Owner", hasSecondOwner],
    ["Ownership Total", `${ownerTotal}%`],
    ["Bank Statements", `${bankFiles.length} file(s)`],
    ["Business Tax Return", `${taxFiles.length} file(s)`]
  ];
  return <section><StepHeader eyebrow="Review" title="Confirm before submission" /><div className="mt-8 grid gap-4">{rows.map(([label, value]) => <div key={label} className="grid gap-2 border-t border-gold/20 pt-4 sm:grid-cols-[220px_1fr]"><span className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">{label}</span><span className="text-charcoal/78">{value || "Not provided"}</span></div>)}</div><p className="mt-8 flex gap-2 text-sm text-charcoal/65"><Check size={17} aria-hidden /> Optional values are sent as empty strings rather than omitted.</p></section>;
}

function StepHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <header><p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">{eyebrow}</p><h2 className="mt-3 font-serif text-4xl text-navy sm:text-5xl">{title}</h2></header>;
}
