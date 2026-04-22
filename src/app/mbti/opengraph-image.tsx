import { renderSystemOgCard, ogSize, ogContentType } from "@/lib/og-card";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Myers-Briggs - Sixteen Cognitive Patterns";

export default async function Image() {
  return renderSystemOgCard("mbti");
}
