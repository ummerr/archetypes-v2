import { renderSystemOgCard, ogSize, ogContentType } from "@/lib/og-card";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Enneagram - Nine Personality Types";

export default async function Image() {
  return renderSystemOgCard("enneagram");
}
