import { commercialConfig, disclosures } from "@/data/site";
import { fileToBase64, generateSubmissionId } from "@/lib/utils";

export type DocumentPayload = {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  contentBase64: string;
};

export type OwnerFields = {
  firstName: string;
  lastName: string;
  ownerEmail: string;
  ssn: string;
  dateOfBirth: string;
  cellPhone: string;
  ownerAddress: string;
  ownerCity: string;
  ownerState: string;
  ownerZip: string;
  ownershipPercentage: string;
};

export async function serializeFiles(files: File[]): Promise<DocumentPayload[]> {
  return Promise.all(
    files.map(async (file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      contentBase64: await fileToBase64(file)
    }))
  );
}

export function normalizeOwner(owner: OwnerFields) {
  const firstName = owner.firstName.trim();
  const lastName = owner.lastName.trim();
  return {
    ownerName: `${firstName} ${lastName}`.trim(),
    firstName,
    lastName,
    ownerEmail: owner.ownerEmail.trim(),
    ssn: owner.ssn.trim(),
    dateOfBirth: owner.dateOfBirth,
    cellPhone: owner.cellPhone.trim(),
    ownerAddress: owner.ownerAddress.trim(),
    ownerCity: owner.ownerCity.trim(),
    ownerState: owner.ownerState,
    ownerZip: owner.ownerZip.trim(),
    ownershipPercentage: owner.ownershipPercentage.trim()
  };
}

export function buildPayload(args: {
  business: Record<string, string>;
  primaryOwner: OwnerFields;
  hasSecondOwner: "Yes" | "No";
  secondOwner: OwnerFields | null;
  bankStatements: DocumentPayload[];
  businessTaxReturn: DocumentPayload[];
  disclosureAccepted: boolean;
  signatureDataUrl: string;
}) {
  const submissionId = generateSubmissionId(commercialConfig.formId);
  const submittedAt = new Date().toISOString();
  const primary = normalizeOwner(args.primaryOwner);
  const secondOwner = args.hasSecondOwner === "Yes" && args.secondOwner ? normalizeOwner(args.secondOwner) : null;

  const application = {
    formId: commercialConfig.formId,
    commercialName: commercialConfig.COMMERCIAL_NAME,
    commercialEmail: commercialConfig.COMMERCIAL_EMAIL,
    commercialIdentifier: commercialConfig.COMMERCIAL_IDENTIFIER,
    status: commercialConfig.status,
    submittedAt,
    submissionId,
    ...args.business,
    ...primary,
    hasSecondOwner: args.hasSecondOwner,
    secondOwner,
    documents: {
      bankStatements: args.bankStatements,
      businessTaxReturn: args.businessTaxReturn
    },
    disclosures,
    disclosureAccepted: args.disclosureAccepted,
    signatureDataUrl: args.signatureDataUrl
  };

  return {
    action: commercialConfig.action,
    company: commercialConfig.company,
    payloadFormat: commercialConfig.payloadFormat,
    source: commercialConfig.source,
    submissionId,
    submittedAt,
    status: commercialConfig.status,
    commercial: {
      formId: commercialConfig.formId,
      name: commercialConfig.COMMERCIAL_NAME,
      email: commercialConfig.COMMERCIAL_EMAIL,
      identifier: commercialConfig.COMMERCIAL_IDENTIFIER
    },
    application
  };
}
