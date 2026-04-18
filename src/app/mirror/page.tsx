import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/site";
import MirrorClient from "./MirrorClient";
import {
  CLUSTER_INTERPRETATIONS,
  decodeResult,
  scoreChoices,
  topClusters,
} from "@/data/mirror-questions";

interface PageProps {
  searchParams: Promise<{ r?: string | string[] }>;
}

function readR(raw: string | string[] | undefined): string | null {
  if (!raw) return null;
  return Array.isArray(raw) ? (raw[0] ?? null) : raw;
}

export async function generateMetadata(
  { searchParams }: PageProps,
): Promise<Metadata> {
  const sp = await searchParams;
  const r = readR(sp.r);
  const choices = decodeResult(r);

  if (!choices) {
    return buildPageMetadata({
      title: "The Mirror",
      description:
        "Twelve forced choices. One cross-system snapshot of what you're navigating right now. No sign-in, nothing stored — a mirror to try on.",
      path: "/mirror",
    });
  }

  const scores = scoreChoices(choices);
  const top = topClusters(scores, 3).map((id) => CLUSTER_INTERPRETATIONS[id].short);
  const title = top.length ? `My Mirror: ${top.join(" · ")}` : "The Mirror";
  const description = top.length
    ? `A cross-system snapshot: ${top.join(", ")}. Take the mirror yourself — twelve choices, ninety seconds.`
    : "A cross-system snapshot of archetypal energy.";

  return {
    ...buildPageMetadata({
      title,
      description,
      path: `/mirror?r=${r}`,
    }),
    robots: { index: false, follow: true },
  };
}

export default async function MirrorPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const choices = decodeResult(readR(sp.r));

  return (
    <div className="max-w-2xl mx-auto px-6 md:px-10 py-14 md:py-20">
      <MirrorClient initialChoices={choices} />
    </div>
  );
}
