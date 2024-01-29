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
import { useRouter } from 'next/router';
import { useTranslation } from '@i18n';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { getComponentOrString, useDebounce, isEmpty } from '@common_tableseller/helpers';
import Button from '@common_button';

import Header from '@sellermodules/manageuser/pages/list/components/Table/components/Header';

import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ImportExportIcon from '@material-ui/icons/ImportExport';

import useStyles from '@sellermodules/manageuser/pages/list/components/Table/style';
import TablePaginationComponent from '@common_tableseller/components/TablePagination';
import { breakPointsUp } from '@helper_theme';
import Divider from '@material-ui/core/Divider';

const CustomTable = (props) => {
    const { t } = useTranslation('common');
    const {
        primaryKey = 'source_id',
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
    const classes = useStyles();
    const [page, setPage] = React.useState(initialPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);
    const [search, setSearch] = React.useState('');
    const debouncedSearch = useDebounce(search, 500);
    const [filters, setFilters] = React.useState(initialFilters.map((filter) => ({ ...filter, value: filter.initialValue })));
    const [expandedToolbar, setExpandedToolbar] = React.useState();
    const [sorts, setSorts] = React.useState(
        columns.filter((column) => column.sortable).map(({ field, initialSort }) => ({ field, value: initialSort || undefined })),
    );
    const isDesktop = breakPointsUp('sm');
    const router = useRouter();

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
    React.useEffect(() => {
        setPage(1);
        fetchRows();
    }, [rowsPerPage, filters, debouncedSearch, sorts]);

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

    const renderBodyMobile = () => (
        <>
            {rows.map((row, rowIndex) => (
                <div
                    key={rowIndex}
                    className={classes.divMobile}
                >
                    {columns.map((column, columnIndex) => (
                        <>
                            {(column.field !== 'action' && column.field !== 'delete' && column.field !== 'location') && (
                                <div key={columnIndex} className="row-mobile">
                                    <h4 className={classes.h4}>{column.headerName}</h4>
                                    {getComponentOrString(row[column.field])}
                                </div>
                            )}
                        </>
                    ))}
                    <Divider className="divider" />
                    <div className={classes.rowAction}>
                        <div className="flex-button">
                            <Button
                                classes={{ root: clsx(classes.buttonActionRoot, 'btn-edit') }}
                                onClick={() => router.push(`/seller/manageuser/edit/${row.id}`)}
                            >
                                {t('sellermanageuser:View')}
                            </Button>
                            {columns.map((column) => (
                                <>
                                    {column.field === 'delete' && (
                                        getComponentOrString(row[column.field])
                                    )}
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );

    const renderTableFooter = () => {
        return (
            <TablePaginationComponent
                count={count}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 100]}
                page={page}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                t={t}
            />
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
        primaryKey,
        count,
    };

    return (
        <>
            <TableContainer component={Paper} className={classes.tableContainer} style={{ background: 'transparent', boxShadow: 'none' }}>
                <Header {...contentProps} />
                <div className={classes.mainTable}>
                    {isDesktop ? (
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
                    ) : renderBodyMobile() }
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
