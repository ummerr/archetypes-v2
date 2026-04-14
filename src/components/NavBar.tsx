"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { ALL_ARCHETYPES } from "@/data/kwml/archetypes";
import { ALL_JUNGIAN } from "@/data/jungian/archetypes";
import { ALL_ENNEAGRAM } from "@/data/enneagram/archetypes";
import { ALL_HEROSJOURNEY } from "@/data/herosjourney/archetypes";
import { ALL_TAROT } from "@/data/tarot/archetypes";

type NavItem = { label: string; href: string };

export default function NavBar() {
  const { theme, toggle } = useTheme();
  const pathname = usePathname() ?? "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const inArchetypes = pathname.startsWith("/archetypes");
  const inKwml = pathname.startsWith("/kwml");
  const inJungian = pathname.startsWith("/jungian");
  const inEnneagram = pathname.startsWith("/enneagram");
  const inHerosJourney = pathname.startsWith("/heros-journey");
  const inTarot = pathname.startsWith("/tarot");

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const navItems: NavItem[] | null = inKwml
    ? ALL_ARCHETYPES.map((a) => ({
        label: a.name,
        href: `/kwml/archetype/${a.slug}`,
      }))
    : inJungian
      ? ALL_JUNGIAN.map((a) => ({
          label: a.name,
          href: `/jungian/archetype/${a.slug}`,
        }))
      : inEnneagram
        ? ALL_ENNEAGRAM.map((a) => ({
            label: `${a.number}. ${a.name}`,
            href: `/enneagram/archetype/${a.slug}`,
          }))
        : inHerosJourney
          ? ALL_HEROSJOURNEY.map((a) => ({
              label: a.name,
              href: `/heros-journey/archetype/${a.slug}`,
            }))
          : inTarot
            ? ALL_TAROT.map((a) => ({
                label: `${a.numeral} · ${a.name}`,
                href: `/tarot/archetype/${a.slug}`,
              }))
            : null;
  const systemLabel = inKwml
    ? "KWML"
    : inJungian
      ? "Jungian"
      : inEnneagram
        ? "Enneagram"
        : inHerosJourney
          ? "Hero's Journey"
          : inTarot
            ? "Tarot"
            : null;
  const systemHref = inKwml
    ? "/kwml"
    : inJungian
      ? "/jungian"
      : inEnneagram
        ? "/enneagram"
        : inHerosJourney
          ? "/heros-journey"
          : inTarot
            ? "/tarot"
            : "/";
  const systemAbout = inKwml
    ? "/kwml/about"
    : inJungian
      ? "/jungian/about"
      : inEnneagram
        ? "/enneagram/about"
        : inHerosJourney
          ? "/heros-journey/about"
          : inTarot
            ? "/tarot/about"
            : "/";

  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      <div className="absolute inset-0 bg-bg/80 backdrop-blur-xl transition-colors duration-300" />
      <div
        className="absolute inset-x-0 bottom-0 h-px transition-colors duration-300"
        style={{
          background:
            theme === "light"
              ? "linear-gradient(90deg, transparent, var(--color-gold) 30%, var(--color-gold) 70%, transparent)"
              : "linear-gradient(90deg, transparent, var(--color-gold) 50%, transparent)",
          opacity: theme === "light" ? 0.2 : 0.1,
        }}
      />
      <div className="relative max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="group flex items-center gap-3">
            <span className="font-mono text-sm font-bold tracking-[0.25em] text-gold transition-colors duration-200 group-hover:text-gold-bright glow-text-subtle">
              MAPS OF THE INNER WORLD
            </span>
          </Link>
          <span className="text-muted/40 font-mono text-[10px]">/</span>
          <Link
            href="/archetypes"
            className={`font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 ${
              inArchetypes
                ? "text-gold"
                : "text-text-secondary hover:text-gold"
            }`}
          >
            Archetypes
          </Link>
          {systemLabel && (
            <>
              <span className="text-muted/40 font-mono text-[10px]">/</span>
              <div ref={menuRef} className="relative flex items-center">
                <Link
                  href={systemHref}
                  className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-secondary hover:text-gold transition-colors duration-200"
                >
                  {systemLabel}
                </Link>
                {navItems && (
                  <button
                    type="button"
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-label="Browse types"
                    aria-expanded={menuOpen}
                    className="ml-1 p-1 text-muted hover:text-gold transition-colors duration-200"
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
                    >
                      <path d="M2 4l3 3 3-3" />
                    </svg>
                  </button>
                )}
                {navItems && menuOpen && (
                  <div
                    className="absolute left-0 top-full mt-2 min-w-[200px] rounded-md border border-gold/20 bg-bg/95 backdrop-blur-xl shadow-lg overflow-hidden"
                  >
                    <ul className="py-1">
                      {navItems.map((item) => {
                        const active = pathname === item.href;
                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className={`block px-4 py-2 font-mono text-[11px] tracking-[0.1em] uppercase transition-colors duration-150 ${
                                active
                                  ? "text-gold bg-gold/5"
                                  : "text-text-secondary hover:text-gold hover:bg-gold/5"
                              }`}
                            >
                              {item.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="relative w-8 h-8 flex items-center justify-center text-muted hover:text-text-secondary transition-colors duration-200"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`absolute transition-all duration-300 ${
                theme === "dark"
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 rotate-90 scale-75"
              }`}
            >
              <circle cx="8" cy="8" r="3" />
              <path d="M8 1.5v1M8 13.5v1M1.5 8h1M13.5 8h1M3.4 3.4l.7.7M11.9 11.9l.7.7M3.4 12.6l.7-.7M11.9 4.1l.7-.7" />
            </svg>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`absolute transition-all duration-300 ${
                theme === "light"
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-90 scale-75"
              }`}
            >
              <path d="M13.5 8.5a5.5 5.5 0 1 1-6-6 4.5 4.5 0 0 0 6 6z" />
            </svg>
          </button>
          {(inKwml || inJungian || inEnneagram || inHerosJourney || inTarot) && (
            <Link
              href={systemAbout}
              className="font-mono text-[9px] tracking-[0.15em] text-muted uppercase hover:text-text-secondary transition-colors duration-200"
            >
              About
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
