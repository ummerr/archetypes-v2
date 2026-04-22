import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, buildPageMetadata } from "@/lib/site";
import { decodeResultPath } from "@/lib/quiz-session";
import { responsesToVector } from "@/lib/quiz-scoring";
import { classifyVector } from "@/lib/quiz-classifier";
import { archetypeDisplayName, systemAccent } from "@/lib/resonance";
import QuizReadingClient from "@/components/quiz/QuizReadingClient";
import UnreadableSlug from "@/components/quiz/UnreadableSlug";

interface PageProps {
  params: Promise<{ code: string }>;
}

// Infinite slug space → dynamic rendering, no generateStaticParams.
export const dynamic = "force-dynamic";

function readingNumberFor(slug: string): string {
  // A stable 4-digit "No" derived from the slug. Not load-bearing — the
  // artefact feel wants a signed number, not a perfect hash. fnv-1a 32-bit,
  // clipped to 4 digits and zero-padded.
  let h = 2166136261 >>> 0;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return String(h % 10000).padStart(4, "0");
}

export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  const { code } = await params;
  const decoded = decodeResultPath(code);
  if (!decoded) {
    return buildPageMetadata({
      title: "The Reading",
      description:
        "A cast of six vocabularies laid out on the ink-dark page.",
      path: `/quiz/r/${code}`,
    });
  }
  const vector = responsesToVector(decoded.responses, decoded.session.items);
  const result = classifyVector(vector);
  const primary = result.perSystem[result.primarySystem];
  const primaryName = primary
    ? archetypeDisplayName(primary.system, primary.primary.slug) ??
      primary.primary.slug
    : "A Reading";
  const systemName = systemAccent(result.primarySystem).name;
  const title = `${primaryName} · ${systemName} — The Reading`;

  return {
    ...buildPageMetadata({
      title,
      description:
        "A cross-system reading in six traditions. Nothing stored, nothing sent — the reading lives in its URL.",
      path: `/quiz/r/${code}`,
      ogImage: absoluteUrl("/api/og/mirror"),
    }),
    robots: { index: false, follow: true },
  };
}

export default async function ReadingPage({ params }: PageProps) {
  const { code } = await params;
  const decoded = decodeResultPath(code);

  if (!decoded) {
    return (
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <UnreadableSlug slug={code} />
      </div>
    );
  }

  const vector = responsesToVector(decoded.responses, decoded.session.items);
  const classification = classifyVector(vector);
  const readingNo = readingNumberFor(code);

  return (
    <article className="mx-auto px-6 md:px-10 py-14 md:py-20 max-w-5xl">
      <QuizReadingClient classification={classification} readingNo={readingNo} />
      <div className="sr-only">
        <Link href="/quiz">Cast another reading</Link>
      </div>
    </article>
  );
}
