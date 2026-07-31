# Kislap Fit Finder

A React quiz that maps a visitor's answers to a five-axis preference vector,
then recommends the closest matching Kislap piece. The result includes a
draggable radar chart for fine-tuning the match.

## File structure

```
types.ts                     Shared JSDoc types
utils/quizConfig.js          Edit this to change axes, questions, or catalog
icons.js                     Icon set as React components, keyed by name
utils/vectorMath.js          Pure scoring and radar-chart geometry
components/
  ProgressDots.js            Step progress indicator
  IntroStep.js               Welcome screen
  QuestionStep.js            One quiz question and its options
  RadarChart.js              Draggable SVG radar chart
  ResultStep.js              Best match and alternatives
  BikiniFitFinder.js         Top-level quiz state
index.css                    Application styles
```

## Usage

```tsx
import { BikiniFitFinder } from './components/BikiniFitFinder';
import './index.css';

<BikiniFitFinder />
```

Pass a custom `config` to point the same component at a different catalog:

```tsx
<BikiniFitFinder config={myConfig} onViewProduct={(p) => router.push(`/p/${p.handle}`)} />
```

## Adding a question

Open `src/utils/quizConfig.js` and append to `QUESTIONS`:

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
defined on `.bff-root` in `src/index.css`. To retheme, override the variables
on your own wrapper rather than editing component code:

```css
.my-wrapper {
  --bff-accent: #0d6e6a;
  --bff-you-stroke: #0d6e6a;
  --bff-radius-card: 8px;
}
```
