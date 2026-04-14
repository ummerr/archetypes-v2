"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import {
  ABOUT_LINKS,
  ATLAS_LINKS,
  NAV_SYSTEMS,
  archetypesForSystem,
  systemFromPath,
  systemSubLinks,
  type NavLink,
} from "@/data/nav";

type GroupId = "systems" | "atlas" | "about";

export default function NavBar() {
  const { theme, toggle } = useTheme();
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState<GroupId | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(null);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const activeSystem = systemFromPath(pathname);
  const inAtlas = pathname.startsWith("/atlas") || pathname.startsWith("/archetypes");
  const inAbout = pathname.startsWith("/about");

  const groupActive = (g: GroupId) =>
    g === "systems"
      ? activeSystem !== null
      : g === "atlas"
        ? inAtlas
        : inAbout;

  const hasSecondary =
    systemFromPath(pathname) !== null ||
    pathname.startsWith("/atlas") ||
    pathname.startsWith("/archetypes") ||
    pathname.startsWith("/about");

  return (
    <>
    <div aria-hidden className={hasSecondary ? "h-24" : "h-14"} />
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
      <div
        ref={wrapRef}
        className="relative max-w-5xl mx-auto px-6 h-14 flex items-center justify-between"
      >
        <div className="flex items-center gap-5">
          <Link href="/" className="group flex items-center gap-3">
            <span className="font-mono text-sm font-bold tracking-[0.25em] text-gold transition-colors duration-200 group-hover:text-gold-bright glow-text-subtle">
              MAPS OF THE INNER WORLD
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <GroupTrigger id="systems" label="Systems" open={open} setOpen={setOpen} active={groupActive("systems")} />
              {open === "systems" && <SystemsPanel pathname={pathname} />}
            </div>
            <div className="relative">
              <GroupTrigger id="atlas" label="Atlas" open={open} setOpen={setOpen} active={groupActive("atlas")} />
              {open === "atlas" && <LinkListPanel links={ATLAS_LINKS} pathname={pathname} />}
            </div>
            <div className="relative">
              <GroupTrigger id="about" label="About" open={open} setOpen={setOpen} active={groupActive("about")} />
              {open === "about" && <LinkListPanel links={ABOUT_LINKS} pathname={pathname} />}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="relative w-8 h-8 flex items-center justify-center text-muted hover:text-text-secondary transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`absolute transition-all duration-300 ${theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-75"}`}>
              <circle cx="8" cy="8" r="3" />
              <path d="M8 1.5v1M8 13.5v1M1.5 8h1M13.5 8h1M3.4 3.4l.7.7M11.9 11.9l.7.7M3.4 12.6l.7-.7M11.9 4.1l.7-.7" />
            </svg>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`absolute transition-all duration-300 ${theme === "light" ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"}`}>
              <path d="M13.5 8.5a5.5 5.5 0 1 1-6-6 4.5 4.5 0 0 0 6 6z" />
            </svg>
          </button>
        </div>

      </div>

      <SecondaryBar pathname={pathname} />
    </nav>
    </>
  );
}

function GroupTrigger({
  id,
  label,
  open,
  setOpen,
  active,
}: {
  id: GroupId;
  label: string;
  open: GroupId | null;
  setOpen: (g: GroupId | null) => void;
  active: boolean;
}) {
  const isOpen = open === id;
  return (
    <button
      type="button"
      onClick={() => setOpen(isOpen ? null : id)}
      aria-expanded={isOpen}
      className={`font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 flex items-center gap-1 ${
        active || isOpen ? "text-gold" : "text-text-secondary hover:text-gold"
      }`}
    >
      {label}
      <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
        <path d="M2 4l3 3 3-3" />
      </svg>
    </button>
  );
}

function PanelShell({ children, wide }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <div
      className={`absolute left-0 top-full mt-2 z-[60] ${wide ? "min-w-[420px]" : "min-w-[260px]"} max-w-[calc(100vw-3rem)] max-h-[70vh] overflow-y-auto rounded-md border border-gold/20 bg-bg/95 backdrop-blur-xl shadow-lg`}
    >
      {children}
    </div>
  );
}

