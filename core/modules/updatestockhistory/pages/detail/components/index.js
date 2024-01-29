/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import useStyles from '@modules/updatestockhistory/pages/detail/components/style';

const UpdateStockDetailContent = (props) => {
    const {
        formik,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/marketplace/updatestockhistory')}
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
            <h2 className={classes.titleTop}>Detail Stock History</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <table className={classes.table}>
                        <tbody>
                            <tr className={classes.tr}>
                                <th className={classes.th}>Store</th>
                                <th className={classes.th}>SKU</th>
                                <th className={classes.th}>Channel</th>
                                <th className={classes.th}>Status</th>
                                <th className={classes.th}>Finished At</th>
                                <th className={classes.th}>Message</th>
                            </tr>
                            <tr>
                                <td className={classes.td}>NULL</td>
                                <td className={classes.td}>NULL</td>
                                <td className={classes.td}>NULL</td>
                                <td className={classes.td}>NULL</td>
                                <td className={classes.td}>NULL</td>
                                <td className={classes.td}>NULL</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Paper>
        </>
    );
};

export default UpdateStockDetailContent;
