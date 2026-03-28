import PageTransition from "@/components/PageTransition";
import QuadrantMap from "@/components/QuadrantMap";

export default function Home() {
  return (
    <PageTransition>
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16">
        {/* Background ambient radial */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold/[0.02] blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto">
          {/* Hero text */}
          <div className="text-center mb-8 md:mb-4">
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted mb-4">
              Moore &amp; Gillette
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-medium text-text-primary mb-5 tracking-tight leading-[1.1]">
              The Archetypes of the{" "}
              <span className="text-gold">Mature Masculine</span>
            </h1>
            <p className="text-text-secondary text-base md:text-lg max-w-lg mx-auto leading-relaxed">
              Four archetypal energies, each with a fullness and two shadow
              poles. A map of the psyche.
            </p>
          </div>

          {/* Quadrant map */}
          <QuadrantMap />
        </div>

        {/* Bottom hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted/60">
            Select an archetype to begin
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
