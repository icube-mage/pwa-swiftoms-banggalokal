/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import useStyles from '@modules/printoms/pages/address/components/style';

const PrintAdressContent = (props) => {
    const {
        addressList,
    } = props;
    const classes = useStyles();
    const [show, setShow] = useState('non-hide');

    const iconFilter = (channel_code) => {
        if (channel_code) {
            const codeExploded = channel_code.split('_');
            const code = codeExploded[1];
            if (code.toLowerCase().includes('swi')) {
                return '/assets/img/print_icon/swi.png';
            }
            if (code.toLowerCase().includes('bklp')) {
                return '/assets/img/print_icon/bklp.png';
            }
            if (code.toLowerCase().includes('blib')) {
                return '/assets/img/print_icon/blib.png';
            }
            if (code.toLowerCase().includes('jdid')) {
                return '/assets/img/print_icon/jdid.png';
            }
            if (code.toLowerCase().includes('lzda')) {
                return '/assets/img/print_icon/lzda.png';
            }
            if (code.toLowerCase().includes('shpe')) {
                return '/assets/img/print_icon/shpe.png';
            }
            if (code.toLowerCase().includes('srcl')) {
                return '/assets/img/print_icon/srcl.png';
            }
            if (code.toLowerCase().includes('tkpd')) {
                return '/assets/img/print_icon/tkpd.png';
            }
            if (code.toLowerCase().includes('zlra')) {
                return '/assets/img/print_icon/zlra.png';
            }
            return `/assets/img/print_icon/${code}.png`;
        }
        return null;
    };

    return (
        <>
            {(addressList.dataAddress) && (
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
                    {addressList.dataAddress.map((eParent) => (
                        <Paper className={classes.container}>
                            <div className={clsx(classes.content, classes.headerImage)}>
                                <img
                                    className="imgIcon"
                                    alt=""
                                    src={iconFilter(eParent.channel.channel_code)}
                                    onError={(event) => event.target.style.display = 'none'}
                                />
                                <h5 className={clsx(classes.titleSmall, 'headerTitle')}>
                                    {`Print Date: ${addressList.date}`}
                                </h5>
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
                                        SHIPPING METHOD:
                                        {' '}
                                        <strong>{eParent.channel_shipping_label}</strong>
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        {`Shipping Cost: ${eParent.shipping_amount}`}
                                        <br />
                                    </h5>
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
                                        {`Order Date ${eParent.order_created_at}`}
                                        <br />
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        Seller:
                                        <br />
                                        <strong>{eParent.store_name}</strong>
                                        <br />
                                        {eParent.store_telephone}
                                    </h5>
                                    <br />
                                    <br />
                                    <h5 className={classes.titleSmall}>
                                        Airwaybill Number
                                        <br />
                                        {eParent.track_barcode
                                        && <img alt="barcode awb" src={eParent.track_barcode} />}
                                        <br />
                                        {eParent.track_number}
                                    </h5>
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
                                    <br />
                                    <h5 className={classes.titleSmall}>
                                        <strong>Detail Goods: </strong>
                                        {eParent.store_category}
                                    </h5>
                                </div>
                            </div>
                            <div className={classes.content}>
                                <table className={classes.table}>
                                    <tbody>
                                        <tr className={classes.tr}>
                                            <th className={classes.th}>SKU</th>
                                            <th className={classes.th}>Name</th>
                                            <th className={classes.th}>Qty</th>
                                        </tr>
                                        {eParent.items.map((z) => (
                                            <tr>
                                                <td className={classes.td}>{z.sku}</td>
                                                <td className={classes.td}>{z.name}</td>
                                                <td className={classes.td}>{z.qty}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className={classes.content}>
                                <h5 className={classes.titleSmall}>
                                    <strong>NOTES:</strong>
                                    {eParent.notes}
                                </h5>
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

export default PrintAdressContent;
