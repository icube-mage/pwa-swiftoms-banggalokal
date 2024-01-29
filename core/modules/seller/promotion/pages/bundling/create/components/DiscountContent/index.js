/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';

import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import Button from '@common_button';
import TextField from '@common_textfield';

import { integerReg, thousandSeparator } from '@helper_regex';
import Row from '@sellermodules/promotion/pages/bundling/create/components/DiscountContent/Row';
import useStyles from '@sellermodules/promotion/pages/bundling/create/components/DiscountContent/style';

const DiscountContent = (props) => {
    const {
        t, formik, setOpenModal, setActiveStep, activeStep, checked, setChecked, field, setField, currency,
    } = props;
    const classes = useStyles();

    const [isCheckedAll, setCheckedAll] = useState(false);
    const parentCheckedLength = formik.values.bundle_options.reduce((result, item) => {
        if (item.isParent) {
            if (item.selectedVariant.some((variant) => checked.includes(variant.entity_id))) {
                result.push(item.entity_id);
            }
        } else if (checked.includes(item.entity_id)) {
            result.push(item.entity_id);
        }
        return result;
    }, []);

    const handleCheckedAll = (e) => {
        if (!e.target.checked) {
            setChecked([]);
        } else {
            const check = [];
            formik.values.bundle_options.forEach((item) => {
                check.push(item.entity_id);
                if (item.isParent) {
                    item.selectedVariant.forEach((variant) => { check.push(variant.entity_id); });
                }
            });
            setChecked(check);
        }
    };

    const handleChecked = (index, fixValue) => {
        if (fixValue === false) {
            setChecked((prev) => prev.filter((idx) => idx !== index));
        } else if (fixValue === true) {
            if (!checked.includes(index)) {
                setChecked([...checked, index]);
            }
        } else if (checked.includes(index)) {
            setChecked((prev) => prev.filter((idx) => idx !== index));
        } else {
            setChecked([...checked, index]);
        }
    };

    const applyChange = () => {
        const temp = [];
        const { package_price, discount } = field;
        let dv = '';
        let pv = '';
        formik.values.bundle_options?.forEach((item) => {
            if (checked.includes(item.entity_id) && !item.isParent) {
                if (discount) {
                    pv = Math.ceil((item.price * (100 - discount)) / 100);
                    temp.push({
                        ...item,
                        package_price: pv,
                        discount,
                    });
                }
                if (package_price) {
                    dv = Math.ceil(((Number(item.price) - Number(package_price)) / item.price) * 100);
                    temp.push({
                        ...item,
                        package_price,
                        discount: dv > 0 && dv < 100 ? dv : '',
                    });
                }
            } else if (item.isParent) {
                const parentIdx = temp.findIndex((tempItem) => tempItem.entity_id === item.entity_id);
                const itemToPush = parentIdx >= 0 ? temp[parentIdx] : { ...item };
                item.selectedVariant.forEach((variant) => {
                    if (checked.includes(variant.entity_id)) {
                        const childIdx = item.selectedVariant.findIndex((vr) => vr.entity_id === variant.entity_id);
                        if (discount) {
                            pv = Math.ceil((variant.price * (100 - discount)) / 100);
                            itemToPush.selectedVariant[childIdx] = {
                                ...itemToPush.selectedVariant[childIdx],
                                package_price: pv,
                                discount,
                            };
                            if (parentIdx >= 0) {
                                temp[parentIdx] = itemToPush;
                            }
                        }
                        if (package_price) {
                            dv = Math.ceil(((Number(variant.price) - Number(package_price)) / variant.price) * 100);
                            itemToPush.selectedVariant[childIdx] = {
                                ...itemToPush.selectedVariant[childIdx],
                                package_price,
                                discount: dv > 0 && dv < 100 ? dv : '',
                            };
                            if (parentIdx >= 0) {
                                temp[parentIdx] = itemToPush;
                            }
                        }
                    }
                });
                temp.push(itemToPush);
            } else {
                temp.push(item);
            }
        });
        formik.setFieldValue('bundle_options', temp);
        setField({
            package_price: '',
            discount: '',
        });
    };

    const handleDelete = (i) => {
        const temp = formik.values.bundle_options;
        let tempChecked = [...checked];
        tempChecked = tempChecked.filter((id) => id !== temp[i].entity_id);
        if (temp[i].isParent) {
            temp[i].selectedVariant.forEach((variant) => {
                tempChecked = tempChecked.filter((id) => id !== variant.entity_id);
            });
        }
        setChecked(tempChecked);
        temp.splice(i, 1);
        formik.setFieldValue('bundle_options', temp);
        if (!temp.length) {
            setActiveStep(0);
        }
    };

    const handleSubmit = () => {
        setChecked([]);
        setActiveStep(2);
    };

    const onChangeDiscount = (e, i, item, childIndex) => {
        const discount = e.target.value.replace(integerReg, '');
        const package_price = Math.ceil((item.price * (100 - e.target.value.replace(integerReg, '')))
            / 100);
        if (discount.length <= 2) {
            if (item.attributes?.length) {
                formik.setFieldValue(`bundle_options[${i}].selectedVariant[${childIndex}].discount`, discount);
            } else {
                formik.setFieldValue(`bundle_options[${i}].discount`, discount);
            }
            if (e.target.value.replace(integerReg, '')) {
                if (item.attributes?.length) {
                    formik.setFieldValue(`bundle_options[${i}].selectedVariant[${childIndex}].package_price`, package_price);
                } else {
                    formik.setFieldValue(`bundle_options[${i}].package_price`, package_price);
                }
            } else if (item.attributes?.length) {
                formik.setFieldValue(`bundle_options[${i}].selectedVariant[${childIndex}].package_price`, '');
            } else {
                formik.setFieldValue(`bundle_options[${i}].package_price`, '');
            }
        }
    };

    const onChangePrice = (e, i, item, childIndex) => {
        const val = e.target.value.replace(integerReg, '');
        const discount = Math.ceil(((Number(item.price) - Number(val)) / item.price) * 100);
        if (item.attributes?.length) {
            formik.setFieldValue(`bundle_options[${i}].selectedVariant[${childIndex}].package_price`, val);
        } else {
            formik.setFieldValue(`bundle_options[${i}].package_price`, val);
        }
        if (val && Number(val) !== 0 && Number(discount) > 0 && Number(discount) < 100
        ) {
            if (item.attributes?.length) {
                formik.setFieldValue(`bundle_options[${i}].selectedVariant[${childIndex}].discount`, Number(discount));
            } else {
                formik.setFieldValue(`bundle_options[${i}].discount`, Number(discount));
            }
        } else if (item.attributes?.length) {
            formik.setFieldValue(`bundle_options[${i}].selectedVariant[${childIndex}].discount`, '');
        } else {
            formik.setFieldValue(`bundle_options[${i}].discount`, '');
        }
    };

    const packagePrice = () => {
        let min = 0;
        let max = 0;
        formik.values.bundle_options.forEach((item) => {
            if (item.isParent) {
                const variant = [...item.selectedVariant].sort((a, b) => (a.package_price || a.price) - (b.package_price || b.price));
                min += Number(variant[0].package_price || variant[0].price);
                max += Number(variant[item.selectedVariant.length - 1].package_price || variant[item.selectedVariant.length - 1].price);
            } else {
                min += Number(item.package_price || item.price);
                max += Number(item.package_price || item.price);
            }
        });
        return [min, max];
    };

    const discountTotal = () => {
        let min = 0;
        let max = 0;
        formik.values.bundle_options.forEach((item) => {
            if (item.isParent) {
                const variant = [...item.selectedVariant]
                    .filter((vr) => !!vr.discount)
                    .sort((a, b) => (a.price - a.package_price) - (b.price - b.package_price));
                if (variant.length) {
                    min += Number(variant[0]?.price) - Number(variant[0]?.package_price);
                    max += Number(variant[variant.length - 1]?.price) - Number(variant[variant.length - 1]?.package_price || 0);
                }
            } else if (item.discount) {
                min += Number(item.price - item.package_price);
                max += Number(item.price - item.package_price);
            }
        });
        return [min, max];
    };

    const renderMinMax = (arr) => {
        const min = Math.min.apply(null, arr);
        const max = Math.max.apply(null, arr);
        if (max && min && min !== max) {
            return (
                <span>
                    {`${currency}${min.toString().replace(thousandSeparator, ',')}.00 - 
                    ${currency}${max.toString().replace(thousandSeparator, ',')}.00`}
                </span>
            );
        }
        return (
            <span>
                {`${currency}${(min || max).toString().replace(thousandSeparator, ',')}.00`}
            </span>
        );
    };

    const isDisabled = discountTotal().every((d) => !d)
        || formik.values.bundle_options.some((item) => (Number(item.package_price) > Number(item.price)))
        || formik.values.bundle_options.some((item) => (item.package_price === 0 || item.package_price === '0'))
        || formik.values.bundle_options.every((item) => (item.isParent
            ? item.selectedVariant.every((variant) => !variant.discount) : !item.discount))
        || formik.values.bundle_options.some((item) => item.selectedVariant
            .some((variant) => Number(variant.package_price) > Number(variant.price)))
        || formik.values.bundle_options.some((item) => item.selectedVariant
            .some((variant) => (variant.package_price === 0 || variant.package_price === '0')));

    useEffect(() => {
        if (formik.values.bundle_options.every(({ entity_id }) => checked.includes(entity_id))) {
            setCheckedAll(true);
        } else {
            setCheckedAll(false);
        }
    }, [checked, formik.values.bundle_options]);

    return (
        <>
            {activeStep === 1
                && (
                    <div className={clsx(classes.formFieldsGrid, classes.pb10Xs)}>
                        <InputLabel htmlFor="period" className={classes.label}>
                            {t('sellerpromotion:Set_Discount')}
                        </InputLabel>

                        <Grid container spacing={3} justifyContent="flex-end" alignItems="center">
                            <Grid item xs={12} sm={12} md>
                                <FormControlLabel
                                    control={(
                                        <Checkbox
                                            className={classes.checkbox}
                                            checked={isCheckedAll}
                                            onChange={handleCheckedAll}
                                        />
                                    )}
                                    label={`${parentCheckedLength.length} ${t('sellerpromotion:Product_Selected')}`}
                                    className={classes.controlLabel}
                                />
                            </Grid>
                            <Grid item xs={12} sm={5} md={3} className={!checked.length && classes.noPadding}>
                                <Collapse in={!!checked.length} timeout="auto" unmountOnExit>
                                    <TextField
                                        className={clsx(classes.textInput, 'adorn')}
                                        placeholder={field.price ? '' : t('sellerpromotion:Discount')}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment className={classes.adornment} position="start">
                                                    %
                                                </InputAdornment>
                                            ),
                                        }}
                                        value={field.discount}
                                        onChange={(e) => {
                                            const discount = e.target.value.replace(integerReg, '');
                                            if (discount.length <= 2) {
                                                setField((prev) => ({ ...prev, discount: e.target.value.replace(integerReg, '') }));
                                            }
                                        }}
                                        disabled={!!field.package_price}
                                    />
                                </Collapse>
                            </Grid>
                            <Grid item xs={12} sm={5} md={3} className={!checked.length && classes.noPadding}>
                                <Collapse in={!!checked.length} timeout="auto" unmountOnExit>
                                    <TextField
                                        className={clsx(classes.textInput, 'adorn')}
                                        placeholder={field.discount ? '' : t('sellerpromotion:Package_Price')}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment className={classes.adornment} position="start">
                                                    {currency}
                                                </InputAdornment>
                                            ),
                                        }}
                                        value={field.package_price}
                                        onChange={(e) => setField((prev) => ({ ...prev, package_price: e.target.value.replace(integerReg, '') }))}
                                        disabled={!!field.discount}
                                    />
                                </Collapse>
                            </Grid>
                            <Grid item xs={12} sm={2} md="auto" className={!checked.length && classes.noPadding}>
                                <Collapse in={!!checked.length} timeout="auto" unmountOnExit>
                                    <Button
                                        onClick={applyChange}
                                        className={clsx(classes.btn, !field.discount && !field.package_price && 'disabled')}
                                        disabled={!field.discount && !field.package_price}
                                    >
                                        {t('sellerpromotion:Apply')}
                                    </Button>
                                </Collapse>
                            </Grid>
                        </Grid>
                    </div>
                )}
            <div className={clsx(classes.formFieldsGrid)}>
                <InputLabel htmlFor="period" className={classes.label}>
                    {t('sellerpromotion:Product_List')}
                </InputLabel>
                <TableContainer className={classes.tableContainer}>
                    <Table>
                        <TableHead>
                            <TableRow className={clsx(classes.tr, 'head')}>
                                <TableCell className={classes.th} />
                                <TableCell className={clsx(classes.th, 'fix')}>{t('sellerpromotion:Product_Information')}</TableCell>
                                <TableCell className={classes.th}>{t('sellerpromotion:Normal_Price')}</TableCell>
                                <TableCell className={classes.th}>{t('sellerpromotion:Discount')}</TableCell>
                                <TableCell className={classes.th}>{t('sellerpromotion:Package_Price')}</TableCell>
                                {activeStep === 1
                                    && (
                                        <TableCell className={classes.th} />
                                    )}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {formik.values.bundle_options?.map((item, i) => (
                                <Row
                                    {...props}
                                    key={i}
                                    rowItem={item}
                                    rowIndex={i}
                                    handleChecked={handleChecked}
                                    handleDelete={handleDelete}
                                    onChangeDiscount={onChangeDiscount}
                                    onChangePrice={onChangePrice}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className={clsx(classes.formFieldsGrid)}>
                <div />
                <Grid container spacing={3} className={classes.totalDiv} alignItems="center">
                    <Grid item xs={12} sm={7}>
                        <div className={clsx(classes.flex, 'dark')}>
                            <div className={classes.totalText}>
                                <span className="title">{t('sellerpromotion:Total_Package_Price')}</span>
                                <br />
                                <span className="total">
                                    {renderMinMax(packagePrice())}
                                </span>
                            </div>
                            <div className="border" />
                            <div className={classes.totalText}>
                                <span className="title">{t('sellerpromotion:Total_Discount')}</span>
                                <br />
                                <span className="total">
                                    {renderMinMax(discountTotal())}
                                </span>
                            </div>
                        </div>
                    </Grid>
                    <Grid item container xs={12} sm={5} spacing={1}>
                        <Grid item xs={6}>
                            <Button
                                onClick={() => setOpenModal(true)}
                                className={clsx(classes.btn, 'outlined')}
                            >
                                {t('sellerpromotion:Change_Product')}
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            {activeStep === 1
                                ? (
                                    <Button
                                        onClick={() => (isDisabled ? null : handleSubmit())}
                                        className={clsx(classes.btn, isDisabled && 'disabled')}
                                        disabled={isDisabled}
                                    >
                                        {t('sellerpromotion:Submit')}
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => (setActiveStep(1))}
                                        className={clsx(classes.btn, isDisabled && 'disabled')}
                                        disabled={isDisabled}
                                    >
                                        {t('sellerpromotion:Set_Discount')}
                                    </Button>
                                )}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default DiscountContent;
