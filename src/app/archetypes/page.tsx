import { Suspense } from "react";
import { buildPageMetadata } from "@/lib/site";
import IndexView from "./IndexView";

export const metadata = buildPageMetadata({
  title: "All Archetypes - The Index",
  description:
    "Seventy-five archetypes across six systems - Jungian, Enneagram, KWML, Myers-Briggs, Hero's Journey, and Tarot. Browse, group, and search the whole field.",
  path: "/archetypes",
});

export default function ArchetypesIndexPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <IndexView />
    </Suspense>
  );
}
