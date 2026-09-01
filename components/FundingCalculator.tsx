"use client";

import { Calculator } from "lucide-react";
import { useMemo, useState } from "react";
import { calculatePayment, formatCurrency, getAnnualRate } from "@/lib/utils";

export function FundingCalculator({ compact = false }: { compact?: boolean }) {
  const [amount, setAmount] = useState(250000);
  const [term, setTerm] = useState(18);
  const [frequency, setFrequency] = useState<"Monthly" | "Weekly">("Monthly");
  const annualRate = getAnnualRate();
  const result = useMemo(() => calculatePayment(amount, term, frequency, annualRate), [amount, term, frequency, annualRate]);

  return (
    <section className={compact ? "section bg-ivory" : "section bg-ivory"}>
      <div className="container-wide">
        <div className="grid gap-8 border border-gold/30 bg-white/55 p-6 shadow-premium lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div className="border-b border-gold/25 pb-8 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Illustrative Estimate</p>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-navy sm:text-5xl">
              A quiet view into possible payment structure.
            </h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/72">
              The demo annual rate is read from <span className="font-semibold">NEXT_PUBLIC_DEMO_ANNUAL_INTEREST_RATE</span>. It is a configuration value, not a published or promised rate.
            </p>
          </div>
          <div className="grid gap-6">
            <div>
              <label className="label" htmlFor="funding-amount">Funding Amount</label>
              <input id="funding-amount" className="field" type="number" min="1000" step="1000" value={amount} onChange={(event) => setAmount(Number(event.target.value))} />
            </div>
            <div>
              <label className="label" htmlFor="term">Term</label>
              <select id="term" className="field" value={term} onChange={(event) => setTerm(Number(event.target.value))}>
                {[6, 9, 12, 18, 24, 36, 48, 60].map((months) => <option key={months} value={months}>{months} months</option>)}
              </select>
            </div>
            <fieldset>
              <legend className="label">Payment Frequency</legend>
              <div className="grid grid-cols-2 border border-gold/30">
                {(["Monthly", "Weekly"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] ${frequency === option ? "bg-navy text-white" : "bg-white/50 text-charcoal hover:bg-gold-light/20"}`}
                    onClick={() => setFrequency(option)}
                    aria-pressed={frequency === option}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="bg-navy p-7 text-white">
              <div className="flex items-center gap-3 text-gold-light">
                <Calculator size={20} aria-hidden />
                <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                  Estimated {frequency === "Monthly" ? "Monthly" : "Weekly"} Payment
                </p>
              </div>
              <p className="mt-5 font-serif text-5xl text-white">{formatCurrency(result.payment)}</p>
              <p className="mt-3 text-sm text-white/65">
                {result.numberOfPayments} payments using a configured annual demo rate of {(annualRate * 100).toFixed(2)}%.
              </p>
            </div>
            <p className="text-xs leading-6 text-charcoal/62">
              This calculator provides an illustrative estimate only and does not constitute an offer, approval, commitment, or final financing terms. Actual terms may vary.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
