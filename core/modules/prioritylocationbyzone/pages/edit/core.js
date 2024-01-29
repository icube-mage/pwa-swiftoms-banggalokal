/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import locationGqlService from '@modules/location/services/graphql';
import gqlService from '@modules/prioritylocationbyzone/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
        getZoneOptionsRes,
        t,
    } = props;
    const router = useRouter();
    const priorityZoneData = data.getPriorityZoneById;
    const [updatePriorityZone] = gqlService.updatePriorityZone();
    const [getCountry, getCountryRes] = locationGqlService.getCountry();
    const [firstRender, setFirstRender] = React.useState(true);

    React.useEffect(() => {
        if (priorityZoneData.country_id) {
            getCountry({
                variables: {
                    id: priorityZoneData.country_id,
                },
            });
        }
    }, []);

    React.useEffect(() => {
        if (firstRender && getCountryRes.data) {
            const currentRegion = getCountryRes.data?.country?.available_regions.find((e) => e.code === priorityZoneData.code);
            formik.setFieldValue('code', currentRegion);
            setFirstRender(false);
        }
    }, [getCountryRes.data]);

    const handleSubmit = ({
        country_id, code, zone,
    }) => {
        const variables = {
            id: priorityZoneData.id,
            country_id: country_id.id,
            code: code.code,
            zone: zone.value,
        };
        window.backdropLoader(true);
        updatePriorityZone({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('prioritylocationbyzone:The_Priority_Location_by_Zone_has_been_saved'),
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
            country_id: {
                id: priorityZoneData.country_id,
                full_name_english: priorityZoneData.country_name,
            },
            code: '',
            zone: getZoneOptionsRes.data?.getZoneOptions.find((e) => e.value === priorityZoneData.zone),
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

    const contentProps = {
        formik,
        getZoneOptionsRes,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const { loading, data, error } = gqlService.getPriorityZoneById({
        id: router && router.query && Number(router.query.id),
    });

    const [getZoneOptions, getZoneOptionsRes] = gqlService.getZoneOptions();
    React.useEffect(() => {
        getZoneOptions();
    }, []);

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'priority_location_by_zone',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading || getZoneOptionsRes.loading);
    }, [loading, aclCheckLoading, getZoneOptionsRes.loading]);

    if (loading || aclCheckLoading || getZoneOptionsRes.loading) {
        return <Layout />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('prioritylocationbyzone:Data_not_found');
        const redirect = '/oms/prioritylocationbyzone';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        data,
        getZoneOptionsRes,
        t,
    };

    return (
        <Layout>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
