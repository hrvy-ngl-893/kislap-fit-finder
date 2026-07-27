/**
 * @typedef {Object} ProgressDotsProps
 * @property {number} total
 * @property {number} currentStep
 * @property {string} [className]
 */

/**
 * Row of dots showing quiz progress. Purely presentational — style via .bff-dot / .is-done / .is-current.
 *
 * @param {ProgressDotsProps} props
 */
export function ProgressDots({ total, currentStep, className }) {
    return (
        <div className={className ?? 'bff-progress'} role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={currentStep}>
            {Array.from({ length: total }, (_, i) => {
                const classes = ['bff-dot'];
                if (i < currentStep) classes.push('is-done');
                if (i === currentStep) classes.push('is-current');
                return <div key={i} className={classes.join(' ')} />;
            })}
        </div>
    );
}