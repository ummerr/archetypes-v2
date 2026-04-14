import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/site";
import SectionHeading from "@/components/shared/SectionHeading";
import HermeneuticCaveat from "@/components/shared/HermeneuticCaveat";
import MirrorClient from "./MirrorClient";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "The Mirror",
    description:
      "Describe what you're navigating. The Mirror surfaces resonant archetypes across six traditions — client-side, nothing stored or sent.",
    path: "/mirror",
  }),
  robots: { index: false, follow: true },
};

export default function MirrorPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 md:px-10 py-20">
      <SectionHeading kicker="Mirror" as="h1">
        A Mirror, Not a Diagnosis
      </SectionHeading>
      <HermeneuticCaveat variant="banner" className="mb-10" />
      <MirrorClient />
    </div>
  );
}
