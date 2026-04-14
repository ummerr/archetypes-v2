import type { Metadata } from "next";
import { buildPageMetadata, systemOgImage } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "The Hero's Journey",
  description:
    "Campbell's monomyth and Vogler's twelve-stage adaptation - eight recurring archetypal masks (Hero, Mentor, Herald, Shapeshifter, Shadow, Trickster, Threshold Guardian, Ally).",
  path: "/heros-journey",
  ogImage: systemOgImage("heros-journey"),
});

export default function HerosJourneyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
