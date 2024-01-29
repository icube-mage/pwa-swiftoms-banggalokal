/* eslint-disable */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';

import Button from '@common_button';
import Table from '@common_tableseller';
import Tabs from '@common_tabsseller';

import { breakPointsUp } from '@helper_theme';
import MobileList from '@sellermodules/storelist/pages/list/components/MobileList';
import RowAction from '@sellermodules/storelist/pages/list/components/RowAction';
import ConfirmModal from '@sellermodules/storelist/pages/list/components/ConfirmModal';
import useStyles from '@sellermodules/storelist/pages/list/components/style';
import gqlService from '@sellermodules/storeintegration/services/graphql';

const StoreListContent = (props) => {
    const { data, loading, getSellerChannelList, t, updateConnectedSellerMpRes, setOpenDialog,
        getSellerMarketplaceIntegrationRequestList, dataRequest, loadingRequest, reIntegrate, setCurrentBrandId,
        isEnableChat,
    } = props;

    const router = useRouter();
    const classes = useStyles();
    const isDesktop = breakPointsUp('sm');

    const [mpUpdate, setMpUpdate] = useState([]);
    const [load, setLoad] = useState(false);
    const [isCancelRequest, setIsCancelRequest] = useState(false);

    const dataTabs = [
        { label: t('sellerstorelist:Marketplace_Store'), value: 0 },
        { label: t('sellerstorelist:Help_State'), value: 'help' },
    ];

    const { data: getWebstoreConfig } = gqlService.getWebstoreConfiguration();

    const getCoreDomain = () => {
        const [filterConfig] = getWebstoreConfig?.getWebstoreConfiguration[0]?.fields?.filter((e) => e.id === 'webstore_multitenant/general/url') || [];
        const filterResult = filterConfig?.value || '';
        const domainName = filterResult.replace(/^(https?:\/\/)?/, '');
        return domainName;
    };

    const onChangeTab = async (e, v) => {
        setLoad(true);
        const value = v === 0 ? '' : `/${v}`;
        await router.replace(`/seller/saleschannels/storelist${value}`, undefined, { shallow: v !== 'help' });
        setLoad(false);
    };

    const handleUpdateMp = (item) => {
        if (item) {
            const { marketplace_status, channel_code } = item;
            if (updateConnectedSellerMpRes.called && !updateConnectedSellerMpRes.loading && !updateConnectedSellerMpRes.error) {
                if (mpUpdate.length && mpUpdate.includes(channel_code)) {
                    return 1;
                }
                return null;
            }
            return marketplace_status;
        }
        return null;
    };

    const storeList = (data && data.getSellerChannelList && data.getSellerChannelList.items) || [];
    const storeTotal = (data && data.getSellerChannelList && data.getSellerChannelList.total_count) || 0;

    const requestList = (dataRequest && dataRequest.getSellerMarketplaceIntegrationRequestList
        && dataRequest.getSellerMarketplaceIntegrationRequestList.items) || [];
    const requestTotal = (dataRequest && dataRequest.getSellerMarketplaceIntegrationRequestList
        && dataRequest.getSellerMarketplaceIntegrationRequestList.total_count) || 0;

    const columns = [
        { field: 'id', headerName: 'ID', hidden: true },
        { field: 'channel_name', headerName: t('sellerstorelist:Store_Name'), sortable: true, hideable: true },
        { field: 'marketplace_status_label', headerName: t('sellerstorelist:Store_Status'), sortable: true, hideable: true },
        { field: 'integrated_at', headerName: t('sellerstorelist:Authorization_Time'), sortable: true, hideable: true },
        { field: 'actions', headerName: 'Actions' },
    ];

    const filters = [];

    const rows = storeList.map((store) => ({
        ...store,
        id: store.channel_id,
        name: store.channel_name,
        channel_name: () => {
            const logo = store?.marketplace_code?.toLowerCase() === 'shopify' ? '/assets/img/shopify.png' : store.image_url;
            return (
                <div className={classes.channelDiv}>
                    <div
                        className={classes.channelContainer}
                        style={{ backgroundImage: `url(${logo || '/assets/img/placeholder_image.jpg'})` }}
                    />
                    {store.channel_name}
                    { store.marketplace_chat_status === 1 && handleUpdateMp(store) && <span className={classes.activeBadge}>Chat Active</span> }
                </div>
            );
        },
        marketplace_status_icon: (store.marketplace_status === null ? null
            : (
                <div className={classes.status}>
                    {handleUpdateMp(store) ? <CheckCircleIcon className="icon check" /> : <CancelIcon className="icon cancel" />}
                </div>
            )
        ),
        marketplace_status_label: () => {
            if (store.marketplace_status !== null) {
                return (
                    <div className={classes.status}>
                        {handleUpdateMp(store) ? <CheckCircleIcon className="icon check" /> : <CancelIcon className="icon cancel" />}
                        {store.marketplace_status_label ? handleUpdateMp(store)
                            ? t('sellerstorelist:Connected') : t('sellerstorelist:Disconnected')
                            : '-'}
                    </div>
                );
            } if (store.marketplace_status === null && store.webstore_status !== null) {
                return (
                    <div className={classes.status}>
                        {store.webstore_status ? <CheckCircleIcon className="icon check" /> : <RemoveCircleIcon className="icon pending" />}
                        {store.webstore_status ? t('sellerstorelist:Connected') : t('pending')}
                    </div>
                );
            }

            return '-';
        },
        actions: () => {
            let menuAction = false;
            if (store.marketplace_status !== null) {
                menuAction = [
                    {
                        label: t(`sellerstorelist:${handleUpdateMp(store) ? 'Disconnect_Integration' : 'Reintegrate'}`),
                        action: () => {
                            if (handleUpdateMp(store)) {
                                setOpenDialog(store);
                            } else {
                                setCurrentBrandId(store?.brand_id);
                                reIntegrate(store?.marketplace_code?.toLowerCase(), store?.brand_id);
                            }
                        },
                    },
                    {
                        label: t('sellerstorelist:Manage_Location'),
                        action: () => router.push(
                            `/seller/saleschannels/storelist/managelocation/channel?id=${store.channel_id}&code=${store.channel_code}`,
                        ),
                    },
                ];
            } else if (store.marketplace_status === null && store.webstore_status !== null) {
                let storeCode = store.channel_code.split('_');
                storeCode = storeCode[0] || store.channel_code;

                menuAction = [
                    {
                        label: t('sellerstorelist:manage_store'),
                        action: () => router.push(`/seller/saleschannels/managestore/${storeCode}`),
                    },
                    {
                        label: t('sellerstorelist:view_store'),
                        action: () => {
                            window.open(`https://${storeCode}.${getCoreDomain()}`, '_blank');
                        },
                    },
                    {
                        label: t('sellerstorelist:Manage_Location'),
                        action: () => router.push(
                            `/seller/saleschannels/storelist/managelocation/channel?id=${store.channel_id}&code=${store.channel_code}`,
                        ),
                    },
                ];
            }
            return menuAction !== false && <RowAction data={store} menuAction={menuAction} t={t} />;
        },
    }));

    const helpColumns = [
        { field: 'id', headerName: 'ID', hidden: true },
        { field: 'url_marketplace', headerName: t('sellerstorelist:Store_Link'), hideable: true },
        { field: 'status', headerName: t('sellerstorelist:Store_Status'), sortable: true, hideable: true },
        { field: 'created_at', headerName: t('sellerstorelist:Integration_Time'), sortable: true, hideable: true },
        { field: 'email', headerName: t('sellerstorelist:Email') },
        { field: 'actions', headerName: 'Actions' },
    ];

    const helpRows = requestList.map((req) => ({
        ...req,
        id: req.entity_id,
        url: req.url_marketplace,
        image_url: req.marketplace_data?.image_url,
        url_marketplace: (
            <div className={classes.channelDiv}>
                <div
                    className={classes.channelContainer}
                    style={{ backgroundImage: `url(${req.marketplace_data?.image_url || '/assets/img/placeholder_image.jpg'})` }}
                />
                {req.url_marketplace || '-'}
            </div>
        ),
        status_icon: () => {
            const icon = {
                pending: <RemoveCircleIcon className="icon pending" />,
                processing: <RemoveCircleIcon className="icon pending" />,
                complete: <CheckCircleIcon className="icon check" />,
                cancel: <CancelIcon className="icon cancel" />,
            };
            return (req.marketplace_status === null ? null
                : (
                    <div className={classes.status}>
                        {icon[req.status]}
                    </div>
                )
            );
        },
        status: () => {
            const icon = {
                pending: <RemoveCircleIcon className="icon pending" />,
                processing: <RemoveCircleIcon className="icon pending" />,
                complete: <CheckCircleIcon className="icon check" />,
                cancel: <CancelIcon className="icon cancel" />,
            };
            return (req.marketplace_status === null ? null
                : (
                    <div className={classes.status}>
                        {icon[req.status]}
                        {req.status}
                    </div>
                )
            );
        },
        actions: () => {
            if (req.status === 'pending') {
                const menuAction = [
                    {
                        label: t('sellerstorelist:Cancel_Request'),
                        action: () => {
                            setOpenDialog(req);
                            setIsCancelRequest(true);
                        },
                    },
                ];
                return <RowAction data={req} menuAction={menuAction} t={t} />;
            }
            return null;
        },
    }));

    useEffect(() => {
        if (updateConnectedSellerMpRes.data) {
            setMpUpdate(updateConnectedSellerMpRes.data.updateConnectedSellerMp.channel_code);
        }
    }, [updateConnectedSellerMpRes.data]);

    return (
        <div className={classes.container}>
            <div className={classes.headerContainer}>
                <div className={classes.header}>{t('sellerstorelist:Store_List')}</div>
                <Button
                    className={classes.btnAdd}
                    onClick={() => router.push('/seller/saleschannels/storeintegration')}
                    startIcon={<AddIcon />}
                >
                    {t('sellerstorelist:Add_Store')}
                </Button>
            </div>

            <div className={classes.tabsContainer}>
                <Tabs data={dataTabs} onChange={onChangeTab} value={router.query.framework || 0} allItems={false} noBorder />
            </div>
            {load ? (
                <div className={classes.circular}>
                    <CircularProgress size={80} />
                </div>
            )
                : router.query.framework === 'help' ? (isDesktop
                    ? (
                        <Table
                            hideFilters
                            hideHead
                            dataTab={dataTabs}
                            loading={loadingRequest}
                            columns={helpColumns}
                            getRows={getSellerMarketplaceIntegrationRequestList}
                            rows={helpRows}
                            count={requestTotal}
                            hideSearch
                            hideToolbar
                        />
                    )
                    : (
                        <MobileList
                            {...props}
                            dataTab={dataTabs}
                            loading={loadingRequest}
                            columns={helpColumns}
                            getRows={getSellerMarketplaceIntegrationRequestList}
                            rows={helpRows}
                            count={requestTotal}
                            help
                        />
                    )
                )
                    : (isDesktop
                        ? (
                            <Table
                                hideFilters
                                hideHead
                                dataTab={dataTabs}
                                loading={loading}
                                filters={filters}
                                columns={columns}
                                getRows={getSellerChannelList}
                                rows={rows}
                                count={storeTotal}
                                hideSearch
                                hideToolbar
                            />
                        )
                        : (
                            <MobileList
                                {...props}
                                dataTab={dataTabs}
                                loading={loading}
                                filters={filters}
                                columns={columns}
                                getRows={getSellerChannelList}
                                rows={rows}
                                count={storeTotal}
                                handleUpdateMp={handleUpdateMp}
                            />
                        )
                    )}
            <ConfirmModal isCancelRequest={isCancelRequest} {...props} />
        </div>
    );
};

export default StoreListContent;
