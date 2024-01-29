import React from 'react';
import CreateAttribute from '@modules/productlist/plugins/modalvariant/view';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@modules/productlist/services/graphql';
import { useTranslation } from '@i18n';

const Core = (props) => {
    const { t } = useTranslation('productlist');
    const { setOpen, refetch } = props;
    const [createConfigurableAttributes, createConfigurableAttributesRes] = gqlService.createConfigurableAttributes();
    const [getInputTypeAttribute, getInputTypeAttributeRes] = gqlService.getInputTypeAttribute();
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = (values, resetForm) => {
        setLoading(true);
        const {
            attribute_code,
            frontend_input,
            frontend_label,
        } = values;
        const variables = {
            attribute_code,
            frontend_input: frontend_input.value,
            frontend_label,
        };
        createConfigurableAttributes({
            variables,
        }).then(() => {
            setLoading(false);
            window.toastMessage({
                open: true,
                text: t('productlist:New_attribute_Was_Saved'),
                variant: 'success',
            });
            setOpen(false);
            resetForm();
            refetch();
        }).catch((e) => {
            setLoading(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const formik = useFormik({
        initialValues: {
            attribute_code: '',
            frontend_input: '',
            frontend_label: '',

        },
        validationSchema: Yup.object().shape({
            attribute_code: Yup.string().required(t('productlist:This_is_a_Required_field')),
            frontend_input: Yup.string().required(t('productlist:This_is_a_Required_field')),
            frontend_label: Yup.string().required(t('productlist:This_is_a_Required_field')),
        }),
        onSubmit: (values, { resetForm }) => {
            handleSubmit(values, resetForm);
        },
    });

    const contentProps = {
        formik,
        getInputTypeAttribute,
        getInputTypeAttributeRes,
        createConfigurableAttributesRes,
        t,
        loading,
        ...props,
    };

    return (
        <>
            <CreateAttribute
                {...contentProps}
            />
        </>
    );
};

export default Core;
