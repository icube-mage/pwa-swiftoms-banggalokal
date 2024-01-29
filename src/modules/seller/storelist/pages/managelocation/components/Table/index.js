/* eslint-disable no-nested-ternary */
import React from 'react';
import clsx from 'clsx';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { getComponentOrString } from '@common_tableseller/helpers';
import TablePaginationComponent from '@common_tableseller/components/TablePagination';

import { breakPointsUp } from '@helper_theme';

import Header from '@sellermodules/storelist/pages/managelocation/components/Table/Header';
import MobileList from '@sellermodules/storelist/pages/managelocation/components/Table/MobileList';
import useStyles from '@sellermodules/storelist/pages/managelocation/components/Table/style';

const CustomTable = (props) => {
    const {
        t,
        rows,
        initialPage = 1,
        initialRowsPerPage = 5,
        columns,
    } = props;
    // hooks
    const classes = useStyles();
    const isDesktop = breakPointsUp('sm');
    const [page, setPage] = React.useState(initialPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);
    const [search, setSearch] = React.useState('');

    // methods
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };

    const dataToMap = rows.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage);

    const renderTableHeader = () => (
        <TableHead>
            <TableRow className={classes.tableHead}>
                {columns.map((column, columnIndex) => (
                    <TableCell
                        key={columnIndex}
                        className={clsx(column.hidden && 'hide', column.centering && 'centering')}
                    >
                        {getComponentOrString(column.headerName)}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );

    const renderTableBody = () => (
        <TableBody>
            {dataToMap.map((row, rowIndex) => (
                <TableRow
                    key={rowIndex}
                    className={clsx(classes.tableRow, rowIndex % 2 && 'gray')}
                >
                    {columns.map((column, columnIndex) => (
                        <TableCell
                            key={columnIndex}
                            className={clsx(column.hidden && 'hide', 'alignTop',
                                column.centering && 'centering')}
                        >
                            {getComponentOrString(row[column.field]) || '-'}
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    );

    const contentProps = {
        ...props,
        setSearch,
        search,
        count: rows.length,
        rowsPerPage,
        page,
        t,
        handleChangePage,
        handleChangeRowsPerPage,
        dataToMap,
    };

    return (
        <div className={classes.mobileContainer}>
            {isDesktop
                ? (
                    <TableContainer component={Paper} className={classes.tableContainer}>
                        <Header {...contentProps} />
                        <div className={classes.mainTable}>
                            <Table size="small">
                                {renderTableHeader()}
                                {rows.length ? (
                                    renderTableBody()
                                ) : (
                                    null
                                )}
                            </Table>
                        </div>
                    </TableContainer>
                )
                : (
                    <>
                        <Header {...contentProps} />
                        <MobileList {...contentProps} />
                    </>
                ) }
            {!!rows.length
                && (
                    <TableContainer component={Paper} className={clsx(classes.tableContainer, 'footer')}>
                        <Table size="small">
                            <TablePaginationComponent {...contentProps} />
                        </Table>
                    </TableContainer>
                )}
        </div>
    );
};

export default CustomTable;
