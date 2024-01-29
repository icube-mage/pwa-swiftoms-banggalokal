import React from 'react';

import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import {
    getComponentOrString,
} from '@sellermodules/stock/pages/list/components/ListCard/helpers';

import { breakPointsUp } from '@helper_theme';
import TableAllProductMobile from '@sellermodules/stock/pages/list/components/ListCard/components/TableAllProduct/mobile';
import useStyles from '@sellermodules/stock/pages/list/components/ListCard/components/TableAllProduct/style';

const StickyTableCell = withStyles((theme) => ({
    head: {
        left: 0,
        position: 'sticky',
        zIndex: theme.zIndex.appBar + 2,
    },
    body: {
        left: 0,
        position: 'sticky',
        zIndex: theme.zIndex.appBar + 1,
    },
}))(TableCell);

const TableAllProduct = (props) => {
    const { t, rows, handleClickEdit } = props;
    const classes = useStyles();
    const isDesktop = breakPointsUp('md');

    if (isDesktop) {
        return (
            <TableContainer className={classes.tableBodyContainer}>
                <Table>
                    <TableBody>
                        {rows.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                <StickyTableCell>
                                    <div className="td-product">
                                        {getComponentOrString(row.product_detail)}
                                    </div>
                                </StickyTableCell>
                                <TableCell>
                                    <div className="title">{t('sellerstock:Total_Stock')}</div>
                                    {getComponentOrString(row.stock)}
                                </TableCell>
                                {row.location_stock?.map((loc, index) => (
                                    <TableCell key={index}>
                                        <div className="title">{loc.loc_name}</div>
                                        <div className="flex-loc">
                                            {loc.stock}
                                            <IconButton onClick={() => handleClickEdit(row, loc)} classes={{ root: classes.editRoot }}>
                                                <img className="edit-icon" src="/assets/img/edit_purple.svg" alt="edit" />
                                            </IconButton>
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
    return <TableAllProductMobile {...props} />;
};

export default TableAllProduct;
