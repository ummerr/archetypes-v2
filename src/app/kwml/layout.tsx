import type { Metadata } from "next";
import { buildPageMetadata, systemOgImage } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "KWML — Archetypes of the Mature Masculine",
  description:
    "King, Warrior, Magician, Lover — four primal energies in Moore & Gillette's KWML system, each with its boy form, fullness, and two shadow poles.",
  path: "/kwml",
  ogImage: systemOgImage("kwml"),
});

export default function KwmlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
