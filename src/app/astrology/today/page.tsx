import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/site";
import AstrologyTodayGrid from "@/components/AstrologyTodayGrid";

export const metadata: Metadata = buildPageMetadata({
  title: "Today - Astrology",
  description:
    "A daily reading for all twelve signs - the horoscope that refuses to forecast, and hands back a mirror instead. Rotates every day.",
  path: "/astrology/today",
});

export default function AstrologyTodayPage() {
  return (
    <div className="min-h-screen px-6 pt-24 pb-24 md:pt-32">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-kicker tracking-display text-gold/80 uppercase mb-4 animate-slide-up">
          The Daily Mirror
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-text-primary tracking-tight leading-display mb-5 animate-slide-up">
          Today, for{" "}
          <span className="text-gold glow-text-subtle">every sign</span>
        </h1>
        <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl font-light mb-12 animate-slide-up delay-100">
          A horoscope that can&apos;t see your Tuesday and won&apos;t pretend to.
          Each sign gets an omen that winks at the form and a turn that asks
          something real instead — rotated fresh every day, the same for everyone,
          predicting nothing.{" "}
          <Link href="/astrology/about" className="underline decoration-gold/50 underline-offset-4 hover:text-gold transition-colors">
            Why we read it this way.
          </Link>
        </p>

        <div className="animate-slide-up delay-200">
          <AstrologyTodayGrid />
        </div>
      </div>
    </div>
  );
}
