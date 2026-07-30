import React, { useCallback, useRef, useState } from 'react';
import { AXIS_MAX, axisUnit, clampAxis, polygonPoints } from '../utils/vectorMath';

/**
 * @typedef {import('../types').AxisConfig} AxisConfig
 * @typedef {import('../types').Vector} Vector
 */

/**
 * @typedef {Object} TooltipState
 * @property {boolean} visible
 * @property {string} text
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Object} RadarChartProps
 * @property {AxisConfig[]} axes
 * @property {Vector} vector The visitor's current vector — fully controlled by the parent.
 * @property {Vector} matchVector The currently-matched product's vector, drawn as a dashed outline.
 * @property {(axis: string, value: number) => void} onVectorChange Called with the axis key and new value while a handle is dragged.
 * @property {number} [size=300] SVG viewBox size (square). Defaults to 300.
 * @property {number} [radius] Radius of the outer ring, in viewBox units. Defaults to size * 0.35.
 * @property {string} [className]
 */

/**
 * Renders the axes as a radar/spider chart with two overlaid polygons
 * ("you" vs. "best match") and draggable end-nodes so the visitor can
 * fine-tune their profile after the quiz. All colors come from CSS
 * (--bff-you-fill, --bff-you-stroke, --bff-match-stroke) so the chart
 * can be restyled without touching this component.
 *
 * @param {RadarChartProps} props
 */
