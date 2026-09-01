import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left"
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">{eyebrow}</p> : null}
      <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-navy sm:text-5xl">{title}</h2>
      {text ? <p className="mt-5 text-base leading-8 text-charcoal/72">{text}</p> : null}
    </div>
  );
}
