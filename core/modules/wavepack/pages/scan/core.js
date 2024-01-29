/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/wavepack/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;
    const router = useRouter();
    const pageConfig = {
        title: `${t('packlist:Pick_by_Wave__Scan_ID')} ${router.query?.shipment}`,
    };
    const wave_id = router && router.query && Number(router.query.wave);
    const shipment_id = router && router.query && Number(router.query.shipment);

    const { loading: loadingPack, data: dataPack } = gqlService.getPickByWaveById({
        id: wave_id,
    });
    const { loading: loadingConfigCamera, data: dataConfigCamera } = gqlService.getStoreConfig({
        path: 'swiftoms_pickpack/wave/use_camera_to_scan',
    });
    const [updatePickByWaveQtyPacked, { data, loading }] = gqlService.updatePickByWaveQtyPacked({
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
            updatePickByWaveQtyPacked({
                variables: {
                    wave_id,
                    shipment_id,
                    barcode,
                },
            });
        }
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'pick_by_wave_packlist',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading || loadingPack);
    }, [loading, aclCheckLoading, loadingPack]);

    if (typeof window === 'undefined' || loadingConfigCamera || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
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
        dataPack: dataPack?.getPickByWaveById?.pick_by_wave,
    };

    return (
        <Layout pageConfig={pageConfig} useBreadcrumbs={false}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
