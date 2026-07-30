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
            <p className="bff-eyebrow">
                Kislap the Label - Fit Finder — Question {questionIndex + 1} of {totalQuestions}
            </p>
            <ProgressDots total={totalQuestions} currentStep={questionIndex} />
            <div className="bff-card">
                <div>
                <h3 className="bff-q">{question.prompt}</h3>
                <div className="bff-options">
                    {question.options.map((option) => {
                        const isPicked = selected === option;
                        return (
                            <button
                                key={option.label}
                                type="button"
                                className={`bff-opt${isPicked ? ' is-picked' : ''}`}
                                aria-pressed={isPicked}
                                onClick={() => onSelect(option)}
                            >
                                <Icon name={option.icon} />
                                <span>{option.label}</span>
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