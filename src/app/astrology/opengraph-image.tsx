import { renderSystemOgCard, ogSize, ogContentType } from "@/lib/og-card";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Astrology - The Twelve Signs";

export default async function Image() {
  return renderSystemOgCard("astrology");
}
