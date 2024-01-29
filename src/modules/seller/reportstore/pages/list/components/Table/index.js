/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import gqlService from '@sellermodules/reportstore/services/graphql';
import formatDate from '@helper_date';
import { useTranslation } from '@i18n';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Button from '@common_button';

import TablePaginationActions from '@sellermodules/reportstore/pages/list/components/Table/components/TablePaginationActions';
import TableFilters from '@sellermodules/reportstore/pages/list/components/Table/components/TableFilters';
import { breakPointsUp } from '@helper_theme';
import useStyles from '@sellermodules/reportstore/pages/list/components/Table/style';

// custom hooks
const useColumns = (initialColumns) => {
    const _initialColumns = initialColumns.map((column) => ({
        ...column,
    }));
    const [columns] = React.useState(_initialColumns);

    return {
        columns,
    };
};

// main component
const CustomTable = (props) => {
    const { t } = useTranslation('common');
    const {
        rows,
        getRows,
        loading,
        filters: initialFilters = [],
        initialPage = 1,
        initialRowsPerPage = 10,
        count,
        indexType = 0,
        doRefetch = null,
        setDoRefetch = () => { },
    } = props;

    // hooks
    const desktop = breakPointsUp('sm');
    const classes = useStyles();
    const [page, setPage] = React.useState(initialPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);
    const [selectedDate, setSelectedDate] = React.useState([null, null]);
    const {
        columns,
    } = useColumns(props.columns);
    const [filters, setFilters] = React.useState(initialFilters.map((filter) => ({ ...filter, value: filter.initialValue })));
    const [sorts, setSorts] = React.useState(
        props.columns.filter((column) => column.sortable).map(({ field, initialSort }) => ({ field, value: initialSort || undefined })),
    );
    const [exportSellerSummaryOrder] = gqlService.exportSellerSummaryOrder();

    // methods
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };

    const fetchRows = () => {
        const isEmpty = (value) => {
            if ([undefined, null, '', false].includes(value)) return true;
            if (value && value.length <= 0) return true;
            return false;
        };
        const variables = {
            pageSize: rowsPerPage,
            currentPage: page,
            filter: filters
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
            sort: sorts.reduce((accumulator, currentValue) => {
                accumulator[currentValue.field] = currentValue.value || undefined;
                return accumulator;
            }, {}),
        };
        getRows({ variables });
    };

    const handleExport = () => {
        if (selectedDate.some((e) => e === null)) {
            window.toastMessage({
                open: true,
                text: t('sellerreport:please_choose_period'),
                variant: 'error',
            });
        } else {
            exportSellerSummaryOrder({
                variables: {
                    filter: {
                        period: {
                            from: formatDate(selectedDate[0], 'YYYY-MM'),
                            to: formatDate(selectedDate[1], 'YYYY-MM'),
                        },
                    },
                },
            }).then((res) => {
                if (res?.errors?.[0]?.message) {
                    window.toastMessage({
                        open: true,
                        text: res?.errors[0]?.message || t('Failed'),
                        variant: 'error',
                    });
                } else {
                    window.toastMessage({
                        open: true,
                        text: t('sellerreport:export_report_store'),
                        variant: 'success',
                    });
                }
            }).catch((e) => {
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
        }
    };

    // effects
    React.useEffect(() => {
        setPage(1);
        if (getRows) {
            fetchRows();
        }
    }, [rowsPerPage, filters, sorts]);

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

    const renderTableToolbar = () => (
        <div className={classes.tableToolbar}>
            <div className="top-buttons-wrapper">
                <div className="records-found">
                    <h2 style={{ margin: 0 }}>{t('sellerreport:monthly_sales')}</h2>
                </div>
                <div className="top-item">
                    <Button
                        className={classes.btn}
                        variant="contained"
                        buttonType="outlined"
                        onClick={handleExport}
                    >
                        <img alt="icon_export" className="btnIcon" src="/assets/img/sellericon/export.svg" />
                        {t('sellerreport:export')}
                    </Button>
                </div>
            </div>
            <div className={classes.divFilter}>
                <TableFilters
                    filters={filters}
                    setFilters={setFilters}
                    setSorts={setSorts}
                    sorts={sorts}
                    columns={columns}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    t={t}
                />
            </div>
        </div>
    );

    const renderTableHeader = () => (
        <TableHead className={classes.tableHead}>
            <TableRow>
                {columns.map((column, columnIndex) => (
                    <TableCell
                        key={columnIndex}
                    >
                        {column.headerName}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );

    const renderTableBody = () => (
        <TableBody>
            {rows.map((row, rowIndex) => (
                <TableRow
                    key={rowIndex}
                    className={classes.tableRow}
                >
                    {columns.map((column, columnIndex) => (
                        <TableCell key={columnIndex} className={classes.alignTop}>
                            {row[column.field]}
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    );

    const renderBodyMobile = () => (
        <>
            {rows.map((row, rowIndex) => (
                <div
                    key={rowIndex}
                    className={classes.RowMobile}
                >
                    {columns.map((column, columnIndex) => (
                        <div key={columnIndex} className="row-mobile">
                            <h4 className={classes.h4}>{column.headerName}</h4>
                            {row[column.field]}
                        </div>
                    ))}
                </div>
            ))}
        </>
    );

    const renderTableFooter = () => (
        <TableFooter>
            <TableRow>
                <TablePagination
                    className={classes.tablePagination}
                    rowsPerPageOptions={[5, 10, 25, 100]}
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
    );

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            {renderTableToolbar()}
            <hr className={classes.hr} />
            <div className={classes.mainTable}>
                {desktop ? (
                    <Table size="small">
                        {renderTableHeader()}
                        {loading ? (
                            null
                        ) : rows.length ? (
                            renderTableBody()
                        ) : (
                            null
                        )}
                    </Table>
                ) : renderBodyMobile()}
                {loading || !rows.length
                    ? (
                        <Table size="small">
                            <TableBody>
                                <TableRow>
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
            <Table className={classes.tableFooter} size="small">{!!count && renderTableFooter()}</Table>
        </TableContainer>
    );
};

export default CustomTable;
