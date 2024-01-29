import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/shippingcompany/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;
    const router = useRouter();
    const [createShippingCompany] = gqlService.createShippingCompany();

    const handleSubmit = ({
        companyId,
        brand,
        shippingMethod,
        isActive,
    }) => {
        const variables = {
            company_id: Number(companyId),
            brand,
            shipping_method: shippingMethod,
            is_active: isActive.id,
        };
        window.backdropLoader(true);
        createShippingCompany({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('shippingcompany:New_shipping_company_has_been_saved'),
                variant: 'success',
            });
            setTimeout(() => router.push('/tada/shippingcompany'), 250);
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
            companyId: '',
            brand: '',
            shippingMethod: '',
            isActive: { id: 0, name: 'No' },
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

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_tada_shipping_company',
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
