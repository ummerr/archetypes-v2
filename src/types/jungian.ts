export type JungianCluster = "ego" | "soul" | "self";

export interface JungianShadow {
  name: string;
  description: string;
  signs: string[];
  integration: string;
}

export interface JungianLevels {
  shadow: string;
  call: string;
  expression: string;
}

export interface JungianAwakening {
  circumstances: string[];
  ageOrStage: string;
}

export interface JungianBrandExemplar {
  name: string;
  note: string;
}

export interface JungianCulturalExemplar {
  name: string;
  medium: string;
  note: string;
}

export interface JungianHistoricalExemplar {
  name: string;
  note: string;
}

export interface JungianExemplars {
  brands: JungianBrandExemplar[];
  cultural: JungianCulturalExemplar[];
  historical: JungianHistoricalExemplar[];
}

export interface JungianArchetype {
  slug: string;
  name: string;
  cluster: JungianCluster;
  motto: string;
  coreDesire: string;
  greatestFear: string;
  strategy: string;
  description: string;
  keyCharacteristics: string[];
  gift: string;
  trap: string;
  accentColor: string;
  symbol: string;
  shadow: JungianShadow;
  levels: JungianLevels;
  awakening: JungianAwakening;
  opposite: string;
  stageOrder: 1 | 2 | 3 | 4;
}

export interface JungianClusterGroup {
  id: JungianCluster;
  label: string;
  tagline: string;
  description: string;
  color: string;
}
