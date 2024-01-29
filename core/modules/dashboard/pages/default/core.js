import Layout from '@layout';
import gqlService from '@modules/dashboard/services/graphql';
import gqlTheme from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
        t,
    } = props;

    const summaryData = {
        order_new: data.summaryData.order_new,
        order_no_allocation: data.summaryData.order_no_allocation,
        order_failed: data.summaryData.order_failed,
        shipment_unconfirmed_total: data.summaryData.shipment_unconfirmed_total,
        shipment_unconfirmed_store_pickup: data.summaryData.shipment_unconfirmed_store_pickup,
        shipment_unconfirmed_home_delivery: data.summaryData.shipment_unconfirmed_home_delivery,
        shipment_unconfirmed_marketplace: data.summaryData.shipment_unconfirmed_marketplace,
        shipment_cannot_fulfill: data.summaryData.shipment_cannot_fulfill,
        return_new: data.summaryData.return_new,
    };

    const channelListData = data.channelListData.items;

    const contentProps = {
        summaryData,
        channelListData,
        t,
        ...props,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const { t } = props;

    const { loading: loadingSummaryData, data: summaryData } = gqlService.getDashboardData();
    const { loading: loadingChannelListData, data: channelListData } = gqlService.getChannelList();
    const { loading: orderCheckLoading, data: orderCheckData } = gqlTheme.isAccessAllowed({
        acl_code: 'oms_lite_header_sales',
    });
    const { loading: shipmentCheckLoading, data: shipmentCheckData } = gqlTheme.isAccessAllowed({
        acl_code: 'header_shipment',
    });
    const { loading: returnCheckLoading, data: returnCheckData } = gqlTheme.isAccessAllowed({
        acl_code: 'header_sales_return',
    });

    React.useEffect(() => {
        BackdropLoad(loadingSummaryData || loadingChannelListData
            || orderCheckLoading || shipmentCheckLoading || returnCheckLoading);
    }, [loadingSummaryData, loadingChannelListData, orderCheckLoading, shipmentCheckLoading, returnCheckLoading]);

    if (loadingSummaryData || loadingChannelListData
        || orderCheckLoading || shipmentCheckLoading || returnCheckLoading) {
        return (
            <Layout />
        );
    }

    if (!summaryData && !channelListData) {
        return (
            <Layout>{t('dashboard:Data_not_found')}</Layout>
        );
    }

    const data = {
        summaryData: summaryData?.getDashboardData,
        channelListData: channelListData?.getChannelList,
    };

    const contentProps = {
        data,
        orderAcces: orderCheckData.isAccessAllowed,
        shipmentAcces: shipmentCheckData.isAccessAllowed,
        returnAcces: returnCheckData.isAccessAllowed,
        ...props,
    };

    return (
        <Layout>
            <ContentWrapper {...contentProps} />
        </Layout>
    );
};

export default Core;
