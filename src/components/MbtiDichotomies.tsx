"use client";

import { useTheme } from "@/components/ThemeProvider";

type Pole = {
  letter: string;
  name: string;
  gloss: string;
  keywords: string[];
};

type Axis = {
  id: string;
  kicker: string;
  question: string;
  left: Pole;
  right: Pole;
  symbol: (props: { color: string; muted: string }) => React.ReactNode;
};

const AXES: Axis[] = [
  {
    id: "ei",
    kicker: "Axis I · Energy",
    question: "Where does attention recharge?",
    left: {
      letter: "E",
      name: "Extraversion",
      gloss: "Refined by contact. Thought clarifies as it leaves the mouth.",
      keywords: ["outward", "expressive", "breadth", "spoken"],
    },
    right: {
      letter: "I",
      name: "Introversion",
      gloss: "Refined in solitude. Thought clarifies before it leaves the mouth.",
      keywords: ["inward", "considered", "depth", "rehearsed"],
    },
    symbol: ({ color, muted }) => (
      <svg viewBox="0 0 60 60" className="w-full h-full">
        <circle cx="30" cy="30" r="6" fill="none" stroke={color} strokeWidth="1" />
        <path d="M14 30 L20 30 M40 30 L46 30" stroke={muted} strokeWidth="1" strokeLinecap="round" />
        <path d="M10 30 L14 27 L14 33 Z" fill={color} />
        <path d="M50 30 L46 27 L46 33 Z" fill={color} />
      </svg>
    ),
  },
  {
    id: "sn",
    kicker: "Axis II · Perception",
    question: "What does the mind reach for first?",
    left: {
      letter: "S",
      name: "Sensing",
      gloss: "What is. The given world, exact and present, taken at its weight.",
      keywords: ["concrete", "present", "literal", "grounded"],
    },
    right: {
      letter: "N",
      name: "Intuition",
      gloss: "What could be. The pattern beneath, the next move already implied.",
      keywords: ["abstract", "potential", "symbolic", "associative"],
    },
    symbol: ({ color, muted }) => (
      <svg viewBox="0 0 60 60" className="w-full h-full">
        <line x1="10" y1="42" x2="50" y2="42" stroke={muted} strokeWidth="1" />
        <circle cx="22" cy="42" r="1.5" fill={color} />
        <circle cx="34" cy="14" r="1.5" fill={color} />
        <circle cx="44" cy="22" r="1.5" fill={color} />
        <circle cx="18" cy="20" r="1.5" fill={color} />
        <path d="M18 20 L34 14 L44 22" stroke={color} strokeWidth="0.5" fill="none" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: "tf",
    kicker: "Axis III · Judgment",
    question: "By what measure is a thing decided?",
    left: {
      letter: "T",
      name: "Thinking",
      gloss: "By principle. Impersonal logic; the rule that holds when no one is watching.",
      keywords: ["logic", "criteria", "impersonal", "consistent"],
    },
    right: {
      letter: "F",
      name: "Feeling",
      gloss: "By value. What matters, to whom, and at what cost — weighed in the body.",
      keywords: ["values", "harmony", "personal", "humane"],
    },
    symbol: ({ color, muted }) => (
      <svg viewBox="0 0 60 60" className="w-full h-full">
        <line x1="30" y1="14" x2="30" y2="46" stroke={muted} strokeWidth="1" />
        <line x1="14" y1="22" x2="46" y2="22" stroke={color} strokeWidth="1" />
        <circle cx="14" cy="22" r="3" fill="none" stroke={color} strokeWidth="1" />
        <circle cx="46" cy="22" r="3" fill="none" stroke={color} strokeWidth="1" />
        <circle cx="30" cy="14" r="1.5" fill={color} />
      </svg>
    ),
  },
  {
    id: "jp",
    kicker: "Axis IV · Orientation",
    question: "How is the outer world held?",
    left: {
      letter: "J",
      name: "Judging",
      gloss: "Closed by preference. Decisions early; the plan settles the room.",
      keywords: ["decided", "scheduled", "settled", "structured"],
    },
    right: {
      letter: "P",
      name: "Perceiving",
      gloss: "Held open. Decisions late; options stay alive as long as they can.",
      keywords: ["adaptive", "spontaneous", "open", "fluid"],
    },
    symbol: ({ color, muted }) => (
      <svg viewBox="0 0 60 60" className="w-full h-full">
        <path d="M22 18 L18 18 L18 42 L22 42" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" />
        <path d="M26 18 L26 42" stroke={color} strokeWidth="1" strokeLinecap="round" />
        <path d="M34 18 L34 42" stroke={muted} strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" />
        <path d="M38 18 L42 18 M38 42 L42 42" stroke={muted} strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" />
      </svg>
    ),
  },
];

export default function MbtiDichotomies() {
  const { theme } = useTheme();
  const light = theme === "light";
  const gold = light ? "#A8842C" : "#D4A537";
  const muted = light ? "#A8842C66" : "#D4A53755";

  return (
    <div className="space-y-16 md:space-y-20">
      {AXES.map((axis, idx) => (
        <section
          key={axis.id}
          className="animate-slide-up"
          style={{ animationDelay: `${200 + idx * 110}ms` }}
        >
          {/* Kicker */}
          <div className="mb-8 flex items-center gap-4 flex-wrap">
            <span
              className="font-mono text-[10px] tracking-[0.35em] uppercase"
              style={{ color: gold }}
            >
              {axis.kicker}
            </span>
            <div
              className="h-px flex-1 min-w-[40px]"
              style={{
                background: `linear-gradient(90deg, ${gold}${light ? "30" : "20"}, transparent)`,
              }}
            />
            <span className="font-mono text-[9px] tracking-[0.25em] text-muted uppercase italic">
              {axis.question}
            </span>
          </div>

          {/* Pole pair */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-4 md:gap-8">
            {/* Left pole */}
            <PoleBlock pole={axis.left} align="left" gold={gold} light={light} />

            {/* Center meridian */}
            <div className="flex flex-col items-center justify-center w-12 md:w-20 relative">
              <div
                className="absolute inset-x-0 top-0 bottom-0 mx-auto w-px"
                style={{
                  background: `linear-gradient(180deg, transparent, ${gold}${light ? "40" : "30"} 20%, ${gold}${light ? "40" : "30"} 80%, transparent)`,
                }}
              />
              <div
                className="relative w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center backdrop-blur-sm"
                style={{
                  background: light ? "rgba(255,253,247,0.85)" : "rgba(10,10,14,0.85)",
                  border: `1px solid ${gold}${light ? "35" : "25"}`,
                }}
              >
                <div className="w-5 h-5 md:w-7 md:h-7">
                  {axis.symbol({ color: gold, muted })}
                </div>
              </div>
            </div>

            {/* Right pole */}
            <PoleBlock pole={axis.right} align="right" gold={gold} light={light} />
          </div>
        </section>
      ))}
    </div>
  );
}

function PoleBlock({
  pole,
  align,
  gold,
  light,
}: {
  pole: Pole;
  align: "left" | "right";
  gold: string;
  light: boolean;
}) {
  const isRight = align === "right";
  return (
    <div
      className={`relative p-5 md:p-7 rounded-sm ${isRight ? "text-right" : "text-left"}`}
      style={{
        background: isRight
          ? `linear-gradient(290deg, ${gold}${light ? "10" : "0A"}, transparent 75%)`
          : `linear-gradient(70deg, ${gold}${light ? "10" : "0A"}, transparent 75%)`,
        border: `1px solid ${gold}${light ? "22" : "14"}`,
      }}
    >
      <div className={`flex items-baseline gap-3 md:gap-4 ${isRight ? "justify-end" : "justify-start"}`}>
        <span
          className="font-serif text-6xl md:text-7xl leading-none font-medium"
          style={{ color: gold, opacity: light ? 0.95 : 0.9 }}
        >
          {pole.letter}
        </span>
        <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-text-secondary">
          {pole.name}
        </span>
      </div>
      <p className="mt-4 md:mt-5 text-sm md:text-base text-text-primary leading-relaxed font-light max-w-sm"
        style={isRight ? { marginLeft: "auto" } : undefined}
      >
        {pole.gloss}
      </p>
      <div className={`mt-4 flex flex-wrap gap-x-3 gap-y-1 ${isRight ? "justify-end" : "justify-start"}`}>
        {pole.keywords.map((k) => (
          <span
            key={k}
            className="font-mono text-[9px] tracking-[0.25em] uppercase text-muted"
          >
            {k}
          </span>
        ))}
      </div>
    </div>
  );
}
