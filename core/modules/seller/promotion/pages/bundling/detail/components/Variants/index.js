/* eslint-disable no-unused-expressions */
import { useState } from 'react';
import clsx from 'clsx';
import classNames from 'classnames';

import Grid from '@material-ui/core/Grid';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Hidden from '@material-ui/core/Hidden';

import useStyles from '@sellermodules/promotion/pages/bundling/detail/components/Variants/style';

const BundlingDetailContent = (props) => {
    const {
        t, rowItem, rowIndex,
    } = props;
    const classes = useStyles();
    const [open, setOpen] = useState(true);

    return (
        <>
            <TableRow className={classNames(classes.rowItem, rowIndex % 2 && 'dark')}>
                <Hidden xsDown>
                    <TableCell className={clsx(classes.td, 'noborder')} padding="checkbox" />
                </Hidden>
                <TableCell
                    className={clsx(classes.td, 'p10', 'ph10', 'pointer', 'black', 'br')}
                    colSpan={2}
                    onClick={() => setOpen(!open)}
                    aria-hidden="true"
                >
                    <div className={classes.flex}>
                        {t('sellerpromotion:Variant_Products')}
                        {' '}
                        {`(${rowItem.variants.length})`}
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </div>
                </TableCell>
            </TableRow>
            {rowItem.variants?.map((variant) => (
                <TableRow key={variant.entity_id} className={classNames(classes.rowItem, rowIndex % 2 && 'dark')}>
                    <Hidden xsDown>
                        <TableCell padding="checkbox" className={clsx(classes.td, !open && 'p0', 'noborder', !open && 'p0')}>
                            <Collapse in={open} timeout={100} unmountOnExit>
                                {' '}
                            </Collapse>
                        </TableCell>
                    </Hidden>
                    <TableCell className={clsx(classes.td, !open && 'p0', 'black')}>
                        <Collapse in={open} timeout={100} unmountOnExit>
                            <Grid container spacing={1} alignItems="center">
                                <Grid item xs="auto">
                                    <span className={classNames('bold', classes.break)}>
                                        {variant.name}
                                    </span>
                                    <br />
                                    <span className={classes.break}>{`SKU : ${variant.vendor_sku}`}</span>
                                </Grid>
                            </Grid>
                        </Collapse>
                    </TableCell>
                    <TableCell className={clsx(classes.td, !open && 'p0', 'black')}>
                        <Collapse in={open} timeout={100} unmountOnExit>
                            <div className={classes.divider}>
                                {variant.price_formatted}
                            </div>
                        </Collapse>
                    </TableCell>
                </TableRow>
            ))}
            <TableRow
                className={clsx(classes.rowItem, rowIndex % 2 && 'dark')}
            >
                <TableCell className={clsx(classes.td, 'p10')} colSpan={5}>
                    {' '}
                </TableCell>
            </TableRow>
        </>

    );
};

export default BundlingDetailContent;
