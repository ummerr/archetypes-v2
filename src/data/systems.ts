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
    href: "/enneagram",
    status: "live",
    accent: "#4A6FA5",
    accentLight: "#274A7A",
    count: 9,
    framework: "Riso-Hudson",
  },
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
  {
    id: "heros-journey",
    name: "Hero's Journey",
    subtitle: "Archetypes of the Monomyth",
    description:
      "Twelve stages and eight recurring masks — Hero, Mentor, Herald, Threshold Guardian, Shapeshifter, Shadow, Trickster, Ally — the circular geometry of Campbell and Vogler's monomyth.",
    href: "/heros-journey",
    status: "live",
    accent: "#B85C38",
    accentLight: "#7A3A1E",
    count: 8,
    framework: "Campbell & Vogler",
  },
  {
    id: "tarot",
    name: "Tarot",
    subtitle: "The Major Arcana",
    description:
      "Twenty-two symbolic figures tracing the Fool's journey through initiation, trial, and transcendence — archetypes rendered as images.",
    status: "soon",
    accent: "#8C3A5E",
    accentLight: "#5E1F3D",
    count: 22,
    framework: "Major Arcana",
  },
];
