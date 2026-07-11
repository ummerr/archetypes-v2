import { Suspense } from "react";
import { buildPageMetadata } from "@/lib/site";
import IndexView from "./IndexView";

export const metadata = buildPageMetadata({
  title: "All Archetypes — Index",
  description:
    "Eighty-seven archetypes across seven systems - Jungian, Enneagram, KWML, Myers-Briggs, Hero's Journey, Tarot, and Astrology. Browse, group, and search the whole field.",
  path: "/archetypes",
});

export default function ArchetypesIndexPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <IndexView />
    </Suspense>
  );
}
