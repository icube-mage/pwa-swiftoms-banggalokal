import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import TablePaginationActions from '@common_tableseller/components/TablePagination/TablePaginationActions';
import { breakPointsUp } from '@helper_theme';
import useStyles from '@common_tableseller/components/TablePagination/style';
import clsx from 'clsx';

const TablePaginationComponent = (props) => {
    const {
        count, rowsPerPage, page, t, handleChangePage, handleChangeRowsPerPage, rowsPerPageOptions = [5, 10, 25, 100],
    } = props;
    const classes = useStyles();
    const desktop = breakPointsUp('md');
    return (
        <TableFooter className={clsx('table-footer-pagination-container', classes.tableFooterPaginationContainer)}>
            <TableRow>
                <TablePagination
                    classes={{
                        spacer: classes.tablePaginationSpacer,
                        select: classes.tablePaginationSelect,
                        caption: classes.tablePaginationCaption,
                        selectRoot: classes.tablePaginationSelectRoot,
                        toolbar: classes.tablePaginationToolbar,
                    }}
                    rowsPerPageOptions={rowsPerPageOptions}
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={count ? page : 0}
                    labelRowsPerPage={t('common:View')}
                    labelDisplayedRows={() => (desktop ? t('common:Per_Page') : '')}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                />
            </TableRow>
        </TableFooter>
    );
};

export default TablePaginationComponent;
