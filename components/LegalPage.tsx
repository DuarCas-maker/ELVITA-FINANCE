export function LegalPage({ title, sections }: { title: string; sections: string[][] }) {
  return (
    <section className="section bg-ivory">
      <div className="container-wide max-w-4xl">
        <p className="border border-gold/40 bg-white/70 px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
          DRAFT — FOR LEGAL REVIEW BEFORE PRODUCTION.
        </p>
        <h1 className="mt-10 font-serif text-6xl font-medium text-navy">{title}</h1>
        <p className="mt-4 text-sm text-charcoal/60">Last updated: August 24, 2026</p>
        <div className="mt-12 grid gap-10">
          {sections.map(([heading, body]) => (
            <section key={heading} className="border-t border-gold/30 pt-7">
              <h2 className="font-serif text-3xl text-navy">{heading}</h2>
              <p className="mt-4 text-sm leading-7 text-charcoal/72">{body}</p>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
