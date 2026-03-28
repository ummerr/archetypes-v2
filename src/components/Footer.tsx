export default function Footer() {
  return (
    <footer className="relative py-12">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
      <p className="text-center text-muted text-xs tracking-wide">
        Based on{" "}
        <em className="text-text-secondary not-italic">
          King, Warrior, Magician, Lover
        </em>{" "}
        by Robert Moore &amp; Douglas Gillette (1990)
      </p>
    </footer>
  );
}
