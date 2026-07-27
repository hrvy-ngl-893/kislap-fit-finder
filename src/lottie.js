import React from 'react';
import Lottie from 'react-lottie';

const height = 120;

const goalAnimations = {
    1: require('@digitalbonds/un-sdgs/src/assets/goals/eng/color/goal_1.json'),
    2: require('@digitalbonds/un-sdgs/src/assets/goals/eng/color/goal_2.json'),
    3: require('@digitalbonds/un-sdgs/src/assets/goals/eng/color/goal_3.json'),
    4: require('@digitalbonds/un-sdgs/src/assets/goals/eng/color/goal_4.json'),
    5: require('@digitalbonds/un-sdgs/src/assets/goals/eng/color/goal_5.json'),
    6: require('@digitalbonds/un-sdgs/src/assets/goals/eng/color/goal_6.json'),
    7: require('@digitalbonds/un-sdgs/src/assets/goals/eng/color/goal_7.json'),
    8: require('@digitalbonds/un-sdgs/src/assets/goals/eng/color/goal_8.json'),
    9: require('@digitalbonds/un-sdgs/src/assets/goals/eng/color/goal_9.json'),
    10: require('@digitalbonds/un-sdgs/src/assets/goals/eng/color/goal_10.json'),
    11: require('@digitalbonds/un-sdgs/src/assets/goals/eng/color/goal_11.json'),
    12: require('@digitalbonds/un-sdgs/src/assets/goals/eng/color/goal_12.json'),
    13: require('@digitalbonds/un-sdgs/src/assets/goals/eng/color/goal_13.json'),
    14: require('@digitalbonds/un-sdgs/src/assets/goals/eng/color/goal_14.json'),
    15: require('@digitalbonds/un-sdgs/src/assets/goals/eng/color/goal_15.json'),
    16: require('@digitalbonds/un-sdgs/src/assets/goals/eng/color/goal_16.json'),
    17: require('@digitalbonds/un-sdgs/src/assets/goals/eng/color/goal_17.json'),
};

function SdgAnimation({ number }) {
    const animationData = goalAnimations[number];

    if (!animationData) {
        return null;
    }

    return (
        <div className="sdg-animation">
            <Lottie
                options={{ loop: false, autoplay: true, animationData }}
                height={height}
                width={height}
            />
        </div>
    );
}

export { SdgAnimation };
export default SdgAnimation;