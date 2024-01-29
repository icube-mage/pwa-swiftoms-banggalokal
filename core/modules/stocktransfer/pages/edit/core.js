import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/stocktransfer/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const { data, Content, t } = props;
    const stockTransfer = data.getStockTransferById;
    const statusTransfer = data.getStockTransferById.status;
    const router = useRouter();

    const initialValues = {
        entity_id: stockTransfer.entity_id,
        increment_id: stockTransfer.increment_id,
        source_location: stockTransfer.source_loc_code ? { loc_name: stockTransfer.source_loc_name, loc_code: stockTransfer.source_loc_code } : null,
        target_location: stockTransfer.target_loc_code ? { loc_name: stockTransfer.target_loc_name, loc_code: stockTransfer.target_loc_code } : null,
        reason: stockTransfer.reason,
        apply: false,
        data: stockTransfer.items.map((item) => ({
            ...item,
            sku: { sku: item.sku, source_id: item.source_id },
            transfer: item.transfer_qty,
            qty: item.source_qty,
        })),
    };

    const [updateStockTransfer] = gqlService.updateStockTransfer();

    const submitHandler = async (values) => {
        window.backdropLoader(true);
        const fixValues = {
            ...values,
            data: values.data.map((item) => ({ sku: item.sku.sku, qty: item.qty, transfer: item.transfer })),
            source_location: values.source_location.loc_code,
            target_location: values.target_location.loc_code,
        };
        const id = fixValues.entity_id;
        delete fixValues.increment_id;
        delete fixValues.entity_id;
        try {
            await updateStockTransfer({
                variables: {
                    id,
                    input: fixValues,
                },
            });

            if (fixValues.apply === true) {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('stocktransfer:The_stock_transfer_has_been_submitted_and_applied'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/cataloginventory/stocktransfer'), 250);
            } else if (fixValues.apply === false) {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('stocktransfer:The_stock_transfer_has_been_saved'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/cataloginventory/stocktransfer'), 250);
            }
        } catch (error) {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: error.message,
                variant: 'error',
            });
        }
    };

    const contentProps = {
        initialValues,
        statusTransfer,
        submitHandler,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const {
        loading, data, error,
    } = gqlService.getStockTransferById({
        id: router && router.query && Number(router.query.id),
    });
    const pageConfig = {
        title: `${t('stocktransfer:Stock_Transfer_')}${(data) ? data.getStockTransferById.increment_id : '' }`,
    };
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_stock_transfer',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('stocktransfer:Data_not_found');
        const redirect = '/cataloginventory/stocktransfer';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper data={data} {...props} />
        </Layout>
    );
};

export default Core;
