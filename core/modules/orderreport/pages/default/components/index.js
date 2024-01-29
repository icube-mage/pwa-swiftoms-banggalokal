/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import Autocomplete from '@common_autocomplete';
import Table from '@common_table';
import clsx from 'clsx';
import useStyles from '@modules/orderreport/pages/default/components/style';

const OrderReportContent = (props) => {
    const {
        formik,
        t,
        getSalesOrderReportRes,
        generateSalesOrderReport,
    } = props;
    const classes = useStyles();

    const reportList = getSalesOrderReportRes.data?.getSalesOrderReport || [];

    const periodOptions = [
        { id: 'day', name: t('orderreport:Day') },
        { id: 'month', name: t('orderreport:Month') },
        { id: 'year', name: t('orderreport:Year') },
    ];

    const statusOptions = [
        { id: 'canceled', name: 'Canceled' },
        { id: 'pending', name: 'Pending' },
        { id: 'processing', name: 'Processing' },
        { id: 'complete', name: 'Complete' },
    ];

    const columns = [
        { field: 'period', headerName: t('orderreport:Interval'), hideable: true },
        { field: 'orders_count', headerName: t('orderreport:Orders'), hideable: true },
        { field: 'total_qty_ordered', headerName: t('orderreport:Sales_Items'), hideable: true },
        { field: 'total_income_amount', headerName: t('orderreport:Sales_Total'), hideable: true },
        { field: 'total_invoiced_amount', headerName: t('orderreport:Invoiced'), hideable: true },
        { field: 'total_refunded_amount', headerName: t('orderreport:Refunded'), hideable: true },
        { field: 'total_tax_amount', headerName: t('orderreport:Sales_Tax'), hideable: true },
        { field: 'total_shipping_amount', headerName: t('orderreport:Sales_Shipping'), hideable: true },
        { field: 'total_discount_amount', headerName: t('orderreport:Sales_Discount'), hideable: true },
        { field: 'total_canceled_amount', headerName: t('orderreport:Canceled'), hideable: true },
    ];

    const rows = reportList.map((report) => ({
        ...report,
        id: report.period,
    }));

    const handleRefresh = () => {
        if (formik.values.date_from && formik.values.date_to) {
            window.backdropLoader(true);
            generateSalesOrderReport({
                variables: {
                    input: {
                        date_from: formik.values.date_from,
                        date_to: formik.values.date_to,
                    },
                },
            });
        } else {
            formik.setTouched({ ...formik.touched, date_from: true, date_to: true }, true);
        }
    };

    return (
        <>
            <h2 className={classes.titleTop}>{t('orderreport:Order_Report')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>
                                {t('orderreport:Period')}
                            </span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            value={periodOptions.find((p) => p.id === formik.values.period)}
                            onChange={(e) => formik.setFieldValue('period', e?.id || '')}
                            options={periodOptions}
                            error={!!(formik.touched.period && formik.errors.period)}
                            helperText={(formik.touched.period && formik.errors.period) || ''}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>
                                {t('orderreport:From')}
                            </span>
                        </div>
                        <TextField
                            type="date"
                            variant="outlined"
                            name="date_from"
                            value={formik.values.date_from}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.date_from && formik.errors.date_from)}
                            helperText={(formik.touched.date_from && formik.errors.date_from) || ''}
                            className={clsx(classes.fieldRoot, 'field-date')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>
                                {t('orderreport:To')}
                            </span>
                        </div>
                        <TextField
                            type="date"
                            variant="outlined"
                            name="date_to"
                            value={formik.values.date_to}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.date_to && formik.errors.date_to)}
                            helperText={(formik.touched.date_to && formik.errors.date_to) || ''}
                            className={clsx(classes.fieldRoot, 'field-date')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>
                                {t('orderreport:Order_Status')}
                            </span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            value={statusOptions.find((p) => p.id === formik.values.status)}
                            onChange={(e) => formik.setFieldValue('status', e?.id)}
                            options={statusOptions}
                            error={!!(formik.touched.status && formik.errors.status)}
                            helperText={(formik.touched.status && formik.errors.status) || ''}
                        />
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                        style={{ marginRight: 10 }}
                    >
                        {t('orderreport:Show_Report')}
                    </Button>
                    <Button
                        className={classes.btn}
                        onClick={handleRefresh}
                        variant="contained"
                        buttonType="outlined"
                    >
                        {t('orderreport:Refresh_Statistics')}
                    </Button>
                </div>
            </Paper>
            <div className={classes.tableContainer}>
                <Table
                    rows={rows}
                    loading={getSalesOrderReportRes.loading}
                    columns={columns}
                    hideActions
                    hideFilters
                    hideFooter
                    wrapHeader
                />
            </div>
        </>
    );
};

export default OrderReportContent;
