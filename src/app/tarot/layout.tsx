import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Tarot - The Major Arcana",
  description:
    "Twenty-two Major Arcana as a psychological map: archetypal images tracing the Fool's Journey through individuation, each with fullness pole and shadow expressions.",
  path: "/tarot",
});

export default function TarotLayout({
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
