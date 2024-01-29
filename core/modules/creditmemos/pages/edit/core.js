import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/creditmemos/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';
import transformArray from '@helper_arraybundle';

const ContentWrapper = (props) => {
    const { data, Content, t } = props;
    const { creditmemo, order } = data.getCreditMemoById;

    const creditmemoDetail = {
        entityId: order.entity_id,
        incrementId: creditmemo.increment_id,
        status: order.status,
        statusLabel: order.statusLabel,
        channelIcon: order.channel_image_url,
        channelName: order.channel_name,
        channelCode: order.channel_code,
        channelOrderNumber: order.channel_order_increment_id,
        channelOrderDate: order.channel_order_date,
        customerName: order.customer_name,
        customerEmail: order.customer_email,
        customerGroup: order.customer_group,
        billing: order.billing_address,
        shipping: order.shipping_address,
        paymentMethod: order.channel_payment_method,
        shippingMethod: order.channel_shipping_method,
        items: transformArray(creditmemo.items),
        subtotal: creditmemo.subtotal,
        discount: creditmemo.discount,
        refundShipping: creditmemo.shipping_amount,
        adjustRefund: creditmemo.adjustment_refund,
        adjustFee: creditmemo.adjustment_fee,
        grandTotal: creditmemo.grand_total,
        couponCode: order.coupon_code,
        onlyFreeShippingCouponCode: order.only_free_shipping_coupon_code,
    };

    const contentProps = {
        creditmemoDetail,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();

    const pageConfig = {
        title: `${t('creditmemos:View_Memo_')}${router?.query?.id}`,
    };

    const { loading, data, error } = gqlService.getCreditMemoById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_credit_memos',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('creditmemos:Error_Message_');
        const redirect = '/return/creditmemos';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper data={data} {...props} />
        </Layout>
    );
};

export default Core;
