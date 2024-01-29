/* eslint-disable import/prefer-default-export */

export function translateFeature(opt) {
    return opt.replace(/[.,/#!?$%^&*;:{}=\-`~()]/g, '').replace(/ /g, '_');
}

export const truncateString = (inputString, maxLength) => {
    if (inputString.length <= maxLength) {
        return inputString;
    }
    const ellipsisLength = 3;
    const truncatedLength = maxLength - ellipsisLength;
    const firstPartLength = Math.ceil(truncatedLength / 2);
    const secondPartLength = truncatedLength - firstPartLength;

    const firstPart = inputString.substr(0, firstPartLength);
    const secondPart = inputString.substr(inputString.length - secondPartLength);
    return `${firstPart}...${secondPart}`;
};
