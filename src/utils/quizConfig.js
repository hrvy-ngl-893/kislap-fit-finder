/**
 * @typedef {import('../types').FitFinderConfig} FitFinderConfig
 */

// ── Axes ────────────────────────────────────────────────────────────────
// Dynamic axes derived from Kislap brand values & character traits.

/** @type {FitFinderConfig['axes']} */
export const AXES = [
    { key: 'freedom', label: 'Freedom', description: 'Grounded, adaptable, and nature-inspired exploration.' },
    { key: 'grace', label: 'Grace', description: 'Serenity, effortless beauty, and refined simplicity.' },
    { key: 'heritage', label: 'Heritage', description: 'Deeply rooted in tradition, history, and timeless craftsmanship.' },
    { key: 'joy', label: 'Joy', description: 'Vibrant, expressive, and centered around shared celebrations.' },
    { key: 'discovery', label: 'Discovery', description: 'Energy, curiosity, and openness to new stories.' },
];

/** @type {FitFinderConfig['baseline']} */
export const BASELINE = {
    freedom: 5,
    grace: 5,
    heritage: 5,
    joy: 5,
    discovery: 5,
};

// ── Questions ───────────────────────────────────────────────────────────
// Retrofitted directly from the "Which Kislap Piece Are You?" quiz options.

/** @type {FitFinderConfig['questions']} */
export const QUESTIONS = [
    {
        id: 'q1-day-off',
        prompt: "Your ideal day off looks like...",
        options: [
            { label: "Exploring somewhere you've never been.", icon: 'compass', deltas: { freedom: 2, joy: 1, discovery: 2 } },
            { label: 'Spending the afternoon by the sea with no fixed plans.', icon: 'wave', deltas: { grace: 2, freedom: 1 } },
            { label: 'Wandering through museums, old streets, and local cafés.', icon: 'museum', deltas: { heritage: 2, grace: 1, discovery: 1 } },
            { label: 'Meeting friends for a lively afternoon that turns into the evening.', icon: 'cheers', deltas: { joy: 2, heritage: 1 } },
        ],
    },
    {
        id: 'q2-quality',
        prompt: 'Which quality do you admire most?',
        options: [
            { label: 'Adaptability', icon: 'leaf', deltas: { freedom: 2, grace: 1 } },
            { label: 'Grace', icon: 'feather', deltas: { grace: 2, heritage: 1 } },
            { label: 'Integrity', icon: 'shield', deltas: { heritage: 2, freedom: 1 } },
            { label: 'Joy', icon: 'sparkles', deltas: { joy: 2, grace: 1 } },
        ],
    },
    {
        id: 'q3-space',
        prompt: 'Which space feels most like home?',
        options: [
            { label: 'Somewhere surrounded by greenery.', icon: 'plant', deltas: { freedom: 2, grace: 1 } },
            { label: 'An airy room filled with sunlight.', icon: 'sun', deltas: { grace: 2, freedom: 1 } },
            { label: 'A place filled with heirlooms and stories.', icon: 'clock', deltas: { heritage: 2, grace: 1 } },
            { label: 'A colorful home that\'s always full of people.', icon: 'home', deltas: { joy: 2, grace: 1 } },
        ],
    },
    {
        id: 'q4-keepsake',
        prompt: "Choose a keepsake you'd never throw away.",
        options: [
            { label: 'A pressed leaf from a memorable trip.', icon: 'maple', deltas: { freedom: 2, grace: 1, discovery: 1 } },
            { label: 'A handwritten letter.', icon: 'mail', deltas: { grace: 2, heritage: 1 } },
            { label: 'A family heirloom.', icon: 'gem', deltas: { heritage: 2, freedom: 1 } },
            { label: 'Photos from celebrations with friends.', icon: 'camera', deltas: { joy: 2, grace: 1 } },
        ],
    },
    {
        id: 'q5-inspiration',
        prompt: 'What inspires you most?',
        options: [
            { label: 'Nature.', icon: 'trees', deltas: { freedom: 2 } },
            { label: 'Everyday beauty.', icon: 'flower', deltas: { grace: 2 } },
            { label: 'History and craftsmanship.', icon: 'scroll', deltas: { heritage: 2 } },
            { label: 'Community and shared experiences.', icon: 'people', deltas: { joy: 2 } },
        ],
    },
    {
        id: 'q6-getaway',
        prompt: 'Your ideal getaway would be...',
        options: [
            { label: 'A place where you can explore, wander, and discover something new.', icon: 'globe', deltas: { freedom: 2, joy: 1, discovery: 2 } },
            { label: 'Somewhere slow-paced where you can relax and enjoy the little moments.', icon: 'coffee', deltas: { grace: 2, freedom: 1 } },
            { label: 'A place where you can learn about stories, culture, and history.', icon: 'landmark', deltas: { heritage: 2, grace: 1 } },
            { label: 'Somewhere full of energy, people, and unforgettable experiences.', icon: 'fireworks', deltas: { joy: 2, heritage: 1, discovery: 1 } },
        ],
    },
    {
        id: 'q7-style',
        prompt: 'Your style is usually...',
        options: [
            { label: 'Effortless.', icon: 'wind', deltas: { freedom: 2, grace: 1 } },
            { label: 'Refined.', icon: 'diamond', deltas: { grace: 2, heritage: 1 } },
            { label: 'Timeless.', icon: 'hourglass', deltas: { heritage: 2, freedom: 1 } },
            { label: 'Expressive.', icon: 'palette', deltas: { joy: 2, grace: 1 } },
        ],
    },
    {
        id: 'q8-feeling',
        prompt: 'Which feeling are you always chasing?',
        options: [
            { label: 'Freedom.', icon: 'leaf', deltas: { freedom: 2 } },
            { label: 'Ease.', icon: 'cloud', deltas: { grace: 2 } },
            { label: 'Connection.', icon: 'heart', deltas: { heritage: 2 } },
            { label: 'Excitement.', icon: 'zap', deltas: { joy: 2 } },
        ],
    },
    {
        id: 'q9-pieces',
        prompt: 'What kind of pieces do you find yourself drawn to?',
        options: [
            { label: 'Something that feels natural and easy to move in.', icon: 'shirt', deltas: { freedom: 2, grace: 1 } },
            { label: 'Something delicate with thoughtful details.', icon: 'sparkle', deltas: { grace: 2, heritage: 1 } },
            { label: 'Something with history and meaning behind it.', icon: 'ribbon', deltas: { heritage: 2, freedom: 1 } },
            { label: 'Something that instantly brings energy into a room.', icon: 'star', deltas: { joy: 2, grace: 1 } },
        ],
    },
    {
        id: 'q10-daily-carry',
        prompt: 'Which feeling would you want to carry with you every day?',
        options: [
            { label: 'Possibility.', icon: 'sun', deltas: { freedom: 3, discovery: 2 } },
            { label: 'Serenity.', icon: 'drop', deltas: { grace: 3 } },
            { label: 'Belonging.', icon: 'people', deltas: { heritage: 3 } },
            { label: 'Wonder.', icon: 'magic', deltas: { joy: 3, discovery: 1 } },
        ],
    },
];

