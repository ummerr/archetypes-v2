export type MbtiCode =
  | "INTJ" | "INTP" | "ENTJ" | "ENTP"
  | "INFJ" | "INFP" | "ENFJ" | "ENFP"
  | "ISTJ" | "ISFJ" | "ESTJ" | "ESFJ"
  | "ISTP" | "ISFP" | "ESTP" | "ESFP";

export type Temperament = "Analysts" | "Diplomats" | "Sentinels" | "Explorers";

export type FunctionCode =
  | "Ni" | "Ne" | "Si" | "Se"
  | "Ti" | "Te" | "Fi" | "Fe";

export type StackPosition = "Dominant" | "Auxiliary" | "Tertiary" | "Inferior";

export interface CognitiveFunction {
  code: FunctionCode;
  name: string;        // "Introverted Intuition"
  nickname: string;    // "Perspectives"
  blurb: string;
  process: "N" | "S" | "T" | "F";
  attitude: "i" | "e";
}

export interface StackEntry {
  position: StackPosition;
  role: "Hero" | "Parent" | "Child" | "Aspirational";
  code: FunctionCode;
}

export interface MbtiArchetype {
  slug: string;          // "intj"
  id: number;            // stable index 0..15
  code: MbtiCode;
  nickname: string;      // "The Architect"
  alternateName: string; // "Mastermind"
  temperament: Temperament;
  dichotomies: {
    ei: "E" | "I";
    sn: "S" | "N";
    tf: "T" | "F";
    jp: "J" | "P";
  };
  motto: string;
  tagline: string;       // short description
  description: string;   // long-form
  strengths: string[];
  shadows: string[];
  stack: [StackEntry, StackEntry, StackEntry, StackEntry];
}

export interface TemperamentGroup {
  id: Temperament;
  label: string;
  letters: "NT" | "NF" | "SJ" | "SP";
  tagline: string;
  ethos: string;
  primary: string;   // hex
  secondary: string; // hex (deeper, for light-mode headings etc.)
}
