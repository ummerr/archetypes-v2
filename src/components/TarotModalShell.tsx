"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TarotModalShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setOpen(true));
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function close() {
    setOpen(false);
    setTimeout(() => router.back(), 220);
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div
        onClick={close}
        aria-hidden
        className="fixed inset-0 transition-opacity duration-[220ms] ease-out"
        style={{
          background: "rgba(6, 6, 10, 0.78)",
          opacity: open ? 1 : 0,
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative min-h-full flex items-start justify-center px-4 py-10 md:py-14"
      >
        <div
          className="relative w-full max-w-5xl transition-all duration-[260ms] ease-out"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(-12px)",
            background: "var(--color-bg, #0A0A0F)",
            borderTop: "1px solid rgba(212,175,55,0.35)",
            borderBottom: "1px solid rgba(212,175,55,0.15)",
          }}
        >
          {/* Top rail: breadcrumb-like label + close */}
          <div
            className="sticky top-0 z-20 flex items-center justify-between px-6 py-3"
            style={{
              background:
                "linear-gradient(180deg, var(--color-bg, #0A0A0F) 70%, transparent)",
            }}
          >
            <span className="font-mono text-[9px] tracking-[0.4em] text-gold/70 uppercase">
              Major Arcanum
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="group inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase text-muted hover:text-gold transition-colors"
            >
              <span>close</span>
              <span className="text-[8px] opacity-60 group-hover:opacity-100">esc</span>
              <span className="w-4 h-px bg-current" />
            </button>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
