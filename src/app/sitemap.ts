import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { SYSTEMS } from "@/data/systems";
import { ALL_JUNGIAN } from "@/data/jungian/archetypes";
import { ALL_ENNEAGRAM } from "@/data/enneagram/archetypes";
import { ALL_ARCHETYPES as ALL_KWML } from "@/data/kwml/archetypes";
import { ALL_TAROT } from "@/data/tarot/archetypes";
import { ALL_HEROSJOURNEY } from "@/data/herosjourney/archetypes";
import { ALL_MBTI } from "@/data/mbti/archetypes";

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
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const urls: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
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

  return urls;
}
