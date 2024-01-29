import React, { useEffect, useState } from 'react';
import Autocomplete from '@common_autocomplete';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import clsx from 'clsx';
import Button from '@common_button';
import useStyles from '@modules/orderqueue/pages/edit/components/modalFindProduct/style';
import gqlService from '@modules/orderqueue/services/graphql';
import gqlProduct from '@modules/productlist/services/graphql';

const ModalFindProduct = (props) => {
    const {
        open, handleClose, idx, values, setFieldValue, t, initialValueEditItem,
    } = props;
    const classes = useStyles();
    const [searchSKU, setSearchSKU] = useState();
    const [optionsSKU, setOptionsSKU] = useState([]);
    const [selectedSKU, setSelectedSKU] = useState(null);

    // eslint-disable-next-line no-unused-vars
    const reverseFormatNumber = (val) => {
        const newVal = val.slice(0, val.length - 3).replace('IDR', '');
        const group = new Intl.NumberFormat('id').format(1111).replace(/1/g, '');
        const decimal = new Intl.NumberFormat('id').format(1.1).replace(/1/g, '');
        let reversedVal = newVal.replace(new RegExp(`\\${group}`, 'g'), '');
        reversedVal = reversedVal.replace(new RegExp(`\\${decimal}`, 'g'), '.');
        return Number.isNaN(reversedVal) ? 0 : reversedVal;
    };

    const [getUniqueProductFromSource, getUniqueProductFromSourceRes] = gqlService.getUniqueProductFromSource();
    const [getProductList, getProductListRes] = gqlProduct.getProductListBySku();

    const handleSubmit = () => {
        handleClose();
        if (selectedSKU) {
            getProductList({
                variables: {
                    pageSize: 1,
                    currentPage: 1,
                    querySearch: selectedSKU?.sku,
                },
            });
        }
    };

    useEffect(() => {
        if (open) {
            setSelectedSKU(values?.order_items[idx]?.replacement_for && optionsSKU.find((item) => item.sku === values.order_items[idx].sku));
        }
    }, [open]);

    useEffect(() => {
        const onChangeTimeOut = setTimeout(() => {
            const isExist = searchSKU && optionsSKU.filter((elm) => elm?.sku?.toLowerCase().includes(searchSKU?.toLowerCase()));
            if (searchSKU && isExist.length <= 3) {
                getUniqueProductFromSource({
                    variables: {
                        pageSize: 20,
                        currentPage: 1,
                        filter: {
                            sku: {
                                like: searchSKU,
                            },
                        },
                    },
                });
            }

            return null;
        }, 500);

        return () => clearTimeout(onChangeTimeOut);
    }, [searchSKU]);

    useEffect(() => {
        if (
            getUniqueProductFromSourceRes
            && getUniqueProductFromSourceRes.data
            && getUniqueProductFromSourceRes.data.getUniqueProductFromSource
            && getUniqueProductFromSourceRes.data.getUniqueProductFromSource.items
        ) {
            const sku = new Set(optionsSKU.map((d) => d.sku));
            if (optionsSKU.length > 100) {
                setOptionsSKU(getUniqueProductFromSourceRes.data.getUniqueProductFromSource.items);
            } else {
                setOptionsSKU([...optionsSKU, ...getUniqueProductFromSourceRes.data.getUniqueProductFromSource.items.filter((d) => !sku.has(d.sku))]);
            }
        }
    }, [getUniqueProductFromSourceRes.data]);

    useEffect(() => {
        if (
            getProductListRes
            && getProductListRes.data
            && getProductListRes.data.getProductList
            && getProductListRes.data.getProductList.items
            && getProductListRes.data.getProductList.items.length > 0
        ) {
            const product = getProductListRes.data.getProductList.items[0];
            setFieldValue(`order_items.${idx}.sku`, selectedSKU?.sku ?? '');
            setFieldValue(`order_items.${idx}.sell_price`, reverseFormatNumber(product?.product_price) ?? 0);
            setFieldValue(`order_items.${idx}.name`, product?.name ?? '');
            setFieldValue(`order_items.${idx}.bundle_children`, selectedSKU?.bundle_children ?? []);

            if (initialValueEditItem?.order_items[idx]?.sku) {
                setFieldValue(`order_items.${idx}.replacement_for`, initialValueEditItem?.order_items[idx].sku);
            } else {
                setFieldValue(`order_items.${idx}.replacement_for`, values.order_items[idx].sku);
            }

            if (values.order_items[idx].item_id_replacement) {
                setFieldValue(`order_items.${idx}.item_id_replacement`, values.order_items[idx].item_id_replacement);
            } else {
                setFieldValue(`order_items.${idx}.item_id_replacement`, values.order_items[idx].id);
            }

            setFieldValue(`order_items.${idx}.loc_code`, values.order_items[idx].loc_code);
            setSelectedSKU(null);
        }
    }, [getProductListRes.data]);

    useEffect(() => {
        if (getProductListRes.loading) {
            window.backdropLoader(true);
        } else {
            window.backdropLoader(false);
        }
    }, [getProductListRes.loading]);

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth classes={{ paper: classes.paper }}>
            <div className={classes.textTitle}>
                <div>
                    {t('order:Replace_Product')}
                </div>
                <div>
                    <button type="button" className={classes.btnClear} onClick={() => handleClose()}>
                        ✕
                    </button>
                </div>
            </div>
            <DialogContent classes={{ root: clsx(classes.content, classes.contentCounter) }}>
                {idx !== null && (
                    <>
                        <div className={classes.inputProductContainer}>
                            <div>
                                <Autocomplete
                                    defaultValue={{ sku: 'tes', product_name: 'tes' }}
                                    name={`order_items.${idx}.sku`}
                                    mode={optionsSKU.length > 0 ? 'default' : 'lazy'}
                                    className={`${classes.autocompleteRoot}`}
                                    value={selectedSKU}
                                    onChange={(e) => {
                                        setSelectedSKU(e);
                                    }}
                                    loading={getUniqueProductFromSourceRes.loading}
                                    options={optionsSKU.filter((opt) => !values?.order_items.filter(
                                        (val) => !val.parent_item_id,
                                    )?.map((val) => val.sku)?.includes(opt?.sku)
                                        && opt?.sku !== initialValueEditItem?.order_items[idx]?.sku)}
                                    getOptionsVariables={{
                                        variables: {
                                            search: searchSKU,
                                            pageSize: 20,
                                            currentPage: 1,
                                            filter: {
                                                sku: {
                                                    like: searchSKU,
                                                },
                                            },
                                        },
                                    }}
                                    getOptions={getUniqueProductFromSource}
                                    primaryKey="sku"
                                    labelKey="sku"
                                    onInputChange={(e) => setSearchSKU(e && e.target && e.target.value)}
                                    placeholder={`${t('order:SKU')} / ${t('order:Product_Name')}`}
                                />
                            </div>
                        </div>

                        <Button className={classes.btn} onClick={handleSubmit}>
                            {t('order:Replace')}
                        </Button>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ModalFindProduct;
