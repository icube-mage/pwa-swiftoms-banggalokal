/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import useStyles from '@modules/printoms/pages/creditmemo/components/style';

const PrintCreditMemoContent = (props) => {
    const {
        creditmemolist, storeLogo,
    } = props;
    const classes = useStyles();

    React.useEffect(() => {
        setTimeout(() => {
            window.print();
        }, 2000);
    }, [creditmemolist]);

    return (
        <>
            {(creditmemolist.length) && (
                <>
                    {creditmemolist?.map((eParent) => (
                        <Paper id="print" className={classes.container} style={{ marginBottom: 10 }}>
                            <div className={clsx(classes.content, classes.contentImg)}>
                                <img className="imgIcon" alt="" src={storeLogo?.logo || eParent.order.channel_image_url} />
                                <span>{eParent.order.channel_name}</span>
                            </div>
                            <div className={clsx(classes.content)} style={{ paddingBottom: 0 }}>
                                <h2 className={classes.titleTop}>Credit Memo</h2>
                            </div>
                            <div className={clsx(classes.content, classes.wrapperColumn)}>
                                <div className="column">
                                    <h5 className={classes.titleSmall}>
                                        {`Credit memo : #${eParent.creditmemo.increment_id}`}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        {`Credit memo Date : #${eParent.creditmemo.created_at}`}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        {`Channel Order Number : #${eParent.order.channel_order_increment_id}`}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        {`Channel Order Date : #${eParent.order.channel_order_date}`}
                                    </h5>
                                </div>
                            </div>
                            <div className={clsx(classes.content, classes.wrapperColumn)}>
                                <div className="column">
                                    <h2 className={classes.title}>Sold to</h2>
                                    <h5 className={classes.titleSmall}>
                                        {`${eParent.order.billing_address.firstname} ${eParent.order.billing_address.lastname}`}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        {eParent.order.billing_address.street}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        {`${eParent.order.billing_address.city}, ${eParent.order.billing_address.region}`}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        {`${eParent.order.billing_address.postcode}, ${eParent.order.billing_address.country_name}`}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        {eParent.order.billing_address.telephone}
                                    </h5>
                                </div>
                                <div className="column">
                                    <h2 className={classes.title}>Ship to</h2>
                                    <h5 className={classes.titleSmall}>
                                        {`${eParent.order.shipping_address.firstname} ${eParent.order.shipping_address.lastname}`}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        {eParent.order.shipping_address.street}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        {`${eParent.order.shipping_address.city}, ${eParent.order.shipping_address.region}`}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        {`${eParent.order.shipping_address.postcode}, ${eParent.order.shipping_address.country_name}`}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        {eParent.order.shipping_address.telephone}
                                    </h5>
                                </div>
                                <div className="column">
                                    <h2 className={classes.title}>Payment Method</h2>
                                    <h5 className={classes.titleSmall}>
                                        {eParent.order.channel_payment_method}
                                    </h5>
                                </div>
                                <div className="column">
                                    <h2 className={classes.title}>Payment Method</h2>
                                    <h5 className={classes.titleSmall}>
                                        {eParent.order.channel_shipping_method}
                                    </h5>
                                </div>
                            </div>
                            <div className={classes.content}>
                                <table className={classes.table}>
                                    <thead>
                                        <tr className={classes.tr}>
                                            <th className={classes.th}>SKU</th>
                                            <th className={classes.th}>Product</th>
                                            <th className={classes.th}>Price</th>
                                            <th className={classes.th}>Qty</th>
                                            <th className={clsx(classes.th, 'right')}>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {eParent.creditmemo.items?.map((z) => (
                                            <tr>
                                                <td className={classes.td}>{z.sku}</td>
                                                <td className={classes.td}>{z.name}</td>
                                                <td className={classes.td}>{z.price}</td>
                                                <td className={classes.td}>{z.qty_to_refund}</td>
                                                <td className={clsx(classes.td, 'right')}>{z.row_total}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={4} className={clsx(classes.td, classes.colSpan, 'td-tfoot')}>Subtotal:</td>
                                            <td className={clsx(classes.td, 'td-tfoot', 'right')}>{eParent.creditmemo.subtotal}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={4} className={clsx(classes.td, classes.colSpan, 'td-tfoot')}>
                                                Discount
                                                {eParent.order.coupon_code && !eParent.order.only_free_shipping_coupon_code
                                                    && ` (${eParent.order.coupon_code})`}
                                                :
                                            </td>
                                            <td className={clsx(classes.td, 'td-tfoot', 'right')}>{eParent.creditmemo.discount}</td>
                                        </tr>
                                        <tr className="border">
                                            <td colSpan={4} className={clsx(classes.td, classes.colSpan, 'td-tfoot')}>
                                                Shipping & Handling
                                                {eParent.order.coupon_code && !!eParent.order.only_free_shipping_coupon_code
                                                    && ` (${eParent.order.coupon_code})`}
                                                :
                                            </td>
                                            <td className={clsx(classes.td, 'td-tfoot', 'right')}>{eParent.creditmemo.shipping_amount}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={4} className={clsx(classes.td, 'right', classes.colSpan)}>Grand Total:</td>
                                            <td className={clsx(classes.td, 'total', 'right')}>{eParent.creditmemo.grand_total}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </Paper>
                    ))}
                </>
            )}
        </>
    );
};

export default PrintCreditMemoContent;
