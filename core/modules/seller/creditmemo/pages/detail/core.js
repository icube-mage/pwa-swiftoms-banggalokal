/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';

import gqlService from '@sellermodules/creditmemo/services/graphql';

import ErrorRedirect from '@common_errorredirect';

import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const { t, Content } = props;
    const router = useRouter();
    const pageConfig = {
        title: `${t('sellercreditmemo:Credit_Memo_Detail')} #${router.query?.creditmemo_id}`,
    };

    const {
        loading, data, error, refetch,
    } = gqlService.getSellerCreditMemoById({
        id: router && router.query && Number(router.query.creditmemo_id),
    });

    React.useEffect(() => {
        BackdropLoad(loading);
    }, [loading]);

    if (loading) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('sellercreditmemo:Data_not_found');
        const redirect = `/seller/return/detail/${router.query.id}`;
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} isSeller />;
    }

    const contentProps = {
        ...props,
        data: data?.getSellerCreditMemoById || {},
        refetch,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
