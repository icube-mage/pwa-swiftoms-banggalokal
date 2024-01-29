import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/locationpickup/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { optionsActive } from '@modules/locationpickup/helpers';
import BackdropLoad from '@helper_backdropload';
import { regexPhoneDial } from '@helper_regex';

const ContentWrapper = (props) => {
    const { Content, t } = props;
    const router = useRouter();
    const [saveLocationPickup] = gqlService.saveLocationPickup();

    const [dialCode, setDialCode] = React.useState('62');
    const useRegexPhone = regexPhoneDial(dialCode);

    const handleSubmit = async (values) => {
        const variables = { ...values, loc_id: values.loc.loc_id, status: values.status.name };
        delete variables.loc;
        window.backdropLoader(true);
        try {
            await saveLocationPickup({
                variables: {
                    input: variables,
                },
            });
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('locationpickup:The_Location_Pickup_has_been_saved'),
                variant: 'success',
            });
            setTimeout(() => router.push('/oms/locationpickup'), 250);
        } catch (error) {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: error.message,
                variant: 'error',
            });
        }
    };

    const formik = useFormik({
        initialValues: {
            loc: null,
            pickup_charge: '',
            pickup_description: '',
            pickup_fulfillment_time: '',
            pickup_name: '',
            pickup_phone: '',
            pickup_type: '',
            rtp_email_template: '',
            status: optionsActive[1],
        },
        validationSchema: Yup.object().shape({
            loc: Yup.object().typeError(t('locationpickup:This_is_a_Required_field')).required(t('locationpickup:This_is_a_Required_field')),
            pickup_name: Yup.string().required(t('locationpickup:This_is_a_Required_field')),
            status: Yup.object().typeError(t('locationpickup:This_is_a_Required_field')).required(t('locationpickup:This_is_a_Required_field')),
            pickup_phone: Yup.string().nullable().matches(useRegexPhone, t('common:Invalid_phone_number_format')),
        }),
        onSubmit: async (values) => {
            await handleSubmit(values);
        },
    });

    const contentProps = {
        formik,
        t,
        setDialCode,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_location_pickup',
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
        t,
    };

    return (
        <Layout>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
