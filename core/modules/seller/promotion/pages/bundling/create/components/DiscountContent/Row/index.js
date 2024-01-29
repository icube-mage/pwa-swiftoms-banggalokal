/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
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

import TextField from '@common_textfield';

import { thousandSeparator } from '@helper_regex';
import useStyles from '@sellermodules/promotion/pages/bundling/create/components/DiscountContent/Row/style';

const DiscountContent = (props) => {
    const {
        t, formik, activeStep, checked, currency, rowItem, rowIndex, setChecked,
        handleChecked, handleDelete, onChangeDiscount, onChangePrice,
    } = props;
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const parentChecked = checked.includes(rowItem.entity_id);
    const allChecked = rowItem.isParent && rowItem.selectedVariant.every((variant) => checked.includes(variant.entity_id));

    const checkAllChild = () => {
        const tempCheck = [...checked];
        rowItem.selectedVariant.forEach((variant) => {
            if (!tempCheck.includes(variant.entity_id)) {
                tempCheck.push(variant.entity_id);
            }
        });
        setChecked(tempCheck);
    };

    const uncheckAllChild = () => {
        let tempCheck = [...checked];
        rowItem.selectedVariant.forEach((variant) => {
            if (tempCheck.includes(variant.entity_id)) {
                tempCheck = tempCheck.filter((check) => check !== variant.entity_id);
            }
        });
        setChecked(tempCheck);
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
            className={clsx(classes.rowItem, i % 2 && 'dark')}
        >
            <TableCell className={clsx(classes.td, item.isParent && 'noborder', 'border')}>
                {activeStep === 1
                    && (
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
                    )}
            </TableCell>
            <TableCell className={clsx(classes.td, item.isParent && 'noborder', 'border')}>
                <Grid container spacing={2} className={classes.imgContainer}>
                    <Grid item xs={12} lg={5} className={classes.centerMd}>
                        <div
                            className={classes.img}
                            style={{ backgroundImage: `url(${item.images?.[0]?.url || '/assets/img/placeholder_image.jpg'})` }}
                            alt="ord-img"
                        />
                    </Grid>
                    <Grid item xs={12} lg={7} container direction="column" spacing={1}>
                        <Grid item xs className={classes.break}>
                            {item.name}
                        </Grid>
                        <Grid item xs className={classes.break}>
                            {`SKU : ${item.vendor_sku}`}
                        </Grid>
                    </Grid>
                </Grid>
            </TableCell>
            <TableCell className={clsx(classes.td, item.isParent && 'noborder')}>
                <div className={classes.divider}>{item.price_formatted}</div>
            </TableCell>
            <TableCell className={clsx(classes.td, item.isParent && 'noborder')}>
                <div className={classes.divider}>
                    {item.isParent ? null : activeStep === 1
                        ? (
                            <TextField
                                className={clsx(classes.textInput, 'adorn', 'table')}
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
                                error={!!(formik.touched?.bundle_options?.[i]?.discount
                                    && formik.errors?.bundle_options?.[i]?.discount)}
                                helperText={(formik.touched?.bundle_options?.[i]?.discount
                                    && formik.errors?.bundle_options?.[i]?.discount) || ''}
                            />
                        ) : `${item.discount || 0}%`}
                </div>
            </TableCell>
            <TableCell className={clsx(classes.td, item.isParent && 'noborder')}>
                {item.isParent ? null : (
                    <div className={classes.divider}>
                        {activeStep === 1
                            ? (
                                <TextField
                                    className={clsx(classes.textInput, 'adorn', 'table')}
                                    placeholder={t('sellerpromotion:Package_Price')}
                                    value={item.package_price}
                                    onChange={(e) => onChangePrice(e, i, item)}
                                    onPaste={(e) => onChangePrice(e, i, item)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment className={classes.adornment} position="start">
                                                {currency}
                                            </InputAdornment>
                                        ),
                                    }}
                                    error={item.package_price ? item.package_price > item.price
                                        : !!(formik.touched?.bundle_options?.[i]?.package_price
                                            && formik.errors?.bundle_options?.[i]?.package_price)}
                                    helperText={item.package_price > item.price
                                        ? t('sellerpromotion:Package_price_cannot_be_equal_or_more_than_the_initial_price_of_the_product')
                                        : ''}
                                />
                            ) : `${currency}${(item.package_price || item.price)
                                ?.toString().replace(thousandSeparator, ',')}.00`}
                    </div>
                )}

            </TableCell>
            {activeStep === 1
                && (
                    <TableCell className={clsx(classes.td, item.isParent && 'noborder')}>
                        <IconButton
                            className="trash"
                            onClick={() => handleDelete(i)}
                        >
                            <img src="/assets/img/trash-new.svg" alt="trash" />
                        </IconButton>
                    </TableCell>
                )}
        </TableRow>
    );

    return (
        <>
            {renderRow(rowItem, rowIndex)}
            {rowItem.isParent && (
                <>
                    <TableRow className={classNames(classes.rowItem, rowIndex % 2 && 'dark')}>
                        <TableCell className={clsx(classes.td, 'noborder')} padding="checkbox" />
                        <TableCell
                            className={clsx(classes.td, 'p10', activeStep === 2 && 'ph10', 'pointer', 'black', 'br')}
                            colSpan={activeStep === 1 ? 4 : 5}
                            onClick={() => setOpen(!open)}
                            aria-hidden="true"
                        >
                            <div className={classes.flex}>
                                {t('sellerpromotion:Variant_Products')}
                                {' '}
                                {`(${rowItem.selectedVariant.length})`}
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </div>
                        </TableCell>
                        {activeStep === 1
                            && (
                                <TableCell className={clsx(classes.td, 'noborder', 'p10')} padding="checkbox" />
                            )}
                    </TableRow>
                    {rowItem.selectedVariant.map((variant, idx) => (
                        <>
                            <TableRow key={variant.entity_id} className={classNames(classes.rowItem, rowIndex % 2 && 'dark')}>
                                <TableCell className={clsx(classes.td, !open && 'p0', 'noborder', !open && 'p0')}>
                                    <Collapse in={open} timeout={100} unmountOnExit>
                                        {' '}
                                    </Collapse>
                                </TableCell>
                                <TableCell className={clsx(classes.td, !open && 'p0', 'black')}>
                                    <Collapse in={open} timeout={100} unmountOnExit>
                                        <Grid container spacing={1} alignItems="center">
                                            <Grid item xs="auto">
                                                {activeStep === 1
                                                    && (
                                                        <Checkbox
                                                            className={clsx(classes.checkbox, 'white')}
                                                            onChange={() => handleChecked(variant.entity_id)}
                                                            checked={checked.includes(variant.entity_id)}
                                                        />
                                                    )}
                                            </Grid>
                                            <Grid item xs="auto">
                                                <span className={classNames('bold', classes.break)}>
                                                    {variant.name}
                                                </span>
                                                <br />
                                                <span className={classes.break}>{`SKU : ${variant.vendor_sku}`}</span>
                                            </Grid>
                                        </Grid>
                                    </Collapse>
                                </TableCell>
                                <TableCell className={clsx(classes.td, !open && 'p0', 'black')}>
                                    <Collapse in={open} timeout={100} unmountOnExit>
                                        <div className={classes.divider}>
                                            {variant.price_formatted || variant.price}
                                        </div>
                                    </Collapse>
                                </TableCell>
                                <TableCell className={clsx(classes.td, !open && 'p0', 'black')}>
                                    <Collapse in={open} timeout={100} unmountOnExit>
                                        <div className={classes.divider}>
                                            {activeStep === 1
                                                ? (
                                                    <TextField
                                                        className={clsx(classes.textInput, 'adorn', 'table')}
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
                                                        error={!!(formik.touched?.bundle_options?.[rowIndex]?.selectedVariant?.[idx]
                                                            ?.discount
                                                            && formik.errors?.bundle_options?.[rowIndex]?.selectedVariant?.[idx]
                                                                ?.discount)}
                                                        helperText={(formik.touched?.bundle_options?.[rowIndex]?.selectedVariant?.[idx]
                                                            ?.discount
                                                            && formik.errors?.bundle_options?.[rowIndex]?.selectedVariant?.[idx]
                                                                ?.discount) || ''}
                                                    />
                                                ) : `${variant.discount || 0}%`}
                                        </div>
                                    </Collapse>
                                </TableCell>
                                <TableCell className={clsx(classes.td, !open && 'p0', 'black')}>
                                    <Collapse in={open} timeout={100} unmountOnExit>
                                        <div className={classes.divider}>
                                            {activeStep === 1
                                                ? (
                                                    <TextField
                                                        className={clsx(classes.textInput, 'adorn', 'table')}
                                                        placeholder={t('sellerpromotion:Package_Price')}
                                                        value={variant.package_price}
                                                        onChange={(e) => onChangePrice(e, rowIndex, variant, idx)}
                                                        onPaste={(e) => onChangePrice(e, rowIndex, variant, idx)}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment className={classes.adornment} position="start">
                                                                    {currency}
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        error={variant.package_price ? variant.package_price > variant.price
                                                            : !!(formik.touched?.bundle_options?.[rowIndex]?.selectedVariant?.[idx]
                                                                .package_price
                                                                && formik.errors?.bundle_options?.[rowIndex]?.selectedVariant?.[idx]
                                                                    .package_price)}
                                                        helperText={variant.package_price > variant.price
                                                            ? t('sellerpromotion:Package_price_cannot_be_equal_or_more_than_the_initial_price_of_the_product')
                                                            : ''}
                                                    />
                                                ) : `${currency}${(variant.package_price || variant.price)
                                                    ?.toString().replace(thousandSeparator, ',')}.00`}
                                        </div>
                                    </Collapse>
                                </TableCell>
                                {activeStep === 1
                                    && (
                                        <TableCell className={clsx(classes.td, !open && 'p0', 'noborder')}>
                                            <Collapse in={open} timeout={100} unmountOnExit>
                                                {' '}
                                            </Collapse>
                                        </TableCell>
                                    )}
                            </TableRow>
                        </>
                    ))}
                    <TableRow
                        className={clsx(classes.rowItem, rowIndex % 2 && 'dark')}
                    >
                        <TableCell className={clsx(classes.td, 'p10')} colSpan={activeStep === 1 ? 6 : 5}>
                            {' '}
                        </TableCell>
                    </TableRow>
                </>
            )}
        </>
    );
};

export default DiscountContent;
