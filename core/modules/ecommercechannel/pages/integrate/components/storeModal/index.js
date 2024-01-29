import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@modules/ecommercechannel/services/graphql';
import Content from '@modules/ecommercechannel/pages/integrate/components/storeModal/view';

const Core = (props) => {
    const { handleOpen, handleClose, t } = props;
    const [registerMarketplaceBrand] = gqlService.registerMarketplaceBrand();

    const handleSubmit = (variables) => {
        handleClose();
        window.backdropLoader(true);
        registerMarketplaceBrand({
            variables,
        })
            .then((res) => {
                window.backdropLoader(false);
                if (res?.data?.registerMarketplaceBrand) {
                    window.toastMessage({
                        open: true,
                        text: t('ecommercechannel:New_Store_has_been_successfully_created'),
                        variant: 'success',
                    });
                } else {
                    throw new Error(t('ecommercechannel:Error_Something_is_wrong_when_create_webstore_channel'));
                }
            })
            .catch((e) => {
                window.backdropLoader(false);
                handleOpen();
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const formik = useFormik({
        initialValues: {
            brand_name: '',
            brand_id: '',
        },
        validationSchema: Yup.object().shape({
            brand_id: Yup.string().required(t('ecommercechannel:This_is_a_Required_field')),
            brand_name: Yup.string().required(t('ecommercechannel:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const contentProps = {
        formik,
        t,
        ...props,
    };

    return (
        <Content {...contentProps} />
    );
};

export default Core;
