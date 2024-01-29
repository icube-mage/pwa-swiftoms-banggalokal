/* eslint-disable no-nested-ternary */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { optionsYesNo } from '@modules/channel/helpers';
import gqlService from '@modules/channel/services/graphql';
import aclService from '@modules/theme/services/graphql';
import marketplaceGqlService from '@modules/ecommercechannel/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        data, Content, queryRoute, t,
    } = props;
    const router = useRouter();
    const channel = data.getChannelById;
    const marketplaceName = data.getChannelById.channel_name.split('_');

    const [getMarketplaceDefaultShippingMethods,
        getMarketplaceDefaultShippingMethodsRes] = marketplaceGqlService.getMarketplaceDefaultShippingMethods();
    const [updateChannel] = gqlService.updateChannel();

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
        store_detail_id,
        release_stock,
        webhook_vendor_salesrule,
        sendShipment,
        autoOrderReallocation,
        credentials,
        split_shipment_capability,
        use_customer_review,
        is_multiseller,
        is_auto_create_product,
    }) => {
        const variables = {
            id: channel.channel_id,
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
                auto_confirm_shipment: auto_confirm_shipment?.id ?? 0,
                release_stock: (release_stock && release_stock.map((val) => val.value).toString()) || null,
                webhook_vendor_salesrule,
                send_shipment: (sendShipment && sendShipment.map((val) => val.value).toString()) || null,
                auto_order_reallocation: autoOrderReallocation.id ?? 0,
                credentials,
                split_shipment_capability,
                use_customer_review,
                is_multiseller,
                is_auto_create_product,
                store_detail_id,
            },
        };
        window.backdropLoader(true);
        updateChannel({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('channel:The_Channel_has_been_saved'),
                    variant: 'success',
                });
                setTimeout(() => (queryRoute.length === 2 && !!queryRoute[1]
                    ? router.push(`/integration/${queryRoute[1]}`) : router.push('/oms/channel')), 250);
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

    const initialCredentials = () => {
        const { credentials } = channel;
        const init = [];
        const valid = [];
        const type = {
            string: Yup.string(),
            integer: Yup.number().typeError(t('channel:Type_must_be_Integer')),
        };
        if (channel.framework === 'Marketplace') {
            (credentials
                || []).map((cred) => {
                if (cred.type === 'default_shipping_method') {
                    valid.push([cred.type, Yup.object().shape({
                        value: Yup.string(),
                    }).typeError('')]);
                    return init.push([cred.type, { label: cred.value, value: cred.value }]);
                }
                valid.push([cred.type, type[cred.data_type]]);
                return init.push([cred.type, cred.value]);
            });
        }
        return {
            init: {
                credentials: Object.fromEntries(init),
            },
            valid: Object.fromEntries(valid),
        };
    };

    const formik = useFormik({
        initialValues: {
            code: channel.channel_code || '',
            name: channel.channel_name || '',
            notes: channel.notes || '',
            url: channel.channel_url || '',
            token: channel.token || '',
            endPoint: channel.end_point || '',
            deltaStock: channel.delta_stock_url || '',
            framework: channel.framework ? { value: channel.framework, label: channel.framework } : null,
            type: channel.rule_type ? { value: channel.rule_type, label: channel.rule_type } : null,
            virtualStock: channel.virtual_stock || [],
            shipment: channel.webhook_shipment_complete || '',
            invoice: channel.webhook_invoice || '',
            refund: channel.webhook_rma_refund || '',
            creditmemo: channel.webhook_creditmemo || '',
            auto_confirm_shipment: optionsYesNo.find((e) => e.id === channel.auto_confirm_shipment) || null,
            release_stock: (channel.release_stock && channel.release_stock.split(',').map((val) => ({ label: val, value: val }))) || null,
            webhook_vendor_salesrule: channel.webhook_vendor_salesrule || '',
            sendShipment: (channel.send_shipment && channel.send_shipment.split(',').map((val) => ({ label: val, value: val }))) || null,
            autoOrderReallocation: optionsYesNo.find((e) => e.id === channel.auto_order_reallocation) || null,
            store_detail_id: channel.store_detail_id ? Number(channel.store_detail_id) : null,
            split_shipment_capability: channel.split_shipment_capability || 'one_store_priority_only',
            use_customer_review: channel.use_customer_review || false,
            is_multiseller: channel.is_multiseller || false,
            is_auto_create_product: channel.is_auto_create_product || false,
            ...initialCredentials().init,
        },
        validationSchema: Yup.object().shape({
            code: Yup.string().nullable().required(t('channel:This_is_a_Required_field')),
            name: Yup.string().nullable().required(t('channel:This_is_a_Required_field')),
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
            credentials: channel.framework === 'Marketplace' && Yup.object().shape({
                ...initialCredentials().valid,
            }),
        }),
        onSubmit: (values) => {
            const { credentials: credentialValues, ...restValues } = values;
            if (channel.framework === 'Marketplace') {
                const credToSubmit = channel.credentials.filter((cred) => cred.updatable).map((cred) => ({
                    data_type: cred.data_type,
                    type: cred.type,
                    value: (cred.type === 'default_shipping_method' ? credentialValues && credentialValues[cred.type]?.value
                        : String(credentialValues && credentialValues[cred.type])) || '',
                }));
                restValues.credentials = credToSubmit;
            }
            handleSubmit(restValues);
        },
    });

    React.useEffect(() => {
        if (channel.framework === 'Marketplace') {
            getMarketplaceDefaultShippingMethods({
                skip: !marketplaceName || !marketplaceName.length,
                variables: {
                    marketplace_code: marketplaceName[marketplaceName.length - 1],
                },
            });
        }
    }, []);

    const contentProps = {
        ...props,
        formik,
        queryRoute,
        channel,
        marketplaceName,
        getMarketplaceDefaultShippingMethods,
        getMarketplaceDefaultShippingMethodsRes,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const queryRoute = router && router.query && router.query.id?.split('_');
    const { loading, data, error } = gqlService.getChannelById({
        id: router && router.query && Number(queryRoute[0]),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_channel',
    });

    const { loading: configLoading, data: configData } = aclService.getStoreConfig({
        path: 'swiftoms_vendorportal/configuration/enable_vendor_portal',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading || configLoading);
    }, [loading, aclCheckLoading, configLoading]);

    if (loading || aclCheckLoading || configLoading) {
        return <Layout />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('channel:Data_not_found');
        const redirect = '/oms/channel';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const coreProps = {
        data,
        queryRoute,
        t,
        configSeller: configData?.getStoreConfig === '1',
        ...props,
    };

    return (
        <Layout>
            <ContentWrapper {...coreProps} />
        </Layout>
    );
};

export default Core;
