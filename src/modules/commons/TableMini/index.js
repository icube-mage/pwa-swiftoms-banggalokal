import React from 'react';
import useStyles from '@common_tablemini/style';
import classNames from 'classnames';

const TableMini = ({
    show,
    theadComponent,
    tbodyComponent,
    tfootComponent,
}) => {
    const classes = useStyles();
    if (!show) return null;

    return (
        <table className={classNames('table-mini-container', classes.tableMiniContainer)}>
            {
                theadComponent && (
                    <thead>{theadComponent}</thead>
                )
            }
            {
                tbodyComponent && (
                    <tbody>{tbodyComponent}</tbody>
                )
            }
            {
                tfootComponent && (
                    <tfoot>{tbodyComponent}</tfoot>
                )
            }
        </table>
    );
};

export default TableMini;
