/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

import gqlService from '@sellermodules/return/services/graphql';
import gqlTheme from '@modules/theme/services/graphql';
import gqlStore from '@sellermodules/storesetting/services/graphql';

import ErrorRedirect from '@common_errorredirect';

import BackdropLoad from '@helper_backdropload';
import { stepNumber, nextStep } from '@sellermodules/return/helpers';

const ContentWrapper = (props) => {
    const {
        data, Content, refetch, t, dataLocations,
    } = props;
    const router = useRouter();
    const [open, setOpen] = React.useState(false);

    const [saveSellerReturn] = gqlService.saveSellerReturn();

    const handleCreditMemo = () => {
        router.push({
            pathname: '/seller/creditmemo/create/[id]',
            query: { id: data.entity_id },
        });
    };

    const handleSubmit = (input) => {
        setOpen(false);
        window.backdropLoader(true);
        saveSellerReturn({
            variables: { input },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('sellerreturn:Return_status_has_been_updated'),
                    variant: 'success',
                });
                setTimeout(() => refetch(), 250);
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
            return_type: data.return_type || '',
            is_refund: data.return_type === 'refund',
            is_replacement: data.return_type === 'replacement',
            refund_type: data.refund_type || '',
            replacement_order_type: data.replacement_order_type || '',
            items: data.rma_item?.map((item) => ({
                item_id: item.id,
                name: item.name,
                sku: item.sku,
                vendor_sku: item.vendor_sku,
                price: item.price,
                price_formatted: item.price_formatted,
                qty: item.qty,
                package_condition: item.package_condition,
                reason: item.reason,
                return_stock: !!item.return_stock,
                attachment: item.attachment,
            })),
            is_check_all: data.rma_item?.filter(({ status_code }) => status_code === 'approved' || status_code === 'package_received')?.length === data.rma_item?.length,
            selected: data.rma_item?.filter(({ status_code }) => status_code === 'approved' || status_code === 'package_received').map(({ id }) => (id)),
            package_received_by_loc: data.package_received_by_loc,
        },
        validationSchema: Yup.object().shape({
            is_refund: Yup.boolean(),
            is_replacement: Yup.boolean(),
            return_type: Yup.string()
                .required(t('sellerreturn:This_is_a_Required_field'))
                .typeError(t('sellerreturn:This_is_a_Required_field')),
            refund_type: Yup.string().when('is_refund', {
                is: true,
                then: Yup.string()
                    .required(t('sellerreturn:This_is_a_Required_field'))
                    .typeError(t('sellerreturn:This_is_a_Required_field')),
            }),
            replacement_order_type: Yup.string().when('is_replacement', {
                is: true,
                then: Yup.string()
                    .required(t('sellerreturn:This_is_a_Required_field'))
                    .typeError(t('sellerreturn:This_is_a_Required_field')),
            }),
            items: Yup.array().of(Yup.object().shape({
                package_condition: Yup.string()
                    .required(t('sellerreturn:This_is_a_Required_field'))
                    .typeError(t('sellerreturn:This_is_a_Required_field')),
                reason: Yup.string().required(t('sellerreturn:This_is_a_Required_field')).typeError(t('sellerreturn:This_is_a_Required_field')),
            })),
        }),
        onSubmit: (values) => {
            const {
                selected, items, return_type, refund_type, replacement_order_type, package_received_by_loc,
            } = values;

            const valueToSubmit = {
                id: data.id,
                action: 'save',
                status_code: nextStep(data.status_code),
                package_received_by_loc: package_received_by_loc || data.package_received_by_loc || dataLocations?.[0]?.code,
                items: items.map((item) => ({
                    item_id: item.item_id,
                    package_condition: item.package_condition,
                    reason: item.reason,
                    return_stock: item.return_stock ? 1 : 0,
                    status_code: selected.includes(item.item_id) ? stepNumber(data.status_code) ? 'package_received' : 'approved' : 'rejected',
                })),
            };
            valueToSubmit.request = {
                return_type,
            };
            if (return_type === 'refund') {
                valueToSubmit.request = {
                    ...valueToSubmit.request,
                    refund_type,
                };
            } else {
                valueToSubmit.request = {
                    ...valueToSubmit.request,
                    replacement_order_type,
                };
            }

            switch (stepNumber(data.status_code)) {
            // pending
            case 0:
                if (selected.length) {
                    handleSubmit(valueToSubmit);
                } else {
                    window.toastMessage({
                        open: true,
                        text: t('sellerreturn:Please_choose_at_least_1_product_to_return'),
                        variant: 'error',
                    });
                }
                break;
                // approved
                // sent
            case 1:
            case 2:
                if (dataLocations?.length > 1 && !open) {
                    setOpen(true);
                } else {
                    handleSubmit(valueToSubmit);
                }
                break;
            case 4:
                handleSubmit(valueToSubmit);
                break;
            default:
                break;
            }
        },
    });

    const handleCancel = () => {
        handleSubmit({
            id: data.id,
            action: stepNumber(data.status_code) ? 'canceled' : 'rejected',
            status_code: stepNumber(data.status_code) ? 'canceled' : 'rejected',
            package_received_by_loc: data.package_received_by_loc,
            items: formik.values.items.map((item) => ({
                item_id: item.item_id,
                package_condition: item.package_condition,
                reason: item.reason,
                return_stock: item.return_stock ? 1 : 0,
                status_code: stepNumber(data.status_code) ? 'canceled' : 'rejected',
            })),
        });
    };

    const formikMessage = useFormik({
        initialValues: {
            text: '',
            is_customer_notified: false,
            is_visible_on_front: true,
        },
        validationSchema: Yup.object().shape({
            text: Yup.string().required(t('sellerreturn:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            const { text, is_customer_notified, is_visible_on_front } = values;
            handleSubmit({
                id: data.id,
                action: 'save',
                status_code: data.status_code,
                package_received_by_loc: data.package_received_by_loc,
                message: {
                    text,
                    is_customer_notified: is_customer_notified ? 1 : 0,
                    is_visible_on_front: is_visible_on_front ? 1 : 0,
                },
            });
        },
    });

    const contentProps = {
        ...props,
        formik,
        formikMessage,
        stepActive: stepNumber(data.status_code),
        handleCancel,
        handleCreditMemo,
        open,
        setOpen,

    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const pageConfig = {
        title: `${t('sellerreturn:Return_Detail')} #${router.query?.id}`,
    };

    const {
        loading, data, error, refetch,
    } = gqlService.getSellerReturnById({
        id: router && router.query && Number(router.query.id),
    });
    const { loading: loadingStock, data: dataStock } = gqlTheme.getStoreConfig({
        path: 'swiftoms_rma/rma_request/return_stock',
    });
    const { loading: loadingPackageCondition, data: dataPackageCondition } = gqlTheme.getStoreConfig({
        path: 'swiftoms_rma/rma_request/package_condition',
    });
    const { loading: loadingReason, data: dataReason } = gqlTheme.getStoreConfig({
        path: 'swiftoms_rma/rma_request/reason',
    });
    const { loading: loadingReturnType, data: dataReturnType } = gqlTheme.getStoreConfig({
        path: 'swiftoms_rma/rma_request/return_type',
    });
    // const { data: dataLoc, loading: loadLoc } = gqlService.getSellerStoreOptions();
    const { loading: loadLoc, data: dataLoc } = gqlStore.getSellerStores({
        variables: {
            pageSize: 1000,
            currentPage: 1,
        },
    });
    const { data: dataStatus, loading: loadStatus } = gqlService.getRmaStatusList({
        pageSize: 1000,
        currentPage: 1,
        sort: { position: 'ASC' },
    });

    React.useEffect(() => {
        BackdropLoad(loading || loadingStock || loadingPackageCondition || loadingReason || loadingReturnType || loadLoc || loadStatus);
    }, [loading, loadingStock, loadingPackageCondition, loadingReason, loadingReturnType, loadLoc || loadStatus]);

    if (loading || loadingStock || loadingPackageCondition || loadingReason || loadingReturnType || loadLoc || loadStatus) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('sellerreturn:Data_not_found');
        const redirect = '/seller/return';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} isSeller />;
    }

    const contentProps = {
        ...props,
        data: data?.getSellerReturnById || {},
        refetch,
        dataReturnType: dataReturnType.getStoreConfig ? Object.values(JSON.parse(dataReturnType.getStoreConfig)) : [],
        dataPackageCondition: dataPackageCondition.getStoreConfig ? Object.values(JSON.parse(dataPackageCondition.getStoreConfig)) : [],
        dataReason: dataReason.getStoreConfig ? Object.values(JSON.parse(dataReason.getStoreConfig)) : [],
        isReturnStock: dataStock.getStoreConfig === '1',
        dataLocations: dataLoc?.getSellerStores?.items || [],
        dataStatus: dataStatus?.getRmaStatusList?.items || [],
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <ContentWrapper {...contentProps} />
        </Layout>
    );
};

export default Core;
