import { SectionHeading } from "@/components/SectionHeading";
import { processSteps } from "@/data/site";

export const metadata = { title: "How It Works" };

export default function HowItWorksPage() {
  return (
    <section className="section bg-white">
      <div className="container-wide">
        <SectionHeading eyebrow="How It Works" title="Concierge-style review, from intake to final documentation." text="The process is intentionally calm and document-forward, with no promise of approval or funding." />
        <div className="mt-16 grid gap-8 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <article key={step.title} className="border-t border-gold/45 pt-6">
              <p className="font-serif text-6xl text-gold-light">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-5 font-serif text-3xl text-navy">{step.title}</h2>
              <p className="mt-4 text-sm leading-7 text-charcoal/70">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
