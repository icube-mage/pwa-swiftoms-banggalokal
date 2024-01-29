/* eslint-disable no-use-before-define */
import React from 'react';
import Layout from '@layout';
// import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/wavelist/services/graphql';
import aclService from '@modules/theme/services/graphql';
import useStyles from '@modules/wavelist/pages/pickitem/components/style';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
        t,
    } = props;
    const item = data.getPickByWaveItemById.pick_by_wave_item;

    const itemProps = {
        id: item.entity_id,
        parentId: item.parent_id,
        name: item.name,
        sku: item.sku,
        location: item.bin_code,
        image: item.image_url,
        qty: item.qty_to_pick,
        slot: item.slot_no,
    };

    const contentProps = {
        itemProps,
        t,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const { loading, data } = gqlService.getPickByWaveItemById({
        item_id: router && router.query && Number(router.query.id),
    });
    const classes = useStyles();

    const pageConfig = {
        title: `${t('picklist:Pick_by_Wave_ID')} ${router.query?.id}`,
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
        return (
            <Layout pageConfig={pageConfig}>
                <div className={classes.loadingFetch}>
                    No records to display
                </div>
            </Layout>
        );
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
