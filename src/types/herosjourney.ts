export type JourneyAct = "departure" | "initiation" | "return";

export type ArchetypeRole =
  | "hero"
  | "mentor"
  | "herald"
  | "threshold-guardian"
  | "shapeshifter"
  | "shadow"
  | "trickster"
  | "ally";

export interface JourneyStage {
  number: number;
  name: string;
  act: JourneyAct;
  clockPosition: number;
  shortDescription: string;
  psychologicalMilestone: string;
}

export interface JourneyActGroup {
  id: JourneyAct;
  label: string;
  tagline: string;
  description: string;
  color: string;
}

export interface HeroJourneyArchetype {
  slug: string;
  name: string;
  role: ArchetypeRole;
  motto: string;
  coreFear: string;
  coreDesire: string;
  coreLie: string;
  strategy: string;
  description: string;
  keyCharacteristics: string[];
  gift: string;
  trap: string;
  symbol: string;
  accentColor: string;
  shadowPole: string;
  primaryStages: number[];
  crossSystem: {
    kwml: string;
    pearsonMarr: string;
    enneagram: string;
  };
}
