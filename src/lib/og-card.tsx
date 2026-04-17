import { ImageResponse } from "next/og";

export type OgFormat = "wide" | "square";

const SIZES: Record<OgFormat, { width: number; height: number }> = {
  wide: { width: 1200, height: 630 },
  square: { width: 1080, height: 1080 },
};

export const ogContentType = "image/png";
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

async function loadOgFonts() {
  const [cormorant500, cormorantItalic] = await Promise.all([
    loadFont("https://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjYrEPjuw.ttf"),
    loadFont("https://fonts.gstatic.com/s/cormorantgaramond/v16/co3WmX5slCNuHLi8bLeY9MK7whWMhyjQAFjNgg.ttf"),
  ]);

  const fonts: { name: string; data: ArrayBuffer; style?: "normal" | "italic"; weight?: 400 | 500 }[] = [];
  if (cormorant500) fonts.push({ name: "Cormorant", data: cormorant500, weight: 500, style: "normal" });
  if (cormorantItalic) fonts.push({ name: "Cormorant", data: cormorantItalic, weight: 400, style: "italic" });

  const serif = cormorant500 ? "Cormorant, Georgia, serif" : "Georgia, serif";
  const serifItalic = cormorantItalic ? "Cormorant, Georgia, serif" : "Georgia, serif";

  return { fonts, serif, serifItalic };
}

/* ── truncate helper ──────────────────────────────────── */
function clip(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

/* ── Per-Archetype Card ────────────────────────────────── */

export async function renderOgCard(opts: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  motto?: string;
  accent: string;
  totem?: React.ReactElement | null;
  format?: OgFormat;
}) {
  const { eyebrow, title, subtitle, motto, accent, totem, format = "wide" } = opts;
  const size = SIZES[format];
  const { fonts, serif, serifItalic } = await loadOgFonts();

  const italicLine = motto || subtitle;
  const descLine = motto && subtitle ? clip(subtitle, 120) : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#06060A",
          color: "#EDEDEC",
          position: "relative",
          fontFamily: serif,
        }}
      >
        {/* Background: diagonal gradient matching site CardShell */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(145deg, ${accent}08 0%, #06060A 40%, #0E0E1480 100%)`,
            display: "flex",
          }}
        />
        {/* Left accent wash */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -200,
            width: 800,
            height: 800,
            borderRadius: "50%",
            background: `radial-gradient(ellipse at center, ${accent}15, transparent 60%)`,
            display: "flex",
          }}
        />
        {/* Top accent bar — bright left, fading right */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${accent}, ${accent}60)`,
            display: "flex",
          }}
        />
        {/* Left accent edge — fading down */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1,
            height: "70%",
            background: `linear-gradient(180deg, ${accent}30, transparent)`,
            display: "flex",
          }}
        />
        {/* Separator line */}
        <div
          style={{
            position: "absolute",
            bottom: 56,
            left: 80,
            right: 80,
            height: 1,
            background: `linear-gradient(90deg, ${accent}22, transparent 80%)`,
            display: "flex",
          }}
        />

        {/* === Main two-column layout === */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
            padding: "72px 80px 40px 80px",
          }}
        >
          {/* Left column — text */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "space-between",
              minWidth: 0,
            }}
          >
            {/* Top: eyebrow + title + motto */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* Eyebrow */}
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: `${accent}CC`,
                  fontFamily: "system-ui, sans-serif",
                  fontWeight: 400,
                  display: "flex",
                }}
              >
                {eyebrow}
              </div>

              {/* Title */}
              <div
                style={{
                  fontSize: 72,
                  fontWeight: 500,
                  lineHeight: 1.0,
                  letterSpacing: -1,
                  color: "#EDEDEC",
                  fontFamily: serif,
                  marginTop: 16,
                  maxWidth: 640,
                  display: "flex",
                }}
              >
                {title}
              </div>

              {/* Motto / subtitle italic line */}
              {italicLine ? (
                <div
                  style={{
                    fontSize: 24,
                    lineHeight: 1.35,
                    marginTop: 16,
                    color: "#D0CEC8",
                    maxWidth: 560,
                    fontStyle: "italic",
                    fontFamily: serifItalic,
                    display: "flex",
                  }}
                >
                  {clip(italicLine, 160)}
                </div>
              ) : null}

              {/* Description (secondary — below motto) */}
              {descLine ? (
                <div
                  style={{
                    fontSize: 20,
                    lineHeight: 1.4,
                    marginTop: 12,
                    color: "#8A8780",
                    maxWidth: 540,
                    fontFamily: "system-ui, sans-serif",
                    display: "flex",
                  }}
                >
                  {descLine}
                </div>
              ) : null}
            </div>

            {/* Bottom: footer row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  letterSpacing: "0.2em",
                  color: "#8A8780",
                  fontFamily: "system-ui, sans-serif",
                  display: "flex",
                }}
              >
                archetypes.ummerr.com
              </div>
              <div
                style={{
                  fontSize: 13,
                  letterSpacing: "0.15em",
                  color: "#D4AF3770",
                  fontFamily: "system-ui, sans-serif",
                  textTransform: "uppercase",
                  display: "flex",
                }}
              >
                Maps of the Inner World
              </div>
            </div>
          </div>

          {/* Right column — totem */}
          {totem ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 400,
                flexShrink: 0,
                position: "relative",
              }}
            >
              {/* Totem glow */}
              <div
                style={{
                  position: "absolute",
                  width: 400,
                  height: 400,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${accent}20, transparent 55%)`,
                  display: "flex",
                }}
              />
              {/* Totem itself — full visibility */}
              <div style={{ display: "flex", position: "relative" }}>
                {totem}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length ? fonts : undefined,
    },
  );
}

