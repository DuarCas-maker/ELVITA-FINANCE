import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section min-h-[70vh] bg-ivory">
      <div className="container-wide max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">404</p>
        <h1 className="mt-4 font-serif text-6xl text-navy">This page is outside the portfolio.</h1>
        <p className="mt-5 text-charcoal/70">The address may have changed, or the page may not exist.</p>
        <Link href="/" className="btn-primary mt-8">Return Home</Link>
      </div>
    </section>
  );
}
