import React from 'react';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

import {
    getComponentOrString,
} from '@sellermodules/stock/pages/list/components/ListCard/helpers';

import useStyles from '@sellermodules/stock/pages/list/components/ListCard/components/TableAllProduct/style';

const TableAllProduct = (props) => {
    const { t, rows, handleClickEdit } = props;
    const classes = useStyles();

    return (
        <div className={classes.tableBodyContainer}>
            {rows.map((row, rowIndex) => (
                <Paper key={rowIndex} className={classes.rowPaper}>
                    <div className={classes.rowBody}>
                        <div className="box">
                            {getComponentOrString(row.product_detail)}
                        </div>
                        <div className="box">
                            <div className="title">{t('sellerstock:Total_Stock')}</div>
                            {getComponentOrString(row.stock)}
                        </div>
                        {row.location_stock?.map((loc) => (
                            <div key={loc.loc_id} className="box">
                                <div className="title">{loc.loc_name}</div>
                                <div className="flex-loc">
                                    {loc.stock}
                                    <IconButton onClick={() => handleClickEdit(row, loc)} classes={{ root: classes.editRoot }}>
                                        <img className="edit-icon" src="/assets/img/edit_purple.svg" alt="edit" />
                                    </IconButton>
                                </div>
                            </div>
                        ))}
                    </div>
                </Paper>
            ))}
        </div>
    );
};

export default TableAllProduct;
