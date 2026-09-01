import Link from "next/link";
import { brand, legalLinks, navigation } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-navy px-5 py-14 text-white sm:px-8 lg:px-12">
      <div className="container-wide">
        <div className="grid gap-10 border-b border-gold/30 pb-12 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-serif text-4xl tracking-[0.12em] text-gold-light">ELVITA</p>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/70">{brand.description}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">Firm</p>
            <div className="mt-5 grid gap-3">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-white/72 no-underline hover:text-gold-light">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">Legal</p>
            <div className="mt-5 grid gap-3">
              {legalLinks.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-white/72 no-underline hover:text-gold-light">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-8 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {brand.legalName}. All rights reserved.</p>
          <p>Business funding information is illustrative and subject to underwriting and final documentation.</p>
        </div>
      </div>
    </footer>
  );
}
