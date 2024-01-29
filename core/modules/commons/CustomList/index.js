/* eslint-disable radix */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-confusing-arrow */
/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable eqeqeq */
/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
import useStyles from '@common_customlist/style';
import Button from '@common_button';
import ListFilters from '@common_customlist/components/ListFilters';
import ConfirmDialog from 'core/modules/commons/ConfirmDialog';
import MenuPopover from '@common_menupopover';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';
import { useTranslation } from '@i18n';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from '@common_table/components/TablePaginationActions';
import { breakPointsUp } from '@helper_theme';

// helpers
const getComponentOrString = (param) => (typeof param === 'function' ? param() : param);

const useColumns = (initialColumns) => {
    const _initialColumns = initialColumns.map((column) => ({
        ...column,
        hidden: column.hidden ? column.hidden : false,
    }));
    const [columns, setColumns] = React.useState(_initialColumns);
    const [hiddenColumns, setHiddenColumns] = React.useState(_initialColumns);

    const setHiddenColumn = (field, hidden) => {
        setHiddenColumns(
            hiddenColumns.map((column) => ({
                ...column,
                hidden: field == column.field ? hidden : column.hidden,
            })),
        );
    };

    const applyHiddenColumns = () => {
        setColumns(
            columns.map((column, i) => ({
                ...column,
                hidden: hiddenColumns[i].hidden,
            })),
        );
    };

    const resetHiddenColumn = () => {
        const resetedHiddenColumns = columns.map((column) => ({ ...column, hidden: false }));
        setHiddenColumns(resetedHiddenColumns);
        setColumns(resetedHiddenColumns);
    };

    return {
        columns,
        hiddenColumns,
        setHiddenColumn,
        applyHiddenColumns,
        resetHiddenColumn,
    };
};

