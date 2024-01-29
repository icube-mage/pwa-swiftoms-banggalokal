/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/invoice/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        data, Content, aclCheckData, t,
    } = props;
    const invoiceList = data.getInvoiceById;

    const invoice = {
        id: invoiceList.entity_id,
        incrementId: invoiceList.increment_id,
        channelCode: invoiceList.channel_code,
        channelName: invoiceList.channel_name,
        channelIcon: invoiceList.channel_image_url,
        state: invoiceList.state,
        status: invoiceList.state_label,
        channelOrderIncrementId: invoiceList.channel_order_increment_id || '-',
        channelOrderDate: invoiceList.channel_order_date,
        storeId: invoiceList.store_id,
        customerName: invoiceList.customer_name,
        order: invoiceList.order,
        billing: invoiceList.order.billing_address,
        shipping: invoiceList.order.shipping_address,
        items: invoiceList.items,
        shippingAmount: invoiceList.shipping_amount,
        grandTotal: invoiceList.grand_total,
        subtotal: invoiceList.subtotal,
        aw_store_credit_amount: invoiceList.aw_store_credit_amount,
        discount: invoiceList.discount,
        couponCode: invoiceList.coupon_code,
        onlyFreeShippingCouponCode: invoiceList.only_free_shipping_coupon_code,
    };

    const contentProps = {
        invoice,
        aclCheckData,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const { loading, data, error } = gqlService.getInvoiceById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'sales_order_invoice',
    });

    const pageConfig = {
        title: `${t('invoice:Detail_Order_')}${router.query?.id}`,
    };

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('invoice:Data_not_found');
        const redirect = '/order/invoice';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper
                data={data}
                aclCheckData={aclCheckData}
                parent={router && router.query && router.query.tab_status}
                {...props}
            />
        </Layout>
    );
};

export default Core;
