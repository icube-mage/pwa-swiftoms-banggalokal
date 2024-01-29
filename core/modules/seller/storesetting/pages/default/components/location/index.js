/* eslint-disable no-param-reassign */
/* eslint-disable object-curly-newline */
import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import Switch from '@common_switch';
import Button from '@common_button';

import Confirmation from '@sellermodules/storesetting/pages/default/components/location/Confirmation';
import useStyles from '@sellermodules/storesetting/pages/default/components/location/style';

const getComponentOrString = (param) => {
    if (typeof param === 'function') {
        return param();
    }
    if (typeof param === 'string' || typeof param === 'number') {
        if (String(param) !== 'undefined') {
            return String(param);
        }
    }
    return param;
};

const StoreLocationContent = (props) => {
    const {
        t, dataLocation, handleUpdateStatusLocation, loadLocation, handleDeleteLocation,
        open, setOpen, dataLoc, setDataLoc, aclAddLocation,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const handleClickDelete = (loc) => {
        setDataLoc(loc);
        setOpen(true);
    };

    const rows = dataLocation.map((loc) => ({
        ...loc,
        is_active: () => (
            <Switch
                value={loc.is_active}
                onChange={() => handleUpdateStatusLocation(loc.id, !loc.is_active)}
                useLabel={false}
            />
        ),
        action: () => (
            <Link href={`/seller/storesetting/location/edit/${loc.id}`}>
                <a className={classes.link}>{t('storesetting:Edit')}</a>
            </Link>
        ),
        delete: () => (
            <IconButton onClick={() => handleClickDelete(loc)} className={classes.iconTrash}>
                <img src="/assets/img/trash-new.svg" alt="trash" />
            </IconButton>
        ),
    }));

    const columns = [
        { field: 'code', headerName: t('storesetting:Code') },
        { field: 'name', headerName: t('storesetting:Location_Name') },
        { field: 'street', headerName: t('storesetting:Address') },
        { field: 'city', headerName: t('storesetting:City__Districts') },
        { field: 'postcode', headerName: t('storesetting:Postal_Code') },
        { field: 'is_active', headerName: t('storesetting:Status') },
        { field: 'action', headerName: t('storesetting:Action') },
        { field: 'delete', headerName: '', hidden: rows?.length === 1 },
    ];

    return (
        <>
            <Paper className={classes.container}>
                <h2 className={classes.title}>{t('storesetting:Store_Location')}</h2>
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <div className={classes.mainTable}>
                        <Table size="small">
                            <TableHead>
                                <TableRow className={classes.tableHead}>
                                    {columns.map((column, columnIndex) => (
                                        <TableCell
                                            key={columnIndex}
                                            className={clsx(column.hidden && 'hide')}
                                        >
                                            {column.headerName}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(loadLocation || !rows?.length) ? (
                                    <TableRow
                                        className={classes.tableRow}
                                    >
                                        <TableCell className={classes.alignTop} colSpan={7}>
                                            <div className={classes.noRecords}>
                                                {loadLocation ? t('storesetting:Loading') : t('storesetting:No_records_to_display')}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : rows.map((row, rowIndex) => (
                                    <TableRow
                                        key={rowIndex}
                                        className={clsx(classes.tableRow, rowIndex % 2 && 'gray')}
                                    >
                                        {columns.map((column, columnIndex) => (
                                            <TableCell key={columnIndex} className={clsx(classes.alignTop, column.hidden && 'hide')}>
                                                {getComponentOrString(row[column.field]) || '-'}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </TableContainer>
                {aclAddLocation
                    && (
                        <Grid container className={classes.btnContainer}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Button
                                    variant="contained"
                                    className={classes.btnSave}
                                    onClick={() => router.push('/seller/storesetting/location/create')}
                                >
                                    <span className={classes.btnText}>
                                        {t('registerseller:Add_Location')}
                                    </span>
                                </Button>
                            </Grid>
                        </Grid>
                    )}
            </Paper>
            <Confirmation
                open={open}
                onConfirm={handleDeleteLocation}
                onCancel={() => setOpen(false)}
                data={dataLoc}
                t={t}
            />
        </>
    );
};

export default StoreLocationContent;
