export type SystemStatus = "live" | "soon";

export interface ArchetypeSystem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  href?: string;
  status: SystemStatus;
  accent: string;
  accentLight: string;
  count: number;
  framework: string;
}

export const SYSTEMS: ArchetypeSystem[] = [
  {
    id: "kwml",
    name: "KWML",
    subtitle: "Archetypes of the Mature Masculine",
    description:
      "Four primal energy patterns — King, Warrior, Magician, Lover — each with its boy form, fullness, and two shadow poles.",
    href: "/kwml",
    status: "live",
    accent: "#C6A355",
    accentLight: "#6B5010",
    count: 8,
    framework: "Moore & Gillette",
  },
  {
    id: "jungian",
    name: "Jungian",
    subtitle: "Twelve Heroic Archetypes",
    description:
      "Universal motivations clustered across Ego, Soul, and Self — the Pearson-Marr taxonomy rooted in Jung's collective unconscious.",
    href: "/jungian",
    status: "live",
    accent: "#6B4E8C",
    accentLight: "#4A2E6B",
    count: 12,
    framework: "Pearson & Marr",
  },
  {
    id: "enneagram",
    name: "Enneagram",
    subtitle: "Nine Personality Types",
    description:
      "Nine interconnected types organized around core fears, desires, and paths of integration.",
    status: "soon",
    accent: "#4A6FA5",
    accentLight: "#274A7A",
    count: 9,
    framework: "Riso-Hudson",
  },
  {
    id: "mbti",
    name: "Myers-Briggs",
    subtitle: "Sixteen Cognitive Patterns",
    description:
      "Sixteen types built from four dichotomies of perception and judgment — a map of cognitive preference.",
    status: "soon",
    accent: "#3F7D5C",
    accentLight: "#1F5238",
    count: 16,
    framework: "Myers & Briggs",
  },
];
