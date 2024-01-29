import Layout from '@layout';
import { useRouter } from 'node_modules/next/router';
import gqlService from '@modules/stocktransfer/services/graphql';
import aclService from '@modules/theme/services/graphql';
import React from 'react';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const { Content, t } = props;
    const router = useRouter();

    const initialValues = {
        source_location: null,
        target_location: null,
        reason: '',
        apply: false,
        data: [],
    };

    const [createStockTransfer] = gqlService.createStockTransfer();

    const submitHandler = async (values) => {
        window.backdropLoader(true);

        const fixValues = {
            ...values,
            data: values.data.map((item) => ({ ...item, sku: item.sku.sku })),
            source_location: values.source_location.loc_code,
            target_location: values.target_location.loc_code,
        };

        try {
            await createStockTransfer({
                variables: {
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
        submitHandler,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_stock_transfer',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading);
    }, [aclCheckLoading]);

    if (aclCheckLoading) {
        return <Layout />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout>
            <ContentWrapper {...props} />
        </Layout>
    );
};

export default Core;
