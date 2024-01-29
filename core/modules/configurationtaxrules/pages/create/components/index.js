/* eslint-disable no-confusing-arrow */
/* eslint-disable indent */
/* eslint-disable no-lone-blocks */
/* eslint-disable max-len */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import useStyles from '@modules/configurationtaxrules/pages/create/components/style';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import TextField from '@common_textfield';

import Checkbox from '@material-ui/core/Checkbox';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import SearchableListAction from './SearchableListAction';
import ListActions from './ListAction';

const GeneralConfigurationContent = (props) => {
    const {
        formik, getTaxRateListRes, setSearchTaxRate, getProductTaxClassListRes,
        getCustomerTaxClassListRes, t, id,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const [expandAccordion, setExpandAccordion] = React.useState(false);

    return (
        <>
            <div className={classes.topPage}>
                <div>
                    <Button
                        className={classes.btnBack}
                        onClick={() => router.push('/configurations/taxrules')}
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
                        {id ? t('taxrulesconfiguration:Edit_Tax_Rule') : t('taxrulesconfiguration:New_Tax_Rule')}
                    </h2>
                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        onClick={formik.handleSubmit}
                        variant="contained"
                        buttonType="primary-rounded"
                    >
                        {t('taxrulesconfiguration:Save_Rule')}
                    </Button>
                </div>
            </div>
            <Paper className={classes.container}>

                <div className={classes.content}>
                    <Accordion
                        expanded
                        elevation={4}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                            <h2 className={classes.title} style={{ textTransform: 'uppercase' }}>
                                {t('taxrulesconfiguration:General_Information')}
                            </h2>
                        </AccordionSummary>
                        <AccordionDetails classes={{ root: classes.accordionDetailRoot }}>
                            <div className={classes.contentChild}>
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={clsx(classes.label, classes.labelRequired)}>
                                            {t('taxrulesconfiguration:Name')}
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
                                <div className={clsx(classes.formField, 'block')}>
                                    <div className={classes.divLabel}>
                                        <span className={clsx(classes.label, classes.labelRequired)}>
                                            {t('taxrulesconfiguration:Tax_Rate')}
                                        </span>
                                    </div>
                                    <SearchableListAction
                                        name="tax_rate"
                                        searchable
                                        setSearch={setSearchTaxRate}
                                        options={getTaxRateListRes?.data?.getTaxRateList?.items || []}
                                        loading={getTaxRateListRes.loading}
                                        {...props}
                                    />
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>

                </div>

                <div className={classes.content}>
                    <Accordion
                        onChange={() => setExpandAccordion(!expandAccordion)}
                        expanded={expandAccordion}
                        TransitionProps={{ unmountOnExit: true }}
                        elevation={4}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                            <h2 className={classes.title} style={{ textTransform: 'uppercase' }}>
                                {t('taxrulesconfiguration:Additional_Settings')}
                            </h2>
                        </AccordionSummary>
                        <AccordionDetails classes={{ root: classes.accordionDetailRoot }}>
                            <div className={classes.contentChild}>
                                <div className={clsx(classes.formField, 'block')}>
                                    <div className={classes.divLabel}>
                                        <span className={clsx(classes.label, classes.labelRequired)}>
                                            {t('taxrulesconfiguration:Customer_Tax_Class')}
                                        </span>
                                    </div>
                                    <ListActions
                                        name="tax_customer_class"
                                        options={getCustomerTaxClassListRes?.data?.getTaxClassList || []}
                                        loading={getCustomerTaxClassListRes.loading}
                                        keyValue="id"
                                        keyLabel="class_name"
                                        classType="CUSTOMER"
                                        error={!!(formik.touched.tax_customer_class && formik.errors.tax_customer_class)}
                                        helperText={(formik.touched.tax_customer_class && formik.errors.tax_customer_class) || ''}
                                        {...props}
                                    />
                                </div>
                                <div className={clsx(classes.formField, 'block')}>
                                    <div className={classes.divLabel}>
                                        <span className={clsx(classes.label, classes.labelRequired)}>
                                            {t('taxrulesconfiguration:Product_Tax_Class')}
                                        </span>
                                    </div>
                                    <ListActions
                                        name="tax_product_class"
                                        options={getProductTaxClassListRes?.data?.getTaxClassList || []}
                                        loading={getProductTaxClassListRes.loading}
                                        keyValue="id"
                                        keyLabel="class_name"
                                        classType="PRODUCT"
                                        error={!!(formik.touched.tax_product_class && formik.errors.tax_product_class)}
                                        helperText={(formik.touched.tax_product_class && formik.errors.tax_product_class) || ''}
                                        {...props}
                                    />
                                </div>
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={clsx(classes.label, classes.labelRequired)}>
                                            {t('taxrulesconfiguration:Priority')}
                                        </span>
                                    </div>
                                    <div className={classes.divField}>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="priority"
                                            value={formik.values.priority}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.priority && formik.errors.priority)}
                                            helperText={(formik.touched.priority && formik.errors.priority) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                            fullWidth
                                        />
                                    </div>
                                </div>
                                <div className={classes.formFieldCheck}>
                                    <div className={classes.divLabel}>
                                        <span className={classes.label}>
                                            {t('taxrulesconfiguration:Subtotal_Only')}
                                        </span>
                                    </div>
                                    <div className={classes.divFieldCheck}>
                                        <Checkbox
                                            name="calculate_subtotal"
                                            checked={formik.values.calculate_subtotal}
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={clsx(classes.label, classes.labelRequired)}>
                                            {t('taxrulesconfiguration:Sort_Order')}
                                        </span>
                                    </div>
                                    <div className={classes.divField}>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name="position"
                                            value={formik.values.position}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.position && formik.errors.position)}
                                            helperText={(formik.touched.position && formik.errors.position) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                            fullWidth
                                        />
                                    </div>
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </Paper>
        </>
    );
};

export default GeneralConfigurationContent;
