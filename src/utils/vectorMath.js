/**
 * @typedef {import('../types').Axis} Axis
 * @typedef {import('../types').AxisConfig} AxisConfig
 * @typedef {import('../types').Product} Product
 * @typedef {import('../types').QuizOption} QuizOption
 * @typedef {import('../types').RankedProduct} RankedProduct
 * @typedef {import('../types').Vector} Vector
 */

export const AXIS_MIN = 0;
export const AXIS_MAX = 10;

/**
 * @param {number} value
 * @returns {number}
 */
export function clampAxis(value) {
    return Math.max(AXIS_MIN, Math.min(AXIS_MAX, value));
}

/**
 * Applies every picked option's deltas on top of a baseline vector, clamped per-axis.
 *
 * @param {AxisConfig[]} axes
 * @param {Vector} baseline
 * @param {(QuizOption | undefined)[]} picks
 * @returns {Vector}
 */
export function computeVector(axes, baseline, picks) {
    /** @type {Vector} */
    const vector = { ...baseline };

    for (const pick of picks) {
        if (!pick) continue;
        for (const axis of axes) {
            const delta = pick.deltas[axis.key];
            if (delta !== undefined) {
                vector[axis.key] = (vector[axis.key] ?? 0) + delta;
            }
        }
    }

    for (const axis of axes) {
        vector[axis.key] = clampAxis(vector[axis.key]);
    }

    return vector;
}

/**
 * @param {AxisConfig[]} axes
 * @param {Vector} a
 * @param {Vector} b
 * @returns {number}
 */
export function distance(axes, a, b) {
    let sum = 0;
    for (const axis of axes) {
        const diff = (a[axis.key] ?? 0) - (b[axis.key] ?? 0);
        sum += diff * diff;
    }
    return Math.sqrt(sum);
}

/**
 * @param {AxisConfig[]} axes
 * @param {Vector} vector
 * @param {Product[]} products
 * @returns {RankedProduct[]}
 */
export function rankProducts(axes, vector, products) {
    return products
        .map((product) => ({ product, distance: distance(axes, vector, product.vector) }))
        .sort((a, b) => a.distance - b.distance);
}

/**
 * Angle (radians) of the i-th spoke, evenly distributed starting straight up.
 *
 * @param {number} index
 * @param {number} total
 * @returns {number}
 */
export function axisAngle(index, total) {
    return ((-90 + index * (360 / total)) * Math.PI) / 180;
}

/**
 * @param {number} index
 * @param {number} total
 * @returns {{ x: number; y: number }}
 */
export function axisUnit(index, total) {
    const angle = axisAngle(index, total);
    return { x: Math.cos(angle), y: Math.sin(angle) };
}

/**
 * Builds an SVG `points` attribute string for a vector's polygon on the radar.
 *
 * @param {AxisConfig[]} axes
 * @param {Vector} vector
 * @param {number} cx
 * @param {number} cy
 * @param {number} r
 * @returns {string}
 */
export function polygonPoints(axes, vector, cx, cy, r) {
    return axes
        .map((axis, i) => {
            const unit = axisUnit(i, axes.length);
            const value = ((vector[axis.key] ?? 0) / AXIS_MAX) * r;
            return `${(cx + unit.x * value).toFixed(1)},${(cy + unit.y * value).toFixed(1)}`;
        })
        .join(' ');
}