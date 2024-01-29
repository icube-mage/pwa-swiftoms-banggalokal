/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-tag-location */

import React from 'react';
import { useRouter } from 'node_modules/next/router';
import useStyles from '@modules/stockadjustment/pages/edit/components/style';
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
import ModalUpload from '@modules/stockadjustment/pages/edit/components/modalUpload';

const StockAdjustmentEdit = (props) => {
    const [getStoreLocationList, getStoreLocationListRes] = gqlLocation.getStoreLocationList();
    const [getSourceList, getSourceListRes] = gqlSource.getSourceList();
    const { initialValues, submitHandler, t } = props;
    const classes = useStyles();
    const router = useRouter();
    const [locID, setLocID] = React.useState(0);
    const [searchSku, setSearchSku] = React.useState('');
    const [searchLocation, setSearchLocation] = React.useState('');
    const [baseSkuOption, setBaseSkuOption] = React.useState([]);
    const [locationOption, setLocationOption] = React.useState([]);
    const [isDisabled] = React.useState(initialValues.status === 1);
    const firstRenderLocation = React.useRef(true);
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

                let filter = {};
                if (firstRenderLocation.current) {
                    filter = {
                        loc_name: {
                            eq: typeof initialValues.loc_code === 'object' ? initialValues.loc_code?.loc_name ?? null : initialValues.loc_code,
                        },
                    };
                } else {
                    filter = {};
                }

                if (firstRenderLocation.current || (searchLocation && isExist.length === 0)) {
                    getStoreLocationList({
                        variables: {
                            search: searchLocation,
                            pageSize: 20,
                            currentPage: 1,
                            filter,
                        },
                    });
                    firstRenderLocation.current = false;
                }

                return null;
            },
            firstRenderLocation.current ? 0 : 500,
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
                setLocID(getStoreLocationListRes.data.getStoreLocationList.items[0].loc_id);
                firstRenderSetLocation.current = false;
            }

            const ids = new Set(locationOption.map((d) => d.loc_code));
            setLocationOption([...locationOption, ...getStoreLocationListRes.data.getStoreLocationList.items.filter((d) => !ids.has(d.loc_code))]);
        }
    }, [getStoreLocationListRes.data]);

    const editSchemaValidaton = Yup.object().shape({
        loc_code: Yup.object().required(t('stockadjustment:This_is_a_Required_field')),
        reason: Yup.string().required(t('stockadjustment:This_is_a_Required_field')),
        status: Yup.mixed().notOneOf([1]),
        items: Yup.array()
            .of(
                Yup.object().shape({
                    sku: Yup.string().required(t('stockadjustment:This_is_a_Required_field')),
                }),
            )
            .min(1)
            .required(t('stockadjustment:This_is_a_Required_field')),
    });

    const [isModalUploadOpen, setIsModalUploadOpen] = React.useState(false);

    return (
        <>
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
            <h2 className={classes.titleTop}>
                {t('stockadjustment:Edit_Stock_Adjustment_')}
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
                                        <span className={[classes.label, classes.labelRequired].join(' ')}>{t('stockadjustment:Location')}</span>
                                    </div>
                                    <Autocomplete
                                        disabled={isDisabled}
                                        mode={locationOption.length > 1 ? 'default' : 'lazy'}
                                        className={classes.autocompleteRoot}
                                        value={values.loc_code}
                                        onChange={(e) => {
                                            setFieldValue('loc_code', e);
                                            setLocID(e?.loc_id);
                                            setFieldValue('items', []);
                                        }}
                                        loading={!firstRenderSetLocation.current && getStoreLocationListRes.loading}
                                        options={locationOption}
                                        getOptions={getStoreLocationList}
                                        getOptionsVariables={{
                                            variables: {
                                                search: searchLocation,
                                                pageSize: 20,
                                                currentPage: 1,
                                                filter: {},
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
                                                    locationId: locID?.toString() ?? null,
                                                    addProduct: push,
                                                    t,
                                                })}
                                                {values.items.length > 0 && (
                                                    <table className={classes.table}>
                                                        <thead className={classes.th}>
                                                            <tr className={classes.tr}>
                                                                <td className={classes.td}>{t('stockadjustment:SKU_Product')}</td>
                                                                <td className={classes.td}>{t('stockadjustment:Qty_Adjustment')}</td>
                                                                {!isDisabled
                                                                    && <td className={classes.td}>{t('stockadjustment:Action')}</td>}
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
                                                                                className={`${classes.autocomplete}`}
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
                                                                                                from: locID?.toString(),
                                                                                                to: locID?.toString(),
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
                                                                            disabled={isDisabled}
                                                                        />
                                                                    </td>
                                                                    {!isDisabled && (
                                                                        <td
                                                                            style={{ cursor: `${isDisabled && 'default'}` }}
                                                                            className={`${classes.td} ${classes.btnRemove} ${
                                                                                !isDisabled && 'link-button'
                                                                            } `}
                                                                            onClick={() => {
                                                                                if (values?.deleted_items) {
                                                                                    setFieldValue('deleted_items', [
                                                                                        ...values?.deleted_items,
                                                                                        values?.items?.[idx],
                                                                                    ]);
                                                                                } else {
                                                                                    setFieldValue('deleted_items', [values?.items?.[idx]]);
                                                                                }
                                                                                return !isDisabled && remove(idx);
                                                                            }}
                                                                            disabled={isDisabled}
                                                                        >
                                                                            {t('stockadjustment:Remove')}
                                                                        </td>
                                                                    )}
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                )}
                                                {!isDisabled && (
                                                    <div className={`${classes.formFieldButton} ${classes.formFieldButtonRight}`}>
                                                        <Button
                                                            style={{ marginRight: 10 }}
                                                            disabled={values.loc_code === null}
                                                            className={clsx(classes.btn, 'btn secondary')}
                                                            variant="contained"
                                                            onClick={() => setIsModalUploadOpen(true)}
                                                        >
                                                            {t('stockadjustment:Upload_Products')}
                                                        </Button>
                                                        <Button
                                                            style={{ marginLeft: 10 }}
                                                            disabled={values.loc_code === null}
                                                            className={clsx(classes.btn, 'btn secondary')}
                                                            variant="contained"
                                                            onClick={() => push({
                                                                sku: null,
                                                                entity_id: null,
                                                                stock_adjustment: 0,
                                                                stock_available: 0,
                                                            })}
                                                        >
                                                            {t('stockadjustment:Add_Product')}
                                                        </Button>
                                                    </div>
                                                )}
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
                                            disabled={isDisabled}
                                        />
                                        {errors?.reason && touched?.reason && (
                                            <p style={{ margin: 0, color: 'red', fontSize: 12 }}>{errors?.reason}</p>
                                        )}
                                    </div>
                                </div>

                                {!isDisabled && (
                                    <div className={`${classes.formFieldButton}`}>
                                        <Button
                                            disabled={isDisabled}
                                            type="button"
                                            onClick={() => {
                                                setFieldValue('is_apply', false);
                                                submitForm();
                                            }}
                                            className={clsx(classes.btn, 'btn secondary')}
                                            variant="contained"
                                        >
                                            {t('stockadjustment:Save_As_Draft')}
                                        </Button>
                                        <Button
                                            disabled={isDisabled}
                                            type="button"
                                            onClick={() => {
                                                setFieldValue('is_apply', true);
                                                submitForm();
                                            }}
                                            className={clsx(classes.btn, 'btn')}
                                            variant="contained"
                                        >
                                            {t('stockadjustment:Submit_And_Apply')}
                                        </Button>
                                    </div>
                                )}
                            </Form>
                        )}
                    </Formik>
                </div>
            </Paper>
        </>
    );
};

export default StockAdjustmentEdit;
