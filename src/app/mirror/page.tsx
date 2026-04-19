import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/site";
import MirrorClient from "./MirrorClient";
import {
  CLUSTER_INTERPRETATIONS,
  decodeResult,
  scoreChoices,
  topClusters,
} from "@/data/mirror-questions";
import {
  legacySession,
  sessionFromSeed,
  type MirrorSession,
} from "@/lib/mirror-session";

interface PageProps {
  searchParams: Promise<{ r?: string | string[] }>;
}

function readR(raw: string | string[] | undefined): string | null {
  if (!raw) return null;
  return Array.isArray(raw) ? (raw[0] ?? null) : raw;
}

// Build the session the shared URL refers to, or null if no r/malformed.
function sessionForR(r: string | null): {
  session: MirrorSession | null;
  choices: import("@/data/mirror-questions").Choice[] | null;
} {
  const decoded = decodeResult(r);
  if (!decoded) return { session: null, choices: null };
  const session =
    decoded.version === "v2" && decoded.seed
      ? sessionFromSeed(decoded.seed)
      : legacySession();
  // Ignore the URL if the choice count doesn't match the session length —
  // a malformed share link shouldn't crash the reveal.
  if (decoded.choices.length !== session.questions.length) {
    return { session: null, choices: null };
  }
  return { session, choices: decoded.choices };
}

export async function generateMetadata(
  { searchParams }: PageProps,
): Promise<Metadata> {
  const sp = await searchParams;
  const r = readR(sp.r);
  const { session, choices } = sessionForR(r);

  if (!session || !choices) {
    return buildPageMetadata({
      title: "The Mirror",
      description:
        "Twelve forced choices. One cross-system snapshot of what you're navigating right now. No sign-in, nothing stored — a mirror to try on.",
      path: "/mirror",
    });
  }

  const scores = scoreChoices(choices, session.questions, session.flips);
  const top = topClusters(scores, 3).map((id) => CLUSTER_INTERPRETATIONS[id].short);
  const title = top.length ? `My Mirror: ${top.join(" · ")}` : "The Mirror";
  const description = top.length
    ? `A cross-system snapshot: ${top.join(", ")}. Take the mirror yourself — twelve choices, ninety seconds.`
    : "A cross-system snapshot of archetypal energy.";

  // Point link-preview consumers (iMessage / Slack / Twitter / etc.) at the
  // dynamic OG handler so each share carries its own constellation card.
  const ogImage = `/api/og/mirror?r=${encodeURIComponent(r!)}`;

  return {
    ...buildPageMetadata({
      title,
      description,
      path: `/mirror?r=${r}`,
      ogImage,
    }),
    robots: { index: false, follow: true },
  };
}

export default async function MirrorPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const r = readR(sp.r);
  const { session, choices } = sessionForR(r);

  return (
    <div className="max-w-2xl mx-auto px-6 md:px-10 py-14 md:py-20">
      {/* Key on `r` so client-nav from a result back to a fresh /mirror
          remounts the state machine — otherwise "Take it again" would
          leave the previous result hydrated. */}
      <MirrorClient
        key={r ?? "fresh"}
        initialSession={session}
        initialChoices={choices}
      />
    </div>
  );
}
