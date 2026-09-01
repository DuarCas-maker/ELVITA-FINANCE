import { SectionHeading } from "@/components/SectionHeading";
import { photography } from "@/data/site";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <section className="section bg-ivory">
      <div className="container-wide grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:items-center">
        <div>
          <SectionHeading eyebrow="About" title="A private funding experience for deliberate operators." text="Elvita Finance is designed for U.S. business owners who want funding guidance delivered with discretion, organization and restrained clarity." />
          <div className="mt-10 grid gap-6 border-t border-gold/30 pt-8 text-sm leading-7 text-charcoal/72 sm:grid-cols-2">
            <p>Our application experience keeps sensitive information in memory until submission and avoids browser persistence for SSN, EIN, signatures and uploaded documents.</p>
            <p>All commercial terms, amount ranges and review timelines are configurable placeholders until verified by business and legal stakeholders.</p>
          </div>
        </div>
        <img src={photography.office} alt="Refined business office used for private advisory meetings" className="h-[560px] w-full border border-gold/30 object-cover p-3" />
      </div>
    </section>
  );
}
