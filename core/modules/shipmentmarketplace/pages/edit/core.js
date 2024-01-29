/* eslint-disable no-use-before-define */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/shipmentmarketplace/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';
import transformArray from '@helper_arraybundle';

const ContentWrapper = (props) => {
    const {
        data, Content, refetch, dataConfig, t,
    } = props;
    const shipmentmarketplace = data.getStoreShipmentById;
    const [confirmMarketplaceShipment] = gqlService.confirmMarketplaceShipment();
    const [pickShipment] = gqlService.pickShipment();
    const [canceledMarketplaceShipment] = gqlService.canceledMarketplaceShipment();
    const [packShipment] = gqlService.packShipment();
    const [shippedMarketplaceShipment] = gqlService.shippedMarketplaceShipment();
    const [deliveredShipment] = gqlService.deliveredShipment();
    const [saveShipmentNotes] = gqlService.saveShipmentNotes();
    const [openCancel, setOpenCancel] = React.useState(false);

    const handleConfirm = () => {
        const variables = {
            id: shipmentMarketplace.id,
        };
        window.backdropLoader(true);
        confirmMarketplaceShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('shipmentmarketplace:The_shipment_has_been_confirmed'),
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
            id: shipmentMarketplace.id,
        };
        window.backdropLoader(true);
        pickShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('shipmentmarketplace:The_shipment_has_been_picked'),
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
            id: shipmentMarketplace.id,
            cancel_reason_id: reason,
        };
        setOpenCancel(false);
        window.backdropLoader(true);
        canceledMarketplaceShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('shipmentmarketplace:The_shipment_has_been_canceled'),
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
            id: shipmentMarketplace.id,
        };
        window.backdropLoader(true);
        packShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('shipmentmarketplace:The_shipment_has_been_packed'),
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

    const handleShipped = ({ awb }) => {
        const variables = {
            id: shipmentMarketplace.id,
            track_number: awb,
        };
        window.backdropLoader(true);
        shippedMarketplaceShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('shipmentmarketplace:The_shipment_has_been_shipped'),
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
            id: shipmentMarketplace.id,
        };
        window.backdropLoader(true);
        deliveredShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('shipmentmarketplace:The_shipment_has_been_delivered'),
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
            id: shipmentMarketplace.id,
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
                    text: t('shipmentmarketplace:Notes_has_been_saved'),
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

    const shipmentMarketplace = {
        id: shipmentmarketplace.entity_id,
        shipmentNumber: shipmentmarketplace.increment_id,
        channelId: shipmentmarketplace.channel_order_increment_id,
        channelName: shipmentmarketplace.channel?.channel_name,
        channelCode: shipmentmarketplace.channel?.channel_code,
        channelIcon: shipmentmarketplace.channel?.image_url,
        orderNumber: shipmentmarketplace.marketplace_order_number,
        statusLabel: shipmentmarketplace.status.label,
        statusValue: shipmentmarketplace.status.value,
        marketplaceOrderStatus: shipmentmarketplace.marketplace_order_status,
        marketplaceCode: shipmentmarketplace.marketplace_code,
        allocation: shipmentmarketplace.allocation_status,
        date: shipmentmarketplace.channel_order_date,
        location: shipmentmarketplace.location.loc_name,
        awbSource: shipmentmarketplace.awb_source,
        trackNumber: shipmentmarketplace.track_number,
        updated: shipmentmarketplace.updated_at,
        awb: shipmentmarketplace.all_track[0],
        email: shipmentmarketplace.shipping_email,
        firstname: shipmentmarketplace.shipping_address.firstname,
        lastname: shipmentmarketplace.shipping_address.lastname,
        street: shipmentmarketplace.shipping_address.street,
        city: shipmentmarketplace.shipping_address.city,
        region: shipmentmarketplace.shipping_address.region,
        postcode: shipmentmarketplace.shipping_address.postcode,
        countryId: shipmentmarketplace.shipping_address.country_id,
        countryName: shipmentmarketplace.shipping_address.country_name,
        phone: shipmentmarketplace.shipping_address.telephone,
        shippingAddress: shipmentmarketplace.shipping_address,
        pickup: shipmentmarketplace.pickup_info,
        order: transformArray(shipmentmarketplace.order_item) || [],
        method: shipmentmarketplace.channel_shipping_label,
        total: shipmentmarketplace.subtotal,
        history: shipmentmarketplace.status_history || [],
    };

    const formikConfirm = useFormik({
        initialValues: {
            id: shipmentmarketplace.entity_id,
        },
        onSubmit: (values) => {
            handleConfirm(values);
        },
    });

    const formikPicked = useFormik({
        initialValues: {
            id: shipmentmarketplace.entity_id,
        },
        onSubmit: (values) => {
            handlePicked(values);
        },
    });

    const formikCanceled = useFormik({
        initialValues: {
            id: shipmentmarketplace.entity_id,
            reason: '',
        },
        validationSchema: Yup.object().shape({
            reason: Yup.string().typeError(t('shipmentmarketplace:This_is_a_Required_field'))
                .required(t('shipmentmarketplace:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handleCanceled(values);
        },
    });

    const formikPacked = useFormik({
        initialValues: {
            id: shipmentmarketplace.entity_id,
        },
        onSubmit: (values) => {
            handlePacked(values);
        },
    });

    const formikShipped = useFormik({
        initialValues: {
            id: shipmentmarketplace.entity_id,
            awb: (shipmentMarketplace.awb && shipmentMarketplace.awb.track_number) || '',
        },
        onSubmit: (values) => {
            handleShipped(values);
        },
    });

    const formikDelivered = useFormik({
        initialValues: {
            id: shipmentmarketplace.entity_id,
        },
        onSubmit: (values) => {
            handleDelivered(values);
        },
    });

    const formikNotes = useFormik({
        initialValues: {
            id: shipmentmarketplace.entity_id,
            notes: '',
        },
        validationSchema: Yup.object().shape({
            notes: Yup.string().required(t('shipmentmarketplace:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handleNotes(values);
        },
    });

    const contentProps = {
        shipmentMarketplace,
        formikConfirm,
        formikPicked,
        formikCanceled,
        formikPacked,
        formikShipped,
        formikDelivered,
        formikNotes,
        dataConfig,
        t,
        openCancel,
        setOpenCancel,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();

    const pageConfig = {
        title: `${t('shipmentmarketplace:Marketplace')} #${router.query?.id}`,
    };

    const { loading: loadingConfig, data: dataConfig } = gqlService.getStoreConfig({
        path: 'swiftoms_shipment/general/pick_and_pack',
    });
    const {
        loading, data, refetch, error,
    } = gqlService.getStoreShipmentById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'shipment_marketplace_dashboard',
    });

    React.useEffect(() => {
        BackdropLoad(loading || loadingConfig || aclCheckLoading);
    }, [loading, loadingConfig, aclCheckLoading]);

    if (loading || loadingConfig || aclCheckLoading) {
        return (
            <Layout pageConfig={pageConfig} />
        );
    }

    if (!data) {
        const errMsg = error?.message ?? t('shipmentmarketplace:errData');
        const redirect = '/shipment/shipmentmarketplace';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper dataConfig={dataConfig.getStoreConfig === '1'} data={data} {...props} refetch={refetch} />
        </Layout>
    );
};

export default Core;
