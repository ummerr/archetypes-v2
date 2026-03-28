export type ArchetypeFamily = "king" | "warrior" | "magician" | "lover";
export type Maturity = "boy" | "man";

export interface ShadowPole {
  name: string;
  description: string;
  traits: string[];
}

export interface Archetype {
  slug: string;
  name: string;
  family: ArchetypeFamily;
  maturity: Maturity;
  description: string;
  keyCharacteristics: string[];
  fullness: { title: string; description: string };
  activeShadow: ShadowPole;
  passiveShadow: ShadowPole;
  evolutionFrom?: string;
  evolutionTo?: string;
  accentColor: string;
  accessMarkers?: string[];
}

export interface ArchetypeFamilyGroup {
  id: ArchetypeFamily;
  label: string;
  man: Archetype;
  boy: Archetype;
  color: string;
  position: "top" | "bottom" | "left" | "right";
}
