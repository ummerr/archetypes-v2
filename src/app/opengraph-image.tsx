import { renderOgCard, ogSize, ogContentType } from "@/lib/og-card";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Maps of the Inner World";

export default async function Image() {
  return renderOgCard({
    eyebrow: "Archetypes",
    title: "Maps of the Inner World",
    subtitle:
      "Six systems that chart the inner world — Jungian, Enneagram, KWML, MBTI, the Hero's Journey, and the Tarot.",
    accent: "#D4AF37",
    resonances: [
      { system: "jungian", name: "The Sage", accent: "#6B8FB5" },
      { system: "tarot", name: "The Magician", accent: "#B87333" },
      { system: "kwml", name: "The King", accent: "#D4AF37" },
    ],
  });
}
