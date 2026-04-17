import { renderHomepageOgCard } from "@/lib/og-card";
import { ogSize, ogContentType } from "@/lib/og-card";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Maps of the Inner World";

export default async function Image() {
  return renderHomepageOgCard();
}
