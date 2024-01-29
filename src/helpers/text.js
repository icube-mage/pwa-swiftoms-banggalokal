/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
export const StripHtmlTags = (str = '') => {
    if ((str === null) || (str === '')) return false;
    str = str.toString();
    return str.replace(/<[^>]*>/g, '');
};

// eslint-disable-next-line consistent-return
export const inputNumber = (e, str = '', invalidChars = []) => {
    if (invalidChars.includes(e?.nativeEvent?.data)) {
        e.preventDefault();
        return str;
    }
    return e.target.value;
};

export const createExcerpt = (text, maxLength) => `${text.substring(0, maxLength) }...`;

export const isValidJSON = (jsonString) => {
    try {
        JSON.parse(jsonString);
        return true;
    } catch (err) {
        return false;
    }
};

export const onMakeId = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
};

export const ucwords = (text) => text.toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase());

export const weightUnit = () => 'gr';

export const conversionKilogramToGram = (value) => Number(value) * 1000;
