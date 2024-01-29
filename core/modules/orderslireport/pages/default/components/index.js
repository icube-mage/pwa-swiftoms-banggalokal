/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import Autocomplete from '@common_autocomplete';
import Table from '@common_table';
import clsx from 'clsx';
import useStyles from '@modules/orderslireport/pages/default/components/style';

const OrderReportCreateContent = (props) => {
    const {
        formik,
        t,
        getChannelList,
        getChannelListRes,
        getOrderSliReportRes,
    } = props;
    const classes = useStyles();

    const reportList = getOrderSliReportRes.data?.getOrderSliReport || [];

    const periodOptions = [
        { id: 'day', name: t('orderslireport:Day') },
        { id: 'month', name: t('orderslireport:Month') },
        { id: 'year', name: t('orderslireport:Year') },
    ];

    const columns = [
        { field: 'period_interval', headerName: t('orderslireport:Interval'), hideable: true },
        { field: 'channel_name', headerName: t('orderslireport:Channel'), hideable: true },
        { field: 'total_order_queue', headerName: t('orderslireport:Total_Order_Queue'), hideable: true },
        { field: 'avg_entry_time', headerName: t('orderslireport:Avg_Entry_Time'), hideable: true },
        { field: 'total_order_allocated', headerName: `${t('orderslireport:Total_Allocated')} (%)`, hideable: true },
        { field: 'avg_order_allocation_time', headerName: t('orderslireport:Avg_Allocation_Time'), hideable: true },
        { field: 'total_order_created', headerName: `${t('orderslireport:Total_Order_Created')} (%)`, hideable: true },
        { field: 'avg_order_creation_time', headerName: t('orderslireport:Avg_Order_Creation_Time'), hideable: true },
        { field: 'total_shipment_created', headerName: `${t('orderslireport:Total_Shipment_Created')} (%)`, hideable: true },
        { field: 'avg_shipment_creation_time', headerName: t('orderslireport:Avg_Shipment_Creation_Time'), hideable: true },
        { field: 'total_shipment_confirmed', headerName: `${t('orderslireport:Total_Confirmed')} (%)`, hideable: true },
        { field: 'avg_shipment_confirmation_time', headerName: t('orderslireport:Avg_Confirmation_Time'), hideable: true },
        { field: 'total_shipment_awb', headerName: `${t('orderslireport:Total_Shipped_with_AWB')} (%)`, hideable: true },
        { field: 'avg_shipment_awb_time', headerName: t('orderslireport:Avg_Shipped_with_AWB'), hideable: true },
        { field: 'total_shipment_delivered', headerName: `${t('orderslireport:Total_Delivered')} (%)`, hideable: true },
        { field: 'avg_shipment_delivered_time', headerName: t('orderslireport:Avg_Delivered_Time'), hideable: true },
        { field: 'total_order_canceled', headerName: `${t('orderslireport:Total_Canceled')} (%)`, hideable: true },
        { field: 'avg_order_cancellation_time', headerName: t('orderslireport:Avg_Cancellation_Time'), hideable: true },
    ];

    const rows = reportList.map((report) => ({
        ...report,
        id: report.period_interval,
        total_order_allocated: `${report.total_order_allocated || 0} (${report.total_order_allocated_percent || 0}%)`,
        total_order_created: `${report.total_order_created || 0} (${report.total_order_created_percent || 0}%)`,
        total_shipment_created: `${report.total_shipment_created || 0} (${report.total_shipment_created_percent || 0}%)`,
        total_shipment_confirmed: `${report.total_shipment_confirmed || 0} (${report.total_shipment_confirmed_percent || 0}%)`,
        total_shipment_awb: `${report.total_shipment_awb || 0} (${report.total_shipment_awb_percent || 0}%)`,
        total_shipment_delivered: `${report.total_shipment_delivered || 0} (${report.total_shipment_delivered_percent || 0}%)`,
        total_order_canceled: `${report.total_order_canceled || 0} (${report.total_order_canceled_percent || 0}%)`,
    }));

    return (
        <>
            <h2 className={classes.titleTop}>{t('orderslireport:Order_Service_Level_Indicator_SLI_Report')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>
                                {t('orderslireport:Period')}
                            </span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            value={periodOptions.find((p) => p.id === formik.values.period)}
                            onChange={(e) => formik.setFieldValue('period', e?.id)}
                            options={periodOptions}
                            error={!!(formik.touched.period && formik.errors.period)}
                            helperText={(formik.touched.period && formik.errors.period) || ''}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>
                                {t('orderslireport:From')}
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
                                {t('orderslireport:To')}
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
                                {t('orderslireport:Channel')}
                            </span>
                        </div>
                        <Autocomplete
                            multiple
                            mode="lazy"
                            name="channel_codes"
                            className={classes.autocompleteRoot}
                            value={(formik.values.channel_codes)}
                            onChange={(e) => formik.setFieldValue('channel_codes', e)}
                            options={getChannelListRes.data?.getChannelList?.items || []}
                            getOptions={getChannelList}
                            getOptionsVariables={{
                                variables: {
                                    pageSize: null,
                                    currentPage: 1,
                                },
                            }}
                            error={!!(formik.touched.channel_codes && formik.errors.channel_codes)}
                            helperText={(formik.touched.channel_codes && formik.errors.channel_codes) || ''}
                            primaryKey="channel_code"
                            labelKey="channel_name"
                        />
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        {t('orderslireport:Show_Report')}
                    </Button>
                </div>
            </Paper>
            <div className={classes.tableContainer}>
                <Table
                    rows={rows}
                    loading={getOrderSliReportRes.loading}
                    columns={columns}
                    hideActions
                    hideFilters
                    hideFooter
                    wrapHeader
                />
                <div className={classes.tableFooter}>{`*${t('orderslireport:Avg_Time_Format_HHMMSS')}`}</div>
            </div>
        </>
    );
};

export default OrderReportCreateContent;
