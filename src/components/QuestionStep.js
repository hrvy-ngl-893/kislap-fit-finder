import React from 'react';
import { Icon } from '../icons';
import { ProgressDots } from './ProgressDots';

/**
 * @typedef {import('../types').QuizOption} QuizOption
 * @typedef {import('../types').QuizQuestion} QuizQuestion
 */

/**
 * @typedef {Object} QuestionStepProps
 * @property {QuizQuestion} question
 * @property {number} questionIndex
 * @property {number} totalQuestions
 * @property {QuizOption | undefined} selected
 * @property {(option: QuizOption) => void} onSelect
 * @property {() => void} onNext
 * @property {() => void} onBack
 * @property {boolean} isLast
 */

/**
 * @param {QuestionStepProps} props
 */
export function QuestionStep({
    question,
    questionIndex,
    totalQuestions,
    selected,
    onSelect,
    onNext,
    onBack,
    isLast,
}) {
    return (
        <>
            <div className="header">
                <img
                    src="/white-transaprent.png"
                    alt="Questions"
                    className="logo-image"
                />
                <div className="header-center">
                    <p className="bff-eyebrow-2">Fit Finder</p>
                </div>
            </div>
            <ProgressDots total={totalQuestions} currentStep={questionIndex} />
            <div className="bff-card">
                <div className="bff-content">
                    <h3 className="bff-q">{question.prompt}</h3>
                    <div className="bff-options">
                        {question.options.map((option) => {
                            const isPicked = selected === option;
                            return (
                                <button
                                    key={option.label}
                                    type="button"
                                    className={`bff-opt${isPicked ? ' is-picked' : ''}`}
                                    style={{
                                        '--bg-img': `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url(${option.image})`
                                    }}
                                    aria-pressed={isPicked}
                                    loading="eager"
                                    fetchpriority="high"
                                    onClick={() => onSelect(option)}
                                >
                                    <Icon name={option.icon} className="bff-opt-icon" />
                                    <span className="q-opt">{option.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="bff-actions">
                    {questionIndex > 0 ? (
                        <button type="button" className="bff-link-btn" onClick={onBack}>
                            ← Back
                        </button>
                    ) : (
                        <span />
                    )}
                    <button type="button" className="bff-primary-btn" disabled={!selected} onClick={onNext}>
                        {isLast ? 'See my matches' : 'Next'}
                    </button>
                </div>
            </div>
        </>
    );
}