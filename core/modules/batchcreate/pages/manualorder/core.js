/* eslint-disable no-use-before-define */
import Layout from '@layout';
import gqlService from '@modules/batchcreate/services/graphql';
import batchGqlService from '@modules/batchlist/services/graphql';
import aclService from '@modules/theme/services/graphql';
import Router from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const [getStoreShipmentList, { data, loading }] = gqlService.getStoreShipmentList();
    const [createPickByBatchManually] = gqlService.createPickByBatchManually();
    const [startPickByBatchPicklist] = batchGqlService.startPickByBatchPicklist();

    const startPicking = (shipmentId) => {
        const shipment_id = shipmentId.map((item) => item.entity_id);
        window.backdropLoader(true);
        createPickByBatchManually({
            variables: {
                type: 'shipment',
                shipment_id,
            },
        }).then((res) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('createpickbybatch:Batch_has_been_saved'),
                variant: 'success',
            });
            handleStartPickByBatch(res.data.createPickByBatch.pick_by_batch.picklist[0].entity_id);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const handleStartPickByBatch = (id) => {
        const variables = {
            id,
        };
        window.backdropLoader(true);
        startPickByBatchPicklist({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('createpickbybatch:PickList_in_Progress'),
                variant: 'success',
            });
            setTimeout(() => Router.push(`/pickpack/batchlist/edit/picklist/${id}`), 250);
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
        acl_code: 'pick_by_batch_create',
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
        title: t('createpickbybatch:Create_Pick_by_Batch__Manual_Order'),
    };

    return (
        <Layout pageConfig={pageConfig} useBreadcrumbs={false}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
