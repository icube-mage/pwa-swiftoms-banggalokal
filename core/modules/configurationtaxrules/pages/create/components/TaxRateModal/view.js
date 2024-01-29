import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import clsx from 'clsx';
import useStylesContent from '@modules/configurationtaxrules/pages/create/components/TaxRateModal/style';
import useStyles from '@modules/configurationtaxrules/pages/create/components/style';
import Autocomplete from '@common_autocomplete';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';

const LocationCreateContent = (props) => {
    const {
        formik, open, handleClose, getCountriesRes, getCountryRes, getCountry, t,
    } = props;
    const classes = useStyles();
    const classesContent = useStylesContent();

    const [countryOptions, setCountryOptions] = React.useState([{ id: 0, name: '*' }]);

    React.useEffect(() => {
        if (getCountryRes.data?.country?.available_regions?.length) {
            setCountryOptions([{ id: 0, name: '*' }, ...getCountryRes.data?.country?.available_regions]);
        }
    }, [getCountryRes.data]);

    React.useEffect(() => {
        if (formik.values.tax_country_id) {
            getCountry({
                variables: { id: formik.values.tax_country_id },
            });
        }
    }, [formik.values.tax_country_id]);

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth="true" classes={{ paper: classesContent.paper }}>
            <DialogTitle classes={{ root: classesContent.titleTop }}>
                {t('taxrulesconfiguration:Tax_Rate')}
            </DialogTitle>
            <DialogContent classes={{ root: clsx(classesContent.content, classesContent.contentCounter) }}>

                <div className={classesContent.formField}>
                    <div className={classes.divLabel}>
                        <span className={clsx(classes.label, classes.labelRequired)}>
                            {t('taxrulesconfiguration:Tax_Identifier')}
                        </span>
                    </div>
                    <div className={classes.divField}>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="code"
                            value={formik.values.code}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.code && formik.errors.code)}
                            helperText={(formik.touched.code && formik.errors.code) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                            fullWidth
                        />
                    </div>
                </div>

                <div className={classesContent.formFieldCheck}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>
                            {t('taxrulesconfiguration:ZipPost_is_Range')}
                        </span>
                    </div>
                    <div className={classes.divFieldCheck}>
                        <Checkbox
                            name="zip_is_range"
                            checked={formik.values.zip_is_range}
                            onChange={(e) => {
                                formik.setFieldValue('tax_postcode', '*');
                                formik.handleChange(e);
                            }}
                        />
                    </div>
                </div>

                {formik.values.zip_is_range
                    ? (
                        <>
                            <div className={classesContent.formField}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>
                                        {t('taxrulesconfiguration:Range_From')}
                                    </span>
                                </div>
                                <div className={classes.divField}>
                                    <TextField
                                        className={classes.fieldRoot}
                                        variant="outlined"
                                        name="zip_from"
                                        value={formik.values.zip_from}
                                        onChange={formik.handleChange}
                                        error={!!(formik.touched.zip_from && formik.errors.zip_from)}
                                        helperText={(formik.touched.zip_from && formik.errors.zip_from) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                        fullWidth
                                    />
                                </div>
                            </div>
                            <div className={classesContent.formField}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>
                                        {t('taxrulesconfiguration:Range_To')}
                                    </span>
                                </div>
                                <div className={classes.divField}>
                                    <TextField
                                        className={classes.fieldRoot}
                                        variant="outlined"
                                        name="zip_to"
                                        value={formik.values.zip_to}
                                        onChange={formik.handleChange}
                                        error={!!(formik.touched.zip_to && formik.errors.zip_to)}
                                        helperText={(formik.touched.zip_to && formik.errors.zip_to) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                        fullWidth
                                    />
                                </div>
                            </div>
                        </>
                    )
                    : (
                        <div className={classesContent.formField}>
                            <div className={classes.divLabel}>
                                <span className={clsx(classes.label, classes.labelRequired)}>
                                    {t('taxrulesconfiguration:ZipPost_Code')}
                                </span>
                            </div>
                            <div className={classes.divField}>
                                <TextField
                                    className={classes.fieldRoot}
                                    variant="outlined"
                                    name="tax_postcode"
                                    value={formik.values.tax_postcode}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.tax_postcode && formik.errors.tax_postcode)}
                                    helperText={(formik.touched.tax_postcode && formik.errors.tax_postcode) || ''}
                                    InputProps={{
                                        className: classes.fieldInput,
                                    }}
                                    fullWidth
                                />
                            </div>
                        </div>
                    )}

                <div className={classesContent.formField}>
                    <div className={classes.divLabel}>
                        <span className={clsx(classes.label, classes.labelRequired)}>
                            {t('taxrulesconfiguration:Country')}
                        </span>
                    </div>
                    <div className={classes.divField}>
                        <Autocomplete
                            name="tax_country_id"
                            className={classes.autocompleteRoot}
                            value={(getCountriesRes.data?.countries || [])
                                .find((country) => String(country?.id) === String(formik.values?.tax_country_id))}
                            onChange={(e) => formik.setFieldValue('tax_country_id', e?.id && String(e.id))}
                            loading={getCountriesRes.loading}
                            options={getCountriesRes.data?.countries || []}
                            error={!!(formik.touched.tax_country_id && formik.errors.tax_country_id)}
                            helperText={(formik.touched.tax_country_id && formik.errors.tax_country_id) || ''}
                            primaryKey="id"
                            labelKey="full_name_english"
                        />
                    </div>
                </div>

                <div className={classesContent.formField} style={{ marginTop: 16 }}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>
                            {t('taxrulesconfiguration:State')}
                        </span>
                    </div>
                    <div className={classes.divField}>
                        <Autocomplete
                            disabled={!formik.values.tax_country_id}
                            name="tax_region_id"
                            className={classes.autocompleteRoot}
                            value={countryOptions.find((region) => String(region?.id) === String(formik.values?.tax_region_id))}
                            onChange={(e) => formik.setFieldValue('tax_region_id', e?.id && String(e.id))}
                            loading={getCountryRes.loading}
                            options={countryOptions}
                            error={!!(formik.touched.tax_region_id && formik.errors.tax_region_id)}
                            helperText={(formik.touched.tax_region_id && formik.errors.tax_region_id) || ''}
                            primaryKey="id"
                            labelKey="name"
                        />
                    </div>
                </div>

                <div className={classesContent.formField}>
                    <div className={classes.divLabel}>
                        <span className={clsx(classes.label, classes.labelRequired)}>
                            {t('taxrulesconfiguration:Rate_Percent')}
                        </span>
                    </div>
                    <div className={classes.divField}>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="rate"
                            value={formik.values.rate}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.rate && formik.errors.rate)}
                            helperText={(formik.touched.rate && formik.errors.rate) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                            fullWidth
                        />
                    </div>
                </div>

            </DialogContent>
            <div className={classesContent.formFieldButton}>
                <Button onClick={formik.handleSubmit} buttonType="primary-rounded">
                    {t('taxrulesconfiguration:Submit')}
                </Button>
                <Button onClick={handleClose} buttonType="link" style={{ color: '#BE1F93' }}>
                    {t('taxrulesconfiguration:Cancel')}
                </Button>
            </div>
        </Dialog>
    );
};

export default LocationCreateContent;
