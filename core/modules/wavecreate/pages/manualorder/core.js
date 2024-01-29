import Layout from '@layout';
import gqlService from '@modules/wavecreate/services/graphql';
import aclService from '@modules/theme/services/graphql';
import Router from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const [getStoreShipmentList, { data, loading }] = gqlService.getStoreShipmentList();
    const [createPickByWave] = gqlService.createPickByWave();

    const startPicking = (shipmentId) => {
        const shipment_id = shipmentId.map((item) => item.entity_id);
        window.backdropLoader(true);
        createPickByWave({
            variables: {
                is_auto: false,
                shipment_id,
            },
        })
            .then((res) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('createpickbywave:The_picking_process_has_been_started'),
                    variant: 'success',
                });
                setTimeout(() => Router.push(`/pickpack/wavelist/picklist/${res.data.createPickByWave.pick_by_wave.entity_id}`), 250);
            }).catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'pick_by_wave_create',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading);
    }, [aclCheckLoading]);

    if (aclCheckLoading) {
        return <Layout />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        Router.push('/');
    }
    const contentProps = {
        getStoreShipmentList,
        data,
        loading,
        startPicking,
        t,
    };

    const pageConfig = {
        title: t('createpickbywave:Create_Pick_by_Wave__Manual_Order'),
    };

    return (
        <Layout useBreadcrumbs={false} pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
