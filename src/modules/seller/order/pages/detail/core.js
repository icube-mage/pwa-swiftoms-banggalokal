/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import React from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Layout from '@layout';
import AppModal from '@common_appmodal/index';
import BoxReason from '@common_boxreason/index';
import ErrorRedirect from '@common_errorredirect';

import gqlTheme from '@modules/theme/services/graphql';
import gqlDelivery from '@modules/homedelivery/services/graphql';
import gqlService from '@sellermodules/order/services/graphql';
import { transformArray } from '@sellermodules/order/helpers';

import BackdropLoad from '@helper_backdropload';
import { sendDataLayer } from '@helper_gtm';

const ContentWrapper = (props) => {
    const {
        data, Content, refetch, t, dataAwb,
    } = props;

    const [open, setOpen] = React.useState(false);

    const [sellerCanceled] = gqlService.sellerCanceled();
    const [sellerConfirmOrder] = gqlService.sellerConfirmOrder();
    const [sellerOrderPacked] = gqlService.sellerOrderPacked();
    const [sellerBookCourier] = gqlService.sellerBookCourier();
    const [sellerOrderDelivered] = gqlService.sellerOrderDelivered();
    const [sellerOrderInDelivery] = gqlService.sellerOrderInDelivery();
    const [sellerCancelDelivery] = gqlService.sellerCancelDelivery();
    const [getCancelReasonsByChannel, { loading: loadingCancelReason }] = gqlService.getCancelReasonsByChannel();
    const [showCancelConfirmation, setShowCancelConfirmation] = React.useState(false);
    const [inputDataReason, setInputDataReason] = React.useState(null);

    const [getTracking, { data: datadataTracking, loading: loadingTracking, error: errorTracking }] = gqlDelivery.getTracking();
    const dataTracking = (datadataTracking && datadataTracking.getTracking);
    const dataTrackingError = (errorTracking && errorTracking.graphQLErrors[0] && errorTracking.graphQLErrors[0].message);

    const oder_number = data.order_number;

    const onHideModalCancel = React.useCallback(() => {
        setShowCancelConfirmation(false);
    }, []);

    const onShowModalCancel = React.useCallback(() => {
        setShowCancelConfirmation(true);
    }, []);

    const handleCancel = async () => {
        try {
            onShowModalCancel();
            const channel_code = data?.channel_code;
            const res = await getCancelReasonsByChannel({
                variables: { channel_code },
            });
            if (res) {
                const inputData = res?.data?.getCancelReasonsByChannel;
                if (inputData) {
                    setInputDataReason(inputData);
                }
            }
        } catch (err) {
            console.log('[err] get cancel by channel', err);
        }
    };

    const onCallbackReason = (params) => {
        onHideModalCancel();
        const reason = params?.reason?.value || params?.reason || null;

        const dataLayer = {
            event: 'cancel_order',
            eventLabel: 'Order Action - Cancel Order',
            event_data: {
                oder_number,
            },
        };
        sendDataLayer(dataLayer);

        window.backdropLoader(true);
        sellerCanceled({
            variables: {
                id: [data.entity_id],
                reason,
            },
        })
            .then((res) => {
                window.backdropLoader(false);
                if (res.data?.sellerCanceled) {
                    window.toastMessage({
                        open: true,
                        text: t('sellerorder:Order_has_been_canceled'),
                        variant: 'success',
                    });
                    setTimeout(() => refetch(), 250);
                } else {
                    throw new Error(t('sellerorder:No_orders_have_been_updated'));
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

    const handleConfirm = () => {
        const dataLayer = {
            event: 'confirm_order',
            eventLabel: 'Order Action - Confirm Order',
            event_data: {
                oder_number,
            },
        };
        sendDataLayer(dataLayer);

        window.backdropLoader(true);
        sellerConfirmOrder({
            variables: { id: [data.entity_id] },
        })
            .then((res) => {
                window.backdropLoader(false);
                if (res.data?.sellerConfirmOrder) {
                    window.toastMessage({
                        open: true,
                        text: t('sellerorder:Order_has_been_confirmed'),
                        variant: 'success',
                    });
                    setTimeout(() => refetch(), 250);
                } else {
                    throw new Error(t('sellerorder:No_orders_have_been_updated'));
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

    const handleBook = (pickup_time, set) => {
        if (set) {
            set(false);
        }

        const dataLayer = {
            event: 'order_book_courier',
            eventLabel: 'Order Action - Book Courier',
            event_data: {
                oder_number,
            },
        };
        sendDataLayer(dataLayer);

        window.backdropLoader(true);
        sellerBookCourier({
            variables: { id: [data.entity_id], pickup_time },
        })
            .then((res) => {
                window.backdropLoader(false);
                if (res.data?.sellerBookCourier) {
                    window.toastMessage({
                        open: true,
                        text: t('sellerorder:Courier_has_been_booked'),
                        variant: 'success',
                    });
                    setTimeout(() => refetch(), 250);
                } else {
                    throw new Error(t('sellerorder:No_orders_have_been_updated'));
                }
            })
            .catch((e) => {
                if (set) {
                    set(true);
                }
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const [getPickupTimeslots, getPickupTimeslotsRes] = gqlService.getPickupTimeslots({
        variables: {
            shipping_code: data.expedition?.shipping_code,
        },
        onCompleted: (res) => {
            window.backdropLoader(false);
            if (res.getPickupTimeslots?.length) {
                setOpen(true);
                window.backdropLoader(false);
            } else {
                handleBook();
            }
        },
        onError: (e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        },
    });

    const handleClickTrack = () => {
        getTracking({
            variables: {
                id: data.entity_id,
                airwaybill: data.tracks?.track_number,
            },
        });
    };

    const handleOrderDelivered = () => {
        const dataLayer = {
            event: 'order_order_delivered',
            eventLabel: 'Order Action - Order Delivered',
            event_data: {
                oder_number,
            },
        };
        sendDataLayer(dataLayer);

        window.backdropLoader(true);
        sellerOrderDelivered({
            variables: { id: [data.entity_id] },
        })
            .then((res) => {
                window.backdropLoader(false);
                if (res.data?.sellerOrderDelivered) {
                    window.toastMessage({
                        open: true,
                        text: t('sellerorder:Order_status_has_been_updated'),
                        variant: 'success',
                    });
                    setTimeout(() => refetch(), 250);
                } else {
                    throw new Error(t('sellerorder:Failed_to_update_order_status'));
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

    const handleDelivery = () => {
        const dataLayer = {
            event: 'order_in_delivery',
            eventLabel: 'Order Action - In Delivery',
            event_data: {
                oder_number,
            },
        };
        sendDataLayer(dataLayer);

        window.backdropLoader(true);
        sellerOrderInDelivery({
            variables: { id: [data.entity_id] },
        })
            .then((res) => {
                window.backdropLoader(false);
                if (res.data?.sellerOrderInDelivery) {
                    window.toastMessage({
                        open: true,
                        text: t('sellerorder:Order_status_has_been_updated'),
                        variant: 'success',
                    });
                    setTimeout(() => refetch(), 250);
                } else {
                    throw new Error(t('sellerorder:Failed_to_update_order_status'));
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

    const handleCancelDelivery = () => {
        const dataLayer = {
            event: 'order_cancel_delivery',
            eventLabel: 'Order Action - Cancel Delivery',
            event_data: {
                oder_number,
            },
        };
        sendDataLayer(dataLayer);

        window.backdropLoader(true);
        sellerCancelDelivery({
            variables: { id: [data.entity_id] },
        }).then((res) => {
            window.backdropLoader(false);
            if (res.data?.sellerCancelDelivery) {
                window.toastMessage({
                    open: true,
                    text: t('sellerorder:Delivery_has_been_canceled'),
                    variant: 'success',
                });
                setTimeout(() => refetch(), 250);
            } else {
                throw new Error(t('sellerorder:Failed_to_update_order_status'));
            }
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const handleSubmit = ({ awb_number }) => {
        const dataLayer = {
            event: 'order_in_delivery',
            eventLabel: 'Order Action - In Delivery',
            event_data: {
                oder_number,
            },
        };
        sendDataLayer(dataLayer);

        window.backdropLoader(true);
        sellerOrderInDelivery({
            variables: { id: [data.entity_id], awb_number },
        })
            .then((res) => {
                window.backdropLoader(false);
                if (res.data?.sellerOrderInDelivery) {
                    window.toastMessage({
                        open: true,
                        text: t('sellerorder:Order_status_has_been_updated'),
                        variant: 'success',
                    });
                    setTimeout(() => refetch(), 250);
                } else {
                    throw new Error(t('sellerorder:Failed_to_update_order_status'));
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

    const handlePackOrder = () => {
        const dataLayer = {
            event: 'pack_order',
            eventLabel: 'Order Action - Pack Order',
            event_data: {
                oder_number,
            },
        };
        sendDataLayer(dataLayer);

        window.backdropLoader(true);
        sellerOrderPacked({
            variables: { id: [data.entity_id] },
        })
            .then((res) => {
                window.backdropLoader(false);
                if (res.data?.sellerOrderPacked) {
                    window.toastMessage({
                        open: true,
                        text: t('order_has_been_packed'),
                        variant: 'success',
                    });
                    setTimeout(() => refetch(), 250);
                } else {
                    throw new Error(t('sellerorder:No_orders_have_been_updated'));
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

    const formik = useFormik({
        initialValues: {
            awb_number: '',
        },
        validationSchema: Yup.object().shape({
            awb_number: Yup.string().required(t('sellerorder:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const contentProps = {
        ...props,
        formik,
        orderItem: transformArray(data.items),
        handleCancel,
        handleConfirm,
        handleBook,
        handleOrderDelivered,
        handleDelivery,
        handleCancelDelivery,
        handleClickTrack,
        loadingTracking,
        dataTracking,
        dataTrackingError,
        dataAwb,
        getPickupTimeslotsRes,
        getPickupTimeslots,
        open,
        setOpen,
        dataSellerOrderStatus: props?.dataSellerOrderStatus?.getSellerOrderStatus || [],
        handlePackOrder,
    };

    return (
        <>
            <Content {...contentProps} />
            <AppModal
                closeButton
                onHandleClose={onHideModalCancel}
                show={showCancelConfirmation}
                title={t('sellerorder:Cancel_Reason')}
            >
                {loadingCancelReason && <div><strong>{`${t('common:loading')}...`}</strong></div>}
                {!loadingCancelReason && <BoxReason t={t} inputData={inputDataReason} onCallbackReason={onCallbackReason} /> }
            </AppModal>
        </>
    );
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const pageConfig = {
        title: `${t('order:Detail_Order_')}${router.query?.id}`,
        backUrl: '/seller/order',
    };

    const {
        loading, data, error, refetch,
    } = gqlService.getSellerOrder({
        id: router && router.query && Number(router.query.id),
    });

    const { data: dataAwb, loading: loadAwb } = gqlService.getGenerateAwbMethod({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: configLoading, data: configData } = gqlTheme.getStoreConfig({
        path: 'swiftoms_vendorportal/supported_carrier/auto_set_pickup_time',
    });

    const { loading: loadSellerOrderStatus, data: dataSellerOrderStatus } = gqlService.getSellerOrderStatus();

    React.useEffect(() => {
        BackdropLoad(loading || loadAwb || configLoading || loadSellerOrderStatus);
    }, [loading, loadAwb, configLoading, loadSellerOrderStatus]);

    if (loading || loadAwb || configLoading || loadSellerOrderStatus) {
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
                data={data?.getSellerOrder || {}}
                refetch={refetch}
                dataAwb={dataAwb?.getGenerateAwbMethod}
                isPickupTime={configData?.getStoreConfig === '0' || false}
                dataSellerOrderStatus={dataSellerOrderStatus}
                {...props}
            />
        </Layout>
    );
};

export default Core;
