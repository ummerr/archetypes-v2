import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { absoluteUrl, buildPageMetadata } from "@/lib/site";
import MirrorClient from "./MirrorClient";
import { decodeResult, encodeResultPath } from "@/data/mirror-questions";

interface PageProps {
  searchParams: Promise<{ r?: string | string[] }>;
}

function readR(raw: string | string[] | undefined): string | null {
  if (!raw) return null;
  return Array.isArray(raw) ? (raw[0] ?? null) : raw;
}

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Mirror",
    description:
      "Eleven forced choices. One cross-system snapshot of what you're navigating right now. No sign-in, nothing stored — a mirror to try on.",
    path: "/mirror",
    ogImage: absoluteUrl("/api/og/mirror"),
  });
}

export default async function MirrorPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const r = readR(sp.r);

  // Legacy shares arrive as /mirror?r=v2.seed.ABBA (dotted, query form).
  // Upgrade them silently to the path-based canonical URL so every link —
  // old or new — resolves to the same stable page.
  if (r) {
    const decoded = decodeResult(r);
    if (decoded) {
      const pathCode =
        decoded.version === "v2" && decoded.seed
          ? encodeResultPath(decoded.choices, decoded.seed)
          : decoded.choices.join("");
      redirect(`/mirror/r/${pathCode}`);
    }
    // Malformed r= falls through to the intake view — matches the prior
    // graceful-fallback behavior rather than surfacing a 404.
  }

  return (
    <div className="max-w-2xl mx-auto px-6 md:px-10 py-14 md:py-20">
      <MirrorClient key="fresh" initialSession={null} initialChoices={null} />
    </div>
  );
}
