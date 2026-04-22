import { renderSystemOgCard, ogSize, ogContentType } from "@/lib/og-card";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "KWML - Archetypes of the Mature Masculine";

export default async function Image() {
  return renderSystemOgCard("kwml");
}
