import type { Metadata } from "next";
import { buildPageMetadata, systemOgImage } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Myers-Briggs - Sixteen Cognitive Patterns",
  description:
    "Sixteen MBTI types built from four dichotomies of perception and judgment - a map of cognitive preference rendered as geometric glyphs.",
  path: "/mbti",
  ogImage: systemOgImage("mbti"),
});

export default function MbtiLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
