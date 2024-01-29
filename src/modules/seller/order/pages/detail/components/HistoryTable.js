/* eslint-disable no-nested-ternary */
import clsx from 'clsx';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import useStyles from '@sellermodules/order/pages/detail/components/style';

const ItemsTable = (props) => {
    const {
        data, t,
    } = props;

    const classes = useStyles();

    return (
        <TableContainer>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow className={clsx(classes.tr, 'head')}>
                        <TableCell className={classes.th}>{t('order:Date')}</TableCell>
                        <TableCell className={classes.th}>{t('order:Status')}</TableCell>
                        <TableCell className={classes.th}>{t('order:Notes')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="table-history-body">
                    {data.history?.map((hist) => (
                        <TableRow key={hist.entity_id}>
                            <TableCell className={classes.td}>
                                {hist.created_at || '-'}
                            </TableCell>
                            <TableCell className={classes.td}>{hist.status.label || '-'}</TableCell>
                            <TableCell className={classes.td}>{hist.comment || '-'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ItemsTable;
