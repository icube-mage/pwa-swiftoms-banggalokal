/* eslint-disable max-len */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/virtuallocationinventory/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const { data, Content, t } = props;
    const router = useRouter();
    const locationInventory = data.getVirtualLocationById;
    const [updateVirtualLocation] = gqlService.updateVirtualLocation();

    const handleSubmit = ({
        parentLocation, virtualLocation, percentage, priority,
    }) => {
        const variables = {
            id: locationInventory.vl_id,
            parent_location: parentLocation.loc_code,
            virtual_location: virtualLocation.loc_code,
            percentage: Number(percentage),
            priority: Number(priority),
        };
        window.backdropLoader(true);
        updateVirtualLocation({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('virtuallocationinventory:The_virtual_location_has_been_saved'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/cataloginventory/virtuallocationinventory'), 250);
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

    const formik = useFormik({
        initialValues: {
            parentLocation: {
                loc_code: locationInventory.parent_label.loc_code,
                loc_name: locationInventory.parent_label.label,
            },
            virtualLocation: {
                loc_code: locationInventory.virtual_label.loc_code,
                loc_name: locationInventory.virtual_label.label,
            },
            percentage: locationInventory.percentage,
            priority: locationInventory.priority,
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

    const contentProps = {
        formik,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();

    const pageConfig = {
        title: t('virtuallocationinventory:Edit_Virtual_Location_Mapping'),
    };

    const { loading, data, error } = gqlService.getVirtualLocationById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_virtual_location',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('virtuallocationinventory:Data_not_found');
        const redirect = '/cataloginventory/virtuallocationinventory';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
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
