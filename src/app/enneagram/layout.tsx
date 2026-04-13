import type { Metadata } from "next";
import { buildPageMetadata, systemOgImage } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "The Enneagram",
  description:
    "Nine Enneagram types organized into three centers of intelligence, with core fears, desires, wings, and paths of integration and disintegration (Riso-Hudson).",
  path: "/enneagram",
  ogImage: systemOgImage("enneagram"),
});

export default function EnneagramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
