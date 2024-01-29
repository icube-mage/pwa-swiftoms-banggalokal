/* eslint-disable no-nested-ternary */
import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

import Autocomplete from '@common_autocomplete';

import useStyles from '@sellermodules/return/pages/detail/components/Table/style';

const ItemsTable = (props) => {
    const {
        t, dataPackageCondition, dataReason, formik, isReturnStock, stepActive,
    } = props;

    const classes = useStyles();
    const handleCheck = (e, id) => {
        const temp = [...formik.values.selected];
        if (e.target.checked) {
            temp.push(id);
            formik.setFieldValue('selected', temp);
            if (temp.length === formik.values.items.length) {
                formik.setFieldValue('is_check_all', true);
            }
        } else {
            formik.setFieldValue('selected', temp.filter((s) => s !== id));
            formik.setFieldValue('is_check_all', false);
        }
    };

    const handleCheckAll = (e) => {
        if (e.target.checked) {
            const temp = formik.values.items?.map(({ item_id }) => item_id);
            formik.setFieldValue('selected', temp);
            formik.setFieldValue('is_check_all', true);
        } else {
            formik.setFieldValue('selected', []);
            formik.setFieldValue('is_check_all', false);
        }
    };

    return (
        <TableContainer>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow className={classes.tr}>
                        <TableCell className={clsx(classes.th, 'check')} padding="checkbox">
                            <Checkbox
                                name="is_check_all"
                                className={classes.checkbox}
                                checked={formik.values.is_check_all}
                                onChange={handleCheckAll}
                                disabled={!!stepActive}
                            />
                        </TableCell>
                        <TableCell className={classes.th}>
                            {t('sellerreturn:Product')}
                        </TableCell>
                        <TableCell className={classes.th}>{t('sellerreturn:Return_Qty')}</TableCell>
                        <TableCell className={clsx(classes.th, 'form')}>{t('sellerreturn:Return_Details')}</TableCell>
                        {isReturnStock
                            && <TableCell className={clsx(classes.th, 'small')}>{t('sellerreturn:Return_to_Stock')}</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {formik.values.items?.map((item, i) => (
                        <TableRow
                            key={item.name}
                            className={clsx(classes.rowItem, (!!item.remark || item.bundle_children?.length) && 'noBorder')}
                        >
                            <TableCell className={classes.td} padding="checkbox">
                                <Checkbox
                                    className={classes.checkbox}
                                    checked={formik.values.selected.includes(item.item_id)}
                                    onChange={(e) => handleCheck(e, item.item_id)}
                                    disabled={!!stepActive}
                                />
                            </TableCell>
                            <TableCell className={classes.td}>
                                {item.name || '-'}
                                <div>
                                    <strong>SKU:</strong>
                                    {' '}
                                    {item.vendor_sku}
                                </div>
                                <div>
                                    <strong>Price:</strong>
                                    {' '}
                                    {item.price_formatted}
                                </div>
                            </TableCell>
                            <TableCell className={classes.td}>{item.qty}</TableCell>
                            <TableCell className={classes.td}>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item>
                                        <div className={clsx(classes.subtitle, 'required')}>
                                            {t('sellerreturn:Package_Condition')}
                                        </div>
                                        <Autocomplete
                                            className={classes.autocompleteRoot}
                                            name={`items[${i}].package_condition`}
                                            value={dataPackageCondition?.find((opt) => opt.code === item.package_condition)}
                                            onChange={(e) => formik.setFieldValue(`items[${i}].package_condition`, e?.code || '')}
                                            primaryKey="code"
                                            labelKey="title"
                                            options={[{ title: t('sellerreturn:Please_Select'), code: '' }, ...dataPackageCondition] || []}
                                            fullWidth
                                            disableClearable
                                            disabled={stepActive >= 3}
                                            error={!!(formik.touched.items?.[i]?.package_condition
                                                && formik.errors.items?.[i]?.package_condition)}
                                            helperText={(formik.touched.items?.[i]?.package_condition
                                                && formik.errors.items?.[i]?.package_condition) || ''}
                                            placeholder={t('sellerreturn:Please_Select')}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <div className={clsx(classes.subtitle, 'required')}>
                                            {t('sellerreturn:Reason')}
                                        </div>
                                        <Autocomplete
                                            className={classes.autocompleteRoot}
                                            name={`items[${i}].reason`}
                                            value={dataReason?.find((opt) => opt.code === item.reason)}
                                            onChange={(e) => formik.setFieldValue(`items[${i}].reason`, e?.code || '')}
                                            primaryKey="code"
                                            labelKey="title"
                                            options={[{ title: t('sellerreturn:Please_Select'), code: '' }, ...dataReason] || []}
                                            fullWidth
                                            disableClearable
                                            disabled={stepActive >= 3}
                                            error={!!(formik.touched.items?.[i]?.reason && formik.errors.items?.[i]?.reason)}
                                            helperText={(formik.touched.items?.[i]?.reason && formik.errors.items?.[i]?.reason) || ''}
                                            placeholder={t('sellerreturn:Please_Select')}
                                        />
                                    </Grid>
                                    {!!item.attachment?.length
                                        && (
                                            <Grid item>
                                                <div className={classes.subtitle}>{t('sellerreturn:Attachment')}</div>
                                                {item.attachment?.map((attach) => (
                                                    <Link key={attach.filepath} href={attach.filepath} passHref>
                                                        <a target="_blank" className={classes.link}>
                                                            {attach.filename}
                                                        </a>
                                                    </Link>
                                                ))}
                                            </Grid>
                                        )}
                                </Grid>
                            </TableCell>
                            {isReturnStock
                                && (
                                    <TableCell className={classes.td}>
                                        <Checkbox
                                            name={`items[${i}].return_stock`}
                                            className={classes.checkbox}
                                            checked={item.return_stock}
                                            onChange={formik.handleChange}
                                            disabled={stepActive >= 3}
                                        />
                                    </TableCell>
                                )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ItemsTable;
