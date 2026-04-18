"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void): () => void {
  const id = setInterval(callback, 1000);
  return () => clearInterval(id);
}

function getClientSnapshot(): number {
  return Date.now();
}

function getServerSnapshot(): number {
  return 0;
}

function remainingFromNow(now: number): { h: number; m: number; s: number } {
  const d = new Date(now);
  const next = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1, 0, 0, 0, 0);
  const ms = Math.max(0, next - now);
  const total = Math.floor(ms / 1000);
  return {
    h: Math.floor(total / 3600),
    m: Math.floor((total % 3600) / 60),
    s: total % 60,
  };
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export default function NextDrawCountdown() {
  const now = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const label = now
    ? (() => {
        const t = remainingFromNow(now);
        return `${pad(t.h)}h ${pad(t.m)}m ${pad(t.s)}s`;
      })()
    : "—h —m —s";

  return (
    <p
      className="font-mono text-kicker tracking-kicker uppercase text-muted"
      suppressHydrationWarning
    >
      Next draw in {label} · UTC midnight
    </p>
  );
}
