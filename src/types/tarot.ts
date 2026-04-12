export type TarotPhase =
  | "ego-formation"
  | "psyche-alchemy"
  | "unconscious-realization";

export interface TarotPole {
  title: string;
  description: string;
}

export interface TarotArchetype {
  slug: string;
  id: number; // 0..21
  numeral: string; // "0", "I" .. "XXI"
  name: string;
  phase: TarotPhase;
  symbol: string; // single glyph
  motto: string;
  coreTheme: string;
  description: string;
  poles: {
    fullness: TarotPole;
    activeShadow: TarotPole;
    passiveShadow: TarotPole;
  };
  jungianCorrelation?: string;
  jungianSlug?: string;
  accentColor: string;
}

export interface TarotPhaseGroup {
  id: TarotPhase;
  label: string;
  tagline: string;
  range: string;
  description: string;
  color: string;
  ids: number[];
}
