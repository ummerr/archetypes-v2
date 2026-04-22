import { renderSystemOgCard, ogSize, ogContentType } from "@/lib/og-card";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Tarot - The Major Arcana";

export default async function Image() {
  return renderSystemOgCard("tarot");
}
