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
import Autocomplete from '@common_autocomplete';
import Button from '@common_button';
import TableHeaderTab from '@common_tableheadertab/index';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import CloseIcon from '@material-ui/icons/Close';
import Confirmation from '@sellermodules/catalog/pages/list/components/Table/components/Confirmation';
import TableBodyList from '@sellermodules/catalog/pages/list/components/Table/components/TableBodyList';
import TablePaginationComponent from '@common_tableseller/components/TablePagination/index';
import TableHeader from '@sellermodules/catalog/pages/list/components/Table/components/TableHeader';
import TableHeaderColumn from '@sellermodules/catalog/pages/list/components/Table/components/TableHeaderColumn';
import TableMassAction from '@sellermodules/catalog/pages/list/components/Table/components/TableMassAction';
import Hidden from '@material-ui/core/Hidden';
import Show from '@common_show';
import useStyles from '@sellermodules/catalog/pages/list/components/Table/style';
import { useTranslation } from '@i18n';
import { isEmpty, useDebounce } from '@sellermodules/order/pages/list/components/ListCard/helpers';

const CustomTable = (props) => {
    const { t } = useTranslation('common');
    const {
        catalogStatus,
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
        handleChecked = () => {},
        handleUpdateStatus = () => {},
        handleDeleteProduct = () => {},
        handleRetryProduct = () => {},
        dataEtalaseMove,
        handleMoveProduct,
        tabsMenu,
        catalogHeaderMobile,
        isCatalogFailed,
        refetchProductCountFailed,
        refetchProductCountAll,
        refetchProductCountInactive,
        refetchProductCountActive,
        statusSync,
        setStatusSync,
    } = props;

    // hooks
    const classes = useStyles();
    const [page, setPage] = React.useState(initialPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);
    const [search, setSearch] = React.useState('');
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
    const [valueDisplayWindow, setValueDisplayWindow] = React.useState('');
    const debouncedSearch = useDebounce(search, 500);
    const dataDisplayLength = dialogOpen?.data?.length;
    const dataProductSelected = dialogOpen?.data?.map(({ entity_id }) => entity_id);
    const [publishConfirm, setPublishConfirm] = React.useState();
    const [publishData] = React.useState({ entity_id: null, action: null });

    const [sellerChannel, setSellerChannel] = React.useState([]);
    const debouncedSellerChannel = useDebounce(sellerChannel, 100);

    const handleCheckedFilter = (check, v, filterName) => {
        switch (filterName) {
        case 'seller_channel':
            if (check) {
                return setSellerChannel([...sellerChannel, v]);
            }
            return setSellerChannel(sellerChannel.filter(({ channel_code }) => channel_code !== v.channel_code));
        default:
            return null;
        }
    };

    // methods
    const onResetSorts = () => {
        setSorts(columns.filter((column) => column.sortable).map(({ field, initialSort }) => ({ field, value: initialSort || undefined })));
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };
    const fetchRows = () => {
        let variables = {
            pageSize: rowsPerPage,
            currentPage: page,
            filter: filters
                .filter((e) => !isEmpty(e.value))
                .filter((e) => catalogStatus === 'list' ? e.name !== 'channel_code' : e)
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

        if (catalogStatus !== 'all') {
            let status = {};
            switch (catalogStatus) {
            case 'active':
                status = { eq: '1' };
                break;
            case 'inactive':
                status = { eq: '2' };
                break;
            case 'list':
                status = { in: statusSync?.length > 0 ? statusSync : ['active', 'queue', 'failed'] };
                break;
            default:
                break;
            }
            variables = {
                ...variables,
                filter: {
                    ...variables.filter,
                    status,
                },
            };
        }
        getRows({ variables });
        setIsCheckedAllRows(false);
    };

    // effects
    React.useEffect(() => {
        setPage(1);
        fetchRows();
    }, [rowsPerPage, filters, debouncedSearch, sorts, catalogStatus, statusSync]);

    React.useEffect(() => {
        setSorts(columns.filter((column) => column.sortable).map(({ field, initialSort }) => ({ field, value: initialSort || undefined })));
        setSearch('');
        setStatusSync([]);
        setFilters([]);
        setSellerChannel([]);
    }, [isCatalogFailed]);

    React.useEffect(() => {
        if (getRows) fetchRows();
    }, [page]);

    const contentProps = {
        ...props,
        filters,
        setFilters,
        setSearch,
        search,
        fetchRows,
        setExpandedToolbar,
        expandedToolbar,
        count,
        rowsPerPage,
        page,
        t,
        handleChangePage,
        handleChangeRowsPerPage,
        debouncedSellerChannel,
        handleCheckedFilter,
        sellerChannel,
        setSellerChannel,
        statusSync,
        setStatusSync,
    };

    return (
        <>
            <Show when={catalogHeaderMobile}>
                <Hidden smUp>
                    <TableHeader {...contentProps} />
                    {catalogHeaderMobile}
                </Hidden>
            </Show>
            <Hidden smUp>
                <TableHeaderColumn
                    {...contentProps}
                    mobile
                    dataTabs={tabsMenu}
                    t={t}
                    primaryKey={primaryKey}
                    rows={rows}
                    classes={classes}
                    columns={columns}
                    checkedRows={checkedRows}
                    setCheckedRows={setCheckedRows}
                    isCheckedAllRows={isCheckedAllRows}
                    setIsCheckedAllRows={setIsCheckedAllRows}
                    sorts={sorts}
                    setSorts={setSorts}
                    handleChecked={handleChecked}
                    isCatalogFailed={isCatalogFailed}
                />
            </Hidden>
            <TableContainer component={Paper} className={classes.tableContainer} style={{ background: 'transparent', boxShadow: 'none' }}>
                <Hidden smDown>
                    <TableHeaderTab
                        dataTabs={tabsMenu}
                        baseLinkUrlOnClick={() => {
                            onResetSorts();
                        }}
                    />
                </Hidden>
                <Hidden smDown>
                    <TableHeader {...contentProps} />
                </Hidden>                
                <TableMassAction
                    t={t}
                    primaryKey={primaryKey}
                    classes={classes}
                    loading={loading}
                    count={count}
                    checkedRows={checkedRows}
                    setDialogOpen={setDialogOpen}
                    setCheckedRows={setCheckedRows}
                    setIsCheckedAllRows={setIsCheckedAllRows}
                    handleUpdateStatus={handleUpdateStatus}
                    setShowConfirm={setShowConfirm}
                />
                <div className={classes.mainTable}>
                    <Table size="small">
                        <Hidden smDown>
                            <TableHeaderColumn
                                t={t}
                                primaryKey={primaryKey}
                                rows={rows}
                                classes={classes}
                                columns={columns}
                                checkedRows={checkedRows}
                                setCheckedRows={setCheckedRows}
                                isCheckedAllRows={isCheckedAllRows}
                                setIsCheckedAllRows={setIsCheckedAllRows}
                                sorts={sorts}
                                setSorts={setSorts}
                                handleChecked={handleChecked}
                                isCatalogFailed={isCatalogFailed}
                            />
                        </Hidden>
                        <TableBodyList
                            t={t}
                            primaryKey={primaryKey}
                            columns={columns}
                            classes={classes}
                            loading={loading}
                            rows={rows}
                            rowsPerPage={rowsPerPage}
                            checkedRows={checkedRows}
                            setDialogOpen={setDialogOpen}
                            setCheckedRows={setCheckedRows}
                            setIsCheckedAllRows={setIsCheckedAllRows}
                            setProductSelected={setProductSelected}
                            handleChecked={handleChecked}
                            handleUpdateStatus={handleUpdateStatus}
                            isCatalogFailed={isCatalogFailed}
                            publishConfirm={setPublishConfirm}
                            publishData={publishData}
                        />
                    </Table>
                </div>
            </TableContainer>
            {!!count && (
                <>
                    <TableContainer component={Paper} className={clsx(classes.tableContainer, 'footer')}>
                        <Table size="small">
                            <TablePaginationComponent {...contentProps} />
                        </Table>
                    </TableContainer>
                </>
            )}
            <Confirmation
                t={t}
                open={!!productSelected.entity_id}
                onCancel={() => {
                    setProductSelected({ ...productSelected, entity_id: null });
                }}
                productSelected={productSelected}
                messageTitle={productSelected?.message_title || false}
                messageContent={productSelected?.message_content || false}
                onConfirm={() => {
                    const isSync = productSelected?.sync ?? false;
                    if (isSync) {
                        handleRetryProduct({
                            sku: productSelected?.sku,
                            channel_code: productSelected?.channel_code,
                        }, setProductSelected({ ...productSelected, entity_id: null }));
                    } else {
                        handleDeleteProduct([productSelected?.entity_id], setProductSelected({ ...productSelected, entity_id: null }), () => {
                            setCheckedRows([]);
                            setIsCheckedAllRows(false);
                            refetchProductCountFailed();
                            refetchProductCountAll();
                            refetchProductCountInactive();
                            refetchProductCountActive();
                        });
                    }
                }}
            />
            <Confirmation
                t={t}
                open={showConfirm}
                onCancel={() => setShowConfirm(false)}
                productSelected={checkedRows}
                multiple
                onConfirm={() => handleDeleteProduct(
                    checkedRows.map(({ entity_id }) => entity_id),
                    setShowConfirm(false),
                    () => {
                        setCheckedRows([]);
                        setIsCheckedAllRows(false);
                    },
                )}
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
                        {dialogOpen?.data?.map((e) => {
                            const spanClass = dataDisplayLength <= 1 ? 'span-name-min' : 'span-name';
                            return <span className={spanClass}>{e.name}</span>;
                        })}
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
            <Confirmation
                t={t}
                open={publishConfirm}
                onCancel={() => setPublishConfirm(false)}
                messageTitle={t('warning')}
                messageContent={t('publish_alert')}
                onConfirm={async () => {
                    setPublishConfirm(false);
                    await handleUpdateStatus(publishData.entity_id, publishData.action);
                }}
            />
        </>
    );
};

export default CustomTable;
