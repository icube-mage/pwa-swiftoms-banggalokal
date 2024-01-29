/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

import { getComponentOrString, useDebounce, isEmpty } from '@sellermodules/return/pages/list/components/Table/helpers';
import Button from '@common_button';

import TablePaginationActions from '@sellermodules/return/pages/list/components/Table/components/TablePaginationActions';
import TabsHeader from '@sellermodules/return/pages/list/components/Table/components/TabsHeader';

import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ImportExportIcon from '@material-ui/icons/ImportExport';

import useStyles from '@sellermodules/return/pages/list/components/Table/style';

const CustomTable = (props) => {
    const {
        t,
        rows,
        getRows,
        loading,
        filters: initialFilters = [],
        initialPage = 1,
        initialRowsPerPage = 10,
        count,
        getVariables,
        columns = [],
    } = props;
    // hooks
    const router = useRouter();
    const classes = useStyles();
    const [page, setPage] = React.useState(initialPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);
    const [search, setSearch] = React.useState('');
    const debouncedSearch = useDebounce(search, 500);
    const [filters, setFilters] = React.useState(initialFilters.map((filter) => ({ ...filter, value: filter.initialValue })));
    const [expandedToolbar, setExpandedToolbar] = React.useState();
    const [selectedDate, setSelectedDate] = React.useState([null, null]);
    const [sorts, setSorts] = React.useState(
        columns.filter((column) => column.sortable).map(({ field, initialSort }) => ({ field, value: initialSort || undefined })),
    );

    const { status } = router.query;
    const tab = (status === '' ? 'all' : status) || 'all';

    const dataTabs = [
        { label: t('sellerreturn:All_Returns'), value: 'all' },
        { label: t('sellerreturn:Pending_Approval'), value: 'pending_approval' },
        { label: t('sellerreturn:Approved'), value: 'approved' },
        { label: t('sellerreturn:Package_Sent'), value: 'package_sent' },
        { label: t('sellerreturn:Package_Received'), value: 'package_received' },
        { label: t('sellerreturn:Processing'), value: 'processing' },
        { label: t('sellerreturn:Complete'), value: 'complete' },
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
                field: 'status_code',
                name: 'status_code',
                type: 'eq',
                value: status,
            }]
                .filter((e) => !isEmpty(e.value))
                .reduce((accumulator, currentValue) => {
                    accumulator[currentValue.field] = {
                        ...accumulator[currentValue.field],
                        [currentValue.type]: currentValue.value,
                    };
                    return accumulator;
                }, {}),
            sort: sorts.reduce((accumulator, currentValue) => {
                accumulator[currentValue.field] = currentValue.value || undefined;
                return accumulator;
            }, {}),
            search,
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
    }, [rowsPerPage, filters, debouncedSearch, sorts, tab]);

    React.useEffect(() => {
        if (getRows) {
            fetchRows();
        }
    }, [page]);

    const renderTableHeader = () => {
        const setSortByField = (field) => {
            setSorts(
                sorts.map((sort) => ({
                    ...sort,
                    ...(sort.field === field && { value: sort.value === 'ASC' ? 'DESC' : 'ASC' }),
                    ...(sort.field != field && { value: undefined }),
                })),
            );
        };
        const getSortValue = (field) => {
            const sort = sorts.find((e) => e.field === field);
            return sort && sort.value;
        };
        const getArrowClass = (field) => (getSortValue(field) === 'ASC' ? classes.arrowDown : classes.arrowUp);
        return (
            <TableHead>
                <TableRow className={classes.tableHead}>
                    {columns.map((column, columnIndex) => (column.field === 'status' && !!status ? null
                        : (
                            <TableCell
                                key={columnIndex}
                                className={clsx(column.hidden && 'hide')}
                            >
                                {!column.sortable && getComponentOrString(column.headerName)}
                                {column.sortable && (
                                    <Button
                                        onClick={() => setSortByField(column.field)}
                                        className={classes.sortButon}
                                        buttonType="link"
                                        endIcon={
                                            getSortValue(column.field) ? (
                                                <ArrowRightAltIcon className={getArrowClass(column.field)} />
                                            ) : (
                                                <ImportExportIcon style={{ opacity: 0.3 }} />
                                            )
                                        }
                                    >
                                        {column.headerName}
                                    </Button>
                                )}
                            </TableCell>
                        )
                    ))}
                </TableRow>
            </TableHead>
        );
    };

    const renderTableBody = () => (
        <TableBody>
            {rows.map((row, rowIndex) => (
                <TableRow
                    key={rowIndex}
                    className={clsx(classes.tableRow, rowIndex % 2 && 'gray')}
                >
                    {columns.map((column, columnIndex) => (
                        <TableCell key={columnIndex} className={clsx(column.hidden && 'hide', classes.alignTop)}>
                            {getComponentOrString(row[column.field]) || '-'}
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    );

    const renderTableFooter = () => (
        <>
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
        </>
    );

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
    };

    return (
        <>
            <TableContainer component={Paper} className={classes.tableContainer} style={{ background: 'transparent', boxShadow: 'none' }}>
                <TabsHeader {...contentProps} />
                <div className={classes.mainTable}>
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
            <TableContainer component={Paper} className={clsx(classes.tableContainer, 'footer')}>
                <Table size="small">{!!count && renderTableFooter()}</Table>
            </TableContainer>
            <div style={{ height: 20 }} />
        </>
    );
};

export default CustomTable;
