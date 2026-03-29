import Link from "next/link";
import { FAMILIES } from "@/data/archetypes";
import { ArchetypeFamily } from "@/types/archetype";
import BlobHero from "@/components/BlobHero";
import ArchetypeSymbol from "@/components/ArchetypeSymbol";

/**
 * Each archetype card gets a unique container shape via clip-path,
 * border treatment, and a watermark symbol.
 */
const CARD_SHAPES: Record<
  ArchetypeFamily,
  { clipPath: string; borderExtra: string }
> = {
  // King: regal, structured — notched top corners like battlements
  king: {
    clipPath:
      "polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%, 0 8px)",
    borderExtra: "border-t-2",
  },
  // Warrior: angular, aggressive — slashed corner
  warrior: {
    clipPath:
      "polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%)",
    borderExtra: "border-l-2",
  },
  // Magician: faceted, crystalline — diamond-cut corners
  magician: {
    clipPath:
      "polygon(14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px), 0 14px)",
    borderExtra: "border-b-2",
  },
  // Lover: soft, organic — fully rounded
  lover: {
    clipPath: "none",
    borderExtra: "border-r-2",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen px-6 pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted mb-4">
            Moore &amp; Gillette
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-text-primary tracking-tight leading-[1.1] mb-6">
            Archetypes of the{" "}
            <span className="text-gold">Mature Masculine</span>
          </h1>
          <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl">
            Four primal energy patterns shape the masculine psyche — boy within
            man, shadow within light.
          </p>
        </div>

        {/* Blob */}
        <div className="relative w-full aspect-square max-w-md mx-auto mb-16 md:mb-20">
          <BlobHero />
        </div>

        {/* Archetype grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {FAMILIES.map((family) => {
            const shape = CARD_SHAPES[family.id];
            return (
              <Link
                key={family.id}
                href={`/archetype/${family.man.slug}`}
                className={`group relative p-6 md:p-8 overflow-hidden border transition-all duration-500 hover:border-opacity-60 ${shape.borderExtra} ${family.id === "lover" ? "rounded-3xl" : "rounded-lg"}`}
                style={{
                  borderColor: `${family.color}20`,
                  background: `linear-gradient(145deg, ${family.color}08 0%, transparent 60%)`,
                  clipPath: shape.clipPath !== "none" ? shape.clipPath : undefined,
                }}
              >
                {/* Hover glow line at top */}
                <div
                  className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${family.color}40, transparent)`,
                  }}
                />

                {/* Watermark symbol — large, subtle, positioned bottom-right */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 md:w-40 md:h-40 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none">
                  <ArchetypeSymbol
                    archetype={family.id}
                    color={family.color}
                    className="w-full h-full"
                  />
                </div>

                {/* Archetype icon + title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    <ArchetypeSymbol
                      archetype={family.id}
                      color={family.color}
                      className="w-full h-full"
                    />
                  </div>
                  <h2
                    className="font-serif text-2xl md:text-3xl font-medium tracking-tight"
                    style={{ color: family.color }}
                  >
                    {family.label}
                  </h2>
                </div>

                <p className="text-sm text-text-secondary/70 leading-relaxed mb-6 line-clamp-2 relative z-10">
                  {family.man.description.split(".")[0]}.
                </p>

                <div className="flex items-center gap-3 text-xs relative z-10">
                  <span className="text-muted">{family.boy.name}</span>
                  <span className="flex items-center gap-1 text-muted/40">
                    <span className="w-4 h-px bg-current" />
                    <svg width="6" height="8" viewBox="0 0 6 8" fill="none">
                      <path d="M1 1L5 4L1 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span style={{ color: family.color }}>{family.man.name}</span>
                </div>

                {/* Arrow on hover */}
                <div className="absolute top-6 right-6 md:top-8 md:right-8 text-muted/0 group-hover:text-muted/50 transition-all duration-300 group-hover:translate-x-0.5 z-10">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
