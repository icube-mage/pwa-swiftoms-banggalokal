/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import useStyles from '@modules/creditmemos/pages/create/components/style';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const creditmemosCreateContent = (props) => {
    const {
        formik,
        creditmemoDetail,
        parentId,
        total,
        canAdjFee,
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

    const iconFilter = (channel_code) => {
        if (channel_code) {
            if (channel_code.toLowerCase().includes('swi')) {
                return '/assets/img/dashboard/channel_official.png';
            }
            if (channel_code.toLowerCase().includes('bklp')) {
                return '/assets/img/dashboard/channel_bukalapak.svg';
            }
            if (channel_code.toLowerCase().includes('blib')) {
                return '/assets/img/dashboard/channel_blibli.png';
            }
            if (channel_code.toLowerCase().includes('jdid')) {
                return '/assets/img/dashboard/channel_jd.png';
            }
            if (channel_code.toLowerCase().includes('lzda')) {
                return '/assets/img/dashboard/channel_lazada.png';
            }
            if (channel_code.toLowerCase().includes('shpe')) {
                return '/assets/img/dashboard/channel_shopee.png';
            }
            if (channel_code.toLowerCase().includes('srcl')) {
                return '/assets/img/dashboard/channel_sirclo.png';
            }
            if (channel_code.toLowerCase().includes('tkpd')) {
                return '/assets/img/dashboard/channel_tokopedia.png';
            }
            if (channel_code.toLowerCase().includes('zlra')) {
                return '/assets/img/dashboard/channel_zalora.png';
            }
            return `/assets/img/dashboard/${channel_code}.png`;
        }
        return null;
    };

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push(`/return/managerma/edit/${parentId}`)}
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
                {t('creditmemos:New_Memo_')}
                {creditmemoDetail.entityId}
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
                                src={iconFilter(creditmemoDetail.channelCode)}
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
                        <span className="spanHeader">{creditmemoDetail.orderNumber}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            {t('creditmemos:Channel_Order_Date')}
                        </h5>
                        <span className="spanHeader">{creditmemoDetail.orderDate}</span>
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
                                <th className={classes.th}>{t('creditmemos:Qty_to_Refund')}</th>
                                <th className={classes.th}>{t('creditmemos:Subtotal')}</th>
                                <th className={classes.th}>{t('creditmemos:Tax_Amount')}</th>
                                <th className={classes.th}>{t('creditmemos:Discount_Amount')}</th>
                                <th className={classes.th}>{t('creditmemos:Row_Total')}</th>
                            </tr>
                            {formik.values.items?.map((e, i) => (
                                <tr key={i}>
                                    <td className={classes.td} style={{ paddingLeft: e.isChild ? 10 : 0 }}>
                                        {e.isChild ? `- ${e.name}` : e.name}
                                        <br />
                                        <span style={{ paddingLeft: e.isChild ? 10 : 0 }}>
                                            {t('creditmemos:SKU__')}
                                            {e.sku}
                                        </span>
                                    </td>
                                    <td className={classes.td}>
                                        {
                                            e.isChild
                                                ? (
                                                    <>
                                                        <OutlinedInput
                                                            name={`items[${i}].price`}
                                                            value={e.price}
                                                            onChange={formik.handleChange}
                                                            classes={{
                                                                input: classes.fieldInputPrice,
                                                                root: classes.fieldRootPrice,
                                                            }}
                                                            startAdornment={(
                                                                <InputAdornment position="start">
                                                                    <span style={{ fontSize: 14 }}>{t('creditmemos:IDR')}</span>
                                                                </InputAdornment>
                                                            )}
                                                            error={!!(formik.touched.items?.length && formik.touched.items[i]?.price
                                                                    && formik.errors.items?.length && formik.errors.items[i]?.price)}
                                                        />
                                                        <br />
                                                        <span className={classes.errorText}>
                                                            {(formik.touched.items?.length && formik.touched.items[i]?.price
                                                                    && formik.errors.items?.length && formik.errors.items[i]?.price) || ''}
                                                        </span>
                                                    </>
                                                )
                                                : e.price
                                        }

                                    </td>
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
                                                        {' '}
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
                                    {e.isChild ? null : (
                                        <>
                                            <td className={classes.td}>{e.row_total}</td>
                                            <td className={classes.td}>{e.tax_amount || 0}</td>
                                            <td className={classes.td}>{e.discount_amount || 0}</td>
                                            <td className={classes.td}>{e.total_amount}</td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={classes.content}>
                    <div className={classes.gridTotal}>
                        <div style={{ paddingRight: 20 }}>
                            <table className={classes.table}>
                                <tbody>
                                    <tr className={classes.tr}>
                                        <th className={classes.th}>{t('creditmemos:Refund_Totals')}</th>
                                    </tr>
                                    <tr>
                                        <td className={classes.td}>{t('creditmemos:Subtotal')}</td>
                                        <td className={classes.td} style={{ textAlign: 'right' }}>
                                            {total.sub}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={classes.td}>
                                            {t('creditmemos:Discount')}
                                            {creditmemoDetail.couponCode && ` (${creditmemoDetail.couponCode})`}
                                        </td>
                                        <td className={classes.td} style={{ textAlign: 'right' }}>
                                            {creditmemoDetail.discount}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={classes.td}>{t('creditmemos:Refund_Shipping')}</td>
                                        <td className={classes.td}>
                                            <OutlinedInput
                                                name="shipping_amount"
                                                value={formik.values.shipping_amount}
                                                onChange={formik.handleChange}
                                                classes={{
                                                    input: classes.fieldInput,
                                                    root: classes.fieldRoot,
                                                }}
                                                startAdornment={(
                                                    <InputAdornment position="start">
                                                        <span style={{ fontSize: 14 }}>{t('creditmemos:IDR')}</span>
                                                    </InputAdornment>
                                                )}
                                                error={!!(formik.touched.shipping_amount && formik.errors.shipping_amount)}
                                            />
                                            <br />
                                            <span className={classes.errorText}>
                                                {(formik.touched.shipping_amount && formik.errors.shipping_amount) || ''}
                                            </span>
                                        </td>
                                    </tr>
                                    {canAdjFee
                                        && (
                                            <>
                                                <tr>
                                                    <td className={classes.td}>{t('creditmemos:Adjusment_Refund')}</td>
                                                    <td className={classes.td}>
                                                        <OutlinedInput
                                                            name="adjustment_positive"
                                                            value={formik.values.adjustment_positive}
                                                            onChange={formik.handleChange}
                                                            classes={{
                                                                input: classes.fieldInput,
                                                                root: classes.fieldRoot,
                                                            }}
                                                            startAdornment={(
                                                                <InputAdornment position="start">
                                                                    <span style={{ fontSize: 14 }}>{t('creditmemos:IDR')}</span>
                                                                </InputAdornment>
                                                            )}
                                                            error={!!(formik.touched.adjustment_positive && formik.errors.adjustment_positive)}
                                                        />
                                                        <br />
                                                        <span className={classes.errorText}>
                                                            {(formik.touched.adjustment_positive && formik.errors.adjustment_positive) || ''}
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className={classes.td}>{t('creditmemos:Adjusment_Fee')}</td>
                                                    <td className={classes.td}>
                                                        <OutlinedInput
                                                            name="adjustment_negative"
                                                            value={formik.values.adjustment_negative}
                                                            onChange={formik.handleChange}
                                                            classes={{
                                                                input: classes.fieldInput,
                                                                root: classes.fieldRoot,
                                                            }}
                                                            startAdornment={(
                                                                <InputAdornment position="start">
                                                                    <span style={{ fontSize: 14 }}>{t('creditmemos:IDR')}</span>
                                                                </InputAdornment>
                                                            )}
                                                            error={!!(formik.touched.adjustment_negative && formik.errors.adjustment_negative)}
                                                        />
                                                        <br />
                                                        <span className={classes.errorText}>
                                                            {(formik.touched.adjustment_negative && formik.errors.adjustment_negative) || ''}
                                                        </span>
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                    <tr>
                                        <td className={clsx(classes.td, classes.th)} style={{ fontWeight: 600 }}>
                                            {t('creditmemos:Grand_Total')}

                                        </td>
                                        <td className={clsx(classes.td, classes.th)} style={{ textAlign: 'right', fontWeight: 600 }}>
                                            {total.grand}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div style={{ paddingLeft: 20 }}>
                            <span className={classes.th} style={{ fontWeight: 600, paddingLeft: 0 }}>{t('creditmemos:Credit_Memo_Comments')}</span>
                            <td className={classes.td} style={{ paddingLeft: 0 }}>
                                {t('creditmemos:Comment_Text')}
                            </td>

                            <TextField
                                className={clsx(classes.fieldRootNote, 'full')}
                                variant="outlined"
                                name="comment_text"
                                value={formik.values.comment_text}
                                onChange={formik.handleChange}
                                fullWidth
                                multiline
                                rows={3}
                            />
                            <FormGroup className={classes.formgroup}>
                                <FormControlLabel
                                    control={(
                                        <Checkbox
                                            name="comment_customer_notify"
                                            checked={formik.values.comment_customer_notify}
                                            onChange={formik.handleChange}
                                        />
                                    )}
                                    className={classes.controlLabel}
                                    classes={{ root: classes.rootLabel }}
                                    label={t('creditmemos:Append_Comments')}
                                />
                                <FormControlLabel
                                    control={(
                                        <Checkbox
                                            name="send_email"
                                            checked={formik.values.send_email}
                                            onChange={formik.handleChange}
                                        />
                                    )}
                                    className={classes.controlLabel}
                                    classes={{ root: classes.rootLabel }}
                                    label={t('creditmemos:Email_Copy_of_Credit_Memo')}
                                />
                            </FormGroup>
                        </div>
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        onClick={() => {
                            formik.setFieldValue('action', 'submit');
                            setTimeout(() => { formik.handleSubmit(); }, 500);
                        }}
                        variant="contained"
                        style={{ marginRight: 10 }}
                    >
                        {t('creditmemos:Submit')}
                    </Button>
                    <Button
                        className={clsx(classes.btn, 'reverse')}
                        onClick={() => {
                            formik.setFieldValue('action', 'calculate');
                            setTimeout(() => { formik.handleSubmit(); }, 500);
                        }}
                        variant="contained"
                    >
                        {t('creditmemos:Calculate_Totals')}
                    </Button>
                </div>

            </Paper>
        </>
    );
};

export default creditmemosCreateContent;
