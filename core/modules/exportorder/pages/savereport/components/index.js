/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import useStyles from '@modules/exportorder/pages/savereport/components/style';

const PrintPdfContent = (props) => {
    const {
        printPdf,
        aclCheckData,
        t,
    } = props;
    const classes = useStyles();

    React.useEffect(() => {
        if (aclCheckData.isAccessAllowed === true && printPdf?.data) {
            setTimeout(() => {
                window.print();
            }, 2000);
        }
    }, [printPdf]);

    return (
        <>
            {(printPdf.data) && (
                <>
                    {printPdf?.data?.map((eParent) => (
                        <Paper className={classes.container}>
                            <div className={classes.content}>
                                <h2 className={classes.titleTop}>{t('exportorder:Order')}</h2>
                                <h5 className={classes.titleSmall}>{`${t('exportorder:Print_Date')} : ${printPdf.print_date}`}</h5>
                            </div>
                            <div className={clsx(classes.content, classes.wrapperGrid)}>
                                <h5 className={classes.titleSmall}>
                                    {t('exportorder:Order_Date')}
                                </h5>
                                <h5 className={clsx(classes.titleSmall, 'gridColumn')}>
                                    {`: ${eParent.created_at}`}
                                </h5>
                                <h5 className={classes.titleSmall}>
                                    {t('exportorder:Channel_Order_Number')}
                                </h5>
                                <h5 className={clsx(classes.titleSmall, 'gridColumn')}>
                                    {`: ${eParent.channel_order_increment_id}`}
                                </h5>
                                <h5 className={classes.titleSmall}>
                                    {t('exportorder:Status_Order_Channel')}
                                </h5>
                                <h5 className={clsx(classes.titleSmall, 'gridColumn')}>
                                    {`: ${eParent.channel_order_status}`}
                                </h5>
                            </div>
                            <div className={clsx(classes.content, classes.wrapperColumn)}>
                                <div className="column">
                                    <h2 className={classes.title}>{t('exportorder:Billing_Address')}</h2>
                                    <h5 className={classes.titleSmall}>
                                        {`${eParent.billing_firstname} ${eParent.billing_lastname}`}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        {eParent.billing_street}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        {eParent.billing_city}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        {`${t('exportorder:No')} ${eParent.billing_telephone}`}
                                    </h5>
                                </div>
                                <div className="column">
                                    <h2 className={classes.title}>{t('exportorder:Shipping_Address')}</h2>
                                    <h5 className={classes.titleSmall}>
                                        {`${eParent.shipping_firstname} ${eParent.shipping_lastname}`}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        {eParent.shipping_street}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        {eParent.shipping_city}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        {`${t('exportorder:No')}: ${eParent.shipping_telephone}`}
                                    </h5>
                                </div>
                            </div>
                            <div className={classes.content}>
                                <table className={classes.table}>
                                    <tbody>
                                        <tr className={classes.tr}>
                                            <th className={classes.th}>{t('exportorder:SKU')}</th>
                                            <th className={classes.th}>{t('exportorder:Name')}</th>
                                            <th className={clsx(classes.th, 'alignRight')}>{t('exportorder:Qty')}</th>
                                            <th className={clsx(classes.th, 'alignRight')}>{t('exportorder:Base_Price')}</th>
                                            <th className={clsx(classes.th, 'alignRight')}>{t('exportorder:Sale_Price')}</th>
                                            <th className={clsx(classes.th, 'alignRight')}>{t('exportorder:Discount_Amount')}</th>
                                        </tr>
                                        {(eParent?.items || [{}]).map((z) => (
                                            <tr>
                                                <td className={classes.td}>{z.sku || '-'}</td>
                                                <td className={classes.td}>{z.name || '-'}</td>
                                                <td className={clsx(classes.td, 'alignRight')}>{z.qty || '-'}</td>
                                                <td className={clsx(classes.td, 'alignRight')}>{z.base_price || '-'}</td>
                                                <td className={clsx(classes.td, 'alignRight')}>{z.sell_price || '-'}</td>
                                                <td className={clsx(classes.td, 'alignRight')}>{z.discount_amount || '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className={clsx(classes.content, classes.wrapperGrid)}>
                                <div className="left">
                                    <h2 className={classes.title}>{' '}</h2>
                                    <h5 className={classes.titleSmall}>
                                        {t('exportorder:Payment_Method')}
                                        {' : '}
                                        {eParent.payment_method || '-'}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        {t('exportorder:Shipping_Method')}
                                        {' : '}
                                        {eParent.shipping_method}
                                    </h5>
                                </div>
                                <div className="right">
                                    <h2 className={classes.title}>{t('exportorder:Order_Total')}</h2>
                                    <div className={classes.wrapperGrid}>
                                        <h5 className={classes.titleSmall}>
                                            {t('exportorder:Subtotal')}
                                        </h5>
                                        <h5 className={clsx(classes.titleSmall, 'alignRight')}>
                                            {eParent.subtotal}
                                        </h5>
                                        <h5 className={classes.titleSmall}>
                                            {t('exportorder:Discount')}
                                            {eParent.coupon_code && !eParent.only_free_shipping_coupon_code
                                                && ` (${eParent.coupon_code})`}
                                        </h5>
                                        <h5 className={clsx(classes.titleSmall, 'alignRight')}>
                                            {eParent.discount}
                                        </h5>
                                        <h5 className={classes.titleSmall}>
                                            {t('exportorder:Shipping_Cost')}
                                            {eParent.coupon_code && !!eParent.only_free_shipping_coupon_code
                                                && ` (${eParent.coupon_code})`}
                                        </h5>
                                        <h5 className={clsx(classes.titleSmall, 'alignRight')}>
                                            {eParent.channel_shipping_cost}
                                        </h5>
                                        <h5 className={classes.titleSmall}>
                                            {t('exportorder:Grand_Total')}
                                        </h5>
                                        <h5 className={clsx(classes.titleSmall, 'alignRight')}>
                                            {eParent.channel_grand_total}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <hr className={classes.hr} />
                        </Paper>
                    ))}
                </>
            )}
        </>
    );
};

export default PrintPdfContent;
