/* eslint-disable max-len */
import Layout from '@layout';
import { useRouter } from 'node_modules/next/router';
import gqlService from '@modules/stockadjustment/services/graphql';
import aclService from '@modules/theme/services/graphql';
import React from 'react';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const { Content, data, t } = props;
    const router = useRouter();

    const initialValues = {
        increment_id: data?.increment_id ?? '',
        adjustment_id: data?.entity_id ?? 0,
        loc_code: data?.loc_code ? { loc_code: data?.loc_code, loc_name: data?.loc_name ?? '' } : { loc_code: '', loc_name: '' },
        reason: data?.reason ?? '',
        is_apply: false,
        items:
            data?.items?.map((item) => ({
                sku: item.sku,
                entity_id: item.entity_id,
                stock_adjustment: item.change_qty,
                stock_available: item.old_qty,
            })) ?? [],
        status: data?.status ?? '',
    };

    const [addStockAdjustment] = gqlService.addStockAdjustment();

    const submitHandler = async (values) => {
        window.backdropLoader(true);
        const fixValues = { ...values, loc_code: values.loc_code.loc_code };
        const items = values.items.map((val) => {
            const temp = { ...val };
            if (!temp.entity_id) {
                delete temp.entity_id;
            }
            if (temp?.from_csv) {
                delete temp.from_csv;
            }
            const deleted = values?.deleted_items?.find((delItem) => delItem?.sku && delItem.sku === val.sku && delItem.entity_id);
            return { ...temp, sku: typeof temp.sku === 'object' ? temp.sku.sku : temp.sku, entity_id: deleted?.entity_id ?? temp?.entity_id ?? null };
        });
        delete fixValues.status;
        fixValues.items = [...items];
        delete fixValues.increment_id;
        delete fixValues.deleted_items;

        try {
            await addStockAdjustment({
                variables: {
                    input: fixValues,
                },
            });

            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: `${fixValues.is_apply ? t('stockadjustment:Stock_adjustment_successfully_submitted_and_applied') : t('stockadjustment:Stock_adjustment_saved_successfully') }`,
                variant: 'success',
            });
            setTimeout(() => router.push('/cataloginventory/stockadjustment'), 250);
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
    const { t } = props;
    const router = useRouter();
    const { loading, data } = gqlService.getStockAdjustmentById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'inventory_adjustment_dashboard',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout />;
    }

    if (!data) {
        window.toastMessage({
            open: true,
            text: t('stockadjustment:Data_not_found'),
            variant: 'error',
        });
        setTimeout(() => {
            router.push('/cataloginventory/stockadjustment');
        }, 1000);
        return (
            <Layout>
                <div
                    style={{
                        display: 'flex',
                        color: '#435179',
                        fontWeight: 600,
                        justifyContent: 'center',
                        padding: '20px 0',
                    }}
                >
                    {t('stockadjustment:Data_not_found')}
                </div>
            </Layout>
        );
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout>
            <ContentWrapper data={data.getStockAdjustmentById} {...props} />
        </Layout>
    );
};

export default Core;
