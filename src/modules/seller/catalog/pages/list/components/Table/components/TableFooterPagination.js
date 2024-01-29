import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from '@sellermodules/catalog/pages/list/components/Table/components/TablePaginationActions';

const TableFooterPagination = ({
    rowsPerPageOptions = [5, 10, 25, 100],
    t,
    classes,
    count,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
}) => (
    <TableFooter>
        <TableRow>
            <TablePagination
                className={classes.tablePagination}
                rowsPerPageOptions={rowsPerPageOptions}
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage={t('common:View')}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                labelDisplayedRows={() => t('common:per_page')}
            />
        </TableRow>
    </TableFooter>
);

export default TableFooterPagination;
