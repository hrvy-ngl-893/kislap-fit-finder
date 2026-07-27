import React from 'react';
import { BikiniFitFinder } from './components/BikiniFitFinder';

/**
 * Minimal usage example. Wrap the finder in an element that overrides the
 * CSS variables to retheme it — no component code needs to change.
 */
export default function App() {
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
                    // Swap this for your router/navigation of choice.
                    console.log('navigate to', product.handle);
                }}
            />
        </div>
    );
}