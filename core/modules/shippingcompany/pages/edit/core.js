import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { optionsIsActive } from '@modules/shippingcompany/helpers';
import gqlService from '@modules/shippingcompany/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const { data, Content, t } = props;
    const router = useRouter();
    const shippingCompany = data.getShippingCompanyById;
    const [updateShippingCompany] = gqlService.updateShippingCompany();

    const handleSubmit = ({
        companyId, brand, shippingMethod, isActive,
    }) => {
        const variables = {
            id: shippingCompany.id,
            company_id: Number(companyId),
            brand,
            shipping_method: shippingMethod,
            is_active: isActive.id,
        };
        window.backdropLoader(true);
        updateShippingCompany({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('shippingcompany:The_shipping_company_has_been_saved'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/tada/shippingcompany'), 250);
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
            username: shippingCompany.username || '',
            companyId: shippingCompany.company_id,
            brand: shippingCompany.brand,
            shippingMethod: shippingCompany.shipping_method,
            isActive: optionsIsActive.find((e) => e.id === shippingCompany.is_active),
        },
        validationSchema: Yup.object().shape({
            companyId: Yup.number().required(t('shippingcompany:This_is_a_Required_field')),
            brand: Yup.string().required(t('shippingcompany:This_is_a_Required_field')),
            shippingMethod: Yup.string().required(t('shippingcompany:This_is_a_Required_field')),
            isActive: Yup.object().typeError(t('shippingcompany:This_is_a_Required_field')).required(t('shippingcompany:This_is_a_Required_field')),
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
    const { loading, data, error } = gqlService.getShippingCompanyById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_tada_shipping_company',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('shippingcompany:Data_not_found');
        const redirect = '/tada/shippingcompany';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout>
            <ContentWrapper data={data} {...props} />
        </Layout>
    );
};

export default Core;
