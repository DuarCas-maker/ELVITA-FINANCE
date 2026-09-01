"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navigation } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gold/20 bg-ivory/95 backdrop-blur-xl">
      <div className="container-wide flex min-h-20 items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-4 no-underline" aria-label="ELVITA FINANCE home">
          <span className="flex h-11 w-11 items-center justify-center border border-gold/50 bg-navy text-sm font-semibold tracking-[0.18em] text-gold-light">
            EF
          </span>
          <span className="font-serif text-2xl tracking-[0.16em] text-navy">ELVITA</span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-charcoal/75 no-underline hover:text-gold">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/apply" className="btn-secondary hidden px-5 py-2.5 lg:inline-flex">
          Apply Now
        </Link>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center border border-gold/40 text-navy lg:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-gold/20 bg-ivory px-5 py-6 lg:hidden">
          <nav className="flex flex-col gap-5" aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="text-base text-charcoal no-underline">
                {item.label}
              </Link>
            ))}
            <Link href="/apply" onClick={() => setOpen(false)} className="btn-primary">
              Apply Now
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
