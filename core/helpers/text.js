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
