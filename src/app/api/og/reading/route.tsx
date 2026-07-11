import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { decodeResultPath, readingNumberFor } from "@/lib/quiz-session";
import { responsesToVector } from "@/lib/quiz-scoring";
import { classifyVector } from "@/lib/quiz-classifier";
import { archetypeDisplayName, systemAccent } from "@/lib/resonance";
import { loadOgFonts } from "@/lib/og-card";
import { CLUSTER_COLORS, CLUSTER_COLOR_FALLBACK } from "@/lib/cluster-colors";

// Run on Node so decodeResultPath (which calls into the quiz classifier +
// seeded RNG) has the same runtime surface as the page route it mirrors.
export const runtime = "nodejs";

const ROMAN = ["Ⅰ", "Ⅱ", "Ⅲ"] as const;

function shortTheme(theme: string): string {
  return theme.split(/—|\s+-\s+/)[0].trim();
}

function colorFor(id: string): string {
  return CLUSTER_COLORS[id] ?? CLUSTER_COLOR_FALLBACK;
}

async function fallbackCard() {
  const { fonts, serif, serifItalic, mono } = await loadOgFonts();
  const accent = "#D4AF37";

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
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(145deg, ${accent}10 0%, #06060A 40%, #0E0E1480 100%)`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${accent}, ${accent}40)`,
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            padding: "96px 96px 56px 96px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: `${accent}CC`,
                fontFamily: mono,
                display: "flex",
              }}
            >
              The Reading · An editorial cast
            </div>
            <div
              style={{
                fontSize: 104,
                fontWeight: 500,
                lineHeight: 1.02,
                letterSpacing: -2,
                color: "#EDEDEC",
                fontFamily: serif,
                marginTop: 28,
                maxWidth: 920,
                display: "flex",
              }}
            >
              A cast in six
            </div>
            <div
              style={{
                fontSize: 104,
                fontWeight: 500,
                lineHeight: 1.02,
                letterSpacing: -2,
                color: accent,
                fontStyle: "italic",
                fontFamily: serifItalic,
                marginTop: 4,
                display: "flex",
              }}
            >
              vocabularies.
            </div>
            <div
              style={{
                fontSize: 26,
                lineHeight: 1.45,
                marginTop: 32,
                color: "#D0CEC8",
                maxWidth: 780,
                fontStyle: "italic",
                fontFamily: serifItalic,
                display: "flex",
              }}
            >
              Nothing stored, nothing sent — the reading lives in its URL.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.2em",
                color: "#8A8780",
                fontFamily: mono,
                textTransform: "uppercase",
                display: "flex",
              }}
            >
              archetypes.ummerr.com/quiz
            </div>
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.2em",
                color: `${accent}70`,
                fontFamily: mono,
                textTransform: "uppercase",
                display: "flex",
              }}
            >
              Maps of the Inner World
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: fonts.length ? fonts : undefined,
    },
  );
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const r = searchParams.get("r");
  if (!r) return fallbackCard();

  const decoded = decodeResultPath(r);
  if (!decoded) return fallbackCard();

  const vector = responsesToVector(decoded.responses, decoded.session.items);
  const classification = classifyVector(vector);
  const primary = classification.perSystem[classification.primarySystem];
  const primaryName =
    (primary &&
      (archetypeDisplayName(primary.system, primary.primary.slug) ??
        primary.primary.slug)) ||
    "A Reading";
  const accent = systemAccent(classification.primarySystem);
  const systemName = accent.name;
  const readingNo = readingNumberFor(r);

  const top3 = classification.clusters.slice(0, 3);

  const { fonts, serif, serifItalic, sans, mono } = await loadOgFonts();

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
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(145deg, ${accent.accent}12 0%, #06060A 45%, #0E0E1480 100%)`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${accent.accent}, ${accent.accent}40)`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 56,
            left: 80,
            right: 80,
            height: 1,
            background: `linear-gradient(90deg, ${accent.accent}22, transparent 80%)`,
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
            padding: "72px 80px 40px 80px",
          }}
        >
          {/* Left column — kicker, archetype name, system, dek */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "space-between",
              minWidth: 0,
              paddingRight: 48,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: `${accent.accent}CC`,
                  fontFamily: mono,
                  display: "flex",
                }}
              >
                The Reading · No. {readingNo}
              </div>

              <div
                style={{
                  fontSize: 96,
                  fontWeight: 500,
                  lineHeight: 1.0,
                  letterSpacing: -1.8,
                  color: "#EDEDEC",
                  fontFamily: serif,
                  marginTop: 22,
                  maxWidth: 640,
                  display: "flex",
                }}
              >
                {primaryName}
              </div>

              <div
                style={{
                  fontSize: 30,
                  lineHeight: 1.2,
                  marginTop: 16,
                  color: accent.accent,
                  fontStyle: "italic",
                  fontFamily: serifItalic,
                  display: "flex",
                }}
              >
                {systemName}
              </div>

              <div
                style={{
                  fontSize: 22,
                  lineHeight: 1.45,
                  marginTop: 28,
                  color: "#D0CEC8",
                  maxWidth: 540,
                  fontStyle: "italic",
                  fontFamily: serifItalic,
                  display: "flex",
                }}
              >
                A cast in six vocabularies.
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: "0.2em",
                  color: "#8A8780",
                  fontFamily: mono,
                  textTransform: "uppercase",
                  display: "flex",
                }}
              >
                archetypes.ummerr.com/quiz
              </div>
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: "0.2em",
                  color: `${accent.accent}70`,
                  fontFamily: mono,
                  textTransform: "uppercase",
                  display: "flex",
                }}
              >
                Maps of the Inner World
              </div>
            </div>
          </div>

          {/* Right column — Ⅰ/Ⅱ/Ⅲ resonance list */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 460,
              flexShrink: 0,
              justifyContent: "center",
              gap: 28,
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#8A8780",
                fontFamily: mono,
                display: "flex",
              }}
            >
              Strongest resonances
            </div>
            {top3.map((c, i) => {
              const color = colorFor(c.cluster.id);
              return (
                <div
                  key={c.cluster.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 22,
                  }}
                >
                  <div
                    style={{
                      fontFamily: serif,
                      fontStyle: "italic",
                      fontSize: 44,
                      color: `${color}`,
                      width: 48,
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {ROMAN[i]}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                      minWidth: 0,
                      gap: 6,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: serif,
                        fontSize: 32,
                        lineHeight: 1.1,
                        color,
                        letterSpacing: -0.4,
                        display: "flex",
                      }}
                    >
                      {shortTheme(c.cluster.theme)}
                    </div>
                    <div
                      style={{
                        fontFamily: mono,
                        fontSize: 12,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "#8A8780",
                        display: "flex",
                      }}
                    >
                      {Math.round(c.strength * 100)}% resonance
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Keep sans bound to suppress unused-var warning; used by future variants */}
        <div style={{ display: "none", fontFamily: sans }} />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: fonts.length ? fonts : undefined,
    },
  );
}
