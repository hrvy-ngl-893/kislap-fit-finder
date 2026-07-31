import React, { useState } from 'react';
import { BikiniFitFinder } from './components/BikiniFitFinder';

export default function App() {
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <div
            style={{
                padding: '20px 20px',
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
 */

export function ProductModal({ product, onClose }) {
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
                    <button type="button" className="bff-link-btn " onClick={onClose}>
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