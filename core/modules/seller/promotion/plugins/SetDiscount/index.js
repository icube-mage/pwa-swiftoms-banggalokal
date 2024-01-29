/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

import {
    DateRangePicker,
    LocalizationProvider,
    DateRangeDelimiter,
} from '@material-ui/pickers';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';

import Button from '@common_button';
import TextField from '@common_textfield';

import { floatReg } from '@helper_regex';
import formatDate from '@helper_date';

import DiscountTable from '@sellermodules/promotion/plugins/SetDiscount/DiscountTable';
import useStyles from '@sellermodules/promotion/plugins/SetDiscount/style';

const CreateBundlingContent = (props) => {
    const {
        t, formik, currency,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const [checked, setChecked] = useState([]);
    const [selectedDate, setSelectedDate] = React.useState([null, null]);

    const [field, setField] = useState({
        from: '',
        to: '',
        discount_price: '',
        discount: '',
    });

    const applyChange = () => {
        const {
            discount_price, discount, from, to,
        } = field;
        const temp = [];
        let dv = '';
        let pv = '';
        formik.values.discount_options?.forEach((item) => {
            if (checked.includes(item.entity_id) && !item.isParent) {
                let itemToPush = {
                    ...item,
                    from: from || item.from,
                    to: to || item.to,
                };
                if (discount) {
                    pv = parseFloat((item.price * (100 - discount)) / 100).toFixed(2);
                    itemToPush = {
                        ...itemToPush,
                        discount_price: parseFloat(pv).toFixed(2),
                        discount,
                    };
                } else if (discount_price) {
                    dv = parseFloat(((Number(item.price) - Number(discount_price)) / item.price) * 100).toFixed(2);
                    itemToPush = {
                        ...itemToPush,
                        discount_price,
                        discount: dv > 0 && dv < 100 ? dv : '',
                    };
                }
                temp.push(itemToPush);
            } else if (item.isParent) {
                const parentIdx = temp.findIndex((tempItem) => tempItem.entity_id === item.entity_id);
                const itemToPush = parentIdx >= 0 ? temp[parentIdx] : { ...item };
                item.selected_variants.forEach((variant) => {
                    if (checked.includes(variant.entity_id)) {
                        const childIdx = item.selected_variants.findIndex((vr) => vr.entity_id === variant.entity_id);
                        itemToPush.selected_variants[childIdx].from = from || variant.from;
                        itemToPush.selected_variants[childIdx].to = to || variant.to;
                        if (discount) {
                            pv = parseFloat((variant.price * (100 - discount)) / 100).toFixed(2);
                            itemToPush.selected_variants[childIdx] = {
                                ...itemToPush.selected_variants[childIdx],
                                discount_price: pv,
                                discount,
                            };
                            if (parentIdx >= 0) {
                                temp[parentIdx] = itemToPush;
                            }
                        } else if (discount_price) {
                            dv = parseFloat(((Number(variant.price) - Number(discount_price)) / variant.price) * 100).toFixed(2);
                            itemToPush.selected_variants[childIdx] = {
                                ...itemToPush.selected_variants[childIdx],
                                discount_price,
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
        formik.setFieldValue('discount_options', temp);
        setField({
            from: '',
            to: '',
            discount_price: '',
            discount: '',
        });
        setSelectedDate([null, null]);
    };

    const handleDateChange = (date) => {
        setField({ ...field, from: formatDate(date[0], 'YYYY-MM-DD'), to: formatDate(date[1], 'YYYY-MM-DD') });
    };

    const handleDateClose = () => {
        if (!selectedDate.every((date) => date === null)) {
            handleDateChange(selectedDate);
        }
    };

    const discountTotal = () => {
        let min = 0;
        let max = 0;
        formik.values.discount_options.forEach((item) => {
            if (item.isParent) {
                const variant = [...item.selected_variants]
                    .filter((vr) => !!vr.discount)
                    .sort((a, b) => (a.price - a.discount_price) - (b.price - b.discount_price));
                if (variant.length) {
                    min += Number(variant[0]?.price) - Number(variant[0]?.discount_price);
                    max += Number(variant[variant.length - 1]?.price) - Number(variant[variant.length - 1]?.discount_price || 0);
                }
            } else if (item.discount) {
                min += Number(item.price - item.discount_price);
                max += Number(item.price - item.discount_price);
            }
        });
        return [min, max];
    };

    const isDisabled = discountTotal().some((d) => !d)
        || formik.values.discount_options.some((item) => (Number(item.discount_price) > Number(item.price)))
        || formik.values.discount_options.some((item) => (item.discount_price === 0 || item.discount_price === '0'))
        || formik.values.discount_options.some((item) => (item.isParent
            ? item.selected_variants.some((variant) => !variant.discount) : !item.discount))
        || formik.values.discount_options.some((item) => item.selected_variants
            .some((variant) => Number(variant.discount_price) > Number(variant.price)))
        || formik.values.discount_options.some((item) => item.selected_variants
            .some((variant) => (variant.discount_price === 0 || variant.discount_price === '0')))
        || formik.values.discount_options.some((item) => (item.isParent
            ? item.selected_variants.some((variant) => !variant.from) : !item.from))
        || formik.values.discount_options.some((item) => (item.isParent
            ? item.selected_variants.some((variant) => !variant.to) : !item.to));

    return (
        <div className={classes.container}>
            <div className={classes.headerContainer}>
                <IconButton aria-label="back" onClick={() => router.push('/seller/promotion/discount')}>
                    <ArrowBackOutlinedIcon />
                </IconButton>
                <h2 className="title">{t('sellerpromotion:Discount_Product')}</h2>
            </div>
            <Paper className={classes.paper}>
                <div className={classes.headerContent}>
                    <InputLabel htmlFor="period" className={classes.label}>
                        <h2 className="title">{t('sellerpromotion:Set_Product_Discount')}</h2>
                    </InputLabel>
                    <div className={classes.headerInput}>
                        <div className="divider" />
                        <LocalizationProvider dateAdapter={DateFnsUtils}>
                            <DateRangePicker
                                className={classes.dateRangeClass}
                                startText=""
                                endText=""
                                allowSameDateSelection
                                value={selectedDate}
                                inputFormat="dd MMM yyyy"
                                toolbarPlaceholder="-"
                                onChange={setSelectedDate}
                                onAccept={(date) => handleDateChange(date)}
                                clearable
                                onClose={handleDateClose}
                                renderInput={(startProps, endProps) => (
                                    <div className={classes.dateContainer}>
                                        <img alt="" src="/assets/img/calendar.svg" />
                                        <TextField
                                            className={classes.inputDate}
                                            {...startProps.inputProps}
                                            placeholder="From"
                                            onChange={(e) => e.preventDefault}
                                        />
                                        <DateRangeDelimiter> - </DateRangeDelimiter>
                                        <TextField
                                            className={classes.inputDate}
                                            {...endProps.inputProps}
                                            placeholder="To"
                                            onChange={(e) => e.preventDefault}
                                        />
                                    </div>
                                )}
                            />
                        </LocalizationProvider>
                        <div className="divider" />
                        <TextField
                            className={clsx(classes.textInput, 'adorn')}
                            placeholder={field.discount_price ? '' : t('sellerpromotion:Discount_Price')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment className={classes.adornment} position="start">
                                        {currency}
                                    </InputAdornment>
                                ),
                            }}
                            value={field.discount_price}
                            onChange={(e) => {
                                const val = e.target.value.replace(floatReg, '');
                                if (!isNaN(Number(val))) {
                                    setField((prev) => ({ ...prev, discount_price: val }));
                                }
                            }}
                            disabled={!!field.discount}
                            onKeyDown={(ev) => {
                                if (ev.key === 'Enter') {
                                    applyChange();
                                    ev.preventDefault();
                                }
                            }}
                        />
                        <div className="divider" />
                        <TextField
                            className={clsx(classes.textInput, 'adorn', 'small')}
                            placeholder={field.discount ? '' : t('sellerpromotion:Discount')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment className={classes.adornment} position="start">
                                        %
                                    </InputAdornment>
                                ),
                            }}
                            value={field.discount}
                            onChange={(e) => {
                                const discount = e.target.value.replace(floatReg, '');
                                if (!isNaN(Number(discount)) && Number(discount) < 100) {
                                    setField((prev) => ({ ...prev, discount: e.target.value.replace(floatReg, '') }));
                                }
                            }}
                            disabled={!!field.discount_price}
                            onKeyDown={(ev) => {
                                if (ev.key === 'Enter') {
                                    applyChange();
                                    ev.preventDefault();
                                }
                            }}
                        />
                        <div className="divider" />
                        <Button
                            onClick={applyChange}
                            className={clsx(classes.btn, (
                                (!field.discount && !field.discount_price && !field.from && !field.to) || !checked.length)
                                && 'disabled')}
                            disabled={(!field.discount && !field.discount_price && !field.from && !field.to) || !checked.length}
                        >
                            {t('sellerpromotion:Apply')}
                        </Button>
                    </div>
                </div>
            </Paper>
            <DiscountTable
                {...props}
                checked={checked}
                setChecked={setChecked}
                field={field}
                setField={setField}
            />
            <div style={{ height: 20 }} />
            <Grid container alignItems="center">
                <Hidden xsDown>
                    <Grid item xs={12} sm={9} />
                </Hidden>
                <Grid item xs={12} sm={3}>
                    <Button
                        className={clsx(classes.btn, isDisabled && 'disabled')}
                        onClick={formik.handleSubmit}
                        disabled={isDisabled}
                    >
                        {t('sellerpromotion:Save')}
                    </Button>
                </Grid>
            </Grid>
            <div style={{ height: 20 }} />
        </div>
    );
};

export default CreateBundlingContent;
