/* eslint-disable no-prototype-builtins */
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
import React, { useState, useEffect, Fragment } from 'react';
import classNames from 'classnames';
import clsx from 'clsx';
import { useTranslation } from '@i18n';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';

import Switch from '@common_switch';

import TablePaginationActions from '@sellermodules/promotion/pages/discount/list/components/ProductModal/Table/components/TablePaginationActions';
import Header from '@sellermodules/promotion/pages/discount/list/components/ProductModal/Table/components/Header';
import Variants from '@sellermodules/promotion/pages/discount/list/components/ProductModal/Table/components/Variants';
import { getComponentOrString, useDebounce, isEmpty } from '@sellermodules/promotion/pages/discount/list/components/ProductModal/Table/helpers';
import useStyles from '@sellermodules/promotion/pages/discount/list/components/ProductModal/Table/style';

const CustomTable = (props) => {
    const { t } = useTranslation('common');
    const {
        primaryKey = 'entity_id',
        rows,
        getRows,
        filters: initialFilters = [],
        initialPage = 1,
        initialRowsPerPage = 10,
        count,
        getVariables,
        columns = [],
        handleChecked = () => { },
        handleUpdateStatus = () => { },
        loading,
    } = props;
    // hooks
    const classes = useStyles();
    const [page, setPage] = React.useState(initialPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);
    const [checkedRows, setCheckedRows] = useState([]);
    const [filters, setFilters] = useState(initialFilters.map((filter) => ({ ...filter, value: filter.initialValue })));
    const [expandedToolbar, setExpandedToolbar] = useState();
    const [sorts, setSorts] = useState([]);

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
            search,
        };
        if (getVariables) {
            getVariables(variables);
        }
        getRows({ variables });
    };

    // effects
    useEffect(() => {
        if (getRows) {
            fetchRows();
        }
    }, [page, rowsPerPage, filters, debouncedSearch, sorts]);

    const contentProps = {
        ...props,
        filters,
        setFilters,
        search,
        setSearch,
        fetchRows,
        setExpandedToolbar,
        expandedToolbar,
        sorts,
        setSorts,
        checkedRows,
        setCheckedRows,
    };

    const renderTableHeader = () => {
        return (
            <TableHead>
                <TableRow className={classes.tableHead}>
                    <TableCell padding="checkbox" />
                    {columns.map((column, columnIndex) => (
                        <TableCell
                            key={columnIndex}
                            className={clsx(column.hidden && 'hide')}
                        >
                            {getComponentOrString(column.headerName)}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    };

    const renderTableBody = () => {
        const handleChangeCheckboxRow = (checked, row) => {
            const i = checkedRows.findIndex((checkedRow) => checkedRow[primaryKey] === row[primaryKey]);
            if (checked && i < 0) {
                setCheckedRows([...checkedRows, row]);
                handleChecked([...checkedRows, row]);
            } else {
                setCheckedRows(checkedRows.filter((checkedRow) => checkedRow[primaryKey] != row[primaryKey]));
                handleChecked(checkedRows.filter((checkedRow) => checkedRow[primaryKey] != row[primaryKey]));
            }
        };
        return (
            <TableBody>
                {rows.map((row, rowIndex) => (
                    <Fragment key={rowIndex}>
                        <TableRow className={classNames(classes.tableRow, rowIndex % 2 && 'gray', 'grid-item')}>
                            <TableCell padding="checkbox" className={clsx(classes.alignTop, !!row.variants?.length && 'noborder')}>
                                <Checkbox
                                    className={classes.checkbox}
                                    checked={!!checkedRows.find((checkedRow) => checkedRow[primaryKey] === row[primaryKey])}
                                    onChange={(e) => handleChangeCheckboxRow(e.target.checked, row)}
                                />
                            </TableCell>
                            {columns.map((column, columnIndex) => (
                                <TableCell
                                    key={columnIndex}
                                    className={clsx(column.hidden && 'hide',
                                        classes.alignTop, !!row.variants?.length && 'noborder')}
                                >
                                    {column.field === 'status'
                                        ? (
                                            <Switch
                                                value={row.status === '1'}
                                                onChange={() => handleUpdateStatus(
                                                    [{ entity_id: row.entity_id, status: String(row.status === '1' ? '2' : '1') }],
                                                    () => {
                                                        setCheckedRows([]);
                                                    },
                                                )}
                                                trueLabel=""
                                                falseLabel=""
                                            />
                                        )
                                        : getComponentOrString(row[column.field]) || '-'}
                                </TableCell>
                            ))}
                        </TableRow>
                        {!!row.variants?.length
                            && (
                                <Variants
                                    {...contentProps}
                                    parentChecked={!!checkedRows.find((checkedRow) => checkedRow[primaryKey] === row[primaryKey])}
                                    onChangeParent={handleChangeCheckboxRow}
                                    rowIndex={rowIndex}
                                    columns={columns}
                                    row={row}
                                />
                            )}
                    </Fragment>
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

    return (
        <>
            <Header {...contentProps} />
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table size="small" stickyHeader>
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
                                <TableRow style={{ height: 490 }}>
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
            </TableContainer>
            <TableContainer component={Paper} className={clsx(classes.tableContainer, 'footer')}>
                <Table size="small">{!!count && renderTableFooter()}</Table>
            </TableContainer>
        </>
    );
};

export default CustomTable;
