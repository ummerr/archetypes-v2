import Link from "next/link";
import { SYSTEM_BLIND_SPOTS, type SystemId } from "@/data/resonance";

interface Props {
  system: SystemId;
  className?: string;
}

export default function BlindSpotsSection({ system, className = "" }: Props) {
  const text = SYSTEM_BLIND_SPOTS[system];
  if (!text) return null;
  return (
    <section className={`mt-16 border-t border-surface-light/30 pt-10 ${className}`}>
      <p className="font-mono text-label tracking-kicker uppercase text-amber-500/80 mb-3">
        Limitations
      </p>
      <h2 className="font-serif text-xl font-medium mb-3">What this system does not see well</h2>
      <p className="font-serif text-body italic leading-relaxed text-text-secondary/85 max-w-2xl">
        {text}
      </p>
      <p className="mt-4 font-mono text-label tracking-kicker uppercase text-muted/70">
        <Link href="/about/methodology" className="underline underline-offset-2 hover:text-gold">
          How the map handles blind spots →
        </Link>
      </p>
    </section>
  );
}
