import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import {
  CLUSTER_INTERPRETATIONS,
  decodeResult,
  readingName,
  scoreChoices,
  topClusters,
  type MirrorClusterId,
} from "@/data/mirror-questions";
import {
  legacySession,
  sessionFromSeed,
  type MirrorSession,
} from "@/lib/mirror-session";
import { loadOgFonts } from "@/lib/og-card";

// Force the handler to run on the Node runtime so it has access to the
// shared `decodeResult` / `sessionFromSeed` utilities (they use crypto in
// a way the edge runtime sometimes treats differently).
export const runtime = "nodejs";

// Cluster palette mirrors the live result constellation so shared
// previews feel continuous with the page they point to.
const CLUSTER_COLOR: Record<MirrorClusterId, string> = {
  sovereign: "#E0C065",
  warrior: "#D6614A",
  "sage-magician": "#9B87C4",
  lover: "#E08597",
  innocent: "#EADBA8",
  explorer: "#5DB8A0",
  rebel: "#B64558",
  creator: "#E89B4F",
  jester: "#F0C555",
  caregiver: "#8AB876",
  everyman: "#C3A07D",
  "death-rebirth": "#7E5BA0",
  teacher: "#7FA2CC",
  "liminal-territory": "#ADA0C6",
};

const LAYOUT_ORDER: MirrorClusterId[] = [
  "sovereign",
  "teacher",
  "sage-magician",
  "creator",
  "lover",
  "caregiver",
  "everyman",
  "innocent",
  "death-rebirth",
  "liminal-territory",
  "jester",
  "explorer",
  "rebel",
  "warrior",
];

const VIEW = 440;
const CX = VIEW / 2;
const CY = VIEW / 2;
const INNER_R = 36;
const OUTER_R = 170;

function radiusFor(score: number, maxScore: number): number {
  if (maxScore <= 0) return INNER_R;
  return INNER_R + (score / maxScore) * (OUTER_R - INNER_R);
}

function sessionForR(r: string | null): MirrorSession | null {
  const decoded = decodeResult(r);
  if (!decoded) return null;
  const session =
    decoded.version === "v2" && decoded.seed
      ? sessionFromSeed(decoded.seed)
      : legacySession();
  if (decoded.choices.length !== session.questions.length) return null;
  return session;
}

