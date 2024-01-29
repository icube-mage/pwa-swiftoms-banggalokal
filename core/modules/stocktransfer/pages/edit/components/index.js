/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-tag-location */

import React from 'react';
import { useRouter } from 'node_modules/next/router';
import useStyles from '@modules/stocktransfer/pages/edit/components/style';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import {
    Formik, Field, Form, FieldArray,
} from 'formik';
import Autocomplete from '@common_autocomplete';
import gqlLocation from '@modules/location/services/graphql';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import clsx from 'clsx';
import gqlSource from '@modules/source/services/graphql';
import * as Yup from 'yup';
import Head from 'next/head';

const StockTransferEdit = (props) => {
    const [getStoreLocationList, getStoreLocationListRes] = gqlLocation.getStoreLocationList();
    const [getSourceList, getSourceListRes] = gqlSource.getSourceList();
    const {
        initialValues, submitHandler, statusTransfer, t,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [locID, setLocID] = React.useState(0);
    const [searchSku, setSearchSku] = React.useState('');
    const [searchLocation, setSearchLocation] = React.useState('');
    const [locationOption, setLocationOption] = React.useState([]);
    const [baseSkuOption, setBaseSkuOption] = React.useState([]);
    const [focusedForm, setFocusedForm] = React.useState({});
    const firstRender = React.useRef(true);
    const firstRenderSetLocation = React.useRef(true);

    React.useEffect(() => {
        const onChangeTimeOut = setTimeout(() => {
            const isExist = searchSku && baseSkuOption.filter((elm) => elm?.sku?.toLowerCase().includes(searchSku?.toLowerCase()));
            if (searchSku && isExist.length === 0) {
                getSourceList({
                    variables: {
                        search: searchSku,
                        pageSize: 20,
                        currentPage: 1,
                        filter: {
                            loc_id: {
                                from: locID.toString(),
                                to: locID.toString(),
                            },
                        },
                    },
                });
            }

            return null;
        }, 500);

        return () => clearTimeout(onChangeTimeOut);
    }, [searchSku]);

    React.useEffect(() => {
        if (getSourceListRes && getSourceListRes.data && getSourceListRes.data.getSourceList && getSourceListRes.data.getSourceList.items) {
            const sku = new Set(baseSkuOption.map((d) => d.sku));
            setBaseSkuOption([...baseSkuOption, ...getSourceListRes.data.getSourceList.items.filter((d) => !sku.has(d.sku))]);
        }
    }, [getSourceListRes.data]);

    React.useEffect(() => {
        const onChangeTimeOut = setTimeout(
            () => {
                const isExist = searchLocation && locationOption.filter((elm) => elm?.loc_name?.toLowerCase().includes(searchLocation?.toLowerCase()));
                if (firstRender.current || (searchLocation && isExist.length === 0)) {
                    getStoreLocationList({
                        variables: {
                            search: searchLocation,
                            pageSize: 20,
                            currentPage: 1,
                        },
                    });
                    firstRender.current = false;
                }

                return null;
            },
            firstRender.current ? 0 : 500,
        );

        return () => clearTimeout(onChangeTimeOut);
    }, [searchLocation]);

    React.useEffect(() => {
        if (
            getStoreLocationListRes
            && getStoreLocationListRes.data
            && getStoreLocationListRes.data.getStoreLocationList
            && getStoreLocationListRes.data.getStoreLocationList.items
        ) {
            if (firstRenderSetLocation.current && getStoreLocationListRes.data.getStoreLocationList.items.length > 0) {
                const loc = getStoreLocationListRes.data.getStoreLocationList.items.filter(
                    (item) => item.loc_code === initialValues.source_location.loc_code,
                );
                setLocID(loc[0]?.loc_id);
                firstRenderSetLocation.current = false;
            }

            const ids = new Set(locationOption.map((d) => d.loc_code));
            setLocationOption([...locationOption, ...getStoreLocationListRes.data.getStoreLocationList.items.filter((d) => !ids.has(d.loc_code))]);
        }
    }, [getStoreLocationListRes.data]);

    const editSchemaValidaton = Yup.object().shape({
        source_location: Yup.object().typeError(t('stocktransfer:This_is_a_Required_field')).required(t('stocktransfer:This_is_a_Required_field')),
        target_location: Yup.object().typeError(t('stocktransfer:This_is_a_Required_field')).required(t('stocktransfer:This_is_a_Required_field')),
        reason: Yup.string().typeError(t('stocktransfer:This_is_a_Required_field')).required(t('stocktransfer:This_is_a_Required_field')),
        data: Yup.array()
            .of(
                Yup.object().shape({
                    sku: Yup.object().typeError(t('stocktransfer:This_is_a_Required_field')).required(t('stocktransfer:This_is_a_Required_field')),
                    transfer: Yup.number()
                        .min(1, t('stocktransfer:Minimum_value_is_min', { min: 1 }))
                        .test({
                            name: 'max',
                            exclusive: false,
                            params: {},
                            message: t('stocktransfer:qty_transfer_must_be_less_than_qty_available'),
                            test(value) {
                                // You can access the price field with `this.parent`.
                                // eslint-disable-next-line react/no-this-in-sfc
                                return value <= parseFloat(this.parent.qty);
                            },
                        })
                        .typeError(t('stocktransfer:This_is_a_Required_field'))
                        .required(t('stocktransfer:This_is_a_Required_field')),
                }),
            )
            .min(1, t('stocktransfer:Choose_at_least_min_key', { min: 1, key: t('stocktransfer:product') }))
            .required(t('stocktransfer:This_is_a_Required_field')),
    });

    return (
        <>
            <Head>
                <title>
                    {t('stocktransfer:Stock_Transfer_')}
                    {initialValues.increment_id}
                </title>
            </Head>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/cataloginventory/stocktransfer')}
                variant="contained"
                style={{ marginRight: 16 }}
            >
                <ChevronLeftIcon
                    style={{
                        fontSize: 30,
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            </Button>

            <h2 className={classes.titleTop}>
                {t('stocktransfer:Stock_Transfer_')}
                {initialValues.increment_id}
            </h2>

            <Paper className={classes.container}>
                <div className={classes.content}>
                    <Formik initialValues={initialValues} onSubmit={submitHandler} validationSchema={editSchemaValidaton}>
                        {({
                            values, setFieldValue, submitForm, errors, touched,
                        }) => (
                            <Form>
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={[classes.label, classes.labelRequired].join(' ')}>{t('stocktransfer:Source_Location')}</span>
                                    </div>
                                    <Autocomplete
                                        onFocus={() => setFocusedForm({ ...focusedForm, source_location: true })}
                                        onBlur={() => setFocusedForm({ ...focusedForm, source_location: false })}
                                        disabled={statusTransfer === 1}
                                        mode={locationOption.length > 0 ? 'default' : 'lazy'}
                                        value={values.source_location}
                                        className={classes.autocompleteRoot}
                                        onChange={(e) => {
                                            setFieldValue('source_location', e);
                                            setLocID(e?.loc_id ?? 0);
                                            setFieldValue('data', []);
                                            setFocusedForm({ ...focusedForm, source_location: false });
                                        }}
                                        defaultValue={{ loc_name: 'select', loc_code: 0 }}
                                        loading={focusedForm?.source_location && getStoreLocationListRes.loading}
                                        options={locationOption}
                                        getOptions={getStoreLocationList}
                                        getOptionsVariables={{
                                            variables: {
                                                search: searchLocation,
                                                pageSize: 20,
                                                currentPage: 1,
                                            },
                                        }}
                                        primaryKey="loc_code"
                                        labelKey="loc_name"
                                        onInputChange={(e) => setSearchLocation(e && e.target && e.target.value)}
                                        error={!!(touched.source_location && errors.source_location)}
                                        helperText={(touched.source_location && errors.source_location) || ''}
                                    />
                                </div>
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={[classes.label, classes.labelRequired].join(' ')}>{t('stocktransfer:Target_Location')}</span>
                                    </div>
                                    <Autocomplete
                                        onFocus={() => setFocusedForm({ ...focusedForm, target_location: true })}
                                        onBlur={() => setFocusedForm({ ...focusedForm, target_location: false })}
                                        mode={locationOption.length > 0 ? 'default' : 'lazy'}
                                        disabled={statusTransfer === 1}
                                        value={values.target_location}
                                        className={classes.autocompleteRoot}
                                        onChange={(e) => {
                                            setFieldValue('target_location', e);
                                            setFieldValue('data', []);
                                        }}
                                        defaultValue={{ loc_name: 'select', loc_code: 0 }}
                                        loading={focusedForm?.target_location && getStoreLocationListRes.loading}
                                        options={locationOption}
                                        getOptions={getStoreLocationList}
                                        getOptionsVariables={{
                                            variables: {
                                                search: searchLocation,
                                                pageSize: 20,
                                                currentPage: 1,
                                            },
                                        }}
                                        primaryKey="loc_code"
                                        labelKey="loc_name"
                                        onInputChange={(e) => setSearchLocation(e && e.target && e.target.value)}
                                        error={!!(touched.target_location && errors.target_location)}
                                        helperText={(touched.target_location && errors.target_location) || ''}
                                    />
                                </div>
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={[classes.label, classes.labelRequired].join(' ')}>{t('stocktransfer:Product')}</span>
                                    </div>
                                    {errors?.data && touched?.data && typeof errors?.data === 'string' && (
                                        <p style={{ margin: 0, color: 'red', fontSize: 12 }}>{errors?.data}</p>
                                    )}

                                    <FieldArray name="data">
                                        {({ remove, push }) => (
                                            <>
                                                {values.data.length > 0 && (
                                                    <table className={classes.table}>
                                                        <thead className={classes.th}>
                                                            <tr className={classes.tr}>
                                                                <td className={classes.td}>{t('stocktransfer:SKU_Product')}</td>
                                                                <td className={classes.td}>{t('stocktransfer:Qty_Available')}</td>
                                                                <td className={classes.td}>{t('stocktransfer:Qty_Transfer')}</td>
                                                                {statusTransfer === 0
                                                                    ? (
                                                                        <>
                                                                            <td className={classes.td}>{t('stocktransfer:Action')}</td>
                                                                        </>
                                                                    ) : ''}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {values.data.map((item, idx) => (
                                                                <tr key={idx}>
                                                                    <td className={classes.td}>
                                                                        {!item?.target_id ? (
                                                                            <Autocomplete
                                                                                name={`data.${idx}.sku`}
                                                                                mode={baseSkuOption.length > 0 ? 'default' : 'lazy'}
                                                                                className={classes.autocomplete}
                                                                                value={values.data[idx].sku}
                                                                                onChange={(e) => {
                                                                                    setFieldValue(`data.${idx}.qty`, e?.qty_total ?? 0);
                                                                                    setFieldValue(`data.${idx}.sku`, e);
                                                                                }}
                                                                                loading={!values.data[idx].sku && getSourceListRes.loading}
                                                                                options={baseSkuOption}
                                                                                getOptionsVariables={{
                                                                                    variables: {
                                                                                        search: searchSku,
                                                                                        pageSize: 20,
                                                                                        currentPage: 1,
                                                                                        filter: {
                                                                                            loc_id: {
                                                                                                from: locID.toString(),
                                                                                                to: locID.toString(),
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                }}
                                                                                getOptions={getSourceList}
                                                                                primaryKey="source_id"
                                                                                labelKey="sku"
                                                                                onInputChange={(e) => setSearchSku(e && e.target && e.target.value)}
                                                                                error={!!(errors?.data?.[idx]?.sku && touched?.data?.[idx]?.sku)}
                                                                                helperText={
                                                                                    (touched?.data?.[idx]?.sku && errors?.data?.[idx]?.sku) || ''
                                                                                }
                                                                            />
                                                                        ) : (
                                                                            item.sku.sku
                                                                        )}
                                                                    </td>
                                                                    <td className={classes.td}>{item.qty}</td>
                                                                    <td className={classes.td}>
                                                                        <Field
                                                                            max={values.data[idx].qty}
                                                                            className={classes.fieldQty}
                                                                            name={`data.${idx}.transfer`}
                                                                            type="number"
                                                                            style={{
                                                                                borderColor: `${errors?.data?.[idx]?.transfer && touched?.data?.[idx]?.transfer
                                                                                        ? 'red'
                                                                                        : 'none'
                                                                                    }`,
                                                                            }}
                                                                            disabled={statusTransfer === 1}
                                                                        />
                                                                        {errors?.data?.[idx]?.transfer && touched?.data?.[idx]?.transfer && (
                                                                            <p style={{ margin: 0, color: 'red', fontSize: 12 }}>
                                                                                {errors?.data?.[idx]?.transfer}
                                                                            </p>
                                                                        )}
                                                                    </td>
                                                                    {statusTransfer === 0
                                                                        ? (
                                                                            <>
                                                                                <td className={`${classes.td} ${classes.btnRemove} link-button`}>
                                                                                    <img
                                                                                        src="/assets/img/trash.svg"
                                                                                        alt="delete"
                                                                                        style={{
                                                                                            height: 15, width: 'auto', cursor: 'pointer',
                                                                                        }}
                                                                                        onClick={() => remove(idx)}
                                                                                    />
                                                                                </td>
                                                                            </>
                                                                        ) : ''}
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                )}
                                                {statusTransfer === 0
                                                    ? (
                                                        <>
                                                            <div className={`${classes.formFieldButton} ${classes.formFieldButtonRight}`}>
                                                                <Button
                                                                    disabled={values.source_location === null}
                                                                    className={classes.btn}
                                                                    variant="contained"
                                                                    onClick={() => push({
                                                                        sku: null,
                                                                        qty: 0,
                                                                        transfer: 0,
                                                                    })}
                                                                >
                                                                    {t('stocktransfer:Add_Product')}
                                                                </Button>
                                                            </div>
                                                        </>
                                                    ) : ''}
                                            </>
                                        )}
                                    </FieldArray>
                                </div>

                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={[classes.label, classes.labelRequired].join(' ')}>{t('stocktransfer:Reason')}</span>
                                    </div>
                                    <div style={{ widht: '100%' }}>
                                        <TextareaAutosize
                                            minRows={4}
                                            disabled={statusTransfer === 1}
                                            style={{
                                                width: '100%',
                                                padding: '5px',
                                                borderColor: `${errors?.reason && touched?.reason ? 'red' : 'black'}`,
                                            }}
                                            value={values.reason}
                                            onChange={(e) => setFieldValue('reason', e.target.value)}
                                        />
                                        {errors?.reason && touched?.reason && (
                                            <p style={{ margin: 0, color: 'red', fontSize: 12 }}>{errors?.reason}</p>
                                        )}
                                    </div>
                                </div>

                                {statusTransfer === 0
                                    ? (
                                        <>
                                            <div className={classes.formFieldButton}>
                                                <Button
                                                    type="button"
                                                    buttonType="outlined"
                                                    onClick={() => {
                                                        setFieldValue('apply', false);
                                                        submitForm();
                                                    }}
                                                    className={classes.btn}
                                                    variant="contained"
                                                >
                                                    {t('stocktransfer:Save_As_Draft')}
                                                </Button>
                                                <Button
                                                    type="button"
                                                    buttonType="outlined"
                                                    onClick={() => {
                                                        setFieldValue('apply', true);
                                                        submitForm();
                                                    }}
                                                    className={clsx(classes.btnSecondary)}
                                                    variant="contained"
                                                >
                                                    {t('stocktransfer:Submit_And_Apply')}
                                                </Button>
                                            </div>
                                        </>
                                    )
                                    : ''}
                            </Form>
                        )}
                    </Formik>
                </div>
            </Paper>
        </>
    );
};

export default StockTransferEdit;
