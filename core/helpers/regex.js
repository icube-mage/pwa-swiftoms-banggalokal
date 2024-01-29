/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
export const regexPhone = new RegExp(/^[1-9]{1,3}[0-9]{8,16}$/);
export const regexPhoneDial = (dial) => new RegExp(`^${dial}[0-9]{8,16}$`);
export const regexEmail = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);
export const regexMultipleEmail = new RegExp(
    /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/g,
);

export const integerReg = /[^-\d]/g;
export const floatReg = /[^.\d]/g;
export const thousandSeparator = /\B(?=(\d{3})+(?!\d))/g;
