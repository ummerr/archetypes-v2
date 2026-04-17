/**
 * DOM-side emissive helpers. Collapse glows on light backgrounds per DESIGN.md §2.
 */

export function emissiveTextShadow(
  color: string,
  opts: { light: boolean; hovered?: boolean; scale?: "soft" | "strong" },
): string {
  if (opts.light) return "none";
  const s = opts.scale ?? "soft";
  if (!opts.hovered && s === "soft") return "none";
  return s === "strong"
    ? `0 0 14px ${color}90, 0 0 6px ${color}40`
    : `0 0 12px ${color}80`;
}

export function emissiveBoxShadow(
  color: string,
  opts: { light: boolean; hovered?: boolean },
): string {
  if (opts.light) return "none";
  if (!opts.hovered) return "none";
  return `0 0 6px ${color}`;
}

export function emissiveHaloGradient(
  color: string,
  opts: { light: boolean; hovered?: boolean },
): string {
  if (opts.light) {
    return opts.hovered
      ? `radial-gradient(circle, ${color}14 0%, transparent 65%)`
      : "transparent";
  }
  return `radial-gradient(circle, ${color}${opts.hovered ? "33" : "1E"} 0%, transparent 65%)`;
}

export function emissiveBorder(
  color: string,
  opts: { light: boolean; hovered?: boolean },
): string {
  if (opts.light) {
    return `1px solid ${color}${opts.hovered ? "40" : "22"}`;
  }
  return `1px solid ${color}${opts.hovered ? "66" : "38"}`;
}
