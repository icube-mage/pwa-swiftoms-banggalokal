/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable max-len */
import React from 'react';
import { sendDataLayer } from '@helper_gtm';
import ItemChannel from '@modules/seller/catalog/pages/list/components/ItemChannel/index';
import gqlService from '@sellermodules/catalog/services/graphql/index';

const intervalTimer = 5000;

const CatalogChannelSync = (props) => {
    const { t, classes, refresh } = props;
    const { data: dataListChannel, loading: loadingListChannel } = gqlService.getSellerChannelListFetchProduct();
    const [onPullSellerProduct] = gqlService.pullSellerProduct();
    const [channels, setChannels] = React.useState(null);
    const [getActivityChannelItem, { loading: loadingActivityChannel }] = gqlService.getActivityItemChannel();
    const intervalRef = React.useRef(null);
    const mount = React.useRef(null);

    const dataListSellerChannel = dataListChannel?.getSellerChannelList?.items ?? [];
    const isEmptyChannel = !loadingListChannel && channels?.length < 1;
    const isFillChannel = !loadingListChannel && channels?.length > 0;
    const isLoadingChannel = (loadingListChannel || loadingActivityChannel) && channels == null;

    const getChannelListData = async () => {
        if (dataListSellerChannel?.length < 1) {
            setChannels([]);
        } else {
            const tempChannelArr = [];
            for (const listSellerChannelIndex in dataListSellerChannel) {
                const listSellerChannelItem = dataListSellerChannel[listSellerChannelIndex];
                const channel_id = listSellerChannelItem?.channel_id;
                const channelItem = await getActivityChannelItem({
                    variables: {
                        activity_code: `pull_seller_product_${channel_id}`,
                    },
                });

                const getActivity = channelItem?.data?.getActivity;
                const getSnapshot = getActivity?.snapshot_at ?? '';
                const getDataProceed = getActivity?.data_processed ?? '';
                const getDataTotal = getActivity?.data_total ?? '';
                const isStatusFinished = getActivity?.run_status === 'finished' || !getActivity?.run_status;
                const isLoading = !isStatusFinished;
                tempChannelArr.push({
                    channel_id,
                    channel_name: listSellerChannelItem?.channel_name,
                    image_url: listSellerChannelItem?.image_url,
                    loading: isLoading,
                    product_process: getDataProceed,
                    product_total: getDataTotal,
                    product_last_sync: getSnapshot,
                    activity: getActivity,
                });
            }
            const filter = tempChannelArr.filter((itemFilter) => itemFilter.loading);
            setChannels(tempChannelArr);
            const isAllFinished = filter.length < 1;
            if (isAllFinished) {
                clearTimeout(intervalRef.current);
            }
        }
    };

    const onStartInverval = () => {
        intervalRef.current = setInterval(() => {
            getChannelListData();
        }, intervalTimer);
    };

    const onPullSingleChannel = async (itemChannel) => {
        try {
            await onPullSellerProduct({
                variables: {
                    channel_id: [itemChannel.channel_id],
                },
            });
            await getChannelListData();
            onStartInverval();
            window.toastMessage({
                open: true,
                text: t('common:sync_process_spesific', { channel: itemChannel.channel_name }),
                variant: 'success',
            });
            refresh.setRefresh(false);
        } catch (e) {
            console.log('[err] pull single channel', e);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        }
    };

    const sendToGTM = (item) => {
        const dataLayer = {
            event: 'pull_product',
            eventLabel: 'Order - Pull Product',
            event_data: {
                channel_id: item.channel_id,
                channel_name: item.channel_name,
            },
        };
        sendDataLayer(dataLayer);
    };

    React.useEffect(() => {
        clearInterval(intervalRef.current);
        mount.current = true;
        if (mount.current && dataListSellerChannel) {
            getChannelListData();
            onStartInverval();
        }
        return () => {
            mount.current = false;
            clearInterval(intervalRef.current);
        };
    }, [dataListSellerChannel]);

    return (
        <div className="catalog-channel-sync">

            <div className="product-data-desc-container">
                {t('pull_product_message')}
            </div>
            { !isLoadingChannel && isEmptyChannel && <div className="product-data-empty"><strong>{t('common:No_data_found')}</strong></div> }
            { isLoadingChannel && <div className="product-data-loading"><strong>{`${t('common:loading')}...`}</strong></div> }
            {
                isFillChannel && (
                    <div className="product-data-container">
                        {channels.map((item, index) => (
                            <ItemChannel
                                t={t}
                                key={`item-channel-${index}`}
                                item={item}
                                classes={classes}
                                loading={item?.loading ?? false}
                                dataProductProcess={item?.product_process ?? 0}
                                dataProductTotal={item?.product_total ?? 0}
                                dataProductLastSync={item?.product_last_sync ?? ''}
                                onPushSingleChannel={onPullSingleChannel}
                                sendToGTM={sendToGTM}
                                type="pull"
                            />
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default CatalogChannelSync;
