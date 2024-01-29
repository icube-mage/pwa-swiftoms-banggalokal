import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/channel/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { optionsYesNo } from '@modules/channel/helpers';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const { Content, t } = props;
    const router = useRouter();
    const [createChannel] = gqlService.createChannel();

    const handleSubmit = ({
        code,
        name,
        notes,
        url,
        token,
        endPoint,
        deltaStock,
        framework,
        type,
        virtualStock,
        shipment,
        invoice,
        refund,
        creditmemo,
        auto_confirm_shipment,
        release_stock,
        webhook_vendor_salesrule,
        sendShipment,
        autoOrderReallocation,
        split_shipment_capability,
        use_customer_review,
        is_multiseller,
        is_auto_create_product,
    }) => {
        const variables = {
            input: {
                channel_code: code,
                channel_name: name,
                notes,
                channel_url: url,
                token,
                end_point: endPoint,
                delta_stock_url: deltaStock,
                framework: framework.value,
                rule_type: type.value,
                virtual_stock: virtualStock.map((e) => ({ vs_id: e.vs_id })),
                webhook_shipment_complete: shipment,
                webhook_invoice: invoice,
                webhook_rma_refund: refund,
                webhook_creditmemo: creditmemo,
                auto_confirm_shipment: auto_confirm_shipment.id ?? 0,
                release_stock: release_stock.map((val) => val.value).toString(),
                webhook_vendor_salesrule,
                send_shipment: sendShipment.map((val) => val.value).toString(),
                auto_order_reallocation: autoOrderReallocation.id ?? 0,
                split_shipment_capability,
                use_customer_review,
                is_multiseller,
                is_auto_create_product,
            },
        };
        window.backdropLoader(true);
        createChannel({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('channel:New_channel_has_been_saved'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/oms/channel'), 250);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const formik = useFormik({
        initialValues: {
            code: '',
            name: '',
            notes: '',
            url: '',
            token: '',
            endPoint: '',
            deltaStock: '',
            framework: null,
            type: null,
            virtualStock: [],
            shipment: '',
            invoice: '',
            refund: '',
            creditmemo: '',
            auto_confirm_shipment: optionsYesNo[0],
            release_stock: [{ label: t('channel:Order_Shipped'), value: 'order_shipped' }],
            webhook_vendor_salesrule: '',
            sendShipment: [],
            autoOrderReallocation: optionsYesNo[0],
            use_customer_review: false,
            split_shipment_capability: 'one_store_priority_only',
            is_multiseller: false,
            is_auto_create_product: false,

        },
        validationSchema: Yup.object().shape({
            code: Yup.string().required(t('channel:This_is_a_Required_field')),
            name: Yup.string().required(t('channel:This_is_a_Required_field')),
            framework: Yup.object().typeError(t('channel:This_is_a_Required_field')).required(t('channel:This_is_a_Required_field')),
            type: Yup.object().typeError(t('channel:This_is_a_Required_field')).required(t('channel:This_is_a_Required_field')),
            virtualStock: Yup.array().nullable(),
            notes: Yup.string().nullable(),
            url: Yup.string().nullable(),
            token: Yup.string().nullable(),
            endPoint: Yup.string().nullable(),
            deltaStock: Yup.string().nullable(),
            shipment: Yup.string().nullable(),
            invoice: Yup.string().nullable(),
            refund: Yup.string().nullable(),
            creditmemo: Yup.string().nullable(),
            auto_confirm_shipment: Yup.object().nullable(),
            release_stock: Yup.string().nullable(),
            webhook_vendor_salesrule: Yup.string().nullable(),
            sendShipment: Yup.string().nullable(),
            autoOrderReallocation: Yup.object().nullable(),
            split_shipment_capability: Yup.string().nullable(),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_channel',
    });

    const { loading: configLoading, data: configData } = aclService.getStoreConfig({
        path: 'swiftoms_vendorportal/configuration/enable_vendor_portal',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading || configLoading);
    }, [aclCheckLoading, configLoading]);

    if (aclCheckLoading || configLoading) {
        return <Layout />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        formik,
        t,
        configSeller: configData?.getStoreConfig === '1',
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