// ── Product Catalog ────────────────────────────────────────────────────
// Real product archetypes mapping vectors to match radar target points.

/** @type {FitFinderConfig['products']} */
// src/utils/quizConfig.js

export const PRODUCTS = [
    {
        name: 'Bambusa',
        handle: 'bambusa',
        image: '/bambusa.jpg',
        blurb: "You gravitate toward stories of resilience, growth, and embracing change. You appreciate pieces that feel grounded yet adventurous, finding beauty in nature and in life's constant movement.",
        vector: { freedom: 9, grace: 6, heritage: 4, joy: 5, discovery: 8 },
        link: "https://kislapthelabel.com/products/bambusa",
    },
    {
        name: 'Jasmin Ilaya',
        handle: 'jasmin-ilaya',
        image: '/jasminilaya.jpg',
        blurb: "You're drawn to stories that embrace warmth, refinement, and effortless beauty. You appreciate thoughtful details and believe elegance is often found in simplicity.",
        vector: { freedom: 5, grace: 9, heritage: 6, joy: 4, discovery: 4 },
        link: "https://kislapthelabel.com/products/jasmin-ilaya",
    },
    {
        name: 'Dos Paños',
        handle: 'dos-panos',
        image: '/dospanos.jpg',
        blurb: "You connect most with stories rooted in heritage. Craftsmanship, tradition, and timeless design speak to you, and you're naturally drawn to pieces that carry history forward.",
        vector: { freedom: 4, grace: 6, heritage: 9, joy: 4, discovery: 5 },
        link: "https://kislapthelabel.com/products/dos-panos",
    },
    {
        name: 'Banderitas',
        handle: 'banderitas',
        image: '/bandaritas.jpg', // matching the exact filename from your ls output
        blurb: "You find meaning in celebration, connection, and shared experiences. You're drawn to vibrant moments, joyful traditions, and pieces that remind you life is best experienced together.",
        vector: { freedom: 6, grace: 5, heritage: 5, joy: 9, discovery: 7 },
        link: "https://kislapthelabel.com/products/banderitas",
    },
];
/** @type {FitFinderConfig} */
export const FIT_FINDER_CONFIG = {
    axes: AXES,
    baseline: BASELINE,
    questions: QUESTIONS,
    products: PRODUCTS,
};