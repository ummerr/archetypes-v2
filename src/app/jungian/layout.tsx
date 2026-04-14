import type { Metadata } from "next";
import { buildPageMetadata, systemOgImage } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Jungian Archetypes",
  description:
    "Twelve heroic archetypes in the Pearson-Marr taxonomy - universal motivations clustered across Ego, Soul, and Self, rooted in Jung's collective unconscious.",
  path: "/jungian",
  ogImage: systemOgImage("jungian"),
});

export default function JungianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
