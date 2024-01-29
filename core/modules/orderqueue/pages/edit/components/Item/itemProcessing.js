/* eslint-disable no-nested-ternary */
import { formatPriceNumber } from '@helper_currency';
import { Field } from 'formik';
import { useEffect, useRef } from 'react';

const Item = (props) => {
    const {
        idx, classes, remove, isModeEdit, item, handleOpenModal, t, isChild = false,
        setConfirmDialogState, setOpenConfirmDialog, setFieldValue,
    } = props;

    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
        }
    }, [item?.sku]);

    const onBlurQty = () => {
        setFieldValue(`order_items.[${idx}].qty`, item?.qty?.toString()?.replaceAll('.', ''));
    };

    return (
        <tr>
            <td className={classes.td} style={{ paddingLeft: isChild ? 10 : 0 }}>
                {isChild ? `- ${item.sku}` : item.sku}
            </td>
            <td className={classes.td}>{item.name}</td>
            <td className={classes.td}>
                {item.sell_price ? (typeof item.sell_price === 'string' ? item.sell_price : formatPriceNumber(item.sell_price)) : '-'}
            </td>
            <td className={classes.td} style={{ textAlign: 'center' }}>
                {isModeEdit && !isChild
                    ? (
                        <Field
                            type="number"
                            onChange={(e) => setFieldValue(`order_items.[${idx}].qty`, e.target.value.replaceAll('.', ''))}
                            className={classes.fieldQty}
                            onBlur={onBlurQty}
                            name={`order_items.[${idx}].qty`}
                        />
                    ) : item.qty}
            </td>
            <td className={classes.td}>
                {isChild ? '' : item.discount_amount || '-'}
            </td>
            <td className={classes.td}>
                {isChild ? '' : item.loc_code || '-'}
            </td>
            <td className={classes.td}>{isChild ? '' : item.replacement_for || '-'}</td>
            {isModeEdit && !isChild && (
                <td className={classes.td} style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                    <div style={{
                        margin: 'auto 5px',
                        display: 'flex',
                    }}
                    >
                        <img src="/assets/img/replace.svg" alt="replace" />
                        <button type="button" className={`link-button ${classes.btnClear}`} onClick={() => handleOpenModal(idx)}>
                            {t('order:Replace')}
                        </button>
                    </div>
                    <div style={{ margin: 'auto 5px', display: 'flex' }}>
                        <img src="/assets/img/trash.svg" alt="delete" />
                        <button
                            type="button"
                            className={`link-button ${classes.btnClear}`}
                            onClick={() => {
                                setConfirmDialogState({
                                    title: t('order:Confirmation'),
                                    message: t('order:Are_you_sure_you_want_to_delete_this_SKU_Product'),
                                    onConfirm: () => {
                                        remove(idx);
                                    },
                                });
                                setOpenConfirmDialog(true);
                            }}
                        >
                            {t('order:Delete')}
                        </button>
                    </div>
                </td>
            )}
        </tr>
    );
};

const ItemCore = (props) => {
    const { item } = props;

    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
        }
    }, [item?.sku]);

    return (
        <>
            <Item {...props} />
            {item.bundle_children?.map((child) => (
                <Item {...props} item={child} isChild />
            ))}
        </>
    );
};

export default ItemCore;
