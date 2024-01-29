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
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ImportExportIcon from '@material-ui/icons/ImportExport';

import Button from '@common_button';
import Tabs from '@common_tabsseller';

import HeaderWithdraw from '@sellermodules/income/pages/list/components/Table/components/HeaderWithdraw';
import TablePaginationActions from '@sellermodules/income/pages/list/components/Table/components/TablePaginationActions';

import { getComponentOrString, isEmpty } from '@sellermodules/order/pages/list/components/ListCard/helpers';
import useStyles from '@sellermodules/income/pages/list/components/Table/style';

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
        getVariables,
        columns = [],
        header = '',
    } = props;
    // hooks
    const classes = useStyles();
    const router = useRouter();

    const [page, setPage] = React.useState(initialPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);
    const [filters, setFilters] = React.useState(initialFilters.map((filter) => ({ ...filter, value: filter.initialValue })));
    const [sorts, setSorts] = React.useState(
        columns.filter((column) => column.sortable).map(({ field, initialSort }) => ({ field, value: initialSort || undefined })),
    );

    const { history } = router.query;
    const tab = (history === '' ? 'balance' : history) || 'balance';
    const dataTabs = [
        { label: t('sellerincome:Balance_History'), value: 'balance' },
        { label: t('sellerincome:Withdrawal_History'), value: 'withdraw' },
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
            filter: filters
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
        };
        if (getVariables) {
            getVariables(variables);
        }
        getRows({ variables });
    };
    const onChangeTab = (e, v) => {
        const routeParams = `/${v}`;
        router.replace(`/seller/income${routeParams}`, undefined, { shallow: true });
    };

    // effects
    React.useEffect(() => {
        setPage(1);
        fetchRows();
    }, [rowsPerPage, filters, sorts, tab]);

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
                    {columns.map((column, columnIndex) => (
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
                    ))}
                </TableRow>
            </TableHead>
        );
    };

    const renderTableBody = () => {
        return (
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
    };

    const renderTableFooter = () => {
        return (
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
    };

    const contentProps = {
        ...props,
        filters,
        setFilters,
    };

    return (
        <>
            <Paper className={classes.paperHead}>
                <div className={clsx(classes.header, 'nopad')}>
                    {header}
                </div>
                <Tabs data={dataTabs} onChange={onChangeTab} value={tab} allItems={false} />
                <HeaderWithdraw {...contentProps} />
            </Paper>
            <TableContainer component={Paper} className={classes.tableContainer}>
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
