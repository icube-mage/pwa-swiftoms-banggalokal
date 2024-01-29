import React from 'react';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Button from '@common_button';

import {
    getComponentOrString,
} from '@sellermodules/stock/pages/list/components/ListCard/helpers';

import { breakPointsUp } from '@helper_theme';
import useStyles from '@sellermodules/stock/pages/list/components/ListCard/components/TableSyncFailed/style';

const TableAllProduct = (props) => {
    const { t, rows, handleRetry } = props;
    const classes = useStyles();
    const isDesktop = breakPointsUp('sm');

    return (
        <div className={classes.tableBodyContainer}>
            {rows.map((row, rowIndex) => (
                <Paper key={rowIndex} className={classes.rowPaper}>
                    <div className={classes.rowBodyFailed}>
                        <div className="box">
                            <div className="title center hidden-mobile">{t('sellerstock:Product')}</div>
                            {getComponentOrString(row.product_detail)}
                        </div>

                        <div className="box">
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                align={isDesktop ? 'center' : 'left'}
                                                colSpan={4}
                                                classes={{ root: classes.cellRoot }}
                                                className="no-border top0"
                                            >
                                                <b>{t('sellerstock:Last_Sync')}</b>
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                classes={{ root: classes.cellRoot }}
                                                className="no-border top0 hidden-mobile"
                                            >
                                                <b>{t('sellerstock:Current_Stock')}</b>
                                            </TableCell>
                                            <TableCell align="center" classes={{ root: classes.cellRoot }} className="no-border top0 hidden-mobile">
                                                <b>{t('sellerstock:Action')}</b>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell classes={{ root: classes.cellRoot }} className="head fixed1">
                                                <b>{t('sellerstock:Channel')}</b>
                                            </TableCell>
                                            <TableCell classes={{ root: classes.cellRoot }} className="head fixed2">
                                                <b>{t('sellerstock:Date')}</b>
                                            </TableCell>
                                            <TableCell classes={{ root: classes.cellRoot }} className="head fixed3">
                                                <b>{t('sellerstock:Stock')}</b>
                                            </TableCell>
                                            <TableCell classes={{ root: classes.cellRoot }} className="head fixed4">
                                                <b>{t('sellerstock:Reason')}</b>
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                classes={{ root: classes.cellRoot }}
                                                className="no-border right-border hidden-mobile"
                                            >
                                                <b className="hidden-space">{t('sellerstock:Current_Stock')}</b>
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                classes={{ root: classes.cellRoot }}
                                                className="no-border hidden-mobile"
                                            >
                                                <b className="hidden-space">{t('sellerstock:Action')}</b>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.sync_history.map((sync, index) => {
                                            const isLast = row.sync_history.length === index + 1;
                                            return (
                                                <TableRow key={index} classes={{ root: classes.rowRoot }}>
                                                    <TableCell
                                                        classes={{ root: classes.cellRoot }}
                                                        className={isLast ? 'bottom-border' : ''}
                                                    >
                                                        <div className="flex">
                                                            <div className={classes.imgBackContainerChannel}>
                                                                <div
                                                                    className={classes.imgBackChannel}
                                                                    style={{
                                                                        backgroundImage: `url(${sync.channel?.image_url
                                                                        || '/assets/img/placeholder_image.jpg'})`,
                                                                    }}
                                                                />
                                                            </div>
                                                            <div><b>{sync.channel?.channel_name || '-'}</b></div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell
                                                        classes={{ root: classes.cellRoot }}
                                                        className={`${isLast ? 'bottom-border' : ''} no-border side-border`}
                                                    >
                                                        {sync.inserted_at || '-'}
                                                    </TableCell>
                                                    <TableCell
                                                        classes={{ root: classes.cellRoot }}
                                                        className={`right-border ${isLast ? 'bottom-border' : ''}`}
                                                    >
                                                        {sync.qty_update || '-'}
                                                    </TableCell>
                                                    <TableCell
                                                        classes={{ root: classes.cellRoot }}
                                                        className={`right-border ${isLast ? 'bottom-border' : ''}`}
                                                    >
                                                        {sync.message || '-'}
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        classes={{ root: classes.cellRoot }}
                                                        className="no-border right-border hidden-mobile"
                                                    >
                                                        {sync.current_stock || '0'}
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        classes={{ root: classes.cellRoot }}
                                                        className="no-border hidden-mobile"
                                                    >
                                                        <Button
                                                            onClick={() => handleRetry(row.product?.sku, sync.channel_code)}
                                                            classes={{ root: classes.buttonRootRetry }}
                                                        >
                                                            {t('sellerstock:Retry')}
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>

                        <div className="box hidden-desktop">
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" classes={{ root: classes.cellRoot }} className="no-border top0">
                                                <b>{t('sellerstock:Current_Stock')}</b>
                                            </TableCell>
                                            <TableCell align="center" classes={{ root: classes.cellRoot }} className="no-border top0">
                                                <b>{t('sellerstock:Action')}</b>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.sync_history.map((sync, index) => (
                                            <TableRow key={index}>
                                                <TableCell
                                                    align="center"
                                                    classes={{ root: classes.cellRoot }}
                                                    className="no-border right-border"
                                                >
                                                    {sync.current_stock || '0'}
                                                </TableCell>
                                                <TableCell align="center" classes={{ root: classes.cellRoot }} className="no-border">
                                                    <Button
                                                        onClick={() => handleRetry(row.product?.sku, sync.channel_code)}
                                                        classes={{ root: classes.buttonRootRetry }}
                                                    >
                                                        {t('sellerstock:Retry')}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </Paper>
            )) }
        </div>
    );
};

export default TableAllProduct;
