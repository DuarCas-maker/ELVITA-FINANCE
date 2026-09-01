"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="section min-h-[70vh] bg-ivory">
      <div className="container-wide max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Error</p>
        <h1 className="mt-4 font-serif text-5xl text-navy">Something interrupted the experience.</h1>
        <p className="mt-5 text-charcoal/70">Please try again, or return to the application when ready.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={reset} className="btn-primary">Try Again</button>
          <Link href="/" className="btn-secondary">Return Home</Link>
        </div>
      </div>
    </section>
  );
}
