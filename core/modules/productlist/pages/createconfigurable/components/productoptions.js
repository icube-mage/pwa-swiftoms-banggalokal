import React from 'react';
import clsx from 'clsx';
import useStyles from '@modules/productlist/pages/createconfigurable/components/style';

import Button from '@common_button';
import TextField from '@common_textfield';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const ProductOptionsContent = (props) => {
    const {
        formik,
        t,
        setOpenOptions,
    } = props;
    const classes = useStyles();

    const handleDeleteOption = (i) => {
        const temp = formik.values.options;
        temp.splice(i, 1);
        if (temp.length === 0) {
            formik.setFieldValue('shouldCheck', false);
        }
        formik.setFieldValue('options', temp);
    };

    const handleDeleteValue = (i, idx) => {
        const temp = formik.values.options[i].values;
        temp.splice(idx, 1);
        if (temp.length === 0) {
            window.toastMessage({
                open: true,
                text: t('productlist:Minimal_1_Title_is_filled_If_you_want_to_delete_this_title_please_delete_the_option_instead'),
                variant: 'error',
            });
        } else {
            formik.setFieldValue(`options[${i}].values`, temp);
        }
    };

    return (
        <>
            <div className={classes.optionTop}>
                <span>
                    {t('productlist:Custom_options_let_customers_choose_the_product_variations_they_want')}
                </span>
                <div className={classes.optionButton}>
                    <Button
                        style={{ marginTop: 5 }}
                        buttonType="outlined-rounded"
                        onClick={() => setOpenOptions(true)}
                    >
                        {t('productlist:Import_Option')}
                    </Button>
                    <Button
                        style={{ marginLeft: 10, marginTop: 5 }}
                        buttonType="primary-rounded"
                        onClick={() => {
                            formik.setFieldValue('options', [...formik.values.options, {
                                is_delete: false,
                                option_id: null,
                                title: '',
                                values: [
                                    {
                                        sku: '', title: '',
                                    },
                                ],
                            }]);
                        }}
                    >
                        {t('productlist:Add_Option')}
                    </Button>
                </div>
            </div>
            {formik.values.options.map((option, i) => (
                <div className={classes.optionContainer} key={i}>
                    <div className={classes.gridOption}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>
                                {t('productlist:Option_Title')}
                            </span>
                        </div>
                        <div className={classes.gridTextOption}>
                            <TextField
                                name={`options[${i}].title`}
                                className={classes.fieldRoot}
                                variant="outlined"
                                value={option?.title}
                                onChange={formik.handleChange}
                                InputProps={{
                                    className: clsx(classes.fieldInput),
                                }}
                                autoComplete="off"
                                error={!!(formik.touched.options?.length && formik.touched.options[i]?.title
                                    && formik.errors.options?.length && formik.errors.options[i]?.title)}
                                helperText={(formik.touched.options?.length
                                    && formik.touched.options[i]?.title && formik.errors.options?.length
                                    && formik.errors.options[i]?.title) || ''}
                                fullWidth
                            />
                            <IconButton
                                style={{
                                    placeSelf: 'start center',
                                    width: 'fit-content',
                                    color: 'black',
                                    paddingTop: 5,
                                }}
                                edge="end"
                                onClick={() => handleDeleteOption(i)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </div>
                    <div className={classes.gridTableOption}>
                        <div />
                        <table className={classes.table}>
                            <tbody>
                                <tr className={classes.tr}>
                                    <th className={classes.th}>
                                        {t('productlist:Title')}
                                        <span className={classes.required}>*</span>
                                    </th>
                                    <th className={classes.th}>
                                        {t('productlist:SKU')}
                                        <span className={classes.required}>*</span>
                                    </th>
                                    <th className={classes.th}>{t('productlist:Action')}</th>
                                </tr>
                                {option.values.map((e, idx) => (
                                    <tr key={idx}>
                                        <td className={classes.td}>
                                            <TextField
                                                name={`options[${i}].values[${idx}].title`}
                                                variant="outlined"
                                                value={e.title}
                                                onChange={formik.handleChange}
                                                autoComplete="off"
                                                fullWidth
                                                InputProps={{
                                                    className: clsx(classes.fieldInputSquare),
                                                }}
                                                error={!!(formik.touched.options?.length && formik.touched.options[i]?.values?.length
                                                    && formik.touched.options[i]?.values[idx]?.title
                                                    && formik.errors.options?.length && formik.errors.options[i]?.values?.length
                                                    && formik.errors.options[i]?.values[idx]?.title)}
                                                helperText={(formik.touched.options?.length && formik.touched.options[i]?.values?.length
                                                    && formik.touched.options[i]?.values[idx]?.title
                                                    && formik.errors.options?.length && formik.errors.options[i]?.values?.length
                                                    && formik.errors.options[i]?.values[idx]?.title) || ''}
                                            />
                                        </td>
                                        <td className={classes.td}>
                                            <TextField
                                                name={`options[${i}].values[${idx}].sku`}
                                                variant="outlined"
                                                value={e.sku}
                                                onChange={formik.handleChange}
                                                autoComplete="off"
                                                fullWidth
                                                InputProps={{
                                                    className: clsx(classes.fieldInputSquare),
                                                }}
                                                error={!!(formik.touched.options?.length && formik.touched.options[i]?.values?.length
                                                    && formik.touched.options[i]?.values[idx]?.sku
                                                    && formik.errors.options?.length && formik.errors.options[i]?.values?.length
                                                    && formik.errors.options[i]?.values[idx]?.sku)}
                                                helperText={(formik.touched.options?.length && formik.touched.options[i]?.values?.length
                                                    && formik.touched.options[i]?.values[idx]?.sku
                                                    && formik.errors.options?.length && formik.errors.options[i]?.values?.length
                                                    && formik.errors.options[i]?.values[idx]?.sku) || ''}
                                            />
                                        </td>
                                        <td className={classes.td}>
                                            <IconButton
                                                edge="end"
                                                onClick={() => handleDeleteValue(i, idx)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </td>
                                    </tr>
                                ))}
                                <tfoot>
                                    <tr>
                                        <td>
                                            <Button
                                                buttonType="primary-rounded"
                                                onClick={() => {
                                                    formik.setFieldValue(`options[${i}].values`,
                                                        [...formik.values.options[i].values, {
                                                            sku: '', title: '',
                                                        }]);
                                                }}
                                            >
                                                {t('productlist:Add')}
                                            </Button>

                                        </td>
                                    </tr>
                                </tfoot>
                            </tbody>
                        </table>
                    </div>
                    <div style={{ height: 10 }} />
                </div>
            ))}
        </>
    );
};

export default ProductOptionsContent;
