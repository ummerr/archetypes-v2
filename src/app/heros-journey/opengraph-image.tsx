import { renderSystemOgCard, ogSize, ogContentType } from "@/lib/og-card";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Hero's Journey - Archetypes of the Monomyth";

export default async function Image() {
  return renderSystemOgCard("heros-journey");
}
