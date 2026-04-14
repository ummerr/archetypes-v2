export default function CanvasSkeleton() {
  return (
    <div
      aria-hidden
      className="w-full h-full rounded-[inherit] animate-pulse"
      style={{ background: "color-mix(in srgb, var(--color-surface) 60%, transparent)" }}
    />
  );
}
