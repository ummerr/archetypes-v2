import type { ReactNode, CSSProperties } from "react";

type Size = "sm" | "md" | "lg";
type Tone = "gold" | "muted" | "primary" | "inherit";

interface Props {
  size?: Size;
  tone?: Tone;
  as?: "p" | "span" | "div";
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

const sizeClass: Record<Size, string> = {
  sm: "text-kicker tracking-kicker",
  md: "text-label tracking-label",
  lg: "text-kicker tracking-display",
};

const toneClass: Record<Tone, string> = {
  gold: "text-gold",
  muted: "text-muted",
  primary: "text-text-primary",
  inherit: "",
};

export default function Kicker({
  size = "md",
  tone = "inherit",
  as: Tag = "p",
  className = "",
  style,
  children,
}: Props) {
  return (
    <Tag
      className={`font-mono uppercase ${sizeClass[size]} ${toneClass[tone]} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
