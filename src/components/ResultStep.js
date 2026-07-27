import React, { useMemo, useState } from 'react';
import { rankProducts } from '../utils/vectorMath';
import { RadarChart } from './RadarChart';
import { ProgressDots } from './ProgressDots';

/**
 * @typedef {import('../types').AxisConfig} AxisConfig
 * @typedef {import('../types').Product} Product
 * @typedef {import('../types').Vector} Vector
 */

/**
 * @typedef {Object} ResultStepProps
 * @property {AxisConfig[]} axes
 * @property {Product[]} products
 * @property {Vector} initialVector The vector computed from the visitor's quiz answers.
 * @property {() => void} onRetake
 * @property {(product: Product) => void} [onViewProduct] Called when the visitor clicks through to a product. Defaults to navigating to `/products/{handle}`.
 */

/**
 * @param {ResultStepProps} props
 */
export function ResultStep({ axes, products, initialVector, onRetake, onViewProduct }) {
    // The visitor can keep fine-tuning after the quiz by dragging the chart,
    // so the vector lives in local state seeded from the quiz result.
    /** @type {[Vector, React.Dispatch<React.SetStateAction<Vector>>]} */
    const [vector, setVector] = useState(initialVector);

    const ranked = useMemo(() => rankProducts(axes, vector, products), [axes, vector, products]);
    const top = ranked[0];
    const runnersUp = ranked.slice(1, 3);

    /**
     * @param {string} axisKey
     * @param {number} value
     */
    function handleVectorChange(axisKey, value) {
        setVector((prev) => ({ ...prev, [axisKey]: value }));
    }

    /**
     * @param {Product} product
     */
    function handleView(product) {
        if (onViewProduct) {
            onViewProduct(product);
        } else {
            window.location.href = product.href ?? `/products/${product.handle}`;
        }
    }

    return (
        <>
            <p className="bff-eyebrow">Your fit profile</p>
            <ProgressDots total={10} currentStep={10} />
            <div className="bff-card">
                <div>
                <h2 className="bff-title">Here's what fits your style</h2>
                </div>
                <div className="bff-result-grid">
                    <div>
                        <RadarChart axes={axes} vector={vector} matchVector={top.product.vector} onVectorChange={handleVectorChange} />
                        <p className="bff-hint">Drag the dots to fine-tune · hover a label to see what it means</p>
                        <div className="bff-legend">
                            <span>
                                <i className="bff-legend-swatch bff-legend-swatch--you" />
                                You
                            </span>
                            <span>
                                <i className="bff-legend-swatch bff-legend-swatch--match" />
                                <span>{top.product.name}</span>
                            </span>
                        </div>
                    </div>
                    <div>
                        <p className="bff-eyebrow">Best match</p>
                        <h3 className="bff-match-name">{top.product.name}</h3>
                        <p className="bff-match-blurb">{top.product.blurb}</p>
                        <button type="button" className="bff-primary-btn" onClick={() => handleView(top.product)}>
                            View this style →
                        </button>
                        <div className="bff-runners">
                            <p className="bff-runners-label">Also worth a look</p>
                            <div>
                                {runnersUp.map((r) => (
                                    <div key={r.product.handle} className="bff-runner-row">
                                        <span>{r.product.name}</span>
                                        <button type="button" className="bff-runner-link" onClick={() => handleView(r.product)}>
                                            View →
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bff-actions bff-actions--retake">
                    <button type="button" className="bff-link-btn" onClick={onRetake}>
                        ↻ Retake the quiz
                    </button>
                    <span />
                </div>
            </div>
        </>
    );
}