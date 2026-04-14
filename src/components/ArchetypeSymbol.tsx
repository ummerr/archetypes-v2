/**
 * SVG symbols representing each archetype's essence.
 * Used as decorative watermarks and icons.
 */

type Props = {
  archetype: "king" | "warrior" | "magician" | "lover";
  color: string;
  className?: string;
};

export default function ArchetypeSymbol({ archetype, color, className = "" }: Props) {
  const shared = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 80 80",
    className,
    fill: "none",
  } as const;

  switch (archetype) {
    // Crown - three peaks with a band
    case "king":
      return (
        <svg {...shared}>
          <path
            d="M12 58L20 28L30 44L40 20L50 44L60 28L68 58Z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill={`${color}08`}
          />
          <line x1="12" y1="58" x2="68" y2="58" stroke={color} strokeWidth="1.5" />
          <line x1="10" y1="64" x2="70" y2="64" stroke={color} strokeWidth="1" opacity="0.4" />
          {/* Jewels at crown peaks */}
          <circle cx="40" cy="20" r="2" fill={color} opacity="0.6" />
          <circle cx="20" cy="28" r="1.5" fill={color} opacity="0.4" />
          <circle cx="60" cy="28" r="1.5" fill={color} opacity="0.4" />
        </svg>
      );

    // Shield with crossed sword
    case "warrior":
      return (
        <svg {...shared}>
          {/* Shield */}
          <path
            d="M40 12L64 24V44C64 56 52 66 40 72C28 66 16 56 16 44V24L40 12Z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill={`${color}08`}
          />
          {/* Vertical sword line */}
          <line x1="40" y1="22" x2="40" y2="58" stroke={color} strokeWidth="1.2" opacity="0.5" />
          {/* Crossguard */}
          <line x1="32" y1="34" x2="48" y2="34" stroke={color} strokeWidth="1.2" opacity="0.5" />
          {/* Pommel */}
          <circle cx="40" cy="60" r="2" fill={color} opacity="0.3" />
        </svg>
      );

    // Eye of knowledge / crystal
    case "magician":
      return (
        <svg {...shared}>
          {/* Outer eye shape */}
          <path
            d="M8 40C8 40 24 18 40 18C56 18 72 40 72 40C72 40 56 62 40 62C24 62 8 40 8 40Z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill={`${color}08`}
          />
          {/* Iris */}
          <circle cx="40" cy="40" r="12" stroke={color} strokeWidth="1" opacity="0.5" />
          {/* Pupil */}
          <circle cx="40" cy="40" r="5" fill={color} opacity="0.3" />
          {/* Inner light */}
          <circle cx="40" cy="40" r="2" fill={color} opacity="0.6" />
          {/* Radiating lines */}
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <line
                key={deg}
                x1={40 + Math.cos(rad) * 14}
                y1={40 + Math.sin(rad) * 14}
                x2={40 + Math.cos(rad) * 18}
                y2={40 + Math.sin(rad) * 18}
                stroke={color}
                strokeWidth="0.8"
                opacity="0.3"
              />
            );
          })}
        </svg>
      );

    // Rose / heart with petals
    case "lover":
      return (
        <svg {...shared}>
          {/* Heart shape */}
          <path
            d="M40 68C40 68 12 48 12 32C12 22 20 14 30 14C35 14 38 17 40 20C42 17 45 14 50 14C60 14 68 22 68 32C68 48 40 68 40 68Z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill={`${color}08`}
          />
          {/* Inner petal lines for rose effect */}
          <path
            d="M40 56C40 56 24 42 24 32C24 26 30 22 36 24"
            stroke={color}
            strokeWidth="0.8"
            opacity="0.3"
            fill="none"
          />
          <path
            d="M40 56C40 56 56 42 56 32C56 26 50 22 44 24"
            stroke={color}
            strokeWidth="0.8"
            opacity="0.3"
            fill="none"
          />
          {/* Center dot */}
          <circle cx="40" cy="36" r="2" fill={color} opacity="0.4" />
        </svg>
      );
  }
}
