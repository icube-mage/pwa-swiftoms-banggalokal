import { useState } from 'react';
import clsx from 'clsx';

import Collapse from '@material-ui/core/Collapse';
import Checkbox from '@material-ui/core/Checkbox';
import Hidden from '@material-ui/core/Hidden';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { getComponentOrString } from '@sellermodules/promotion/pages/discount/list/components/ListCard/helpers';
import useStyles from '@sellermodules/promotion/pages/discount/list/components/ListCard/components/Variants/style';

const Variants = (props) => {
    const {
        t, row, columns, handleSingleDelete, setCheckedRows, setIsCheckedAllRows,
    } = props;
    const classes = useStyles();
    const { variants_product } = row;
    const [open, setOpen] = useState(false);

    return (
        <div className={classes.divParent}>
            <Checkbox
                className={classes.notVisible}
            />
            <div className={classes.border}>
                <div
                    className={clsx(classes.flex, open && 'border')}
                    onClick={() => setOpen(!open)}
                    aria-hidden="true"
                >
                    {t('sellerpromotion:Variant_Products')}
                    {open ? <ExpandLess /> : <ExpandMore />}
                </div>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {variants_product?.map((variant) => (
                        <div className={classes.rowGrid} key={variant.entity_id}>
                            {columns.map((column, columnIndex) => (
                                <div key={columnIndex} className={clsx(column.hidden && 'hide', classes.alignTop, 'box', column.small && 'small')}>
                                    <Hidden mdUp>
                                        {column.headerName
                                            ? (
                                                <div className="title">{getComponentOrString(column.headerName)}</div>
                                            )
                                            : null}
                                    </Hidden>
                                    {getComponentOrString(variant[column.field]) || '-'}
                                </div>
                            ))}
                            <div className={clsx(classes.alignTop, 'box', 'small')}>
                                <Hidden mdUp>
                                    <div className="title">{t('sellerpromotion:Action')}</div>
                                </Hidden>
                                <img
                                    id="button-delete"
                                    src="/assets/img/trash-new.svg"
                                    alt="delete"
                                    className={classes.trashIcon}
                                    onClick={() => handleSingleDelete(row, false, variant.sku,
                                        () => {
                                            setCheckedRows([]);
                                            setIsCheckedAllRows(false);
                                        })}
                                    aria-hidden="true"
                                />
                            </div>
                        </div>
                    ))}
                </Collapse>
            </div>
        </div>
    );
};
export default Variants;