async function intakeImage() {
  const { fonts, serif, serifItalic, sans, mono } = await loadOgFonts();
  const accent = "#D4AF37";

  const positions = LAYOUT_ORDER.map((id, i) => {
    const angle = -Math.PI / 2 + (i / LAYOUT_ORDER.length) * Math.PI * 2;
    const r = INNER_R + (OUTER_R - INNER_R) * 0.62;
    return {
      id,
      x: CX + Math.cos(angle) * r,
      y: CY + Math.sin(angle) * r,
    };
  });

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
            position: "absolute",
            bottom: 56,
            left: 80,
            right: 80,
            height: 1,
            background: `linear-gradient(90deg, ${accent}22, transparent 80%)`,
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "space-between",
              minWidth: 0,
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
                The Mirror · 11 Choices · ~1 Min
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 22,
                  maxWidth: 640,
                }}
              >
                <div
                  style={{
                    fontSize: 104,
                    fontWeight: 500,
                    lineHeight: 1.0,
                    letterSpacing: -2,
                    color: "#EDEDEC",
                    fontFamily: serif,
                    display: "flex",
                  }}
                >
                  This or that.
                </div>
                <div
                  style={{
                    fontSize: 104,
                    fontWeight: 500,
                    lineHeight: 1.0,
                    letterSpacing: -2,
                    color: accent,
                    fontStyle: "italic",
                    fontFamily: serifItalic,
                    marginTop: 8,
                    display: "flex",
                  }}
                >
                  Eleven times.
                </div>
              </div>

              <div
                style={{
                  fontSize: 22,
                  lineHeight: 1.45,
                  marginTop: 30,
                  color: "#D0CEC8",
                  maxWidth: 540,
                  fontStyle: "italic",
                  fontFamily: serifItalic,
                  display: "flex",
                }}
              >
                A cross-system snapshot of what you&rsquo;re navigating right now.
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
                archetypes.ummerr.com/mirror
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

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 460,
              flexShrink: 0,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 460,
                height: 460,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${accent}14, transparent 60%)`,
                display: "flex",
              }}
            />
            <svg
              width={VIEW}
              height={VIEW}
              viewBox={`0 0 ${VIEW} ${VIEW}`}
              style={{ display: "block" }}
            >
              {[0.5, 0.78, 1].map((t, i) => (
                <circle
                  key={i}
                  cx={CX}
                  cy={CY}
                  r={INNER_R + (OUTER_R - INNER_R) * t}
                  fill="none"
                  stroke="#8A878040"
                  strokeWidth={0.8}
                  strokeDasharray="2 5"
                />
              ))}
              {LAYOUT_ORDER.map((id, i) => {
                const angle =
                  -Math.PI / 2 + (i / LAYOUT_ORDER.length) * Math.PI * 2;
                const x2 = CX + Math.cos(angle) * OUTER_R;
                const y2 = CY + Math.sin(angle) * OUTER_R;
                return (
                  <line
                    key={id}
                    x1={CX}
                    y1={CY}
                    x2={x2}
                    y2={y2}
                    stroke="#4A4742"
                    strokeOpacity={0.3}
                    strokeWidth={0.5}
                  />
                );
              })}
              {/* Center gold pulse — "potential" */}
              <circle cx={CX} cy={CY} r={INNER_R * 0.9} fill={`${accent}12`} />
              <circle cx={CX} cy={CY} r={INNER_R * 0.45} fill={`${accent}28`} />
              <circle cx={CX} cy={CY} r={5} fill={accent} opacity={0.9} />
              {/* Empty constellation — dim uniform dots, an invitation */}
              {positions.map((p) => (
                <circle
                  key={p.id}
                  cx={p.x}
                  cy={p.y}
                  r={3}
                  fill="#8A8780"
                  opacity={0.45}
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Keep sans binding referenced for future use */}
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const r = searchParams.get("r");
  const session = sessionForR(r);
  const decoded = decodeResult(r);
  if (!session || !decoded) return intakeImage();

  const scores = scoreChoices(decoded.choices, session.questions, session.flips);
  const dominant = topClusters(scores, 3);
  const maxScore = Math.max(1, ...Object.values(scores));

  const positions = LAYOUT_ORDER.map((id, i) => {
    const angle = -Math.PI / 2 + (i / LAYOUT_ORDER.length) * Math.PI * 2;
    const score = scores[id] ?? 0;
    const r = radiusFor(score, maxScore);
    return {
      id,
      x: CX + Math.cos(angle) * r,
      y: CY + Math.sin(angle) * r,
      score,
    };
  });

  const dominantPolygon = dominant
    .map((id) => positions.find((p) => p.id === id))
    .filter((p): p is (typeof positions)[number] => Boolean(p));

  const dominantLabels = dominant.map((id) => CLUSTER_INTERPRETATIONS[id].short);
  const name = readingName(dominant);
  const primaryColor =
    dominant.length > 0 ? CLUSTER_COLOR[dominant[0]] : "#D4AF37";

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
            background: `linear-gradient(145deg, ${primaryColor}10 0%, #06060A 40%, #0E0E1480 100%)`,
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
            background: `linear-gradient(90deg, ${primaryColor}, ${primaryColor}40)`,
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
            background: `linear-gradient(90deg, ${primaryColor}22, transparent 80%)`,
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
          {/* Left column — headline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "space-between",
              minWidth: 0,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: `${primaryColor}CC`,
                  fontFamily: mono,
                  display: "flex",
                }}
              >
                A Mirror Reading
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                  flexWrap: "wrap",
                  marginTop: 18,
                  maxWidth: 640,
                }}
              >
                {name.parts.length > 0 ? (
                  name.parts.flatMap((p, i) => {
                    const color = CLUSTER_COLOR[p.clusterId];
                    const word = (
                      <div
                        key={`${p.clusterId}-${i}`}
                        style={{
                          fontSize: 108,
                          fontWeight: 500,
                          lineHeight: 1.0,
                          letterSpacing: -2,
                          color,
                          fontFamily: serif,
                          display: "flex",
                        }}
                      >
                        {p.word}
                      </div>
                    );
                    if (i === 0 && name.parts.length > 1) {
                      return [
                        word,
                        <div
                          key="amp"
                          style={{
                            fontSize: 92,
                            lineHeight: 1.0,
                            color: "#8A878099",
                            fontStyle: "italic",
                            fontFamily: serifItalic,
                            margin: "0 18px",
                            display: "flex",
                          }}
                        >
                          &amp;
                        </div>,
                      ];
                    }
                    return [word];
                  })
                ) : (
                  <div
                    style={{
                      fontSize: 108,
                      fontWeight: 500,
                      lineHeight: 1.0,
                      letterSpacing: -2,
                      color: "#EDEDEC",
                      fontFamily: serif,
                      display: "flex",
                    }}
                  >
                    {name.display}
                  </div>
                )}
              </div>

              {dominantLabels.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginTop: 22,
                    fontSize: 18,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    fontFamily: mono,
                  }}
                >
                  {dominantLabels.flatMap((label, i) => {
                    const color = CLUSTER_COLOR[dominant[i]];
                    const segment = (
                      <div
                        key={`label-${dominant[i]}`}
                        style={{ color, opacity: 0.85, display: "flex" }}
                      >
                        {label}
                      </div>
                    );
                    if (i < dominantLabels.length - 1) {
                      return [
                        segment,
                        <div
                          key={`sep-${i}`}
                          style={{
                            color: "#8A878066",
                            margin: "0 10px",
                            display: "flex",
                          }}
                        >
                          ·
                        </div>,
                      ];
                    }
                    return [segment];
                  })}
                </div>
              )}

              <div
                style={{
                  fontSize: 22,
                  lineHeight: 1.4,
                  marginTop: 28,
                  color: "#D0CEC8",
                  maxWidth: 540,
                  fontStyle: "italic",
                  fontFamily: serifItalic,
                  display: "flex",
                }}
              >
                A cross-system snapshot of what they&rsquo;re navigating right now.
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
                archetypes.ummerr.com/mirror
              </div>
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: "0.2em",
                  color: "#D4AF3770",
                  fontFamily: mono,
                  textTransform: "uppercase",
                  display: "flex",
                }}
              >
                Maps of the Inner World
              </div>
            </div>
          </div>

          {/* Right column — constellation */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 460,
              flexShrink: 0,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 460,
                height: 460,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${primaryColor}14, transparent 60%)`,
                display: "flex",
              }}
            />
            <svg
              width={VIEW}
              height={VIEW}
              viewBox={`0 0 ${VIEW} ${VIEW}`}
              style={{ display: "block" }}
            >
              {/* Guide rings */}
              {[0.5, 0.78, 1].map((t, i) => (
                <circle
                  key={i}
                  cx={CX}
                  cy={CY}
                  r={INNER_R + (OUTER_R - INNER_R) * t}
                  fill="none"
                  stroke="#8A878040"
                  strokeWidth={0.8}
                  strokeDasharray="2 5"
                />
              ))}
              {/* Spokes */}
              {LAYOUT_ORDER.map((id, i) => {
                const angle =
                  -Math.PI / 2 + (i / LAYOUT_ORDER.length) * Math.PI * 2;
                const x2 = CX + Math.cos(angle) * OUTER_R;
                const y2 = CY + Math.sin(angle) * OUTER_R;
                return (
                  <line
                    key={id}
                    x1={CX}
                    y1={CY}
                    x2={x2}
                    y2={y2}
                    stroke="#4A4742"
                    strokeOpacity={0.35}
                    strokeWidth={0.5}
                  />
                );
              })}
              {/* Dominant polygon */}
              {dominantPolygon.length >= 2 && (
                <polygon
                  points={dominantPolygon.map((p) => `${p.x},${p.y}`).join(" ")}
                  fill={`${primaryColor}18`}
                  stroke={primaryColor}
                  strokeOpacity={0.7}
                  strokeWidth={1.25}
                />
              )}
              {/* Nodes */}
              {positions.map((p) => {
                const color = CLUSTER_COLOR[p.id];
                const isDominant = dominant.includes(p.id);
                const radius = p.score === 0 ? 2.2 : isDominant ? 7 : 4;
                return (
                  <g key={p.id}>
                    {isDominant && (
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={radius + 6}
                        fill={color}
                        opacity={0.18}
                      />
                    )}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={radius}
                      fill={p.score === 0 ? "#5A5750" : color}
                      opacity={p.score === 0 ? 0.55 : 1}
                    />
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Hide the unused sans binding from the type checker — used only
            when we add a secondary text line later. */}
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
