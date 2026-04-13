import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function renderOgCard(opts: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  accent: string;
}) {
  const { eyebrow, title, subtitle, accent } = opts;
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, ${accent} 0%, #0a0a0a 78%)`,
          color: "#f5efe6",
          padding: "72px 80px",
          justifyContent: "space-between",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            opacity: 0.75,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Maps of the Inner World
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 4,
              textTransform: "uppercase",
              opacity: 0.8,
              fontFamily: "system-ui, sans-serif",
              marginBottom: 18,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: 132,
              fontWeight: 600,
              lineHeight: 0.95,
              letterSpacing: -2,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                fontSize: 30,
                lineHeight: 1.3,
                opacity: 0.85,
                maxWidth: 960,
                marginTop: 30,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>
      </div>
    ),
    ogSize
  );
}
