# Bikini Fit Finder — React/TypeScript

A quiz widget that maps a visitor's answers to a 5-axis preference vector and
recommends the closest-matching product, with a draggable radar chart for
fine-tuning the result. Rebuilt from a vanilla-JS/DOM-string version into
typed, composable React components.

## File structure

```
types.ts                     Shared types: Axis, Vector, Question, Product, config bundle
quizConfig.ts                ← Edit this to change axes / questions / catalog
icons.tsx                    Icon set as React components, keyed by name
utils/vectorMath.ts          Pure functions: scoring, distance, polygon math (no DOM/React)
components/
  ProgressDots.tsx           Step progress indicator
  IntroStep.tsx              Welcome screen
  QuestionStep.tsx           One quiz question + its options
  RadarChart.tsx             Draggable SVG radar chart (controlled component)
  ResultStep.tsx             Best match + runner-ups, wraps RadarChart
BikiniFitFinder.tsx           Top-level component — owns quiz state, switches steps
fit-finder.css                All styling, exposed as CSS custom properties
example/App.tsx               Minimal usage + retheme example
```

## Usage

```tsx
import { BikiniFitFinder } from './BikiniFitFinder';
import './fit-finder.css';

<BikiniFitFinder />
```

Pass a custom `config` to point the same component at a different catalog:

```tsx
<BikiniFitFinder config={myConfig} onViewProduct={(p) => router.push(`/p/${p.handle}`)} />
```

## Adding a question

Open `quizConfig.ts` and append to `QUESTIONS`:

```ts
{
  id: 'fabric',
  prompt: 'Pick a fabric feel',
  options: [
    { label: 'Matte', icon: 'solid', deltas: { comfort: 1 } },
    { label: 'Shiny', icon: 'bold', deltas: { boldness: 1, trend: 1 } },
  ],
},
```

No other file needs to change — `BikiniFitFinder` reads `questions.length`
for progress dots and step count, and `computeVector` folds in whatever
`deltas` you list.

## Adding an axis

1. Add an entry to `AXES` (key, label, tooltip description).
2. Add the same key to `BASELINE` (usually `5`).
3. Reference the key in any option's `deltas` or a product's `vector`.

The radar chart automatically adds a spoke for every axis in `axes` — it
has no hardcoded axis count or names.

## Styling

Everything visual is driven by CSS classes (`bff-*`) and custom properties
defined on `.bff-root` in `fit-finder.css`. To retheme, override the
variables on your own wrapper element (see `example/App.tsx`) rather than
editing component code:

```css
.my-wrapper {
  --bff-accent: #0d6e6a;
  --bff-you-stroke: #0d6e6a;
  --bff-radius-card: 8px;
}
```

## Notes on the port from the original script

- The original mutated the DOM directly (`ROOT.innerHTML = ...`, manual
  `addEventListener` wiring) and rendered SVG by building `<svg>`/`<circle>`
  elements with `document.createElementNS`. Everything now goes through
  JSX/React state — no `innerHTML`, no manual event teardown.
- Drag handling on the radar chart uses React's `onPointerDown/Move/Up` with
  `setPointerCapture`, same technique as the original, just expressed as
  React event handlers instead of raw DOM listeners.
- The tooltip is now local component state (`useState`) instead of a
  detached DOM node that got manually positioned.
- Icons moved from an HTML-string lookup table to small SVG React
  components, looked up by name via `<Icon name="..." />`.
