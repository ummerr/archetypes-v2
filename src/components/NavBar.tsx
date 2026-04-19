"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import {
  ABOUT_LINKS,
  ATLAS_LINKS,
  NAV_SYSTEMS,
  PRACTICE_LINKS,
  archetypesForSystem,
  systemFromPath,
  systemSubLinks,
  type NavLink,
} from "@/data/nav";

type GroupId = "systems" | "atlas" | "practice" | "about";

const PRACTICE_PATHS = ["/today", "/mirror", "/profile"];
const inPracticePath = (p: string) =>
  PRACTICE_PATHS.some((base) => p === base || p.startsWith(base + "/"));

export default function NavBar() {
  const { theme, toggle } = useTheme();
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState<GroupId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
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

  // Lock body scroll while mobile sheet is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

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
        className="relative max-w-5xl mx-auto px-5 sm:px-6 h-14 flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-5 min-w-0">
          <Link href="/" className="group flex items-center min-w-0">
            <span className="font-mono font-bold text-gold glow-text-subtle transition-colors duration-200 group-hover:text-gold-bright whitespace-nowrap text-label tracking-label sm:text-sm sm:tracking-kicker">
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
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-3">
          <div className="relative hidden md:block">
            <GroupTrigger id="about" label="About" open={open} setOpen={setOpen} active={groupActive("about")} />
            {open === "about" && <LinkListPanel links={ABOUT_LINKS} pathname={pathname} align="right" />}
          </div>
          <button
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="relative w-10 h-10 flex items-center justify-center text-muted hover:text-text-secondary transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`absolute transition-all duration-300 ${theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-75"}`}>
              <circle cx="8" cy="8" r="3" />
              <path d="M8 1.5v1M8 13.5v1M1.5 8h1M13.5 8h1M3.4 3.4l.7.7M11.9 11.9l.7.7M3.4 12.6l.7-.7M11.9 4.1l.7-.7" />
            </svg>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`absolute transition-all duration-300 ${theme === "light" ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"}`}>
              <path d="M13.5 8.5a5.5 5.5 0 1 1-6-6 4.5 4.5 0 0 0 6 6z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-sheet"
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-text-secondary hover:text-gold transition-colors"
          >
            <span className="sr-only">Menu</span>
            <span
              aria-hidden
              className={`absolute h-px w-5 bg-current transition-transform duration-300 ${mobileOpen ? "rotate-45" : "-translate-y-[5px]"}`}
            />
            <span
              aria-hidden
              className={`absolute h-px w-5 bg-current transition-opacity duration-200 ${mobileOpen ? "opacity-0" : "opacity-100"}`}
            />
            <span
              aria-hidden
              className={`absolute h-px w-5 bg-current transition-transform duration-300 ${mobileOpen ? "-rotate-45" : "translate-y-[5px]"}`}
            />
          </button>
        </div>

      </div>

      <SecondaryBar pathname={pathname} />
      <MobileSheet
        open={mobileOpen}
        pathname={pathname}
        onClose={() => setMobileOpen(false)}
      />
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
      className={`font-mono text-label tracking-label uppercase transition-colors duration-200 flex items-center gap-1 ${
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

function PanelShell({ children, wide, align = "left" }: { children: React.ReactNode; wide?: boolean; align?: "left" | "right" }) {
  return (
    <div
      className={`absolute ${align === "right" ? "right-0" : "left-0"} top-full mt-2 z-[60] ${wide ? "min-w-[420px]" : "min-w-[260px]"} max-w-[calc(100vw-3rem)] max-h-[70vh] overflow-y-auto rounded-md border border-gold/20 bg-bg/95 backdrop-blur-xl shadow-lg`}
    >
      {children}
    </div>
  );
}

function LinkListPanel({ links, pathname, align }: { links: NavLink[]; pathname: string; align?: "left" | "right" }) {
  return (
    <PanelShell align={align}>
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
                <div className={`font-mono text-label tracking-label uppercase ${active ? "text-gold" : "text-text-secondary"}`}>
                  {l.label}
                </div>
                {l.desc && (
                  <div className="font-serif italic text-xs text-muted mt-0.5">{l.desc}</div>
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
                  className={`font-mono text-label tracking-label uppercase ${active ? "text-gold" : "text-text-secondary hover:text-gold"}`}
                >
                  {s.name}
                </Link>
                <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${s.accent}30, transparent)` }} />
                <div className="flex items-center gap-3">
                  {s.specials.map((sp) => (
                    <Link
                      key={sp.href}
                      href={sp.href}
                      className="font-mono text-kicker tracking-label uppercase text-muted hover:text-gold"
                    >
                      {sp.label}
                    </Link>
                  ))}
                  <Link
                    href={`${s.href}/about`}
                    className="font-mono text-kicker tracking-label uppercase text-muted hover:text-gold"
                  >
                    About
                  </Link>
                </div>
              </div>
              <div className="font-serif italic text-xs text-muted mt-0.5">{s.tagline}</div>
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
  if (inAtlas) return <SimpleSecondaryBar label="Atlas" labelHref="/atlas" links={ATLAS_LINKS} pathname={pathname} />;
  if (inAbout) return <SimpleSecondaryBar label="About" links={ABOUT_LINKS} pathname={pathname} />;
  return null;
}

