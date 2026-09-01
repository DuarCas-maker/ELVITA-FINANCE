import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FundingCalculator } from "@/components/FundingCalculator";
import { SectionHeading } from "@/components/SectionHeading";
import { fundingValues, photography, processSteps, sampleTestimonials, services } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <section className="editorial-grid bg-ivory px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="container-wide grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Private U.S. Business Funding</p>
            <h1 className="mt-6 font-serif text-6xl font-medium leading-[0.95] text-navy sm:text-7xl lg:text-8xl">
              Capital conversations for companies built with intention.
            </h1>
            <div className="mt-8 grid gap-6 border-l border-gold/45 pl-6 sm:grid-cols-3">
              <Stat value={fundingValues.heroRange} label="Placeholder funding" />
              <Stat value={fundingValues.terms} label="Configured terms" />
              <Stat value={fundingValues.review} label="Review timing" />
            </div>
            <p className="mt-7 max-w-2xl text-base leading-8 text-charcoal/75">{fundingValues.note}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/services" className="btn-secondary">Explore Funding <ArrowRight size={17} aria-hidden /></Link>
              <Link href="/apply" className="btn-primary">Apply Now <ArrowRight size={17} aria-hidden /></Link>
            </div>
          </div>
          <div className="grid grid-cols-[0.72fr_1fr] gap-4">
            <img src={photography.detail} alt="Business documents and financial review materials" className="mt-20 hidden h-[520px] w-full border border-gold/30 object-cover p-3 sm:block" />
            <img src={photography.hero} alt="Entrepreneurs in a sophisticated business meeting" className="h-[560px] w-full border border-gold/30 object-cover p-3 sm:h-[680px]" />
          </div>
        </div>
      </section>

      <section className="section bg-navy text-white">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <p className="font-serif text-4xl leading-tight text-gold-light">Private Funding Introduction</p>
          <div className="grid gap-8 sm:grid-cols-2">
            <p className="text-lg leading-9 text-white/76">Elvita Finance is shaped for owners who want a more composed funding experience: clear intake, thoughtful review and careful presentation of available options.</p>
            <p className="text-lg leading-9 text-white/76">The tone is deliberately advisory. No public promise replaces underwriting, documentation or final agreement.</p>
          </div>
        </div>
      </section>

      <section className="section bg-ivory">
        <div className="container-wide">
          <SectionHeading eyebrow="Funding Categories" title="Configured options without exaggerated promises." text="Each category uses editable placeholders for amounts, pricing, timing and qualification language." />
          <div className="mt-14 grid gap-8 lg:grid-cols-4">
            {services.map((service) => <ServiceIntro key={service.title} {...service} />)}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-wide grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow="Concierge Process" title="A measured path from intake to funding review." text="Designed for founders and operators who prefer precision over pressure." />
          <div className="grid gap-0 border-y border-gold/30">
            {processSteps.map((step, index) => (
              <div key={step.title} className="grid gap-5 border-b border-gold/20 py-8 last:border-b-0 sm:grid-cols-[90px_1fr]">
                <span className="font-serif text-5xl text-gold-light">{String(index + 1).padStart(2, "0")}</span>
                <div><h3 className="font-serif text-3xl text-navy">{step.title}</h3><p className="mt-3 text-sm leading-7 text-charcoal/70">{step.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FundingCalculator compact />

      <section className="section bg-ivory">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-center">
          <img src={photography.meeting} alt="Business owners reviewing funding options in a refined meeting room" className="h-[440px] w-full border border-gold/30 object-cover p-3" />
          <blockquote className="border-l border-gold/50 pl-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Sample Testimonial</p>
            <p className="mt-5 font-serif text-4xl leading-tight text-navy sm:text-5xl">“{sampleTestimonials[0].quote}”</p>
            <footer className="mt-7 text-sm text-charcoal/65">{sampleTestimonials[0].name}, {sampleTestimonials[0].company}</footer>
          </blockquote>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-wide grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="About Elvita" title="Boutique in posture. Practical in process." text="Elvita Finance is presented as a private funding desk for U.S. businesses, pairing polished intake with responsible funding language and configurable commercial terms." />
            <Link href="/about" className="btn-secondary mt-9">Learn About Elvita <ArrowRight size={17} aria-hidden /></Link>
          </div>
          <img src={photography.office} alt="Sophisticated business office interior" className="h-[440px] w-full object-cover" />
        </div>
      </section>

      <section className="section bg-navy text-white">
        <div className="container-wide grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <h2 className="max-w-3xl font-serif text-5xl font-medium leading-tight sm:text-6xl">Begin with clarity before capital enters the conversation.</h2>
          <Link href="/apply" className="btn-primary border-gold-light bg-gold-light text-navy hover:border-white hover:bg-white">Apply Now</Link>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div><p className="font-serif text-3xl text-navy">{value}</p><p className="mt-1 text-xs uppercase tracking-[0.16em] text-charcoal/55">{label}</p></div>;
}

function ServiceIntro({ eyebrow, title, amount, description }: { eyebrow: string; title: string; amount: string; description: string }) {
  return <article className="border-t border-gold/45 pt-6"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{eyebrow}</p><h3 className="mt-4 font-serif text-3xl text-navy">{title}</h3><p className="mt-3 text-sm font-semibold text-charcoal">{amount}</p><p className="mt-5 text-sm leading-7 text-charcoal/70">{description}</p></article>;
}
