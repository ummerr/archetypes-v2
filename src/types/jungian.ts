export type JungianCluster = "ego" | "soul" | "self";

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
}

export interface JungianClusterGroup {
  id: JungianCluster;
  label: string;
  tagline: string;
  description: string;
  color: string;
}
