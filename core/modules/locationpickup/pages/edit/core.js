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
    const { data, Content, t } = props;
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
            pickup_id: data.pickup_id ?? 0,
            loc: data.loc_id ? { loc_id: data.loc_id, loc_name: data.loc_name } : null,
            pickup_charge: data.pickup_charge ?? '',
            pickup_description: data.pickup_description ?? '',
            pickup_fulfillment_time: data.pickup_fulfillment_time ?? '',
            pickup_name: data.pickup_name ?? '',
            pickup_phone: data.pickup_phone ?? '',
            pickup_type: data.pickup_type ?? '',
            rtp_email_template: data.rtp_email_template ?? '',
            status: optionsActive.find((elm) => data.status === elm.name) ?? optionsActive[1],
        },
        validationSchema: Yup.object().shape({
            loc: Yup.object().typeError(t('locationpickup:This_is_a_Required_field')).required(t('locationpickup:This_is_a_Required_field')),
            pickup_name: Yup.string().required(t('locationpickup:This_is_a_Required_field')),
            status: Yup.object().typeError(t('locationpickup:This_is_a_Required_field')).required(t('locationpickup:This_is_a_Required_field')),
            pickup_phone: Yup.string().nullable().matches(useRegexPhone, t('locationpickup:Invalid_phone_number_format')),
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
    const { loading, data } = gqlService.getLocationPickupById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_location_pickup',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout />;
    }

    if (!data) {
        window.toastMessage({
            open: true,
            text: t('locationpickup:Data_not_found'),
            variant: 'error',
        });
        setTimeout(() => {
            router.push('/oms/locationpickup');
        }, 1000);
        return (
            <Layout>
                <div
                    style={{
                        display: 'flex',
                        color: '#435179',
                        fontWeight: 600,
                        justifyContent: 'center',
                        padding: '20px 0',
                    }}
                >
                    {t('locationpickup:Data_not_found')}
                </div>
            </Layout>
        );
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        data: data.getLocationPickupById,
        t,
    };

    return (
        <Layout>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
