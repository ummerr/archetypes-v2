import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://archetypes.ummerr.com";

export const SITE_NAME = "Maps of the Inner World";

export const SITE_TAGLINE =
  "Explore archetypal systems that chart the inner world - Jungian, Enneagram, KWML, MBTI, Hero's Journey, and Tarot.";

export const SITE_AUTHOR = "ummerr";

export function absoluteUrl(path: string): string {
  if (!path.startsWith("/")) path = `/${path}`;
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

export function buildPageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  type?: "website" | "article";
}): Metadata {
  const url = absoluteUrl(opts.path);
  const openGraph: NonNullable<Metadata["openGraph"]> = {
    type: opts.type ?? "website",
    url,
    title: opts.title,
    description: opts.description,
    siteName: SITE_NAME,
  };
  const twitter: NonNullable<Metadata["twitter"]> = {
    card: "summary_large_image",
    title: opts.title,
    description: opts.description,
  };
  if (opts.ogImage) {
    openGraph.images = [
      { url: opts.ogImage, width: 1200, height: 630, alt: opts.title },
    ];
    twitter.images = [opts.ogImage];
  }
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph,
    twitter,
  };
}

export function truncate(text: string, max = 160): string {
  const t = text.trim().replace(/\s+/g, " ");
  if (t.length <= max) return t;
  return t.slice(0, max - 1).replace(/[,;:\s]+\S*$/, "") + "…";
}
