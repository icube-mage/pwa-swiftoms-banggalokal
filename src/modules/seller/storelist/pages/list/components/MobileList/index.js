/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';

import TablePaginationComponent from '@common_tableseller/components/TablePagination';

import useStyles from '@sellermodules/storelist/pages/list/components/MobileList/style';

export const getComponentOrString = (param) => {
    if (typeof param === 'function') {
        return param();
    }
    if (typeof param === 'string' || typeof param === 'number') {
        if (String(param) !== 'undefined') {
            return String(param);
        }
    }
    return param;
};

const StoreListMobileContent = (props) => {
    const {
        t, rows, getRows, initialPage = 1, initialRowsPerPage = 10,
        filters: initialFilters = [], loading, help = false, handleUpdateMp,
    } = props;
    const classes = useStyles();

    const [page, setPage] = React.useState(initialPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);
    const [filters, setFilters] = React.useState(initialFilters.map((filter) => ({ ...filter, value: filter.initialValue })));
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
                        [currentValue.type]: currentValue.value,
                    };
                    return accumulator;
                }, {}),
        };
        getRows({ variables });
    };

    const contentProps = {
        ...props,
        handleChangePage,
        handleChangeRowsPerPage,
        setFilters,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
    };

    React.useEffect(() => {
        if (getRows) {
            fetchRows();
        }
    }, [page, rowsPerPage]);

    return (
        <div className={classes.mobileContainer}>
            <div className={classes.tableBodyContainer}>
                {loading || !rows.length ? <div className={classes.loading}>Loading . . .</div> : rows.map((row, rowIndex) => (
                    <Paper key={rowIndex} className={classes.rowPaper}>
                        <div className={classes.rowBody}>
                            <div className="flex parent">
                                <div className="flex">
                                    <div className={classes.channelContainer}>
                                        <div
                                            className={classes.channelImg}
                                            style={{ backgroundImage: `url(${(row?.marketplace_code?.toLowerCase() === 'shopify' ? '/assets/img/shopify.png' : row?.image_url) || '/assets/img/placeholder_image.jpg'})` }}
                                        />
                                    </div>
                                    <div className="flex column">
                                        <div className="flex">
                                            {getComponentOrString(help ? row.url : row.name)}
                                            {getComponentOrString(help ? row.status_icon : row.marketplace_status_icon)}
                                            { row.marketplace_chat_status === 1 && handleUpdateMp(row) && <span className={classes.activeBadge}>Chat Active</span> }
                                        </div>
                                        {help
                                            ? (
                                                <>
                                                    <div className="flex">
                                                        <b>{t('sellerstorelist:Integration_Time')}</b>
                                                        {getComponentOrString(row.created_at)}
                                                    </div>
                                                    {getComponentOrString(row.email)}
                                                </>
                                            )
                                            : (
                                                <div className="flex">
                                                    <b>{t('sellerstorelist:Authorization_Time')}</b>
                                                    {getComponentOrString(row.integrated_at)}
                                                </div>
                                            )}
                                    </div>
                                </div>
                                <div className="action">
                                    {getComponentOrString(row.actions)}
                                </div>
                            </div>
                        </div>
                    </Paper>
                ))}
            </div>
            <div className={clsx(classes.tableBodyContainer, 'footer')}>
                <TableContainer component={Paper} className={classes.paginationContainer}>
                    <Table size="small">
                        <TablePaginationComponent {...contentProps} />
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default StoreListMobileContent;
