interface Props {
  variant?: "banner" | "inline" | "footnote";
  className?: string;
}

const COPY: Record<NonNullable<Props["variant"]>, string> = {
  banner:
    "A hermeneutic atlas - six vocabularies side-by-side. Where authors made explicit connections, we cite them. Where we infer, we say so. Where practitioners disagree, both sides are shown. Mirrors to try on, not a claim about the structure of psyche.",
  inline:
    "Mirrors to try on, not a diagnosis. Where we infer, we say so.",
  footnote:
    "This is a comparative reading, not a universal claim. See /about/methodology.",
};

export default function HermeneuticCaveat({ variant = "banner", className = "" }: Props) {
  const text = COPY[variant];
  if (variant === "footnote") {
    return (
      <p className={`font-mono text-[10px] tracking-[0.2em] uppercase text-muted/70 ${className}`}>
        {text}
      </p>
    );
  }
  if (variant === "inline") {
    return (
      <p className={`font-serif text-sm italic text-text-secondary/75 ${className}`}>{text}</p>
    );
  }
  return (
    <aside
      className={`border-l-2 border-gold/40 pl-4 py-2 font-serif text-[15px] italic text-text-secondary/85 leading-relaxed max-w-2xl ${className}`}
    >
      {text}
    </aside>
  );
}
