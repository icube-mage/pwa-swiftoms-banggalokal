/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import useStyles from '@modules/printoms/pages/invoice/components/style';

const PrintInvoiceContent = (props) => {
    const {
        invoiceList, storeLogo,
    } = props;
    const classes = useStyles();
    const [show, setShow] = useState('non-hide');

    return (
        <>
            {(invoiceList.datainvoice) && (
                <>
                    <div className={classes.containerBtn}>
                        <div className={classes.content}>
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
                                className={show}
                            >
                                Print
                            </Button>
                        </div>
                    </div>
                    {invoiceList.datainvoice.map((eParent) => (
                        <Paper className={classes.container}>
                            <div className={clsx(classes.content, classes.headerImage)}>
                                <img className="imgIcon" alt="" src={`/assets/img/print_icon/${eParent.channel.channel_name}.png`} />
                                <h5 className={clsx(classes.titleSmall, 'headerTitle')}>
                                    {`Print Date: ${invoiceList.date}`}
                                </h5>
                            </div>
                            <div className={clsx(classes.content, classes.contentImg)}>
                                <img
                                    className="imgIcon"
                                    alt=""
                                    src={storeLogo?.logo || '/assets/img/swiftoms_logo_expanded.png'}
                                    style={{ maxHeight: 52 }}
                                />
                            </div>
                            <div className={clsx(classes.content, classes.wrapperColumn)}>
                                <div className="column">
                                    <h5 className={classes.titleSmall}>
                                        {`Order Number ${eParent.channel.channel_name}`}
                                        <br />
                                        {eParent.ref_barcode
                                            && <img alt="barcode order" src={eParent.ref_barcode} />}
                                        <br />
                                        {eParent.marketplace_order_number}
                                    </h5>
                                </div>
                                <div className="column">
                                    <h5 className={classes.titleSmall}>
                                        SO Number
                                        <br />
                                        {eParent.so_barcode
                                            && <img alt="barcode so" src={eParent.so_barcode} />}
                                        <br />
                                        {eParent.order_increment_id}
                                    </h5>
                                    <br />
                                </div>
                                <div className="column">
                                    <h5 className={classes.titleSmall}>
                                        SHIPPING ADDRESS:
                                        <br />
                                        {`${eParent.shipping_address.firstname} ${eParent.shipping_address.lastname}`}
                                        <br />
                                        {eParent.shipping_address.street}
                                        <br />
                                        {`${eParent.shipping_address.city}, ${eParent.shipping_address.region}`}
                                        <br />
                                        {eParent.shipping_address.postcode}
                                        <br />
                                        {eParent.shipping_address.country_id}
                                        <br />
                                        {`T: ${eParent.shipping_address.telephone}`}
                                    </h5>
                                </div>
                                <div className="column">
                                    <h5 className={classes.titleSmall}>
                                        {`Order Date ${eParent.order_created_at}`}
                                        <br />
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        {eParent.store_name || '-'}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        PAYMENT METHOD:
                                        {' '}
                                        <strong>{eParent.channel_payment_method}</strong>
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        SHIPPING METHOD:
                                        {' '}
                                        <strong>{eParent.channel_shipping_label}</strong>
                                    </h5>
                                    <br />
                                </div>
                            </div>
                            <div className={classes.content}>
                                <table className={classes.table}>
                                    <tbody>
                                        <tr className={classes.tr}>
                                            <th className={classes.th}>SKU</th>
                                            <th className={classes.th}>Product Title</th>
                                            <th className={classes.th}>Price</th>
                                            <th className={classes.th}>Qty</th>
                                            <th className={classes.th}>Amount</th>
                                        </tr>
                                        {eParent.items.map((z) => (
                                            <tr>
                                                <td className={classes.td}>{z.sku}</td>
                                                <td className={classes.td}>{z.name}</td>
                                                <td className={classes.td}>{z.price}</td>
                                                <td className={classes.td}>{z.qty}</td>
                                                <td className={classes.td}>{z.amount}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan="4" className={clsx(classes.td, classes.colSpan)}>Subtotal</td>
                                            <td className={classes.td}>{eParent.subtotal}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="4" className={clsx(classes.td, classes.colSpan)}>Discount</td>
                                            <td className={classes.td}>{eParent.discount_amount}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="4" className={clsx(classes.td, classes.colSpan)}>Shipping</td>
                                            <td className={classes.td}>{eParent.shipping_amount}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="4" className={clsx(classes.td, classes.colSpan)}>Grand Total</td>
                                            <td className={classes.td}>{eParent.grand_total}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={clsx(classes.content, classes.textCenter)}>
                                <h5 className={classes.titleSmall}>
                                    <strong>THANK YOU FOR SHOPPING WITH US</strong>
                                </h5>
                            </div>
                        </Paper>
                    ))}
                </>
            )}
        </>
    );
};

export default PrintInvoiceContent;
