import Link from "next/link";

interface Props {
  slug: string;
}

// Shown when decodeResultPath returns null. The brief asks for a graceful
// "the slug you opened cannot be read" page — a ceremonial dead end, not a
// 404 shout. Serif italic, single hair-rule, two quiet exits.
export default function UnreadableSlug({ slug }: Props) {
  const preview = slug.length > 32 ? `${slug.slice(0, 32)}…` : slug;
  return (
    <section className="text-center">
      <p className="font-mono text-kicker tracking-display uppercase text-muted/70 mb-6">
        Unreadable
      </p>
      <h1 className="font-serif text-h1 leading-display mb-6">
        The slug you opened
        <br />
        <span className="italic text-text-secondary/80">cannot be read.</span>
      </h1>

      <svg
        viewBox="0 0 160 2"
        width="160"
        height="2"
        className="mx-auto my-8 text-gold/70 block"
        aria-hidden
      >
        <line
          x1="0"
          y1="1"
          x2="160"
          y2="1"
          stroke="currentColor"
          strokeWidth={1}
          strokeOpacity={0.55}
        />
      </svg>

      <p className="font-serif italic text-body-lg text-text-secondary/80 leading-article max-w-prose mx-auto mb-4">
        Either the code was truncated in transit, or it was cast under a version
        of the reading that is no longer on the shelf.
      </p>
      <code className="font-mono text-label text-muted/55 break-all block mb-12">
        /quiz/r/{preview}
      </code>

      <div className="flex flex-wrap items-center justify-center gap-6">
        <Link
          href="/quiz"
          className="font-mono text-label tracking-kicker uppercase border border-gold/70 px-6 py-3 rounded-sm text-gold transition-all duration-500 hover:bg-gold/10 hover:border-gold shadow-[0_0_18px_rgba(212,175,55,0.14)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
        >
          Cast a fresh reading &rarr;
        </Link>
        <Link
          href="/mirror"
          className="font-serif italic text-body text-text-secondary hover:text-gold transition-colors"
        >
          Back to the Mirror &rarr;
        </Link>
      </div>
    </section>
  );
}
