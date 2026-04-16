/**
 * Totem registry. See DESIGN.md §5.
 *
 * One entry per system, returning the ambient totem for an index card.
 * To add a seventh system, add an entry here — do NOT write another
 * `if (systemId === …)` branch anywhere else.
 *
 * Ceremonial (hero-scale) totems live elsewhere — `TotemCanvas`,
 * `JungianTotemCanvas`, `EnneagramTotemCanvas`, `TarotCard`.
 */

import type { ReactNode } from "react";
import type { IndexEntry, IndexSystemId } from "./allArchetypes";

export type TotemRenderer = (entry: IndexEntry, hovered: boolean) => ReactNode;

type Registry = Record<IndexSystemId, TotemRenderer>;

const registry: Partial<Registry> = {};

export function registerTotem(systemId: IndexSystemId, renderer: TotemRenderer) {
  registry[systemId] = renderer;
}

export function getTotemRenderer(systemId: IndexSystemId): TotemRenderer | undefined {
  return registry[systemId];
}
