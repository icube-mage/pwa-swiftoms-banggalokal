import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/warehouse/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;
    const router = useRouter();
    const [createWarehouse] = gqlService.createWarehouse();

    const handleSubmit = ({
        channel,
        marketplace,
        location,
    }) => {
        const variables = {
            channel_code: channel.channel_code,
            marketplace_warehouse_id: marketplace.id,
            loc_id: location.loc_id,
        };
        window.backdropLoader(true);
        createWarehouse({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('warehouse:New_Warehouse_has_been_saved'),
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
            channel: null,
            marketplace: '',
            location: null,
        },
        validationSchema: Yup.object().shape({
            channel: Yup.object().typeError(t('warehouse:This_is_a_Required_field')).required(t('warehouse:This_is_a_Required_field')),
            marketplace: Yup.object().typeError(t('warehouse:This_is_a_Required_field')).required(t('warehouse:This_is_a_Required_field')),
            location: Yup.object().typeError(t('warehouse:This_is_a_Required_field')).required(t('warehouse:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_marketplace_warehouse',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading);
    }, [aclCheckLoading]);

    if (aclCheckLoading) {
        return <Layout />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        formik,
        t,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
