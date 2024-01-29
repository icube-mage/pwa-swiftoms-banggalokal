import React from 'react';
import { useRouter } from 'next/router';
import Autocomplete from '@common_autocomplete';
import TextField from '@common_textfield';
import Button from '@common_button';
import TextInfo from '@common_textinfo';
import gqlService from '@sellermodules/storeintegration/services/graphql';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import formatDate from '@helper_date';
import useStyles from './style';

const StoreIntegrationContent = (props) => {
    const {
        t, data, reIntegrate, marketplace, modal, refetch, brandId,
    } = props;

    const classes = useStyles();
    const router = useRouter();

    const initialValues = () => {
        const init = [];
        const valid = [];
        const type = {
            string: {
                req: Yup.string().required(t('sellerstoreintegration:This_is_a_Required_field')),
                noReq: Yup.string(),
            },
            integer: {
                req: Yup.number().typeError(t('sellerstoreintegration:Value_must_be_a_number'))
                    .required(t('sellerstoreintegration:This_is_a_Required_field')),
                noReq: Yup.number(),
            },
        };

        // eslint-disable-next-line no-unused-expressions
        data?.credentials?.fields?.forEach((cred) => {
            if (cred.name === 'default_shipping_method') {
                if (cred.required) {
                    valid.push([cred.name, Yup.object().shape({
                        value: Yup.string().required(t('sellerstoreintegration:This_is_a_Required_field')),
                    }).typeError(t('sellerstoreintegration:This_is_a_Required_field'))
                        .required(t('sellerstoreintegration:This_is_a_Required_field'))]);
                } else {
                    valid.push([cred.name, Yup.object().shape({
                        value: Yup.string(),
                    }).typeError('')]);
                }
                return init.push([cred.name, []]);
            }
            valid.push([cred.name, type[cred.type][cred.required !== false ? 'req' : 'noReq']]);
            return init.push([cred.name, (cred.name === 'cutoff_date' ? formatDate((new Date()), 'YYYY-MM-DD') : '')]);
        });
        return {
            init: Object.fromEntries(init),
            valid: Object.fromEntries(valid),
        };
    };

    const formik = useFormik({
        initialValues: {
            ...initialValues().init,
        },
        validationSchema: Yup.object().shape({
            ...initialValues().valid,
        }),
        onSubmit: async (values) => {
            const fieldsGql = data?.credentials.fields;
            const credentials = {};
            fieldsGql.forEach((cred) => {
                const data_type = cred.type;
                let value = '';
                if (cred.name === 'default_shipping_method') {
                    value = values[cred.name]?.value || '';
                } else {
                    value = (data_type === 'integer' ? Number(values[cred.name]) : values[cred.name]) || '';
                }
                credentials[cred.name] = { data_type, value };
                credentials.type = { data_type: 'string', value: data.credentials.type };
            });

            window.backdropLoader(true);
            modal(false);

            if (brandId) {
                await reIntegrate({
                    variables: {
                        id: marketplace.id,
                        status: 'complete',
                        credentials: JSON.stringify(credentials),
                        brand_id: brandId,
                    },
                }).then((res) => {
                    window.backdropLoader(false);
                    if (res?.data?.integrateMarketplaceIntegrationRequest?.status) {
                        window.toastMessage({
                            open: true,
                            text: t('sellerstoreintegration:The_store_has_been_successfully_integrated'),
                            variant: 'success',
                        });
                        refetch();
                    } else {
                        modal(true);
                        throw new Error(t('sellerstoreintegration:Something_went_wrong_when_try_to_integrate_the_store'));
                    }
                }).catch((e) => {
                    modal(true);
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
            } else {
                window.toastMessage({
                    open: true,
                    text: t('sellerstoreintegration:Something_went_wrong_when_try_to_integrate_the_store'),
                    variant: 'error',
                });
            }
        },
    });

    const [getMarketplaceDefaultShippingMethods, getMarketplaceDefaultShippingMethodsRes] = gqlService.getMarketplaceDefaultShippingMethods();

    return (
        <>
            <div>
                {data?.credentials?.fields?.map((field) => (field.name === 'default_shipping_method' ? (
                    <div className={classes.gridFormContainer} key={field.name}>
                        <div className="label">
                            {field.description}
                            {field.required && <span className="required">*</span>}
                        </div>
                        <div className="form">
                            <Autocomplete
                                name={field.name}
                                variant="standard"
                                mode="lazy"
                                className={classes.textInput}
                                value={
                                    typeof formik.values.default_shipping_method === 'object'
                                        ? formik.values.default_shipping_method
                                        : [formik.values.default_shipping_method]
                                }
                                onChange={(e) => formik.setFieldValue('default_shipping_method', e)}
                                loading={getMarketplaceDefaultShippingMethodsRes.loading}
                                options={getMarketplaceDefaultShippingMethodsRes.data?.getMarketplaceDefaultShippingMethods || []}
                                getOptions={getMarketplaceDefaultShippingMethods}
                                getOptionsVariables={{
                                    variables: {
                                        marketplace_code: router.query.mp_code,
                                    },
                                }}
                                primaryKey="value"
                                labelKey="label"
                                error={!!(formik.touched.default_shipping_method && formik.errors.default_shipping_method)}
                                helperText={(formik.touched.default_shipping_method && formik.errors.default_shipping_method) || ''}
                            />
                            {!!field.tooltip && <TextInfo textHelp={field.tooltip} textHelpPlacement="top" size={16} />}
                        </div>
                    </div>
                ) : (
                    field.name !== 'cutoff_date' && (
                        <div className={classes.gridFormContainer} key={field.name}>
                            <div className="label">
                                {field.description}
                                {field.required && <span className="required"> *</span>}
                            </div>
                            <div className="form">
                                <TextField
                                    type={field.name === 'cutoff_date' ? 'date' : 'string'}
                                    multiple
                                    name={field.name}
                                    value={formik.values[field.name]}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={classes.textInput}
                                    variant="standard"
                                    error={
                                        field.name === 'cutoff_date'
                                            ? !!formik.errors[field.name]
                                            : !!(formik.touched[field.name] && formik.errors[field.name])
                                    }
                                    helperText={
                                        (field.name === 'cutoff_date'
                                            ? formik.errors[field.name]
                                            : formik.touched[field.name] && formik.errors[field.name]) || ''
                                    }
                                />
                                {!!field.tooltip && <TextInfo textHelp={field.tooltip} textHelpPlacement="top" size={16} />}
                            </div>
                        </div>
                    )
                )))}
                <Button classes={{ root: classes.buttonRoot }} onClick={formik.handleSubmit} fullWidth>
                    {t('sellerstoreintegration:Start_Integration')}
                </Button>
            </div>
        </>
    );
};

export default StoreIntegrationContent;
