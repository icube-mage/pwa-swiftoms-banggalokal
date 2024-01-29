/* eslint-disable radix */
/* eslint-disable import/prefer-default-export */
import TagManager from 'react-gtm-module';
import Cookies from 'js-cookie';
import { custDataNameCookie, sellerDataNameCookie } from '@config';

export const getCustomerDataLayer = () => {
    const {
        firstname, lastname, email, customer_company_code,
    } = Cookies.getJSON(custDataNameCookie);
    if (customer_company_code) {
        const sellerData = Cookies.getJSON(sellerDataNameCookie);
        return {
            firstname, lastname, email, customer_company_code, ...sellerData,
        };
    }
    return {
        firstname, lastname, email, customer_company_code,
    };
};

export const sendDataLayer = (eventDetail) => {
    const tagManagerArgs = {
        dataLayer: {
            event_data: undefined,
            customer_data: getCustomerDataLayer(),
            ...eventDetail,
        },
    };
    TagManager.dataLayer(tagManagerArgs);
};
