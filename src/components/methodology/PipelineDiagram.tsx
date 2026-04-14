interface Mission {
  n: string;
  title: string;
  output: string;
}

interface Phase {
  id: string;
  label: string;
  mode: string;
  tint: string;
  missions: Mission[];
}

const PHASES: Phase[] = [
  {
    id: "phase-1",
    label: "Phase 1 - Deep Research",
    mode: "Web search + fetch + synthesis",
    tint: "#1B9E6B",
    missions: [
      { n: "01", title: "Moore & Gillette primary sources", output: "01-moore-gillette.json" },
      { n: "02", title: "Pearson & Marr primary sources", output: "02-pearson-marr.json" },
      { n: "03", title: "Riso & Hudson / Enneagram", output: "03-riso-hudson.json" },
      { n: "04", title: "Campbell & Vogler", output: "04-campbell-vogler.json" },
      { n: "05", title: "Jungian Tarot tradition", output: "05-jungian-tarot.json" },
      { n: "06", title: "Existing cross-system mappings", output: "06-existing-mappings.json" },
      { n: "07", title: "Cultural & gender critique", output: "07-cultural-critique.json" },
    ],
  },
  {
    id: "phase-2",
    label: "Phase 2 - Structural Analysis",
    mode: "No web. Reads Phase 1 outputs + site corpus",
    tint: "#8C8A82",
    missions: [
      { n: "08", title: "Structural similarity analysis", output: "08-structural-similarity.json" },
      { n: "09", title: "Meta-pattern discovery", output: "09-meta-patterns.json" },
    ],
  },
  {
    id: "phase-3",
    label: "Phase 3 - Adversarial Debate",
    mode: "Devil's-advocate synthesis",
    tint: "#C0392B",
    missions: [
      { n: "10", title: "Attack every mapping", output: "10-adversarial.json" },
    ],
  },
  {
    id: "phase-4",
    label: "Phase 4 - Editorial Synthesis",
    mode: "Triangulate, caveat, cite, publish",
    tint: "#D4AF37",
    missions: [
      {
        n: "11",
        title: "Grounded map with confidence tiers",
        output: "grounded-resonance-map.json",
      },
    ],
  },
];

export default function PipelineDiagram() {
  return (
    <figure
      role="img"
      aria-label="Eleven-mission research pipeline across four phases"
      className="my-10 w-full"
    >
      <div className="flex flex-col gap-5">
        {PHASES.map((p) => (
          <div
            key={p.id}
            className="border rounded-sm p-4 md:p-5"
            style={{ borderColor: `${p.tint}55`, background: `${p.tint}08` }}
          >
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-3">
              <h3
                className="font-mono text-[10px] tracking-[0.3em] uppercase"
                style={{ color: p.tint }}
              >
                {p.label}
              </h3>
              <p className="font-serif italic text-[13px] text-text-secondary/70">{p.mode}</p>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {p.missions.map((m) => (
                <li
                  key={m.n}
                  className="flex items-start gap-3 border border-text-secondary/15 rounded-sm p-3 bg-bg/40"
                >
                  <span
                    className="font-mono text-[11px] tracking-[0.2em] shrink-0 pt-0.5"
                    style={{ color: p.tint }}
                  >
                    {m.n}
                  </span>
                  <div className="min-w-0">
                    <p className="font-serif text-[14px] leading-snug text-text-primary">
                      {m.title}
                    </p>
                    <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-text-secondary/55 mt-1 truncate">
                      {"\u2192"} {m.output}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <figcaption className="font-mono text-[9px] tracking-[0.25em] uppercase text-text-secondary/50 mt-3">
        Fig. 1 - Four phases, eleven missions. All outputs preserved in /research/.
      </figcaption>
    </figure>
  );
}
