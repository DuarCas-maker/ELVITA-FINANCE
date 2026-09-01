export default function Loading() {
  return (
    <div className="section min-h-[60vh] bg-ivory">
      <div className="container-wide">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Loading</p>
        <div className="mt-6 h-1 w-40 overflow-hidden bg-gold/20"><div className="h-full w-1/2 animate-pulse bg-gold" /></div>
      </div>
    </div>
  );
}
