/* eslint-disable no-nested-ternary */
import React, { Fragment } from 'react';
import clsx from 'clsx';
import classNames from 'classnames';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import useStyles from '@sellermodules/order/pages/detail/components/style';

const ItemsTable = (props) => {
    const {
        orderItem, t,
    } = props;

    const classes = useStyles();

    return (
        <TableContainer>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow className={clsx(classes.tr, 'head')}>
                        <TableCell className={classNames(classes.th, 'first')}>
                            {t('order:Product_Name')}
                        </TableCell>
                        <TableCell className={classes.th}>{t('order:SKU')}</TableCell>
                        <TableCell className={classes.th}>{t('order:Price')}</TableCell>
                        <TableCell className={classes.th}>{t('order:Qty')}</TableCell>
                        <TableCell className={clsx(classes.th, 'right')}>{t('order:Subtotal')}</TableCell>
                        <Hidden lgDown>
                            <TableCell className={classes.th} padding="checkbox" />
                        </Hidden>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orderItem?.filter((item) => !item.isChild).map((item) => (
                        <Fragment key={item.name}>
                            <TableRow className={clsx(classes.rowItem, (!!item.remark || item.bundle_children?.length) && 'noBorder')}>
                                <TableCell className={classNames(classes.td, 'first')}>
                                    {item.name || '-'}
                                    {item.variants.map((variant) => (
                                        <Fragment key={variant.value}>
                                            <br />
                                            {`${variant.label}: ${variant.value}`}
                                        </Fragment>
                                    ))}

                                </TableCell>
                                {item.bundle_children?.length
                                    ? <TableCell className={classes.td} colSpan={2} />
                                    : (
                                        <>
                                            <TableCell className={classes.td}>{item.vendor_sku || item.sku}</TableCell>
                                            <TableCell className={classes.td}>{item.price}</TableCell>
                                        </>
                                    )}
                                <TableCell className={classes.td}>{item.qty}</TableCell>
                                <TableCell className={clsx(classes.td, 'right')}>{item.isChild ? '' : item.subtotal}</TableCell>
                                <Hidden lgDown>
                                    <TableCell className={classes.td} padding="checkbox" />
                                </Hidden>
                            </TableRow>
                            {!!item.bundle_children?.length
                                && item.bundle_children?.map((child, ic) => (
                                    <TableRow
                                        key={child.entity_id}
                                        className={clsx(classes.rowItem, ic !== (item.bundle_children?.length - 1) && 'noBorder')}
                                    >
                                        <TableCell className={clsx(classes.td, 'child', 'first')}>
                                            {`- ${child.name}`}
                                        </TableCell>
                                        <TableCell className={clsx(classes.td, 'child')}>{child.vendor_sku || child.sku}</TableCell>
                                        <TableCell className={clsx(classes.td, 'child')}>{child.price}</TableCell>
                                        <TableCell className={clsx(classes.td, 'child')} colSpan={2} />
                                    </TableRow>
                                ))}
                            {!!item.remark
                                && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="note-cell">
                                            <Paper className={classes.notePaper}>
                                                <Grid container className={classes.gridNote}>
                                                    <Grid item>
                                                        <img src="/assets/img/note.svg" alt="note" style={{ marginRight: 10 }} />
                                                    </Grid>
                                                    <Grid item>
                                                        {item.remark}
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </TableCell>
                                    </TableRow>
                                )}
                        </Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ItemsTable;
