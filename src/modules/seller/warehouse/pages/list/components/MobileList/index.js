/* eslint-disable react/destructuring-assignment */
import clsx from 'clsx';
import { useRouter } from 'next/router';

import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';

import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

import Button from '@common_button';
import Switch from '@common_switch';
import TablePaginationComponent from '@common_tableseller/components/TablePagination';
import ConfirmModal from '@sellermodules/warehouse/pages/list/components/ConfirmModal';
import IconButton from '@material-ui/core/IconButton';

import useStyles from '@sellermodules/warehouse/pages/list/components/MobileList/style';

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

const WarehouseListMobileContent = (props) => {
    const {
        t, rows, columns, getRows, initialPage = 1, initialRowsPerPage = 10,
        filters: initialFilters = [], handleAction, loading,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [openDialog, setOpenDialog] = React.useState(false);
    const [productSelected, setProductSelected] = React.useState({});

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
        <div className={classes.tableBodyContainer}>
            {loading || !rows.length ? <div className={classes.loading}>Loading . . .</div> : rows.map((row, rowIndex) => (
                <Paper key={rowIndex} className={classes.rowPaper}>
                    <Switch
                        name="sync"
                        trueLabel=""
                        falseLabel=""
                        useLabel={false}
                        value={row.is_active}
                        onChange={(e) => handleAction({ input: { id: row.id, is_active: e.target.checked } }, 'status')}
                        rootClass={classes.switch}
                    />
                    {columns.map((column, columnIndex) => (
                        <div className={clsx(classes.rowBody, (column.hidden || column.hiddenMobile) && 'hide')} key={columnIndex}>
                            <div className="box">
                                <div className="title">{getComponentOrString(column.headerName)}</div>
                                {getComponentOrString(row[column.field])}
                            </div>
                        </div>
                    ))}
                    <Divider className="divider" />
                    <div className={classes.rowBody}>
                        <div className="flex-button">
                            <Button
                                onClick={() => (row.is_default ? null : handleAction({ loc_id: row.id, is_default: true }, 'is_default'))}
                                buttonType="outlined"
                                classes={{ root: clsx(classes.buttonActionRoot, 'btn-loc'), startIcon: classes.startIcon }}
                                startIcon={(
                                    row.is_default ? <RadioButtonCheckedIcon classes={{ root: classes.iconRadio }} />
                                        : <RadioButtonUncheckedIcon classes={{ root: classes.iconRadio }} />
                                )}
                                fullWidth
                            >
                                {t('sellerwarehouse:Set_Main_Location')}
                            </Button>
                            <Button
                                classes={{ root: clsx(classes.buttonActionRoot, 'btn-edit') }}
                                onClick={() => router.push(`/seller/warehouse/edit/${row.id}`)}
                            >
                                {t('sellerwarehouse:Edit')}
                            </Button>
                            <IconButton
                                onClick={() => {
                                    if (row.is_default) {
                                        window.toastMessage({
                                            open: true,
                                            text: t('sellerwarehouse:You_cannot_delete_the_main_location'),
                                            variant: 'error',
                                        });
                                    } else {
                                        setOpenDialog(true);
                                        setProductSelected(row);
                                    }
                                }}
                                classes={{ root: classes.iconDeleteRoot }}
                            >
                                <img src="/assets/img/delete-trash-purple.svg" alt="trash" />
                            </IconButton>
                        </div>
                    </div>
                </Paper>
            ))}
            <div className={clsx(classes.tableBodyContainer, 'footer')}>
                <TableContainer component={Paper} className={classes.paginationContainer}>
                    <Table size="small">
                        <TablePaginationComponent {...contentProps} />
                    </Table>
                </TableContainer>
            </div>
            <ConfirmModal productSelected={productSelected} openDialog={openDialog} setOpenDialog={setOpenDialog} {...props} />
        </div>
    );
};

export default WarehouseListMobileContent;
