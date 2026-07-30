import React, { useState } from 'react';
import { BikiniFitFinder } from './components/BikiniFitFinder';

export default function App() {
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <div
            style={{
                '--bff-accent': '#0d6e6a',
                '--bff-you-stroke': '#0d6e6a',
                '--bff-you-fill': '#12a39c',
                '--bff-match-stroke': '#e8432f',
                padding: '40px 20px',
            }}
        >
            <BikiniFitFinder
                onViewProduct={(product) => {
                    setSelectedProduct(product);
                }}
            />

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
}

/**
 * Modal to display details of the selected bikini product/design.
 */export function ProductModal({ product, onClose }) {
    if (!product) return null;

    const descriptionText = product.blurb || product.description;
    const titleText = product.name || product.title;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-body">
                    {product.image && (
                        <div className="modal-image-wrap">
                            <img
                                src={product.image}
                                alt={titleText}
                                className="modal-image"
                            />
                        </div>
                    )}

                    <h2>{titleText}</h2>

                    {product.collection && (
                        <p className="modal-collection">{product.collection}</p>
                    )}

                    {descriptionText && (
                        <p className="modal-description">{descriptionText}</p>
                    )}
                </div>

                <div className="modal-actions">
                    <button type="button" className="modal-btn-secondary" onClick={onClose}>
                        Close
                    </button>

                    {product.handle && (
                        <a href={`${product.link}`} target="_blank" rel="noopener noreferrer" className="modal-cta">
                            Learn more
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}