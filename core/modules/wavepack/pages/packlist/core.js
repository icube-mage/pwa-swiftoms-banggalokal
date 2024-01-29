/* eslint-disable no-trailing-spaces */
/* eslint-disable no-use-before-define */
import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/wavepack/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const { data, Content, t } = props;
    const router = useRouter();
    const packlist = data.getPickByWavePacklist.pick_by_wave;
    const [startPickByWavePacking] = gqlService.startPickByWavePacking();

    const packList = {
        id: packlist.entity_id,
        increment_id: packlist.increment_id,
        statusLabel: packlist.status.label,
        statusValue: packlist.status.value,
        date: packlist.started_at,
        totalItems: packlist.total_items,
        totalShipments: packlist.total_shipments,
        picker: packlist.picked_by,
        shipmentId: packlist.shipment_inc_id,
        slot: packlist.slot_no,
        items: packlist.packlist,
    };

    const handleClick = (id) => {
        if (packlist.status.value && packlist.status.value === 'pack_in_progress') {
            router.push(`/pickpack/wavepack/packlist/detail/${id}`);
        } else {
            window.backdropLoader(true);
            startPickByWavePacking({
                variables: {
                    id: packlist.entity_id,
                },
            })
                .then(() => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: t('packlist:Start_your_packing_process'),
                        variant: 'success',
                    });
                    router.push(`/pickpack/wavepack/packlist/detail/${id}`);
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
        }
    };
    const contentProps = {
        packList,
        handleClick,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const { loading, data, error } = gqlService.getPickByWavePacklist({
        id: router && router.query && Number(router.query.id),
    });

    const pageConfig = {
        title: `${t('packlist:Pack_by_Wave')} #${router.query?.id}`,
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'pick_by_wave_packlist',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('packlist:Data_not_found');
        const redirect = '/pickpack/wavelist';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }
    
    const contentProps = {
        data,
        t,
    };

    return (
        <Layout pageConfig={pageConfig} useBreadcrumbs={false}>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
