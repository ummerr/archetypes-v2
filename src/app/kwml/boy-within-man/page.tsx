import PageTransition from "@/components/PageTransition";
import BoySteeringMan from "@/components/BoySteeringMan";

export const metadata = {
  title: "The Boy Within the Man — KWML Archetype Explorer",
  description:
    "Explore how unchecked boy psychology steers the adult masculine psyche. An interactive visualization of nested archetypal triangles.",
};

export default function BoyWithinManPage() {
  return (
    <PageTransition>
      <BoySteeringMan />
    </PageTransition>
  );
}
