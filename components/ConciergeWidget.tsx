import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function ConciergeWidget() {
  return (
    <aside className="fixed bottom-5 right-5 z-50 hidden max-w-[280px] border border-gold/40 bg-ivory/95 p-4 shadow-premium backdrop-blur md:block">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold/40 bg-navy text-gold-light">
          <MessageCircle size={18} aria-hidden />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Concierge</p>
          <p className="mt-1 text-sm font-semibold text-navy">Speak With a Funding Specialist</p>
          <Link href="/contact" className="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.14em] text-charcoal underline">
            Request a private call
          </Link>
        </div>
      </div>
    </aside>
  );
}
