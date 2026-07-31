import React from 'react';
import { ProgressDots } from './ProgressDots';

/**
 * @typedef {Object} IntroStepProps
 * @property {() => void} onStart
 * @property {string} [eyebrow2]
 * @property {string} [title]
 * @property {string} [copy1]
 * @property {string} [copy2]
 * @property {string} [copy3]
 * @property {string} [copy4]
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
    eyebrow2 = 'Fit Finder',
    title = 'Find the best piece just for you',
    copy1 = "Every Kislap piece begins with a story — one rooted in Filipino culture, thoughtfully reimagined for the shore. While each design carries its own inspiration, one may resonate with you more than the rest.",
    copy2 = "Answer a few questions, and we'll match you with the piece that best reflects your personality, style, and the story you naturally gravitate toward.",
    copy3 = "Perhaps you'll discover something about yourself along the way.",
    copy4 = "Your story starts here.",
    subtitle = "Kislap the Label does not track and store any input you make on this page.",
    startLabel = 'Start',
}) {
    return (
        <>
            <div className="header">
                <img
                    src="/white-transaprent.png"
                    alt={title}
                    className="logo-image"
                />
                <div className="header-center">
                    <p className="bff-eyebrow-2">{eyebrow2}</p>
                </div>
            </div>


            <ProgressDots total={1} currentStep={1} />
            <div className="bff-card">
                <div className="spaced">
                    <div>
                        <p className="bff-sub-2">{copy1}</p>
                        <p className="bff-sub-2">{copy2}</p>
                        <p className="bff-sub-2">{copy3}</p>
                        <p className="bff-sub-2">{copy4}</p>
                    </div>
                    <div>
                        <p className="bff-sub-3">{subtitle}</p>
                    </div>
                </div>

                <div className="bff-actions bff-actions--end">
                    <button type="button" className="bff-primary-btn" onClick={onStart}>
                        {startLabel}
                    </button>
                </div>
            </div>
        </>
    );
}
