/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Select from '@common_select';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Autocomplete from '@common_autocomplete';
import DropFile from '@common_dropfile';
import clsx from 'clsx';
import useStyles from '@modules/requestreturn/pages/return/components/style';
import gqlService from '@modules/requestreturn/services/graphql';

const RequestReturnEditContent = (props) => {
    const {
        queryOrder, formik, requestreturn, handleDropFile, checkedState, handleOnChange, dataReturnType, dataPackageCondition, dataReason,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const { from } = router.query;

    const convertToRupiah = (number) => {
        const currencyFractionDigits = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).resolvedOptions().maximumFractionDigits;

        const value = number.toLocaleString('id-ID', { maximumFractionDigits: currencyFractionDigits });

        return value;
    };

    const tampQty = (qty) => {
        const arrQty = [];
        for (let i = 1; i <= qty; i++) {
            arrQty.push({ value: i, label: i });
        }
        return arrQty;
    };

    const returnTypeOptions = (dataReturnType && dataReturnType.getStoreConfig && Object.values(JSON.parse(dataReturnType.getStoreConfig))) || [];
    const replacementTypeOptions = [
        { value: 'pickup', label: 'Pickup in Store' },
        { value: 'delivery', label: 'Home Delivery' },
    ];

    return (
        <div className={classes.body}>
            <Button
                className={classes.btnBack}
                onClick={() => (from ? router.push(from) : router.back())}
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
                New Return for Order #
                {queryOrder}
            </h2>
            <Paper className={classes.container}>
                <div className={clsx(classes.content, classes.gridOption)}>
                    <div>
                        <h5 className={clsx(classes.title, classes.labelRequired)}>Return Type</h5>
                        <Autocomplete
                            className={classes.autocompleteRootTop}
                            value={returnTypeOptions.find((option) => option.code === formik.values.return_type)}
                            onChange={(e) => formik.setFieldValue('return_type', e?.code || '')}
                            options={returnTypeOptions}
                            error={!!(formik.touched.return_type && formik.errors.return_type)}
                            helperText={(formik.touched.return_type && formik.errors.return_type) || 'Please Select'}
                            primaryKey="code"
                            labelKey="title"
                        />
                    </div>
                    {!!(formik.values.return_type === 'replacement') && (
                        <div>
                            <h5 className={clsx(classes.title, classes.labelRequired)}>Replacement Order Type</h5>
                            <Autocomplete
                                className={classes.autocompleteRootTop}
                                value={replacementTypeOptions.find((option) => option.value === formik.values.replacement_order_type)}
                                onChange={(e) => formik.setFieldValue('replacement_order_type', e?.value || '')}
                                options={replacementTypeOptions}
                                error={!!(formik.touched.replacement_order_type && formik.errors.replacement_order_type)}
                                helperText={(formik.touched.replacement_order_type && formik.errors.replacement_order_type) || 'Please Select'}
                                primaryKey="value"
                                labelKey="label"
                            />
                        </div>
                    )}
                </div>
                <div className={classes.content}>
                    <h5 className={classes.title}>Products To Return</h5>
                    <div style={{ padding: 10 }} className={formik.touched.items && formik.errors.items ? classes.errorDiv : ''}>
                        <table className={classes.table}>
                            <tbody>
                                <tr className={classes.tr}>
                                    <th className={classes.th} style={{ width: '3%' }}>
                                        {' '}
                                    </th>
                                    <th className={classes.th} style={{ width: '10%' }}>
                                        Image
                                    </th>
                                    <th className={classes.th} style={{ width: '30%' }}>
                                        Name
                                    </th>
                                    <th className={classes.th} style={{ width: '15%' }}>
                                        Price
                                    </th>
                                    <th className={clsx(classes.th)}>Actions</th>
                                </tr>
                                {requestreturn?.map(({
                                    entity_id, image_url, name, price, qty, is_allowed, is_return_period_expired, isParent, isChild,
                                }, eMap) => (
                                    <tr key={entity_id}>
                                        <td
                                            className={classes.td}
                                            style={{
                                                width: '3%', paddingTop: 20, textAlignLast: 'center', paddingLeft: isChild ? 40 : 0,
                                            }}
                                        >
                                            {is_allowed && is_return_period_expired ? (
                                                <input
                                                    checked={checkedState[eMap]}
                                                    onChange={() => (isParent ? null : handleOnChange(eMap))}
                                                    type="checkbox"
                                                    name={entity_id}
                                                    style={{ cursor: isParent ? 'unset' : 'pointer', width: 15, height: 15 }}
                                                    disabled={isParent}
                                                />
                                            ) : (
                                                <div />
                                            )}
                                        </td>
                                        <td className={classes.td} style={{ width: '10%', paddingLeft: isChild ? 40 : 0 }}>
                                            <div
                                                className={classes.imgThumbContainer}
                                                style={{
                                                    backgroundImage: `url("${image_url || '/assets/img/placeholder_image.jpg'}")`,
                                                }}
                                            />
                                        </td>
                                        <td className={classes.td} style={{ width: '30%', paddingLeft: isChild ? 40 : 0 }}>
                                            {name}
                                        </td>
                                        <td className={classes.td} style={{ width: '15%' }}>
                                            {convertToRupiah(price)}
                                        </td>
                                        {is_allowed && is_return_period_expired ? (
                                            <td className={clsx(classes.td)}>
                                                {checkedState[eMap] && (
                                                    <>
                                                        <span className={clsx(classes.spanLabel, classes.labelRequired2)}>
                                                            <strong>Quantity</strong>
                                                        </span>
                                                        <br />
                                                        <Select
                                                            name={`items[${eMap}].qty`}
                                                            value={formik.values.items[eMap]?.qty}
                                                            onChange={formik.handleChange}
                                                            dataOptions={tampQty(qty)}
                                                            error={!!(formik.touched.items?.[eMap]?.qty && formik.errors.items?.[eMap]?.qty)}
                                                            valueToMap="value"
                                                            labelToMap="label"
                                                        />
                                                        <br />
                                                        <span className={clsx(classes.spanLabel, classes.labelRequired2)}>
                                                            <strong>Package Condition</strong>
                                                        </span>
                                                        <Select
                                                            name={`items[${eMap}].package_condition`}
                                                            value={formik.values.items[eMap]?.package_condition}
                                                            onChange={formik.handleChange}
                                                            dataOptions={Object.values(JSON.parse(dataPackageCondition.getStoreConfig))}
                                                            error={
                                                                !!(
                                                                    formik.touched.items?.[eMap]?.package_condition
                                                                    && formik.errors.items?.[eMap]?.package_condition
                                                                )
                                                            }
                                                            valueToMap="code"
                                                            labelToMap="title"
                                                        />
                                                        <br />
                                                        <span className={clsx(classes.spanLabel, classes.labelRequired2)}>
                                                            <strong>Reason</strong>
                                                        </span>
                                                        <Select
                                                            name={`items[${eMap}].reason`}
                                                            value={formik.values.items[eMap]?.reason}
                                                            onChange={formik.handleChange}
                                                            dataOptions={Object.values(JSON.parse(dataReason.getStoreConfig))}
                                                            error={!!(formik.touched.items?.[eMap]?.reason && formik.errors.items?.[eMap]?.reason)}
                                                            valueToMap="code"
                                                            labelToMap="title"
                                                        />
                                                        <br />
                                                        {' '}
                                                        <br />
                                                        <DropFile
                                                            formatFile=".zip, .rar, .jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .xls, .xlsx"
                                                            error={formik.errors.binary && formik.touched.binary}
                                                            getBase64={(files) => handleDropFile(files, eMap)}
                                                        />
                                                        <span className={classes.spanInfo}>
                                                            The following file types are allowed: zip, rar, jpg, jpeg, png, gif, pdf, doc, docx, xls,
                                                            xlsx
                                                        </span>
                                                    </>
                                                )}
                                            </td>
                                        ) : (
                                            <td className={clsx(classes.td)}>
                                                {!is_allowed ? (
                                                    <span className={classes.spanInfo}>Rma request for this product is already created.</span>
                                                ) : (
                                                    !is_return_period_expired && (
                                                        <span className={classes.spanInfo}>
                                                            The return for this product can not be processed
                                                            <br />
                                                            The return period expired.
                                                        </span>
                                                    )
                                                )}
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {formik.touched.items && formik.errors.items && typeof formik.errors.items === 'string' ? (
                        <span className={classes.errors}>{formik.errors.items}</span>
                    ) : null}
                </div>
                <div className={classes.content}>
                    <h5 className={classes.title}>Messages</h5>
                    <TextField
                        className={clsx(classes.fieldRoot, 'fieldNotes')}
                        variant="outlined"
                        multiline
                        rows={4}
                        name="message"
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        error={!!(formik.touched.message && formik.errors.message)}
                        helperText={(formik.touched.message && formik.errors.message) || ''}
                    />
                    <div className={classes.formFieldButton}>
                        <Button className={classes.btn} type="submit" onClick={formik.handleSubmit} variant="contained">
                            Submit Request
                        </Button>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default RequestReturnEditContent;
