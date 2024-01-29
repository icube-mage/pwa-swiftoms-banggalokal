import React from 'react';
import Layout from '@layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import gqlService from '@modules/configurationregionmapping/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const { Content, options, t } = props;
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

    const formik = useFormik({
        initialValues: {
            region_raw: '',
            countries: {
                full_name_english: 'Indonesia',
                id: 'ID',
            },
            region: null,
        },
        validationSchema: Yup.object().shape({
            region_raw: Yup.string().required(t('regionmappingconfiguration:This_is_a_Required_field')),
            region: Yup.object().typeError(t('regionmappingconfiguration:This_is_a_Required_field'))
                .required(t('regionmappingconfiguration:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            const valueToSubmit = {
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
        title: t('regionmappingconfiguration:Add_New_Region_Mapping'),
    };
    const router = useRouter();

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'configuration_region_mapping',
    });

    const { loading, data } = gqlService.getCountries();

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...props} options={data.countries} />
        </Layout>
    );
};

export default Core;
