import type { ReactNode } from "react";
import Kicker from "./Kicker";

interface Props {
  kicker?: string;
  children: ReactNode;
  accentColor?: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export default function SectionHeading({
  kicker,
  children,
  accentColor,
  className = "",
  as = "h2",
}: Props) {
  const Tag = as;
  return (
    <div className={`mb-6 ${className}`}>
      {kicker && (
        <Kicker
          size="sm"
          className="mb-2"
          style={{ color: accentColor ?? "rgb(var(--gold))" }}
        >
          {kicker}
        </Kicker>
      )}
      <Tag className="font-serif text-h2 leading-tight">{children}</Tag>
    </div>
  );
}
