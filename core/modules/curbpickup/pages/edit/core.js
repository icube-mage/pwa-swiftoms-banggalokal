/* eslint-disable no-use-before-define */
import React from 'react';
import Layout from '@layout';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/curbpickup/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';
import transformArray from '@helper_arraybundle';

const ContentWrapper = (props) => {
    const {
        data, Content, t, refetch,
    } = props;
    const curbpickup = data.getStoreShipmentById;
    const [confirmShipment] = gqlService.confirmShipment();
    const [cantFulfillShipment] = gqlService.cantFulfillShipment();
    const [pickShipment] = gqlService.pickShipment();
    const [packShipment] = gqlService.packShipment();
    const [pickedupShipment] = gqlService.pickedupShipment();

    const handleConfirm = () => {
        const variables = {
            id: curbPickup.id,
        };
        window.backdropLoader(true);
        confirmShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('curbsidepickup:The_shipment_has_been_confirmed'),
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
            id: curbPickup.id,
        };
        window.backdropLoader(true);
        cantFulfillShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('curbsidepickup:The_shipment_status_has_been_updated'),
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
            id: curbPickup.id,
        };
        window.backdropLoader(true);
        pickShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('curbsidepickup:The_shipment_has_been_picked'),
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

    const handlePacked = () => {
        const variables = {
            id: curbPickup.id,
        };
        window.backdropLoader(true);
        packShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('curbsidepickup:The_shipment_has_been_packed'),
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

    const handleComplete = ({ name, reference }) => {
        const variables = {
            id: curbPickup.id,
            name,
            reference,
        };
        window.backdropLoader(true);
        pickedupShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('curbsidepickup:The_shipment_has_been_picked_up_by_customer'),
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

    const curbPickup = {
        id: curbpickup.entity_id,
        shipmentNumber: curbpickup.increment_id,
        orderNumber: curbpickup.channel_order_increment_id,
        location: curbpickup.pickup_info.loc_details,
        allocation: curbpickup.allocation_status,
        status: curbpickup.status.label,
        statusValue: curbpickup.status.value,
        track: curbpickup.all_track,
        name: curbpickup.customer_name,
        shippingPhone: curbpickup.shipping_address.telephone,
        firstname: curbpickup.shipping_address.firstname,
        lastname: curbpickup.shipping_address.lastname,
        street: curbpickup.shipping_address.street,
        city: curbpickup.shipping_address.city,
        region: curbpickup.shipping_address.region,
        postcode: curbpickup.shipping_address.postcode,
        countryId: curbpickup.shipping_address.country_id,
        pickup: curbpickup.pickup_info,
        locName: curbpickup.loc_code,
        order: transformArray(curbpickup.items),
        total: curbpickup.subtotal,
    };

    const formikConfirm = useFormik({
        initialValues: {
            id: curbpickup.entity_id,
        },
        onSubmit: (values) => {
            handleConfirm(values);
        },
    });

    const formikCantFullfill = useFormik({
        initialValues: {
            id: curbpickup.entity_id,
        },
        onSubmit: (values) => {
            handleCantFulfill(values);
        },
    });

    const formikPicked = useFormik({
        initialValues: {
            id: curbpickup.entity_id,
        },
        onSubmit: (values) => {
            handlePicked(values);
        },
    });

    const formikPacked = useFormik({
        initialValues: {
            id: curbpickup.entity_id,
        },
        onSubmit: (values) => {
            handlePacked(values);
        },
    });

    const formikComplete = useFormik({
        initialValues: {
            id: curbpickup.entity_id,
            name: '',
            reference: '',
        },
        onSubmit: (values) => {
            handleComplete(values);
        },
    });

    const contentProps = {
        curbPickup,
        formikConfirm,
        formikCantFullfill,
        formikPicked,
        formikPacked,
        formikComplete,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();

    const pageConfig = {
        title: `${t('curbsidepickup:Curbside_Pickup')} #${router.query?.id}`,
    };

    const {
        loading, data, error, refetch,
    } = gqlService.getStoreShipmentById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'shipment_curbside_pickup',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('curbsidepickup:Data_not_found');
        const redirect = '/shipment/curbpickup';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        data,
        t,
        refetch,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
