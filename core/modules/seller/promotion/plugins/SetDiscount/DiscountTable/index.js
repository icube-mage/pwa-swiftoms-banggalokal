/* eslint-disable no-restricted-globals */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import { floatReg } from '@helper_regex';
import Row from '@sellermodules/promotion/plugins/SetDiscount/DiscountTable/Row';
import useStyles from '@sellermodules/promotion/plugins/SetDiscount/DiscountTable/style';

const DiscountTable = (props) => {
    const {
        t, formik, checked, setChecked,
    } = props;
    const classes = useStyles();

    const [isCheckedAll, setCheckedAll] = useState(false);
    const parentCheckedLength = formik.values.discount_options.reduce((result, item) => {
        if (item.isParent) {
            if (item.selected_variants.some((variant) => checked.includes(variant.entity_id))) {
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
            formik.values.discount_options.forEach((item) => {
                check.push(item.entity_id);
                if (item.isParent) {
                    item.selected_variants.forEach((variant) => { check.push(variant.entity_id); });
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

    const handleDelete = (i, iChild) => {
        let temp = [...formik.values.discount_options];
        let tempChecked = [...checked];

        tempChecked = tempChecked.filter((id) => id !== temp[i].entity_id);

        if (temp[i].isParent) {
            temp[i].selected_variants.forEach((variant) => {
                tempChecked = tempChecked.filter((id) => id !== variant.entity_id);
            });
        }

        if (temp[i].isParent && iChild >= 0) {
            const remainVariant = temp[i].selected_variants.filter((_, cind) => cind !== iChild);
            temp[i].selected_variants = remainVariant;
            if (!remainVariant.length) {
                temp = temp.filter((_, ind) => ind !== i);
            }
        } else {
            temp = temp.filter((_, ind) => ind !== i);
        }

        setChecked(tempChecked);
        formik.setFieldValue('discount_options', temp);
    };

    const onChangeDiscount = (e, i, item, childIndex) => {
        const discount = e.target.value.replace(floatReg, '');
        if (!isNaN(Number(discount))) {
            const discount_price = parseFloat((item.price * (100 - e.target.value.replace(floatReg, ''))) / 100).toFixed(2);
            if (discount < 100) {
                if (item.isChild) {
                    formik.setFieldValue(`discount_options[${i}].selected_variants[${childIndex}].discount`, discount);
                } else {
                    formik.setFieldValue(`discount_options[${i}].discount`, discount);
                }
                if (e.target.value.replace(floatReg, '')) {
                    if (item.isChild) {
                        formik.setFieldValue(`discount_options[${i}].selected_variants[${childIndex}].discount_price`, discount_price);
                    } else {
                        formik.setFieldValue(`discount_options[${i}].discount_price`, discount_price);
                    }
                } else if (item.isChild) {
                    formik.setFieldValue(`discount_options[${i}].selected_variants[${childIndex}].discount_price`, '');
                } else {
                    formik.setFieldValue(`discount_options[${i}].discount_price`, '');
                }
            }
        }
    };

    const onChangePrice = (e, i, item, childIndex) => {
        const val = e.target.value.replace(floatReg, '');
        if (!isNaN(Number(val))) {
            const discount = parseFloat(((Number(item.price) - Number(val)) / item.price) * 100).toFixed(2);
            if (item.isChild) {
                formik.setFieldValue(`discount_options[${i}].selected_variants[${childIndex}].discount_price`, val);
            } else {
                formik.setFieldValue(`discount_options[${i}].discount_price`, val);
            }
            if (val && Number(val) !== 0 && Number(discount) > 0 && Number(discount) < 100
            ) {
                if (item.isChild) {
                    formik.setFieldValue(`discount_options[${i}].selected_variants[${childIndex}].discount`, Number(discount));
                } else {
                    formik.setFieldValue(`discount_options[${i}].discount`, Number(discount));
                }
            } else if (item.isChild) {
                formik.setFieldValue(`discount_options[${i}].selected_variants[${childIndex}].discount`, '');
            } else {
                formik.setFieldValue(`discount_options[${i}].discount`, '');
            }
        }
    };

    useEffect(() => {
        if (formik.values.discount_options.every(({ entity_id }) => checked.includes(entity_id))) {
            setCheckedAll(true);
        } else {
            setCheckedAll(false);
        }
    }, [checked, formik.values.discount_options]);

    return (
        <>
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

            <TableContainer className={classes.tableContainer}>
                <Table>
                    <TableHead>
                        <TableRow className={clsx(classes.tr, 'head')}>
                            <TableCell className={classes.th} />
                            <TableCell className={clsx(classes.th, 'fix')}>{t('sellerpromotion:Product_Information')}</TableCell>
                            <TableCell className={classes.th}>{t('sellerpromotion:Discount_Period')}</TableCell>
                            <TableCell className={classes.th}>{t('sellerpromotion:Normal_Price')}</TableCell>
                            <TableCell className={classes.th}>{t('sellerpromotion:Discount_Price')}</TableCell>
                            <TableCell className={clsx(classes.th, 'small')}>{t('sellerpromotion:Discount')}</TableCell>
                            <TableCell className={classes.th} />
                            <TableCell className={classes.th} />
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {formik.values.discount_options?.map((item, i) => (
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
        </>
    );
};

export default DiscountTable;
