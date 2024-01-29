import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/creditmemos/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        data, Content, parentId, canAdjFee, t,
    } = props;
    const router = useRouter();
    const { creditmemo, order } = data.prepareNewMemo;
    const [total, setTotal] = React.useState({
        sub: creditmemo.subtotal,
        grand: creditmemo.grand_total,
    });

    const [createCreditMemo] = gqlService.createCreditMemo();
    const [calculate] = gqlService.calculateCreditMemoTotals();

    const handleCalculate = (variables) => {
        window.backdropLoader(true);
        calculate({
            variables,
        })
            .then(({ data: res }) => {
                const { calculateCreditMemoTotals } = res;
                setTotal({
                    sub: calculateCreditMemoTotals.subtotal,
                    grand: calculateCreditMemoTotals.grand_total,
                });
                window.backdropLoader(false);
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

    const handleSubmit = (variables) => {
        window.backdropLoader(true);
        createCreditMemo({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('creditmemos:Creditmemo_Created'),
                    variant: 'success',
                });
                router.push(`/return/managerma/edit/${parentId}`);
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

    const transformArray = (arr = []) => {
        const res = arr.map((item) => {
            if (item.parent_item_id) {
                return { ...item, isChild: true };
            }
            return { ...item, isChild: false, bundle_children: [] };
        });
        arr.filter((item) => item.parent_item_id).forEach((item) => {
            const pIdx = res.findIndex((p) => p.order_item_id === item.parent_item_id);
            // eslint-disable-next-line no-prototype-builtins
            if (pIdx >= 0) {
                res[pIdx] = {
                    ...res[pIdx],
                    bundle_children: [...res[pIdx]?.bundle_children, { ...item }],
                };
            }
        });
        return res;
    };

    const creditmemoDetail = {
        entityId: order.entity_id,
        status: order.status,
        statusLabel: order.statusLabel,
        channelName: order.channel_name,
        channelCode: order.channel_code,
        orderNumber: order.channel_order_increment_id,
        orderDate: order.channel_order_date,
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
        couponCode: order.coupon_code,
    };

    // eslint-disable-next-line no-useless-escape
    const numberFormat = (value) => Number(value?.replace(/[^0-9\.-]+/g, ''));
    const formik = useFormik({
        initialValues: {
            shipping_amount: numberFormat(creditmemo.shipping_amount),
            adjustment_positive: numberFormat(creditmemo.adjustment_refund),
            adjustment_negative: numberFormat(creditmemo.adjustment_fee),
            comment_text: '',
            comment_customer_notify: false,
            send_email: false,
            items: creditmemoDetail.items.map((item) => ({
                ...item,
                price: item.isChild ? numberFormat(item.price) : item.price,
            })) || [],
        },
        validationSchema: Yup.object().shape({
            shipping_amount: Yup.number().typeError(t('creditmemos:Value_must_be_a_number')).required(t('creditmemos:This_is_a_Required_field')),
            adjustment_positive: Yup.number().typeError(t('creditmemos:Value_must_be_a_number')).required(t('creditmemos:This_is_a_Required_field')),
            adjustment_negative: Yup.number().typeError(t('creditmemos:Value_must_be_a_number')).required(t('creditmemos:This_is_a_Required_field')),
            items: Yup.array().of(Yup.object().shape({
                price: Yup.string().when('isChild', {
                    is: true,
                    then: Yup.string().required(t('creditmemos:This_is_a_Required_field')),
                }).test(
                    'notANumber',
                    t('creditmemos:Value_must_be_a_number'),
                    (v) => !Number.isNaN(numberFormat(v)),
                ),
            })),
        }),
        onSubmit: (values) => {
            const {
                action, comment_customer_notify, send_email, items, ...restValues
            } = values;
            const variables = {
                request_id: parentId,
                input: {
                    ...restValues,
                    shipping_amount: Number(restValues.shipping_amount) || 0,
                    adjustment_negative: Number(restValues.adjustment_negative) || 0,
                    adjustment_positive: Number(restValues.adjustment_positive) || 0,
                    comment_customer_notify: comment_customer_notify ? 1 : 0,
                    send_email: send_email ? 1 : 0,
                    items: items.filter((item) => item.isChild)
                        ?.map((item) => ({
                            order_item_id: Number(item.order_item_id),
                            price: Number(item.price),
                        })),
                },
            };
            if (action === 'submit') {
                handleSubmit(variables);
            } else if (action === 'calculate') {
                handleCalculate(variables);
            }
        },
    });

    const contentProps = {
        formik,
        creditmemoDetail,
        handleCalculate,
        parentId,
        total,
        canAdjFee,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();

    const pageConfig = {
        title: `${t('creditmemos:New_Memo_')}${router?.query?.request_id}`,
    };

    const { loading, data, error } = gqlService.prepareNewMemo({
        request_id: router && router.query && Number(router.query.request_id),
    });

    const { loading: loadingAdjFee, data: adjFee } = gqlService.getStoreConfig({
        path: 'swiftoms_rma/creditmemo/allow_adj_fee',
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'rma_create_creditmemo',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading || loadingAdjFee);
    }, [loading, aclCheckLoading, loadingAdjFee]);

    if (loading || aclCheckLoading || loadingAdjFee) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('creditmemos:Data_not_found');
        const redirect = `/return/managerma/edit/${router && router.query && Number(router.query.request_id)}`;
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper
                parentId={router && router.query && Number(router.query.request_id)}
                canAdjFee={adjFee.getStoreConfig === '1'}
                data={data}
                {...props}
            />
        </Layout>
    );
};

export default Core;
