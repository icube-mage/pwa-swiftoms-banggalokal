/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
import { breakPointsUp } from '@helper_theme';
import { useRouter } from 'next/router';

import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Hidden from '@material-ui/core/Hidden';

import { useColumns, getComponentOrString, useDebounce, isEmpty } from '@sellermodules/order/pages/list/components/ListCard/helpers';
import Button from '@common_button';

import SellerTable from '@common_tableseller';
import TabsHeader from '@sellermodules/order/pages/list/components/ListCard/components/TabsHeader';
import SelectAllCheckbox from '@sellermodules/order/pages/list/components/ListCard/components/SelectAllCheckbox';
import TablePaginationComponent from '@common_tableseller/components/TablePagination';

import Link from 'next/link';
import useStyles from '@sellermodules/order/pages/list/components/ListCard/style';

const CustomTable = (props) => {
    const { t } = useTranslation('common');
    const {
        primaryKey = 'id',
        showCheckbox = false,
        rows,
        rowActions,
        actions,
        getRows,
        loading,
        initialPage = 1,
        initialRowsPerPage = 10,
        count,
        handleClickRow = null,
        indexType = 0,
        getVariables,
        doRefetch = null,
        setDoRefetch = () => {},
        handleChecked = () => {},
        defaultChecked = [],
        singleSelection = false,
        useTabs = false,
        dataOrderPaymentStatus,
        rowsSyncFailed,
        actionsCheck,
        search,
        setSearch,
    } = props;

    // hooks
    const desktop = breakPointsUp('sm');
    const router = useRouter();
    const classes = useStyles();
    const [page, setPage] = React.useState(initialPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);
    const [checkedRows, setCheckedRows] = React.useState(defaultChecked);
    const [isCheckedAllRows, setIsCheckedAllRows] = React.useState(false);
    const debouncedSearch = useDebounce(search, 500);
    const [selectedDate, setSelectedDate] = React.useState([null, null]);

    const { columns, applyHiddenColumnsDesktop, applyHiddenColumnsMobile } = useColumns(props.columns);
    const { columns: columnsSyncFailed } = useColumns(props.columnsSyncFailed);
    const [filters, setFilters] = React.useState([]);
    const [expandedToolbar, setExpandedToolbar] = React.useState();
    const [expandDetail, setExpandDetail] = React.useState(false);
    const { status } = router.query;
    const isFailedAllocation = status === 'failed';

    const paymentStatus = dataOrderPaymentStatus.length > 0 ? dataOrderPaymentStatus : [
        { label: 'Pending', value: 'pending' },
        { label: 'Approved', value: 'approved' },
    ];

    // methods
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };
    const fetchRows = () => {
        const initialFilter = {
            field: 'status',
            name: 'status',
            type: 'eq',
            format: 'tab',
            value: '',
        };

        const initialFilterSync = {
            field: 'sync_status',
            name: 'sync_status',
            type: 'eq',
            value: 'failed',
        };

        if (isFailedAllocation) {
            initialFilter.type = 'in';
            initialFilter.value = ['allocation_failed', 'canceled'];
        }

        const variables = {
            pageSize: rowsPerPage,
            currentPage: page,
            filter: [
                ...filters,
                { ...initialFilter },
                { ...(status === 'sync_failed' && initialFilterSync) },
            ]
                .filter((e) => !isEmpty(e.value))
                .reduce((accumulator, currentValue) => {
                    accumulator[currentValue.field] = {
                        ...accumulator[currentValue.field],
                        [typeof currentValue.type === 'object'
                            ? currentValue.type[indexType[currentValue.name]]
                            : currentValue.type]: currentValue.value,
                    };
                    return accumulator;
                }, {}),
            search,
        };

        if (getVariables) {
            getVariables(variables);
        }
        getRows({ variables });
        setIsCheckedAllRows(false);
    };

    const setHiddenResponsive = () => {
        if (!desktop) {
            applyHiddenColumnsMobile();
        } else {
            applyHiddenColumnsDesktop();
        }
    };

    const handleChangeCheckboxAllRows = (checked) => {
        const newCheckedRows = checked
            ? rows.reduce((accumulator, currentValue) => {
                const i = accumulator.findIndex((checkedRow) => checkedRow[primaryKey] === currentValue[primaryKey]);
                if (checked && i < 0) {
                    accumulator.push(currentValue);
                }
                return accumulator;
            }, checkedRows)
            : [];
        setCheckedRows(newCheckedRows);
        setIsCheckedAllRows(checked);
        handleChecked(newCheckedRows);
    };

    // effects
    React.useEffect(() => {
        setPage(1);
        fetchRows();
    }, [rowsPerPage, debouncedSearch, status]);

    React.useEffect(() => {
        setPage(1);
        fetchRows();
        setCheckedRows([]);
    }, [filters]);

    React.useEffect(() => {
        if (getRows) {
            fetchRows();
        }
    }, [page]);

    React.useEffect(() => {
        if (doRefetch !== null) {
            setCheckedRows([]);
            setIsCheckedAllRows(false);
            fetchRows();
            setDoRefetch(null);
        }
    }, [doRefetch]);

    React.useEffect(() => {
        if (defaultChecked.length) {
            setCheckedRows(defaultChecked);
        }
    }, [defaultChecked]);

    React.useEffect(() => {
        setHiddenResponsive();
    }, [desktop]);

    React.useEffect(() => {
        setCheckedRows([]);
        setIsCheckedAllRows(false);
        handleChecked([]);
    }, [router]);

    const renderAction = () => {
        const actionsToMap = status === 'sync_failed' ? actionsCheck : actions;
        return (
            <Grid container className={classes.checkAllContainer}>
                {showCheckbox && !!count && desktop && (
                    <Grid item xs="auto">
                        <SelectAllCheckbox
                            checked={isCheckedAllRows}
                            checkedRows={checkedRows}
                            onChange={(e) => handleChangeCheckboxAllRows(e.target.checked)}
                            count={count}
                            t={t}
                        />
                    </Grid>
                )}
                {actionsToMap?.length && checkedRows.length && count ? (
                    <Grid item container spacing={2} xs="auto" style={{ marginBottom: 10 }}>
                        {actionsToMap.map((act) => (
                            <Grid key={act.label} item>
                                <Button className={clsx(classes.btnAction, 'check')} onClick={act.onClick} disabled={!checkedRows.length}>
                                    {act.label}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                ) : null}
            </Grid>
        );
    };

    const renderTableBody = () => {
        const handleChangeCheckboxRow = (checked, row) => {
            const i = checkedRows.findIndex((checkedRow) => checkedRow[primaryKey] === row[primaryKey]);
            if (singleSelection) {
                setCheckedRows([row]);
                handleChecked([row]);
            } else if (checked && i < 0) {
                setCheckedRows([...checkedRows, row]);
                handleChecked([...checkedRows, row]);
            } else if (!checked && i >= 0) {
                setCheckedRows(checkedRows.filter((checkedRow) => checkedRow[primaryKey] != row[primaryKey]));
                handleChecked(checkedRows.filter((checkedRow) => checkedRow[primaryKey] != row[primaryKey]));
            }
        };

        if (status === 'sync_failed') {
            return (
                <div className={classes.tableBodyContainer}>
                    {rowsSyncFailed.map((row, rowIndex) => (
                        <Paper key={rowIndex} className={clsx(classes.rowPaper, 'sync')}>
                            <Grid container spacing={2}>
                                {showCheckbox && (
                                    <Grid item xs={2}>
                                        <Checkbox
                                            className={clsx(classes.checkbox, 'sub')}
                                            checked={!!checkedRows.find((checkedRow) => checkedRow[primaryKey] === row[primaryKey])}
                                            onChange={(e) => handleChangeCheckboxRow(e.target.checked, row)}
                                            disabled={
                                                !checkedRows.find((checkedRow) => checkedRow[primaryKey] === row[primaryKey])
                                                && row.disableCheck
                                            }
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </Grid>
                                )}
                                <Grid item xs={10}>
                                    {columnsSyncFailed.map((column, columnIndex) => (
                                        <div key={columnIndex} className={clsx(column.hidden && 'hide', classes.syncMobileBody)}>
                                            {column.headerName ? <div className="title">{getComponentOrString(column.headerName)}</div> : null}
                                            {getComponentOrString(row[column.field]) || '-'}
                                        </div>
                                    ))}
                                </Grid>
                            </Grid>
                        </Paper>
                    ))}
                </div>
            );
        }

        return (
            <div className={classes.tableBodyContainer}>
                {rows.map((row, rowIndex) => {
                    return (
                        <Link href={`/seller/order/${status === 'failed' ? 'failed/' : ''}detail/${row.id}`} key={row.id}>
                            <a>
                                <Paper
                                    key={rowIndex}
                                    style={{
                                        cursor: handleClickRow ? 'pointer' : 'default',
                                    }}
                                    className={classes.rowPaper}
                                >
                                    <div className={classes.rowHead}>
                                        <div className={clsx(classes.head, 'block')}>
                                            {showCheckbox && (
                                                <Checkbox
                                                    className={clsx(classes.checkbox, 'sub')}
                                                    checked={!!checkedRows.find((checkedRow) => checkedRow[primaryKey] === row[primaryKey])}
                                                    onChange={(e) => handleChangeCheckboxRow(e.target.checked, row)}
                                                    disabled={
                                                        !checkedRows.find((checkedRow) => checkedRow[primaryKey] === row[primaryKey])
                                                        && row.disableCheck
                                                    }
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                            )}
                                            {row.header ? getComponentOrString(row.header) : null}
                                        </div>
                                    </div>

                                    <div spacing={3} className={classes.rowBody}>
                                        {columns.find((column) => column.field === 'picture') ? (
                                            <>{getComponentOrString(row[columns.find((column) => column.field === 'picture').field]) || '-'}</>
                                        ) : null}
                                        {!desktop ? (
                                            <>
                                                <div
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setExpandDetail(rowIndex === expandDetail ? null : rowIndex);
                                                    }}
                                                    className={classes.viewMoreDetail}
                                                >
                                                    {t('view_more')}
                                                    <ExpandMoreIcon />
                                                </div>
                                                <Collapse in={expandDetail === rowIndex}>
                                                    <div
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                        }}
                                                    >
                                                        {columns
                                                            .filter((column) => column.field !== 'picture')
                                                            .map((column, columnIndex) => {
                                                                return (
                                                                    <div
                                                                        key={columnIndex}
                                                                        className={clsx(column.hidden && 'hide', classes.alignTop, 'box')}
                                                                    >
                                                                        {column.headerName ? (
                                                                            <div className="title">{getComponentOrString(column.headerName)}</div>
                                                                        ) : null}
                                                                        {getComponentOrString(row[column.field]) || '-'}
                                                                    </div>
                                                                );
                                                            })}
                                                    </div>
                                                </Collapse>
                                            </>
                                        ) : (
                                            columns
                                                .filter((column) => column.field !== 'picture')
                                                .map((column, columnIndex) => {
                                                    return (
                                                        <div key={columnIndex} className={clsx(column.hidden && 'hide', classes.alignTop, 'box')}>
                                                            {column.headerName ? (
                                                                <div className="title">{getComponentOrString(column.headerName)}</div>
                                                            ) : null}
                                                            {getComponentOrString(row[column.field]) || '-'}
                                                        </div>
                                                    );
                                                })
                                        )}
                                        {!!rowActions?.length && <div className={clsx(classes.alignTop)}>{renderAction(row)}</div>}
                                    </div>
                                </Paper>
                            </a>
                        </Link>
                    );
                })}
            </div>
        );
    };

    const contentProps = {
        ...props,
        filters,
        setFilters,
        search,
        setSearch,
        fetchRows,
        setExpandedToolbar,
        expandedToolbar,
        selectedDate,
        setSelectedDate,
        setCheckedRows,
        setIsCheckedAllRows,
        paymentStatus,
        isFailedAllocation,
        isFailedSync: status === 'sync_failed',
        checked: isCheckedAllRows,
        checkedRows,
        onChange: handleChangeCheckboxAllRows,
        count,
        rowsPerPage,
        page,
        t,
        handleChangePage,
        handleChangeRowsPerPage,
        rowsPerPageOptions: [5, 10, 25, 50, 100],
        tabStatus: status,
    };

    return (
        <>
            <div className={classes.container}>
                {useTabs && <TabsHeader {...contentProps} />}
                {status === 'sync_failed' && desktop ? (
                    <SellerTable
                        loading={loading}
                        columns={columnsSyncFailed}
                        getRows={getRows}
                        rows={rowsSyncFailed}
                        count={count}
                        hideSearch
                        hideHead
                        hideFooter
                        showCheckbox
                        actionsCheck={actionsCheck}
                        handleChecked={handleChecked}
                        doRefetch={doRefetch}
                        setDoRefetch={setDoRefetch}
                    />
                ) : (
                    <div className={classes.table}>
                        {renderAction()}
                        {loading ? (
                            <span className={classes.loading}>Loading . . .</span>
                        ) : rows.length ? (
                            renderTableBody()
                        ) : (
                            <span className={classes.loading}>{t('common:No_records_to_display')}</span>
                        )}
                    </div>
                )}
                <TableContainer component={Paper} className={clsx(classes.tableContainer, 'footer')}>
                    <Table size="small">
                        <TablePaginationComponent {...contentProps} />
                    </Table>
                </TableContainer>
            </div>
            <div style={{ height: 20 }} />
            <Hidden smUp implementation="css">
                <div style={{ height: 40 }} />
            </Hidden>
        </>
    );
};

export default CustomTable;
