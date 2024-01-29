import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import useStyles from '@modules/configurationregionmapping/pages/edit/components/style';
import Autocomplete from '@common_autocomplete';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const AdminStoreCreateContent = (props) => {
    const {
        formik, options, t,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const optionsRegion = formik.values.countries && formik.values.countries.id
        ? options.find((country) => country.id === formik.values.countries.id) : [];

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/configurations/regionmapping')}
                variant="contained"
                style={{ marginRight: 16 }}
            >
                <ChevronLeftIcon style={{
                    fontSize: 30,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                />
            </Button>
            <h2 className={classes.titleTop}>
                {t('regionmappingconfiguration:Edit_Region_Mapping')}
            </h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('regionmappingconfiguration:Region_Raw')}</span>
                        </div>

                        <TextField
                            name="region_raw"
                            value={formik.values.region_raw}
                            onChange={formik.handleChange}
                            className={classes.fieldRoot}
                            variant="outlined"
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                            error={!!(formik.touched.region_raw && formik.errors.region_raw)}
                            helperText={(formik.touched.region_raw && formik.errors.region_raw) || ''}
                        />
                    </div>
                    <div style={{ height: 10 }} />
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('regionmappingconfiguration:Country')}</span>
                        </div>

                        <Autocomplete
                            className={classes.autocompleteRoot}
                            name="countries"
                            value={formik.values.countries}
                            onChange={(e) => formik.setFieldValue('countries', e)}
                            primaryKey="id"
                            labelKey="full_name_english"
                            options={options
                                || [{
                                    full_name_english: 'Indonesia',
                                    id: 'ID',
                                }]}
                            fullWidth
                        />
                    </div>
                    <div style={{ height: 20 }} />
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('regionmappingconfiguration:Region_Code')}</span>
                        </div>

                        <Autocomplete
                            disabled={!(formik.values.countries && formik.values.countries.id)}
                            className={classes.autocompleteRoot}
                            value={formik.values.region}
                            onChange={(e) => formik.setFieldValue('region', e)}
                            options={optionsRegion.available_regions}
                            primaryKey="id"
                            labelKey="name"
                            error={!!(formik.touched.region && formik.errors.region)}
                            helperText={(formik.touched.region && formik.errors.region) || ''}
                        />
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        {t('regionmappingconfiguration:Submit')}
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default AdminStoreCreateContent;
