/* eslint-disable no-nested-ternary */

import React from 'react';
import clsx from 'clsx';
import { useTranslation } from '@i18n';
import { useRouter } from 'next/router';

import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';

import TablePaginationComponent from '@common_tableseller/components/TablePagination';
import TabsHeader from '@sellermodules/stock/pages/list/components/ListCard/components/TabsHeader/index';
import TableAllProduct from '@sellermodules/stock/pages/list/components/ListCard/components/TableAllProduct';
import TableSyncFailed from '@sellermodules/stock/pages/list/components/ListCard/components/TableSyncFailed';
import { useDebounce } from '@sellermodules/stock/pages/list/components/ListCard/helpers';

import useStyles from '@sellermodules/stock/pages/list/components/ListCard/style';

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
        hideFooter = false,
        indexType = 0,
        getVariables,
        doRefetch = null,
        setDoRefetch = () => { },
        useTabs = false,
    } = props;

    // hooks
    const router = useRouter();
    const routerQuery = router?.query;
    const filterParentSku = routerQuery?.filter_parent_sku;
    const classes = useStyles();
    const [page, setPage] = React.useState(initialPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);
    const [search, setSearch] = React.useState('');
    const debouncedSearch = useDebounce(search, 500);
    const [selectedDate, setSelectedDate] = React.useState([null, null]);

    const [filters, setFilters] = React.useState(initialFilters.map((filter) => ({ ...filter, value: filter.initialValue })));
    const [expandedToolbar, setExpandedToolbar] = React.useState();
    const { status } = router.query;
    const tab = (status === '' ? 'all' : status) || 'all';

    // methods
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
            filter: [
                ...filters,
                {
                    field: 'sync_stock_status',
                    name: 'sync_stock_status',
                    type: 'eq',
                    format: 'tab',
                    value: status,
                },
            ]
                .filter((e) => (tab === 'failed' ? e.name !== 'loc_id' : e))
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

        if (filterParentSku) {
            variables = {
                ...variables,
                filter: {
                    ...variables.filter,
                    parent_sku: { eq: filterParentSku },
                },
            };
        }

        if (getVariables) {
            getVariables(variables);
        }
        getRows({ variables });
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

    const contentProps = {
        ...props,
        status,
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
        count,
        rowsPerPage,
        page,
        t,
        handleChangePage,
        handleChangeRowsPerPage,
    };

    const CurrentTable = {
        all: <TableAllProduct {...contentProps} />,
        failed: <TableSyncFailed {...contentProps} />,
    };

    return (
        <>
            <div className={classes.container}>
                {useTabs && <TabsHeader {...contentProps} />}
                <div>
                    {loading ? (
                        <span className={classes.loading}>Loading . . .</span>
                    ) : rows.length ? (
                        CurrentTable[tab]
                    ) : (
                        <span className={classes.loading}>{t('common:No_records_to_display')}</span>
                    )}
                </div>
                <div className={classes.tableBodyContainer}>
                    <TableContainer
                        component={Paper}
                        className={clsx(classes.tableContainer, 'footer')}
                        classes={{ root: classes.tableContainerRoot }}
                    >
                        <Table size="small">{!hideFooter && !!count && <TablePaginationComponent {...contentProps} />}</Table>
                    </TableContainer>
                </div>
            </div>
            <div style={{ height: 20 }} />
        </>
    );
};

export default CustomTable;
