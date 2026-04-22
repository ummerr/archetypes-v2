import { renderSystemOgCard, ogSize, ogContentType } from "@/lib/og-card";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Jungian - Twelve Heroic Archetypes";

export default async function Image() {
  return renderSystemOgCard("jungian");
}
