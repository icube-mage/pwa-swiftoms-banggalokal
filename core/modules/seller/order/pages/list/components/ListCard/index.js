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
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import ScheduleIcon from '@material-ui/icons/Schedule';

import { useColumns, getComponentOrString, useDebounce, isEmpty } from '@sellermodules/order/pages/list/components/ListCard/helpers';
import Button from '@common_button';

import TablePaginationActions from '@sellermodules/order/pages/list/components/ListCard/components/TablePaginationActions';
import TabsHeader from '@sellermodules/order/pages/list/components/ListCard/components/TabsHeader';

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
        filters: initialFilters = [],
        initialPage = 1,
        initialRowsPerPage = 50,
        count,
        hideFooter = false,
        handleClickRow = null,
        indexType = 0,
        getVariables,
        doRefetch = null,
        setDoRefetch = () => { },
        handleChecked = () => { },
        defaultChecked = [],
        singleSelection = false,
        useTabs = false,
    } = props;
    // hooks
    const desktop = breakPointsUp('sm');
    const router = useRouter();
    const classes = useStyles();
    const [page, setPage] = React.useState(initialPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);
    const [checkedRows, setCheckedRows] = React.useState(defaultChecked);
    const [isCheckedAllRows, setIsCheckedAllRows] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const debouncedSearch = useDebounce(search, 500);
    const [selectedDate, setSelectedDate] = React.useState([null, null]);

    const {
        columns,
        applyHiddenColumnsDesktop,
        applyHiddenColumnsMobile,
    } = useColumns(props.columns);
    const [filters, setFilters] = React.useState(initialFilters.map((filter) => ({ ...filter, value: filter.initialValue })));
    const [expandedToolbar, setExpandedToolbar] = React.useState();
    const { status } = router.query;
    const tab = (status === '' ? 'all' : status) || 'all';

    const dataTabs = [
        { label: t('sellercatalog:All_Orders'), value: 'all' },
        { label: t('sellercatalog:New_Order'), value: 'new' },
        { label: t('sellercatalog:Ready_for_Ship'), value: 'ready_for_ship' },
        { label: t('sellercatalog:In_Delivery'), value: 'in_delivery' },
        { label: t('sellercatalog:Order_Delivered'), value: 'order_delivered' },
        { label: t('sellercatalog:Canceled'), value: 'canceled' },
    ];

    const dataTrack = [
        { label: t('sellercatalog:Waiting_for_Pickup'), value: 'waiting_for_pickup' },
        { label: t('sellercatalog:Courier_Pickup'), value: 'courier_pickup' },
        { label: t('sellercatalog:Customer_Received'), value: 'customer_received' },
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
        const variables = {
            pageSize: rowsPerPage,
            currentPage: page,
            filter: [...filters, {
                field: 'status',
                name: 'status',
                type: 'eq',
                format: 'tab',
                value: status,
            }]
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
        const newCheckedRows = checked ? rows.reduce((accumulator, currentValue) => {
            const i = accumulator.findIndex((checkedRow) => checkedRow[primaryKey] === currentValue[primaryKey]);
            if (checked && i < 0) {
                accumulator.push(currentValue);
            }
            return accumulator;
        }, checkedRows) : [];
        setCheckedRows(newCheckedRows);
        setIsCheckedAllRows(checked);
        handleChecked(newCheckedRows);
    };

    // effects
    React.useEffect(() => {
        setPage(1);
        fetchRows();
    }, [rowsPerPage, filters, debouncedSearch, tab]);

    React.useEffect(() => {
        if (getRows) {
            fetchRows();
        }
    }, [page]);

    React.useEffect(() => {
        if (doRefetch !== null) {
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
        return (
            <Grid container spacing={2} className={classes.checkAllContainer}>
                {showCheckbox && !!count && (
                    <Grid item xs={12} sm="auto">
                        <FormControlLabel
                            control={(
                                <Checkbox
                                    className={classes.checkbox}
                                    label={`${checkedRows.length} ${t('common:Selected')}`}
                                    checked={isCheckedAllRows}
                                    onChange={(e) => handleChangeCheckboxAllRows(e.target.checked)}
                                    disabled={!count}
                                />
                            )}
                            label={checkedRows.length ? `${checkedRows.length} ${t('common:Order_Selected')}` : t('common:Select_All')}
                            className={classes.controlLabel}
                        />
                    </Grid>
                )}
                {actions?.length && checkedRows.length && count
                    ? (actions.map((act) => (
                        <Grid key={act.label} item>
                            <Button
                                className={clsx(classes.btnAction, 'check')}
                                onClick={act.onClick}
                                disabled={!checkedRows.length}
                            >
                                {act.label}
                            </Button>
                        </Grid>
                    ))
                    )
                    : null}
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
        return (rows.map((row, rowIndex) => {
            return (
                <Link href={`/seller/order/detail/${row.id}`} key={row.id}>
                    <a>
                        <Paper
                            key={rowIndex}
                            onClick={() => (handleClickRow ? handleClickRow(row) : null)}
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
                                            disabled={!checkedRows.find((checkedRow) => checkedRow[primaryKey] === row[primaryKey])
                                                && row.disableCheck}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    )}
                                    {row.header
                                        ? getComponentOrString(row.header)
                                        : null}
                                </div>
                                {!!row.acceptance_deadline
                                    && (
                                        <div className={clsx(classes.head, 'end')}>
                                            {t('sellerorder:Acceptance_Deadline')}
                                            <div className={classes.divider} />
                                            <ScheduleIcon className="icon" />
                                            <div className={classes.divider} />
                                            {row.acceptance_deadline}
                                        </div>
                                    )}
                            </div>

                            <div
                                spacing={3}
                                className={classes.rowBody}
                            >
                                {columns.map((column, columnIndex) => (
                                    <div key={columnIndex} className={clsx(column.hidden && 'hide', classes.alignTop, 'box')}>
                                        {column.headerName
                                            ? (
                                                <div className="title">{getComponentOrString(column.headerName)}</div>
                                            )
                                            : null}
                                        {getComponentOrString(row[column.field]) || '-'}
                                    </div>
                                ))}
                                {!!rowActions?.length
                                    && (
                                        <div className={clsx(classes.alignTop)}>
                                            {renderAction(row)}
                                        </div>
                                    )}
                            </div>
                            {row.footer
                                ? <div className={classes.rowFooter}>{getComponentOrString(row.footer)}</div>
                                : null}
                        </Paper>
                    </a>
                </Link>
            );
        })
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

    const contentProps = {
        ...props,
        filters,
        setFilters,
        search,
        setSearch,
        fetchRows,
        setExpandedToolbar,
        expandedToolbar,
        tab,
        selectedDate,
        setSelectedDate,
        dataTabs,
        dataTrack,
        setCheckedRows,
        setIsCheckedAllRows,
    };

    return (
        <>
            {useTabs && <TabsHeader {...contentProps} />}
            <div>
                {renderAction()}
                {loading ? (
                    <span className={classes.loading}>Loading . . .</span>
                ) : rows.length ? (
                    renderTableBody()
                ) : (
                    <span className={classes.loading}>{t('common:No_records_to_display')}</span>
                )}
            </div>
            <TableContainer component={Paper} className={clsx(classes.tableContainer, 'footer')}>
                <Table size="small">{!hideFooter && !!count && renderTableFooter()}</Table>
            </TableContainer>
            <div style={{ height: 20 }} />
        </>
    );
};

export default CustomTable;
