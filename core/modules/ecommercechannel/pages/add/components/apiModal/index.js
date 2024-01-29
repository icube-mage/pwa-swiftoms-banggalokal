import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@modules/ecommercechannel/services/graphql';
import Content from '@modules/ecommercechannel/pages/add/components/apiModal/view';

const Core = (props) => {
    const {
        handleOpen, handleClose, t, start,
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
                        text: t('ecommercechannel:Api_key_has_been_successfully_registered'),
                        variant: 'success',
                    });
                    setTimeout(() => { start(); }, 100);
                } else {
                    throw new Error(t('ecommercechannel:Something_went_wrong_while_trying_register_marketplace_api_key'));
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
            client_name: Yup.string().required(t('ecommercechannel:This_is_a_Required_field')),
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
