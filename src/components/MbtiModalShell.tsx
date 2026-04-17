"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useModalA11y } from "@/components/shared/useModalA11y";

const CLOSE_DURATION_MS = 220;

export default function MbtiModalShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<() => void>(() => {});

  useEffect(() => {
    const raf = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useModalA11y(panelRef, closeRef);
  closeRef.current = close;

  function close() {
    setOpen(false);
    setTimeout(() => router.back(), CLOSE_DURATION_MS);
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain">
      <div
        onClick={close}
        aria-hidden
        className="fixed inset-0 transition-opacity ease-out"
        style={{
          transitionDuration: `${CLOSE_DURATION_MS}ms`,
          background: "rgba(6, 6, 10, 0.78)",
          opacity: open ? 1 : 0,
        }}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="relative min-h-full flex items-start justify-center px-4 py-10 md:py-14"
      >
        <div
          className="relative w-full max-w-5xl transition-all duration-[260ms] ease-out"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(-12px)",
            background: "var(--color-bg, #0A0A0F)",
            borderTop: "1px solid rgba(91,122,153,0.45)",
            borderBottom: "1px solid rgba(91,122,153,0.18)",
          }}
        >
          <div
            className="sticky top-0 z-20 flex items-center justify-between px-6 py-3"
            style={{
              background:
                "linear-gradient(180deg, var(--color-bg, #0A0A0F) 70%, transparent)",
            }}
          >
            <span className="font-mono text-kicker tracking-display uppercase" style={{ color: "#8FA7C2" }}>
              Cognitive Pattern
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="group inline-flex items-center gap-2 font-mono text-kicker tracking-kicker uppercase text-muted hover:text-gold transition-colors"
            >
              <span>close</span>
              <span className="text-kicker opacity-60 group-hover:opacity-100">esc</span>
              <span className="w-4 h-px bg-current" />
            </button>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
