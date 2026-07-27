import React from 'react';

/**
 * @typedef {Object} IconProps
 * @property {string} [className]
 */

/**
 * @typedef {Object} SvgProps
 * @property {React.ReactNode} [children]
 * @property {string} [className]
 * @property {string} [fill]
 */

/**
 * Shared wrapper so every icon inherits size/color from CSS (currentColor + font-size-driven sizing).
 *
 * @param {SvgProps} props
 */
function Svg({ children, className, fill = 'none' }) {
    return (
        <svg
            className={className ?? 'bff-icon'}
            viewBox="0 0 24 24"
            fill={fill}
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {children}
        </svg>
    );
}

export const ICONS = {
    /** @param {IconProps} p */
    compass: (p) => (
        <Svg {...p}>
            <circle cx="12" cy="12" r="9" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </Svg>
    ),
    /** @param {IconProps} p */
    wave: (p) => (
        <Svg {...p}>
            <path d="M2 12c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0" />
            <path d="M2 17c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0" />
        </Svg>
    ),
    /** @param {IconProps} p */
    museum: (p) => (
        <Svg {...p}>
            <path d="M3 21h18M3 10h18M5 10v8M9 10v8M15 10v8M19 10v8M12 3l9 7H3l9-7z" />
        </Svg>
    ),
    /** @param {IconProps} p */
    cheers: (p) => (
        <Svg {...p}>
            <path d="M8 22h8M12 15v7M8 15a4 4 0 0 1-4-4V4h8v7a4 4 0 0 1-4 4zM16 15a4 4 0 0 0 4-4V4h-8v7a4 4 0 0 0 4 4z" />
        </Svg>
    ),
    /** @param {IconProps} p */
    leaf: (p) => (
        <Svg {...p}>
            <path d="M11 20A9 9 0 0 0 20 11V3h-8a9 9 0 0 0-9 9 9 9 0 0 0 8 8z" />
            <path d="M11 20v-9" />
        </Svg>
    ),
    /** @param {IconProps} p */
    feather: (p) => (
        <Svg {...p}>
            <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L3 13v8h8l9.24-9.24z" />
            <path d="M16 8L2 22M17.5 15H9" />
        </Svg>
    ),
    /** @param {IconProps} p */
    shield: (p) => (
        <Svg {...p}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </Svg>
    ),
    /** @param {IconProps} p */
    sparkles: (p) => (
        <Svg {...p}>
            <path d="M12 3l2 4.5 4.5 2-4.5 2-2 4.5-2-4.5-4.5-2 4.5-2 2-4.5zM19 16l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2zM5 3l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" />
        </Svg>
    ),
    /** @param {IconProps} p */
    plant: (p) => (
        <Svg {...p}>
            <path d="M7 3c2 2 3 5 3 8 0 5-4 7-4 7s-2-2-2-7c0-3 1-6 3-8z" />
            <path d="M17 3c-2 2-3 5-3 8 0 5 4 7 4 7s2-2 2-7c0-3-1-6-3-8z" />
            <path d="M12 21V10" />
        </Svg>
    ),
    /** @param {IconProps} p */
    sun: (p) => (
        <Svg {...p}>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </Svg>
    ),
    /** @param {IconProps} p */
    clock: (p) => (
        <Svg {...p}>
            <circle cx="12" cy="12" r="9" />
            <polyline points="12 7 12 12 15 15" />
        </Svg>
    ),
    /** @param {IconProps} p */
    home: (p) => (
        <Svg {...p}>
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </Svg>
    ),
    /** @param {IconProps} p */
    maple: (p) => (
        <Svg {...p}>
            <path d="M12 2l2.5 5 5-.5-3.5 4 2.5 5-5-2-1.5 5.5V22h-1v-3L9.5 18l-5 2 2.5-5-3.5-4 5 .5L12 2z" />
        </Svg>
    ),
    /** @param {IconProps} p */
    mail: (p) => (
        <Svg {...p}>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <polyline points="3 7 12 13 21 7" />
        </Svg>
    ),
    /** @param {IconProps} p */
    gem: (p) => (
        <Svg {...p}>
            <polygon points="6 3 18 3 22 9 12 22 2 9 6 3" />
            <path d="M11 3l1 19M2 9h20M6 3l6 6 6-6" />
        </Svg>
    ),
    /** @param {IconProps} p */
    camera: (p) => (
        <Svg {...p}>
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
        </Svg>
    ),
    /** @param {IconProps} p */
    trees: (p) => (
        <Svg {...p}>
            <path d="M12 2L6 11h3l-4 7h14l-4-7h3L12 2zM12 18v4" />
        </Svg>
    ),
    /** @param {IconProps} p */
    flower: (p) => (
        <Svg {...p}>
            <circle cx="12" cy="12" r="3" />
            <path d="M12 3a3 3 0 0 0 0 6 3 3 0 0 0 0-6zM18.36 5.64a3 3 0 0 0-4.24 4.24 3 3 0 0 0 4.24-4.24zM21 12a3 3 0 0 0-6 0 3 3 0 0 0 6 0zM18.36 18.36a3 3 0 0 0-4.24-4.24 3 3 0 0 0 4.24 4.24zM12 21a3 3 0 0 0 0-6 3 3 0 0 0 0 6zM5.64 18.36a3 3 0 0 0 4.24-4.24 3 3 0 0 0-4.24 4.24zM3 12a3 3 0 0 0 6 0 3 3 0 0 0-6 0zM5.64 5.64a3 3 0 0 0 4.24 4.24 3 3 0 0 0-4.24-4.24z" />
        </Svg>
    ),
    /** @param {IconProps} p */
    scroll: (p) => (
        <Svg {...p}>
            <path d="M19 17A3 3 0 0 1 16 20H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a3 3 0 0 1 3 3v11zM19 17a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3" />
            <path d="M7 8h8M7 12h8" />
        </Svg>
    ),
    /** @param {IconProps} p */
    people: (p) => (
        <Svg {...p}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </Svg>
    ),
    /** @param {IconProps} p */
    globe: (p) => (
        <Svg {...p}>
            <circle cx="12" cy="12" r="9" />
            <path d="M2 12h20M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9z" />
        </Svg>
    ),
    /** @param {IconProps} p */
    coffee: (p) => (
        <Svg {...p}>
            <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
            <line x1="6" y1="1" x2="6" y2="4" />
            <line x1="10" y1="1" x2="10" y2="4" />
            <line x1="14" y1="1" x2="14" y2="4" />
        </Svg>
    ),
    /** @param {IconProps} p */
    landmark: (p) => (
        <Svg {...p}>
            <line x1="3" y1="22" x2="21" y2="22" />
            <line x1="6" y1="18" x2="6" y2="11" />
            <line x1="10" y1="18" x2="10" y2="11" />
            <line x1="14" y1="18" x2="14" y2="11" />
            <line x1="18" y1="18" x2="18" y2="11" />
            <polygon points="12 2 20 7 4 7 12 2" />
        </Svg>
    ),
    /** @param {IconProps} p */
    fireworks: (p) => (
        <Svg {...p}>
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            <circle cx="12" cy="12" r="2" />
        </Svg>
    ),
    /** @param {IconProps} p */
    wind: (p) => (
        <Svg {...p}>
            <path d="M9.5 8H18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 0-2.3 1.6" />
            <path d="M4 12h14.5a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1-2.3-1.6" />
            <path d="M7 16h8.5a1.5 1.5 0 0 0 0-3" />
        </Svg>
    ),
    /** @param {IconProps} p */
    diamond: (p) => (
        <Svg {...p}>
            <path d="M6 3h12l4 6-10 12L2 9z" />
            <path d="M11 3l-2 6 3 12 3-12-2-6M2 9h20" />
        </Svg>
    ),
    /** @param {IconProps} p */
    hourglass: (p) => (
        <Svg {...p}>
            <path d="M5 22h14M5 2h14M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
        </Svg>
    ),
    /** @param {IconProps} p */
    palette: (p) => (
        <Svg {...p}>
            <path d="M12 2a10 10 0 0 0-10 10c0 5.523 4.477 10 10 10a4 4 0 0 0 4-4c0-.88-.36-1.68-.93-2.25a2.12 2.12 0 0 1 .93-3.6h2a4 4 0 0 0 4-4c0-5.523-4.477-10-10-10z" />
            <circle cx="7.5" cy="11.5" r="1.5" />
            <circle cx="10.5" cy="6.5" r="1.5" />
            <circle cx="15.5" cy="7.5" r="1.5" />
            <circle cx="17.5" cy="12.5" r="1.5" />
        </Svg>
    ),
    /** @param {IconProps} p */
    zap: (p) => (
        <Svg {...p}>
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </Svg>
    ),
    /** @param {IconProps} p */
    shirt: (p) => (
        <Svg {...p}>
            <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
        </Svg>
    ),
    /** @param {IconProps} p */
    sparkle: (p) => (
        <Svg {...p}>
            <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
        </Svg>
    ),
    /** @param {IconProps} p */
    star: (p) => (
        <Svg {...p}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </Svg>
    ),
    /** @param {IconProps} p */
    horizon: (p) => (
        <Svg {...p}>
            <path d="M3 18h18M12 18a7 7 0 0 1-7-7 7 7 0 0 1 14 0 7 7 0 0 1-7 7z" />
            <line x1="12" y1="4" x2="12" y2="2" />
            <line x1="4.22" y1="7.22" x2="2.81" y2="5.81" />
            <line x1="19.78" y1="7.22" x2="21.19" y2="5.81" />
        </Svg>
    ),
    /** @param {IconProps} p */
    drop: (p) => (
        <Svg {...p}>
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </Svg>
    ),
    /** @param {IconProps} p */
    cloud: (p) => (
        <Svg {...p}>
            <path d="M17.5 19H6a5.5 5.5 0 0 1-1-10.9 7 7 0 0 1 13.8-2.1 4.5 4.5 0 0 1 2.7 8.5 4.4 4.4 0 0 1-4 4.5z" />
        </Svg>
    ),

    heart: (p) => (
        <Svg {...p}>
            <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
        </Svg>
    ),

    bird: (p) => (
        <Svg {...p}>
            <path d="M16 7c2.5 0 4-2 4-2s-1.5 5-5 7c-4 2.3-8.5.5-11-2c2.5 0 4.5-1 6-2.5C7.5 8.5 5.5 6 3.5 6c3.5-1 7 .5 9 2.5c2-2 3.5-1.5 3.5-1.5z" />
        </Svg>
    ),

    ribbon: (p) => (
        <Svg {...p}>
            <circle cx="12" cy="9" r="6" />
            <path d="M8.5 14L6 22l6-3l6 3l-2.5-8" />
        </Svg>
    ),

    hands: (p) => (
        <Svg {...p}>
            <path d="M7 11V5a2 2 0 0 1 4 0v4" />
            <path d="M11 7a2 2 0 0 1 4 0v3" />
            <path d="M15 9a2 2 0 0 1 4 0v3c0 5-3.5 9-8 9h-2a7 7 0 0 1-7-7v-3a2 2 0 0 1 4 0v2" />
        </Svg>
    ),

    magic: (p) => (
        <Svg {...p}>
            <path d="M15 4l1.5 3 3 1.5-3 1.5L15 13l-1.5-3-3-1.5 3-1.5z" />
            <path d="M3 21l9-9" />
            <path d="M12.2 6.8l2 2" />
        </Svg>
    ),
};

/**
 * @typedef {keyof typeof ICONS} IconName
 */

/**
 * @typedef {Object} IconComponentProps
 * @property {IconName | string} name
 * @property {string} [className]
 */

/**
 * Looks up an icon by name; falls back to the "compass" glyph if unknown so a typo never crashes the UI.
 *
 * @param {IconComponentProps} props
 */
export function Icon({ name, className }) {
    const Cmp = ICONS[/** @type {IconName} */ (name)] ?? ICONS.compass;
    return <Cmp className={className} />;
}

