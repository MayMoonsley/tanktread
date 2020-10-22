/**
 * An enum describing how enemy AI should rate a particular outcome.
 * It wants to do good things to itself + allies and bad things to opponents.
 */

export enum AIRating {
    Good = 1, Neutral = 0, Bad = -1
}

export function combineRatings(...arr: AIRating[]): AIRating {
    return arr.reduce((acc, x) => {
        if (acc === AIRating.Neutral) {
            return x;
        } else if (x === AIRating.Neutral) {
            return acc;
        } else if (acc === x) {
            return acc;
        } else {
            return AIRating.Neutral;
        }
    }, AIRating.Neutral);
}

export function invertRating(rating: AIRating): AIRating {
    return rating * -1;
}

/**
 * Multiply two AIRatings. Bad * Bad = Good, Good * Bad = Bad, etc.
 * @param a First AIRating.
 * @param b Second AIRating.
 */
export function multiplyRatings(a: AIRating, b: AIRating): AIRating {
    return a * b;
}