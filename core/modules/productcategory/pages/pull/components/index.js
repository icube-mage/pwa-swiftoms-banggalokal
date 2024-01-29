/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { setCookies } from '@helper_cookies';

const PullProductCategoryContent = (props) => {
    const { data, loading, pullProductCategory, t } = props;
    const router = useRouter();
    useEffect(async () => {
        await pullProductCategory();
        if (loading === false && data?.pullProductCategory !== undefined) {
            if (data.pullProductCategory === true) {
                setCookies('isPull', data.pullProductCategory);
                router.push('/marketplace/productcategory');
            } else {
                router.push('/marketplace/productcategory');
            }
        }
    }, [data]);

    return (
        <div />
    );
};

export default PullProductCategoryContent;
