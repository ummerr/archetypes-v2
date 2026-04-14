import Link from "next/link";

interface Props {
  parent: "kwml" | "heros-journey";
  className?: string;
}

const INTRO: Record<Props["parent"], string> = {
  kwml:
    "Moore & Gillette authored KWML for mature men and restricted it explicitly to that audience. The feminine quaternio was supplied separately by Bolen, Stone, and others. These are not appendices - they are first-class parallel maps.",
  "heros-journey":
    "Campbell's monomyth has sustained folklorist and feminist critique. Murdock's Heroine's Journey (1990) offers a structurally different arc; Bolen and Estés extend the mythic vocabulary beyond Campbell's frame. Read alongside, not under.",
};

const REFS = [
  { label: "Murdock - The Heroine's Journey (1990)", note: "Feminist structural alternative to Campbell" },
  { label: "Bolen - Goddesses in Everywoman (1984)", note: "The feminine quaternio" },
  { label: "Estés - Women Who Run With the Wolves (1992)", note: "The wild feminine" },
  { label: "Brewster - African Americans and Jungian Psychology (2020)", note: "Racial Complex; cited on /about/jungian" },
];

export default function CounterCanonLinks({ parent, className = "" }: Props) {
  return (
    <aside
      className={`mt-12 mb-4 rounded-sm border border-gold/20 bg-gold/[0.03] p-5 md:p-6 ${className}`}
    >
      <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-gold/80 mb-3">
        Counter-canon
      </p>
      <p className="font-serif text-[15px] leading-relaxed text-text-secondary/90 italic mb-4 max-w-2xl">
        {INTRO[parent]}
      </p>
      <ul className="space-y-1.5 mb-4">
        {REFS.map((r) => (
          <li key={r.label} className="text-sm text-text-secondary/80">
            <span className="font-serif italic">{r.label}</span>
            <span className="text-muted/70"> - {r.note}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/about/counter-canon"
        className="inline-block font-mono text-[10px] tracking-[0.3em] uppercase text-gold hover:text-gold/80 underline underline-offset-4 decoration-1"
      >
        Read the counter-canon →
      </Link>
    </aside>
  );
}
