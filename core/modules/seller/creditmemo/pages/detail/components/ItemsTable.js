import React from 'react';
import clsx from 'clsx';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import useStyles from '@sellermodules/creditmemo/pages/detail/components/style';

const ItemsTable = (props) => {
    const {
        data, t,
    } = props;
    const classes = useStyles();

    return (
        <TableContainer>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow className={classes.tr}>
                        <TableCell className={classes.th}>
                            {t('sellercreditmemo:Product')}
                        </TableCell>
                        <TableCell className={classes.th}>{t('sellercreditmemo:Price')}</TableCell>
                        <TableCell className={classes.th}>{t('sellercreditmemo:Qty')}</TableCell>
                        <TableCell className={classes.th}>{t('sellercreditmemo:Qty_to_Refund')}</TableCell>
                        <TableCell className={classes.th}>{t('sellercreditmemo:Subtotal')}</TableCell>
                        <TableCell className={classes.th}>{t('sellercreditmemo:Tax_Amount')}</TableCell>
                        <TableCell className={classes.th}>{t('sellercreditmemo:Discount_Amount')}</TableCell>
                        <TableCell className={classes.th}>{t('sellercreditmemo:Row_Total')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.items?.map((item) => (
                        <TableRow
                            key={item.entity_id}
                            className={clsx(classes.rowItem, (!!item.remark || item.bundle_children?.length) && 'noBorder')}
                        >
                            <TableCell className={classes.td}>
                                {item.name || '-'}
                                <div>
                                    <strong>SKU:</strong>
                                    {' '}
                                    {item.vendor_sku}
                                </div>
                            </TableCell>
                            <TableCell className={classes.td}>{item.price}</TableCell>
                            <TableCell className={classes.td}>
                                <div>
                                    {t('sellercreditmemo:Ordered')}
                                    :
                                    {' '}
                                    {item.order_item.qty_ordered}
                                </div>
                                <div>
                                    {t('sellercreditmemo:Invoiced')}
                                    :
                                    {' '}
                                    {item.order_item.qty_invoiced}
                                </div>
                                <div>
                                    {t('sellercreditmemo:Shipped')}
                                    :
                                    {' '}
                                    {item.order_item.qty_shipped}
                                </div>
                            </TableCell>
                            <TableCell className={classes.td}>{item.qty_to_refund}</TableCell>
                            <TableCell className={classes.td}>{item.row_total}</TableCell>
                            <TableCell className={classes.td}>{item.tax_amount}</TableCell>
                            <TableCell className={classes.td}>{item.discount_amount}</TableCell>
                            <TableCell className={classes.td}>{item.total_amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ItemsTable;
