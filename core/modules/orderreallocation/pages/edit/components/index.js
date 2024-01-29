/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */

import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Autocomplete from '@common_autocomplete';
import ScrollDialog from 'core/modules/commons/ScrollDialog';
import clsx from 'clsx';
import gqlService from '@modules/orderreallocation/services/graphql';
import useStyles from '@modules/orderreallocation/pages/edit/components/style';

const orderreallocationEditContent = (props) => {
    const {
        formik,
        reallocationDetail,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getCompanyReallocation, getCompanyReallocationRes] = gqlService.getCompanyReallocation();
    const [getLocationReallocation, getLocationReallocationRes] = gqlService.getLocationReallocation();

    const dataLoc = [];
    const varian = (idValue, skuValue) => {
        const { loading, data, error } = gqlService.getAvailabilityPerSku({
            id: idValue,
            sku: skuValue,
        });
        if (loading || error) {
            return <p>loading</p>;
        }
        dataLoc.push({
            data: data.getAvailabilityPerSku,
        });
    };

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/sales/orderreallocation')}
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
                Shipment
                {reallocationDetail.shipmentNumber}
            </h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h5 className={classes.title}>Order Information</h5>
                    <div className={classes.contentLeft}>
                        <h2 className={classes.titleTop}>{reallocationDetail.status}</h2>
                    </div>
                    <div className={classes.contentLeft}>
                        <table className={classes.table}>
                            <tbody>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Order Date</td>
                                    <td className={classes.td}>{reallocationDetail.orderDate}</td>
                                </tr>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Order Number</td>
                                    <td className={classes.td}>{reallocationDetail.orderNumber}</td>
                                </tr>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Channel Order Number</td>
                                    <td className={classes.td}>{reallocationDetail.channelOrderNumber}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={classes.content}>
                    <h5 className={clsx(classes.title, classes.space)}>Fullfilled By</h5>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Company</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            mode="lazy"
                            value={formik.values.company}
                            onChange={(e) => {
                                formik.setFieldValue('company', e);
                                formik.setFieldValue('location', null);
                            }}
                            loading={getCompanyReallocationRes.loading}
                            options={
                                getCompanyReallocationRes
                                && getCompanyReallocationRes.data
                                && getCompanyReallocationRes.data.getCompanyReallocation
                            }
                            getOptions={getCompanyReallocation}
                            getOptionLabel={(option) => ((option && (`${option.company_code } - ${ option.company_name}`)) || '')}
                            getOptionsVariables={
                                { variables: { id: reallocationDetail.id } }
                            }
                            primaryKey="company_id"
                            labelKey="company_name"
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Location</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            mode="lazy"
                            value={formik.values.location}
                            onChange={(e) => formik.setFieldValue('location', e)}
                            loading={getLocationReallocationRes.loading}
                            options={
                                getLocationReallocationRes
                                && getLocationReallocationRes.data
                                && getLocationReallocationRes.data.getLocationReallocation
                            }
                            getOptions={getLocationReallocation}
                            getOptionLabel={(option) => ((option && (`${option.loc_code } - ${ option.loc_name}`)) || '')}
                            getOptionsVariables={
                                {
                                    variables: {
                                        id: reallocationDetail.id,
                                        company_id: formik.values.company.company_id,
                                    },
                                }
                            }
                            primaryKey="loc_code"
                            labelKey="loc_name"
                        />
                    </div>
                    <div className={classes.formFieldButton}>
                        {(reallocationDetail.status === 'Process for Shipping') ? (
                            <Button
                                className={classes.btn}
                                onClick={formik.handleSubmit}
                                variant="contained"
                            >
                                Submit
                            </Button>
                        ) : (
                            <Button
                                disabled
                                className={classes.btn}
                                onClick={formik.handleSubmit}
                                variant="contained"
                            >
                                Submit
                            </Button>
                        )}
                    </div>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.title}>Shipping Item(s)</h5>
                    <table className={classes.table}>
                        <tbody>
                            <tr className={classes.tr}>
                                <th className={classes.th}>SKU</th>
                                <th className={classes.th}>Name</th>
                                <th className={classes.th}>Qty</th>
                                <th className={classes.th}>Action</th>
                            </tr>
                            {reallocationDetail.item.map((e) => (
                                <tr>
                                    <td className={classes.td}>{e.sku}</td>
                                    <td className={classes.td}>{e.name}</td>
                                    <td className={classes.td}>{e.qty}</td>
                                    <td className={classes.td}>
                                        <ScrollDialog
                                            title="Available Location"
                                            linkText="Check Availability"
                                            message={(
                                                <>
                                                    {varian(reallocationDetail.id, e.sku)}
                                                    {
                                                        dataLoc.map((loc) => (
                                                            loc.data.map((arr) => (
                                                                <>
                                                                    {arr.loc_name}
                                                                    <br />
                                                                </>
                                                            ))
                                                        ))
                                                    }

                                                </>
                                            )}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.title}>Status history</h5>
                    <table className={classes.table}>
                        <tbody>
                            <tr className={classes.tr}>
                                <th className={classes.th}>Date</th>
                                <th className={classes.th}>Status</th>
                                <th className={classes.th}>Notes</th>
                            </tr>
                            {reallocationDetail.history.map((e) => (
                                <tr>
                                    <td className={classes.td}>{e.created_at}</td>
                                    <td className={classes.td}>{e.status}</td>
                                    <td className={classes.td}>{e.comment}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Paper>
        </>
    );
};

export default orderreallocationEditContent;
