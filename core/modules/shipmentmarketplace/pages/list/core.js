import Layout from '@layout';
import gqlService from '@modules/shipmentmarketplace/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const { Content, t } = props;
    const router = useRouter();
    const [varExport, setVarExport] = React.useState({});

    const { loading: loadingConfig, data: dataConfig } = gqlService.getStoreConfig({
        path: 'swiftoms_shipment/general/pick_and_pack',
    });
    const { data: optionsStatus, loading: loadingOptionStatus } = gqlService.getShipmentStatusByType();
    const [getStoreShipmentList, { data, loading, error }] = gqlService.getStoreShipmentList();
    useEffect(() => {
        if (error) {
            window.toastMessage({
                open: true,
                text: error.message,
                variant: 'error',
            });
        }
    }, [error]);
    const [confirmMarketplaceShipment] = gqlService.confirmMarketplaceShipment({
        onCompleted: (res) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: res.confirmMarketplaceShipment,
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
    const [getExportStatusHistory] = gqlService.getExportStatusHistory({
        onCompleted: (res) => {
            router.push(res.getExportStatusHistory);
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
    const [exportStoreShipmentToCsv] = gqlService.exportStoreShipmentToCsv({
        onCompleted: (res) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('shipmentmarketplace:The_Shipment_have_been_exported'),
                variant: 'success',
            });
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

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'shipment_marketplace_dashboard',
    });

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
    }

    const contentProps = {
        getStoreShipmentList,
        confirmMarketplaceShipment,
        getExportStatusHistory,
        pickShipment,
        packShipment,
        data,
        loading,
        exportStoreShipmentToCsv,
        setVarExport,
        varExport,
        optionsStatus: optionsStatus.getShipmentStatusByType,
        dataConfig: dataConfig.getStoreConfig === '1',
        t,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
