interface IconProps {
  className?: string;
}

const base = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export const SunIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const MoonIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
);

export const MenuIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const CloseIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const SearchIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const BoltIcon = ({ className }: IconProps) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
    className={className}
  >
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
  </svg>
);

/** The logo glyph: an elongated crystal. */
export const CrystalIcon = ({ className }: IconProps) => (
  <svg
    width="22"
    height="30"
    viewBox="0 0 22 30"
    aria-hidden
    className={className}
  >
    <path d="M11 0 22 11 11 30 0 11Z" fill="currentColor" />
    <path d="M11 0 22 11H0Z" fill="var(--bg)" opacity="0.28" />
  </svg>
);

/**
 * The Fabula Ultima Feather: a 16 x 16 pixel sprite. Inline SVG so the dark
 * theme can recolor it (--feather-* tokens). Draw it at 16, 32 or 48 px only,
 * whole multiples of its grid, or the pixels smear.
 */
export const FeatherIcon = ({
  size = 32,
  className,
}: {
  size?: 16 | 32 | 48;
  className?: string;
}) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    shapeRendering="crispEdges"
    aria-hidden
    className={className}
  >
    <path fill="var(--feather-ink)" d="M12 1h2v1h-2zM10 2h2v1h-2zM14 2h1v1h-1zM9 3h1v1h-1zM14 3h1v1h-1zM8 4h1v1h-1zM14 4h1v1h-1zM7 5h2v1h-2zM13 5h1v1h-1zM6 6h1v1h-1zM8 6h1v1h-1zM13 6h1v1h-1zM5 7h1v1h-1zM12 7h1v1h-1zM4 8h2v1h-2zM11 8h1v1h-1zM3 9h1v1h-1zM5 9h1v1h-1zM10 9h1v1h-1zM3 10h1v1h-1zM9 10h1v1h-1zM3 11h1v1h-1zM8 11h1v1h-1zM2 12h1v1h-1zM8 12h1v1h-1zM2 13h1v1h-1zM4 13h1v1h-1zM6 13h2v1h-2zM1 14h3v1h-3zM5 14h1v1h-1zM1 15h1v1h-1z" />
    <path fill="var(--feather-eye)" d="M10 4h1v1h-1z" />
    <path fill="var(--feather-shade)" d="M3 12h2v1h-2zM3 13h1v1h-1z" />
    <path fill="var(--feather-mid)" d="M7 9h1v1h-1zM6 10h1v1h-1zM8 10h1v1h-1zM4 11h2v1h-2zM7 11h1v1h-1zM5 12h1v1h-1zM5 13h1v1h-1z" />
    <path fill="var(--feather-light)" d="M12 6h1v1h-1zM7 7h1v1h-1zM8 8h2v1h-2zM8 9h2v1h-2zM4 10h2v1h-2zM7 10h1v1h-1zM6 11h1v1h-1zM6 12h2v1h-2z" />
    <path fill="var(--feather-pale)" d="M13 2h1v1h-1zM10 3h1v1h-1zM13 3h1v1h-1zM9 4h1v1h-1zM13 4h1v1h-1zM7 6h1v1h-1zM10 6h1v1h-1zM6 7h1v1h-1zM8 7h4v1h-4zM6 8h2v1h-2zM10 8h1v1h-1zM4 9h1v1h-1zM6 9h1v1h-1z" />
    <path fill="var(--feather-white)" d="M12 2h1v1h-1zM11 3h2v1h-2zM11 4h2v1h-2zM9 5h4v1h-4zM9 6h1v1h-1zM11 6h1v1h-1z" />
  </svg>
);

export const ChevronIcon = ({ className }: IconProps) => (
  <svg {...base} width={18} height={18} className={className}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

/** A triangle with an exclamation mark: this block is a problem, not content. */
export const AlertIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
    <path d="M12 9v4M12 17h.01" />
  </svg>
);
