/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-tag-location */

import React from 'react';
import { useRouter } from 'node_modules/next/router';
import useStyles from '@modules/stockadjustment/pages/add/components/style';
import ModalUpload from '@modules/stockadjustment/pages/add/components/modalUpload';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import {
    Formik, Field, Form, FieldArray,
} from 'formik';
import Autocomplete from '@common_autocomplete';
import gqlLocation from '@modules/location/services/graphql';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import gqlSource from '@modules/source/services/graphql';
import * as Yup from 'yup';
import Head from 'next/head';

const StockAdjustmentAdd = (props) => {
    const [getStoreLocationList, getStoreLocationListRes] = gqlLocation.getStoreLocationList();
    const [getSourceList, getSourceListRes] = gqlSource.getSourceList();
    const { initialValues, submitHandler, t } = props;
    const classes = useStyles();
    const router = useRouter();
    const [locID, setLocID] = React.useState(0);
    const [searchSku, setSearchSku] = React.useState('');
    const [searchLocation, setSearchLocation] = React.useState('');
    const [locationOption, setLocationOption] = React.useState([]);
    const [baseSkuOption, setBaseSkuOption] = React.useState([]);

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
        const onChangeTimeOut = setTimeout(() => {
            const isExist = searchLocation && locationOption.filter((elm) => elm?.loc_name?.toLowerCase().includes(searchLocation?.toLowerCase()));
            if (searchLocation && isExist.length === 0) {
                getStoreLocationList({
                    variables: {
                        search: searchLocation,
                        pageSize: 20,
                        currentPage: 1,
                    },
                });
            }

            return null;
        }, 500);

        return () => clearTimeout(onChangeTimeOut);
    }, [searchLocation]);

    React.useEffect(() => {
        if (
            getStoreLocationListRes
            && getStoreLocationListRes.data
            && getStoreLocationListRes.data.getStoreLocationList
            && getStoreLocationListRes.data.getStoreLocationList.items
        ) {
            if (getStoreLocationListRes.data.getStoreLocationList.items.length > 0) {
                setLocID(getStoreLocationListRes.data.getStoreLocationList.items[0].loc_id);
            }
            const ids = new Set(locationOption.map((d) => d.loc_code));
            setLocationOption([...locationOption, ...getStoreLocationListRes.data.getStoreLocationList.items.filter((d) => !ids.has(d.loc_code))]);
        }
    }, [getStoreLocationListRes.data]);

    const addSchemaValidaton = Yup.object().shape({
        loc_code: Yup.object().required(t('stockadjustment:This_is_a_Required_field')),
        reason: Yup.string().required(t('stockadjustment:This_is_a_Required_field')),
        items: Yup.array()
            .of(
                Yup.object().shape({
                    sku: Yup.mixed().required(t('stockadjustment:This_is_a_Required_field')),
                }),
            )
            .min(1)
            .required(t('stockadjustment:This_is_a_Required_field')),
    });

    const [isModalUploadOpen, setIsModalUploadOpen] = React.useState(false);

    return (
        <>
            <Head>
                <title>{t('stockadjustment:Add_New_Stock_Adjustment')}</title>
            </Head>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/cataloginventory/stockadjustment')}
                variant="contained"
                style={{ marginRight: 10 }}
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

            <h2 className={classes.titleTop}>{t('stockadjustment:Add_New_Stock_Adjustment')}</h2>

            <Paper className={classes.container}>
                <div className={classes.content}>
                    <Formik initialValues={initialValues} onSubmit={submitHandler} validationSchema={addSchemaValidaton}>
                        {({
                            values, setFieldValue, submitForm, errors, touched,
                        }) => (
                            <Form>
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={[classes.label, classes.labelRequired].join(' ')}>{t('stockadjustment:Location')}</span>
                                    </div>
                                    <Autocomplete
                                        mode={locationOption.length > 0 ? 'default' : 'lazy'}
                                        value={values.loc_code}
                                        className={classes.autocompleteRoot}
                                        onChange={(e) => {
                                            setFieldValue('loc_code', e);
                                            setLocID(e?.loc_id ?? 0);
                                            setFieldValue('items', []);
                                        }}
                                        defaultValue={{ loc_name: 'select', loc_code: 0 }}
                                        loading={!values.loc_code?.loc_code && getStoreLocationListRes.loading}
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
                                        error={!!(touched.loc_code && errors.loc_code)}
                                        helperText={(touched.loc_code && errors.loc_code) || ''}
                                    />
                                </div>
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={[classes.label, classes.labelRequired].join(' ')}>{t('stockadjustment:Product')}</span>
                                    </div>
                                    {errors?.items && touched?.items && typeof errors?.items === 'string' && (
                                        <p style={{ margin: 0, color: 'red', fontSize: 12 }}>{errors?.items}</p>
                                    )}

                                    <FieldArray name="items">
                                        {({ remove, push }) => (
                                            <>
                                                {React.cloneElement(<ModalUpload />, {
                                                    open: isModalUploadOpen,
                                                    handleClose: () => setIsModalUploadOpen(false),
                                                    locationId:
                                                        typeof values.loc_code === 'object' ? values.loc_code?.loc_id ?? null : values.loc_code,
                                                    addProduct: push,
                                                    t,
                                                })}
                                                {values.items.length > 0 && (
                                                    <table className={classes.table}>
                                                        <thead className={classes.th}>
                                                            <tr className={classes.tr}>
                                                                <td className={classes.td}>{t('stockadjustment:SKU_Product')}</td>
                                                                <td className={classes.td}>{t('stockadjustment:Qty_Adjustment')}</td>
                                                                <td className={classes.td}>{t('stockadjustment:Action')}</td>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {values.items.map((item, idx) => (
                                                                <tr key={idx}>
                                                                    <td className={classes.td}>
                                                                        {!item?.entity_id && !item?.from_csv ? (
                                                                            <Autocomplete
                                                                                name={`items.${idx}.sku`}
                                                                                mode={baseSkuOption.length > 0 ? 'default' : 'lazy'}
                                                                                className={classes.autocomplete}
                                                                                value={values.items[idx].sku}
                                                                                onChange={(e) => {
                                                                                    setFieldValue(`items.${idx}.stock_available`, e?.qty_total ?? 0);
                                                                                    setFieldValue(`items.${idx}.sku`, e);
                                                                                }}
                                                                                loading={!values.items[idx].sku && getSourceListRes.loading}
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
                                                                                error={!!(errors?.items?.[idx]?.sku && touched?.items?.[idx]?.sku)}
                                                                                helperText={
                                                                                    (errors?.items?.[idx]?.sku && touched?.items?.[idx]?.sku) || ''
                                                                                }
                                                                            />
                                                                        ) : (
                                                                            item.sku
                                                                        )}
                                                                    </td>
                                                                    <td className={classes.td}>
                                                                        <Field
                                                                            className={classes.fieldQty}
                                                                            name={`items.${idx}.stock_adjustment`}
                                                                            type="number"
                                                                        />
                                                                    </td>
                                                                    <td
                                                                        className={`${classes.td} ${classes.btnRemove} link-button`}
                                                                        onClick={() => remove(idx)}
                                                                    >
                                                                        {t('stockadjustment:Remove')}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                )}
                                                <div className={`${classes.formFieldButton} ${classes.formFieldButtonRight}`}>
                                                    <Button
                                                        style={{ marginRight: 10 }}
                                                        disabled={values.loc_code === null}
                                                        variant="contained"
                                                        onClick={() => setIsModalUploadOpen(true)}
                                                        buttonType="outlined-rounded"
                                                    >
                                                        {t('stockadjustment:Upload_Products')}
                                                    </Button>
                                                    <Button
                                                        disabled={values.loc_code === null}
                                                        variant="contained"
                                                        onClick={() => push({
                                                            sku: null,
                                                            entity_id: null,
                                                            stock_adjustment: 0,
                                                            stock_available: 0,
                                                        })}
                                                        buttonType="outlined-rounded"
                                                    >
                                                        {t('stockadjustment:Add_Product')}
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </FieldArray>
                                </div>

                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={[classes.label, classes.labelRequired].join(' ')}>{t('stockadjustment:Reason')}</span>
                                    </div>
                                    <div style={{ widht: '100%' }}>
                                        <TextareaAutosize
                                            minRows={4}
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

                                <div className={`${classes.formFieldButton}`}>
                                    <Button
                                        style={{ marginRight: 10 }}
                                        type="button"
                                        onClick={() => {
                                            setFieldValue('is_apply', false);
                                            submitForm();
                                        }}
                                        variant="contained"
                                        buttonType="outlined-rounded"
                                    >
                                        {t('stockadjustment:Save_As_Draft')}
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            setFieldValue('is_apply', true);
                                            submitForm();
                                        }}
                                        variant="contained"
                                        buttonType="primary-rounded"
                                    >
                                        {t('stockadjustment:Submit_And_Apply')}
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Paper>
        </>
    );
};

export default StockAdjustmentAdd;
