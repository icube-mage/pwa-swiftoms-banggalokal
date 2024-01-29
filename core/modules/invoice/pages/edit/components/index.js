/* eslint-disable no-return-assign */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useStyles from '@modules/invoice/pages/edit/components/style';

const InvoiceEditContent = (props) => {
    const { invoice, t } = props;
    const classes = useStyles();
    const router = useRouter();

    const getClassByStatus = (state) => {
        if (state === 1) {
            return classes.statusSuccess;
        }
        if (state === 2) {
            return classes.statusAllocating;
        }
        return classes.statusFailed;
    };

    const transformArray = (arr = []) => {
        const res = arr.filter((item) => !item.parent_item_id).map((item) => ({ ...item, isChild: false }));
        arr.filter((item) => item.parent_item_id).forEach((item) => {
            const pIdx = res.findIndex((p) => p.entity_id === item.parent_item_id);
            // eslint-disable-next-line no-prototype-builtins
            if (pIdx >= 0 && res[pIdx] && res[pIdx].hasOwnProperty('children')) {
                res[pIdx] = {
                    ...res[pIdx],
                    children: [...res[pIdx].children, { ...item }],
                };
            } else {
                res[pIdx] = {
                    ...res[pIdx],
                    children: [{ ...item }],
                };
            }
        });
        return res;
    };

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/order/invoice')}
                variant="contained"
                style={{ marginRight: 16 }}
            >
                <ChevronLeftIcon
                    style={{
                        fontSize: 30,
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            </Button>
            <h2 className={classes.titleTop}>{`Detail Order #${invoice.incrementId}`}</h2>
            <Paper className={classes.container}>
                <div className={classes.contentHeader}>
                    <div className="divHeader">
                        <div className={getClassByStatus(invoice.state)}>{invoice.status}</div>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeaderWithIcon">
                            {invoice.channelIcon
                                ? (
                                    <img
                                        src={invoice.channelIcon}
                                        alt=""
                                        className="iconHeader"
                                        onError={(e) => (e.target.style.display = 'none')}
                                    />
                                )
                                : null}
                            {invoice.channelName}
                        </h5>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">{t('invoice:Channel_Order_Number')}</h5>
                        <span className="spanHeader">{invoice.channelOrderIncrementId}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">{t('invoice:Channel_Order_Date')}</h5>
                        <span className="spanHeader">{invoice.channelOrderDate}</span>
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.grid}>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{t('invoice:Customer_Info')}</h5>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_user.png" />
                                {invoice.customerName}
                            </span>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_email.png" />
                                {invoice.order.customer_email}
                            </span>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_phone.png" />
                                {invoice.shipping.telephone}
                            </span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{t('invoice:Billing_Address')}</h5>
                            <span className={classes.orderLabel}>{invoice.storeId}</span>
                            <span className={classes.orderLabel}>{invoice.billing.street}</span>
                            <span className={classes.orderLabel}>{invoice.billing.city}</span>
                            <span className={classes.orderLabel}>
                                {`${invoice.billing.region}, 
                                ${invoice.billing.postcode}, ${invoice.billing.country_id}`}
                            </span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{t('invoice:Shipping_Address')}</h5>
                            <span className={classes.orderLabel}>{invoice.storeId}</span>
                            <span className={classes.orderLabel}>{invoice.shipping.street}</span>
                            <span className={classes.orderLabel}>{invoice.shipping.city}</span>
                            <span className={classes.orderLabel}>
                                {`${invoice.shipping.region},
                                ${invoice.shipping.postcode}, ${invoice.shipping.country_id}`}
                            </span>
                        </div>
                    </div>
                    <br />
                    <div className={classes.grid}>
                        <div className="grid-child" />
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{t('invoice:Payment_Method')}</h5>
                            <span className={classes.orderLabel}>{invoice.order.payment_method}</span>
                        </div>
                    </div>
                    <br />
                    <div style={{ width: '100%' }}>
                        <div>
                            <h5 className={classes.titleSmall}>{t('invoice:Items_Invoiced')}</h5>
                        </div>
                        <div style={{ overflowX: 'auto', overflowY: 'hidden' }}>
                            <table className={classes.table}>
                                <thead>
                                    <tr className={classes.tr}>
                                        <th className={classes.th} style={{ paddingLeft: 0 }}>
                                            {t('invoice:SKU_Product')}
                                        </th>
                                        <th className={classes.th}>{t('invoice:Name')}</th>
                                        <th className={classes.th}>{t('invoice:Price')}</th>
                                        <th className={classes.th} style={{ textAlign: 'center' }}>
                                            {t('invoice:Qty')}
                                        </th>
                                        <th className={classes.th}>{t('invoice:Subtotal')}</th>
                                        <th className={classes.th}>{t('invoice:Discount_Amount')}</th>
                                        <th className={classes.th}>{t('invoice:Row_Total')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transformArray(invoice.items)?.map((e) => (
                                        <>
                                            <tr className={classes.tr}>
                                                <td className={classes.td} style={{ paddingLeft: 0 }}>
                                                    {e.sku}
                                                </td>
                                                <td className={classes.td}>{e.name}</td>
                                                <td className={classes.td}>{e.price}</td>
                                                <td className={classes.td} style={{ textAlign: 'center' }}>
                                                    {e.qty}
                                                </td>
                                                <td className={classes.td}>{e.subtotal || '0'}</td>
                                                <td className={classes.td}>{e.discount_amount || '0'}</td>
                                                <td className={classes.td}>{e.row_total}</td>
                                            </tr>
                                            {e?.children?.map((child) => (
                                                <tr className={classes.tr}>
                                                    <td className={classes.td} style={{ paddingLeft: 10 }}>
                                                        {`- ${child.sku}`}
                                                    </td>
                                                    <td className={classes.td}>{child.name}</td>
                                                    <td className={classes.td}>{child.price}</td>
                                                    <td className={classes.td} style={{ textAlign: 'center' }}>
                                                        {child.qty}
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.gridTotal}>
                        <div className="grid-child">
                            <h5 className={classes.titleSmallBlack}>{t('invoice:Invoice_Totals')}</h5>
                            <div className={classes.orderTotalContainer}>
                                <div className={classes.orderTotalItem}>{t('invoice:Subtotal')}</div>
                                <div className={classes.orderTotalItem} style={{ textAlign: 'right', paddingRight: '20px' }}>
                                    {invoice.subtotal || 0}
                                </div>
                            </div>
                            <div className={classes.orderTotalContainer}>
                                <div className={classes.orderTotalItem}>
                                    {t('invoice:Discount')}
                                    {invoice.couponCode && !invoice.onlyFreeShippingCouponCode
                                        && ` (${invoice.couponCode})`}
                                </div>
                                <div className={classes.orderTotalItem} style={{ textAlign: 'right', paddingRight: '20px' }}>
                                    {invoice.discount || 0}
                                </div>
                            </div>
                            <div className={classes.orderTotalContainer}>
                                <div className={classes.orderTotalItem}>
                                    {t('invoice:Shipping__Handling')}
                                    {invoice.couponCode && !!invoice.onlyFreeShippingCouponCode
                                        && ` (${invoice.couponCode})`}
                                </div>
                                <div className={classes.orderTotalItem} style={{ textAlign: 'right', paddingRight: '20px' }}>
                                    {invoice.shippingAmount || 0}
                                </div>
                            </div>
                            {invoice.aw_store_credit_amount
                                && (
                                    <div className={classes.orderTotalContainer}>
                                        <div className={classes.orderTotalItem}>{t('invoice:Store_Credit')}</div>
                                        <div className={classes.orderTotalItem} style={{ textAlign: 'right', paddingRight: '20px' }}>
                                            {invoice.aw_store_credit_amount}
                                        </div>
                                    </div>
                                )}
                            <div className={classes.orderTotalContainer}>
                                <div className={classes.orderTotalItem}>{t('invoice:Grand_Total')}</div>
                                <div className={classes.orderTotalItem} style={{ textAlign: 'right', paddingRight: '20px' }}>
                                    {invoice.grandTotal || 0}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Paper>
        </>
    );
};

export default InvoiceEditContent;
