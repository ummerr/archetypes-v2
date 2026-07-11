export type ZodiacElement = "fire" | "earth" | "air" | "water";

export type ZodiacModality = "cardinal" | "fixed" | "mutable";

export type ZodiacPolarity = "diurnal" | "nocturnal";

export interface ZodiacArchetype {
  slug: string;
  name: string;
  glyph: string;
  order: number; // 1 (Aries) … 12 (Pisces)
  element: ZodiacElement;
  modality: ZodiacModality;
  polarity: ZodiacPolarity;
  rulingPlanet: string;
  dates: string;
  motto: string;
  description: string;
  keyCharacteristics: string[];
  gift: string;
  trap: string;
  /** The opposite sign across the axis — astrology's shadow grammar (polarity). */
  oppositeSign: string;
  oppositeNote: string;
  /** Golden Dawn Major Arcana attribution — the bridge into the Tarot system. */
  goldenDawnArcana: { name: string; slug: string; note: string };
  jungianCorrelation: string;
  jungianSlug?: string;
  thrivingNarrative: string;
  pressureNarrative: string;
  accentColor: string;
}

export interface ZodiacElementGroup {
  id: ZodiacElement;
  label: string;
  tagline: string;
  /** The site's affect-center tint this element maps onto (structural inference). */
  affectTint: string;
  temperament: string;
  description: string;
  color: string;
  signs: string[]; // slugs, in zodiacal order
}
