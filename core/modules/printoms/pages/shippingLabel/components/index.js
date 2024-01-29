/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import useStyles from '@modules/printoms/pages/shippingLabel/components/style';

const PrintPickContent = (props) => {
    const {
        shippingLabel,
    } = props;
    const classes = useStyles();
    // const [show, setShow] = useState('non-hide');

    React.useEffect(() => {
        setTimeout(() => {
            window.print();
        }, 2000);
    }, [shippingLabel]);

    return (
        <>
            {(shippingLabel.length) && (
                <>
                    {/* <div className={clsx(classes.containerBtn, show)}>
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
                            >
                                Print
                            </Button>
                        </div>
                    </div> */}
                    {shippingLabel.map((shipping) => (
                        <Paper id="print" className={classes.container}>
                            {shipping.map((eParent) => (
                                <div style={{ marginBottom: 10 }}>
                                    <div className={clsx(classes.content, classes.contentImg)}>
                                        {eParent.store_logo_url
                                            && <img className="imgIcon" alt="" src={eParent.store_logo_url} />}
                                        <div className={classes.shippingMethod}>
                                            <span>{eParent.shipping_method}</span>
                                            <img className="imgIcon" alt="" src={eParent.shipping_method_logo_url || ' '} />
                                        </div>
                                    </div>
                                    <div className={clsx(classes.content2, classes.wrapperColumn, 'borderTop')}>
                                        <div className="column">
                                            <h5 className={classes.barcodeContainer}>
                                                {eParent.order_number_barcode_url
                                                    && <img alt="barcode order" src={eParent.order_number_barcode_url} style={{ maxWidth: '80%' }} />}
                                                <br />
                                                {`Order Number : ${eParent.order_number || '-'}`}
                                            </h5>
                                        </div>
                                        <div className="column">
                                            <h5 className={classes.barcodeContainer}>
                                                {eParent.track_number_barcode_url
                                                    && <img alt="barcode order" src={eParent.track_number_barcode_url} style={{ maxWidth: '80%' }} />}
                                                <br />
                                                {`Airway Bill : ${eParent.track_number || '-'}`}
                                            </h5>
                                        </div>
                                    </div>

                                    <div className={clsx(classes.content2, classes.wrapperColumn, 'borderTop', 'borderBottom')}>
                                        <div className="column">
                                            <h5 className={classes.descName}>
                                                <span>{`Ship To : ${eParent.shipping_address.firstname} ${eParent.shipping_address.lastname}`}</span>
                                            </h5>
                                            {eParent.shipping_address.street}
                                            <br />
                                            {eParent.shipping_address.city}
                                            <br />
                                            {`${eParent.shipping_address.region}, ${eParent.shipping_address.postcode}`}
                                            <br />
                                            {eParent.shipping_address.country_name}
                                            <br />
                                            {eParent.shipping_address.telephone}
                                        </div>
                                        <div className="column">
                                            <h5 className={classes.descName}>
                                                <span>{`Seller : ${eParent.store.name}`}</span>
                                            </h5>
                                            {eParent.store.street}
                                            <br />
                                            {eParent.store.city}
                                            <br />
                                            {`${eParent.store.region}, ${eParent.store.post_code}`}
                                            <br />
                                            {eParent.store.country}
                                            <br />
                                            {eParent.store.telephone}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="pagebreak" />
                        </Paper>
                    ))}
                </>
            )}
            <style jsx>
                {`
                @page {
                    size: 21cm 29.7cm;
                    margin: 0 auto;
                }
                @media print {
                    .pagebreak { page-break-before: always; }
                }
                `}
            </style>
        </>
    );
};

export default PrintPickContent;
