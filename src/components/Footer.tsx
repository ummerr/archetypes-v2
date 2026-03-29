export default function Footer() {
  return (
    <footer className="border-t border-gold/5 py-8 px-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <p className="font-mono text-[9px] tracking-[0.1em] text-muted uppercase">
          Based on{" "}
          <span className="italic text-text-secondary">
            King, Warrior, Magician, Lover
          </span>{" "}
          — Moore &amp; Gillette, 1990
        </p>
        <p className="font-mono text-[9px] tracking-[0.25em] text-gold/40">
          KWML
        </p>
      </div>
    </footer>
  );
}