/* ── Homepage Card ─────────────────────────────────────── */

const SYSTEM_DOTS = [
  "#6B4E8C", // jungian
  "#4A6FA5", // enneagram
  "#C6A355", // kwml
  "#5B7A99", // mbti
  "#B85C38", // heros-journey
  "#8C3A5E", // tarot
];

export async function renderHomepageOgCard(opts?: { format?: OgFormat }) {
  const format = opts?.format ?? "wide";
  const size = SIZES[format];
  const { fonts, serif, serifItalic } = await loadOgFonts();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "100%",
          background: "#06060A",
          color: "#EDEDEC",
          position: "relative",
          fontFamily: serif,
        }}
      >
        {/* Central warm glow */}
        <div
          style={{
            position: "absolute",
            top: -60,
            left: "20%",
            width: "60%",
            height: "80%",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, #D4AF3710, transparent 60%)",
            display: "flex",
          }}
        />
        {/* Top accent bar — centered gold */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(90deg, transparent 10%, #D4AF37 50%, transparent 90%)",
            display: "flex",
          }}
        />
        {/* Separator */}
        <div
          style={{
            position: "absolute",
            bottom: 56,
            left: 120,
            right: 120,
            height: 1,
            background: "linear-gradient(90deg, transparent 5%, #D4AF3722 50%, transparent 95%)",
            display: "flex",
          }}
        />

        {/* Content — centered column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            padding: "0 80px",
            marginTop: -16,
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#D4AF37CC",
              fontFamily: "system-ui, sans-serif",
              display: "flex",
            }}
          >
            Archetypal Systems
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 56,
              fontWeight: 500,
              lineHeight: 1.08,
              letterSpacing: -0.5,
              color: "#EDEDEC",
              fontFamily: serif,
              marginTop: 20,
              maxWidth: 900,
              textAlign: "center",
              display: "flex",
            }}
          >
            Six traditions keep circling the same figures.
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 22,
              lineHeight: 1.4,
              marginTop: 20,
              color: "#D0CEC8",
              maxWidth: 780,
              textAlign: "center",
              fontStyle: "italic",
              fontFamily: serifItalic,
              display: "flex",
            }}
          >
            147 mappings across 20 clusters — every one carrying its citations, dissent, and confidence tier.
          </div>

          {/* System dots */}
          <div
            style={{
              display: "flex",
              gap: 18,
              marginTop: 36,
              alignItems: "center",
            }}
          >
            {SYSTEM_DOTS.map((color, i) => (
              <div
                key={i}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: color,
                  display: "flex",
                }}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            padding: "0 80px 28px",
          }}
        >
          <div
            style={{
              fontSize: 13,
              letterSpacing: "0.2em",
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
    },
  );
}
