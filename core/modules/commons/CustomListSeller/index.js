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

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';

import { useColumns, getComponentOrString } from '@common_customlistseller/helpers';
import TextField from '@common_textfield';
import Button from '@common_button';

import TablePaginationActions from '@common_customlistseller/components/TablePaginationActions';
import TabsHeader from '@common_customlistseller/components/TabsHeader';
import TableFilters from '@common_customlistseller/components/TableFilters';

import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import useStyles from '@common_customlistseller/style';

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
        toolActionsRight = [],
        toolActionsLeft = [],
        filters: initialFilters = [],
        initialPage = 1,
        initialRowsPerPage = 10,
        count,
        hideHead = false,
        hideSearch = false,
        hideFilters = false,
        hideFooter = false,
        hideTitle = false,
        hideToolbar = false,
        handleClickRow = null,
        handleReset,
        indexType = 0,
        getVariables,
        doRefetch = null,
        setDoRefetch = () => { },
        handleChecked = () => { },
        defaultChecked = [],
        singleSelection = false,
        header = '',
        searchPlaceholder = '',
        useTabs = false,
        dataTab = [],
        defaultValueTab = '',
    } = props;
    // hooks
    const desktop = breakPointsUp('sm');
    const classes = useStyles();
    const [page, setPage] = React.useState(initialPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);
    const [checkedRows, setCheckedRows] = React.useState(defaultChecked);
    const [isCheckedAllRows, setIsCheckedAllRows] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [tab, setTab] = React.useState(defaultValueTab || dataTab?.[0]?.value || 0);
    const {
        columns,
        applyHiddenColumnsDesktop,
        applyHiddenColumnsMobile,
    } = useColumns(props.columns);
    const [filters, setFilters] = React.useState(initialFilters.map((filter) => ({ ...filter, value: filter.initialValue })));
    const [expandedToolbar, setExpandedToolbar] = React.useState();

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
            search,
        };
        if (getVariables) {
            getVariables(variables);
        }
        getRows({ variables });
    };

    const setHiddenResponsive = () => {
        if (!desktop) {
            applyHiddenColumnsMobile();
        } else {
            applyHiddenColumnsDesktop();
        }
    };

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
    };

    // effects
    React.useEffect(() => {
        if (getRows) {
            fetchRows();
        }
    }, [page, rowsPerPage, filters]);

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

    const renderHead = () => {
        const getArrowClass = (anchor) => (anchor ? classes.arrowUp : classes.arrowDown);
        return (
            <>
                {!hideTitle
                    && (
                        <div className={classes.header}>
                            {header}
                        </div>
                    )}
                {!hideToolbar
                    && (
                        <div className={classes.tableToolbar}>
                            <div className="top-buttons-wrapper">
                                <div className="top-item-left">
                                    {!hideSearch
                                        && (
                                            <div className="top-item">
                                                <TextField
                                                    name="email"
                                                    placeholder={searchPlaceholder}
                                                    onChange={(e) => setSearch(e.target.value)}
                                                    className={classes.textInput}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <img alt="" src="/assets/img/search.svg" className={classes.iconImg} />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.keyCode == 13) {
                                                            fetchRows();
                                                        }
                                                    }}
                                                />
                                            </div>
                                        )}

                                    {toolActionsLeft.length
                                        ? (
                                            <div className="top-item-right">
                                                {toolActionsLeft.map((component) => (
                                                    <div className="top-item">
                                                        {component}
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                        : null}
                                </div>
                                <div className="top-item-right">
                                    {toolActionsRight.length
                                        ? (toolActionsRight.map((component) => (
                                            <div className="top-item">
                                                {component}
                                            </div>
                                        ))
                                        )
                                        : null}
                                    {!hideFilters && !!filters.length
                                        && (
                                            <div className="top-item">
                                                <Button
                                                    className={clsx(classes.btnAction, 'filter')}
                                                    onClick={() => setExpandedToolbar(expandedToolbar != 'filters' ? 'filters' : '')}
                                                    endIcon={
                                                        <KeyboardArrowRightIcon className={getArrowClass(expandedToolbar)} />
                                                    }
                                                >
                                                    <span className={classes.btnText}>
                                                        {t('common:Filters')}
                                                    </span>
                                                </Button>
                                            </div>
                                        )}
                                </div>
                            </div>
                            <div className={classes.expandContainer}>
                                <Collapse in={expandedToolbar === 'filters'}>
                                    <TableFilters
                                        initialFilters={filters}
                                        setParentFilters={setFilters}
                                        handleReset={handleReset}
                                        t={t}
                                    />
                                </Collapse>
                            </div>
                        </div>
                    )}
            </>
        );
    };

    const renderAction = () => {
        return (
            <Grid container spacing={3} className={classes.checkAllContainer}>
                {showCheckbox && (
                    <Grid item>
                        <Checkbox
                            className={classes.checkbox}
                            label={`${checkedRows.length} ${t('common:Selected')}`}
                            checked={isCheckedAllRows}
                            onChange={(e) => handleChangeCheckboxAllRows(e.target.checked)}
                        />
                        {`${checkedRows.length} ${t('common:selected')}`}
                    </Grid>
                )}
                {checkedRows.length && actions?.length
                    ? (actions.map((act) => (
                        <Grid item>
                            <Button
                                className={clsx(classes.btnAction, 'check')}
                                onClick={act.onClick}
                            >
                                <span className={classes.btnText}>
                                    {act.label}
                                </span>
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
                <Paper
                    key={rowIndex}
                    onClick={() => (handleClickRow ? handleClickRow(row) : null)}
                    style={{
                        cursor: handleClickRow ? 'pointer' : 'default',
                    }}
                    className={classes.rowPaper}
                >
                    <div className={classes.rowHead}>
                        {showCheckbox && (
                            <Checkbox
                                className={classes.checkbox}
                                checked={!!checkedRows.find((checkedRow) => checkedRow[primaryKey] === row[primaryKey])}
                                onChange={(e) => handleChangeCheckboxRow(e.target.checked, row)}
                                disabled={!checkedRows.find((checkedRow) => checkedRow[primaryKey] === row[primaryKey]) && row.disableCheck}
                            />
                        )}
                        {row.header
                            ? getComponentOrString(row.header)
                            : null}
                    </div>

                    <div
                        container
                        spacing={3}
                        className={classes.rowBody}
                    >
                        {columns.map((column, columnIndex) => (
                            <div item key={columnIndex} className={clsx(column.hidden && 'hide', classes.alignTop, 'box')}>
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
                                <div item className={clsx(classes.alignTop)}>
                                    {renderAction(row)}
                                </div>
                            )}
                    </div>
                    {row.footer
                        ? <div className={classes.rowFooter}>{getComponentOrString(row.footer)}</div>
                        : null}
                </Paper>
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
        setSearch,
        fetchRows,
        setExpandedToolbar,
        expandedToolbar,
        tab,
        setTab,
    };

    return (
        <>
            {useTabs && <TabsHeader {...contentProps} />}
            <div>
                {!hideHead && !useTabs && renderHead()}
                <div className={classes.mainTable}>
                    <Table size="small">
                        {renderAction()}
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
            </div>
            <TableContainer component={Paper} className={clsx(classes.tableContainer, 'footer')}>
                <Table size="small">{!hideFooter && renderTableFooter()}</Table>
            </TableContainer>
            <div style={{ height: 20 }} />
        </>
    );
};

export default CustomTable;
