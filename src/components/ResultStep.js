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
    const [vector, setVector] = useState(initialVector);

    const ranked = useMemo(() => rankProducts(axes, vector, products), [axes, vector, products]);
    const top = ranked[0];
    const runnersUp = ranked.slice(1, 3);

    function handleVectorChange(axisKey, value) {
        setVector((prev) => ({ ...prev, [axisKey]: value }));
    }

    function handleView(product) {
        if (onViewProduct) {
            onViewProduct(product);
        } else {
            window.location.href = product.href ?? `/products/${product.handle}`;
        }
    }

    return (
        <>
            <div className="header">
                <img
                    src="/white-transaprent.png"
                    alt="Results"
                    className="logo-image"
                />
                <div className="header-center">
                    <p className="bff-eyebrow-2">Fit Finder</p>
                </div>
            </div>
            <ProgressDots total={10} currentStep={10} />

            {/* Main Container */}
            <div className="bff-card">
                <div className="bff-header">
                    <h3 className="bff-q">Here's what fits your style</h3>
                </div>

                <div className="res-layout">
                    {/* Interactive Chart Section */}
                    <div className="res-chart-pane">
                        <div className="res-chart-wrapper">
                            <RadarChart
                                axes={axes}
                                vector={vector}
                                matchVector={top.product.vector}
                                onVectorChange={handleVectorChange}
                                size={338}
                                radius={100}
                            />
                        </div>
                        <p className="res-chart-guide">
                            Drag the dots to fine-tune · hover a label to see what it means
                        </p>
                        <div className="res-chart-key">
                            <span className="res-key-item">
                                <i className="res-dot res-dot--user" />
                                You
                            </span>
                            <span className="res-key-item">
                                <i className="res-dot res-dot--match" />
                                <span>{top.product.name}</span>
                            </span>
                        </div>
                    </div>

                    {/* Results Showcase Section */}
                    <div className="res-showcase-pane">
                        <p className="res-badge">Best match</p>

                        <div className="res-hero-product">
                            {top.product.image && (
                                <div className="res-product-media">
                                    <img
                                        src={top.product.image}
                                        alt={top.product.name}
                                        className="res-product-img"
                                    />
                                </div>
                            )}

                            <div className="res-product-details">
                                <div>
                                    <h3 className="res-product-title">{top.product.name}</h3>
                                    <p className="res-product-description">{top.product.blurb}</p>
                                </div>
                                <div>
                                    <a href={top.product.link} target="_blank" rel="noreferrer">
                                        <button className="bff-primary-btn">
                                            Learn more →
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="res-alternatives">
                            <p className="res-alternatives-title">Also worth a look</p>
                            <div className="res-alternatives-list">
                                {runnersUp.map((r) => (
                                    <div key={r.product.handle} className="res-alt-item">
                                        <span className="res-alt-name">{r.product.name}</span>
                                        <button
                                            type="button"
                                            className="res-alt-action"
                                            onClick={() => handleView(r.product)}
                                        >
                                            View →
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="res-footer-actions">
                    <button type="button" className="bff-link-btn" onClick={onRetake}>
                        ↻ Retake the quiz
                    </button>
                    <span />
                </div>
            </div>
        </>
    );
}
