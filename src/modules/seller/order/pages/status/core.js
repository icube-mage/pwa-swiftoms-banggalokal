/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlTheme from '@modules/theme/services/graphql';
import gqlService from '@sellermodules/order/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';
import { transformArray } from '@sellermodules/order/helpers';
import helperCookies from '@helper_cookies';

const ContentWrapper = (props) => {
    const {
        data, Content, t, dataAwb, dataSellerStock,
    } = props;
    const router = useRouter();

    const [open, setOpen] = React.useState(false);
    const [openCancelDialog, setOpenCancelDialog] = React.useState();
    const [cancelReason, setCancelReason] = React.useState('');
    const [getCancelReasonsByChannel, { loading: loadingCancelReason }] = gqlService.getCancelReasonsByChannel();

    const [reallocateSellerOrderQueue, { loading: loadingReallocate }] = gqlService.reallocateSellerOrderQueue();
    const [sellerCancelOrderQueue, { loading: loadingCancel }] = gqlService.sellerCancelOrderQueue();

    const [currentStock, setCurrentStock] = React.useState([]);

    React.useEffect(() => {
        setCurrentStock(dataSellerStock.map((e) => ({
            sku: e.sku,
            qty_saleable: e.qty_saleable,
            location: e.location,
            product_name: e.product_name,
            vendor_sku: e.vendor_sku,
        })));
    }, [dataSellerStock]);

    const validationSchema = Yup.object().shape({
        seller_stock: Yup.array().of(Yup.object().shape({
            qty_saleable: Yup.number().typeError(t('sellerorder:This_is_a_Required_field')).required(t('sellerorder:This_is_a_Required_field')),
        })),
    });

    const handleCancelAlloc = () => {
        if (cancelReason) {
            sellerCancelOrderQueue({
                variables: {
                    id: data?.items[0]?.id,
                    reason: cancelReason,
                },
            }).then((res) => {
                window.backdropLoader(false);
                if (res.data?.sellerCancelOrderQueue) {
                    window.toastMessage({
                        open: true,
                        text: t('sellerorder:cancel_order_alloc_success'),
                        variant: 'success',
                    });
                    setTimeout(() => router.back(), 500);
                } else {
                    throw new Error(t('sellerorder:No_orders_have_been_updated'));
                }
            }).catch((err) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: err.message,
                    variant: 'error',
                });
            });
        }
    };

    const onCallbackReason = (params) => {
        setOpenCancelDialog(false);
        window.backdropLoader(true);
        const reason = params?.reason?.value || params?.reason || null;
        sellerCancelOrderQueue({
            variables: {
                id: data?.items[0]?.id,
                reason,
            },
        }).then((res) => {
            window.backdropLoader(false);
            if (res.data?.sellerCancelOrderQueue) {
                window.toastMessage({
                    open: true,
                    text: t('sellerorder:cancel_order_alloc_success'),
                    variant: 'success',
                });
                setTimeout(() => router.back(), 500);
            } else {
                throw new Error(t('sellerorder:No_orders_have_been_updated'));
            }
        }).catch((err) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: err.message,
                variant: 'error',
            });
        });
    };

    const formik = useFormik({
        initialValues: {
            seller_stock: dataSellerStock.map((e) => ({
                sku: e.sku,
                qty_saleable: 0,
                location: e.location,
                product_name: e.product_name,
                vendor_sku: e.vendor_sku,
                qty_total: e.qty_total,
                qty_reserved: e.qty_reserved,
                qty_buffer: e.qty_buffer,
            })),
        },
        validationSchema,
        onSubmit: (values) => {
            const stock = values?.seller_stock.map((e) => {
                const [getCurrentStock] = currentStock.filter((i) => i?.sku === e?.sku && i?.location.loc_id === e.location.loc_id) || [];
                return getCurrentStock?.qty_saleable !== e?.qty_saleable && e?.qty_saleable > 0 && ({
                    sku: e?.sku,
                    qty: e?.qty_saleable,
                    loc_id: e?.location.loc_id,
                });
            }).filter((i) => i !== false) || [];
            reallocateSellerOrderQueue({
                variables: {
                    id: data?.items[0]?.id,
                    stock,
                },
            }).then((res) => {
                window.backdropLoader(false);
                if (res.data?.reallocateSellerOrderQueue) {
                    window.toastMessage({
                        open: true,
                        text: t('sellerorder:update_order_alloc_success'),
                        variant: 'success',
                    });
                    setTimeout(() => router.back(), 500);
                } else {
                    throw new Error(t('sellerorder:No_orders_have_been_updated'));
                }
            }).catch((err) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: err.message,
                    variant: 'error',
                });
            });
        },
    });

    const contentProps = {
        ...props,
        formik,
        orderItem: transformArray(data.items[0].items),
        dataAwb,
        open,
        openCancelDialog,
        setOpen,
        setOpenCancelDialog,
        cancelReason,
        setCancelReason,
        handleCancelAlloc,
        loadingReallocate,
        loadingCancel,
        loadingCancelReason,
        onCallbackReason,
        getCancelReasonsByChannel,
        currentStock,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const initialLanguage = helperCookies.get('language');

    const pageConfig = {
        title: `${t('order:Detail_Order_')}${router.query?.id}`,
    };

    // prettier-ignore
    const [getSellerOrderQueueList, {
        loading, data, error, refetch,
    }] = gqlService.getSellerOrderQueueList();

    const { data: dataAwb, loading: loadAwb } = gqlService.getGenerateAwbMethod({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: configLoading, data: configData } = gqlTheme.getStoreConfig({
        path: 'swiftoms_vendorportal/supported_carrier/auto_set_pickup_time',
    });

    React.useEffect(() => {
        getSellerOrderQueueList({
            variables: {
                filter: {
                    id: {
                        eq: (router && router?.query?.id) || '',
                    },
                },
            },
        });
    }, [initialLanguage]);

    React.useEffect(() => {
        BackdropLoad(loading || loadAwb || configLoading);
    }, [loading, loadAwb, configLoading]);

    if (loading || loadAwb || configLoading) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('order:Data_not_found');
        const redirect = '/seller/order';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} isSeller />;
    }

    return (
        <Layout pageConfig={pageConfig} seller>
            <ContentWrapper
                data={data?.getSellerOrderQueueList || {}}
                refetch={refetch}
                dataAwb={dataAwb?.getGenerateAwbMethod}
                isPickupTime={configData?.getStoreConfig === '0' || false}
                dataSellerStock={[]}
                {...props}
            />
        </Layout>
    );
};

export default Core;
