import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import classNames from 'classnames';

import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

import {
    DateRangePicker,
    LocalizationProvider,
    DateRangeDelimiter,
} from '@material-ui/pickers';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';

import TextField from '@common_textfield';
import formatDate from '@helper_date';

import useStyles from '@sellermodules/promotion/plugins/SetDiscount/DiscountTable/Row/style';

const DiscountTable = (props) => {
    const {
        t, formik, checked, currency, rowItem, rowIndex, setChecked,
        handleChecked, handleDelete, onChangeDiscount, onChangePrice,
    } = props;
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const parentChecked = checked.includes(rowItem.entity_id);
    const allChecked = rowItem.isParent && rowItem.selected_variants.every((variant) => checked.includes(variant.entity_id));

    const checkAllChild = () => {
        const tempCheck = [...checked];
        rowItem.selected_variants.forEach((variant) => {
            if (!tempCheck.includes(variant.entity_id)) {
                tempCheck.push(variant.entity_id);
            }
        });
        setChecked(tempCheck);
    };

    const uncheckAllChild = () => {
        let tempCheck = [...checked];
        rowItem.selected_variants.forEach((variant) => {
            if (tempCheck.includes(variant.entity_id)) {
                tempCheck = tempCheck.filter((check) => check !== variant.entity_id);
            }
        });
        setChecked(tempCheck);
    };

    const handleDateChange = (date, pI, cItem, cI) => {
        if (cItem.isChild) {
            formik.setFieldValue(`discount_options[${pI}].selected_variants[${cI}].from`, formatDate(date[0], 'YYYY-MM-DD'));
            formik.setFieldValue(`discount_options[${pI}].selected_variants[${cI}].to`, formatDate(date[1], 'YYYY-MM-DD'));
        } else {
            formik.setFieldValue(`discount_options[${pI}].from`, formatDate(date[0], 'YYYY-MM-DD'));
            formik.setFieldValue(`discount_options[${pI}].to`, formatDate(date[1], 'YYYY-MM-DD'));
        }
    };

    useEffect(() => {
        if (rowItem.isParent) {
            if (parentChecked) {
                setOpen(true);
                checkAllChild();
            }
        }
    }, [parentChecked]);

    useEffect(() => {
        if (rowItem.isParent) {
            if (allChecked) {
                handleChecked(rowItem.entity_id, true);
            } else {
                handleChecked(rowItem.entity_id, false);
            }
        }
    }, [allChecked]);

    const renderRow = (item, i) => (
        <TableRow
            key={i}
            className={clsx(classes.rowItem, i % 2 && 'gray')}
        >
            <TableCell className={clsx(classes.td, item.isParent && 'noborder', 'padding')}>
                <Checkbox
                    className={classes.checkbox}
                    onChange={(e) => {
                        handleChecked(item.entity_id);
                        if (!e.target.checked && item.isParent) {
                            uncheckAllChild();
                        }
                    }}
                    checked={checked.includes(item.entity_id)}
                />
            </TableCell>
            <TableCell className={clsx(classes.td, item.isParent && 'noborder', 'padding')}>
                <Grid container spacing={2} className={classes.imgContainer}>
                    <Grid item xs={12} lg={5} className={classes.centerMd}>
                        <div
                            className={classes.img}
                            style={{ backgroundImage: `url(${item.image || '/assets/img/placeholder_image.jpg'})` }}
                            alt="ord-img"
                        />
                    </Grid>
                    <Grid item xs={12} lg={7} container direction="column" spacing={1}>
                        <Grid item xs className={clsx('bold', classes.break, 'link')}>
                            <Link href={`/seller/catalog/edit/${item.entity_id}`} passHref>
                                <a target="_blank">
                                    {item.name}
                                </a>
                            </Link>
                        </Grid>
                        <Grid item xs className={classes.break}>
                            {`SKU : ${item.vendor_sku}`}
                        </Grid>
                    </Grid>
                </Grid>
            </TableCell>
            <TableCell className={clsx(classes.td, item.isParent && 'noborder')}>
                <div className={clsx(classes.divider, 'center')}>
                    {item.isParent ? null : (
                        <LocalizationProvider dateAdapter={DateFnsUtils}>
                            <DateRangePicker
                                className={classes.dateRangeClass}
                                startText=""
                                endText=""
                                allowSameDateSelection
                                value={[formik.values.discount_options[i].from, formik.values.discount_options[i].to]}
                                inputFormat="dd MMM yyyy"
                                toolbarPlaceholder="-"
                                onChange={(date) => handleDateChange(date, i, item)}
                                onAccept={(date) => handleDateChange(date, i, item)}
                                clearable
                                // onClose={() => handleDateClose(i, item)}
                                renderInput={(startProps, endProps) => (
                                    <div>
                                        <TextField
                                            {...startProps.inputProps}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment className={classes.adornmentDate} position="start">
                                                        <img alt="" src="/assets/img/calendar.svg" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            className={clsx(classes.inputDate, rowIndex % 2 && 'border')}
                                            placeholder=""
                                            onChange={(e) => e.preventDefault}
                                        />
                                        <DateRangeDelimiter>
                                            <span className={classes.delimiter}>
                                                {t('sellerpromotion:To')}
                                            </span>
                                        </DateRangeDelimiter>
                                        <TextField
                                            {...endProps.inputProps}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment className={classes.adornmentDate} position="start">
                                                        <img alt="" src="/assets/img/calendar.svg" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            className={clsx(classes.inputDate, rowIndex % 2 && 'border')}
                                            placeholder=""
                                            onChange={(e) => e.preventDefault}
                                        />
                                    </div>
                                )}
                            />
                        </LocalizationProvider>
                    )}
                </div>
            </TableCell>
            <TableCell className={clsx(classes.td, item.isParent && 'noborder')}>
                <div className={classes.divider}>{item.price_formatted}</div>
            </TableCell>
            <TableCell className={clsx(classes.td, item.isParent && 'noborder')}>
                <div className={classes.divider}>
                    {item.isParent ? null : (
                        <TextField
                            className={clsx(classes.textInput, rowIndex % 2 && 'border',
                                'adorn', 'table')}
                            placeholder={t('sellerpromotion:Discount_Price')}
                            value={item.discount_price}
                            onChange={(e) => onChangePrice(e, i, item)}
                            onPaste={(e) => onChangePrice(e, i, item)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment className={classes.adornment} position="start">
                                        {currency}
                                    </InputAdornment>
                                ),
                            }}
                            error={item.discount_price ? item.discount_price > item.price
                                : !!(formik.touched?.discount_options?.[i]?.discount_price
                                    && formik.errors?.discount_options?.[i]?.discount_price)}
                            helperText={item.discount_price >= item.price
                                ? t('sellerpromotion:Cannot_be_equal_or_more_than_the_normal_price')
                                : ''}
                        />
                    )}
                </div>
            </TableCell>
            <TableCell className={clsx(classes.td, item.isParent && 'noborder')}>
                <div className={classes.divider}>
                    {item.isParent ? null : (
                        <TextField
                            className={clsx(classes.textInput, rowIndex % 2 && 'border',
                                'adorn', 'table')}
                            placeholder={t('sellerpromotion:Discount')}
                            value={item.discount}
                            onChange={(e) => onChangeDiscount(e, i, item)}
                            onPaste={(e) => onChangeDiscount(e, i, item)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment className={classes.adornment} position="start">
                                        %
                                    </InputAdornment>
                                ),
                            }}
                            error={!!(formik.touched?.discount_options?.[i]?.discount
                                && formik.errors?.discount_options?.[i]?.discount)}
                            helperText={(formik.touched?.discount_options?.[i]?.discount
                                && formik.errors?.discount_options?.[i]?.discount) || ''}
                        />
                    )}
                </div>
            </TableCell>
            <TableCell className={clsx(classes.td, item.isParent && 'noborder')}>
                {item.isParent ? ' '
                    : (
                        <IconButton onClick={() => handleDelete(i)}>
                            <img src="/assets/img/trash-new.svg" alt="trash" className={classes.trash} />
                        </IconButton>
                    )}
            </TableCell>
            <TableCell className={clsx(classes.td, item.isParent && 'noborder')} />
        </TableRow>
    );

    return (
        <>
            {renderRow(rowItem, rowIndex)}
            {rowItem.isParent && (
                <>
                    <TableRow className={clsx(classes.rowItem, rowIndex % 2 && 'gray')}>
                        <TableCell className={clsx(classes.td, 'noborder', rowIndex % 2 && 'gray')} />
                        <TableCell
                            className={clsx(classes.td, 'child', 'head')}
                            colSpan={6}
                            onClick={() => setOpen(!open)}
                            aria-hidden="true"
                        >
                            <div className={classes.flex}>
                                {t('sellerpromotion:Variant_Products')}
                                {' '}
                                {`(${rowItem.selected_variants.length})`}
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </div>
                        </TableCell>
                        <TableCell className={clsx(classes.td, 'noborder', rowIndex % 2 && 'gray')} />
                    </TableRow>
                    {rowItem.selected_variants.map((variant, idx) => (
                        <React.Fragment key={variant.entity_id}>
                            <TableRow className={clsx(classes.rowItem, rowIndex % 2 && 'gray')}>
                                <TableCell className={clsx(classes.td, !open && 'close', 'noborder')}>
                                    <Collapse in={open} timeout={100} unmountOnExit />
                                </TableCell>
                                <TableCell className={clsx(classes.td, 'child',
                                    !open && 'close', 'left')}
                                >
                                    <Collapse in={open} timeout={100} unmountOnExit>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={2}>
                                                <Checkbox
                                                    className={classes.checkbox}
                                                    onChange={() => handleChecked(variant.entity_id)}
                                                    checked={checked.includes(variant.entity_id)}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={10}>
                                                <span className={classNames('bold', classes.break)}>
                                                    {variant.name}
                                                </span>
                                                <br />
                                                <br />
                                                <span className={classes.break}>{`SKU : ${variant.vendor_sku}`}</span>
                                            </Grid>
                                        </Grid>
                                    </Collapse>
                                </TableCell>
                                <TableCell className={clsx(classes.td, 'child', !open && 'close')}>
                                    <Collapse in={open} timeout={100} unmountOnExit>
                                        <div className={clsx(classes.divider, 'child', 'center')}>
                                            <LocalizationProvider dateAdapter={DateFnsUtils}>
                                                <DateRangePicker
                                                    className={classes.dateRangeClass}
                                                    startText=""
                                                    endText=""
                                                    allowSameDateSelection
                                                    value={[formik.values.discount_options[rowIndex].selected_variants[idx].from,
                                                        formik.values.discount_options[rowIndex].selected_variants[idx].to]}
                                                    inputFormat="dd MMM yyyy"
                                                    toolbarPlaceholder="-"
                                                    onChange={(date) => handleDateChange(date, rowIndex, variant, idx)}
                                                    onAccept={(date) => handleDateChange(date, rowIndex, variant, idx)}
                                                    clearable
                                                    // onClose={() => handleDateClose(rowIndex, variant, idx)}
                                                    renderInput={(startProps, endProps) => (
                                                        <div>
                                                            <TextField
                                                                {...startProps.inputProps}
                                                                InputProps={{
                                                                    startAdornment: (
                                                                        <InputAdornment className={classes.adornmentDate} position="start">
                                                                            <img alt="" src="/assets/img/calendar.svg" />
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                                className={clsx(classes.inputDate, rowIndex % 2 && 'border')}
                                                                placeholder=""
                                                                onChange={(e) => e.preventDefault}
                                                            />
                                                            <DateRangeDelimiter>
                                                                <span className={classes.delimiter}>
                                                                    {t('sellerpromotion:To')}
                                                                </span>
                                                            </DateRangeDelimiter>
                                                            <TextField
                                                                {...endProps.inputProps}
                                                                InputProps={{
                                                                    startAdornment: (
                                                                        <InputAdornment className={classes.adornmentDate} position="start">
                                                                            <img alt="" src="/assets/img/calendar.svg" />
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                                className={clsx(classes.inputDate, rowIndex % 2 && 'border')}
                                                                placeholder=""
                                                                onChange={(e) => e.preventDefault}
                                                            />
                                                        </div>
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                    </Collapse>
                                </TableCell>
                                <TableCell className={clsx(classes.td, 'child', !open && 'close')}>
                                    <Collapse in={open} timeout={100} unmountOnExit>
                                        <div className={clsx(classes.divider, 'child')}>
                                            {variant.price_formatted || variant.price}
                                        </div>
                                    </Collapse>
                                </TableCell>
                                <TableCell className={clsx(classes.td, 'child', !open && 'close')}>
                                    <Collapse in={open} timeout={100} unmountOnExit>
                                        <div className={clsx(classes.divider, 'child')}>
                                            <TextField
                                                className={clsx(classes.textInput, rowIndex % 2 && 'border',
                                                    'adorn', 'table', 'child')}
                                                placeholder={t('sellerpromotion:Discount_Price')}
                                                value={variant.discount_price}
                                                onChange={(e) => onChangePrice(e, rowIndex, variant, idx)}
                                                onPaste={(e) => onChangePrice(e, rowIndex, variant, idx)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment className={classes.adornment} position="start">
                                                            {currency}
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                error={variant.discount_price ? variant.discount_price > variant.price
                                                    : !!(formik.touched?.discount_options?.[rowIndex]?.selected_variants?.[idx]
                                                        .discount_price
                                                        && formik.errors?.discount_options?.[rowIndex]?.selected_variants?.[idx]
                                                            .discount_price)}
                                                helperText={variant.discount_price >= variant.price
                                                    ? t('sellerpromotion:Cannot_be_equal_or_more_than_the_normal_price')
                                                    : ''}
                                            />
                                        </div>
                                    </Collapse>
                                </TableCell>
                                <TableCell className={clsx(classes.td, 'child', !open && 'close', 'noRight')}>
                                    <Collapse in={open} timeout={100} unmountOnExit>
                                        <div className={clsx(classes.divider, 'child')}>
                                            <TextField
                                                className={clsx(classes.textInput, rowIndex % 2 && 'border',
                                                    'adorn', 'table', 'child')}
                                                placeholder={t('sellerpromotion:Discount')}
                                                value={variant.discount}
                                                onChange={(e) => onChangeDiscount(e, rowIndex, variant, idx)}
                                                onPaste={(e) => onChangeDiscount(e, rowIndex, variant, idx)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment className={classes.adornment} position="start">
                                                            %
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                error={!!(formik.touched?.discount_options?.[rowIndex]?.selected_variants?.[idx]
                                                    ?.discount
                                                    && formik.errors?.discount_options?.[rowIndex]?.selected_variants?.[idx]
                                                        ?.discount)}
                                                helperText={(formik.touched?.discount_options?.[rowIndex]?.selected_variants?.[idx]
                                                    ?.discount
                                                    && formik.errors?.discount_options?.[rowIndex]?.selected_variants?.[idx]
                                                        ?.discount) || ''}
                                            />
                                        </div>
                                    </Collapse>
                                </TableCell>
                                <TableCell className={clsx(classes.td, 'child', !open && 'close', 'noLeft')}>
                                    <Collapse in={open} timeout={100} unmountOnExit>
                                        <IconButton
                                            className={classes.trash}
                                            onClick={() => handleDelete(rowIndex, idx)}
                                        >
                                            <img src="/assets/img/trash-new.svg" alt="trash" />
                                        </IconButton>
                                    </Collapse>
                                </TableCell>
                                <TableCell className={clsx(classes.td, !open && 'close', 'noborder')}>
                                    <Collapse in={open} timeout={100} unmountOnExit />
                                </TableCell>
                            </TableRow>
                            {!!variant.message
                                && (
                                    <TableRow className={clsx(classes.rowItem, rowIndex % 2 && 'gray')}>
                                        <TableCell className={clsx(classes.td, !open && 'close', 'noborder')}>
                                            <Collapse in={open} timeout={100} unmountOnExit />
                                        </TableCell>
                                        <TableCell className={clsx(classes.td, !open && 'close', 'noborder', 'error')} colSpan={7}>
                                            <Collapse in={open} timeout={100} unmountOnExit>
                                                {variant.message}
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                )}
                        </React.Fragment>
                    ))}
                </>
            )}
            {!!rowItem?.message && !rowItem.isParent
                && (
                    <TableRow className={clsx(classes.rowItem, rowIndex % 2 && 'gray')}>
                        <TableCell className={clsx(classes.td, 'noborder', 'p0')} />
                        <TableCell className={clsx(classes.td, 'noborder', 'error', 'p0')} colSpan={7}>
                            {rowItem.message}
                        </TableCell>
                    </TableRow>
                )}
            <TableRow className={clsx(classes.rowItem, rowIndex % 2 && 'gray',
                formik.values.discount_options?.length - 1 !== rowIndex && 'borderbottom')}
            >
                <TableCell className={clsx(classes.td, 'p5', 'noborder')} colSpan={8} />
            </TableRow>
        </>
    );
};

export default DiscountTable;
