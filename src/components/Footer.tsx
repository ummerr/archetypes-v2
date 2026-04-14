import Link from "next/link";
import {
  ABOUT_LINKS,
  ATLAS_LINKS,
  NAV_SYSTEMS,
  type NavLink,
} from "@/data/nav";

export default function Footer() {
  return (
    <footer className="border-t border-gold/10 mt-16">
      <div className="max-w-5xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
        <Column title="Systems">
          <ul className="space-y-1.5">
            {NAV_SYSTEMS.map((s) => (
              <li key={s.id}>
                <Link
                  href={s.href}
                  className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-secondary hover:text-gold transition-colors"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </Column>
        <Column title="Atlas">
          <LinkList links={ATLAS_LINKS} />
        </Column>
        <Column title="About">
          <LinkList links={ABOUT_LINKS} />
        </Column>
      </div>
      <div className="border-t border-gold/10">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <p className="font-mono text-[9px] tracking-[0.1em] text-muted uppercase">
            An atlas of archetypal systems
          </p>
          <p className="font-mono text-[9px] tracking-[0.25em] text-gold/40">
            MAPS OF THE INNER WORLD
          </p>
        </div>
      </div>
    </footer>
  );
}

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-mono text-[9px] tracking-[0.3em] uppercase text-gold mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}

function LinkList({ links }: { links: NavLink[] }) {
  return (
    <ul className="space-y-1.5">
      {links.map((l) => (
        <li key={l.href}>
          <Link
            href={l.href}
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-secondary hover:text-gold transition-colors"
          >
            {l.label}
          </Link>
          {l.desc && (
            <div className="font-serif italic text-[11px] text-muted">{l.desc}</div>
          )}
        </li>
      ))}
    </ul>
  );
}