export function RadarChart({
    axes,
    vector,
    matchVector,
    onVectorChange,
    size = 300,
    radius,
    className,
}) {
    /** @type {React.RefObject<SVGSVGElement>} */
    const svgRef = useRef(null);

    /** @type {[TooltipState, React.Dispatch<React.SetStateAction<TooltipState>>]} */
    const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });

    /** @type {[string | null, React.Dispatch<React.SetStateAction<string | null>>]} */
    const [draggingAxis, setDraggingAxis] = useState(null);

    const cx = size / 2;
    const cy = size / 2;
    const r = radius ?? size * 0.25;

    const showTooltip = useCallback((text, clientX, clientY) => {
        const wrap = svgRef.current?.parentElement;
        if (!wrap) return;
        const rect = wrap.getBoundingClientRect();
        setTooltip({ visible: true, text, x: clientX - rect.left + 14, y: clientY - rect.top - 10 });
    }, []);

    const hideTooltip = useCallback(() => setTooltip((t) => ({ ...t, visible: false })), []);

    const handlePointerMove = useCallback(
        /**
         * @param {AxisConfig} axis
         * @param {{ x: number; y: number }} unit
         */
        (axis, unit) =>
            /** @param {React.PointerEvent<SVGCircleElement>} e */
            (e) => {
                if (draggingAxis !== axis.key || !svgRef.current) return;
                const rect = svgRef.current.getBoundingClientRect();
                const scaleX = size / rect.width;
                const scaleY = size / rect.height;
                const px = (e.clientX - rect.left) * scaleX;
                const py = (e.clientY - rect.top) * scaleY;
                const projected = (px - cx) * unit.x + (py - cy) * unit.y;
                const value = clampAxis(Math.round((projected / r) * AXIS_MAX));
                onVectorChange(axis.key, value);
                showTooltip(`${axis.label}: ${value}/10`, e.clientX, e.clientY);
            },
        [draggingAxis, cx, cy, r, size, onVectorChange, showTooltip]
    );

    const handlePointerDown = useCallback(
        /** @param {string} axisKey */
        (axisKey) =>
            /** @param {React.PointerEvent<SVGCircleElement>} e */
            (e) => {
                setDraggingAxis(axisKey);
                e.currentTarget.setPointerCapture(e.pointerId);
                e.preventDefault();
            },
        []
    );

    const handlePointerUp = useCallback(
        /** @param {React.PointerEvent<SVGCircleElement>} e */
        (e) => {
            setDraggingAxis(null);
            hideTooltip();
            try {
                e.currentTarget.releasePointerCapture(e.pointerId);
            } catch {
                // no-op: capture may already have been released
            }
        },
        [hideTooltip]
    );

    const handleTouchTap = useCallback(
        /**
         * @param {string} axisLabel
         * @param {string} description
         */
        (axisLabel, description) =>
            /** @param {React.PointerEvent} e */
            (e) => {
                if (e.pointerType !== 'touch') return;
                if (tooltip.visible) {
                    hideTooltip();
                } else {
                    showTooltip(description, e.clientX, e.clientY);
                }
            },
        [tooltip.visible, hideTooltip, showTooltip]
    );

    const ringFractions = [0.2, 0.4, 0.6, 0.8, 1];

    return (
        <div className={className ?? 'bff-radar-wrap'}>
            <svg ref={svgRef} className="bff-radar-svg" viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
                {/* grid rings */}
                {ringFractions.map((f) => (
                    <polygon
                        key={f}
                        className="bff-radar-grid"
                        points={axes
                            .map((axis, i) => {
                                const unit = axisUnit(i, axes.length);
                                return `${(cx + unit.x * f * r).toFixed(1)},${(cy + unit.y * f * r).toFixed(1)}`;
                            })
                            .join(' ')}
                    />
                ))}

                {/* spokes */}
                {axes.map((axis, i) => {
                    const unit = axisUnit(i, axes.length);
                    return (
                        <line
                            key={axis.key}
                            className="bff-radar-spoke"
                            x1={cx}
                            y1={cy}
                            x2={(cx + unit.x * r).toFixed(1)}
                            y2={(cy + unit.y * r).toFixed(1)}
                        />
                    );
                })}

                {/* best-match outline (no fill, so the "you" shape stays readable on top) */}
                <polygon className="bff-radar-match" points={polygonPoints(axes, matchVector, cx, cy, r)} />

                {/* the visitor's live shape */}
                <polygon className="bff-radar-you" points={polygonPoints(axes, vector, cx, cy, r)} />

                {/* axis labels + draggable handles */}
                {axes.map((axis, i) => {
                    const unit = axisUnit(i, axes.length);
                    const labelX = cx + unit.x * (r + 24);
                    const labelY = cy + unit.y * (r + 24);
                    const anchor = unit.x > 0.3 ? 'start' : unit.x < -0.3 ? 'end' : 'middle';
                    const value = vector[axis.key] ?? 0;
                    const hx = cx + unit.x * ((value / AXIS_MAX) * r);
                    const hy = cy + unit.y * ((value / AXIS_MAX) * r);

                    return (
                        <g key={axis.key}>
                            <circle
                                className="bff-axis-hit"
                                cx={labelX.toFixed(1)}
                                cy={labelY.toFixed(1)}
                                r={16}
                                fill="transparent"
                                onMouseEnter={(e) => showTooltip(axis.description, e.clientX, e.clientY)}
                                onMouseMove={(e) => showTooltip(axis.description, e.clientX, e.clientY)}
                                onMouseLeave={hideTooltip}
                                onPointerUp={handleTouchTap(axis.label, axis.description)}
                            />
                            <text
                                className="bff-axis-label"
                                x={labelX.toFixed(1)}
                                y={labelY.toFixed(1)}
                                textAnchor={anchor}
                            >
                                {axis.label}
                            </text>
                            <circle
                                className="bff-handle"
                                cx={hx.toFixed(1)}
                                cy={hy.toFixed(1)}
                                r={7}
                                onPointerDown={handlePointerDown(axis.key)}
                                onPointerMove={handlePointerMove(axis, unit)}
                                onPointerUp={handlePointerUp}
                                onPointerCancel={handlePointerUp}
                            />
                        </g>
                    );
                })}
            </svg>
            {tooltip.visible && (
                <div className="bff-tooltip is-visible" style={{ left: tooltip.x, top: tooltip.y }}>
                    {tooltip.text}
                </div>
            )}
        </div>
    );
}