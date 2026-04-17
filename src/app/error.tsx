"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-kicker tracking-display text-crimson-light uppercase mb-6">
        Something fractured
      </p>
      <h1 className="font-serif text-4xl md:text-6xl font-medium text-text-primary tracking-tight leading-display mb-6">
        An unexpected shadow crossed the field.
      </h1>
      <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-xl font-light mb-10">
        The page couldn&rsquo;t finish rendering. Try again, or wander back to
        the index.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="font-mono text-label tracking-kicker uppercase text-gold border border-gold/30 hover:bg-gold/10 px-4 py-2 rounded-sm transition-colors"
        >
          Try again
        </button>
        <Link
          href="/archetypes"
          className="font-mono text-label tracking-kicker uppercase text-muted hover:text-text-secondary px-4 py-2 transition-colors"
        >
          Return to the index
        </Link>
      </div>
    </div>
  );
}
