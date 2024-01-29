import React from 'react';
import { useRouter } from 'next/router';

import gqlService from '@sellermodules/income/services/graphql';
import aclService from '@modules/theme/services/graphql';

import Layout from '@layout';
import BackdropLoad from '@helper_backdropload';
import formatDate from '@helper_date';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;
    const pageConfig = {
        title: t('sellerincome:Income'),
    };
    const router = useRouter();
    const { history } = router.query;

    const [getSellerBalanceHistory, { data, loading }] = gqlService.getSellerBalanceHistory();
    const [getSellerWithdrawalHistory, { data: dataWithdraw, loading: loadingWithdraw }] = gqlService.getSellerWithdrawalHistory();
    const { data: dataBalance, loading: loadingBalance } = gqlService.getVendorIrisBalance();
    const { loading: loadMinBalance, data: dataMinBalance } = aclService.getStoreConfig({
        path: 'swiftoms_vendorportal/seller_finance/minimum_payout',
    });
    const { loading: loadCurrency, data: dataCurrency } = aclService.getCurrency();
    const { loading: loadStatus, data: dataStatus } = gqlService.getWithdrawalStatusOptions();

    const [downloadSellerBalanceHistory] = gqlService.downloadSellerBalanceHistory();
    const [downloadSellerWithdrawalHistory] = gqlService.downloadSellerWithdrawalHistory();
    const downloadReport = history === 'withdraw' ? downloadSellerWithdrawalHistory : downloadSellerBalanceHistory;

    const handleExport = (date, set) => {
        set(false);
        window.backdropLoader(true);
        const variables = {
            date_from: formatDate(date[0], 'YYYY-MM-DD'),
            date_to: formatDate(date[1], 'YYYY-MM-DD'),
        };
        downloadReport({
            variables,
        }).then((res) => {
            window.backdropLoader(false);
            router.push(res.data[history === 'withdraw' ? 'downloadSellerWithdrawalHistory' : 'downloadSellerBalanceHistory']);
        }).catch((e) => {
            window.backdropLoader(false);
            set(true);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    React.useEffect(() => {
        BackdropLoad(loadingBalance || loadMinBalance || loadCurrency || loadStatus);
    }, [loadingBalance, loadMinBalance, loadCurrency, loadStatus]);

    if (loadingBalance || loadMinBalance || loadCurrency || loadStatus) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    const contentProps = {
        getSellerBalanceHistory,
        getSellerWithdrawalHistory,
        data,
        dataWithdraw,
        loading,
        loadingWithdraw,
        t,
        balance: dataBalance?.getVendorIrisBalance?.balance,
        minBalance: dataMinBalance?.getStoreConfig,
        currency: dataCurrency?.currency?.base_currency_symbol || dataCurrency?.currency?.base_currency_code,
        handleExport,
        statusFilter: dataStatus?.getWithdrawalStatusOptions || [],
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
