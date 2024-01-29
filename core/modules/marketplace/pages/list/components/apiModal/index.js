import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@modules/marketplace/services/graphql';
import Content from '@modules/marketplace/pages/list/components/apiModal/view';

const Core = (props) => {
    const {
        handleOpen, handleClose, t,
    } = props;
    const [registerMpadapterClient] = gqlService.registerMpadapterClient();

    const handleSubmit = (input) => {
        handleClose();
        window.backdropLoader(true);
        registerMpadapterClient({
            variables: { input },
        })
            .then((res) => {
                window.backdropLoader(false);
                if (res?.data?.registerMpadapterClient) {
                    window.toastMessage({
                        open: true,
                        text: t('marketplace:Api_key_has_been_successfully_registered'),
                        variant: 'success',
                    });
                } else {
                    throw new Error(t('marketplace:Something_went_wrong_while_trying_register_marketplace_api_key'));
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
            client_name: null,
        },
        validationSchema: Yup.object().shape({
            client_name: Yup.string().required(t('marketplace:This_is_a_Required_field')),
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
