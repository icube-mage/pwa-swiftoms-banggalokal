/* eslint-disable prefer-destructuring */
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
import React from 'react';
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
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import { getComponentOrString } from '@sellermodules/storesetting/plugins/ProductTable/Table/helpers';
import Button from '@common_button';

import TablePaginationActions from '@sellermodules/storesetting/plugins/ProductTable/Table/components/TablePaginationActions';
import Header from '@sellermodules/storesetting/plugins/ProductTable/Table/components/Header';

import useStyles from '@sellermodules/storesetting/plugins/ProductTable/Table/style';

const CustomTable = (props) => {
    const { t } = useTranslation('common');
    const {
        primaryKey = 'entity_id',
        rows,
        filters: initialFilters = [],
        columns = [],
        handleChecked = () => { },
        handleDeleteProduct,
    } = props;
    // hooks
    const classes = useStyles();
    const initialCount = rows.length;
    const [count, setCount] = React.useState(initialCount);
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [search, setSearch] = React.useState('');
    const [isCheckedAllRows, setIsCheckedAllRows] = React.useState(false);
    const [checkedRows, setCheckedRows] = React.useState([]);
    const [filters, setFilters] = React.useState(initialFilters.map((filter) => ({ ...filter, value: filter.initialValue })));
    const [expandedToolbar, setExpandedToolbar] = React.useState();
    const [sorts, setSorts] = React.useState();

    const [filteredProducts, setFilteredProducts] = React.useState([]);

    // methods
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };

    const pickPriceFromString = (price, sorted = '') => {
        let usePrice = '';
        if (price.toString().includes(' - ')) {
            const priceSplitted = price.split(' - ');
            if (sorted === 'ASC') {
                usePrice = Number(priceSplitted[0].replace(/[^0-9-]+/g, ''));
            } else {
                usePrice = Number((priceSplitted[1] || priceSplitted[0]).replace(/[^0-9-]+/g, ''));
            }
        } else {
            usePrice = Number(price.toString().replace(/[^0-9-]+/g, ''));
        }
        return usePrice;
    };

    const fetchRows = () => {
        let temp = [...rows];
        if (search || sorts) {
            if (search) {
                temp = temp.filter((row) => row.name.toString().toLowerCase().includes(search.toLowerCase()));
            }
            if (sorts) {
                if (sorts.field === 'price_formatted') {
                    temp.sort((a, b) => sorts.value === 'ASC'
                        ? pickPriceFromString(a[sorts.field], sorts.value) - pickPriceFromString(b[sorts.field], sorts.value)
                        : pickPriceFromString(b[sorts.field], sorts.value) - pickPriceFromString(a[sorts.field], sorts.value));
                } else {
                    temp.sort((a, b) => sorts.value === 'ASC'
                        ? a[sorts.field].toString().toLowerCase().localeCompare(b[sorts.field].toString().toLowerCase())
                        : b[sorts.field].toString().toLowerCase().localeCompare(a[sorts.field].toString().toLowerCase()));
                }
            }
            setPage(1);
            setCount(temp.length);
            setFilteredProducts(temp);
        } else {
            setCount(initialCount);
            setFilteredProducts([]);
        }
    };

    const dataToMap = ((search || sorts) ? filteredProducts : rows).slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage);

    // effects
    React.useEffect(() => {
        fetchRows();
    }, [filters, search, sorts]);

    React.useEffect(() => {
        setCount(initialCount);
    }, [initialCount]);

    React.useEffect(() => {
        // (search || sorts) ? filteredProducts : rows).slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
        if (!dataToMap.length && page > 1) {
            setPage(page - 1);
        }
    }, [initialCount]);

    React.useEffect(() => {
        // (search || sorts) ? filteredProducts : rows).slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
        setPage(1);
        setSearch('');
        setSorts();
    }, [rows]);

    const renderTableHeader = () => {
        const handleChangeCheckboxAllRows = (checked) => {
            const newCheckedRows = rows.reduce((accumulator, currentValue) => {
                const i = accumulator.findIndex((checkedRow) => checkedRow[primaryKey] === currentValue[primaryKey]);
                if (checked && i < 0) {
                    accumulator.push(currentValue);
                } else if (!checked && i >= 0) {
                    return accumulator.filter((checkedRow) => checkedRow[primaryKey] != currentValue[primaryKey]);
                }
                return accumulator;
            }, checkedRows);
            setCheckedRows(newCheckedRows);
            setIsCheckedAllRows(checked);
            handleChecked(newCheckedRows);
        };
        return (
            <TableHead>
                <TableRow className={classes.tableHead}>
                    <TableCell padding="checkbox">
                        <Checkbox
                            className={classes.checkbox}
                            checked={isCheckedAllRows}
                            onChange={(e) => handleChangeCheckboxAllRows(e.target.checked)}
                        />
                    </TableCell>
                    {columns.map((column, columnIndex) => (
                        <TableCell
                            key={columnIndex}
                            className={clsx(column.hidden && 'hide')}
                        >
                            {!column.sortable && getComponentOrString(column.headerName)}
                        </TableCell>
                    ))}
                    <TableCell />
                </TableRow>
            </TableHead>
        );
    };

    const renderMassAction = () => {
        if (!checkedRows.length) return null;
        return (
            <Grid container className={classes.massAction}>
                <Grid item xs="auto">
                    {checkedRows.length ? `${checkedRows.length} ${t('storesetting:Product_Selected')}` : null}
                </Grid>
                <Grid item xs="auto">
                    <Button
                        className={classes.deactiveBtn}
                        startIcon={<img src="/assets/img/trash-new.svg" alt="trash" />}
                        onClick={() => {
                            handleDeleteProduct(checkedRows.map((row) => (row[primaryKey])));
                            setCheckedRows([]);
                            setIsCheckedAllRows(false);
                        }}
                    >
                        {t('storesetting:Delete_Product')}
                    </Button>
                </Grid>
            </Grid>
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
                {dataToMap.map((row, rowIndex) => (
                    <TableRow
                        key={rowIndex}
                        className={clsx(classes.tableRow, rowIndex % 2 && 'gray')}
                    >
                        <TableCell padding="checkbox">
                            <Checkbox
                                className={classes.checkbox}
                                checked={!!checkedRows.find((checkedRow) => checkedRow[primaryKey] === row[primaryKey])}
                                onChange={(e) => handleChangeCheckboxRow(e.target.checked, row)}
                                disabled={!checkedRows.find((checkedRow) => checkedRow[primaryKey] === row[primaryKey]) && row.disableCheck}
                            />
                        </TableCell>
                        {columns.map((column, columnIndex) => (
                            <TableCell key={columnIndex} className={clsx(column.hidden && 'hide', classes.alignTop)}>
                                {getComponentOrString(row[column.field]) || '-'}
                            </TableCell>
                        ))}
                        <TableCell className={clsx(classes.alignTop)} padding="checkbox">
                            <IconButton onClick={() => {
                                handleDeleteProduct([row[primaryKey]]);
                                const idx = checkedRows.findIndex((r) => r.entity_id === row.entity_id);
                                checkedRows.splice(idx, 1);
                            }}
                            >
                                <img src="/assets/img/trash-new.svg" alt="trash" />
                            </IconButton>
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
        search,
        setSearch,
        fetchRows,
        setExpandedToolbar,
        expandedToolbar,
        setSorts,
        sorts,
    };

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Header {...contentProps} />
            {renderMassAction()}
            <div className={classes.mainTable}>
                <Table size="small">
                    {renderTableHeader()}
                    {dataToMap.length ? (
                        renderTableBody()
                    ) : (
                        null
                    )}
                    {!!dataToMap.length && renderTableFooter()}
                </Table>
                {!dataToMap.length
                    ? (
                        <Table size="small">
                            <TableBody>
                                <TableRow style={{ height: (10 * rowsPerPage) + 10 }}>
                                    <TableCell>
                                        {!dataToMap.length ? (
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
    );
};

export default CustomTable;
