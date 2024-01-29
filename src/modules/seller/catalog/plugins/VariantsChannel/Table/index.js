/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import clsx from 'clsx';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Collapse from '@material-ui/core/Collapse';

import TextField from '@common_textfield';
import Button from '@common_button';

import useStylesParent from '@sellermodules/catalog/plugins/VariantsChannel/style';
import useStyles from '@sellermodules/catalog/plugins/VariantsChannel/Table/style';
import React from 'react';

const numberReg = {
    integer: /[^\d]/g,
    float: /[^.\d]/g,
};

const ItemsTable = (props) => {
    const {
        formik, t, currency = 'Rp',
    } = props;

    const classes = useStyles();
    const classesParent = useStylesParent();

    const [checked, setChecked] = React.useState([]);
    const [isCheckedAll, setCheckedAll] = React.useState(false);
    const [field, setField] = React.useState({
        price: '',
        weight: '',
    });

    const applyChange = () => {
        const temp = [];
        formik.values.variant_table?.forEach((variant, i) => {
            if (checked.includes(i)) {
                temp.push({
                    ...variant,
                    price: field.price || variant.price,
                    weight: field.weight || variant.weight,
                });
            } else {
                temp.push(variant);
            }
        });
        formik.setFieldValue('variant_table', temp);
        setField({
            price: '',
            weight: '',
        });
    };

    const handleChecked = (index) => {
        if (checked.includes(index)) {
            setChecked((prev) => prev.filter((idx) => idx !== index));
        } else {
            setChecked([...checked, index]);
        }
    };

    const handleCheckedAll = () => {
        if (formik.values.variant_table?.length > 0 && formik.values.variant_table?.length === checked.length) {
            setChecked([]);
        } else {
            const temp = [];
            formik.values.variant_table?.forEach((_, i) => (
                temp.push(i)
            ));
            setChecked(temp);
        }
    };

    React.useEffect(() => {
        if (formik.values.variant_table?.length > 0 && formik.values.variant_table?.length === checked.length) {
            setCheckedAll(true);
        } else {
            setCheckedAll(false);
        }
    }, [checked, formik.values.variant_table]);

    return (
        <div>
            <div className={clsx(classesParent.formFieldsGrid, 'nomargin')} style={{ marginBottom: 15 }}>
                <div />
                <FormControlLabel
                    control={(
                        <Checkbox
                            className={classes.checkbox}
                            checked={isCheckedAll}
                            onChange={handleCheckedAll}
                            disabled={!formik.values.sku}
                        />
                    )}
                    label={t('sellercatalog:Select_multiple_variants')}
                    className={classes.controlLabel}
                />
            </div>
            <div className={clsx(classesParent.formFieldsGrid, 'start')} style={{ marginTop: 0 }}>
                <InputLabel className={classesParent.label}>
                    {t('sellercatalog:Variant_Table')}
                </InputLabel>
                <TableContainer className={classes.tableContainer}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow className={clsx(classes.tr, 'head')}>
                                <TableCell className={classes.th} />
                                {formik.values.variants?.map((variant, i) => (!!variant.frontend_label
                                    && <TableCell key={i} className={classes.th}>{variant.frontend_label}</TableCell>
                                ))}
                                <TableCell className={classes.th}>{t('sellercatalog:SKU')}</TableCell>
                                <TableCell className={classes.th}>{t('sellercatalog:Price')}</TableCell>
                                <TableCell className={classes.th}>{t('sellercatalog:Image')}</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <TableRow className={clsx(classes.rowItem, checked.length && 'selected')}>
                                <TableCell
                                    className={clsx(classes.td, checked.length && 'change', !checked.length && 'noborder', 'dark')}
                                    colSpan={formik.values.variants?.length + 2}
                                    style={{ textAlign: 'center' }}
                                >
                                    <Collapse in={!!checked.length} timeout="auto" unmountOnExit>
                                        {t('sellercatalog:Set_and_apply_variant_data')}
                                    </Collapse>
                                </TableCell>
                                <TableCell className={clsx(classes.td, checked.length && 'change', !checked.length && 'noborder')}>
                                    <Collapse in={!!checked.length} timeout="auto" unmountOnExit>
                                        <TextField
                                            className={clsx(classes.textInput, 'adorn')}
                                            placeholder="0"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment className={classes.adornment} position="start">
                                                        {currency}
                                                    </InputAdornment>
                                                ),
                                            }}
                                            value={field.price}
                                            onChange={(e) => setField((prev) => ({ ...prev, price: new Intl.NumberFormat('en-US').format(e.target.value.replace(numberReg.float, '')) }))}
                                            disabled={!formik.values.sku}
                                        />
                                    </Collapse>
                                </TableCell>
                                <TableCell className={clsx(classes.td, checked.length && 'change', !checked.length && 'noborder')}>
                                    <Collapse in={!!checked.length} timeout="auto" unmountOnExit>
                                        <Button
                                            onClick={applyChange}
                                            className={clsx(classes.btn, !formik.values.sku && 'disabled')}
                                            disabled={!formik.values.sku}
                                        >
                                            {t('common:apply_button')}
                                        </Button>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                            {formik.values.variant_table?.map((item, i) => (
                                <TableRow key={i} className={clsx(classes.rowItem, i % 2 && 'dark', checked.includes(i) && 'selected')}>
                                    <TableCell className={classes.td}>
                                        <Checkbox
                                            className={classes.checkbox}
                                            onChange={() => handleChecked(i)}
                                            checked={checked.includes(i)}
                                            disabled={!formik.values.sku}
                                        />
                                    </TableCell>
                                    {formik.values.variants?.map((variant, idx) => (
                                        <TableCell key={idx} className={classes.td}>{item[variant.attribute_code]}</TableCell>
                                    ))}
                                    <TableCell className={classes.td}>
                                        <TextField
                                            className={classes.textInput}
                                            value={item.sku}
                                            onChange={(e) => formik.setFieldValue(`variant_table[${i}].sku`,
                                                e.target.value)}
                                            error={!!(formik.touched?.variant_table?.[i]?.sku
                                                && formik.errors?.variant_table?.[i]?.sku)}
                                            helperText={(formik.touched?.variant_table?.[i]?.sku
                                                && formik.errors?.variant_table?.[i]?.sku) || ''}
                                            disabled={!!item.is_exist || !formik.values.sku}
                                        />
                                    </TableCell>
                                    <TableCell className={classes.td}>
                                        <TextField
                                            className={clsx(classes.textInput, 'adorn')}
                                            placeholder="0"
                                            value={item.price}
                                            onChange={(e) => formik.setFieldValue(`variant_table[${i}].price`,
                                                new Intl.NumberFormat('en-US').format(e.target.value.replace(numberReg.float, '')))}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment className={classes.adornment} position="start">
                                                        {currency}
                                                    </InputAdornment>
                                                ),
                                            }}
                                            error={!!(formik.touched?.variant_table?.[i]?.price
                                                && formik.errors?.variant_table?.[i]?.price)}
                                            helperText={(formik.touched?.variant_table?.[i]?.price
                                                && formik.errors?.variant_table?.[i]?.price) || ''}
                                            disabled={!formik.values.sku}
                                        />
                                    </TableCell>
                                    <TableCell className={classes.td}>
                                        <div className={clsx(classes.imgContainer, item.image && 'white')}>
                                            <img className={classes.img} src={item.image || '/assets/img/img-placeholder-gray.svg'} alt="im" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default ItemsTable;