function barWrap(children: React.ReactNode) {
  return (
    <div className="relative border-b border-gold/10 bg-bg/70 backdrop-blur-xl">
      <div
        className="max-w-5xl mx-auto px-5 sm:px-6 h-10 flex items-center gap-4 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {children}
      </div>
    </div>
  );
}

function SimpleSecondaryBar({
  label,
  labelHref,
  links,
  pathname,
}: {
  label: string;
  labelHref?: string;
  links: NavLink[];
  pathname: string;
}) {
  const labelClass =
    "font-mono text-label tracking-kicker uppercase text-gold whitespace-nowrap";
  return barWrap(
    <>
      {labelHref ? (
        <Link href={labelHref} className={`${labelClass} transition-colors duration-200 hover:text-gold-bright`}>
          {label}
        </Link>
      ) : (
        <span className={labelClass}>{label}</span>
      )}
      <span className="text-muted/40 font-mono text-label">·</span>
      {links.map((l) => {
        const active = pathname === l.href || pathname.startsWith(l.href + "/");
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`font-mono text-label tracking-label uppercase whitespace-nowrap transition-colors duration-200 ${
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
      <Link
        href={system.href}
        className="font-mono text-label tracking-kicker uppercase whitespace-nowrap transition-opacity duration-200 hover:opacity-80"
        style={{ color: system.accent }}
      >
        {system.name}
      </Link>
      <span className="text-muted/40 font-mono text-label">·</span>
      {subs.map((l) => {
        const active = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`font-mono text-label tracking-label uppercase whitespace-nowrap transition-colors duration-200 ${
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
            className="font-mono text-label tracking-label uppercase text-text-secondary hover:text-gold flex items-center gap-1 whitespace-nowrap"
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
                        className={`block px-4 py-2 font-mono text-label tracking-label uppercase transition-colors duration-150 ${
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

// ─────────────────────────────────────────────────────────────
// Mobile sheet
// ─────────────────────────────────────────────────────────────

function MobileSheet({
  open,
  pathname,
  onClose,
}: {
  open: boolean;
  pathname: string;
  onClose: () => void;
}) {
  const [section, setSection] = useState<"root" | "systems" | "atlas" | "about">("root");

  useEffect(() => {
    if (!open) setSection("root");
  }, [open]);

  return (
    <div
      id="mobile-nav-sheet"
      aria-hidden={!open}
      className={`md:hidden fixed inset-x-0 top-14 bottom-0 z-40 transition-opacity duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-bg/70 backdrop-blur-xl"
      />
      <div
        className={`relative h-full overflow-y-auto transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "-translate-y-3"
        }`}
      >
        <div className="max-w-md mx-auto px-6 pt-8 pb-16">
          {section === "root" ? (
            <RootSheet
              pathname={pathname}
              onSelect={setSection}
              onNavigate={onClose}
            />
          ) : (
            <SubSheet
              section={section}
              pathname={pathname}
              onBack={() => setSection("root")}
              onNavigate={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function RootSheet({
  pathname,
  onSelect,
  onNavigate,
}: {
  pathname: string;
  onSelect: (s: "systems" | "atlas" | "about") => void;
  onNavigate: () => void;
}) {
  const inSystems = systemFromPath(pathname) !== null;
  const inAtlas = pathname.startsWith("/atlas") || pathname.startsWith("/archetypes");
  const inAbout = pathname.startsWith("/about");

  return (
    <div className="animate-slide-up" style={{ animationDuration: "400ms" }}>
      <p className="font-mono text-kicker tracking-display uppercase text-gold/80 mb-5">
        Navigate
      </p>
      <nav className="divide-y divide-gold/10 border-y border-gold/10">
        <SheetRow
          label="Home"
          href="/"
          active={pathname === "/"}
          onNavigate={onNavigate}
          leading="01"
        />
        <SheetGroupRow
          label="Systems"
          caption="Six traditions"
          active={inSystems}
          onClick={() => onSelect("systems")}
          leading="02"
        />
        <SheetGroupRow
          label="Atlas"
          caption="The resonance map"
          active={inAtlas}
          onClick={() => onSelect("atlas")}
          leading="03"
        />
        <SheetGroupRow
          label="About"
          caption="Method & sources"
          active={inAbout}
          onClick={() => onSelect("about")}
          leading="04"
        />
      </nav>
    </div>
  );
}

function SubSheet({
  section,
  pathname,
  onBack,
  onNavigate,
}: {
  section: "systems" | "atlas" | "about";
  pathname: string;
  onBack: () => void;
  onNavigate: () => void;
}) {
  return (
    <div className="animate-slide-up" style={{ animationDuration: "350ms" }}>
      <button
        type="button"
        onClick={onBack}
        className="group flex items-center gap-2 mb-5 font-mono text-kicker tracking-kicker uppercase text-text-secondary hover:text-gold transition-colors"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-0.5">
          <path d="M6 2L3 5l3 3" />
        </svg>
        Back
      </button>
      <p className="font-mono text-kicker tracking-display uppercase text-gold/80 mb-5">
        {section === "systems" ? "Six Systems" : section === "atlas" ? "Atlas" : "About"}
      </p>
      {section === "systems" && (
        <SystemsList pathname={pathname} onNavigate={onNavigate} />
      )}
      {section === "atlas" && (
        <LinksList links={ATLAS_LINKS} pathname={pathname} onNavigate={onNavigate} />
      )}
      {section === "about" && (
        <LinksList links={ABOUT_LINKS} pathname={pathname} onNavigate={onNavigate} />
      )}
    </div>
  );
}

function SheetRow({
  label,
  href,
  active,
  onNavigate,
  leading,
}: {
  label: string;
  href: string;
  active: boolean;
  onNavigate: () => void;
  leading?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="flex items-center gap-4 py-5 group"
    >
      {leading && (
        <span className="font-mono text-kicker tracking-kicker uppercase text-muted/60 w-6">
          {leading}
        </span>
      )}
      <span
        className={`font-serif text-2xl tracking-tight transition-colors ${
          active ? "text-gold" : "text-text-primary group-hover:text-gold"
        }`}
      >
        {label}
      </span>
      <span className="ml-auto text-muted/60 group-hover:text-gold transition-colors">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 4l4 4-4 4" />
        </svg>
      </span>
    </Link>
  );
}

function SheetGroupRow({
  label,
  caption,
  active,
  onClick,
  leading,
}: {
  label: string;
  caption: string;
  active: boolean;
  onClick: () => void;
  leading?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-4 py-5 text-left group"
    >
      {leading && (
        <span className="font-mono text-kicker tracking-kicker uppercase text-muted/60 w-6">
          {leading}
        </span>
      )}
      <span className="flex-1 min-w-0">
        <span
          className={`block font-serif text-2xl tracking-tight transition-colors ${
            active ? "text-gold" : "text-text-primary group-hover:text-gold"
          }`}
        >
          {label}
        </span>
        <span className="block font-serif italic text-xs text-muted mt-0.5">
          {caption}
        </span>
      </span>
      <span className="text-muted/60 group-hover:text-gold transition-colors">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 4l4 4-4 4" />
        </svg>
      </span>
    </button>
  );
}

function SystemsList({ pathname, onNavigate }: { pathname: string; onNavigate: () => void }) {
  return (
    <ul className="divide-y divide-gold/10 border-y border-gold/10">
      {NAV_SYSTEMS.map((s) => {
        const active = pathname === s.href || pathname.startsWith(s.href + "/");
        return (
          <li key={s.id}>
            <Link
              href={s.href}
              onClick={onNavigate}
              className="flex items-start gap-4 py-5 group"
            >
              <span
                aria-hidden
                className="mt-3 w-2 h-2 rounded-full shrink-0"
                style={{
                  background: s.accent,
                  boxShadow: `0 0 10px ${s.accent}80`,
                }}
              />
              <span className="flex-1 min-w-0">
                <span
                  className="block font-serif text-2xl tracking-tight transition-colors"
                  style={{
                    color: active ? s.accent : "var(--color-text-primary)",
                  }}
                >
                  {s.name}
                </span>
                <span className="block font-serif italic text-xs text-muted mt-0.5">
                  {s.tagline}
                </span>
              </span>
              <span className="mt-2 text-muted/60 group-hover:text-gold transition-colors shrink-0">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 4l4 4-4 4" />
                </svg>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function LinksList({
  links,
  pathname,
  onNavigate,
}: {
  links: NavLink[];
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <ul className="divide-y divide-gold/10 border-y border-gold/10">
      {links.map((l) => {
        const active = pathname === l.href || pathname.startsWith(l.href + "/");
        return (
          <li key={l.href}>
            <Link
              href={l.href}
              onClick={onNavigate}
              className="flex items-start gap-4 py-5 group"
            >
              <span className="flex-1 min-w-0">
                <span
                  className={`block font-serif text-2xl tracking-tight transition-colors ${
                    active ? "text-gold" : "text-text-primary group-hover:text-gold"
                  }`}
                >
                  {l.label}
                </span>
                {l.desc && (
                  <span className="block font-serif italic text-xs text-muted mt-0.5">
                    {l.desc}
                  </span>
                )}
              </span>
              <span className="mt-2 text-muted/60 group-hover:text-gold transition-colors shrink-0">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 4l4 4-4 4" />
                </svg>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
