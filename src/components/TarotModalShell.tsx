"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function TarotModalShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.back();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [router]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-md cursor-pointer"
          onClick={() => router.back()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden
        />
        <motion.div
          role="dialog"
          aria-modal="true"
          className="relative z-10 w-full max-w-5xl mx-auto my-8 md:my-12 rounded-lg overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.9 }}
          style={{ background: "var(--color-bg, #0A0A0F)" }}
        >
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Close"
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center font-mono text-sm text-text-secondary hover:text-gold transition-colors"
            style={{
              background: "rgba(0,0,0,0.35)",
              border: "1px solid rgba(212,175,55,0.3)",
            }}
          >
            ✕
          </button>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
