/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-empty */

import { encrypt, decrypt } from '@helper_encryption';

export const getOtpState = (name, state) => {
    try {
        const data = localStorage?.getItem(encrypt(`${state}.${name}`)) || String('');
        return data ? decrypt(data) : data;
    } catch (error) {
        return null;
    }
};

export const setOtpState = (name, state, value = '') => {
    localStorage?.setItem(encrypt(`${state}.${name}`), encrypt(String(value)));
};

export const removeOtpState = (name, state) => {
    localStorage?.removeItem(encrypt(`${state}.${name}`));
};

export const filterPhone = (normalizedNumber) => {
    if (normalizedNumber.startsWith('08')) {
        normalizedNumber = `628${ normalizedNumber.substr(2)}`;
    }
    return normalizedNumber;
};

export const validateInput = (inputValue) => {
    /* eslint-disable-next-line */
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phonePattern = /^\d+$/;

    if (emailPattern.test(inputValue)) {
        return 'email';
    }

    if (phonePattern.test(inputValue)) {
        return 'phone';
    }

    return false;
};

export const filterStoreName = (getStoreName = '') => {
    const splitStoreName = getStoreName.split(' ');
    const tmpResult = [];
    for (let x = 0; x < (splitStoreName.length > 1 ? 2 : splitStoreName.length); x += 1) {
        tmpResult.push(splitStoreName[x]);
    }
    const countTmpResult = tmpResult.join(' ');
    if (countTmpResult.length > 15) {
        return tmpResult[0];
    }
    return tmpResult.join(' ');
};

export const getTimeLeft = (timeLeft) => {
    let minutes = Math.floor(timeLeft / (60 * 1000));
    minutes = minutes < 0 ? 0 : minutes;
    let seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);
    seconds = seconds < 0 ? 0 : seconds;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const maxDuration = (times = 5) => new Date().getTime() + times * 60 * 1000;

export const otpTokenEncrypt = (token, iteration = 10) => {
    let tokenResult = token;

    for (let x = 0; x < iteration; x += 1) {
        tokenResult = btoa(tokenResult);
    }
    return tokenResult;
};

export default {
    getOtpState,
    setOtpState,
    removeOtpState,
    filterPhone,
    validateInput,
    filterStoreName,
    getTimeLeft,
    maxDuration,
    otpTokenEncrypt,
};
