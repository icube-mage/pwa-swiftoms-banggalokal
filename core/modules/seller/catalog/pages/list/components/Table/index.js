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
import { useRouter } from 'next/router';

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
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import Autocomplete from '@common_autocomplete';

import { getComponentOrString, useDebounce, isEmpty } from '@sellermodules/order/pages/list/components/ListCard/helpers';
import Button from '@common_button';
import Switch from '@common_switch';

import TablePaginationActions from '@sellermodules/catalog/pages/list/components/Table/components/TablePaginationActions';
import Header from '@sellermodules/catalog/pages/list/components/Table/components/Header';
import Action from '@sellermodules/catalog/pages/list/components/Table/components/Action';
import Confirmation from '@sellermodules/catalog/pages/list/components/Table/components/Confirmation';

import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ImportExportIcon from '@material-ui/icons/ImportExport';

import useStyles from '@sellermodules/catalog/pages/list/components/Table/style';

const CustomTable = (props) => {
    const { t } = useTranslation('common');
    const {
        primaryKey = 'entity_id',
        rows,
        getRows,
        loading,
        filters: initialFilters = [],
        initialPage = 1,
        initialRowsPerPage = 10,
        count,
        getVariables,
        columns = [],
        handleChecked = () => { },
        handleUpdateStatus = () => { },
        handleDeleteProduct = () => { },
        dataEtalaseMove,
        handleMoveProduct,
    } = props;
    // hooks
    const router = useRouter();
    const classes = useStyles();
    const [page, setPage] = React.useState(initialPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);
    const [search, setSearch] = React.useState('');
    const debouncedSearch = useDebounce(search, 500);
    const [isCheckedAllRows, setIsCheckedAllRows] = React.useState(false);
    const [checkedRows, setCheckedRows] = React.useState([]);
    const [filters, setFilters] = React.useState(initialFilters.map((filter) => ({ ...filter, value: filter.initialValue })));
    const [expandedToolbar, setExpandedToolbar] = React.useState();
    const [sorts, setSorts] = React.useState(
        columns.filter((column) => column.sortable).map(({ field, initialSort }) => ({ field, value: initialSort || undefined })),
    );

    const [productSelected, setProductSelected] = React.useState({});
    const [showConfirm, setShowConfirm] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState({ open: false, data: [] });
    const dataDisplayLength = dialogOpen?.data?.length;
    const dataProductSelected = dialogOpen?.data?.map(({ entity_id }) => entity_id);
    const [valueDisplayWindow, setValueDisplayWindow] = React.useState('');
    
    const rowActions = [
        {
            label: t('sellercatalog:Edit_Product'),
            confirmDialog: true,
            onClick: (row) => {
                router.push({
                    pathname: '/seller/catalog/edit/[id]',
                    query: { id: row.entity_id },
                });
            },
            link: (row) => `/seller/catalog/edit/${row.entity_id}`,
        },
        {
            label: t('sellercatalog:Move_Display_Window'),
            onClick: (row) => {
                setDialogOpen({ open: true, data: [row] });
            },
        },
        {
            label: t('sellercatalog:Duplicate_Product'),
            confirmDialog: true,
            onClick: (row) => {
                router.push({
                    pathname: '/seller/catalog/duplicate/[id]',
                    query: { id: row.entity_id },
                });
            },
            message: t('common:Are_you_sure_want_to_delete_selected_items'),
            link: (row) => `/seller/catalog/duplicate/${row.entity_id}`,
        },
        {
            label: t('sellercatalog:Delete'),
            confirmDialog: true,
            onClick: (row) => {
                setProductSelected(row);
            },
            message: t('common:Are_you_sure_want_to_delete_selected_items'),
        },
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
            search,
        };
        if (getVariables) {
            getVariables(variables);
        }
        getRows({ variables });
        setIsCheckedAllRows(false);
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
                    <TableCell />
                </TableRow>
            </TableHead>
        );
    };

    const renderMassAction = () => {
        return (
            !loading && (count && checkedRows.length
                ? (
                    <div className={classes.massAction}>
                        <Grid container spacing={3}>
                            <Grid item>
                                {checkedRows.length ? `${checkedRows.length} ${t('sellercatalog:Product_Selected')}` : null}
                            </Grid>
                            <Grid item>
                                <Button
                                    className={classes.deactiveBtn}
                                    onClick={() => {
                                        setDialogOpen({ open: true, data: checkedRows });
                                        setCheckedRows([]);
                                        setIsCheckedAllRows(false);
                                    }}
                                >
                                    {t('sellercatalog:Move_Display_Window')}
                                </Button>
                                <Button
                                    className={classes.deactiveBtn}
                                    onClick={() => handleUpdateStatus(checkedRows.map(({ entity_id }) => ({
                                        entity_id,
                                        status: '2',
                                    })),
                                    () => {
                                        setCheckedRows([]);
                                        setIsCheckedAllRows(false);
                                    })}
                                >
                                    {t('sellercatalog:Deactivate_Product')}
                                </Button>
                                |
                                <IconButton onClick={() => setShowConfirm(true)}>
                                    <img src="/assets/img/trash-new.svg" alt="trash" />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </div>
                ) : null
            )
        );
    };

    const renderAction = (row) => {
        return (
            <>
                <Action
                    openButton={{ label: '' }}
                    menuItems={rowActions.map((action) => ({
                        label: action.label,
                        onClick: () => action.onClick(row),
                        link: action.link ? action.link(row) : null,
                    }))}
                />
            </>
        );
    };

    const renderTableBody = () => {
        const handleChangeCheckboxRow = (checked, row) => {
            const i = checkedRows.findIndex((checkedRow) => checkedRow[primaryKey] === row[primaryKey]);
            if (checked && i < 0) {
                if (checkedRows.length === rows.length - 1) {
                    setIsCheckedAllRows(true);
                }
                setCheckedRows([...checkedRows, row]);
                handleChecked([...checkedRows, row]);
            } else {
                if (checkedRows.length !== rows.length - 1) {
                    setIsCheckedAllRows(false);
                }
                setCheckedRows(checkedRows.filter((checkedRow) => checkedRow[primaryKey] != row[primaryKey]));
                handleChecked(checkedRows.filter((checkedRow) => checkedRow[primaryKey] != row[primaryKey]));
            }
        };
        return (
            <TableBody>
                {rows.map((row, rowIndex) => (
                    <TableRow
                        key={rowIndex}
                        className={clsx(classes.tableRow, rowIndex % 2 && 'gray')}
                    >
                        <TableCell padding="checkbox" className={classes.alignTop}>
                            <Checkbox
                                className={classes.checkbox}
                                checked={!!checkedRows.find((checkedRow) => checkedRow[primaryKey] === row[primaryKey])}
                                onChange={(e) => handleChangeCheckboxRow(e.target.checked, row)}
                                disabled={!checkedRows.find((checkedRow) => checkedRow[primaryKey] === row[primaryKey]) && row.disableCheck}
                            />
                        </TableCell>
                        {columns.map((column, columnIndex) => (
                            <TableCell key={columnIndex} className={clsx(column.hidden && 'hide', classes.alignTop)}>
                                {column.field === 'status'
                                    ? (
                                        <Switch
                                            value={row.status === '1'}
                                            onChange={() => handleUpdateStatus(
                                                [{ entity_id: row.entity_id, status: String(row.status === '1' ? '2' : '1') }],
                                                () => {
                                                    setCheckedRows([]);
                                                    setIsCheckedAllRows(false);
                                                },
                                            )}
                                            trueLabel=""
                                            falseLabel=""
                                        />
                                    )
                                    : getComponentOrString(row[column.field]) || '-'}
                            </TableCell>
                        ))}
                        <TableCell className={clsx(classes.alignTop)} padding="checkbox">
                            {renderAction(row)}
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
    };

    return (
        <>
            <TableContainer component={Paper} className={classes.tableContainer} style={{ background: 'transparent', boxShadow: 'none' }}>
                <Header {...contentProps} />
                {renderMassAction()}
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
            <Confirmation
                open={productSelected.hasOwnProperty('entity_id')}
                onConfirm={() => handleDeleteProduct(
                    [productSelected?.entity_id],
                    setProductSelected({}),
                    () => {
                        setCheckedRows([]);
                        setIsCheckedAllRows(false);
                    },
                )}
                onCancel={() => setProductSelected({})}
                productSelected={productSelected}
                t={t}
            />
            <Confirmation
                open={showConfirm}
                onConfirm={() => handleDeleteProduct(
                    checkedRows.map(({ entity_id }) => entity_id),
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
            <Dialog open={dialogOpen.open} onClose={() => setDialogOpen({ open: false })} className={classes.wrapperDialog}>
                <DialogTitle>
                    {t('catalog:Move_Display_Window')}
                    <IconButton className={classes.closeButtonDialog} onClick={() => setDialogOpen({ open: false })}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <div className={clsx(classes.contentDialogScroll, `${dataDisplayLength <= 1 && 'minimal'}`)}>
                        {dialogOpen?.data?.map((e) => (
                            <>
                                {dataDisplayLength <= 1 ? (
                                    <>
                                        <span className="span-name-min">{e.name}</span>
                                    </>
                                ) : (
                                    <span className="span-name">{e.name}</span>
                                )}
                            </>
                        ))}
                    </div>
                    <div className={classes.contentDialogForm}>
                        <span className={classes.spanLabel}>{t('catalog:Move_product_to')}</span>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            name="customer_loc_code"
                            value={valueDisplayWindow}
                            onChange={(e) => {
                                setValueDisplayWindow(e);
                            }}
                            placeholder={t('catalog:Choose_display_window')}
                            primaryKey="entity_id"
                            labelKey="name"
                            options={dataEtalaseMove}
                            fullWidth
                        />
                    </div>
                    <div className={classes.contentDialog}>
                        <Button
                            disabled={!valueDisplayWindow}
                            className={classes.btnAdd}
                            style={{ width: 200 }}
                            onClick={() => {
                                handleMoveProduct(valueDisplayWindow.entity_id, dataProductSelected);
                                setDialogOpen({ open: false });
                            }}
                        >
                            {t('common:Save')}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CustomTable;
