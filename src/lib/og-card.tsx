import { ImageResponse } from "next/og";

export type OgFormat = "wide" | "square";

const SIZES: Record<OgFormat, { width: number; height: number }> = {
  wide: { width: 1200, height: 630 },
  square: { width: 1080, height: 1080 },
};

export const ogContentType = "image/png";

// Back-compat: the site's per-archetype opengraph-image.tsx files consume ogSize
// to export Next.js metadata. Default to the wide format.
export const ogSize = SIZES.wide;

async function loadFont(url: string): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export interface OgResonance {
  system: string;
  name: string;
  accent: string;
}

export async function renderOgCard(opts: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  accent: string;
  resonances?: OgResonance[];
  format?: OgFormat;
}) {
  const { eyebrow, title, subtitle, accent, resonances, format = "wide" } = opts;
  const size = SIZES[format];
  const isSquare = format === "square";

  // Cormorant Garamond — closest available match to the on-site body serif.
  // Fonts fetched from Google Fonts' static CDN; failures fall back gracefully.
  const [cormorant500, cormorantItalic] = await Promise.all([
    loadFont("https://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjYrEPjuw.ttf"),
    loadFont("https://fonts.gstatic.com/s/cormorantgaramond/v16/co3WmX5slCNuHLi8bLeY9MK7whWMhyjQAFjNgg.ttf"),
  ]);

  const fonts: { name: string; data: ArrayBuffer; style?: "normal" | "italic"; weight?: 400 | 500 }[] = [];
  if (cormorant500) fonts.push({ name: "Cormorant", data: cormorant500, weight: 500, style: "normal" });
  if (cormorantItalic) fonts.push({ name: "Cormorant", data: cormorantItalic, weight: 400, style: "italic" });

  const serif = cormorant500 ? "Cormorant, Georgia, serif" : "Georgia, serif";
  const serifItalic = cormorantItalic ? "Cormorant, Georgia, serif" : "Georgia, serif";

  const titleSize = isSquare ? 112 : 124;
  const subtitleSize = isSquare ? 30 : 28;
  const padX = isSquare ? 80 : 88;
  const padY = isSquare ? 88 : 72;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#06060A",
          color: "#EDEDEC",
          padding: `${padY}px ${padX}px`,
          justifyContent: "space-between",
          position: "relative",
          fontFamily: serif,
        }}
      >
        {/* Accent corner wash */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -220,
            width: 640,
            height: 640,
            borderRadius: "50%",
            background: `radial-gradient(closest-side, ${accent}55, transparent 70%)`,
            display: "flex",
          }}
        />
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: accent,
            display: "flex",
          }}
        />
        {/* Bottom rule */}
        <div
          style={{
            position: "absolute",
            bottom: padY - 24,
            left: padX,
            right: padX,
            height: 1,
            background: "rgba(212,175,55,0.22)",
            display: "flex",
          }}
        />

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 1 }}>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: accent,
              fontFamily: "system-ui, sans-serif",
              fontWeight: 400,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: 18,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#D4AF37",
              opacity: 0.7,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Maps of the Inner World
          </div>
        </div>

        {/* Title block */}
        <div style={{ display: "flex", flexDirection: "column", zIndex: 1 }}>
          <div
            style={{
              fontSize: titleSize,
              fontWeight: 500,
              lineHeight: 0.98,
              letterSpacing: -1.5,
              color: "#EDEDEC",
              fontFamily: serif,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                fontSize: subtitleSize,
                lineHeight: 1.35,
                marginTop: 26,
                color: "#D0CEC8",
                maxWidth: isSquare ? 880 : 960,
                fontStyle: "italic",
                fontFamily: serifItalic,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        {/* Footer: resonances + watermark */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            zIndex: 1,
            gap: 24,
          }}
        >
          {resonances && resonances.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: "70%" }}>
              <div
                style={{
                  fontSize: 14,
                  letterSpacing: 5,
                  textTransform: "uppercase",
                  color: "#8A8780",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                Resonances
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                {resonances.slice(0, 3).map((r, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: r.accent,
                        display: "flex",
                      }}
                    />
                    <div
                      style={{
                        fontSize: 20,
                        color: "#D0CEC8",
                        fontFamily: serifItalic,
                        fontStyle: "italic",
                      }}
                    >
                      {r.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: "flex" }} />
          )}
          <div
            style={{
              fontSize: 14,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#8A8780",
              fontFamily: "system-ui, sans-serif",
              display: "flex",
            }}
          >
            archetypes.ummerr.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length ? fonts : undefined,
    }
  );
}
