/* eslint-disable react/destructuring-assignment */
import React, { Fragment } from 'react';
import clsx from 'clsx';

import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Hidden from '@material-ui/core/Hidden';
import AddIcon from '@material-ui/icons/Add';
import Collapse from '@material-ui/core/Collapse';

import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Autocomplete from '@common_autocomplete';
import TextField from '@common_textfield';
import Button from '@common_button';

import ImageUpload from '@sellermodules/catalog/plugins/Variants/ImageUpload';
import Table from '@sellermodules/catalog/plugins/Variants/Table';
import useStyles from '@sellermodules/catalog/plugins/Variants/style';

const filter = createFilterOptions();

const VariantsContent = (props) => {
    const {
        t, formik, enableCreateVariant = false, menuVariant = [], isEdit = false,
    } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const [addVar, setAddVar] = React.useState(false);
    const [valueInput, setValueInput] = React.useState('');
    const [valueInputError, setValueInputError] = React.useState(false);
    const showTable = formik.values.is_variant && formik.values.variants.every((variant) => typeof variant === 'object'
        && variant.attribute_choosen?.length);

    const [menu, setMenu] = React.useState(menuVariant);

    const handleClickOpenButton = (event, set) => {
        set(event.currentTarget);
    };
    const submitCreateType = (e, idx, set) => {
        e.stopPropagation();
        if (e.keyCode === 13 && e.target.value && !menu.find((m) => m.frontend_label === valueInput)) {
            if (e.target.value.length >= 3) {
                const created = {
                    frontend_label: valueInput,
                    attribute_code: valueInput?.toLowerCase(),
                    attribute_options: [],
                    attribute_choosen: [],
                    is_new: true,
                };
                setMenu((prev) => [...prev, created]);
                formik.setFieldValue(`variants[${idx}]`, created);
                setValueInput('');
                set(null);
            } else {
                setValueInputError(true);
            }
        }
    };

    const array1 = formik.values.variants[0]?.attribute_choosen?.map((type) => type) || [];
    const array2 = formik.values.variants[1]?.attribute_choosen?.map((type) => type) || [];
    const combinedType = array2.length
        ? array1?.flatMap((d) => array2?.map((v) => [d.inputValue || d.label, v.inputValue || v.label]))
        : array1.map((d) => [d.inputValue || d.label]);

    const arrayImg = formik.values.variants[0]?.attribute_choosen?.map((type) => type.image || '');

    const dataTable = () => combinedType.map((combined) => {
        const combined_key = [...combined].sort().join('-');
        let existing = {};
        if (isEdit) {
            existing = formik.values.existing_variants?.find((values) => values?.combined_key === combined_key);
        }
        const tableValues = formik.values.variant_table?.find((values) => values?.combined_key === combined_key);
        const useValues = isEdit ? existing || tableValues : tableValues;
        let objReturn = {
            id: useValues?.id,
            price: tableValues?.price || '',
            sku: useValues?.sku || `${isEdit ? formik.values.vendor_sku : formik.values.sku}-${combined.join('-').toLowerCase()}`,
            weight: tableValues?.weight || '',
            status: typeof tableValues?.status === 'boolean' ? tableValues?.status : true,
            combined_key,
            is_exist: isEdit && existing,
        };

        const mappedType = [];
        formik.values.variants.map((vr, i) => {
            if (i === 0) {
                const imgIndex = array1.findIndex((arr) => arr.inputValue === combined[i] || arr.label === combined[i]);
                if (imgIndex >= 0) {
                    objReturn.image = arrayImg[imgIndex];
                }
            }
            return mappedType.push([vr.attribute_code, combined[i]]);
        });
        objReturn = {
            ...objReturn,
            ...Object.fromEntries(mappedType),
        };
        return objReturn;
    });

    React.useEffect(() => {
        formik.setFieldValue('variant_table', dataTable());
    }, [formik.values.variants, formik.values.variants.length]);

    React.useEffect(() => {
        if (valueInput && valueInput?.length >= 3) {
            setValueInputError(false);
        }
    }, [valueInput]);

    return (
        <div>
            {formik.values.variants.map((variant, idx) => (
                <Fragment key={idx}>
                    <div className={classes.formFieldsGrid}>
                        <InputLabel htmlFor={props.name} className={classes.label}>
                            {t('sellercatalog:Variant_Type')}
                        </InputLabel>
                        <Grid container spacing={3}>
                            <Grid item xs={10} sm={2} name="variants">
                                <Button
                                    className={clsx(classes.btnGray, variant?.frontend_label && 'dark', !formik.values.sku && 'disabled')}
                                    onClick={(e) => (formik.values.sku ? handleClickOpenButton(e, idx ? setAnchorEl2 : setAnchorEl) : null)}
                                    endIcon={
                                        <KeyboardArrowRightIcon className={classes.arrowDown} />
                                    }
                                    disabled={!formik.values.sku}
                                >
                                    <span className={classes.labelBtn}>
                                        {variant?.frontend_label || t('sellercatalog:Select_variant_type')}
                                    </span>
                                </Button>
                                {!!(formik.errors?.variants?.[idx]?.frontend_label) && formik.values.sku
                                    && (
                                        <div className={classes.helperText}>
                                            {(formik.errors?.variants?.[idx]?.frontend_label) || ''}
                                        </div>
                                    )}
                                <Menu
                                    elevation={0}
                                    getContentAnchorEl={null}
                                    anchorEl={idx ? anchorEl2 : anchorEl}
                                    keepMounted
                                    open={Boolean(idx ? anchorEl2 : anchorEl)}
                                    onClose={() => {
                                        setAddVar(false);
                                        if (idx) {
                                            setAnchorEl2(null);
                                        } else {
                                            setAnchorEl(null);
                                        }
                                    }}
                                    className={classes.menuAction}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                >
                                    <div className={classes.menuDiv}>
                                        {menu
                                            .filter((menuItem) => variant?.frontend_label !== menuItem.frontend_label
                                                && !formik.values.variants.find((va) => va.frontend_label === menuItem.frontend_label))
                                            .map((menuItem, i) => (
                                                <MenuItem
                                                    key={i}
                                                    onClick={() => {
                                                        formik.setFieldValue(`variants[${idx}]`,
                                                            { ...menuItem, attribute_choosen: [] });
                                                        if (idx) {
                                                            setAnchorEl2(null);
                                                        } else {
                                                            setAnchorEl(null);
                                                        }
                                                    }}
                                                    className={classes.menuItem}
                                                >
                                                    {menuItem.frontend_label}
                                                </MenuItem>
                                            ))}
                                    </div>
                                    {enableCreateVariant
                                        && (
                                            <div>
                                                <div className="divider" />
                                                <MenuItem
                                                    className={classes.menuItem}
                                                    style={{ paddingBottom: 10 }}
                                                >
                                                    <div>
                                                        <div onClick={() => setAddVar(!addVar)} aria-hidden="true">
                                                            {`${addVar ? '-' : '+'} ${t('sellercatalog:Create_variant_type')}`}
                                                        </div>
                                                        <Collapse in={addVar}>
                                                            <div style={{ marginBottom: 10 }} />
                                                            <TextField
                                                                autoFocus
                                                                placeholder={t('sellercatalog:Input_variant')}
                                                                className={classes.textInputCreate}
                                                                onKeyDown={(e) => submitCreateType(e, idx, idx ? setAnchorEl2 : setAnchorEl)}
                                                                onChange={(e) => {
                                                                    if (e.target.value.length < 31) {
                                                                        setValueInput(e.target.value);
                                                                    }
                                                                }}
                                                                value={valueInput}
                                                            />
                                                            {valueInputError
                                                                && (
                                                                    <div className="helper-error">
                                                                        <span>
                                                                            {t('sellercatalog:This_field_must_be_at_least_min_characters',
                                                                                { min: 3 })}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            <div className="helper">
                                                                <span>Min 3. character</span>
                                                                <span>
                                                                    {valueInput.length}
                                                                    /30
                                                                </span>
                                                            </div>
                                                        </Collapse>
                                                    </div>
                                                </MenuItem>
                                            </div>
                                        )}
                                </Menu>
                            </Grid>
                            <Hidden smUp>
                                <Grid item xs={1} sm={1}>
                                    <div className={classes.centering}>
                                        <img
                                            src="/assets/img/trash-new.svg"
                                            alt="trash"
                                            className={classes.trash}
                                            onClick={() => {
                                                if (formik.values.sku) {
                                                    const temp = formik.values.variants;
                                                    if (temp.length > 1) {
                                                        temp.splice(idx, 1);
                                                        formik.setFieldValue('variants', temp);
                                                    } else {
                                                        formik.setFieldValue('variants', [{}]);
                                                    }
                                                }
                                            }}
                                            aria-hidden="true"
                                        />
                                    </div>
                                </Grid>
                            </Hidden>
                            <Grid item xs={12} sm={9}>
                                {variant?.frontend_label
                                    ? (
                                        <Autocomplete
                                            disabled={!formik.values.sku}
                                            name="variants"
                                            multiple
                                            value={variant?.attribute_choosen}
                                            className={classes.textInput}
                                            onChange={(e) => formik.setFieldValue(`variants[${idx}].attribute_choosen`, e)}
                                            filterOptions={(options, params) => {
                                                const filtered = filter(options, params);
                                                if (params.inputValue !== ''
                                                    && !variant.attribute_choosen?.find((v) => v.inputValue === params.inputValue)
                                                    && (variant.vendor_id || variant.is_new)) {
                                                    filtered.push({
                                                        inputValue: params.inputValue,
                                                        label: `Add "${params.inputValue}"`,
                                                    });
                                                }
                                                return filtered;
                                            }}
                                            selectOnFocus
                                            clearOnBlur
                                            handleHomeEndKeys
                                            options={variant.attribute_options}
                                            getOptionLabel={(option) => {
                                                if (option.inputValue) {
                                                    return option.inputValue;
                                                }
                                                return option.label;
                                            }}
                                            primaryKey="label"
                                            labelKey="value"
                                            renderOption={(option) => option.label}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    placeholder={t('sellercatalog:Type_to_add_type_variant_type',
                                                        { type: variant?.label })}
                                                    value={valueInput}
                                                    onKeyDown={(e) => {
                                                        if (e.keyCode === 13 && e.target.value && (variant.vendor_id || variant.is_new)
                                                            && !variant.attribute_choosen?.find((v) => v.inputValue === e.target.value)) {
                                                            formik.setFieldValue(`variants[${idx}].attribute_choosen`,
                                                                variant.attribute_choosen?.concat({
                                                                    inputValue: e.target.value,
                                                                    label: `${t('sellercatalog:Add')} "${e.target.value}"`,
                                                                }));
                                                        }
                                                    }}
                                                    error={!!(formik.touched?.variants?.[idx]?.attribute_choosen
                                                        && formik.errors?.variants?.[idx]?.attribute_choosen)}
                                                    helperText={(formik.touched?.variants?.[idx]?.attribute_choosen
                                                        && formik.errors?.variants?.[idx]?.attribute_choosen) || ''}
                                                />
                                            )}
                                        />
                                    ) : <div />}
                            </Grid>
                            <Hidden xsDown>
                                <Grid
                                    item
                                    xs={1}
                                    sm={1}
                                >
                                    <div className={classes.centering}>
                                        <img
                                            src="/assets/img/trash-new.svg"
                                            alt="trash"
                                            className={classes.trash}
                                            onClick={() => {
                                                if (formik.values.sku) {
                                                    const temp = formik.values.variants;
                                                    if (temp.length > 1) {
                                                        temp.splice(idx, 1);
                                                        formik.setFieldValue('variants', temp);
                                                    } else {
                                                        formik.setFieldValue('variants', [{}]);
                                                    }
                                                }
                                            }}
                                            aria-hidden="true"
                                        />
                                    </div>
                                </Grid>
                            </Hidden>
                        </Grid>
                    </div>
                    {idx === 0
                        && (
                            <>
                                {!!variant.attribute_choosen?.length
                                    && (
                                        <div className={classes.formFieldsGrid}>
                                            <div />
                                            <ImageUpload {...props} />
                                        </div>
                                    )}
                                {formik.values.variants.length < 2 && showTable
                                    && (
                                        <div className={classes.formFieldsGrid}>
                                            <div />
                                            <Button
                                                className={clsx(classes.btn, 'outlined', !formik.values.sku && 'disabled')}
                                                disabled={!formik.values.sku}
                                                startIcon={<AddIcon />}
                                                onClick={() => formik.setFieldValue('variants', [...formik.values.variants, {}])}
                                            >
                                                {t('sellercatalog:Add_Product_Variants')}
                                            </Button>
                                        </div>
                                    )}
                            </>
                        )}
                </Fragment>
            ))}
            <div name="variant_table">
                {showTable
                    && (
                        <>
                            <div className={classes.formFieldsGrid}>
                                <div />
                                <div className={classes.divider} />
                            </div>
                            <Table {...props} />
                        </>
                    )}
            </div>
        </div>
    );
};

export default VariantsContent;
