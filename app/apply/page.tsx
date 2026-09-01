import { ApplicationWizard } from "@/components/ApplicationWizard";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata = { title: "Apply" };

export default function ApplyPage() {
  return (
    <section className="section bg-ivory">
      <div className="container-wide">
        <SectionHeading eyebrow="Application" title="A private 5-step business funding application." text="Sensitive values are prepared in browser memory for direct webhook submission and are not stored in browser localStorage, sessionStorage or cookies by this application." />
        <div className="mt-12"><ApplicationWizard /></div>
      </div>
    </section>
  );
}
