import Layout from '@layout';
import gqlService from '@modules/shipment/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const { Content, t } = props;

    const { data: optionsStatus, loading: loadingOptionStatus } = gqlService.getShipmentStatus();
    const [getShipmentList, { data, loading, error }] = gqlService.getShipmentList();
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
        acl_code: 'oms_lite_sales_shipment',
    });

    React.useEffect(() => {
        BackdropLoad(loadingOptionStatus || aclCheckLoading);
    }, [loadingOptionStatus, aclCheckLoading]);

    if (loadingOptionStatus || aclCheckLoading) {
        return <Layout />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        getShipmentList,
        confirmShipment,
        data,
        loading,
        optionsStatus: optionsStatus.getShipmentStatus,
        t,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
