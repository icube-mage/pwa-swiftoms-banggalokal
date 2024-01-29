/* eslint-disable */
import Layout from '@layout';
import { useRouter } from 'next/router';

import Tabs from '@common_tabsseller';

import SearchBar from '@sellermodules/order/pages/list/components/ListCard/components/SearchBar';
import gqlService from '@sellermodules/order/services/graphql';
import useStyles from '@sellermodules/order/pages/list/components/style';
import gqlStore from '@sellermodules/storesetting/services/graphql';

import BackdropLoad from '@helper_backdropload';
import { breakPointsUp } from '@helper_theme';
import Progressbar from './components/progressbar';
import Badge from '@material-ui/core/Badge';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;
    const classes = useStyles();
    const isDesktop = breakPointsUp('sm');

    const router = useRouter();
    const status = router?.query?.status || 'success';
    const pageConfig = {
        title: t('sellerorder:Order_List'),
        customBreadcrumb: [
            { url: '', label: 'Order' },
            { url: router.asPath, label: t('sellerorder:Order_List') },
        ],
    };

    const [checked, setChecked] = React.useState([]);
    const [doRefetch, setDoRefetch] = React.useState(false);
    const [search, setSearch] = React.useState('');

    const [getSellerOrders, { data: successAllocationData, loading: successAllocationLoading }] = gqlService.getSellerOrders();
    const [getSellerOrderQueueList, { data: failedAllocationData, loading: failedAllocationLoading }] = gqlService.getSellerOrderQueueList();
    const [getSellerOrderSyncStatusList, { data: failedSyncData, loading: failedSyncLoading }] = gqlService.getSellerOrderSyncStatusList();
    const { data: dataSeller } = gqlStore.getSeller();
    const { loading: loadShipment, data: dataShipment } = gqlStore.getSellerShippingMethods();
    const { loading: loadLocation, data: dataLocation } = gqlService.getSellerStoreOptions();
    const { loading: loadSellerChannelList, data: dataSellerChannelList } = gqlService.getSellerChannelList();
    const { loading: loadSellerOrderStatus, data: dataSellerOrderStatus } = gqlService.getSellerOrderStatus();
    const { loading: loadOrderPaymentStatus, data: dataOrderPaymentStatus } = gqlService.getOrderPaymentStatus();

    const [retrySellerOrderSync] = gqlService.retrySellerOrderSync();
    
    const successAllocationDataTotal = (successAllocationData?.getSellerOrders?.total_count);
    const failedAllocationDataTotal = (failedAllocationData?.getSellerOrderQueueList?.total_count);
    const failedSyncDataTotal = (failedSyncData?.getSellerOrderSyncStatusList?.total_count);
    React.useEffect(() => {
        getSellerOrders({
            variables: {
                pageSize: 1,
                currentPage: 1,
            },
        });
        getSellerOrderQueueList({
            variables: {
                pageSize: 1,
                currentPage: 1,
                filter: { status: {in: ['allocation_failed', 'canceled']} },
            },
        });
        getSellerOrderSyncStatusList({
            variables: {
                pageSize: 1,
                currentPage: 1,
                filter: { sync_status: {eq: 'failed'} },
            },
        });
    }, []);

    React.useEffect(() => {
        BackdropLoad(loadShipment || loadLocation || loadSellerChannelList || loadSellerOrderStatus || loadOrderPaymentStatus);
    }, [loadShipment, loadLocation, loadSellerChannelList, loadSellerOrderStatus, loadOrderPaymentStatus]);

    if (loadShipment || loadLocation || loadSellerChannelList || loadSellerOrderStatus || loadOrderPaymentStatus) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    const handleRetry = (input) => {
        window.backdropLoader(true);
        retrySellerOrderSync({ variables: { input } }).then((res) => {
            if (res.data.retrySellerOrderSync > 0) {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('sellerorder:count_orders_have_been_successfully_resync', { count: res.data.retrySellerOrderSync }),
                    variant: 'success',
                });
                setDoRefetch(true);
            } else {
                throw new Error(t('sellerorder:Something_went_wrong_when_try_to_resync_the_orders'));
            }
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const getProps = () => {
        let getData = getSellerOrders;
        let data = successAllocationData;
        let loading = successAllocationLoading;
        switch (status) {
        case 'failed':
            getData = getSellerOrderQueueList;
            data = failedAllocationData;
            loading = failedAllocationLoading;
            break;
        case 'sync_failed':
            getData = getSellerOrderSyncStatusList;
            data = failedSyncData;
            loading = failedSyncLoading;
            break;
        default:
            break;
        }
        return { getData, data, loading };
    };

    const contentProps = {
        getSellerOrders: getProps().getData,
        data: getProps().data,
        loading: getProps().loading,
        t,
        dataProvider: dataShipment?.getSellerShippingMethods,
        dataLocation: dataLocation?.getSellerStoreOptions || [],
        dataSellerChannelList: dataSellerChannelList?.getSellerChannelList?.items || [],
        dataSellerOrderStatus: dataSellerOrderStatus?.getSellerOrderStatus || [],
        dataOrderPaymentStatus: dataOrderPaymentStatus?.getOrderPaymentStatus || [],
        checked,
        setChecked,
        handleRetry,
        doRefetch,
        setDoRefetch,
        search,
        setSearch,
    };

    const dataTabs = [
        {
            label: (
                <div className={classes.divTabCount}>
                    {t('success_allocation')}
                    <div className={classes.infoCount}>
                        <Badge badgeContent={successAllocationDataTotal || 0} invisible={false} />
                    </div>
                </div>
            ),
            value: 'success',
        },
        {
            label: (
                <div className={classes.divTabCount}>
                    {t('failed_allocation')}
                    <div className={classes.infoCount}>
                        <Badge badgeContent={failedAllocationDataTotal || 0} invisible={false} />
                    </div>
                </div>
            ),
            value: 'failed',
        },
        {
            label: (
                <div className={classes.divTabCount}>
                    {t('Sync_Failed')}
                    <div className={classes.infoCount}>
                        <Badge badgeContent={failedSyncDataTotal || 0} invisible={false} />
                    </div>
                </div>
            ),
            value: 'sync_failed',
        },
    ];

    const onChangeTab = (e, v) => {
        const value = v === 'success' ? '' : v;
        router.replace(`/seller/order/${value}`, undefined, { shallow: true });
        setChecked([]);
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            {!isDesktop ? (
                <div className={classes.searchBarContainer}>
                    <SearchBar value={search} onChange={setSearch} t={t} />
                </div>
            ) : null}            
            <div className={classes.listCoreContainer}>
                <div className={classes.progressBarMobile}>
                    <Progressbar barBgColor='#ECF0F2' total={dataSeller?.getSeller?.subscribtion_plan?.limit_order} value={dataSeller?.getSeller?.multitenant_order_total || 0 }/>
                </div>
                <div className={classes.tabsContainer}>
                    <Tabs data={dataTabs} onChange={onChangeTab} value={status} allItems={false} noBorder />
                    <div className={classes.progressBar}>
                        <Progressbar barBgColor='#fff' total={dataSeller?.getSeller?.subscribtion_plan?.limit_order} value={dataSeller?.getSeller?.multitenant_order_total || 0 }/>
                    </div>
                </div>
                <Content {...contentProps} />
            </div>
        </Layout>
    );
};

export default Core;
