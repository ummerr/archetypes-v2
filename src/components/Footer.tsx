import Link from "next/link";
import {
  ABOUT_LINKS,
  ATLAS_LINKS,
  NAV_SYSTEMS,
  PRACTICE_LINKS,
  type NavLink,
} from "@/data/nav";

export default function Footer() {
  return (
    <footer className="border-t border-gold/10 mt-16">
      <div className="max-w-5xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4">
        <Column title="Systems">
          <ul className="space-y-1.5">
            {NAV_SYSTEMS.map((s) => (
              <li key={s.id}>
                <Link
                  href={s.href}
                  className="font-mono text-label tracking-label uppercase text-text-secondary hover:text-gold transition-colors"
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
        <Column title="Practice">
          <LinkList links={PRACTICE_LINKS} />
        </Column>
        <Column title="About">
          <LinkList links={ABOUT_LINKS} />
        </Column>
      </div>
      <div className="border-t border-gold/10">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <p className="font-mono text-kicker tracking-label text-muted uppercase">
            An atlas of archetypal systems
          </p>
          <p className="font-mono text-kicker tracking-kicker text-gold/40">
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
      <h3 className="font-mono text-kicker tracking-kicker uppercase text-gold mb-4">
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
          {l.soon ? (
            <span className="font-mono text-label tracking-label uppercase text-muted/60 cursor-default">
              {l.label}
              <span className="ml-2 text-kicker tracking-kicker text-gold/40">— soon</span>
            </span>
          ) : (
            <Link
              href={l.href}
              className="font-mono text-label tracking-label uppercase text-text-secondary hover:text-gold transition-colors"
            >
              {l.label}
            </Link>
          )}
          {l.desc && (
            <div className={`font-serif italic text-xs ${l.soon ? "text-muted/50" : "text-muted"}`}>{l.desc}</div>
          )}
        </li>
      ))}
    </ul>
  );
}
