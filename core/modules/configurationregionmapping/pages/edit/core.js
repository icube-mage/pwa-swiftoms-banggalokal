/* eslint-disable no-trailing-spaces */
import React from 'react';
import Layout from '@layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import gqlService from '@modules/configurationregionmapping/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        Content,
        data,
        options,
        t,
    } = props;
    const router = useRouter();

    const [saveChannelRegion] = gqlService.saveChannelRegion();

    const handleSubmit = (input) => {
        window.backdropLoader(true);
        saveChannelRegion({
            variables: { input },
        }).then(async () => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('regionmappingconfiguration:New_mapping_has_been_saved'),
                variant: 'success',
            });
            setTimeout(() => { router.push('/configurations/regionmapping'); }, 250);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const countrySelected = options.find((country) => (
        country?.available_regions?.find((region) => region.code === data.code)));

    const formik = useFormik({
        initialValues: {
            region_raw: data.region_raw,
            countries: countrySelected,
            region: countrySelected?.available_regions?.find((region) => region.code === data.code),
        },
        validationSchema: Yup.object().shape({
            region_raw: Yup.string().required(t('regionmappingconfiguration:This_is_a_Required_field')),
            region: Yup.object().typeError(t('regionmappingconfiguration:This_is_a_Required_field'))
                .required(t('regionmappingconfiguration:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            const valueToSubmit = {
                id: Number(data.id),
                region_raw: values.region_raw,
                code: values.region.code,
            };
            handleSubmit(valueToSubmit);
        },
    });

    const contentProps = {
        formik,
        options,
        t,
    };
    return (
        <Content {...contentProps} {...props} />
    );
};

const Core = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('regionmappingconfiguration:Edit_Region_Mapping'),
    };
    const router = useRouter();

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'configuration_region_mapping',
    });
    const { loading, data, error } = gqlService.getChannelRegionById({
        id: router && router.query && Number(router.query.id),
    });
    const { loading: loadingOptions, data: dataOptions } = gqlService.getCountries();

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading || loadingOptions);
    }, [loading, aclCheckLoading, loadingOptions]);

    if (loading || aclCheckLoading || loadingOptions) {
        return <Layout pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }
    
    if (!data || error) {
        const errMsg = error?.message ?? t('regionmappingconfiguration:Data_not_found');
        const redirect = router.query.tab_status ? `/order/${router.query.tab_status}` : '/order/allorder';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    const contentProps = {
        data: data.getChannelRegionById,
        options: dataOptions.countries,
        t,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
