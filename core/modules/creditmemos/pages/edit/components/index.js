/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import useStyles from '@modules/creditmemos/pages/edit/components/style';

const creditmemosCreateContent = (props) => {
    const {
        creditmemoDetail,
        t,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const getClassByStatus = (status) => {
        if (status === 'failed') {
            return classes.statusFailed;
        }
        if (status === 'new') {
            return classes.statusProcessing;
        }
        if (status === 'success') {
            return classes.statusSuccess;
        }
        if (status === 'closed') {
            return classes.statusClosed;
        }
        if (status === 'allocating') {
            return classes.statusAllocating;
        }
        return classes.statusSuccess;
    };

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/return/creditmemos')}
                variant="contained"
                style={{ marginRight: 16 }}
            >
                <ChevronLeftIcon style={{
                    fontSize: 30,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                />
            </Button>
            <h2 className={classes.titleTop}>
                {t('creditmemos:View_Memo_')}
                {creditmemoDetail.incrementId}
            </h2>
            <Paper className={classes.container}>
                <div className={classes.contentHeader}>
                    <div className="divHeader">
                        <div className={getClassByStatus(creditmemoDetail.status)}>
                            {creditmemoDetail.status}
                        </div>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeaderWithIcon">
                            <img
                                src={creditmemoDetail.channelIcon}
                                alt=""
                                className="iconHeader"
                                onError={(event) => event.target.style.display = 'none'}
                            />
                            {creditmemoDetail.channelName}
                        </h5>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            {t('creditmemos:Channel_Order_Number')}
                        </h5>
                        <span className="spanHeader">{creditmemoDetail.channelOrderNumber}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            {t('creditmemos:Channel_Order_Date')}
                        </h5>
                        <span className="spanHeader">{creditmemoDetail.channelOrderDate}</span>
                    </div>
                </div>

                <div className={classes.content}>
                    <div className={classes.grid}>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{t('creditmemos:Customer_Info')}</h5>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_user.png" />
                                {creditmemoDetail.customerName}
                            </span>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_email.png" />
                                {creditmemoDetail.customerEmail}
                            </span>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_phone.png" />
                                {creditmemoDetail.billing.telephone}
                            </span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{t('creditmemos:Billing_Address')}</h5>
                            <span className={classes.orderLabel}>{creditmemoDetail.billing.street}</span>
                            <span className={classes.orderLabel}>{creditmemoDetail.billing.city}</span>
                            <span className={classes.orderLabel}>
                                {`${creditmemoDetail.billing.region}, 
                                ${creditmemoDetail.billing.postcode}, ${creditmemoDetail.billing.country_name}`}
                            </span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{t('creditmemos:Shipping_Address')}</h5>
                            <span className={classes.orderLabel}>{creditmemoDetail.shipping.street}</span>
                            <span className={classes.orderLabel}>{creditmemoDetail.shipping.city}</span>
                            <span className={classes.orderLabel}>
                                {`${creditmemoDetail.shipping.region},
                                ${creditmemoDetail.shipping.postcode}, ${creditmemoDetail.shipping.country_name}`}
                            </span>
                        </div>
                    </div>
                    <br />
                    <div className={classes.grid}>
                        <div className="grid-child" />
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{t('creditmemos:Payment_Method')}</h5>
                            <span className={classes.orderLabel}>{creditmemoDetail.paymentMethod}</span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{t('creditmemos:Shipping_Method')}</h5>
                            <span className={classes.orderLabel}>{creditmemoDetail.shippingMethod}</span>
                        </div>
                    </div>
                    <br />
                </div>
                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>{t('creditmemos:Items_to_Refund')}</h5>
                    <table className={classes.table}>
                        <tbody>
                            <tr className={classes.tr}>
                                <th className={classes.th}>{t('creditmemos:Product')}</th>
                                <th className={classes.th}>{t('creditmemos:Price')}</th>
                                <th className={classes.th}>{t('creditmemos:Qty')}</th>
                                <th className={classes.th}>{t('creditmemos:Qty_Refund')}</th>
                                <th className={classes.th}>{t('creditmemos:Subtotal')}</th>
                                <th className={classes.th}>{t('creditmemos:Tax_Amount')}</th>
                                <th className={classes.th}>{t('creditmemos:Discount_Amount')}</th>
                                <th className={classes.th}>{t('creditmemos:Row_Total')}</th>
                            </tr>
                            {creditmemoDetail.items?.map((e, i) => (
                                <React.Fragment key={i}>
                                    <tr>
                                        <td className={classes.td}>
                                            {e.name}
                                            <br />
                                            {t('creditmemos:SKU__')}
                                            {e.sku}
                                        </td>
                                        {e.bundle_children?.length ? null : (
                                            <>
                                                <td className={classes.td}>{e.price}</td>
                                                <td className={classes.td}>
                                                    {e.order_item.qty_ordered > 0
                                                        && (
                                                            <>
                                                                {t('creditmemos:Ordered__')}
                                                                {e.order_item.qty_ordered}
                                                                <br />
                                                            </>
                                                        )}
                                                    {e.order_item.qty_invoiced > 0
                                                        && (
                                                            <>
                                                                {t('creditmemos:Invoiced__')}
                                                                {e.order_item.qty_invoiced}
                                                                <br />
                                                            </>
                                                        )}
                                                    {e.order_item.qty_shipped > 0
                                                        && (
                                                            <>
                                                                {t('creditmemos:Shipped__')}
                                                                {e.order_item.qty_shipped}
                                                                <br />
                                                            </>
                                                        )}
                                                    {e.order_item.qty_refunded > 0
                                                        && (
                                                            <>
                                                                {t('creditmemos:Refunded__')}
                                                                {e.order_item.qty_refunded}
                                                                <br />
                                                            </>
                                                        )}
                                                    {e.order_item.qty_canceled > 0
                                                        && (
                                                            <>
                                                                {t('creditmemos:Canceled__')}
                                                                {e.order_item.qty_canceled}
                                                            </>
                                                        )}
                                                </td>
                                                <td className={classes.td}>{e.qty_to_refund}</td>
                                                <td className={classes.td}>{e.row_total}</td>
                                                <td className={classes.td}>{e.tax_amount || 0}</td>
                                                <td className={classes.td}>{e.discount_amount || 0}</td>
                                                <td className={classes.td}>{e.total_amount}</td>
                                            </>
                                        )}
                                    </tr>
                                    {e.bundle_children?.map((child) => (
                                        <tr>
                                            <td className={classes.td} style={{ paddingLeft: 10 }}>
                                                {`- ${child.name}`}
                                                <br />
                                                <span style={{ paddingLeft: 10 }}>
                                                    {t('creditmemos:SKU__')}
                                                    {child.sku}
                                                </span>
                                            </td>
                                            <td className={classes.td}>{child.price}</td>
                                            <td className={classes.td}>
                                                {child.order_item.qty_ordered > 0
                                                    && (
                                                        <>
                                                            {t('creditmemos:Ordered__')}
                                                            {child.order_item.qty_ordered}
                                                            <br />
                                                        </>
                                                    )}
                                                {child.order_item.qty_shipped > 0
                                                    && (
                                                        <>
                                                            {t('creditmemos:Shipped__')}
                                                            {child.order_item.qty_shipped}
                                                            <br />
                                                        </>
                                                    )}
                                                {child.order_item.qty_refunded > 0
                                                    && (
                                                        <>
                                                            {t('creditmemos:Refunded__')}
                                                            {child.order_item.qty_refunded}
                                                            <br />
                                                        </>
                                                    )}
                                                {child.order_item.qty_canceled > 0
                                                    && (
                                                        <>
                                                            {t('creditmemos:Canceled__')}
                                                            {child.order_item.qty_canceled}
                                                        </>
                                                    )}
                                            </td>
                                            <td className={classes.td}>{child.qty_to_refund}</td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.titleSmall} style={{ borderBottom: '1px solid #B1BCDB' }}>{t('creditmemos:Total')}</h5>
                    <div className={classes.gridTotal}>
                        <div />
                        <div style={{ paddingRight: 20 }}>
                            <table className={classes.table}>
                                <tbody>
                                    <tr className={classes.tr}>
                                        <th className={classes.th}>{t('creditmemos:Refund_Totals')}</th>
                                    </tr>
                                    <tr>
                                        <td className={classes.td}>{t('creditmemos:Subtotal')}</td>
                                        <td className={classes.td} style={{ textAlign: 'right' }}>
                                            {creditmemoDetail.subtotal}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={classes.td}>
                                            {t('creditmemos:Discount')}
                                            {creditmemoDetail.couponCode && !creditmemoDetail.onlyFreeShippingCouponCode
                                                && ` (${creditmemoDetail.couponCode})`}
                                        </td>
                                        <td className={classes.td} style={{ textAlign: 'right' }}>
                                            {creditmemoDetail.discount}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={classes.td}>
                                            {t('creditmemos:Refund_Shipping')}
                                            {creditmemoDetail.couponCode && !!creditmemoDetail.onlyFreeShippingCouponCode
                                                && ` (${creditmemoDetail.couponCode})`}
                                        </td>
                                        <td className={classes.td} style={{ textAlign: 'right' }}>
                                            {creditmemoDetail.refundShipping}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={classes.td}>{t('creditmemos:Adjusment_Refund')}</td>
                                        <td className={classes.td} style={{ textAlign: 'right' }}>
                                            {creditmemoDetail.adjustRefund}

                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={classes.td}>{t('creditmemos:Adjusment_Fee')}</td>
                                        <td className={classes.td} style={{ textAlign: 'right' }}>
                                            {creditmemoDetail.adjustFee}

                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            className={clsx(classes.td, classes.th)}
                                            style={{ fontWeight: 600 }}
                                        >
                                            {t('creditmemos:Grand_Total')}

                                        </td>
                                        <td className={clsx(classes.td, classes.th)} style={{ textAlign: 'right', fontWeight: 600 }}>
                                            {creditmemoDetail.grandTotal}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </Paper>
        </>
    );
};

export default creditmemosCreateContent;
