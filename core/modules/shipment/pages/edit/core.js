import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/shipment/services/graphql';
import aclService from '@modules/theme/services/graphql';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';
import transformArray from '@helper_arraybundle';

const ContentWrapper = (props) => {
    const {
        data, Content, dataCompany, refetch, allowReallocation, t,
    } = props;

    const [companyId, setCompanyId] = React.useState();
    const [showModal, setShowModal] = React.useState(false);

    const shipment = data.getStoreShipmentById;
    const [confirmShipment] = gqlService.confirmShipment();
    const [getShipmentAvailableLocation, { data: dataLocation, loading: loadingLocation }] = gqlService.getShipmentAvailableLocation({
        variables: {
            shipment_id: shipment.entity_id,
            company_id: Number(companyId),
        },
        skip: !Number(companyId),
    });

    const [getShipmentAvailableLocationSku, { data: dataLocationSku, loading: loadingLocationSku }] = gqlService.getShipmentAvailableLocationSku();
    const [cantFulfillShipment] = gqlService.cantFulfillShipment();
    const [shipmentRellocation] = gqlService.shipmentRellocation();
    const [saveShipmentNotes] = gqlService.saveShipmentNotes();

    const handleConfirm = () => {
        const variables = {
            id: shipment.entity_id,
        };
        window.backdropLoader(true);
        confirmShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('allshipment:The_shipment_has_been_confirmed'),
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
            id: shipment.entity_id,
        };
        window.backdropLoader(true);
        cantFulfillShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('allshipment:The_shipment_status_has_been_updated'),
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

    const handleRellocation = ({ loc_code }) => {
        if (!allowReallocation) {
            window.toastMessage({
                open: true,
                text: t('allshipment:Access_Forbidden'),
                variant: 'error',
            });
            return;
        }
        const variables = {
            shipment_id: shipment.entity_id,
            loc_code,
        };
        window.backdropLoader(true);
        shipmentRellocation({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('allshipment:The_shipment_has_been_reallocated'),
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

    const handleCheckAvailabilty = async (sku) => {
        getShipmentAvailableLocationSku({
            variables: {
                shipment_id: shipment.entity_id,
                company_id: Number(companyId),
                sku,
            },
        });
        setShowModal(true);
    };

    const handleNotes = ({ notes }) => {
        const variables = {
            id: shipment.entity_id,
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
                    text: t('allshipment:Notes_has_been_saved'),
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

    const shipmentDetail = {
        id: shipment.entity_id,
        shipmentId: shipment.increment_id,
        location: shipment.location.loc_name,
        isPickup: shipment.is_pickup,
        orderDate: shipment.channel_order_date,
        lastUpdate: shipment.updated_at,
        channelOrderNumber: shipment.channel_order_increment_id,
        statusLabel: shipment.status.label,
        statusValue: shipment.status.value,
        email: shipment.email || shipment.shipping_email,
        shipping: shipment.shipping_address,
        pickup: shipment.pickup_info,
        orderItem: transformArray(shipment.order_item),
        shipMethod: shipment.channel_shipping_label || '-',
        tracking: shipment.all_track,
        statusHistory: shipment.status_history,
        allocation: shipment.allocation_status,
        shippingLabel: shipment.channel_shipping_label,
    };

    const formikConfirm = useFormik({
        initialValues: {
            id: shipment.entity_id,
        },
        onSubmit: (values) => {
            handleConfirm(values);
        },
    });

    const formikCantFullfill = useFormik({
        initialValues: {
            id: shipment.entity_id,
        },
        onSubmit: (values) => {
            handleCantFulfill(values);
        },
    });

    const formikRellocation = useFormik({
        initialValues: {
            shipment_id: shipment.entity_id,
            loc_code: '',
        },
        onSubmit: (values) => {
            handleRellocation(values);
        },
    });

    const formikNotes = useFormik({
        initialValues: {
            id: shipment.entity_id,
            notes: '',
        },
        validationSchema: Yup.object().shape({
            notes: Yup.string().required(t('allshipment:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handleNotes(values);
        },
    });

    const contentProps = {
        shipmentDetail,
        formikConfirm,
        formikCantFullfill,
        formikRellocation,
        formikNotes,
        dataCompany,
        getShipmentAvailableLocation,
        handleCheckAvailabilty,
        dataLocation,
        loadingLocation,
        companyId,
        setCompanyId,
        showModal,
        setShowModal,
        dataLocationSku,
        loadingLocationSku,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();

    const pageConfig = {
        title: `${t('allshipment:Detail_Shipment_')}${router.query?.id}`,
    };

    const { loading: loadingCompany, data: dataCompany } = gqlService.getShipmentAvailableCompany({
        shipment_id: router && router.query && Number(router.query.id),
    });

    const {
        loading, data, refetch, error,
    } = gqlService.getShipmentById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclReallocationLoading, data: aclReallocationData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_order_reallocation',
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_sales_shipment',
    });

    React.useEffect(() => {
        BackdropLoad(loading || loadingCompany || aclCheckLoading || aclReallocationLoading);
    }, [loading, loadingCompany, aclCheckLoading, aclReallocationLoading]);

    if (loading || loadingCompany || aclCheckLoading || aclReallocationLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('allshipment:Data_not_found');
        const redirect = '/sales/shipment';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper
                allowReallocation={aclReallocationData.isAccessAllowed}
                data={data}
                dataCompany={dataCompany}
                refetch={refetch}
                {...props}
            />
        </Layout>
    );
};

export default Core;
