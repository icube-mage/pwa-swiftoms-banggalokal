import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/warehouse/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
        t,
    } = props;
    const router = useRouter();
    const warehouse = data.getWarehouseById;
    const [updateWarehouse] = gqlService.updateWarehouse();

    const handleSubmit = ({
        channel,
        marketplace,
        location,
    }) => {
        const variables = {
            id: warehouse.id,
            channel_code: channel.channel_code,
            marketplace_warehouse_id: marketplace,
            loc_id: location.loc_id,
        };
        window.backdropLoader(true);
        updateWarehouse({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('warehouse:Warehouse_has_been_saved'),
                variant: 'success',
            });
            setTimeout(() => router.push('/marketplace/warehouse'), 250);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const formik = useFormik({
        initialValues: {
            channel: {
                channel_id: warehouse.channel_code.channel_id,
                channel_code: warehouse.channel_code.channel_code,
                channel_name: warehouse.channel_code.channel_name,
            },
            marketplace: warehouse.marketplace_warehouse_id,
            location: {
                loc_id: warehouse.loc_id.loc_id,
                loc_code: warehouse.loc_id.loc_code,
                loc_name: warehouse.loc_id.loc_name,
            },
        },
        validationSchema: Yup.object().shape({
            channel: Yup.object().typeError(t('warehouse:This_is_a_Required_field')).required(t('warehouse:This_is_a_Required_field')),
            marketplace: Yup.string().typeError(t('warehouse:This_is_a_Required_field')).required(t('warehouse:This_is_a_Required_field')),
            location: Yup.object().typeError(t('warehouse:This_is_a_Required_field')).required(t('warehouse:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const contentProps = {
        formik,
        t,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const { loading, data } = gqlService.getWarehouseById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_marketplace_warehouse',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout />;
    }

    if (!data) {
        return (
            <Layout>{t('warehouse:Data_not_found')}</Layout>
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
        <Layout>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
