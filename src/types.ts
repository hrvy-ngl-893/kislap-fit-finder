// ── Core types ──────────────────────────────────────────────────────────
// Everything is keyed off `Axis` (a string id), so adding a new axis or a
// new question is a data change only — no component code needs to change.

/** Identifier for a single preference axis, e.g. "coverage", "support". */
export type Axis = string;

/** A vector of scores (0–10) across every configured axis. */
export type Vector = Record<Axis, number>;

/** Display metadata for one axis, shown on the radar chart. */
export interface AxisConfig {
  key: Axis;
  label: string;
  /** Shown in the hover/tap tooltip on the radar chart. */
  description: string;
}

/** One selectable answer within a question. */
export interface QuizOption {
  label: string;
  /** Key into the ICONS map (see icons.tsx). */
  icon: string;
  /** How picking this option shifts the running vector. Axes not listed are left untouched. */
  deltas: Partial<Record<Axis, number>>;
}

/** One step of the quiz. */
export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
}

/** A catalog item the quiz can recommend. */
export interface Product {
  name: string;
  handle: string;
  blurb: string;
  vector: Vector;
  /** Optional link override; defaults to `/products/${handle}`. */
  href?: string;
}

/** Full config bundle — swap this out to retarget the whole quiz. */
export interface FitFinderConfig {
  axes: AxisConfig[];
  baseline: Vector;
  questions: QuizQuestion[];
  products: Product[];
}

/** A ranked product with its distance from the current vector. */
export interface RankedProduct {
  product: Product;
  distance: number;
}
