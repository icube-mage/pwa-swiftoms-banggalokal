/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlTheme from '@modules/theme/services/graphql';
import gqlService from '@sellermodules/order/services/graphql';
import gqlDelivery from '@modules/homedelivery/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';
import { transformArray } from '@sellermodules/order/helpers';

const ContentWrapper = (props) => {
    const {
        data, Content, refetch, t, dataAwb,
    } = props;

    const [open, setOpen] = React.useState(false);

    const [sellerCanceled] = gqlService.sellerCanceled();
    const [sellerConfirm] = gqlService.sellerConfirm();
    const [sellerBookCourier] = gqlService.sellerBookCourier();
    const [sellerOrderDelivered] = gqlService.sellerOrderDelivered();
    const [sellerOrderInDelivery] = gqlService.sellerOrderInDelivery();
    const [sellerCancelDelivery] = gqlService.sellerCancelDelivery();

    const [getTracking, { data: datadataTracking, loading: loadingTracking, error: errorTracking }] = gqlDelivery.getTracking();
    const dataTracking = (datadataTracking && datadataTracking.getTracking);
    const dataTrackingError = (errorTracking && errorTracking.graphQLErrors[0] && errorTracking.graphQLErrors[0].message);

    const handleCancel = () => {
        window.backdropLoader(true);
        sellerCanceled({
            variables: { id: data.entity_id },
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
        window.backdropLoader(true);
        sellerConfirm({
            variables: { id: [data.entity_id] },
        })
            .then((res) => {
                window.backdropLoader(false);
                if (res.data?.sellerConfirm) {
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
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const pageConfig = {
        title: `${t('order:Detail_Order_')}${router.query?.id}`,
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
                data={data?.getSellerOrder || {}}
                refetch={refetch}
                dataAwb={dataAwb?.getGenerateAwbMethod}
                isPickupTime={configData?.getStoreConfig === '0' || false}
                {...props}
            />
        </Layout>
    );
};

export default Core;
