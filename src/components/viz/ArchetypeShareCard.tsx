"use client";

import { useState, useCallback } from "react";
import type { SystemId } from "@/data/resonance";

interface Props {
  system: SystemId;
  slug: string;
  displayName: string;
  tweetText?: string;
  className?: string;
}

type Status = "idle" | "loading" | "done" | "error";

export default function ArchetypeShareCard({
  system,
  slug,
  displayName,
  tweetText,
  className = "",
}: Props) {
  const [downloadStatus, setDownloadStatus] = useState<Status>("idle");
  const [copyStatus, setCopyStatus] = useState<Status>("idle");
  const [format, setFormat] = useState<"wide" | "square">("wide");

  const cardUrl = `/api/card/${system}/${slug}${format === "square" ? "?format=square" : ""}`;

  const fetchBlob = useCallback(async () => {
    const res = await fetch(cardUrl);
    if (!res.ok) throw new Error(`Card fetch failed: ${res.status}`);
    return await res.blob();
  }, [cardUrl]);

  const handleDownload = async () => {
    setDownloadStatus("loading");
    try {
      const blob = await fetchBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${slug}-${format}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setDownloadStatus("done");
      setTimeout(() => setDownloadStatus("idle"), 1800);
    } catch {
      setDownloadStatus("error");
      setTimeout(() => setDownloadStatus("idle"), 2400);
    }
  };

  const handleCopy = async () => {
    setCopyStatus("loading");
    try {
      const blob = await fetchBlob();
      if (!("clipboard" in navigator) || !("ClipboardItem" in window)) {
        throw new Error("Clipboard not supported");
      }
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      setCopyStatus("done");
      setTimeout(() => setCopyStatus("idle"), 1800);
    } catch {
      setCopyStatus("error");
      setTimeout(() => setCopyStatus("idle"), 2400);
    }
  };

  const handleShare = () => {
    const archetypeUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/${system}/archetype/${slug}`
        : `https://archetypes.ummerr.com/${system}/archetype/${slug}`;
    const text = tweetText ?? `${displayName} — from the Cross-System Resonance Atlas`;
    const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(archetypeUrl)}`;
    window.open(intent, "_blank", "noopener,noreferrer");
  };

  const label = (base: string, s: Status) =>
    s === "loading" ? "…" : s === "done" ? "✓" : s === "error" ? "!" : base;

  return (
    <section
      className={`rounded-sm border border-surface-light/40 px-5 py-4 flex flex-wrap items-center gap-4 ${className}`}
    >
      <div className="flex flex-col gap-1 mr-auto">
        <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-gold/80">
          Share
        </p>
        <p className="font-serif italic text-[13px] text-text-secondary/80">
          Download or share a card for {displayName}.
        </p>
      </div>

      <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.25em] uppercase">
        <button
          type="button"
          onClick={() => setFormat("wide")}
          aria-pressed={format === "wide"}
          className={`px-2 py-1 rounded-sm border transition-colors ${
            format === "wide"
              ? "border-gold/60 text-gold"
              : "border-surface-light/40 text-text-secondary/70 hover:border-gold/40"
          }`}
        >
          Wide
        </button>
        <button
          type="button"
          onClick={() => setFormat("square")}
          aria-pressed={format === "square"}
          className={`px-2 py-1 rounded-sm border transition-colors ${
            format === "square"
              ? "border-gold/60 text-gold"
              : "border-surface-light/40 text-text-secondary/70 hover:border-gold/40"
          }`}
        >
          Square
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloadStatus === "loading"}
          className="font-mono text-[10px] tracking-[0.25em] uppercase px-3 py-1.5 rounded-sm border border-gold/40 text-gold hover:bg-gold/10 transition-colors disabled:opacity-50"
        >
          {label("Download PNG", downloadStatus)}
        </button>
        <button
          type="button"
          onClick={handleCopy}
          disabled={copyStatus === "loading"}
          className="font-mono text-[10px] tracking-[0.25em] uppercase px-3 py-1.5 rounded-sm border border-surface-light/40 text-text-secondary/80 hover:border-gold/40 hover:text-gold transition-colors disabled:opacity-50"
        >
          {label("Copy Image", copyStatus)}
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="font-mono text-[10px] tracking-[0.25em] uppercase px-3 py-1.5 rounded-sm border border-surface-light/40 text-text-secondary/80 hover:border-gold/40 hover:text-gold transition-colors"
        >
          Share to X
        </button>
      </div>
    </section>
  );
}
