/* eslint-disable radix */
/* eslint-disable import/prefer-default-export */
import cookies from 'js-cookie';
import { expiredToken, custDataNameCookie, loginRedirect } from '@config';

export const setLastPathWithoutLogin = (path) => {
    cookies.set('lastPathNoAuth', path);
    return true;
};

export const getLastPathWithoutLogin = () => {
    const path = cookies.get('lastPathNoAuth');
    if (path && typeof type !== 'undefined' && path !== '') {
        return path;
    }
    const isSeller = !!cookies.getJSON('cdt')?.customer_company_code;
    if (isSeller) {
        return loginRedirect.seller;
    }
    return loginRedirect.admin;
};

export const removeLastPathWithoutLogin = () => {
    cookies.remove('lastPathNoAuth');
};

export const setLogin = (isLogin = 0, expired) => {
    cookies.set('isLogin', isLogin, { expires: expired || expiredToken });
    return 0;
};

export const getLoginInfo = () => {
    const isLogin = cookies.get('isLogin');
    return parseInt(isLogin) || 0;
};

export const removeIsLoginFlagging = () => {
    try {
        cookies.remove(custDataNameCookie);
        cookies.remove('isLogin');
    } catch (error) {
        console.error('Error on removeIsLoginFlagging: ', error);
    }

    // add remove cookies on header and next-cookies
    // base on https://www.npmjs.com/package/next-cookies
    document.cookie = 'foo=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
};
