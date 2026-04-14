interface Props {
  primarySource?: string;
  scholarly?: string;
  dissent?: string;
  adversarial?: string;
  editorial?: string;
}

export default function CitationLine({
  primarySource,
  scholarly,
  dissent,
  adversarial,
  editorial,
}: Props) {
  const hasAny = primarySource || scholarly || dissent || adversarial || editorial;
  if (!hasAny) return null;
  return (
    <div className="mt-2 space-y-1 text-[11px] leading-snug text-text-secondary/70">
      {primarySource && (
        <p className="font-mono">
          <span className="text-muted/70">src · </span>
          <span className="italic">{primarySource}</span>
        </p>
      )}
      {scholarly && (
        <p className="font-mono">
          <span className="text-muted/70">lit · </span>
          <span className="italic">{scholarly}</span>
        </p>
      )}
      {editorial && (
        <p className="italic text-text-secondary/80">{editorial}</p>
      )}
      {dissent && (
        <details className="group">
          <summary className="cursor-pointer font-mono text-[10px] tracking-[0.2em] uppercase text-amber-600/80 hover:text-amber-500">
            Dissent ▾
          </summary>
          <p className="mt-1 italic text-text-secondary/85">{dissent}</p>
        </details>
      )}
      {adversarial && (
        <details className="group">
          <summary className="cursor-pointer font-mono text-[10px] tracking-[0.2em] uppercase text-muted/70 hover:text-text-secondary">
            Devil's advocate ▾
          </summary>
          <p className="mt-1 italic text-text-secondary/80">{adversarial}</p>
        </details>
      )}
    </div>
  );
}
