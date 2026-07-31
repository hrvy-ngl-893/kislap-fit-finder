import React, { useState } from 'react';
import { FIT_FINDER_CONFIG } from '../utils/quizConfig';
import { computeVector } from '../utils/vectorMath';
import { IntroStep } from './IntroStep';
import { QuestionStep } from './QuestionStep';
import { ResultStep } from './ResultStep';

/**
 * @typedef {'intro' | number | 'result'} Step
 */

/**
 * @typedef {import('../types').FitFinderConfig} FitFinderConfig
 * @typedef {import('../types').Product} Product
 * @typedef {import('../types').QuizOption} QuizOption
 */

/**
 * @typedef {Object} IntroCopy
 * @property {string} [eyebrow]
 * @property {string} [title]
 * @property {string} [subtitle]
 * @property {string} [startLabel]
 */

/**
 * @typedef {Object} BikiniFitFinderProps
 * @property {FitFinderConfig} [config] Swap in your own axes/questions/products. Defaults to the built-in demo catalog.
 * @property {IntroCopy} [introCopy] Intro screen copy overrides.
 * @property {(product: Product) => void} [onViewProduct] Called instead of default window.location.href navigation when a product is picked.
 * @property {string} [className]
 */

/**
 * Top-level fit-finder quiz. Renders one of three steps (intro, a question,
 * or the result) based on internal state, and hands all styling to CSS
 * classes (see index.css) so consumers can restyle freely without
 * touching this file.
 *
 * @param {BikiniFitFinderProps} props
 */
export function BikiniFitFinder({
    config = FIT_FINDER_CONFIG,
    introCopy,
    onViewProduct,
    className,
}) {
    const { axes, baseline, questions, products } = config;

    /** @type {[Step, React.Dispatch<React.SetStateAction<Step>>]} */
    const [step, setStep] = useState('intro');

    /** @type {[(QuizOption | undefined)[], React.Dispatch<React.SetStateAction<(QuizOption | undefined)[]>>]} */
    const [picks, setPicks] = useState(() => Array(questions.length).fill(undefined));

    function handleStart() {
        setStep(0);
    }

    /**
     * @param {number} questionIndex
     * @param {QuizOption} option
     */
    function handleSelect(questionIndex, option) {
        setPicks((prev) => {
            const next = [...prev];
            next[questionIndex] = option;
            return next;
        });
    }

    /**
     * @param {number} questionIndex
     */
    function handleNext(questionIndex) {
        if (!picks[questionIndex]) return;
        if (questionIndex === questions.length - 1) {
            setStep('result');
        } else {
            setStep(questionIndex + 1);
        }
    }

    /**
     * @param {number} questionIndex
     */
    function handleBack(questionIndex) {
        setStep(Math.max(0, questionIndex - 1));
    }

    function handleRetake() {
        setPicks(Array(questions.length).fill(undefined));
        setStep('intro');
    }

    return (
        <div className={className ?? 'bff-root'}>
            {step === 'intro' && <IntroStep onStart={handleStart} {...introCopy} />}

            {typeof step === 'number' && (
                <QuestionStep
                    question={questions[step]}
                    questionIndex={step}
                    totalQuestions={questions.length}
                    selected={picks[step]}
                    onSelect={(option) => handleSelect(step, option)}
                    onNext={() => handleNext(step)}
                    onBack={() => handleBack(step)}
                    isLast={step === questions.length - 1}
                />
            )}

            {step === 'result' && (
                <ResultStep
                    axes={axes}
                    products={products}
                    initialVector={computeVector(axes, baseline, picks)}
                    onRetake={handleRetake}
                    onViewProduct={onViewProduct}
                />
            )}
        </div>
    );
}

export default BikiniFitFinder;
