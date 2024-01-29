/* eslint-disable no-trailing-spaces */
/* eslint-disable no-use-before-define */
import React from 'react';
import Layout from '@layout';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/wavelist/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const { data, Content, t } = props;

    const wavelist = data.getPickByWaveById.pick_by_wave;
    const router = useRouter();

    const waveList = {
        id: wavelist.entity_id,
        statusLabel: wavelist.status.label,
        statusValue: wavelist.status.value,
        date: wavelist.started_at,
        totalItems: wavelist.total_items,
        totalShipments: wavelist.total_shipments,
        picker: wavelist.picked_by,
        items: wavelist.items,
        itemsLeft: wavelist.total_items_left_to_pick,
        increment_id: wavelist.increment_id,
    };

    const [donePickByWave] = gqlService.donePickByWave();

    const handleDone = () => {
        const variables = {
            id: waveList.id,
        };
        window.backdropLoader(true);
        donePickByWave({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('picklist:Picklist_was_done'),
                    variant: 'success',
                });
                router.push('/pickpack/wavelist');
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const formikDone = useFormik({
        initialValues: {
            id: waveList.id,
        },
        onSubmit: (values) => {
            handleDone(values);
        },
    });

    const contentProps = {
        waveList,
        formikDone,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const { loading, data, error } = gqlService.getPickByWaveById({
        id: router && router.query && Number(router.query.id),
    });

    const pageConfig = {
        title: `${t('picklist:Pick_by_Wave')} #${router.query?.id}`,
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'pick_by_wave_list',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('picklist:Data_not_found');
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
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
