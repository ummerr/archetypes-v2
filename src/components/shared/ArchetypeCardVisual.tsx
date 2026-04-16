"use client";

/**
 * Dispatcher that looks up the ambient totem renderer for a given
 * archetype from the registry. See DESIGN.md §5.
 *
 * The side-effect import below registers every system's renderer;
 * adding a new system means editing `totemRenderers.tsx`, not this file.
 */

import type { IndexEntry } from "@/data/allArchetypes";
import { getTotemRenderer } from "@/data/totem-registry";
import "./totemRenderers";

export default function ArchetypeCardVisual({
  entry,
  hovered,
}: {
  entry: IndexEntry;
  hovered: boolean;
}) {
  const render = getTotemRenderer(entry.systemId);
  if (!render) return null;
  return <>{render(entry, hovered)}</>;
}
