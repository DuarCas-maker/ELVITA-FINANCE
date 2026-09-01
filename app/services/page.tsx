import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { fundingValues, services } from "@/data/site";

export const metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <section className="section bg-ivory">
      <div className="container-wide">
        <SectionHeading eyebrow="Services" title="Business funding categories configured for responsible presentation." text={fundingValues.note} />
        <div className="mt-14 grid gap-10">
          {services.map((service) => (
            <article key={service.title} className="grid gap-6 border-t border-gold/35 py-8 lg:grid-cols-[0.4fr_0.8fr_0.8fr]">
              <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{service.eyebrow}</p><h2 className="mt-3 font-serif text-4xl text-navy">{service.title}</h2></div>
              <p className="text-base leading-8 text-charcoal/72">{service.description}</p>
              <div><p className="font-serif text-3xl text-navy">{service.amount}</p><p className="mt-4 text-sm leading-7 text-charcoal/65">{service.considerations}</p></div>
            </article>
          ))}
        </div>
        <Link href="/apply" className="btn-primary mt-8">Start Application <ArrowRight size={17} aria-hidden /></Link>
      </div>
    </section>
  );
}
