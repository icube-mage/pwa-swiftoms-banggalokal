/* eslint-disable max-len */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/prioritylocationbyzone/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const { Content, t } = props;
    const router = useRouter();
    const [createPriorityZone] = gqlService.createPriorityZone();

    const handleSubmit = ({
        code, zone, country_id,
    }) => {
        const variables = {
            country_id: country_id.id,
            code: code.code,
            zone: zone.value,
        };
        window.backdropLoader(true);
        createPriorityZone({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('prioritylocationbyzone:New_Priority_Zone_has_been_saved'),
                variant: 'success',
            });
            setTimeout(() => router.push('/oms/prioritylocationbyzone'), 250);
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
            code: '',
            zone: '',
            country_id: '',
        },
        validationSchema: Yup.object().shape({
            country_id: Yup.object().typeError(t('prioritylocationbyzone:This_is_a_Required_field')).required(t('prioritylocationbyzone:This_is_a_Required_field')),
            code: Yup.object().typeError(t('prioritylocationbyzone:This_is_a_Required_field')).required(t('prioritylocationbyzone:This_is_a_Required_field')),
            zone: Yup.object().typeError(t('prioritylocationbyzone:This_is_a_Required_field')).required(t('prioritylocationbyzone:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'priority_location_by_zone',
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
