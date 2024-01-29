/* eslint-disable brace-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-confusing-arrow */
/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable eqeqeq */
/* eslint-disable arrow-body-style */
import React from 'react';
import clsx from 'clsx';
import { useTranslation } from '@i18n';
import { useRouter } from 'next/router';

import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';

import { useDebounce } from '@sellermodules/notification/pages/default/components/List/helpers';

import Button from '@common_button';
import TextField from '@common_textfield';
import TablePaginationActions from '@sellermodules/notification/pages/default/components/List/components/TablePaginationActions';
import gqlService from '@sellermodules/notification/services/graphql';

import useStyles from '@sellermodules/notification/pages/default/components/List/style';

const CustomTable = (props) => {
    const { t } = useTranslation('common');
    const {
        rows,
        getRows,
        loading,
        initialPage = 1,
        initialRowsPerPage = 10,
        count,
        getVariables,
        header = '',
        searchPlaceholder = '',
    } = props;
    // hooks
    const router = useRouter();
    const classes = useStyles();

    const [sellerNotificationRead] = gqlService.sellerNotificationRead();

    const [page, setPage] = React.useState(initialPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);
    const [search, setSearch] = React.useState('');
    const debouncedSearch = useDebounce(search, 500);

    // methods
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };
    const fetchRows = () => {
        const variables = {
            pageSize: rowsPerPage,
            currentPage: page,
            search,
            sort: {
                created_at: 'DESC',
            },
        };
        if (getVariables) {
            getVariables(variables);
        }
        getRows({ variables });
    };

    // effects
    React.useEffect(() => {
        setPage(1);
        fetchRows();
    }, [rowsPerPage, debouncedSearch]);

    React.useEffect(() => {
        if (getRows) {
            fetchRows();
        }
    }, [page]);

    const renderTableHeader = () => {
        const onClickRead = () => {
            window.backdropLoader(true);
            sellerNotificationRead().then(() => {
                window.backdropLoader(false);
                fetchRows();
            })
                .catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
        };
        return (
            <Paper className={classes.paperHead}>
                <div className={classes.header}>
                    {header}
                </div>
                <div className={classes.tableToolbar}>
                    <div className="top-buttons-wrapper nopad">
                        <div className="top-item-left">
                            <div className="top-item">
                                <TextField
                                    name="email"
                                    placeholder={searchPlaceholder}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className={clsx(classes.textInput, 'full')}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <img alt="" src="/assets/img/search.svg" className={classes.iconImg} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                        </div>
                        <div className="top-item-right">
                            <div className="top-item">
                                <Button className={classes.btnAdd} onClick={onClickRead}>
                                    {t('sellernotification:Read_All')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Paper>
        );
    };

    const renderTableBody = () => {
        const notifIcon = (category) => {
            switch (category) {
            case 'notif_new_order':
            case 'notif_cancel_order':
            case 'notif_error_order_queue':
                return '/assets/img/layout/seller/order.svg';
            case 'notif_withdraw_approval':
                return '/assets/img/layout/seller/income.svg';
            case 'notif_mpadapter':
                return '/assets/img/layout/seller/channelseller.svg';
            case 'notif_export_order_product':
                return '/assets/img/layout/seller/reportseller.svg';
            default:
                return '/assets/img/layout/seller/order.svg';
            }
        };

        const onClickNotif = (notif) => {
            const { category, category_ref_id, id, is_read } = notif;
            function routing() {
                switch (category) {
                case 'notif_new_order':
                case 'notif_cancel_order':
                    router.push({
                        pathname: '/seller/order/detail/[id]',
                        query: { id: category_ref_id },
                    });
                    break;
                case 'notif_error_order_queue':
                    router.push({ pathname: '/seller/order/failed' });
                    break;
                case 'notif_withdraw_approval':
                    router.push('/seller/income/withdraw');
                    break;
                case 'notif_rma':
                    router.push({
                        pathname: '/seller/return/detail/[id]',
                        query: { id: category_ref_id },
                    });
                    break;
                case 'notif_mpadapter': 
                    router.push({ pathname: '/seller/order' });
                    break;
                case 'notif_export_order_product':
                    router.push({ pathname: '/seller/report/history' });
                    break;
                default:
                    window.backdropLoader(false);
                    break;
                }
            }
            if (is_read) {
                routing();
            } else {
                window.backdropLoader(true);
                sellerNotificationRead({ variables: { ids: [id] } }).then(() => {
                    routing();
                })
                    .catch((e) => {
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            text: e.message,
                            variant: 'error',
                        });
                    });
            }
        };

        return (
            <TableBody>
                {rows.map((row, rowIndex) => (
                    <TableRow
                        key={rowIndex}
                        style={{ cursor: 'pointer' }}
                        onClick={() => onClickNotif(row)}
                    >
                        <TableCell className={clsx(classes.tableCell, !row.is_read && 'gray')}>
                            <div style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
                                <div
                                    className="icon"
                                >
                                    <img src={notifIcon(row.category)} alt="" />
                                </div>
                                <span className="bold">{row.entity_type}</span>
                                <div className="circle" />
                                <span className="light">{row.created_at}</span>
                            </div>
                            <div>
                                <span className="text">{row.message}</span>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        );
    };

    const renderTableFooter = () => {
        return (
            <>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            className={classes.tablePagination}
                            rowsPerPageOptions={[5, 10, 25, 50, 100]}
                            count={count}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            labelRowsPerPage={t('common:View')}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            labelDisplayedRows={() => { }}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </>
        );
    };

    return (
        <>
            <TableContainer component={Paper} className={classes.tableContainer}>
                {renderTableHeader()}
                <div className={classes.mainTable}>
                    {loading ? (
                        null
                    ) : rows.length ? (
                        <Table size="small">
                            {renderTableBody()}
                        </Table>
                    ) : (
                        null
                    )}
                    {loading || !rows.length
                        ? (
                            <Table size="small">
                                <TableBody>
                                    <TableRow style={{ height: (40 * rowsPerPage) + 10 }}>
                                        <TableCell>
                                            {loading ? (
                                                <div className={classes.loading}>Loading . . .</div>
                                            ) : !rows.length ? (
                                                <div className={classes.loading}>{t('common:No_records_to_display')}</div>
                                            ) : (
                                                null
                                            )}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        )
                        : null}
                </div>
            </TableContainer>
            {!!count
                && (
                    <TableContainer component={Paper} className={clsx(classes.tableContainer, 'footer')}>
                        <Table size="small">{renderTableFooter()}</Table>
                    </TableContainer>
                )}
            <div style={{ height: 20 }} />
        </>
    );
};

export default CustomTable;
