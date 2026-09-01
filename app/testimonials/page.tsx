import { SectionHeading } from "@/components/SectionHeading";
import { sampleTestimonials } from "@/data/site";

export const metadata = { title: "Testimonials" };

export default function TestimonialsPage() {
  return (
    <section className="section bg-ivory">
      <div className="container-wide">
        <SectionHeading eyebrow="Testimonials" title="Sample testimonials awaiting verified client stories." text="All testimonial content on this page is placeholder content and visibly labeled until replaced by verified testimonials." />
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {sampleTestimonials.map((testimonial) => (
            <blockquote key={testimonial.company} className="border-t border-gold/45 pt-6">
              <p className="inline-flex border border-gold/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gold">{testimonial.label}</p>
              <p className="mt-6 font-serif text-3xl leading-tight text-navy">“{testimonial.quote}”</p>
              <footer className="mt-6 text-sm leading-6 text-charcoal/65">{testimonial.name}<br />{testimonial.company}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
