export type EnneagramTriad = "gut" | "heart" | "head";

export type EnneagramNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface EnneagramArchetype {
  slug: string;
  number: EnneagramNumber;
  name: string;
  triad: EnneagramTriad;
  motto: string;
  coreFear: string;
  coreDesire: string;
  coreLie: string;
  strategy: string;
  description: string;
  keyCharacteristics: string[];
  gift: string;
  trap: string;
  jungianCorrelation: string;
  jungianSlug?: string;
  integrationTo: EnneagramNumber;
  disintegrationTo: EnneagramNumber;
  thrivingNarrative: string;
  pressureNarrative: string;
  accentColor: string;
  symbol: string;
}

export interface EnneagramTriadGroup {
  id: EnneagramTriad;
  label: string;
  tagline: string;
  dominantEmotion: string;
  focalPoint: string;
  description: string;
  color: string;
  numbers: EnneagramNumber[];
}
