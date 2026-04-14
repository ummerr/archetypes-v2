import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-[9px] tracking-[0.4em] text-gold/80 uppercase mb-6">
        404 · Off the Map
      </p>
      <h1 className="font-serif text-5xl md:text-7xl font-medium text-text-primary tracking-tight leading-[1.05] mb-6">
        This path is not yet charted.
      </h1>
      <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-xl font-light mb-10">
        The archetype you&rsquo;re looking for may have moved, or the link may
        be mistaken. Return to the index to find your way back.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/archetypes"
          className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold border border-gold/30 hover:bg-gold/10 px-4 py-2 rounded-sm transition-colors"
        >
          Browse the Index
        </Link>
        <Link
          href="/"
          className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted hover:text-text-secondary px-4 py-2 transition-colors"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
