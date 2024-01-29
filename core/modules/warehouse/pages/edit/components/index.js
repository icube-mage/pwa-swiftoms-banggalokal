/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import Autocomplete from '@common_autocomplete';
import channelGqlService from '@modules/channel/services/graphql';
import gqlService from '@modules/warehouse/services/graphql';
import clsx from 'clsx';
import useStyles from '@modules/warehouse/pages/edit/components/style';

const WarehouseEditContent = (props) => {
    const {
        formik,
        t,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getChannelList, getChannelListRes] = channelGqlService.getChannelList();
    const [getMarketplaceWarehouse, getMarketplaceWarehouseRes] = gqlService.getMarketplaceWarehouse();
    const [getChannelById, getChannelByIdRes] = gqlService.getChannelById();

    const warehouseOptions = (getMarketplaceWarehouseRes && getMarketplaceWarehouseRes.data
        && getMarketplaceWarehouseRes.data.getMarketplaceWarehouse) || [];

    React.useEffect(() => {
        getMarketplaceWarehouse({
            variables: {
                channel_code: formik.values.channel && formik.values.channel.channel_code,
            },
        });
    }, []);
    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/marketplace/warehouse')}
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
            <h2 className={classes.titleTop}>{t('warehouse:Edit_Marketplace_Warehouse')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('warehouse:Channel')}</span>
                        </div>
                        <Autocomplete
                            className={clsx(classes.autocompleteRoot, classes.labelRequired)}
                            mode="lazy"
                            value={formik.values.channel}
                            onChange={(e) => {
                                formik.setFieldValue('channel', e);
                                formik.setFieldValue('marketplace', '');
                                formik.setFieldValue('location', '');
                            }}
                            loading={getChannelListRes.loading}
                            options={
                                getChannelListRes
                                && getChannelListRes.data
                                && getChannelListRes.data.getChannelList
                                && getChannelListRes.data.getChannelList.items
                            }
                            getOptions={getChannelList}
                            getOptionsVariables={
                                {
                                    variables: {
                                        filter: {
                                            framework: { in: 'marketplace' },
                                        },
                                        pageSize: 0,
                                        currentPage: 1,
                                    },
                                }
                            }
                            primaryKey="channel_code"
                            labelKey="channel_name"
                            error={!!(formik.touched.channel && formik.errors.channel)}
                            helperText={(formik.touched.channel && formik.errors.channel) || ''}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('warehouse:Marketplace_Warehouse_ID')}</span>
                        </div>
                        <Autocomplete
                            disabled={!(formik.values.channel && formik.values.channel.channel_code)}
                            className={clsx(classes.autocompleteRoot, classes.labelRequired)}
                            mode="lazy"
                            value={warehouseOptions.find((o) => o.id === formik.values.marketplace) || formik.values.marketplace}
                            onChange={(e) => formik.setFieldValue('marketplace', e && e.id)}
                            loading={getMarketplaceWarehouseRes.loading}
                            options={warehouseOptions}
                            getOptions={getMarketplaceWarehouse}
                            getOptionsVariables={
                                {
                                    variables: {
                                        channel_code: formik.values.channel && formik.values.channel.channel_code,
                                    },
                                }
                            }
                            primaryKey="id"
                            labelKey="name"
                            error={!!(formik.touched.marketplace && formik.errors.marketplace)}
                            helperText={(formik.touched.marketplace && formik.errors.marketplace) || ''}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('warehouse:Location')}</span>
                        </div>
                        <Autocomplete
                            disabled={!(formik.values.channel && formik.values.channel.channel_id)}
                            className={clsx(classes.autocompleteRoot, classes.autocompleteMulti)}
                            mode="lazy"
                            value={formik.values.location}
                            onChange={(e) => formik.setFieldValue('location', e)}
                            loading={getChannelByIdRes.loading}
                            options={
                                getChannelByIdRes
                                && getChannelByIdRes.data
                                && getChannelByIdRes.data.getChannelById
                                && getChannelByIdRes.data.getChannelById.locations
                            }
                            getOptions={getChannelById}
                            getOptionsVariables={
                                {
                                    variables: {
                                        id: formik.values.channel && formik.values.channel.channel_id,
                                    },
                                }
                            }
                            primaryKey="loc_id"
                            labelKey="loc_name"
                            error={!!(formik.touched.location && formik.errors.location)}
                            helperText={(formik.touched.location && formik.errors.location) || ''}
                        />
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        {t('warehouse:Submit')}
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default WarehouseEditContent;
