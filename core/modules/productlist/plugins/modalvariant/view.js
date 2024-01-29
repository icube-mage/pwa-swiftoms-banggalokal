/* eslint-disable max-len */
import * as React from 'react';
import Button from '@common_button';
import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from '@modules/productlist/plugins/modalvariant/style';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';

const CreateAttribute = (props) => {
    const {
        formik,
        open,
        setOpen,
        getInputTypeAttribute,
        getInputTypeAttributeRes,
        createConfigurableAttributesRes,
        t,
        loading,
    } = props;
    const classes = useStyles();

    const handleClose = () => {
        if (!(createConfigurableAttributesRes.loading || loading)) {
            setOpen(false);
            formik.resetForm();
        }
    };

    return (
        <>
            <Dialog open={open} className={classes.wrapperDialog}>
                <DialogTitle>
                    {t('productlist:New_Attribute')}
                    <IconButton className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <div className={classes.formFieldButton}>
                    <Button className={classes.btn} onClick={formik.handleSubmit}>
                        {t('productlist:Save_Attribute')}
                    </Button>
                </div>
                <DialogContent>
                    {createConfigurableAttributesRes.loading || loading
                        ? <div className={classes.circular}><CircularProgress size={50} /></div>
                        : (
                            <>
                                <h3 className={classes.titleSection}>{t('productlist:Attribute_Properties')}</h3>
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={clsx(classes.label, classes.labelRequired)}>{t('productlist:Default_Label')}</span>
                                    </div>
                                    <TextField
                                        variant="outlined"
                                        name="frontend_label"
                                        value={formik.values.frontend_label}
                                        onChange={formik.handleChange}
                                        error={!!(formik.touched.frontend_label && formik.errors.frontend_label)}
                                        helperText={(formik.touched.frontend_label && formik.errors.frontend_label) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                    />
                                </div>
                                <div className={classes.formField}>
                                    <div className={classes.divLabel} style={{ width: '95%' }}>
                                        <span className={clsx(classes.label, classes.labelRequired)}>{t('productlist:Catalog_Input_Type_for_Store_Owner')}</span>
                                    </div>
                                    <Autocomplete
                                        mode="lazy"
                                        className={classes.autocompleteRoot}
                                        value={formik.values.frontend_input}
                                        onChange={(e) => formik.setFieldValue('frontend_input', e)}
                                        loading={getInputTypeAttributeRes.loading}
                                        options={
                                            getInputTypeAttributeRes
                                    && getInputTypeAttributeRes.data
                                    && getInputTypeAttributeRes.data.getInputTypeAttribute
                                        }
                                        getOptions={getInputTypeAttribute}
                                        error={!!(formik.touched.frontend_input && formik.errors.frontend_input)}
                                        helperText={(formik.touched.frontend_input && formik.errors.frontend_input) || ''}
                                        primaryKey="value"
                                        labelKey="label"
                                    />
                                </div>
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={clsx(classes.label, classes.labelRequired)}>{t('productlist:Attribute_Code')}</span>
                                    </div>
                                    <TextField
                                        variant="outlined"
                                        name="attribute_code"
                                        value={formik.values.attribute_code}
                                        onChange={formik.handleChange}
                                        error={!!(formik.touched.attribute_code && formik.errors.attribute_code)}
                                        helperText={(formik.touched.attribute_code && formik.errors.attribute_code) || t("productlist:This_is_used_internally_Make_sure_you_don't_use_spaces_or_more_than_60_symbols")}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                    />
                                </div>
                            </>
                        ) }
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CreateAttribute;
