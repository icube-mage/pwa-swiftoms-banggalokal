import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@modules/configurationtaxrules/services/graphql';
import locationGqlService from '@modules/location/services/graphql';

import Content from '@modules/configurationtaxrules/pages/create/components/TaxRateModal/view';

const Core = (props) => {
    const {
        handleOpen, handleClose, data, refetch,
    } = props;
    const [createTaxRate] = gqlService.createTaxRate();
    const [updateTaxRate] = gqlService.updateTaxRate();
    const [getCountries, getCountriesRes] = locationGqlService.getCountries();
    const [getCountry, getCountryRes] = locationGqlService.getCountry();

    const handleSubmit = (input, resetForm) => {
        handleClose();
        window.backdropLoader(true);
        if (data && data.id) {
            updateTaxRate({
                variables: {
                    id: Number(data.id),
                    input,
                },
            })
                .then(() => {
                    window.backdropLoader(false);
                    resetForm();
                    refetch();
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
        } else {
            createTaxRate({
                variables: { input },
            })
                .then(() => {
                    window.backdropLoader(false);
                    resetForm();
                    refetch();
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
        }
    };

    const formik = useFormik({
        initialValues: {
            code: '',
            rate: 0,
            tax_country_id: '',
            tax_postcode: '*',
            tax_region_id: '0',
            zip_from: '',
            zip_to: '',
            zip_is_range: false,
        },
        validationSchema: Yup.object().shape({
            code: Yup.string().required('This field is required!'),
            rate: Yup.number().typeError('Value must be a number!').required('This field is required!'),
            tax_country_id: Yup.string().required('This field is required!'),
            tax_postcode: Yup.string().required('This field is required!'),
        }),
        onSubmit: (values, { resetForm }) => {
            const valueTosubmit = {
                ...values,
                rate: parseFloat(values.rate),
            };
            handleSubmit(valueTosubmit, resetForm);
        },
    });

    React.useEffect(() => {
        if (data && data.id) {
            formik.setFieldValue('code', data.code);
            formik.setFieldValue('rate', data.rate);
            formik.setFieldValue('tax_country_id', data.tax_country_id);
            formik.setFieldValue('tax_postcode', data.tax_postcode);
            formik.setFieldValue('tax_region_id', data.tax_region_id);
            formik.setFieldValue('zip_from', data.zip_from);
            formik.setFieldValue('zip_to', data.zip_to);
            formik.setFieldValue('zip_is_range', !!data.zip_is_range);
        } else {
            formik.resetForm();
        }
    }, [data]);

    React.useEffect(() => {
        getCountries();
        if ((data && data.tax_region_id) || formik.values.tax_country_id) {
            getCountry({
                variables: { id: data.tax_region_id || formik.values.tax_country_id },
            });
        }
    }, []);

    const contentProps = {
        formik,
        getCountriesRes,
        getCountryRes,
        getCountry,
        ...props,
    };

    return (
        <Content {...contentProps} />
    );
};

export default Core;
