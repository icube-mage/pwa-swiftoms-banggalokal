/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/batchpack/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;
    const router = useRouter();

    const batch_id = router && router.query && Number(router.query.batch);
    const shipment_id = router && router.query && Number(router.query.shipment);

    const pageConfig = {
        title: `${t('packlist:Pack_by_Batch_ID')} ${shipment_id} - ${t('packlist:Scan_Batch')} ${router.query?.batch}`,
    };

    const { loading: loadingPackList, data: dataPack } = gqlService.getPickByBatchById({
        id: batch_id,
    });

    const { loading: loadingConfigCamera, data: dataConfigCamera } = gqlService.getStoreConfig({
        path: 'swiftoms_pickpack/batch/use_camera_to_scan',
    });

    const [updatePickByBatchQtyPacked, { data, loading }] = gqlService.updatePickByBatchQtyPacked({
        onCompleted: () => {
            window.toastMessage({
                open: true,
                text: t('packlist:Scanned_successfully'),
                variant: 'success',
            });
        },
        onError: (e) => {
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        },
    });

    const handleDetect = (barcode) => {
        if (barcode) {
            updatePickByBatchQtyPacked({
                variables: {
                    batch_id,
                    shipment_id,
                    barcode,
                },
            });
        }
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'pick_by_batch_packlist',
    });

    React.useEffect(() => {
        BackdropLoad(loadingConfigCamera || aclCheckLoading || loadingPackList);
    }, [loadingConfigCamera, aclCheckLoading, loadingPackList]);

    if (typeof window === 'undefined' || loadingConfigCamera || aclCheckLoading) {
        return (
            <Layout pageConfig={pageConfig} useBreadcrumbs={false} />

        );
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        data,
        loading,
        handleDetect,
        shipment_id,
        useCamera: dataConfigCamera.getStoreConfig === '1',
        t,
        dataPack: dataPack?.getPickByBatchById?.pick_by_batch,
    };

    return (
        <Layout pageConfig={pageConfig} useBreadcrumbs={false}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
