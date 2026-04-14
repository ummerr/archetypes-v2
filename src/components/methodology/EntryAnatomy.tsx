import ConfidenceBadge from "@/components/shared/ConfidenceBadge";

interface Field {
  key: string;
  label: string;
  value: string;
  tone: "primary" | "scholarly" | "dissent" | "adversarial" | "editorial";
}

const EXAMPLE_FIELDS: Field[] = [
  {
    key: "primarySourceCitation",
    label: "Primary source",
    value: "Moore & Gillette, King Warrior Magician Lover (1990), ch. 3-4",
    tone: "primary",
  },
  {
    key: "scholarlyCitation",
    label: "Scholarship",
    value: "Edinger, Ego and Archetype (1972)",
    tone: "scholarly",
  },
  {
    key: "dissent",
    label: "Dissent",
    value:
      "Moore restricted KWML to mature masculine; gender-neutral use erases stated scope.",
    tone: "dissent",
  },
  {
    key: "adversarialNote",
    label: "Adversarial note",
    value:
      "Family-resemblance across four different theories of authority - not structural convergence.",
    tone: "adversarial",
  },
  {
    key: "editorialNote",
    label: "Editorial note",
    value: "The King is centered blessing, not dominating power.",
    tone: "editorial",
  },
];

const TONE_COLOR: Record<Field["tone"], string> = {
  primary: "#D4AF37",
  scholarly: "#8C7A4A",
  dissent: "#D4828F",
  adversarial: "#C0392B",
  editorial: "#1B9E6B",
};

export default function EntryAnatomy() {
  return (
    <figure
      role="img"
      aria-label="Anatomy of a grounded resonance entry showing its six fields"
      className="my-10"
    >
      <div className="border border-gold/30 rounded-sm bg-surface/40">
        <header className="p-5 md:p-6 border-b border-gold/20">
          <div className="flex items-baseline justify-between gap-3 mb-2">
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-gold/70">
              kwml / the-king
            </p>
            <ConfidenceBadge tier="canonical" />
          </div>
          <h3 className="font-serif text-xl md:text-2xl font-medium text-text-primary mb-1">
            The King
          </h3>
          <p className="font-serif italic text-[14px] text-text-secondary/85">
            &ldquo;Fullness - the blessing centered self.&rdquo;
          </p>
          <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-text-secondary/50 mt-2">
            In the <span className="text-gold/70">Sovereign</span> cluster
          </p>
        </header>
        <dl className="divide-y divide-text-secondary/10">
          {EXAMPLE_FIELDS.map((f) => (
            <div
              key={f.key}
              className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-6 p-4 md:px-6 md:py-4"
            >
              <dt className="flex flex-col gap-1">
                <span
                  className="font-mono text-[9px] tracking-[0.3em] uppercase"
                  style={{ color: TONE_COLOR[f.tone] }}
                >
                  {f.label}
                </span>
                <code className="font-mono text-[10px] text-text-secondary/45 truncate">
                  {f.key}
                </code>
              </dt>
              <dd className="font-serif text-[14px] leading-[1.6] text-text-primary/90">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <figcaption className="font-mono text-[9px] tracking-[0.25em] uppercase text-text-secondary/50 mt-3">
        Fig. 4 - Every mapping carries citation, dissent, adversarial, and editorial fields.
      </figcaption>
    </figure>
  );
}
