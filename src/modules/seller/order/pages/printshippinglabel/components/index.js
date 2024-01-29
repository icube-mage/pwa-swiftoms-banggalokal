/* eslint-disable */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react';
import Head from 'next/head';
import clsx from 'clsx';
import { formatPriceNumber } from '@helper_currency';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@common_button';
import useStyles from '@sellermodules/order/pages/printshippinglabel/components/style';
import { useRouter } from 'next/router';

import gqlSeller from '@sellermodules/storesetting/services/graphql';

const PrintLabelContent = (props) => {
    const {
        shippingLabel, t, storeLogo, pageConfig,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const { data } = gqlSeller.getSeller();

    const [show, setShow] = useState('non-hide');
    const [checked, setChecked] = React.useState(new Array(shippingLabel?.[0]?.length).fill(false));

    const handelChecked = (event, index) => {
        const temp = [...checked];
        temp[index] = event;
        setChecked(temp);
    };

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

            {!!shippingLabel.length && (
                <div className='printContainer'>
                    {shippingLabel.map((eParent, i) => (
                        <div className="printData">
                            <Paper className={classes.container}>
                                <div className={classes.labelContainer}>
                                    <div className={classes.labelContent}>
                                        <span className={[classes.titleLabel, show].join(' ')}>{t('sellerorder:SHIPPING_LABEL_SETTINGS')}</span>
                                        <div className={classes.detailContainer}>
                                            <div className={classes.detailShipping}>
                                                <div className={classes.shippingContent}>
                                                    <div className={classes.divLogo}>
                                                        <img
                                                            alt={data?.getSeller?.name}
                                                            src={data?.getSeller?.logo !== '' ? data?.getSeller?.logo : '/assets/img/swiftoms_logo_expanded.png'}
                                                        />
                                                        <span className={classes.greyText}>{data?.getSeller?.name}</span>
                                                    </div>
                                                    <span className={classes.greyText}>{eParent.order_number}</span>
                                                </div>
                                                <div className={classes.shippingContent}>
                                                    <div className={classes.shippingNumber}>
                                                        <div style={{ alignSelf: 'center', marginTop: '6px' }}>{eParent.track_number || '-'}</div>
                                                    </div>
                                                </div>
                                                <div className={classes.shippingContent}>
                                                    <div className={classes.expedition}>
                                                        <div className={classes.provider}>
                                                            <span className={classes.expeditionLabel}>{eParent.expedition.provider || '-'}</span>
                                                            <span className={clsx(classes.greyText, classes.greyLabel)}>{eParent.expedition.service || '-'}</span>
                                                        </div>
                                                        <div className={classes.provider}>
                                                            <span className={classes.expeditionLabel}>{t('sellerorder:Weight_')}</span>
                                                            <span className={clsx(classes.greyText, classes.greyLabel)}>
                                                                {eParent.weight || '-'}
                                                                {' '}
                                                                Kg
                                                            </span>
                                                        </div>
                                                        <div className={classes.provider}>
                                                            <span className={classes.expeditionLabel}>
                                                                {t('sellerorder:Shipping__Handling')}
                                                                {' '}
                                                                :
                                                            </span>
                                                            <span className={clsx(classes.greyText, classes.greyLabel)}>{formatPriceNumber(eParent.shipping_amount)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={classes.shippingDetail}>
                                                    <div className={classes.provider}>
                                                        <div className={classes.row}>
                                                            <span className={clsx(classes.greyText, 'label')}>
                                                                {t('sellerorder:Receiver_')}
                                                                {' '}
                                                                {' '}
                                                            </span>
                                                            <span className={classes.name}>
                                                                {eParent.customer.name}
                                                                {' '}
                                                                {'('}
                                                                {eParent.shipping_address.telephone}
                                                                {')'}
                                                            </span>
                                                        </div>
                                                        <div className={classes.address}>
                                                            <span className={classes.smallGreyText}>
                                                                {eParent.shipping_address.street}
                                                                ,
                                                                {' '}
                                                                {eParent.shipping_address.city}
                                                                ,
                                                                {' '}
                                                                {eParent.shipping_address.postcode}
                                                                ,
                                                                {' '}
                                                                {eParent.shipping_address.region}
                                                                ,
                                                                {' '}
                                                                {eParent.shipping_address.country_name}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className={classes.provider}>
                                                        <div className={classes.row}>
                                                            <span className={clsx(classes.greyText, 'label')}>
                                                                {t('sellerorder:Sender_')}
                                                                {' '}
                                                                {' '}
                                                            </span>
                                                            <span className={classes.name}>
                                                                {eParent.store.name}
                                                            </span>
                                                        </div>
                                                        <div className={classes.address}>
                                                            <span className={classes.smallGreyText}>
                                                                {'('}
                                                                {eParent.store.telephone}
                                                                {')'}
                                                                <br />
                                                                {eParent.store.city}
                                                                ,
                                                                {' '}
                                                                {eParent.store.region}
                                                                ,
                                                                {' '}
                                                                {eParent.store.post_code}
                                                                ,
                                                                {' '}
                                                                {eParent.shipping_address.country_name}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={classes.shippingDetail}>
                                                    <div className={classes.shippingNumber}>
                                                        <div className={classes.smallGreyText} style={{ alignSelf: 'center', marginTop: '10px', fontWeight: 'normal' }}>
                                                            {t('sellerorder:Seller_doesn’t_have_to_pay_anything_to_the_courier')}
                                                        </div>
                                                    </div>
                                                </div>
                                                {checked[i] === true ? (
                                                    <>
                                                        <div className={classes.productList}>
                                                            <div className={clsx(classes.productList, 'productContainer')}>
                                                                <span className={clsx(classes.productList, 'productLabel')}>{t('sellerorder:Product')}</span>
                                                                <span className={clsx(classes.productList, 'productLabel')}>{t('sellerorder:SKU')}</span>
                                                                <span className={clsx(classes.productList, 'productLabel')}>{t('sellerorder:Qty')}</span>
                                                            </div>
                                                        </div>
                                                        <div className={classes.productDetails}>
                                                            {eParent.items?.filter((item) => !item.isChild)?.map((item, idx) => (
                                                                <div className={clsx(classes.productContainer,
                                                                    idx === eParent.items?.filter((it) => !it.isChild)?.length - 1 && 'last')}
                                                                >
                                                                    <div className={clsx(classes.productDetails, 'productContainer')}>
                                                                        <span className={clsx(classes.productDetails, 'productLabel', 'items')}>
                                                                            {item.name}
                                                                        </span>
                                                                        <span className={clsx(classes.productDetails, 'productLabel', 'dark')}>
                                                                            {item.bundle_children?.length ? '' : item.vendor_sku || item.sku}
                                                                        </span>
                                                                        <span className={clsx(classes.productDetails, 'productLabel', 'dark')}>
                                                                            {item.qty}
                                                                        </span>
                                                                    </div>
                                                                    {item.bundle_children?.map((child) => (
                                                                        <div className={clsx(classes.productDetails, 'productContainer', 'last')}>
                                                                            <span className={clsx(classes.productDetails, 'productLabel', 'dark')}>
                                                                                {`- ${child.name}`}
                                                                            </span>
                                                                            <span className={clsx(classes.productDetails, 'productLabel', 'dark')}>
                                                                                {child.vendor_sku || child.sku}
                                                                            </span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className={classes.orderNumber}>
                                                            {eParent.order_number}
                                                        </div>
                                                    </>
                                                ) : null}
                                            </div>
                                            <div className={classes.detail}>
                                                <div style={{ borderBottom: 'none', display: 'flex', flexDirection: 'row' }}>
                                                    <FormControl className={classes.checkbox}>
                                                        <div className={clsx(classes.checkbox, 'title')}>{t('sellerorder:Additional_Info')}</div>
                                                        <FormControlLabel
                                                            className={clsx(classes.checkbox, 'label')}
                                                            value="checked"
                                                            control={(
                                                                <Checkbox
                                                                    checked={checked[i]}
                                                                    name={`items[${eParent}]`}
                                                                    value={eParent.order_number.value}
                                                                    onChange={(e) => handelChecked(e.target.checked, i)}
                                                                />
                                                            )}
                                                            label={t('sellerorder:Print_with_Product_List')}
                                                        />
                                                    </FormControl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                        </div>
                    ))}
                </div>
            )}
            <style jsx>
                {`
                @page {
                    size: 21cm 29.7cm;
                    margin: 0 auto;
                }
                @media print {
                    .detailShipping { display: inline-block; }
                    .printContainer {
                        ${(shippingLabel.length || 0) > 1 ? '' : 'position: absolute;'}
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

export default PrintLabelContent;
