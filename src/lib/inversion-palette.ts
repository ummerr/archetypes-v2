/**
 * Dark ↔ light color swaps for totem materials. See DESIGN.md §2.
 *
 * "Negative-space emission on dark; inverted fill on light."
 */

const LIGHT_TEXT_PRIMARY = "#0F0E0B";

export function bloomAccent(accent: string, light: boolean): string {
  return light ? accent : "#FFFFFF";
}

export function voidInk(light: boolean): string {
  return light ? LIGHT_TEXT_PRIMARY : "#0A0A0F";
}

export function materialParams(light: boolean) {
  return light
    ? { metalness: 0.15, roughness: 0.75 }
    : { metalness: 0.8, roughness: 0.2 };
}

export function wireframeParams(light: boolean) {
  return light
    ? { color: LIGHT_TEXT_PRIMARY, opacity: 0.22 }
    : null;
}

export function solidOpacity(baseOpacity: number, light: boolean): number {
  return light ? Math.min(baseOpacity + 0.55, 0.95) : baseOpacity;
}
