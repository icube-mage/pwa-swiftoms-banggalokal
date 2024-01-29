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
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';

import { useColumns, getComponentOrString } from '@common_tableseller/helpers';
import TextField from '@common_textfield';
import Button from '@common_button';
import ConfirmDialog from '@common_confirmdialog';

import TablePaginationActions from '@common_tableseller/components/TablePaginationActions';
import TabsHeader from '@common_tableseller/components/TabsHeader';
import RowAction from '@common_tableseller/components/RowAction';
import TableFilters from '@common_tableseller/components/TableFilters';

import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import useStyles from '@common_tableseller/style';

const CustomTable = (props) => {
    const { t } = useTranslation('common');
    const {
        primaryKey = 'id',
        showCheckbox = false,
        rows,
        rowActions,
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
        wrapHeader = false,
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
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);
    const [isCheckedAllRows, setIsCheckedAllRows] = React.useState(false);
    const [showMessageActions, setShowMessageActions] = React.useState(true);
    const [checkedRows, setCheckedRows] = React.useState(defaultChecked);
    const [search, setSearch] = React.useState('');
    const [selectedId, setSelectedId] = React.useState();
    const [tab, setTab] = React.useState(defaultValueTab || dataTab?.[0]?.value || 0);
    const {
        columns,
        applyHiddenColumnsDesktop,
        applyHiddenColumnsMobile,
    } = useColumns(props.columns);
    const [filters, setFilters] = React.useState(initialFilters.map((filter) => ({ ...filter, value: filter.initialValue })));
    const [expandedToolbar, setExpandedToolbar] = React.useState();
    const [sorts, setSorts] = React.useState(
        props.columns.filter((column) => column.sortable).map(({ field, initialSort }) => ({ field, value: initialSort || undefined })),
    );
    const [activeAction, setActiveAction] = React.useState();

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

    // effects
    React.useEffect(() => {
        if (getRows) {
            fetchRows();
        }
    }, [page, rowsPerPage, filters, sorts]);

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

    const renderAction = (row) => {
        return (
            <>
                <button
                    id="clickConfirm"
                    className="hide"
                    type="submit"
                    onClick={async () => {
                        if (selectedId >= 0) {
                            await activeAction.onClick(checkedRows);
                            if (activeAction.refetch !== false) {
                                fetchRows();
                            }
                            if (showMessageActions) {
                                window.toastMessage({
                                    open: true,
                                    text: t('common:Success'),
                                    variant: 'success',
                                });
                            }
                            setCheckedRows([]);
                        }
                    }}
                >
                    Auto Confirm
                </button>
                <RowAction
                    openButton={{ label: '' }}
                    icon={<ExpandMoreIcon />}
                    menuItems={rowActions.map((action) => ({
                        label: action.label,
                        hide: action.hide,
                        onClick: () => {
                            setSelectedId(row.id);
                            const tempAction = { ...action };
                            setActiveAction(tempAction);
                            if (tempAction.showMessage !== null) {
                                setShowMessageActions(tempAction.showMessage);
                            } else {
                                setShowMessageActions(false);
                            }
                            if (tempAction.confirmDialog) {
                                setOpenConfirmDialog(true);
                            } else {
                                setTimeout(() => {
                                    document.getElementById('clickConfirm').click();
                                }, 100);
                            }
                        },
                    }))}
                />
            </>
        );
    };

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
                    {showCheckbox && (
                        <TableCell padding="checkbox">
                            {!singleSelection
                                && (
                                    <Checkbox
                                        className={classes.checkbox}
                                        checked={isCheckedAllRows}
                                        onChange={(e) => handleChangeCheckboxAllRows(e.target.checked)}
                                    />
                                )}
                        </TableCell>
                    )}
                    {columns.map((column, columnIndex) => (
                        <TableCell
                            key={columnIndex}
                            className={clsx(column.hidden && 'hide')}
                            style={{ whiteSpace: wrapHeader ? 'unset' : 'nowrap', verticalAlign: wrapHeader ? 'top' : '' }}
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
                    <TableCell padding="checkbox" />
                </TableRow>
            </TableHead>
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
        return (
            <TableBody>
                {rows.map((row, rowIndex) => (
                    <TableRow
                        key={rowIndex}
                        onClick={() => (handleClickRow ? handleClickRow(row) : null)}
                        style={{
                            cursor: handleClickRow ? 'pointer' : 'default',
                        }}
                        className={clsx(classes.tableRow, rowIndex % 2 && 'gray')}
                    >
                        {showCheckbox && (
                            <TableCell padding="checkbox">
                                <Checkbox
                                    className={classes.checkbox}
                                    checked={!!checkedRows.find((checkedRow) => checkedRow[primaryKey] === row[primaryKey])}
                                    onChange={(e) => handleChangeCheckboxRow(e.target.checked, row)}
                                    disabled={!checkedRows.find((checkedRow) => checkedRow[primaryKey] === row[primaryKey]) && row.disableCheck}
                                />
                            </TableCell>
                        )}
                        {columns.map((column, columnIndex) => (
                            <TableCell key={columnIndex} className={clsx(column.hidden && 'hide', classes.alignTop)}>
                                {getComponentOrString(row[column.field]) || '-'}
                            </TableCell>
                        ))}
                        {!!rowActions?.length
                            && (
                                <TableCell className={clsx(classes.alignTop)} padding="checkbox">
                                    {renderAction(row)}
                                </TableCell>
                            )}
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
            <TableContainer component={Paper} className={classes.tableContainer}>
                {!hideHead && !useTabs && renderHead()}
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
            </TableContainer>
            <TableContainer component={Paper} className={clsx(classes.tableContainer, 'footer')}>
                <Table size="small">{!hideFooter && renderTableFooter()}</Table>
            </TableContainer>
            <div style={{ height: 20 }} />
            <ConfirmDialog
                open={openConfirmDialog}
                onCancel={() => setOpenConfirmDialog(false)}
                onConfirm={async () => {
                    window.backdropLoader(true);
                    if (selectedId >= 0) {
                        setOpenConfirmDialog(false);
                        await activeAction.onClick(selectedId);
                        if (activeAction.refetch !== false) {
                            fetchRows();
                        }
                        if (showMessageActions) {
                            window.toastMessage({
                                open: true,
                                text: t('common:Success'),
                                variant: 'success',
                            });
                        }
                    }
                    setCheckedRows([]);
                    setOpenConfirmDialog(false);
                    window.backdropLoader(false);
                }}
                title={activeAction && activeAction.title}
                message={activeAction && activeAction.message}
            />
        </>
    );
};

export default CustomTable;
