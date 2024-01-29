/* eslint-disable */
import React, { Fragment } from 'react';
import Head from 'next/head';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Button from '@common_button';

import useStyles from '@sellermodules/order/pages/printinvoice/components/style';
import gqlSeller from '@sellermodules/storesetting/services/graphql';

const printInvoice = (props) => {
    const {
        t, data, storeLogo, pageConfig,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const { data: dataLogo } = gqlSeller.getSeller();

    const [show, setShow] = React.useState('non-hide');

    return (
        <>
            <Head>
                <title>{pageConfig.title}</title>
            </Head>
            <AppBar
                position="fixed"
                className={[classes.appBar, show].join(' ')}
            >
                <Toolbar>
                    <div
                        className={clsx(classes.toolbar, classes.swiftOmsLogo)}
                        onClick={() => router.push('/seller/order')}
                        aria-hidden="true"
                    >
                        <img alt="" src={storeLogo?.logo || '/assets/img/swiftoms_logo_expanded.png'} />
                    </div>

                    <div className={clsx(classes.btnPrint)}>
                        <Button
                            onClick={() => {
                                setShow('hide');
                                setTimeout(() => {
                                    window.print();
                                }, 100);
                                setTimeout(() => {
                                    setShow('non-hide');
                                }, 1000);
                            }}
                        >
                            <img alt="" src="/assets/img/layout/seller/print.svg" className="icon" />
                            {t('sellerorder:Print')}
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
            <div className={[classes.gap, show].join(' ')} />
            <div className='printContainer'>
                {data.map((dataInvoice, idx) => (
                    <div className="printData">
                        <Paper className={classes.container} key={idx}>
                            <div className={classes.invoiceContainer}>
                                <div className={classes.flex}>
                                    <div className={classes.divLogo}>
                                                    <img
                                                        alt={dataLogo?.getSeller?.name}
                                                        src={dataLogo?.getSeller?.logo !== '' ? dataLogo?.getSeller?.logo : '/assets/img/swiftoms_logo_expanded.png'}
                                                    />
                                                    <span className={classes.greyText}>{dataLogo?.getSeller?.name}</span>
                                                </div>
                                    <div className={classes.rightAlign}>
                                        <p className={[classes.primaryText, classes.px20].join(' ')}>{t('sellerorder:INVOICE')}</p>
                                        <p className={classes.tertieryText}>{dataInvoice.order_number}</p>
                                    </div>
                                </div>
                                <div className={classes.grid}>
                                    <div>
                                        <p className={[classes.primaryText, classes.px16].join(' ')}>{t('sellerorder:PUBLISHED_ON_BEHALF_OF')}</p>
                                        <div>
                                            <tr className={classes.grid}>
                                                <td className={[classes.tertieryText, classes.px15].join(' ')}>{t('sellerorder:Seller')}</td>
                                                <td className={clsx(classes.primaryText, 'fontWeight', classes.px15)}>
                                                    :
                                                    {' '}
                                                    {dataInvoice.seller}
                                                </td>
                                            </tr>
                                        </div>
                                    </div>
                                    <div>
                                        <p className={[classes.primaryText, classes.px16].join(' ')}>{t('sellerorder:FOR')}</p>
                                        <div>
                                            <tr className={classes.grid}>
                                                <td className={[classes.tertieryText, classes.px15].join(' ')}>{t('sellerorder:Buyer')}</td>
                                                <td className={clsx(classes.primaryText, 'fontWeight', classes.px15, classes.grid2)}>
                                                    :
                                                    <div>{dataInvoice.customer.name}</div>
                                                </td>
                                            </tr>
                                            <tr className={classes.grid}>
                                                <td className={[classes.tertieryText, classes.px15].join(' ')}>{t('sellerorder:Purchase_Date')}</td>
                                                <td className={clsx(classes.primaryText, 'fontWeight', classes.px15, classes.grid2)}>
                                                    :
                                                    <div>{dataInvoice.channel_order_date}</div>
                                                </td>
                                            </tr>
                                            <tr className={classes.grid}>
                                                <td className={[classes.tertieryText, classes.px15].join(' ')}>{t('sellerorder:Shipping_Address')}</td>
                                                <td className={clsx(classes.primaryText, 'fontWeight', classes.px15, classes.grid2)}>
                                                    :
                                                    <div>
                                                        {dataInvoice.customer.name}
                                                        {' '}
                                                        (
                                                        {dataInvoice.shipping_address.telephone}
                                                        )
                                                        <div className={classes.marginTop1} />
                                                        <span className={classes.tertieryText}>
                                                            {' '}
                                                            {dataInvoice.shipping_address.street}
                                                            {' '}
                                                            {dataInvoice.shipping_address.region}
                                                            {' '}
                                                            {dataInvoice.shipping_address.city}
                                                            {' '}
                                                            {dataInvoice.shipping_address.country_name}
                                                            {' '}
                                                            {dataInvoice.shipping_address.postcode}
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <table className={classes.table1}>
                                        <tbody>
                                            <tr>
                                                <th className={clsx(classes.primaryText, 'fontWeight', classes.px16, classes.leftAlign)}>
                                                    {t('sellerorder:Product_Info')}
                                                </th>
                                                <th className={clsx(classes.primaryText, 'fontWeight', classes.px16, classes.rightAlign)}>
                                                    {t('sellerorder:Amount')}
                                                </th>
                                                <th className={clsx(classes.primaryText, 'fontWeight', classes.px16, classes.rightAlign)}>
                                                    {t('sellerorder:Unit_Price')}
                                                </th>
                                                <th className={clsx(classes.primaryText, 'fontWeight', classes.px16, classes.rightAlign)}>
                                                    {t('sellerorder:Total_Price')}
                                                </th>
                                            </tr>
                                            {dataInvoice.items?.filter((item) => !item.isChild).map((item, i) => (
                                                <Fragment key={i}>
                                                    <tr>
                                                        <td className={classes.secondaryText}>{item.name}</td>
                                                        <td className={clsx(classes.primaryText, 'fontWeight', classes.px16)}>{item.qty}</td>
                                                        <td className={clsx(classes.primaryText, 'fontWeight', classes.px16)}>{item.price}</td>
                                                        <td className={clsx(classes.primaryText, 'fontWeight', classes.px16)}>{item.row_total}</td>
                                                    </tr>
                                                    {item.bundle_children?.map((child, ic) => (
                                                        <tr className="nopad" key={ic}>
                                                            <td className={clsx('nopad', classes.primaryText, 'fontLight', classes.px15)}>
                                                                {`- ${child.name}`}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </Fragment>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className={[classes.grid3, classes.borderBottom].join(' ')}>
                                        <div />
                                        <table className={classes.table2}>
                                            <tbody>
                                                <tr className={classes.grid}>
                                                    <td className={[classes.primaryText, classes.px16].join(' ')}>
                                                        {t('sellerorder:TOTAL_PRICE')}
                                                        {' '}
                                                        (
                                                        {dataInvoice.total_items}
                                                        {' '}
                                                        {t('sellerorder:ITEMS')}
                                                        )
                                                    </td>
                                                    <td className={[classes.primaryText, classes.px16, classes.rightAlign].join(' ')}>
                                                        {dataInvoice.subtotal}
                                                    </td>
                                                </tr>
                                                <tr className={classes.grid}>
                                                    <td className={[classes.tertieryText, classes.px16].join(' ')}>
                                                        {t('sellerorder:Discount')}
                                                        {dataInvoice.coupon_code && !dataInvoice.only_free_shipping_coupon_code
                                                            && ` (${dataInvoice.coupon_code})`}
                                                    </td>
                                                    <td className={[classes.tertieryText, classes.px16, classes.rightAlign].join(' ')}>
                                                        {dataInvoice.discount}
                                                    </td>
                                                </tr>
                                                <tr className={classes.grid}>
                                                    <td className={[classes.tertieryText, classes.px16].join(' ')}>
                                                        {t('sellerorder:Total_Shipping_Cost')}
                                                        {' '}
                                                        (
                                                        {dataInvoice.total_weight}
                                                        {' '}
                                                        {t('sellerorder:kg')}
                                                        {dataInvoice.coupon_code && !!dataInvoice.only_free_shipping_coupon_code
                                                            && ` (${dataInvoice.coupon_code})`}
                                                        )
                                                    </td>
                                                    <td className={[classes.tertieryText, classes.px16, classes.rightAlign].join(' ')}>
                                                        {dataInvoice.total_shipping_cost}
                                                    </td>
                                                </tr>
                                                <tr className={classes.grid}>
                                                    <td className={[classes.primaryText, classes.px15].join(' ')}>
                                                        {t('sellerorder:TOTAL_SALES')}
                                                    </td>
                                                    <td className={[classes.primaryText, classes.px16, classes.rightAlign].join(' ')}>
                                                        {dataInvoice.grand_total}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className={[classes.grid, classes.marginTop1].join(' ')}>
                                    <tr className={classes.grid}>
                                        <td className={[classes.tertieryText, classes.px15].join(' ')}>{t('sellerorder:Expedition')}</td>
                                        <td className={clsx(classes.primaryText, 'fontWeight', classes.px15)}>
                                            :
                                            {' '}
                                            {dataInvoice.expedition.provider}
                                            {' '}
                                            -
                                            {' '}
                                            {dataInvoice.expedition.service}
                                        </td>
                                    </tr>
                                    <div />
                                </div>
                                <div className={[classes.flex, classes.marginTop2].join(' ')}>
                                    <div>
                                        <p className={[classes.tertieryText, classes.px13].join(' ')}>
                                            {t('sellerorder:This_invoice_is_and_processed_by_computer')}
                                        </p>
                                        <p className={[classes.tertieryText, classes.px13].join(' ')}>
                                            {t('sellerorder:Please_contact')}
                                            {' '}
                                            <span className={[classes.secondaryText, classes.px13].join(' ')}>{t('sellerorder:customer_service')}</span>
                                            {' '}
                                            {t('sellerorder:if_you_need_assistance')}
                                        </p>
                                    </div>
                                    <div className={classes.lastUpdate}>
                                        <p className={[classes.tertieryText, classes.px13].join(' ')}>
                                            {t('sellerorder:Last_Updated')}
                                            :
                                            {dataInvoice.updated_at}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    </div>
                ))}
            </div>
            <style jsx>
                {`
                @page {
                    size: 21cm 29.7cm;
                    margin: 0 auto;
                }
                @media print {
                    .detailShipping { display: inline-block; }
                    .printContainer {
                        ${(data?.length || 0) > 1 ? '' : 'position: absolute;'}
                    }
                    .printData {
                        height: 95%;
                        overflow: hidden;
                        page-break-before: auto;
                    }
                }
                `}
            </style>
        </>
    );
};
export default printInvoice;
