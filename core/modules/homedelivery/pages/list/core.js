import Layout from '@layout';
import gqlService from '@modules/homedelivery/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';
import React from 'react';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;
    const router = useRouter();
    const [varExport, setVarExport] = React.useState({});
    const [varCourier, setVarCourier] = React.useState({});
    const [openTimeSlot, setOpenTimeSlot] = React.useState(false);
    const [doRefetch, setDoRefetch] = React.useState(null);

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'shipment_delivery_dashboard',
    });

    const { loading: loadingConfig, data: dataConfig } = aclService.getStoreConfig({
        path: 'swiftoms_shipment/general/pick_and_pack',
    });

    const { data: optionsStatus, loading: loadingOptionStatus } = gqlService.getShipmentStatusByType();
    const [getStoreShipmentList, { data, loading }] = gqlService.getStoreShipmentList();
    const [confirmShipment] = gqlService.confirmShipment({
        onCompleted: (res) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: res.confirmShipment,
                variant: 'success',
            });
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
    const [pickShipment] = gqlService.pickShipment({
        onCompleted: (res) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: res.pickShipment,
                variant: 'success',
            });
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
    const [packShipment] = gqlService.packShipment({
        onCompleted: (res) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: res.packShipment,
                variant: 'success',
            });
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
    const [bookCourier] = gqlService.bookCourier({
        onCompleted: (res) => {
            window.backdropLoader(false);
            setDoRefetch(true);
            window.toastMessage({
                open: true,
                text: res.bookCourier,
                variant: 'success',
            });
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
    const [exportStoreShipmentToCsv] = gqlService.exportStoreShipmentToCsv({
        onCompleted: (res) => {
            window.backdropLoader(false);
            router.push(res.exportStoreShipmentToCsv);
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
    const [getStoreConfig] = gqlService.getStoreConfig({
        onCompleted: (res) => {
            if (res?.getStoreConfig === '1') {
                window.backdropLoader(false);
                setOpenTimeSlot(true);
            } else {
                bookCourier({ variables: { id: varCourier?.variables?.id } });
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

    const handleCourierComplete = async (variables) => {
        setVarCourier(variables);
        await getStoreConfig({ variables: { path: 'carriers/shipperid/active' } });
    };

    const handleSubmitTimeSlot = (variables) => {
        setOpenTimeSlot(false);
        window.backdropLoader(true);
        bookCourier({
            variables,
        });
    };

    React.useEffect(() => {
        BackdropLoad(loadingOptionStatus || loadingConfig || aclCheckLoading);
    }, [loadingOptionStatus, loadingConfig, aclCheckLoading]);

    if (loadingOptionStatus || loadingConfig || aclCheckLoading) {
        return (
            <Layout useBreadcrumbs={false} />
        );
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
        return (
            <Layout useBreadcrumbs={false} />
        );
    }

    const contentProps = {
        getStoreShipmentList,
        confirmShipment,
        pickShipment,
        packShipment,
        bookCourier,
        data,
        loading,
        exportStoreShipmentToCsv,
        varExport,
        setVarExport,
        optionsStatus: optionsStatus.getShipmentStatusByType,
        dataConfig: dataConfig.getStoreConfig === '1',
        t,
        handleCourierComplete,
        openTimeSlot,
        setOpenTimeSlot,
        varCourier,
        doRefetch,
        setDoRefetch,
        handleSubmitTimeSlot,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
