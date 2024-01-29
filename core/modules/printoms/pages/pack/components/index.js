/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import useStyles from '@modules/printoms/pages/pack/components/style';

const PrintPickContent = (props) => {
    const {
        packList, storeLogo,
    } = props;
    const classes = useStyles();

    React.useEffect(() => {
        setTimeout(() => {
            window.print();
        }, 2000);
    }, [packList]);

    return (
        <>
            {(packList.dataPack) && (
                <>
                    {packList.dataPack.map((eParent) => (
                        <Paper className={classes.container} style={{ marginBottom: 10 }}>
                            <div className={classes.content}>
                                <img
                                    className="imgIcon"
                                    alt=""
                                    src={storeLogo?.logo || '/assets/img/swiftoms_logo_expanded.png'}
                                    style={{ maxHeight: 52 }}
                                />
                                <h2 className={classes.titleTop}>{packList.title}</h2>
                            </div>
                            <div className={clsx(classes.content, classes.wrapperColumn)}>
                                <div className="column">
                                    <h5 className={classes.titleSmall}>
                                        Shipment Date :
                                        {eParent.created_at}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        Shipment Number :
                                        {eParent.increment_id}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        Channel Order Number :
                                        {eParent.channel_order_increment_id}
                                    </h5>
                                </div>
                                <div className="column">
                                    {eParent.slot_no.map((slotArray) => (
                                        <h5 className={classes.titleSmall}>
                                            {(slotArray) && (
                                                <>{`Slot ${slotArray}`}</>
                                            )}
                                        </h5>
                                    ))}
                                </div>
                            </div>
                            <div className={clsx(classes.content, classes.wrapperColumn)}>
                                <div className="column">
                                    <h2 className={classes.title}>Sold to</h2>
                                    <h5 className={classes.titleSmall}>
                                        {eParent.shipping_address.firstname}
                                        {' '}
                                        {eParent.shipping_address.lastname}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        {eParent.shipping_address.street}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        {eParent.shipping_address.city}
                                        ,
                                        {eParent.shipping_address.region}
                                        ,
                                        {eParent.shipping_address.city}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        {eParent.shipping_address.postcode}
                                        ,
                                        {eParent.shipping_address.country_name}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        {eParent.shipping_address.telephone}
                                    </h5>
                                </div>
                                <div className="column">
                                    {(eParent.is_pickup === 1) && (
                                        <>
                                            <h2 className={classes.title}>Pickup info</h2>
                                            <h5 className={classes.titleSmall}>
                                                {eParent.pickup_info.name}
                                            </h5>
                                            <h5 className={classes.titleSmall}>
                                                {eParent.pickup_info.phone}
                                            </h5>
                                            <h5 className={classes.titleSmall}>
                                                {eParent.pickup_info.loc_details}
                                            </h5>
                                            <h5 className={classes.titleSmall}>
                                                {eParent.pickup_info.vehicle_number}
                                            </h5>
                                            <h5 className={classes.titleSmall}>
                                                {eParent.pickup_info.vehicle_desc}
                                            </h5>
                                            <h5 className={classes.titleSmall}>
                                                {eParent.pickup_info.notes}
                                            </h5>
                                        </>
                                    )}
                                    {(eParent.is_pickup === 0) && (
                                        <>
                                            <h2 className={classes.title}>Ship To</h2>
                                            <h5 className={classes.titleSmall}>
                                                {eParent.shipping_address.firstname}
                                                {' '}
                                                {eParent.shipping_address.lastname}
                                            </h5>
                                            <h5 className={classes.titleSmall}>
                                                {eParent.shipping_address.street}
                                            </h5>
                                            <h5 className={classes.titleSmall}>
                                                {eParent.shipping_address.city}
                                                ,
                                                {eParent.shipping_address.region}
                                                ,
                                                {eParent.shipping_address.city}
                                            </h5>
                                            <h5 className={classes.titleSmall}>
                                                {eParent.shipping_address.postcode}
                                                ,
                                                {eParent.shipping_address.country_name}
                                            </h5>
                                            <h5 className={classes.titleSmall}>
                                                {eParent.shipping_address.telephone}
                                            </h5>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className={classes.content}>
                                <h2 className={classes.title}>Shipping Method</h2>
                                <h5 className={classes.titleSmall}>
                                    {(eParent.channel_shipping_label) ? (
                                        <>
                                            {' '}
                                            {eParent.channel_shipping_label}
                                            {' '}
                                        </>
                                    ) : (
                                        <> - </>
                                    )}
                                </h5>
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
                            <div className={clsx(classes.content, classes.wrapperSign)}>
                                <div className="column">
                                    <h2 className={clsx(classes.title, 'sign')}>Created By</h2>
                                    <h5 className={clsx(classes.titleSmall, 'signText')}>
                                        {packList.createdBy}
                                    </h5>
                                </div>
                                <div className="column">
                                    <h2 className={clsx(classes.title, 'sign')}>Checked By</h2>
                                    <h5 className={clsx(classes.titleSmall, 'signText')}>
                                        {packList.checkedBy}
                                    </h5>
                                </div>
                                <div className="column">
                                    <h2 className={clsx(classes.title, 'sign')}>Approved By</h2>
                                    <h5 className={clsx(classes.titleSmall, 'signText')}>
                                        {packList.approvedBy}
                                    </h5>
                                </div>
                                <div className="column">
                                    <h2 className={clsx(classes.title, 'sign')}>Received By</h2>
                                    <h5 className={clsx(classes.titleSmall, 'signText')}>
                                        {packList.receivedBy}
                                    </h5>
                                </div>
                            </div>
                        </Paper>
                    ))}
                </>
            )}
        </>
    );
};

export default PrintPickContent;
