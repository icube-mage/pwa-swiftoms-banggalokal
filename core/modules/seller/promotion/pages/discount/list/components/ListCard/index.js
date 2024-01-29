/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
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

import Button from '@common_button';

import {
    useColumns, getComponentOrString, useDebounce, isEmpty,
} from '@sellermodules/promotion/pages/discount/list/components/ListCard/helpers';
import TablePaginationActions from '@sellermodules/promotion/pages/discount/list/components/ListCard/components/TablePaginationActions';
import TabsHeader from '@sellermodules/promotion/pages/discount/list/components/ListCard/components/TabsHeader';
import Variants from '@sellermodules/promotion/pages/discount/list/components/ListCard/components/Variants';
import Confirmation from '@sellermodules/promotion/pages/discount/list/components/ListCard/components/Confirmation';

import useStyles from '@sellermodules/promotion/pages/discount/list/components/ListCard/style';

const CustomTable = (props) => {
    const { t } = useTranslation('common');
    const {
        primaryKey = 'id',
        showCheckbox = false,
        rows,
        actions,
        getRows,
        loading,
        filters: initialFilters = [],
        initialPage = 1,
        initialRowsPerPage = 10,
        count,
        hideFooter = false,
        indexType = 0,
        getVariables,
        doRefetch = null,
        setDoRefetch = () => { },
        handleChecked = () => { },
        defaultChecked = [],
        singleSelection = false,
        useTabs = false,
        handleDelete,
        handleSingleDelete,
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
    const [showConfirm, setShowConfirm] = React.useState(false);

    const {
        columns,
        applyHiddenColumnsDesktop,
        applyHiddenColumnsMobile,
    } = useColumns(props.columns);
    const [filters, setFilters] = React.useState(initialFilters.map((filter) => ({ ...filter, value: filter.initialValue })));
    const [expandedToolbar, setExpandedToolbar] = React.useState();
    const { status } = router.query;
    const tab = (status === '' ? 'on_going' : status) || 'on_going';

    const dataTabs = [
        { label: t('sellerpromotion:Ongoing'), value: 'on_going' },
        { label: t('sellerpromotion:Upcoming'), value: 'upcoming' },
        { label: t('sellerpromotion:Expired'), value: 'expired' },
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
                field: 'discount_status',
                name: 'discount_status',
                type: 'eq',
                format: 'tab',
                value: status || 'on_going',
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
        setCheckedRows,
        setIsCheckedAllRows,
    };

    const renderAction = () => (
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
            {!!(checkedRows.length && count)
                    && (
                        <Grid item>
                            <Button
                                className={clsx(classes.btnAction, 'check')}
                                onClick={() => setShowConfirm(true)}
                                disabled={!checkedRows.length}
                            >
                                {t('sellerpromotion:Delete_Discount')}
                            </Button>
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

    const renderTableBody = () => {
        const handleChangeCheckboxRow = (checked, row) => {
            const i = checkedRows.findIndex((checkedRow) => checkedRow[primaryKey] === row[primaryKey]);
            if (singleSelection) {
                setCheckedRows([row]);
                handleChecked([row]);
            } else if (checked && i < 0) {
                if (checkedRows.length === rows.length - 1) {
                    setIsCheckedAllRows(true);
                }
                setCheckedRows([...checkedRows, row]);
                handleChecked([...checkedRows, row]);
            } else if (!checked && i >= 0) {
                if (checkedRows.length !== rows.length - 1) {
                    setIsCheckedAllRows(false);
                }
                setCheckedRows(checkedRows.filter((checkedRow) => checkedRow[primaryKey] != row[primaryKey]));
                handleChecked(checkedRows.filter((checkedRow) => checkedRow[primaryKey] != row[primaryKey]));
            }
        };
        return (rows.map((row, rowIndex) => (
            <Paper
                key={rowIndex}
                className={classes.rowPaper}
            >
                <div className={classes.divParent}>
                    <Checkbox
                        className={clsx(classes.checkbox, 'sub')}
                        checked={!!checkedRows.find((checkedRow) => checkedRow[primaryKey] === row[primaryKey])}
                        onChange={(e) => handleChangeCheckboxRow(e.target.checked, row)}
                        disabled={!checkedRows.find((checkedRow) => checkedRow[primaryKey] === row[primaryKey]) && row.disableCheck}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <div className={classes.rowGrid}>
                        {columns.map((column, columnIndex) => (
                            <div key={columnIndex} className={clsx(column.hidden && 'hide', classes.alignTop, 'box', column.small && 'small')}>
                                {column.headerName
                                    ? (
                                        <div className="title">{getComponentOrString(column.headerName)}</div>
                                    )
                                    : null}
                                {getComponentOrString(row[column.field]) || '-'}
                            </div>
                        ))}
                        <div className={clsx(classes.alignTop, 'box', 'small')}>
                            <div className="title">{t('sellerpromotion:Action')}</div>
                            <div className={classes.action}>
                                <Link href="/seller/promotion/discount/edit/">
                                    <Button buttonType="link" onClick={row.edit} className={classes.link}>
                                        {t('usergroup:Edit')}
                                    </Button>
                                </Link>
                                <img
                                    id="button-delete"
                                    src="/assets/img/trash-new.svg"
                                    alt="delete"
                                    className={classes.trashIcon}
                                    onClick={() => handleSingleDelete(row, true, null,
                                        () => {
                                            setCheckedRows([]);
                                            setIsCheckedAllRows(false);
                                        })}
                                    aria-hidden="true"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {!!row.variants_product?.length
                    && (
                        <Variants
                            {...contentProps}
                            parentChecked={!!checkedRows.find((checkedRow) => checkedRow[primaryKey] === row[primaryKey])}
                            onChangeParent={handleChangeCheckboxRow}
                            rowIndex={rowIndex}
                            columns={columns}
                            row={row}
                            setCheckedRows={setCheckedRows}
                            setIsCheckedAllRows={setIsCheckedAllRows}
                        />
                    )}
            </Paper>
        ))
        );
    };

    const renderTableFooter = () => (
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
            <Confirmation
                open={showConfirm}
                onConfirm={() => handleDelete(
                    checkedRows,
                    setShowConfirm(false),
                    () => {
                        setCheckedRows([]);
                        setIsCheckedAllRows(false);
                    },
                )}
                onCancel={() => setShowConfirm(false)}
                productSelected={checkedRows}
                t={t}
                multiple
            />
        </>
    );
};

export default CustomTable;
