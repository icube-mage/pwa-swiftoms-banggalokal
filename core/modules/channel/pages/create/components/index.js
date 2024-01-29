/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Autocomplete from '@common_autocomplete';
import channelGqlService from '@modules/channel/services/graphql';
import { optionsYesNo } from '@modules/channel/helpers';
import clsx from 'clsx';
import useStyles from '@modules/channel/pages/create/components/style';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';

import Switch from '@common_switch';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const ChannelCreateContent = (props) => {
    const { formik, t, configSeller } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getVirtualStockList, getVirtualStockListRes] = channelGqlService.getVirtualStockList();
    const [getReleaseStockOptions, getReleaseStockOptionsRes] = channelGqlService.getReleaseStockOptions();
    const [getChannelFrameworkOptions, getChannelFrameworkOptionsRes] = channelGqlService.getChannelFrameworkOptions();
    const [getChannelRuleTypeOptions, getChannelRuleTypeOptionsRes] = channelGqlService.getChannelRuleTypeOptions();

    const [virtualStockOptions, setVirtualStockOptions] = useState([]);
    const [searchVirtualStock, setSearchVirtualStock] = useState('');

    React.useEffect(() => {
        const onChangeTimeOut = setTimeout(() => {
            const isExist = searchVirtualStock && virtualStockOptions.filter((elm) => elm?.vs_name?.toLowerCase().includes(searchVirtualStock?.toLowerCase()));
            if (searchVirtualStock && isExist.length === 0) {
                getVirtualStockList({
                    variables: {
                        filter: {
                            vs_name: {
                                like: searchVirtualStock,
                            },
                        },
                        pageSize: 20,
                        currentPage: 1,
                    },
                });
            }

            return null;
        }, 500);

        return () => clearTimeout(onChangeTimeOut);
    }, [searchVirtualStock]);

    React.useEffect(() => {
        if (
            getVirtualStockListRes
            && getVirtualStockListRes.data
            && getVirtualStockListRes.data.getVirtualStockList
            && getVirtualStockListRes.data.getVirtualStockList.items
        ) {
            const names = new Set(virtualStockOptions.map((d) => d.vs_name));
            setVirtualStockOptions([
                ...virtualStockOptions,
                ...getVirtualStockListRes.data.getVirtualStockList.items.filter((d) => !names.has(d.vs_name)),
            ]);
        }
    }, [getVirtualStockListRes.data]);

    return (
        <>
            <Button className={classes.btnBack} onClick={() => router.push('/oms/channel')} variant="contained" style={{ marginRight: 16 }}>
                <ChevronLeftIcon
                    style={{
                        fontSize: 30,
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            </Button>
            <h2 className={classes.titleTop}>{t('channel:Create_Sales_Channel')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h2 className={classes.title}>{t('channel:General_Information')}</h2>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={[classes.label, classes.labelRequired].join(' ')}>{t('channel:Channel_Code')}</span>
                        </div>
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
                        />
                        <div className={classes.tooltip}>
                            <Tooltip
                                title={t('channel:Code_for_sales_channel_You_can_use_an_initial_name_as_code_or_anything_else')}
                                placement="top"
                                arrow
                                classes={{ tooltip: classes.tooltipWidth }}
                            >
                                <IconButton aria-label="help">
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={[classes.label, classes.labelRequired].join(' ')}>{t('channel:Channel_Name')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.name && formik.errors.name)}
                            helperText={(formik.touched.name && formik.errors.name) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                        <div className={classes.tooltip}>
                            <Tooltip
                                title={t('channel:Sales_channel_full_name_can_include_marketplace_or_website_name')}
                                placement="top"
                                arrow
                                classes={{ tooltip: classes.tooltipWidth }}
                            >
                                <IconButton aria-label="help">
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('channel:Notes')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="notes"
                            value={formik.values.notes}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.notes && formik.errors.notes)}
                            helperText={(formik.touched.notes && formik.errors.notes) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('channel:Channel_Url')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="url"
                            value={formik.values.url}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.url && formik.errors.url)}
                            helperText={(formik.touched.url && formik.errors.url) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                        <div className={classes.tooltip}>
                            <Tooltip
                                title={t('channel:URL_for_website_or_marketplace_store')}
                                placement="top"
                                arrow
                                classes={{ tooltip: classes.tooltipWidth }}
                            >
                                <IconButton aria-label="help">
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('channel:Access_Token')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="token"
                            value={formik.values.token}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.token && formik.errors.token)}
                            helperText={(formik.touched.token && formik.errors.token) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                        <div className={classes.tooltip}>
                            <Tooltip
                                title={t('channel:Token_to_access_channels_API')}
                                placement="top"
                                arrow
                                classes={{ tooltip: classes.tooltipWidth }}
                            >
                                <IconButton aria-label="help">
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('channel:End_Point')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="endPoint"
                            value={formik.values.endPoint}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.endPoint && formik.errors.endPoint)}
                            helperText={(formik.touched.endPoint && formik.errors.endPoint) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('channel:Delta_Stock_Url')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="deltaStock"
                            value={formik.values.deltaStock}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.deltaStock && formik.errors.deltaStock)}
                            helperText={(formik.touched.deltaStock && formik.errors.deltaStock) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={[classes.label, classes.labelRequired].join(' ')}>{t('channel:Framework')}</span>
                        </div>
                        <Autocomplete
                            mode="lazy"
                            className={classes.autocompleteRoot}
                            value={formik.values.framework}
                            onChange={(e) => formik.setFieldValue('framework', e)}
                            loading={getChannelFrameworkOptionsRes.loading}
                            options={
                                getChannelFrameworkOptionsRes
                                && getChannelFrameworkOptionsRes.data
                                && getChannelFrameworkOptionsRes.data.getChannelFrameworkOptions
                                && getChannelFrameworkOptionsRes.data.getChannelFrameworkOptions.filter((e) => e.value !== 'Marketplace')
                            }
                            getOptions={getChannelFrameworkOptions}
                            error={!!(formik.touched.framework && formik.errors.framework)}
                            helperText={(formik.touched.framework && formik.errors.framework) || ''}
                            primaryKey="value"
                            labelKey="label"
                        />
                        <div className={classes.tooltip}>
                            <Tooltip
                                title={t('channel:Software_platform_used_by_sales_channels')}
                                placement="top"
                                arrow
                                classes={{ tooltip: classes.tooltipWidth }}
                            >
                                <IconButton aria-label="help">
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={[classes.label, classes.labelRequired].join(' ')}>{t('channel:Rule_Type')}</span>
                        </div>
                        <Autocomplete
                            mode="lazy"
                            className={classes.autocompleteRoot}
                            value={formik.values.type}
                            onChange={(e) => formik.setFieldValue('type', e)}
                            loading={getChannelRuleTypeOptionsRes.loading}
                            options={
                                getChannelRuleTypeOptionsRes
                                && getChannelRuleTypeOptionsRes.data
                                && getChannelRuleTypeOptionsRes.data.getChannelRuleTypeOptions
                            }
                            getOptions={getChannelRuleTypeOptions}
                            error={!!(formik.touched.type && formik.errors.type)}
                            helperText={(formik.touched.type && formik.errors.type) || ''}
                            primaryKey="value"
                            labelKey="label"
                        />
                        <div className={classes.tooltip}>
                            <Tooltip
                                title={t('channel:Allocation_rules_algorithm_for_routing_order_or_fulfillment_order_into_a_specific_location')}
                                placement="top"
                                arrow
                                classes={{ tooltip: classes.tooltipWidth }}
                            >
                                <IconButton aria-label="help">
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('channel:Virtual_Stock')}</span>
                        </div>
                        <Autocomplete
                            className={clsx(classes.autocompleteRoot, classes.autocompleteMulti)}
                            mode="lazy"
                            multiple
                            value={formik.values.virtualStock}
                            onChange={(e) => formik.setFieldValue('virtualStock', e)}
                            loading={getVirtualStockListRes.loading}
                            options={virtualStockOptions}
                            getOptions={getVirtualStockList}
                            primaryKey="vs_id"
                            labelKey="vs_name"
                            onInputChange={(e) => setSearchVirtualStock(e && e.target && e.target.value)}
                        />
                        <div className={classes.tooltip}>
                            <Tooltip
                                title={t('channel:Virtual_stock_to_use_for_the_channel_Only_one_virtual_stock_is_allowed_to_be_assigned')}
                                placement="top"
                                arrow
                                classes={{ tooltip: classes.tooltipWidth }}
                            >
                                <IconButton aria-label="help">
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('channel:Auto_Confirm_Shipment')}</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            value={formik.values.auto_confirm_shipment}
                            onChange={(e) => formik.setFieldValue('auto_confirm_shipment', e)}
                            options={optionsYesNo}
                            error={!!(formik.touched.auto_confirm_shipment && formik.errors.auto_confirm_shipment)}
                            helperText={(formik.touched.auto_confirm_shipment && formik.errors.auto_confirm_shipment) || ''}
                            primaryKey="id"
                            labelKey="name"
                        />
                        <div className={classes.tooltip}>
                            <Tooltip
                                title={t('channel:Choose_Yes_to_activate_autoconfirm_for_order_shipment_or_choose_No_to_not_activate')}
                                placement="top"
                                arrow
                                classes={{ tooltip: classes.tooltipWidth }}
                            >
                                <IconButton aria-label="help">
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('channel:Split_Shipment_Capability')}</span>
                        </div>
                        <RadioGroup
                            className={classes.radioGroup}
                            name="split_shipment_capability"
                            value={formik.values.split_shipment_capability}
                            onChange={formik.handleChange}
                        >
                            <FormControlLabel value="one_store_priority_only" label={t('channel:One_Store_Priority_Only')} control={<Radio />} />
                            <FormControlLabel value="split_shipment_with_one_store_priority_first" label={t('channel:Split_Shipment_With_One_Store_Priority_First')} control={<Radio />} />
                            <FormControlLabel value="split_shipment" label={t('channel:Split_Shipment')} control={<Radio />} />
                        </RadioGroup>
                        <div className={classes.tooltip}>
                            <Tooltip
                                title={(
                                    <div style={{ whiteSpace: 'pre-line' }}>
                                        {t('channel:\"One_Store_Priority_Only\"_means_allocate_to_one_store_only_if_not_available_mark_order_as_Failed__Allocation_not_found')}
                                        <br />
                                        <br />
                                        {t('channel:\"Split_Shipment_if_One_Store_Not_Available\"_means_allocate_to_one_store_that_can_fulfill_all_items_if_not_available_allocate_to_more_than_one_store')}
                                        <br />
                                        <br />
                                        {t('channel:\"Split_Shipment\"_means_order_can_be_allocate_to_more_than_one_store')}
                                    </div>
                                )}
                                placement="top"
                                arrow
                                classes={{ tooltip: classes.tooltipWidth }}
                            >
                                <IconButton aria-label="help">
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('channel:Release_Stock')}</span>
                        </div>
                        <Autocomplete
                            className={clsx(classes.autocompleteRoot, classes.autocompleteMulti)}
                            mode="lazy"
                            multiple
                            value={formik.values.release_stock}
                            onChange={(e) => formik.setFieldValue('release_stock', e)}
                            loading={getReleaseStockOptionsRes.loading}
                            options={getReleaseStockOptionsRes && getReleaseStockOptionsRes.data && getReleaseStockOptionsRes.data.getReleaseStockOptions}
                            getOptions={getReleaseStockOptions}
                            primaryKey="value"
                            labelKey="label"
                        />
                        <div className={classes.tooltip}>
                            <Tooltip
                                title={t('channel:Choose_when_the_reserved_qty_is_returned_to_the_total_qty_because_the_order_is_completedcanceled')}
                                placement="top"
                                arrow
                                classes={{ tooltip: classes.tooltipWidth }}
                            >
                                <IconButton aria-label="help">
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('channel:Send_Shipment')}</span>
                        </div>
                        <Autocomplete
                            className={clsx(classes.autocompleteRoot, classes.autocompleteMulti)}
                            mode="lazy"
                            multiple
                            value={formik.values.sendShipment}
                            onChange={(e) => formik.setFieldValue('sendShipment', e)}
                            loading={getReleaseStockOptionsRes.loading}
                            options={getReleaseStockOptionsRes && getReleaseStockOptionsRes.data && getReleaseStockOptionsRes.data.getReleaseStockOptions}
                            getOptions={getReleaseStockOptions}
                            primaryKey="value"
                            labelKey="label"
                        />
                        <div className={classes.tooltip}>
                            <Tooltip
                                title={t('channel:Choose_when_the_order_status_changes_to_shipping')}
                                placement="top"
                                arrow
                                classes={{ tooltip: classes.tooltipWidth }}
                            >
                                <IconButton aria-label="help">
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('channel:Auto_Order_Reallocation')}</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            value={formik.values.autoOrderReallocation}
                            onChange={(e) => formik.setFieldValue('autoOrderReallocation', e)}
                            options={optionsYesNo}
                            error={!!(formik.touched.autoOrderReallocation && formik.errors.autoOrderReallocation)}
                            helperText={(formik.touched.autoOrderReallocation && formik.errors.autoOrderReallocation) || ''}
                            primaryKey="id"
                            labelKey="name"
                        />
                        <div className={classes.tooltip}>
                            <Tooltip
                                title={t('channel:Choose_Yes_to_activate_autoorder_reallocation_or_choose_No_to_not_activate')}
                                placement="top"
                                arrow
                                classes={{ tooltip: classes.tooltipWidth }}
                            >
                                <IconButton aria-label="help">
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('channel:Auto_Create_Product_On_Order_Allocation')}</span>
                        </div>
                        <Switch
                            id="is_auto_create_product"
                            name="is_auto_create_product"
                            value={formik.values.is_auto_create_product}
                            onChange={formik.handleChange}
                        />
                        <div className={classes.tooltip}>
                            <Tooltip
                                title={t('channel:Select_Yes_to_auto_create_unregistered_product_on_order_allocation')}
                                placement="top"
                                arrow
                                classes={{ tooltip: classes.tooltipWidth }}
                            >
                                <IconButton aria-label="help">
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('channel:Use_Customer_Review')}</span>
                        </div>
                        <Switch
                            id="use_customer_review"
                            name="use_customer_review"
                            value={formik.values.use_customer_review}
                            onChange={formik.handleChange}
                        />
                        <div className={classes.tooltip}>
                            <Tooltip
                                title={t('channel:This_setting_is_one_of_the_parameters_that_can_changes_shipment_status_to_\"Delivered\"_Set_Yes_to_mark_shipment_as_Delivered_after_the_Customer_Review')}
                                placement="top"
                                arrow
                                classes={{ tooltip: classes.tooltipWidth }}
                            >
                                <IconButton aria-label="help">
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    {configSeller
                        && (
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('channel:Multiseller_Channel')}</span>
                                </div>
                                <Switch
                                    id="is_multiseller"
                                    name="is_multiseller"
                                    value={formik.values.is_multiseller}
                                    onChange={formik.handleChange}
                                />
                                <div className={classes.tooltip}>
                                    <Tooltip
                                        title={t("channel:Seller's_store_location_will_be_assigned_to_Multiseller_Channel_automatically")}
                                        placement="top"
                                        arrow
                                        classes={{ tooltip: classes.tooltipWidth }}
                                    >
                                        <IconButton aria-label="help">
                                            <HelpIcon />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </div>
                        )}
                </div>
                <div className={classes.content}>
                    <h2 className={classes.title}>{t('channel:Shipment_Webhook')}</h2>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('channel:Callback_URL_on_Shipment_Complete')}</span>
                        </div>
                        <div className={clsx(classes.fieldRoot, classes.fieldRootDesc)} style={{ display: 'inline-block' }}>
                            <TextField
                                style={{ width: '100%' }}
                                variant="outlined"
                                name="shipment"
                                value={formik.values.shipment}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.shipment && formik.errors.shipment)}
                                helperText={(formik.touched.shipment && formik.errors.shipment) || ''}
                                InputProps={{
                                    className: classes.fieldInput,
                                }}
                            />
                            <span className={classes.notes}>{t('channel:Triggered_when_all_shipments_of_an_order_are_picked_up_or_shipped_or_delivered_Please_fill_without_base_url_ex_omswebhookorder')}</span>
                        </div>
                        <div className={classes.tooltip}>
                            <Tooltip
                                title={t('channel:Callback_URL_when_all_shipments_of_an_order_are_picked_up_or_shipped_or_delivered')}
                                placement="top"
                                arrow
                                classes={{ tooltip: classes.tooltipWidth }}
                            >
                                <IconButton aria-label="help">
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('channel:Callback_URL_on_Invoice')}</span>
                        </div>
                        <div className={clsx(classes.fieldRoot, classes.fieldRootDesc)} style={{ display: 'inline-block' }}>
                            <TextField
                                style={{ width: '100%' }}
                                variant="outlined"
                                name="invoice"
                                value={formik.values.invoice}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.invoice && formik.errors.invoice)}
                                helperText={(formik.touched.invoice && formik.errors.invoice) || ''}
                                InputProps={{
                                    className: classes.fieldInput,
                                }}
                            />
                            <span className={classes.notes}>{t('channel:Please_fill_without_base_url_ex_omswebhookorder')}</span>
                        </div>
                        <div className={classes.tooltip}>
                            <Tooltip
                                title={t('channel:Callback_URL_if_the_invoice_has_been_created')}
                                placement="top"
                                arrow
                                classes={{ tooltip: classes.tooltipWidth }}
                            >
                                <IconButton aria-label="help">
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <div className={classes.content}>
                    <h2 className={classes.title}>{t('channel:Rma_Webhook')}</h2>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('channel:Callback_URL_on_Refund')}</span>
                        </div>
                        <div className={clsx(classes.fieldRoot, classes.fieldRootDesc)} style={{ display: 'inline-block' }}>
                            <TextField
                                style={{ width: '100%' }}
                                variant="outlined"
                                name="refund"
                                value={formik.values.refund}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.refund && formik.errors.refund)}
                                helperText={(formik.touched.refund && formik.errors.refund) || ''}
                                InputProps={{
                                    className: classes.fieldInput,
                                }}
                            />
                            <span className={classes.notes}>{t('channel:Please_fill_without_base_url_ex_omswebhookorder')}</span>
                        </div>
                        <div className={classes.tooltip}>
                            <Tooltip
                                title={t('channel:Callback_URL_for_refund_request')}
                                placement="top"
                                arrow
                                classes={{ tooltip: classes.tooltipWidth }}
                            >
                                <IconButton aria-label="help">
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <div className={classes.content}>
                    <h2 className={classes.title}>{t('channel:Creditmemo_Webhook')}</h2>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('channel:Callback_URL_on_Creditmemo')}</span>
                        </div>
                        <div className={clsx(classes.fieldRoot, classes.fieldRootDesc)} style={{ display: 'inline-block' }}>
                            <TextField
                                style={{ width: '100%' }}
                                variant="outlined"
                                name="creditmemo"
                                value={formik.values.creditmemo}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.creditmemo && formik.errors.creditmemo)}
                                helperText={(formik.touched.creditmemo && formik.errors.creditmemo) || ''}
                                InputProps={{
                                    className: classes.fieldInput,
                                }}
                            />
                            <span className={classes.notes}>{t('channel:Please_fill_without_base_url_ex_omswebhookorder')}</span>
                        </div>
                        <div className={classes.tooltip}>
                            <Tooltip
                                title={t('channel:Callback_URL_if_the_credit_memo_is_issued')}
                                placement="top"
                                arrow
                                classes={{ tooltip: classes.tooltipWidth }}
                            >
                                <IconButton aria-label="help">
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained">
                        {t('channel:Submit')}
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default ChannelCreateContent;
