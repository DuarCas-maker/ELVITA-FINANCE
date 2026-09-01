import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { brand } from "@/data/site";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="section bg-ivory">
      <div className="container-wide grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading eyebrow="Contact" title="Request a private conversation with a funding specialist." text="Use the application for formal intake, or contact the concierge desk for a preliminary conversation." />
        <div className="border border-gold/30 bg-white/60 p-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <a href={`mailto:${brand.email}`} className="group border-t border-gold/40 pt-6 no-underline">
              <Mail className="text-gold" aria-hidden />
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">Email</p>
              <p className="mt-2 text-lg text-navy group-hover:text-gold">{brand.email}</p>
            </a>
            <a href={`tel:${brand.phone}`} className="group border-t border-gold/40 pt-6 no-underline">
              <Phone className="text-gold" aria-hidden />
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">Phone</p>
              <p className="mt-2 text-lg text-navy group-hover:text-gold">{brand.phone}</p>
            </a>
          </div>
          <Link href="/apply" className="btn-primary mt-10">Begin Application</Link>
        </div>
      </div>
    </section>
  );
}