function LinkListPanel({ links, pathname }: { links: NavLink[]; pathname: string }) {
  return (
    <PanelShell>
      <ul className="py-2">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`block px-4 py-2.5 transition-colors duration-150 ${
                  active ? "bg-gold/5" : "hover:bg-gold/5"
                }`}
              >
                <div className={`font-mono text-[11px] tracking-[0.15em] uppercase ${active ? "text-gold" : "text-text-secondary"}`}>
                  {l.label}
                </div>
                {l.desc && (
                  <div className="font-serif italic text-[12px] text-muted mt-0.5">{l.desc}</div>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </PanelShell>
  );
}

function SystemsPanel({ pathname }: { pathname: string }) {
  return (
    <PanelShell wide>
      <ul className="py-2">
        {NAV_SYSTEMS.map((s) => {
          const active = pathname === s.href || pathname.startsWith(s.href + "/");
          return (
            <li key={s.id} className="px-4 py-2.5 hover:bg-gold/5">
              <div className="flex items-baseline gap-3">
                <Link
                  href={s.href}
                  className={`font-mono text-[11px] tracking-[0.15em] uppercase ${active ? "text-gold" : "text-text-secondary hover:text-gold"}`}
                >
                  {s.name}
                </Link>
                <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${s.accent}30, transparent)` }} />
                <div className="flex items-center gap-3">
                  {s.specials.map((sp) => (
                    <Link
                      key={sp.href}
                      href={sp.href}
                      className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted hover:text-gold"
                    >
                      {sp.label}
                    </Link>
                  ))}
                  <Link
                    href={`${s.href}/about`}
                    className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted hover:text-gold"
                  >
                    About
                  </Link>
                </div>
              </div>
              <div className="font-serif italic text-[12px] text-muted mt-0.5">{s.tagline}</div>
            </li>
          );
        })}
      </ul>
    </PanelShell>
  );
}

function SecondaryBar({ pathname }: { pathname: string }) {
  const system = systemFromPath(pathname);
  const inAtlas = pathname.startsWith("/atlas") || pathname.startsWith("/archetypes");
  const inAbout = pathname.startsWith("/about");

  if (system) return <SystemSecondaryBar system={system} pathname={pathname} />;
  if (inAtlas) return <SimpleSecondaryBar label="Atlas" links={ATLAS_LINKS} pathname={pathname} />;
  if (inAbout) return <SimpleSecondaryBar label="About" links={ABOUT_LINKS} pathname={pathname} />;
  return null;
}

function barWrap(children: React.ReactNode) {
  return (
    <div className="relative border-b border-gold/10 bg-bg/70 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-6 h-10 flex items-center gap-4 overflow-x-auto">
        {children}
      </div>
    </div>
  );
}

function SimpleSecondaryBar({
  label,
  links,
  pathname,
}: {
  label: string;
  links: NavLink[];
  pathname: string;
}) {
  return barWrap(
    <>
      <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-gold whitespace-nowrap">{label}</span>
      <span className="text-muted/40 font-mono text-[10px]">·</span>
      {links.map((l) => {
        const active = pathname === l.href || pathname.startsWith(l.href + "/");
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`font-mono text-[10px] tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-200 ${
              active ? "text-gold" : "text-text-secondary hover:text-gold"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </>
  );
}

function SystemSecondaryBar({
  system,
  pathname,
}: {
  system: NonNullable<ReturnType<typeof systemFromPath>>;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const subs = systemSubLinks(system);
  const archetypes = archetypesForSystem(system.id);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return barWrap(
    <>
      <span
        className="font-mono text-[10px] tracking-[0.25em] uppercase whitespace-nowrap"
        style={{ color: system.accent }}
      >
        {system.name}
      </span>
      <span className="text-muted/40 font-mono text-[10px]">·</span>
      {subs.map((l) => {
        const active = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`font-mono text-[10px] tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-200 ${
              active ? "text-gold" : "text-text-secondary hover:text-gold"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
      {archetypes.length > 0 && (
        <div ref={ref} className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-secondary hover:text-gold flex items-center gap-1 whitespace-nowrap"
          >
            Archetypes
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
              <path d="M2 4l3 3 3-3" />
            </svg>
          </button>
          {open && (
            <div className="absolute left-0 top-full mt-2 min-w-[220px] max-h-[70vh] overflow-y-auto rounded-md border border-gold/20 bg-bg/95 backdrop-blur-xl shadow-lg z-50">
              <ul className="py-1">
                {archetypes.map((a) => {
                  const active = pathname === a.href;
                  return (
                    <li key={a.href}>
                      <Link
                        href={a.href}
                        className={`block px-4 py-2 font-mono text-[11px] tracking-[0.1em] uppercase transition-colors duration-150 ${
                          active ? "text-gold bg-gold/5" : "text-text-secondary hover:text-gold hover:bg-gold/5"
                        }`}
                      >
                        {a.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
}
