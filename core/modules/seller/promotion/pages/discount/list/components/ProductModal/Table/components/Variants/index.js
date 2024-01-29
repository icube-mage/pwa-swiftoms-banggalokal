import { useState, useEffect } from 'react';
import classNames from 'classnames';

import Collapse from '@material-ui/core/Collapse';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import useStyles from '@sellermodules/promotion/pages/discount/list/components/ProductModal/Table/components/Variants/style';

const Variants = (props) => {
    const {
        t, row, rowIndex, columns, parentChecked, setCheckedRows, checkedRows,
        handleChecked,
    } = props;
    const classes = useStyles();
    const { variants } = row;
    const [open, setOpen] = useState(false);

    const handleCheckedVariant = (value, variant) => {
        const temp = [...checkedRows];
        const pIdx = temp.findIndex((checkedRow) => checkedRow.entity_id === row.entity_id);
        if (value) {
            const selected_variants = [...temp[pIdx].selected_variants, variant];
            temp[pIdx] = {
                ...temp[pIdx],
                selected_variants,
            };
        } else {
            const selected_variants = [...temp[pIdx].selected_variants].filter((sv) => sv.entity_id !== variant.entity_id);
            temp[pIdx] = {
                ...temp[pIdx],
                selected_variants,
            };
        }
        setCheckedRows(temp);
        handleChecked(temp);
    };

    useEffect(() => {
        if (row.isParent) {
            setOpen(parentChecked);
        }
    }, [parentChecked]);

    return (
        <>
            <TableRow className={classNames(classes.tableRow, rowIndex % 2 && 'gray')}>
                <TableCell className="noborder white" padding="checkbox" />
                <TableCell
                    className={classNames('borderLeft', 'borderTop', 'borderRight', !open && 'borderBottom', open && 'show', 'pointer')}
                    colSpan={columns.length}
                    onClick={() => setOpen(!open)}
                    aria-hidden="true"
                >
                    <div className={classes.flex}>
                        {t('sellerpromotion:Variant_Products')}
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </div>
                </TableCell>
            </TableRow>
            {variants.map((variant, i) => (
                <TableRow key={variant.entity_id} className={classNames(classes.tableRowItem, rowIndex % 2 && 'gray')}>
                    <TableCell className={classNames(open && 'show', 'noborder', 'white')} padding="checkbox">
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            {' '}
                        </Collapse>
                    </TableCell>
                    <TableCell className={classNames(open && 'show', !open && 'noborder', 'borderLeft', variants.length - 1 === i && 'borderBottom')}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Grid container>
                                <Grid item xs="auto">
                                    <Checkbox
                                        className={classNames(classes.checkbox, !parentChecked && 'disabled')}
                                        disabled={!parentChecked}
                                        onChange={(e) => handleCheckedVariant(e.target.checked, variant)}
                                        checked={!!checkedRows.find((checkedRow) => checkedRow.entity_id === row.entity_id)
                                            ?.selected_variants?.find((sv) => sv.entity_id === variant.entity_id)}
                                    />
                                </Grid>
                                <Grid item xs="auto">
                                    <span className="bold">{variant.attributes.map((att) => att.attribute_value).join(' | ')}</span>
                                    <br />
                                    <span>{`SKU : ${variant.vendor_sku}`}</span>
                                </Grid>
                            </Grid>
                        </Collapse>
                    </TableCell>
                    <TableCell
                        className={classNames(open && 'show', !open && 'noborder',
                            'borderRight', variants.length - 1 === i && 'borderBottom')}
                    >
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            {variant.price_formatted || variant.price}
                        </Collapse>
                    </TableCell>
                </TableRow>
            ))}
            <TableRow className={classNames(classes.tableRow, rowIndex % 2 && 'gray')}>
                <TableCell colSpan={columns.length + 1} />
            </TableRow>
        </>
    );
};
export default Variants;
