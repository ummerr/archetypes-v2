import type { ReactNode } from "react";

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
        <p
          className="font-mono text-[10px] tracking-[0.35em] uppercase mb-2"
          style={{ color: accentColor ?? "rgb(var(--gold))" }}
        >
          {kicker}
        </p>
      )}
      <Tag className="font-serif text-2xl md:text-3xl font-medium leading-tight">{children}</Tag>
    </div>
  );
}
