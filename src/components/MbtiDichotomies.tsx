"use client";

import { useTheme } from "@/components/ThemeProvider";

type Pole = {
  letter: string;
  name: string;
  gloss: string;
};

type Axis = {
  id: string;
  kicker: string;
  question: string;
  left: Pole;
  right: Pole;
};

const AXES: Axis[] = [
  {
    id: "ei",
    kicker: "Energy",
    question: "Where does attention recharge?",
    left: { letter: "E", name: "Extraversion", gloss: "Refined by contact. Thought clarifies as it leaves the mouth." },
    right: { letter: "I", name: "Introversion", gloss: "Refined in solitude. Thought clarifies before it leaves the mouth." },
  },
  {
    id: "sn",
    kicker: "Perception",
    question: "What does the mind reach for first?",
    left: { letter: "S", name: "Sensing", gloss: "What is. The given world, exact and present, taken at its weight." },
    right: { letter: "N", name: "Intuition", gloss: "What could be. The pattern beneath, the next move already implied." },
  },
  {
    id: "tf",
    kicker: "Judgment",
    question: "By what measure is a thing decided?",
    left: { letter: "T", name: "Thinking", gloss: "By principle. Impersonal logic; the rule that holds when no one is watching." },
    right: { letter: "F", name: "Feeling", gloss: "By value. What matters, to whom, and at what cost — weighed in the body." },
  },
  {
    id: "jp",
    kicker: "Orientation",
    question: "How is the outer world held?",
    left: { letter: "J", name: "Judging", gloss: "Closed by preference. Decisions early; the plan settles the room." },
    right: { letter: "P", name: "Perceiving", gloss: "Held open. Decisions late; options stay alive as long as they can." },
  },
];

export default function MbtiDichotomies() {
  const { theme } = useTheme();
  const light = theme === "light";
  const gold = light ? "#A8842C" : "#D4A537";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gold/15 border border-gold/15 rounded-sm overflow-hidden">
      {AXES.map((axis, idx) => (
        <section
          key={axis.id}
          className="p-6 md:p-7 animate-slide-up"
          style={{
            animationDelay: `${150 + idx * 80}ms`,
            background: light ? "var(--color-bg-primary)" : "var(--color-bg-primary)",
          }}
        >
          {/* Header */}
          <div className="flex items-baseline justify-between gap-3 mb-5">
            <span
              className="font-mono text-[9px] tracking-[0.35em] uppercase"
              style={{ color: gold }}
            >
              {axis.kicker}
            </span>
            <span className="font-mono text-[8px] tracking-[0.2em] text-muted uppercase italic truncate">
              {axis.question}
            </span>
          </div>

          {/* Pole pair */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <PoleSide pole={axis.left} align="left" gold={gold} />
            <span
              className="font-mono text-[10px] tracking-[0.3em] uppercase"
              style={{ color: gold + (light ? "66" : "55") }}
            >
              vs
            </span>
            <PoleSide pole={axis.right} align="right" gold={gold} />
          </div>

          {/* Glosses */}
          <div className="mt-5 grid grid-cols-2 gap-4 md:gap-5 pt-4 border-t" style={{ borderColor: gold + (light ? "20" : "14") }}>
            <p className="text-xs md:text-[13px] text-text-secondary leading-relaxed font-light">
              {axis.left.gloss}
            </p>
            <p className="text-xs md:text-[13px] text-text-secondary leading-relaxed font-light text-right">
              {axis.right.gloss}
            </p>
          </div>
        </section>
      ))}
    </div>
  );
}

function PoleSide({ pole, align, gold }: { pole: Pole; align: "left" | "right"; gold: string }) {
  const isRight = align === "right";
  return (
    <div className={`flex items-baseline gap-2 ${isRight ? "justify-end" : "justify-start"}`}>
      {isRight && (
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-text-secondary">
          {pole.name}
        </span>
      )}
      <span
        className="font-serif text-4xl md:text-5xl leading-none font-medium"
        style={{ color: gold }}
      >
        {pole.letter}
      </span>
      {!isRight && (
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-text-secondary">
          {pole.name}
        </span>
      )}
    </div>
  );
}
