import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/adminstore/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { regexPhoneDial, regexEmail } from '@helper_regex';
import BackdropLoad from '@helper_backdropload';
import { getHost } from '@helper_config';

const ContentWrapper = (props) => {
    const {
        dataCompany,
        dataLocation,
        dataGroup,
        Content,
        aclTreeData,
        aclManageUserAclData,
        t,
    } = props;
    const router = useRouter();

    const [createAdminStore] = gqlService.createAdminStore();

    const [dialCode, setDialCode] = React.useState('62');
    const useRegexPhone = regexPhoneDial(dialCode);

    const handleSubmit = (input) => {
        const variables = {
            input,
            login_url: `${getHost()}/login`,
            account_url: `${getHost()}/useredit`,
        };

        window.backdropLoader(true);
        createAdminStore({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('alluser:The_user_group_has_been_saved'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/userdata/adminstore'), 250);
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
            firstname: '',
            lastname: '',
            email: '',
            phone_number: '',
            customer_loc_code: [],
            company: '',
            group: dataGroup.getCustomerGroupOptions.find((group, i) => i === 0),
            password: '',
            acl_code: [],
            use_group_acl: true,
            notif_error_order_queue: true,
            notif_reallocation_order: true,
            notif_new_order: true,
            notif_rma: true,
            notif_new_user: true,
        },
        validationSchema: Yup.object().shape({
            firstname: Yup.string().required(t('alluser:This_is_a_Required_field')),
            lastname: Yup.string().required(t('alluser:This_is_a_Required_field')),
            email: Yup.string().required(t('alluser:This_is_a_Required_field')).matches(regexEmail, t('alluser:Invalid_email_format')),
            phone_number: Yup.string().nullable().matches(useRegexPhone, t('alluser:Invalid_phone_number_format'))
                .required(t('alluser:This_is_a_Required_field')),
            password: Yup.string().required(t('alluser:This_is_a_Required_field')),
            group: Yup.object().typeError(t('alluser:This_is_a_Required_field')).required(t('alluser:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            const {
                customer_loc_code, group, company, ...restValues
            } = values;
            const valueToSubmit = {
                ...restValues,
                customer_loc_code: customer_loc_code?.map((loc) => String(loc.value)),
                group_id: Number(group.value),
                customer_company_code: company?.value ? String(company.value) : '',
            };
            handleSubmit(valueToSubmit);
        },
    });

    const contentProps = {
        formik,
        dataCompany: dataCompany.getCompanyOptions,
        dataLocation: dataLocation.getLocationOptions,
        dataGroup: dataGroup.getCustomerGroupOptions,
        aclTreeData,
        aclManageUserAclData,
        t,
        setDialCode,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('alluser:Create_User'),
    };
    const router = useRouter();

    const { loading: loadingCompany, data: dataCompany } = gqlService.getCompanyOptions();
    const { loading: loadingLocation, data: dataLocation } = gqlService.getLocationOptions();
    const { loading: loadingGroup, data: dataGroup } = gqlService.getCustomerGroupOptions();
    const { loading: aclTreeLoading, data: aclTreeData } = gqlService.getAclTree();
    const { loading: aclManageUserAclLoading, data: aclManageUserAclData } = aclService.isAccessAllowed({
        acl_code: 'manage_user_acl',
    });
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_admin_store',
    });

    React.useEffect(() => {
        BackdropLoad(loadingCompany || loadingLocation || loadingGroup || aclCheckLoading || aclTreeLoading || aclManageUserAclLoading);
    }, [loadingCompany, loadingLocation, loadingGroup, aclCheckLoading, aclTreeLoading, aclManageUserAclLoading]);

    if (loadingCompany || loadingLocation || loadingGroup || aclCheckLoading || aclTreeLoading || aclManageUserAclLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        dataCompany,
        dataLocation,
        dataGroup,
        aclTreeData: aclTreeData?.getAclTree,
        aclManageUserAclData: aclManageUserAclData?.isAccessAllowed,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
