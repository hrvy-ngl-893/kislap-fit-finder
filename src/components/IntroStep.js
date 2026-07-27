import React from 'react';
import { ProgressDots } from './ProgressDots';

/**
 * @typedef {Object} IntroStepProps
 * @property {() => void} onStart
 * @property {string} [eyebrow]
 * @property {string} [title]
 * @property {string} [subtitle]
 * @property {string} [startLabel]
 */

/**
 * First screen of the quiz. All copy is overridable via props so the component is reusable across products.
 *
 * @param {IntroStepProps} props
 */
export function IntroStep({
    onStart,
    eyebrow = 'Fit Finder',
    title = 'Find the best piece just for you',
    subtitle = "Answer a few style questions and we'll map your preferences to the styles you're most likely to love.",
    startLabel = 'Start',
}) {
    return (
        <>
            <p className="bff-eyebrow">{eyebrow}</p>
            <ProgressDots total={1} currentStep={1} />
            <div className="bff-card">
                <div>            
                    <h2 className="bff-title">{title}</h2>
                    <p className="bff-sub">{subtitle}</p></div>
                <div className="bff-actions bff-actions--end">
                    <button type="button" className="bff-primary-btn" onClick={onStart}>
                        {startLabel}
                    </button>
                </div>
            </div>
        </>
    );
}
