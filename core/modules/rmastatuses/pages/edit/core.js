import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { optionsInItem, optionsEmailCustomer, optionsEmailAdmin } from '@modules/rmastatuses/helpers';
import gqlService from '@modules/rmastatuses/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const { Content, data, t } = props;

    const router = useRouter();
    const rmastatuses = data.getRmaStatusByCode;
    const [updateRmaStatus] = gqlService.updateRmaStatus();

    const handleSubmit = ({
        code, label, position, inItem, messageText, emailCustomer, customerText, emailAdmin, adminText, admin_groups,
    }) => {
        const variables = {
            status_code: code,
            status_label: label,
            position: Number(position),
            in_item: inItem.id,
            message_text: messageText,
            is_email_customer: emailCustomer.id,
            email_customer_text: customerText,
            is_email_admin: emailAdmin.id,
            email_admin_text: adminText,
            admin_groups: admin_groups?.filter(({ group_id }) => !!group_id)
                ?.map(({ by_location, group_id }) => ({ by_location, group_id })) || [],
        };
        window.backdropLoader(true);
        updateRmaStatus({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('rmastatuses:RMA_Status_has_been_saved'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/return/rmastatuses'), 250);
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
            code: rmastatuses.status_code,
            label: rmastatuses.status_label,
            position: rmastatuses.position,
            inItem: optionsInItem.find((e) => e.id === rmastatuses.in_item),
            messageText: rmastatuses.message_text,
            emailCustomer: optionsEmailCustomer.find((e) => e.id === rmastatuses.is_email_customer),
            customerText: rmastatuses.email_customer_text,
            emailAdmin: optionsEmailAdmin.find((e) => e.id === rmastatuses.is_email_admin),
            adminText: rmastatuses.email_admin_text,
            admin_groups: rmastatuses.admin_groups || [],
            is_email_admin: !!rmastatuses.is_email_admin,
        },
        validationSchema: Yup.object().shape({
            label: Yup.string().nullable(),
            position: Yup.number().nullable(),
            inItem: Yup.object().typeError(t('rmastatuses:This_field_is_required')).required(t('rmastatuses:This_field_is_required')),
            messageText: Yup.string().nullable(),
            emailCustomer: Yup.object().typeError(t('rmastatuses:This_field_is_required')).required(t('rmastatuses:This_field_is_required')),
            customerText: Yup.string().nullable(),
            emailAdmin: Yup.object().typeError(t('rmastatuses:This_field_is_required')).required(t('rmastatuses:This_field_is_required')),
            adminText: Yup.string().nullable(),
            is_email_admin: Yup.boolean(),
            admin_groups: Yup.array().when('is_email_admin', {
                is: true,
                then: Yup.array().of(Yup.object().shape({
                    group_id: Yup.string().required(t('rmastatuses:This_field_is_required')),
                })).min(1, t('rmastatuses:Minimum_1_admin_group_is_assigned')),
                otherwise: Yup.array(),
            }),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const contentProps = {
        ...props,
        formik,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data, error } = gqlService.getRmaStatusByCode({
        status_code: router && router.query && String(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_rma_statuses',
    });

    const { loading: loadGroup, data: dataGroup } = gqlService.getCustomerGroupList({
        pageSize: 1000,
        currentPage: 1,
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading || loadGroup);
    }, [loading, aclCheckLoading, loadGroup]);

    if (loading || aclCheckLoading || loadGroup) {
        return <Layout />;
    }

    if (!data) {
        const errMsg = error?.message ?? 'Data not found!';
        const redirect = '/return/rmastatuses';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout>
            <ContentWrapper data={data} dataGroup={dataGroup?.getCustomerGroupList?.items || []} {...props} />
        </Layout>
    );
};

export default Core;
