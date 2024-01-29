/* eslint-disable no-use-before-define */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/homedelivery/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';
import transformArray from '@helper_arraybundle';

const ContentWrapper = (props) => {
    const {
        data, Content, refetch, pickPackEnable, allowReallocation, t,
    } = props;

    const [openTimeSlot, setOpenTimeSlot] = React.useState(false);
    const [openCancel, setOpenCancel] = React.useState(false);

    const homedelivery = data.getStoreShipmentById;
    const [confirmShipment] = gqlService.confirmShipment();
    const [cantFulfillShipment] = gqlService.cantFulfillShipment();
    const [pickShipment] = gqlService.pickShipment();
    const [cancelDelivery] = gqlService.cancelDelivery();
    const [packShipment] = gqlService.packShipment();
    const [bookCourier] = gqlService.bookCourier();
    const [shipDelivery] = gqlService.shipDelivery();
    const [deliveredShipment] = gqlService.deliveredShipment();
    const [saveShipmentNotes] = gqlService.saveShipmentNotes();
    const [cancelCourier] = gqlService.cancelCourier();

    const handleConfirm = () => {
        const variables = {
            id: homeDelivery.id,
        };
        window.backdropLoader(true);
        confirmShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('homedelivery:The_shipment_has_been_confirmed'),
                    variant: 'success',
                });
                setTimeout(() => refetch(), 250);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
                setTimeout(() => refetch(), 250);
            });
    };

    const handleCantFulfill = () => {
        const variables = {
            id: homeDelivery.id,
        };
        window.backdropLoader(true);
        cantFulfillShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('homedelivery:The_shipment_status_has_been_updated'),
                    variant: 'success',
                });
                setTimeout(() => refetch(), 250);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
                setTimeout(() => refetch(), 250);
            });
    };

    const handlePicked = () => {
        const variables = {
            id: homeDelivery.id,
        };
        window.backdropLoader(true);
        pickShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('homedelivery:The_shipment_has_been_picked'),
                    variant: 'success',
                });
                setTimeout(() => refetch(), 250);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
                setTimeout(() => refetch(), 250);
            });
    };

    const handleCanceled = ({ reason }) => {
        const variables = {
            id: homeDelivery.id,
            cancel_reason_id: reason.value,
        };
        setOpenCancel(false);
        window.backdropLoader(true);
        cancelDelivery({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('homedelivery:The_shipment_has_been_canceled'),
                    variant: 'success',
                });
                setTimeout(() => refetch(), 250);
            })
            .catch((e) => {
                window.backdropLoader(false);
                setOpenCancel(true);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
                setTimeout(() => refetch(), 250);
            });
    };

    const handlePacked = () => {
        const variables = {
            id: homeDelivery.id,
        };
        window.backdropLoader(true);
        packShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('homedelivery:The_shipment_has_been_packed'),
                    variant: 'success',
                });
                setTimeout(() => refetch(), 250);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
                setTimeout(() => refetch(), 250);
            });
    };

    const handleCourier = (vars) => {
        const variables = vars ? {
            ...vars,
        } : {
            id: homeDelivery.id,
        };
        window.backdropLoader(true);
        bookCourier({
            variables,
        })
            .then((res) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: res.data.bookCourier,
                    variant: 'success',
                });
                setTimeout(() => refetch(), 250);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
                setTimeout(() => refetch(), 250);
            });
    };

    const handleShipped = ({ carrier, name, reference }) => {
        const variables = {
            id: homeDelivery.id,
            carrier: carrier.value,
            name,
            reference,
        };
        window.backdropLoader(true);
        shipDelivery({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('homedelivery:The_shipment_has_been_shipped'),
                    variant: 'success',
                });
                setTimeout(() => refetch(), 250);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
                setTimeout(() => refetch(), 250);
            });
    };

    const handleDelivered = () => {
        const variables = {
            id: homeDelivery.id,
        };
        window.backdropLoader(true);
        deliveredShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('homedelivery:The_shipment_has_been_delivered'),
                    variant: 'success',
                });
                setTimeout(() => refetch(), 250);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
                setTimeout(() => refetch(), 250);
            });
    };

    const handleNotes = ({ notes }) => {
        const variables = {
            id: homeDelivery.id,
            notes,
        };
        window.backdropLoader(true);
        saveShipmentNotes({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('homedelivery:Notes_has_been_saved'),
                    variant: 'success',
                });
                setTimeout(() => refetch(), 250);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
                setTimeout(() => refetch(), 250);
            });
    };

    const handleCancelCourier = () => {
        const variables = {
            id: homeDelivery.id,
        };
        window.backdropLoader(true);
        cancelCourier({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('homedelivery:Booked_courier_has_been_canceled'),
                    variant: 'success',
                });
                setTimeout(() => refetch(), 250);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
                setTimeout(() => refetch(), 250);
            });
    };

    const [getStoreConfig] = gqlService.getStoreConfig({
        onCompleted: (res) => {
            if (res?.getStoreConfig === '1') {
                window.backdropLoader(false);
                setOpenTimeSlot(true);
            } else {
                handleCourier();
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

    const homeDelivery = {
        id: homedelivery.entity_id,
        shipmentNumber: homedelivery.increment_id,
        orderNumber: homedelivery.channel_order_increment_id,
        statusLabel: homedelivery.status.label,
        statusValue: homedelivery.status.value,
        allocation: homedelivery.allocation_status,
        allowBookCourier: homedelivery.is_book_courier_allowed,
        courier: homedelivery.courier_title,
        courierLogo: homedelivery.shipping_method_logo_url,
        date: homedelivery.channel_order_date,
        location: homedelivery.location.loc_name,
        updated: homedelivery.updated_at,
        awb: homedelivery.all_track[0],
        email: homedelivery.shipping_email,
        firstname: homedelivery.shipping_address.firstname,
        lastname: homedelivery.shipping_address.lastname,
        street: homedelivery.shipping_address.street,
        city: homedelivery.shipping_address.city,
        region: homedelivery.shipping_address.region,
        postcode: homedelivery.shipping_address.postcode,
        countryId: homedelivery.shipping_address.country_id,
        countryName: homedelivery.shipping_address.country_name,
        phone: homedelivery.shipping_address.telephone,
        pickup: homedelivery.pickup_info,
        order: transformArray(homedelivery.order_item),
        total: homedelivery.subtotal,
        history: homedelivery.status_history,
        shipping_address: homedelivery.shipping_address,
        shipping: homedelivery.channel_shipping_label,
        shippingMethod: homedelivery.channel_shipping_method,
        pickup_start_time: homedelivery.pickup_start_time,
        pickup_end_time: homedelivery.pickup_end_time,
    };

    const formikConfirm = useFormik({
        initialValues: {
            id: homedelivery.entity_id,
        },
        onSubmit: (values) => {
            handleConfirm(values);
        },
    });

    const formikCantFullfill = useFormik({
        initialValues: {
            id: homedelivery.entity_id,
        },
        onSubmit: (values) => {
            handleCantFulfill(values);
        },
    });

    const formikPicked = useFormik({
        initialValues: {
            id: homedelivery.entity_id,
        },
        onSubmit: (values) => {
            handlePicked(values);
        },
    });

    const formikCanceled = useFormik({
        initialValues: {
            id: homedelivery.entity_id,
            reason: '',
        },
        validationSchema: Yup.object().shape({
            reason: Yup.object().typeError(t('homedelivery:This_is_a_Required_field')).required(t('homedelivery:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handleCanceled(values);
        },
    });

    const formikPacked = useFormik({
        initialValues: {
            id: homedelivery.entity_id,
        },
        onSubmit: (values) => {
            handlePacked(values);
        },
    });

    const formikCourier = useFormik({
        initialValues: {
            id: homedelivery.entity_id,
        },
        onSubmit: () => {
            if (homedelivery.channel_shipping_method.includes('shipper')) {
                window.backdropLoader(true);
                getStoreConfig({ variables: { path: 'carriers/shipperid/active' } });
            } else {
                handleCourier();
            }
        },
    });

    const formikShipped = useFormik({
        initialValues: {
            id: homedelivery.entity_id,
            carrier: '',
            name: '',
            reference: '',
        },
        validationSchema: Yup.object().shape({
            carrier: Yup.object().typeError(t('homedelivery:This_is_a_Required_field')).required(t('homedelivery:This_is_a_Required_field')),
            name: Yup.string().required(t('homedelivery:This_is_a_Required_field')),
            reference: Yup.string().required(t('homedelivery:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handleShipped(values);
        },
    });

    const formikDelivered = useFormik({
        initialValues: {
            id: homedelivery.entity_id,
        },
        onSubmit: (values) => {
            handleDelivered(values);
        },
    });

    const formikNotes = useFormik({
        initialValues: {
            id: homedelivery.entity_id,
            notes: '',
        },
        validationSchema: Yup.object().shape({
            notes: Yup.string().required(t('homedelivery:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handleNotes(values);
        },
    });

    const formikCancelCourier = useFormik({
        initialValues: {
            id: homedelivery.entity_id,
        },
        onSubmit: (values) => {
            handleCancelCourier(values);
        },
    });

    const [getTracking, { data: datadataTracking, loading: loadingTracking, error: errorTracking }] = gqlService.getTracking();
    const dataTracking = (datadataTracking && datadataTracking.getTracking);
    const dataTrackingError = (errorTracking && errorTracking.graphQLErrors[0] && errorTracking.graphQLErrors[0].message);

    const handleClickTrack = () => {
        getTracking({
            variables: {
                id: homeDelivery.id,
                airwaybill: homeDelivery.awb?.track_number,
            },
        });
    };

    const handleSubmitTimeSlot = (variables) => {
        setOpenTimeSlot(false);
        window.backdropLoader(true);
        handleCourier(variables);
    };

    const contentProps = {
        homeDelivery,
        formikConfirm,
        formikCantFullfill,
        formikPicked,
        formikCanceled,
        formikPacked,
        formikCourier,
        formikShipped,
        formikDelivered,
        formikNotes,
        formikCancelCourier,
        pickPackEnable,
        allowReallocation,
        handleClickTrack,
        dataTracking,
        dataTrackingError,
        loadingTracking,
        t,
        openTimeSlot,
        setOpenTimeSlot,
        handleSubmitTimeSlot,
        openCancel,
        setOpenCancel,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();

    const pageConfig = {
        title: `${t('homedelivery:Home_Delivery')} #${router.query?.id}`,
    };

    const { loading: loadingConfig, data: dataConfig } = aclService.getStoreConfig({
        path: 'swiftoms_shipment/general/pick_and_pack',
    });

    const {
        loading, data, refetch, error,
    } = gqlService.getStoreShipmentById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclReallocationLoading, data: aclReallocationData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_order_reallocation',
    });
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'shipment_delivery_dashboard',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading || loadingConfig || aclReallocationLoading);
    }, [loading, loadingConfig, aclCheckLoading, aclReallocationLoading]);

    if (loading || aclCheckLoading || loadingConfig || aclReallocationLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('homedelivery:Data_not_found');
        const redirect = '/shipment/homedelivery';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper
                pickPackEnable={dataConfig.getStoreConfig === '1'}
                allowReallocation={aclReallocationData.isAccessAllowed}
                data={data}
                {...props}
                refetch={refetch}
            />
        </Layout>
    );
};

export default Core;
