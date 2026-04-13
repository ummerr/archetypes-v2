import PageTransition from "@/components/PageTransition";
import BoySteeringMan from "@/components/BoySteeringMan";
import { buildPageMetadata, systemOgImage } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "The Boy Within the Man",
  description:
    "How unchecked boy psychology steers the adult masculine psyche — an interactive visualization of nested archetypal triangles from Moore & Gillette's KWML.",
  path: "/kwml/boy-within-man",
  ogImage: systemOgImage("kwml"),
});

export default function BoyWithinManPage() {
  return (
    <PageTransition>
      <BoySteeringMan />
    </PageTransition>
  );
}
