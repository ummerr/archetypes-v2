import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { SYSTEMS } from "@/data/systems";
import { ALL_JUNGIAN } from "@/data/jungian/archetypes";
import { ALL_ENNEAGRAM } from "@/data/enneagram/archetypes";
import { ALL_ARCHETYPES as ALL_KWML } from "@/data/kwml/archetypes";
import { ALL_TAROT } from "@/data/tarot/archetypes";
import { ALL_HEROSJOURNEY } from "@/data/herosjourney/archetypes";
import { ALL_MBTI } from "@/data/mbti/archetypes";
import { CLUSTERS } from "@/data/resonance";
import { getContestedEntries, debateSlugFor } from "@/lib/resonance";
import { META_DEBATES } from "@/data/debates";

type SlugRecord = { slug: string };

const SYSTEM_SLUGS: Record<string, SlugRecord[]> = {
  jungian: ALL_JUNGIAN,
  enneagram: ALL_ENNEAGRAM,
  kwml: ALL_KWML,
  tarot: ALL_TAROT,
  "heros-journey": ALL_HEROSJOURNEY,
  mbti: ALL_MBTI,
};

const SYSTEMS_WITH_ABOUT = new Set([
  "jungian",
  "enneagram",
  "kwml",
  "tarot",
  "heros-journey",
  "mbti",
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const urls: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "monthly", priority: 1 },
  ];

  for (const system of SYSTEMS) {
    urls.push({
      url: absoluteUrl(`/${system.id}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    });
    if (SYSTEMS_WITH_ABOUT.has(system.id)) {
      urls.push({
        url: absoluteUrl(`/${system.id}/about`),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
    const archetypes = SYSTEM_SLUGS[system.id] ?? [];
    for (const a of archetypes) {
      urls.push({
        url: absoluteUrl(`/${system.id}/archetype/${a.slug}`),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  urls.push({
    url: absoluteUrl("/kwml/boy-within-man"),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  });

  // Atlas + atlas subpages
  urls.push(
    { url: absoluteUrl("/atlas"), lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/atlas/debates"), lastModified, changeFrequency: "monthly", priority: 0.6 },
  );
  for (const c of CLUSTERS) {
    urls.push({
      url: absoluteUrl(`/atlas/cluster/${c.id}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }
  for (const ce of getContestedEntries()) {
    urls.push({
      url: absoluteUrl(
        `/atlas/debates/${debateSlugFor(ce.cluster.id, ce.entry.system, ce.entry.slug)}`,
      ),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }
  for (const m of META_DEBATES) {
    urls.push({
      url: absoluteUrl(`/atlas/debates/${m.slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.55,
    });
  }

  // About pages
  for (const p of ["methodology", "counter-canon", "shadow-structures", "bibliography"]) {
    urls.push({
      url: absoluteUrl(`/about/${p}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // Interactive surfaces (indexed)
  urls.push(
    { url: absoluteUrl("/today"), lastModified, changeFrequency: "daily", priority: 0.7 },
    { url: absoluteUrl("/mirror"), lastModified, changeFrequency: "monthly", priority: 0.6 },
  );

  return urls;
}
