type Props = {
  slug: string;
  color: string;
  size?: number;
};

export function HeroJourneyArchetypeIcon({ slug, color, size = 28 }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: color,
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (slug) {
    case "hero":
      // Crossed swords
      return (
        <svg {...common}>
          <path d="M7 7l12 12" />
          <path d="M25 7L13 19" />
          <path d="M5 21l4 4 2-2-4-4z" />
          <path d="M27 21l-4 4-2-2 4-4z" />
          <path d="M19 19l2 2" />
          <path d="M13 19l-2 2" />
        </svg>
      );
    case "mentor":
      // Candle / torch with flame
      return (
        <svg {...common}>
          <path d="M16 4c-2 2-2 4 0 6 2-2 2-4 0-6z" fill={color} fillOpacity="0.3" />
          <path d="M16 10v4" />
          <rect x="13" y="14" width="6" height="10" rx="1" />
          <path d="M12 24h8" />
          <path d="M16 24v4" />
        </svg>
      );
    case "herald":
      // Radiant star / horn call
      return (
        <svg {...common}>
          <path d="M16 6l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill={color} fillOpacity="0.2" />
          <path d="M16 2v2" />
          <path d="M16 28v2" />
          <path d="M2 16h2" />
          <path d="M28 16h2" />
        </svg>
      );
    case "threshold-guardian":
      // Shield with gate bar
      return (
        <svg {...common}>
          <path d="M16 4l10 4v8c0 6-5 10-10 12-5-2-10-6-10-12V8z" fill={color} fillOpacity="0.15" />
          <path d="M8 16h16" />
          <path d="M16 10v12" />
        </svg>
      );
    case "shapeshifter":
      // Interlocking crescents
      return (
        <svg {...common}>
          <path d="M12 6a10 10 0 100 20 7 7 0 010-20z" fill={color} fillOpacity="0.2" />
          <path d="M20 6a10 10 0 110 20 7 7 0 100-20z" />
        </svg>
      );
    case "shadow":
      // Eclipse
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="10" />
          <path d="M16 6a10 10 0 000 20 10 10 0 010-20z" fill={color} fillOpacity="0.6" />
        </svg>
      );
    case "trickster":
      // Masked jester diamond with dots
      return (
        <svg {...common}>
          <path d="M16 4l10 12-10 12L6 16z" fill={color} fillOpacity="0.15" />
          <circle cx="12" cy="14" r="1" fill={color} />
          <circle cx="20" cy="14" r="1" fill={color} />
          <path d="M12 20c1.5 1.5 2.5 1.5 4 0s2.5-1.5 4 0" />
        </svg>
      );
    case "ally":
      // Linked rings
      return (
        <svg {...common}>
          <circle cx="12" cy="16" r="6" />
          <circle cx="20" cy="16" r="6" />
        </svg>
      );
    case "mentor-sage":
    default:
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="10" />
        </svg>
      );
  }
}
