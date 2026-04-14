interface SystemCard {
  system: string;
  mission: string;
  primary: string;
  scholarship: string;
  critique: string;
}

const SYSTEMS: SystemCard[] = [
  {
    system: "KWML",
    mission: "01",
    primary: "Moore & Gillette, King Warrior Magician Lover (1990)",
    scholarship: "Edinger, Ego and Archetype; Neumann; Turner; Eliade",
    critique: "Bolen / Murdock / Estés - feminine quaternio, Heroine's Journey",
  },
  {
    system: "Pearson-Marr",
    mission: "02",
    primary: "Pearson, Awakening the Heroes Within (1991); Hero and the Outlaw (2001)",
    scholarship: "PMAI validation studies; Jung Collected Works",
    critique: "The Drum (2025) - OCA/PMAI commercial capture critique",
  },
  {
    system: "Riso-Hudson",
    mission: "03",
    primary: "Riso & Hudson, Wisdom of the Enneagram (1999)",
    scholarship: "Ichazo -> Naranjo -> Gurdjieff -> Sufi lineage",
    critique: "Naranjo's later disavowal of integration arrows; psychometric disputes",
  },
  {
    system: "Campbell-Vogler",
    mission: "04",
    primary: "Campbell, Hero with a Thousand Faces (1949); Vogler, Writer's Journey (1992)",
    scholarship: "Segal, Rensma, IAJS on Campbell's Jungian credentials",
    critique: "Murdock's Heroine's Journey; Eurocentrism critiques; Gill (1989) on Campbell",
  },
  {
    system: "Tarot",
    mission: "05",
    primary: "Waite-Smith deck (1909); Nichols, Jung and Tarot (1980); Pollack, 78 Degrees of Wisdom (1980)",
    scholarship: "Arrien; Jung on synchronicity (indirect); Hillman",
    critique: "Divinatory vs. psychological framings; reversed-card tradition debates",
  },
  {
    system: "MBTI",
    mission: "08",
    primary: "Myers & Briggs, Gifts Differing; Jung, Psychological Types (1921)",
    scholarship: "Quenk on inferior function; Beebe's eight-function model",
    critique: "Pittenger and ongoing psychometric reliability critiques",
  },
];

export default function SixSourceMatrix() {
  return (
    <figure
      role="img"
      aria-label="Each of six traditions triangulated through primary sources, scholarship, and cultural critique"
      className="my-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {SYSTEMS.map((s) => (
          <article
            key={s.system}
            className="border border-gold/30 rounded-sm p-4 bg-surface/40"
          >
            <header className="flex items-baseline justify-between mb-3 pb-2 border-b border-gold/20">
              <h3 className="font-serif text-lg font-medium text-text-primary">{s.system}</h3>
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-gold/70">
                Mission {s.mission}
              </span>
            </header>
            <dl className="space-y-2">
              <div>
                <dt className="font-mono text-[8px] tracking-[0.3em] uppercase text-text-secondary/55 mb-0.5">
                  Primary
                </dt>
                <dd className="font-serif text-[13px] leading-snug text-text-primary/90">
                  {s.primary}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[8px] tracking-[0.3em] uppercase text-text-secondary/55 mb-0.5">
                  Scholarship
                </dt>
                <dd className="font-serif text-[13px] leading-snug text-text-secondary/85">
                  {s.scholarship}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[8px] tracking-[0.3em] uppercase text-text-secondary/55 mb-0.5">
                  Critique
                </dt>
                <dd className="font-serif italic text-[13px] leading-snug text-text-secondary/75">
                  {s.critique}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
      <figcaption className="font-mono text-[9px] tracking-[0.25em] uppercase text-text-secondary/50 mt-3">
        Fig. 2 - Each tradition worked through primary text, academic reception, and cultural critique.
      </figcaption>
    </figure>
  );
}
