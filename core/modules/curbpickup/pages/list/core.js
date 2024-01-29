import Layout from '@layout';
import gqlService from '@modules/curbpickup/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const { Content, t } = props;

    const [getStoreShipmentList, { data, loading, error }] = gqlService.getStoreShipmentList();
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
    const [pickedupShipment] = gqlService.pickedupShipment({
        onCompleted: (res) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: res.pickedupShipment,
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
    const { data: optionsStatus, loading: loadingOptionStatus } = gqlService.getShipmentStatusByType();

    useEffect(() => {
        if (error) {
            window.toastMessage({
                open: true,
                text: error.message,
                variant: 'error',
            });
        }
    }, [error]);

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'shipment_curbside_pickup',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading || loadingOptionStatus);
    }, [aclCheckLoading, loadingOptionStatus]);

    if (aclCheckLoading || loadingOptionStatus) {
        return <Layout useBreadcrumbs={false} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        getStoreShipmentList,
        confirmShipment,
        packShipment,
        pickedupShipment,
        data,
        loading,
        optionsStatus: optionsStatus.getShipmentStatusByType,
        t,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
