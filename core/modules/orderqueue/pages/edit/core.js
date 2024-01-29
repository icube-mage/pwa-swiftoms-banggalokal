/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/orderqueue/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        data, Content, parent, aclCheckData, refetchOrderQueue, t, isSales,
    } = props;
    const router = useRouter();
    const [openDialog, setOpenDialog] = React.useState(false);
    const orderqueue = isSales ? data.getSalesOrderById : data.getOrderQueueById;
    const [setReallocation] = gqlService.setReallocation();
    const [setOrderAsNew] = gqlService.setOrderAsNew();
    const [editOrderItem] = gqlService.editOrderItem();
    const [editSalesOrderItem] = gqlService.editSalesOrderItem();
    const [cancelOrder] = gqlService.cancelOrder();
    const [paymentApproval] = gqlService.paymentApproval();

    const [getShipmentList, { loading: loadingShipment, data: dataShipment }] = gqlService.getShipmentList();
    const [getHistoryOrderItemList, getHistoryOrderItemListRes] = gqlService.getHistoryOrderItemList();

    const handleAllocate = () => {
        const variables = {
            id: [isSales ? orderqueue.entity_id : orderqueue.id],
        };
        window.backdropLoader(true);
        setReallocation({
            variables,
        })
            .then((res) => {
                window.backdropLoader(false);
                if (res.data?.setReallocation) {
                    window.toastMessage({
                        open: true,
                        text: t('order:A_total_of_valuescount_orders_have_been_updated', { values: { count: res.data.setReallocation } }),
                        variant: 'success',
                    });
                } else {
                    throw new Error(t('order:No_orders_have_been_updated'));
                }
                setTimeout(() => window.location.reload(true), 250);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const handleNew = () => {
        const variables = {
            id: [isSales ? orderqueue.entity_id : orderqueue.id],
        };
        window.backdropLoader(true);
        setOrderAsNew({
            variables,
        })
            .then((res) => {
                window.backdropLoader(false);
                if (res.data?.setOrderAsNew) {
                    window.toastMessage({
                        open: true,
                        text: t('order:A_total_of_valuescount_orders_have_been_updated', { values: { count: res.data.setOrderAsNew } }),
                        variant: 'success',
                    });
                } else {
                    throw new Error(t('order:No_orders_have_been_updated'));
                }
                setTimeout(() => window.location.reload(true), 250);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const handleCancel = () => {
        const variables = {
            id: isSales ? orderqueue.entity_id : orderqueue.id,
        };
        window.backdropLoader(true);
        cancelOrder({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('order:Order_was_canceled'),
                    variant: 'success',
                });
                setTimeout(() => window.location.reload(true), 250);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const orderQueue = {
        id: isSales ? orderqueue.entity_id : orderqueue.id,
        lastUpdated: isSales ? orderqueue.updated_at : orderqueue.last_updated,
        createdAt: orderqueue.created_at,
        status: orderqueue.status,
        channelOrderId: orderqueue.channel_order_increment_id,
        channelCode: orderqueue.channel_code,
        channelIcon: orderqueue.channel_image_url,
        acceptanceDeadline: orderqueue.acceptance_deadline,
        email: isSales ? orderqueue.customer_email : orderqueue.email,
        customerGroup: orderqueue.customer_group,
        custom_order_attributes: isSales ? '' : JSON.parse(orderqueue.custom_order_attributes),
        billing: orderqueue.billing_address,
        shipping: orderqueue.shipping_address,
        channelPaymentMethod: orderqueue.channel_payment_method,
        channelShippingMethod: orderqueue.channel_shipping_method,
        channelName: orderqueue.channel_name,
        orderItem: orderqueue.order_item,
        errorLog: orderqueue.error_log,
        shippingCost: isSales ? orderqueue.shipping_amount : orderqueue.channel_shipping_cost,
        grandTotal: isSales ? orderqueue.grand_total : orderqueue.channel_grand_total,
        isAllowReallocate: isSales ? false : orderqueue.is_allow_to_reallocate_order,
        isAllowRecreate: isSales ? false : orderqueue.is_allow_to_recreate_order,
        notes: orderqueue.notes,
        channel_order_status: orderqueue.channel_order_status,
        subtotal: orderqueue.subtotal,
        aw_store_credit_amount: orderqueue.aw_store_credit_amount,
        discount: orderqueue.discount,
        couponCode: orderqueue.coupon_code,
        onlyFreeShippingCouponCode: orderqueue.only_free_shipping_coupon_code,
    };

    const transformArray = (arr = []) => {
        const res = arr.map((item) => {
            if (item.parent_item_id) {
                return { ...item, isChildOld: true };
            }
            return { ...item, isChild: false, bundle_children: [] };
        });
        arr.filter((item) => item.parent_item_id).forEach((item) => {
            const pIdx = res.findIndex((p) => p.id === item.parent_item_id);
            // eslint-disable-next-line no-prototype-builtins
            res[pIdx] = {
                ...res[pIdx],
                bundle_children: [...res[pIdx].bundle_children, { ...item }],
            };
        });
        return res;
    };

    const initialValueEditItem = {
        order_id: isSales ? orderqueue.entity_id : orderqueue.id,
        order_items: transformArray(orderqueue.order_item.map((item) => ({ ...item, item_id_replacement: null }))),
        deleted_items: [],
    };

    const handleSubmitEdit = (values) => {
        const mergedValues = [...values.order_items, ...values.deleted_items.map((item) => ({ ...item }))];
        const fixValues = {
            order_id: values.order_id,
            order_items: mergedValues.map((item, idx) => ({
                id: item?.id ?? null,
                qty: Number(item.qty),
                replacement_for_sku: item.replacement_for?.sku ?? item.replacement_for,
                item_id_replacement: item.item_id_replacement,
                sku: item.name?.sku ?? item.sku,
                loc_code:
                    typeof item?.loc_code === 'string'
                        ? null
                        : orderqueue.order_item[idx].loc_code === item?.loc_code?.loc_code
                            ? null
                            : item?.loc_code?.loc_code ?? null,
                is_deleted: item?.is_deleted ?? false,
            })),
        };
        window.backdropLoader(true);
        editOrderItem({
            variables: {
                ...fixValues,
            },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('order:The_order_has_been_saved'),
                    variant: 'success',
                });
                setTimeout(() => refetchOrderQueue(), 1000);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const handleSubmitEditProcessing = (values) => {
        const fixValues = {
            sales_order_id: values.order_id,
            order_items: values.order_items.map((item, idx) => ({
                shipment_item_id: String(item.shipment_item_id) ?? `new_${idx + 1}`,
                rows: {
                    qty: Number(item.qty),
                    replacement_for: item.replacement_for?.sku || item.replacement_for || '',
                    sku: item.name?.sku ?? item.sku,
                },
            })),
        };

        window.backdropLoader(true);
        editSalesOrderItem({
            variables: {
                input: { ...fixValues },
            },
        })
            .then((res) => {
                window.backdropLoader(false);
                if (res.data.editSalesOrderItem.success) {
                    window.toastMessage({
                        open: true,
                        text: res.data.editSalesOrderItem.message || t('order:The_order_has_been_saved'),
                        variant: 'success',
                    });
                    setTimeout(() => refetchOrderQueue(), 1000);
                } else {
                    throw new Error(res.data.editSalesOrderItem.message);
                }
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const handlePaymentApproval = () => {
        const variables = {
            order_id: isSales ? orderqueue.entity_id : orderqueue.id,
            queue: !isSales,
        };
        setOpenDialog(false);
        window.backdropLoader(true);
        paymentApproval({
            variables,
        }).then((res) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: res.data.paymentApproval,
                variant: 'success',
            });
            setTimeout(() => window.location.reload(true), 250);
        }).catch((e) => {
            setOpenDialog(true);
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const [getPaymentByOrderId, { loading: paymentLoading, data: dataPaymentData, error: dataPaymentError }] = gqlService.getPaymentByOrderId();
    const paymentData = (dataPaymentData && dataPaymentData.getPaymentByOrderId);
    const paymentError = (dataPaymentError && dataPaymentError.graphQLErrors[0] && dataPaymentError.graphQLErrors[0].message);
    const handleViewDetail = () => {
        getPaymentByOrderId({
            variables: {
                order_id: isSales ? orderqueue.entity_id : orderqueue.id,
                queue: !isSales,
            },
        });
    };

    const contentProps = {
        handleAllocate,
        handleNew,
        orderQueue,
        parent,
        aclCheckData,
        initialValueEditItem,
        paymentLoading,
        paymentData,
        paymentError,
        handleSubmitEdit,
        handleCancel,
        handleViewDetail,
        handlePaymentApproval,
        t,
        getHistoryOrderItemListRes,
        dataShipment,
        isSales,
        handleSubmitEditProcessing,
        openDialog,
        setOpenDialog,
        ...props,
    };

    React.useEffect(() => {
        getHistoryOrderItemList({
            variables: {
                oms_order_id: isSales ? orderqueue.entity_id : orderqueue.id,
            },
        });
        if (router.query.tab_status === 'complete' || router.query.tab_status === 'shipment_processing') {
            getShipmentList({
                variables: {
                    filter: {
                        order_id: {
                            from: orderqueue && String(orderqueue.entity_id || ''),
                            to: orderqueue && String(orderqueue.entity_id || ''),
                        },
                    },
                },
            });
        }
    }, []);

    React.useEffect(() => {
        BackdropLoad(loadingShipment || getHistoryOrderItemListRes.loading);
    }, [loadingShipment, getHistoryOrderItemListRes.loading]);

    if (loadingShipment) {
        return <div />;
    }

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const tab_status = router && router.query && router.query.tab_status;
    const isSales = tab_status === 'complete' || tab_status === 'shipment_processing';

    const {
        loading, data, error, refetch: refetchOrderQueue,
    } = gqlService[isSales ? 'getSalesOrderById' : 'getOrderQueueById']({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'sales_order_queue_edit_replacement',
    });

    // eslint-disable-next-line consistent-return
    const capitalizeStatus = () => {
        if (router?.query?.tab_status) {
            const words = router.query?.tab_status?.split('_');
            if (words?.length && words[0] === 'complete') {
                return 'Completed';
            }
            for (let i = 0; i < words.length; i++) {
                words[i] = words[i][0].toUpperCase() + words[i].substr(1);
            }
            return `${words.join(' ').replace('Order', '')}`;
        }
    };

    const customBreadcrumb = router?.query?.tab_status ? [
        { url: `/order/${router.query.tab_status}`, label: 'Order' },
        { url: `/order/${router.query.tab_status}`, label: capitalizeStatus() },
        { url: router.asPath, label: `${t('order:Detail_Order_')}${router.query?.id}` },
    ] : [
        { url: '/order/allorder', label: 'Order' },
        { url: '/order/allorder', label: t('order:All_Orders') },
        { url: router.asPath, label: `${t('order:Detail_Order_')}${router.query?.id}` },
    ];

    const pageConfig = {
        title: `${t('order:Detail_Order_')}${router.query?.id}`,
        customBreadcrumb,
    };

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('order:Data_not_found');
        const redirect = router.query.tab_status ? `/order/${router.query.tab_status}` : '/order/allorder';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper
                refetchOrderQueue={refetchOrderQueue}
                data={data}
                aclCheckData={aclCheckData}
                parent={router && router.query && router.query.tab_status}
                isSales={isSales}
                {...props}
            />
        </Layout>
    );
};

export default Core;
