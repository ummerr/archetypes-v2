import { CognitiveFunction, FunctionCode } from "@/types/mbti";

export const COGNITIVE_FUNCTIONS: Record<FunctionCode, CognitiveFunction> = {
  Ni: {
    code: "Ni",
    name: "Introverted Intuition",
    nickname: "Perspectives",
    blurb:
      "Synthesizes vast unconscious patterns into singular, focused visions of the future. Drives toward long-term inevitabilities.",
    process: "N",
    attitude: "i",
  },
  Ne: {
    code: "Ne",
    name: "Extraverted Intuition",
    nickname: "Exploration",
    blurb:
      "Sees an expanding web of possibilities and abstract connections in the external world. Generates divergent ideas through play.",
    process: "N",
    attitude: "e",
  },
  Si: {
    code: "Si",
    name: "Introverted Sensing",
    nickname: "Memory",
    blurb:
      "Compares present sensory input against a deep internal archive of past experience. Seeks consistency, reliability, and form.",
    process: "S",
    attitude: "i",
  },
  Se: {
    code: "Se",
    name: "Extraverted Sensing",
    nickname: "Sensation",
    blurb:
      "Acts directly on concrete data in the present moment. Hyper-aware of the physical field, tactically responsive, kinetic.",
    process: "S",
    attitude: "e",
  },
  Ti: {
    code: "Ti",
    name: "Introverted Thinking",
    nickname: "Accuracy",
    blurb:
      "Seeks internal logical consistency above all else. Defines terms precisely and ruthlessly eliminates contradiction.",
    process: "T",
    attitude: "i",
  },
  Te: {
    code: "Te",
    name: "Extraverted Thinking",
    nickname: "Efficiency",
    blurb:
      "Imposes empirical logic and structural order on the external world. Optimizes systems, measures outcomes, executes.",
    process: "T",
    attitude: "e",
  },
  Fi: {
    code: "Fi",
    name: "Introverted Feeling",
    nickname: "Authenticity",
    blurb:
      "Evaluates against a deep internal value hierarchy. Champions individual truth and fiercely protects the sanctity of self.",
    process: "F",
    attitude: "i",
  },
  Fe: {
    code: "Fe",
    name: "Extraverted Feeling",
    nickname: "Harmony",
    blurb:
      "Reads the collective emotional field and adjusts to facilitate consensus. Tuned to group values, mood, and ethics.",
    process: "F",
    attitude: "e",
  },
};

export function getFunction(code: FunctionCode): CognitiveFunction {
  return COGNITIVE_FUNCTIONS[code];
}
