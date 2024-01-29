/* eslint-disable no-use-before-define */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/storepickup/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';
import transformArray from '@helper_arraybundle';

const ContentWrapper = (props) => {
    const {
        data, Content, refetch, pickPackEnable, allowReallocation, t,
    } = props;
    const storepickup = data.getStoreShipmentById;
    const [confirmShipment] = gqlService.confirmShipment();
    const [cantFulfillShipment] = gqlService.cantFulfillShipment();
    const [pickShipment] = gqlService.pickShipment();
    const [packShipment] = gqlService.packShipment();
    const [pickedupShipment] = gqlService.pickedupShipment();
    const [saveShipmentNotes] = gqlService.saveShipmentNotes();
    const [canceledShipment] = gqlService.canceledShipment();
    const [openCancel, setOpenCancel] = React.useState(false);

    const handleConfirm = () => {
        const variables = {
            id: storePickup.id,
        };
        window.backdropLoader(true);
        confirmShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('storepickup:The_shipment_has_been_confirmed'),
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
            id: storePickup.id,
        };
        window.backdropLoader(true);
        cantFulfillShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('storepickup:The_shipment_status_has_been_updated'),
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
            id: storePickup.id,
        };
        window.backdropLoader(true);
        pickShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('storepickup:The_shipment_has_been_picked'),
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
            id: storePickup.id,
        };
        window.backdropLoader(true);
        packShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('storepickup:The_shipment_has_been_packed'),
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

    const handlePickedUpShipment = ({ name, reference }) => {
        const variables = {
            id: storePickup.id,
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
                    text: t('storepickup:The_shipment_has_been_picked_up_by_customer'),
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

    const handleSaveNotes = ({ notes }) => {
        const variables = {
            id: storePickup.id,
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
                    text: t('storepickup:Notes_saved'),
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
            id: storePickup.id,
            cancel_reason_id: reason.value,
        };
        setOpenCancel(false);
        window.backdropLoader(true);
        canceledShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('storepickup:The_shipment_has_been_canceled'),
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

    const storePickup = {
        id: storepickup.entity_id,
        shipmentNumber: storepickup.increment_id,
        orderNumber: storepickup.channel_order_increment_id,
        statusLabel: storepickup.status.label,
        statusValue: storepickup.status.value,
        allocation: storepickup.allocation_status,
        date: storepickup.channel_order_date,
        updated: storepickup.updated_at,
        awb: storepickup.all_track[0],
        email: storepickup.shipping_email,
        firstname: storepickup.shipping_address.firstname,
        lastname: storepickup.shipping_address.lastname,
        street: storepickup.shipping_address.street,
        city: storepickup.shipping_address.city,
        region: storepickup.shipping_address.region,
        postcode: storepickup.shipping_address.postcode,
        countryId: storepickup.shipping_address.country_id,
        countryName: storepickup.shipping_address.country_name,
        phone: storepickup.shipping_address.telephone,
        pickup: storepickup.pickup_info,
        order: transformArray(storepickup.order_item),
        total: storepickup.subtotal,
        history: storepickup.status_history,
        location: storepickup.location.loc_name,
    };

    const formikConfirm = useFormik({
        initialValues: {
            id: storepickup.entity_id,
        },
        onSubmit: (values) => {
            handleConfirm(values);
        },
    });

    const formikCantFullfill = useFormik({
        initialValues: {
            id: storepickup.entity_id,
        },
        onSubmit: (values) => {
            handleCantFulfill(values);
        },
    });

    const formikPicked = useFormik({
        initialValues: {
            id: storepickup.entity_id,
        },
        onSubmit: (values) => {
            handlePicked(values);
        },
    });

    const formikPacked = useFormik({
        initialValues: {
            id: storepickup.entity_id,
        },
        onSubmit: (values) => {
            handlePacked(values);
        },
    });

    const formikCanceled = useFormik({
        initialValues: {
            id: storepickup.entity_id,
            reason: '',
        },
        validationSchema: Yup.object().shape({
            reason: Yup.object().typeError(t('storepickup:This_is_a_Required_field')).required(t('storepickup:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handleCanceled(values);
        },
    });

    const formikPickedUp = useFormik({
        initialValues: {
            id: storepickup.entity_id,
            name: '',
            reference: '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('storepickup:This_is_a_Required_field')),
            reference: Yup.string().required(t('storepickup:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handlePickedUpShipment(values);
        },
    });

    const formikNotes = useFormik({
        initialValues: {
            id: storepickup.entity_id,
            notes: '',
        },
        validationSchema: Yup.object().shape({
            notes: Yup.string().required(t('storepickup:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handleSaveNotes(values);
        },
    });

    const contentProps = {
        storePickup,
        formikConfirm,
        formikCantFullfill,
        formikPicked,
        formikPacked,
        formikPickedUp,
        formikNotes,
        pickPackEnable,
        formikCanceled,
        allowReallocation,
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
        title: `${t('storepickup:Store_Pickup')} #${router.query?.id}`,
    };

    const { loading: loadingConfig, data: dataConfig } = gqlService.getStoreConfig({
        path: 'swiftoms_shipment/general/pick_and_pack',
    });

    const { loading, data, refetch } = gqlService.getShipmentById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclReallocationLoading, data: aclReallocationData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_order_reallocation',
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'shipment_pickup_dashboard',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading || loadingConfig || aclReallocationLoading);
    }, [loading, aclCheckLoading, loadingConfig, aclReallocationLoading]);

    if (loading || aclCheckLoading || loadingConfig || aclReallocationLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (!data) {
        window.toastMessage({
            open: true,
            text: t('storepickup:Data_not_found'),
            variant: 'error',
        });
        setTimeout(() => {
            router.push('/shipment/storepickup');
        }, 1000);
        return <Layout pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper
                allowReallocation={aclReallocationData.isAccessAllowed}
                pickPackEnable={dataConfig.getStoreConfig === '1'}
                data={data}
                t={t}
                {...props}
                refetch={refetch}
            />
        </Layout>
    );
};

export default Core;
