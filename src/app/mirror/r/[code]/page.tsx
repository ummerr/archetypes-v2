import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/site";
import MirrorClient from "../../MirrorClient";
import {
  CLUSTER_INTERPRETATIONS,
  decodeResult,
  encodeResult,
  readingName,
  scoreChoices,
  topClusters,
  type Choice,
} from "@/data/mirror-questions";
import {
  legacySession,
  sessionFromSeed,
  type MirrorSession,
} from "@/lib/mirror-session";

interface PageProps {
  params: Promise<{ code: string }>;
}

// Resolve a path-form code (v2-seed-choices or legacy 12-char) back into
// the session + choices the viewer would have produced. Length-aware so
// links created before the default length changed still reconstruct their
// original session.
function sessionForCode(code: string | null | undefined): {
  session: MirrorSession | null;
  choices: Choice[] | null;
  dotCode: string | null;
} {
  const decoded = decodeResult(code);
  if (!decoded) return { session: null, choices: null, dotCode: null };
  const session =
    decoded.version === "v2" && decoded.seed
      ? sessionFromSeed(decoded.seed, undefined, decoded.choices.length)
      : legacySession();
  if (decoded.choices.length !== session.questions.length) {
    return { session: null, choices: null, dotCode: null };
  }
  return {
    session,
    choices: decoded.choices,
    dotCode: encodeResult(decoded.choices, decoded.seed),
  };
}

export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  const { code } = await params;
  const { session, choices, dotCode } = sessionForCode(code);

  if (!session || !choices || !dotCode) {
    return buildPageMetadata({
      title: "Mirror",
      description:
        "Eleven forced choices. One cross-system snapshot of what you're navigating right now. No sign-in, nothing stored — a mirror to try on.",
      path: "/mirror",
    });
  }

  const scores = scoreChoices(choices, session.questions, session.flips);
  const dominant = topClusters(scores, 3);
  const top = dominant.map((id) => CLUSTER_INTERPRETATIONS[id].short);
  const name = readingName(dominant);
  const title = name.parts.length
    ? `${name.display} · Mirror`
    : "Mirror";
  const description = top.length
    ? `${name.display} — a cross-system snapshot: ${top.join(", ")}. Take the mirror yourself — eleven choices, a minute or two.`
    : "A cross-system snapshot of archetypal energy.";

  // OG handler reads `?r=` as its input; keep the dotted form there since
  // it's a query param, not a path segment.
  const ogImage = `/api/og/mirror?r=${encodeURIComponent(dotCode)}`;

  return {
    ...buildPageMetadata({
      title,
      description,
      path: `/mirror/r/${code}`,
      ogImage,
    }),
    robots: { index: false, follow: true },
  };
}

export default async function MirrorResultPage({ params }: PageProps) {
  const { code } = await params;
  const { session, choices } = sessionForCode(code);

  // Key on `code` so client-nav from a result back to /mirror (intake)
  // remounts the state machine — otherwise "Take it again" would leave
  // the previous result hydrated.
  return (
    <div className="max-w-2xl mx-auto px-6 md:px-10 py-14 md:py-20">
      <MirrorClient
        key={code ?? "fresh"}
        initialSession={session}
        initialChoices={choices}
      />
    </div>
  );
}
