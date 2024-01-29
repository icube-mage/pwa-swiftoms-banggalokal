/* eslint-disable max-len */
import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@modules/source/services/graphql';
import Content from '@modules/source/pages/list/components/editModal/view';

const Core = (props) => {
    const {
        handleOpen, handleClose, t, source, refetch,
    } = props;
    const [updateSourceById] = gqlService.updateSourceById();

    const handleSubmit = (input, resetForm) => {
        handleClose();
        window.backdropLoader(true);
        updateSourceById({
            variables: { input },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('source:Stock_has_been_successfully_updated'),
                    variant: 'success',
                });
                resetForm();
                refetch();
            })
            .catch((e) => {
                window.backdropLoader(false);
                handleOpen();
                window.toastMessage({
                    open: true,
                    text: e.message || t('source:Something_went_wrong_while_trying_to_update_the_stock'),
                    variant: 'error',
                });
            });
    };

    const formik = useFormik({
        initialValues: { ...source },
        validationSchema: Yup.object().shape({
            qty_total: Yup.number().integer(t('source:Value_must_be_a_number')).typeError(t('source:Value_must_be_a_number')).required(t('common:required')),
            qty_buffer: Yup.number().integer(t('source:Value_must_be_a_number')).typeError(t('source:Value_must_be_a_number')).required(t('common:required')),
        }),
        onSubmit: (values, { resetForm }) => {
            const valuesToSubmit = {
                source_id: source.source_id,
                qty_total: Number(values.qty_total) || 0,
                qty_buffer: Number(values.qty_buffer) || 0,
            };
            handleSubmit(valuesToSubmit, resetForm);
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
