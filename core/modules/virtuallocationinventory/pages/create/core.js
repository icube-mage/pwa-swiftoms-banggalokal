/* eslint-disable max-len */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/virtuallocationinventory/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;
    const router = useRouter();
    const pageConfig = {
        title: t('virtuallocationinventory:Map_Virtual_Location'),
    };

    const [createVirtualLocation] = gqlService.createVirtualLocation();

    const handleSubmit = ({
        parentLocation,
        virtualLocation,
        percentage,
        priority,
    }) => {
        const variables = {
            parent_location: parentLocation.loc_code,
            virtual_location: virtualLocation.loc_code,
            percentage: Number(percentage),
            priority: Number(priority),
        };
        window.backdropLoader(true);
        createVirtualLocation({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('virtuallocationinventory:The_virtual_location_mapping_has_been_saved'),
                variant: 'success',
            });
            setTimeout(() => router.push('/cataloginventory/virtuallocationinventory'), 250);
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
            parentLocation: null,
            virtualLocation: null,
            percentage: null,
            priority: null,
        },
        validationSchema: Yup.object().shape({
            parentLocation: Yup.object().typeError(t('virtuallocationinventory:This_is_a_Required_field')).required(t('virtuallocationinventory:This_is_a_Required_field')),
            virtualLocation: Yup.object().typeError(t('virtuallocationinventory:This_is_a_Required_field')).required(t('virtuallocationinventory:This_is_a_Required_field')),
            percentage: Yup.number().required(t('virtuallocationinventory:This_is_a_Required_field')),
            priority: Yup.number().required(t('virtuallocationinventory:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_virtual_location',
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
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
