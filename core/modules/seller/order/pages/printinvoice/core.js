/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@sellermodules/order/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';
import { transformArray } from '@sellermodules/order/helpers';

const ContentWrapper = (props) => {
    const {
        data, Content,
    } = props;

    const contentProps = {
        ...props,
        data: data.map((order) => ({ ...order, items: transformArray(order.items) })),
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const pageConfig = {
        title: `${t('sellerorder:Print_Invoice')}`,
    };

    const { loading, data, error } = gqlService.printSellerInvoice({
        id: router && router.query && router.query.slug.map((e) => Number(e)),
    });

    React.useEffect(() => {
        BackdropLoad(loading);
    }, [loading]);

    if (loading) {
        return <Layout pageConfig={pageConfig} plainMode seller />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('sellerorder:Data_not_found');
        const redirect = '/seller/order';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    return (
        <ContentWrapper
            data={data?.printSellerInvoice || {}}
            pageConfig={pageConfig}
            {...props}
        />
    );
};

export default Core;