const CustomList = (props) => {
    const { t } = useTranslation('common');
    const {
        showCheckbox = false,
        checkboxAll = false,
        primaryKey = 'id',
        rows,
        getRows,
        deleteRows,
        deleteLabel = t('common:Delete'),
        deleteTitle = t('common:Confirmation'),
        deleteMessage = t('common:Are_you_sure_want_to_delete_selected_items'),
        deleteMessageNoRecord = t('common:You_haven\'t_selected_any_items'),
        deleteEnableConfirm = true,
        allowActionZeroSelected = false,
        loading,
        filters: initialFilters = [],
        initialPage = 0,
        initialRowsPerPage = 10,
        count,
        actions,
        allowAppendExistingActions = false,
        hideActions = false,
        hideColumn = true,
        hideFilters = false,
        hideHeader = false,
        handleClickRow = null,
        getKey = true,
        handleReset,
        handleExport,
        indexType = 0,
        exports = [],
        header = null,
        handleChecked = () => { },
        usePagination = false,
        twoColumns = false,
        recordName = t('common:record'),
        varExport,
        setVarExport,
        exportWithId,
        doRefetch = null,
        setDoRefetch = () => { },
    } = props;
    // hooks
    const classes = useStyles();
    const [page, setPage] = React.useState(initialPage);
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
    // eslint-disable-next-line no-unused-vars
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);
    const [isCheckedAllRows, setIsCheckedAllRows] = React.useState(false);
    const [showMessageActions, setShowMessageActions] = React.useState(true);
    const [checkedRows, setCheckedRows] = React.useState([]);
    const [expandedToolbar, setExpandedToolbar] = React.useState();
    const { columns, hiddenColumns, setHiddenColumn, applyHiddenColumns, resetHiddenColumn } = useColumns(props.columns);
    const [filters, setFilters] = React.useState(initialFilters.map((filter) => ({ ...filter, value: filter.initialValue })));
    const [sorts] = React.useState(
        props.columns.filter((column) => column.sortable).map(({ field, initialSort }) => ({ field, value: initialSort })),
    );
    const [activeAction, setActiveAction] = React.useState();
    const desktop = breakPointsUp('sm');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const fetchRows = () => {
        const isEmpty = (value) => {
            if ([undefined, null, '', false].includes(value)) return true;
            if (value && value.length <= 0) return true;
            return false;
        };
        const variables = {
            pageSize: rowsPerPage,
            currentPage: page + 1,
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
        const variablesExport = {
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
        if (setVarExport) {
            setVarExport(variablesExport);
        }
        getRows({ variables });
        setCheckedRows([]);
    };

    const handleChangeCheckboxRow = (checked, row) => {
        const i = checkedRows.findIndex((checkedRow) => checkedRow[primaryKey] === row[primaryKey]);
        if (checked && i < 0) {
            setCheckedRows([...checkedRows, row]);
            handleChecked([...checkedRows, row]);
        } else if (!checked && i >= 0) {
            // eslint-disable-next-line eqeqeq
            setCheckedRows(checkedRows.filter((checkedRow) => checkedRow[primaryKey] != row[primaryKey]));
            handleChecked(checkedRows.filter((checkedRow) => checkedRow[primaryKey] != row[primaryKey]));
        }
    };

    React.useEffect(() => {
        setPage(0);
        fetchRows();
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

    const cancelDeleteRowNotif = () => {
        setOpenConfirmDialog(false);
        window.toastMessage({
            open: true,
            text: t('common:Canceled'),
            variant: 'error',
        });
    };

    React.useEffect(() => {
        if (exportWithId === true) {
            const variables = checkedRows && checkedRows.map((checkedRow) => checkedRow.id);
            const prevState = varExport;
            prevState.id = variables;
            setVarExport(prevState);
        }
    }, [checkedRows]);

    const renderTableToolbar = () => {
        const defaultActionDelete = {
            title: checkedRows.length === 0 ? t('common:Attention') : deleteTitle,
            label: deleteLabel,
            message: !checkedRows.length ? deleteMessageNoRecord : deleteMessage,
            confirmDialog: deleteEnableConfirm,
            onClick: async (_checkedRows) => {
                const variables = { [primaryKey]: _checkedRows.map((checkedRow) => checkedRow[primaryKey]) };
                try {
                    await deleteRows({ variables });
                    window.toastMessage({
                        open: true,
                        text: t('common:The_recordName_was_deleted', { recordName }),
                        variant: 'success',
                    });
                } catch (error) {
                    window.toastMessage({
                        open: true,
                        text: error?.message ?? t('common:failed_delete_action'),
                        variant: 'error',
                    });
                }
            },
        };

        let toolbarActions = [];

        if (allowAppendExistingActions || !actions) {
            toolbarActions = [defaultActionDelete];
        }
        if (actions) {
            toolbarActions = [...toolbarActions, ...actions];
        }
        return (
            <>
                {!hideHeader && (
                    <div className={classes.tableToolbar}>
                        <div className={header ? 'top-header' : 'top'} style={actions && { display: 'block' }}>
                            {header && header()}
                            <div className="top-buttons-wrapper">
                                {!hideActions && (
                                    <div className="top-item">
                                        <ConfirmDialog
                                            open={openConfirmDialog}
                                            onTable
                                            onCancel={() => cancelDeleteRowNotif()}
                                            onConfirm={async () => {
                                                window.backdropLoader(true);
                                                if ((checkedRows && checkedRows.length) || allowActionZeroSelected) {
                                                    setOpenConfirmDialog(false);
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
                                                }
                                                setCheckedRows([]);
                                                setOpenConfirmDialog(false);
                                                window.backdropLoader(false);
                                            }}
                                            title={activeAction && activeAction.title}
                                            message={activeAction && activeAction.message}
                                            records={checkedRows.length}
                                        />
                                        <button
                                            id="clickConfirm"
                                            className="hide"
                                            type="submit"
                                            onClick={async () => {
                                                if (checkedRows && checkedRows.length) {
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
                                                    // window.location.reload();
                                                }
                                            }}
                                        >
                                            Auto Confirm
                                        </button>
                                        <MenuPopover
                                            openButton={{ label: t('common:Actions') }}
                                            icon={<ExpandMoreIcon />}
                                            menuItems={toolbarActions.map((action) => ({
                                                label: action.label,
                                                onClick: () => {
                                                    const tempAction = { ...action };

                                                    if (allowActionZeroSelected && checkedRows?.length === 0) {
                                                        tempAction.confirmDialog = true;
                                                    }
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
                                    </div>
                                )}
                                {!hideColumn && (
                                    <div className="top-item">
                                        <Button
                                            className={clsx(classes.btn, 'filter')}
                                            onClick={() => setExpandedToolbar(expandedToolbar != 'toggleColums' ? 'toggleColums' : '')}
                                            variant="contained"
                                            buttonType="primary-rounded"
                                        >
                                            <img alt="icon_column" className="btnIcon" src="/assets/img/icon_column.svg" />
                                            {desktop && t('common:columns')}
                                        </Button>
                                    </div>
                                )}

                                {!hideFilters && (
                                    <div className="top-item">
                                        <Button
                                            className={clsx(classes.btn, 'filter')}
                                            onClick={() => setExpandedToolbar(expandedToolbar != 'filters' ? 'filters' : '')}
                                            variant="contained"
                                            buttonType="primary-rounded"
                                        >
                                            <img alt="icon_filter" className="btnIcon" src="/assets/img/icon_filter.svg" />
                                            {desktop && t('common:filters')}
                                        </Button>
                                    </div>
                                )}

                                {handleExport && (
                                    <div className="top-item">
                                        <Button
                                            className={clsx(classes.btn, 'filter')}
                                            onClick={handleExport}
                                            variant="contained"
                                            buttonType="primary-rounded"
                                        >
                                            <img alt="icon_export" className="btnIcon" src="/assets/img/icon_export.svg" />
                                            {desktop && t('common:export')}
                                        </Button>
                                    </div>
                                )}
                                {exports.length ? (
                                    <>
                                        <button
                                            id="clickConfirmExport"
                                            className="hide"
                                            type="submit"
                                            onClick={() => {
                                                activeAction.onClick(checkedRows);
                                            }}
                                        >
                                            {t('common:Auto_Confirm')}
                                        </button>
                                        <div className="top-item">
                                            <MenuPopover
                                                openButton={{ label: desktop && t('common:Exports') }}
                                                className={clsx(classes.btn, 'filter')}
                                                color="purple"
                                                iconPosition="end"
                                                icon={<img alt="icon_export" className="btnIcon" src="/assets/img/icon_export.svg" />}
                                                menuItems={exports.map((action) => ({
                                                    label: action.label,
                                                    onClick: () => {
                                                        setActiveAction(action);
                                                        setTimeout(() => {
                                                            document.getElementById('clickConfirmExport').click();
                                                        }, 100);
                                                    },
                                                }))}
                                            />
                                        </div>
                                    </>
                                ) : null}
                            </div>
                        </div>
                        <div style={{ background: '#EBEFF6' }}>
                            <Collapse in={expandedToolbar === 'toggleColums'}>
                                <div style={{ padding: 12 }}>
                                    {hiddenColumns.find((c) => c.hideable) && (
                                        <div style={{ padding: 12 }}>{`${columns.filter((c) => !c.hidden).length} ${t('common:out_of')} ${columns.length} ${t('common:visible')}`}</div>
                                    )}
                                    {!hiddenColumns.find((c) => c.hideable) && <div style={{ padding: 12 }}>{t('common:Toggle_show_fields_is_empty')}</div>}
                                    {hiddenColumns
                                        .filter((c) => c.hideable)
                                        .map((column, index) => (
                                            <div key={index} style={{ maxHeight: 'inherit', paddingRight: 24 }} className="boxColumn">
                                                <Checkbox checked={!column.hidden} onChange={(e) => setHiddenColumn(column.field, !e.target.checked)} />
                                                {column.headerName}
                                            </div>
                                        ))}
                                    <div style={{ padding: 12 }}>
                                        <Button buttonType="primary-rounded" onClick={applyHiddenColumns}>
                                            {t('common:Apply')}
                                        </Button>
                                        <Button buttonType="link" onClick={resetHiddenColumn}>
                                            {t('common:Reset')}
                                        </Button>
                                    </div>
                                </div>
                            </Collapse>
                            <Collapse in={expandedToolbar === 'filters'}>
                                <ListFilters
                                    initialFilters={initialFilters}
                                    parentFilters={filters}
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

    const getIdsForExport = (newCheckedRows) => {
        const variables = newCheckedRows.map((checkedRow) => checkedRow.id);
        const prevState = varExport;
        prevState.id = variables;
        setVarExport(prevState);
    };

    const handleChangeCheckboxAllRows = (checked) => {
        if (checked) {
            const newCheckedRows = rows.reduce((accumulator, currentValue) => {
                const i = accumulator.findIndex((checkedRow) => checkedRow[primaryKey] === currentValue[primaryKey]);
                if (checked && i < 0) {
                    accumulator.push(currentValue);
                } else if (!checked && i >= 0) {
                    return accumulator.filter((checkedRow) => checkedRow[primaryKey] != currentValue[primaryKey]);
                }
                return accumulator;
            }, checkedRows);
            if (exportWithId === true) {
                getIdsForExport(newCheckedRows);
            }
            setCheckedRows(newCheckedRows);
            handleChecked(newCheckedRows);
        } else {
            setCheckedRows([]);
            handleChecked([]);
        }
        setIsCheckedAllRows(checked);
    };

    return (
        <div>
            {renderTableToolbar()}
            {checkboxAll ? (
                <div className={clsx(classes.gridHead, classes.content, classes.boxAll)}>
                    <Checkbox checked={isCheckedAllRows} onChange={(e) => handleChangeCheckboxAllRows(e.target.checked)} />
                    <span className={classes.title}>
                        {`${count} ${t('common:records_found')} `}
                        {checkedRows.length ? ` (${checkedRows.length} ${t('common:selected')})` : null}
                    </span>
                </div>
            ) : (
                <div className={clsx(classes.gridList, classes.content, classes.boxAll)}>
                    <span className={classes.title}>{`${count} ${t('common:records_found')} `}</span>
                </div>
            )}
            {loading ? (
                <div className={classes.loading}>Loading . . .</div>
            ) : rows.length ? (
                rows.map((row, i) => (
                    <div
                        key={i}
                        className={clsx(classes.gridList, classes.content)}
                        style={
                            twoColumns
                                ? { gridTemplateColumns: showCheckbox ? `1fr repeat(2, ${columns.length}fr)` : 'repeat(2, 1fr)' }
                                : { gridTemplateColumns: showCheckbox ? `1fr repeat(${columns.length}, 2fr)` : `repeat(${columns.length}, 1fr)` }
                        }
                    >
                        {showCheckbox && (
                            <Checkbox
                                checked={!!checkedRows.find((checkedRow) => checkedRow[primaryKey] === row[primaryKey])}
                                onChange={(e) => handleChangeCheckboxRow(e.target.checked, row)}
                                style={twoColumns ? { gridRow: `1 / span ${Math.ceil(columns.length / 2)}`, alignSelf: 'start' } : { gridRow: 1 }}
                            />
                        )}
                        {columns.map((column, columnIndex) => {
                            return (
                                !column.hidden && (
                                    <div
                                        key={columnIndex}
                                        style={{
                                            paddingLeft: 10,
                                            cursor: handleClickRow ? 'pointer' : 'unset',
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            overflowWrap: 'break-word',
                                            marginBottom: 10,
                                        }}
                                        onClick={() => (handleClickRow ? handleClickRow(getKey ? row[primaryKey] : row) : null)}
                                    >
                                        <h5 className={classes.titleList}>{column.headerName}</h5>
                                        <h5 className={classes.bodyList}>{getComponentOrString(row[column.field])}</h5>
                                    </div>
                                )
                            );
                        })}
                        {columns.filter((column) => !column.hidden).length % 2 !== 0
                            ? (
                                <div
                                    style={{
                                        paddingLeft: 10,
                                        cursor: handleClickRow ? 'pointer' : 'unset',
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        overflowWrap: 'break-word',
                                        marginBottom: 10,
                                    }}
                                    onClick={() => (handleClickRow ? handleClickRow(getKey ? row[primaryKey] : row) : null)}
                                />
                            )
                            : null }
                    </div>
                ))
            ) : (
                <div
                    className={clsx(classes.gridList, classes.content)}
                >
                    <div className={classes.loading}>
                        {t('common:No_records_to_display')}
                    </div>
                </div>
            )}
            {usePagination && count > rowsPerPage ? (
                <TablePagination
                    className={classes.tablePagination}
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                />
            ) : null}
        </div>
    );
};

export default CustomList;
