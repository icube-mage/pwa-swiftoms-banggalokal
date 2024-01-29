/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import useStyles from '@modules/productlist/plugins/productconfigurable/style';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@common_button';
import TextField from '@common_textfield';
import MenuPopover from '@common_menupopover';
import ModalManual from '@modules/productlist/plugins/modalmanual';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const ProductConfigurableContent = (props) => {
    const {
        formik,
        t,
        setShowModal,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const idRouter = router && router.query && Number(router.query.id);

    const [showManual, setShowManual] = React.useState(false);
    const [variantId, setVariantId] = React.useState(null);

    const renderTextCell = (params, keyname) => {
        const { id, value, row } = params;
        const idx = formik.values.configurable?.product_configurable?.length
            && formik.values.configurable.product_configurable.findIndex((prod) => prod.id === id);
        if (row.isAssociated) {
            return value;
        }
        return (
            <TextField
                name={`configurable.product_configurable[${idx}][${keyname}]`}
                variant="outlined"
                value={value}
                onChange={formik.handleChange}
                autoComplete="off"
                fullWidth
                InputProps={{
                    className: clsx(classes.fieldInputSquare),
                }}
                inputProps={{
                    autocomplete: 'off',
                    form: {
                        autocomplete: 'off',
                    },
                }}
            />
        );
    };

    const rowVariant = formik.values.configurable.product_configurable.map((el) => ({
        id: el.id,
        isAssociated: el.isAssociated,
        images: el.images?.length ? (el.images[el.images?.length - 1].url || el.images[el.images?.length - 1].binary) : null,
        name: el.name,
        sku: el.sku,
        price: el.price,
        weight: el.weight || '',
        status: el.status === 1 ? t('productlist:Enabled') : t('productlist:Disabled'),
        action: t('productlist:Select'),
        attributes: el.attributes_frontend,
    }));

    return (
        <>
            <div className={classes.optionTop}>
                <span>
                    {t('productlist:Configurable_products_allow_customers_to_choose_options_Ex_shirt_color')}
                    <br />
                    {t('productlist:You_need_to_create_a_simple_product_for_each_configuration_Ex_a_product_for_each_color')}
                </span>
                <div className={classes.optionButton}>
                    {!!idRouter
                        && (
                            <Button
                                style={{ marginTop: 5 }}
                                buttonType="outlined-rounded"
                                onClick={() => setShowManual(true)}
                                disabled={formik.errors.name || formik.errors.sku}
                            >
                                {t('productlist:Add_Product_Manually')}
                            </Button>
                        )}
                    <Button
                        style={{ marginLeft: 10, marginTop: 5 }}
                        buttonType="primary-rounded"
                        onClick={() => {
                            if (formik.values.name && formik.values.sku) {
                                setShowModal(true);
                            } else {
                                const keys = Object.keys(formik.errors);
                                if (keys.length > 0) {
                                    const keyName = keys[0];
                                    const node = document.getElementsByName(keyName);
                                    node[0].scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
                                    node[0].focus();
                                }
                            }
                        }}
                    >
                        {rowVariant.length ? t('productlist:Edit_Configurations') : t('productlist:Create_Configurations')}
                    </Button>
                </div>
            </div>
            {rowVariant.length
                ? (
                    <div className={classes.optionContainer}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>
                                {t('productlist:Current_Variations')}
                            </span>
                        </div>

                        <TableContainer component={Paper}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow className={classes.tr}>
                                        <TableCell className={classes.th}>{t('productlist:Image')}</TableCell>
                                        <TableCell className={classes.th}>{t('productlist:Name')}</TableCell>
                                        <TableCell className={classes.th}>{t('productlist:SKU')}</TableCell>
                                        <TableCell className={classes.th}>{t('productlist:Price')}</TableCell>
                                        <TableCell className={classes.th}>{t('productlist:Weight')}</TableCell>
                                        <TableCell className={classes.th}>{t('productlist:Status')}</TableCell>
                                        <TableCell className={classes.th}>{t('productlist:Attributes')}</TableCell>
                                        <TableCell className={classes.th} style={{ textAlign: 'center' }}>{t('productlist:Action')}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rowVariant.map((row, i) => {
                                        const idx = formik.values.configurable?.product_configurable?.length
                                            && formik.values.configurable.product_configurable.findIndex((prod) => prod.id === row.id);

                                        const handleAble = () => {
                                            const setVal = row.status === 'Enabled' ? 2 : 1;
                                            formik.setFieldValue(`configurable.product_configurable[${idx}].status`, setVal);
                                        };
                                        const handleRemove = () => {
                                            const temp = formik.values.configurable.product_configurable;
                                            const tempAsc = formik.values.configurable.associated_product_ids?.filter((ids) => ids !== row.id);

                                            temp.splice(idx, 1);
                                            formik.setFieldValue('configurable.product_configurable', temp);
                                            formik.setFieldValue('configurable.associated_product_ids', tempAsc);
                                        };
                                        const menuAction = [
                                            {
                                                label: t('productlist:Choose_a_different_Product'),
                                                onClick: () => {
                                                    setVariantId(row.id);
                                                    setTimeout(() => { setShowManual(true); }, [100]);
                                                },
                                                hide: !row.isAssociated,
                                            },
                                            {
                                                label: row.status === 'Enabled' ? t('productlist:Disable_Product')
                                                    : t('productlist:Enable_Product'),
                                                onClick: () => handleAble(),
                                            },
                                            {
                                                label: t('productlist:Remove_Product'),
                                                onClick: () => handleRemove(),
                                            },
                                        ];
                                        return (
                                            <TableRow key={i}>
                                                <TableCell className={classes.td}>
                                                    <div
                                                        className={classes.imgThumbContainer}
                                                        style={{
                                                            backgroundImage: `url(${row.images || '/assets/img/placeholder_image.jpg'})`,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell className={classes.td}>
                                                    {renderTextCell({ id: row.id, value: row.name, row }, 'name')}
                                                </TableCell>
                                                <TableCell className={classes.td}>
                                                    {renderTextCell({ id: row.id, value: row.sku, row }, 'sku')}
                                                </TableCell>
                                                <TableCell className={classes.td}>
                                                    {renderTextCell({ id: row.id, value: row.price, row }, 'price')}
                                                </TableCell>
                                                <TableCell className={classes.td}>
                                                    {renderTextCell({ id: row.id, value: row.weight, row }, 'weight')}
                                                </TableCell>
                                                <TableCell className={classes.td}>{row.status}</TableCell>
                                                <TableCell className={classes.td}>{row.attributes}</TableCell>
                                                <TableCell className={classes.td}>
                                                    <MenuPopover
                                                        openButton={{ label: row.action }}
                                                        buttonType="buttonText"
                                                        useMenuStyle={false}
                                                        menuItems={menuAction.filter((action) => !action.hide).map((action) => ({
                                                            label: action.label,
                                                            onClick: () => {
                                                                setTimeout(() => {
                                                                    action.onClick();
                                                                }, 100);
                                                            },
                                                        }))}
                                                    />

                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                )
                : null}
            <Dialog
                className={classes.dialogFull}
                fullWidth
                maxWidth="xl"
                open={showManual}
                onClose={() => { setVariantId(null); setShowManual(false); }}
            >
                <DialogTitle>{t('productlist:Select_Associated_Product')}</DialogTitle>
                <DialogContent>
                    <ModalManual
                        formik={formik}
                        t={t}
                        handleClose={() => { setVariantId(null); setShowManual(false); }}
                        variant_id={variantId}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ProductConfigurableContent;
