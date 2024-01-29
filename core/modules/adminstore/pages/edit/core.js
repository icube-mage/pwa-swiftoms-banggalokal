import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/adminstore/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import { regexPhoneDial, regexEmail } from '@helper_regex';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        data,
        dataCompany,
        dataLocation,
        dataGroup,
        Content,
        aclTreeData,
        aclByCustomerData,
        aclManageUserAclData,
        t,
    } = props;
    const router = useRouter();
    const admin = data.getAdminStoreById;
    const [updateAdminStore] = gqlService.updateAdminStore();

    const [dialCode, setDialCode] = React.useState('62');
    const useRegexPhone = regexPhoneDial(dialCode);

    const aclChecked = (tree, list = []) => {
        const assigned = [...list];
        const push = (arr) => {
            if (Array.isArray(arr)) {
                arr.forEach((acl) => {
                    const exist = acl.children?.find((child) => assigned.includes(child.value));
                    if (exist?.value) {
                        assigned.push(acl.value);
                    }
                    push(acl.children);
                });
            }
        };
        push(tree);
        return assigned;
    };

    const handleSubmit = async (input) => {
        const variables = { id: admin.entity_id, input };
        window.backdropLoader(true);
        try {
            await updateAdminStore({
                variables,
            });
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('alluser:The_user_group_has_been_saved'),
                variant: 'success',
            });
            setTimeout(() => router.push('/userdata/adminstore'), 250);
        } catch (e) {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        }
    };

    const formik = useFormik({
        initialValues: {
            firstname: admin.firstname,
            lastname: admin.lastname,
            email: admin.email,
            phone_number: admin.phone_number,
            customer_loc_code: admin.customer_loc_code?.length
                ? admin.customer_loc_code.map((code) => dataLocation.getLocationOptions.find((loc) => loc.value === code))
                : [],
            company: admin.customer_company_code
                ? dataCompany.getCompanyOptions.find((loc) => Number(loc.value) === Number(admin.customer_company_code))
                : '',
            group: dataGroup.getCustomerGroupOptions.find((group) => Number(group.value) === Number(admin.group_id)),
            password: '',
            acl_code: aclChecked(aclTreeData, aclByCustomerData?.acl_code || []) ?? [],
            use_group_acl: aclByCustomerData?.use_group_acl ?? false,
            notif_error_order_queue: admin.notif_error_order_queue,
            notif_reallocation_order: admin.notif_reallocation_order,
            notif_new_order: admin.notif_new_order,
            notif_rma: admin.notif_rma,
            notif_new_user: admin.notif_new_user,
        },
        validationSchema: Yup.object().shape({
            firstname: Yup.string().required(t('alluser:This_is_a_Required_field')),
            lastname: Yup.string().required(t('alluser:This_is_a_Required_field')),
            email: Yup.string().required(t('alluser:This_is_a_Required_field')).matches(regexEmail, t('alluser:Invalid_email_format')),
            phone_number: Yup.string().nullable().matches(useRegexPhone, t('alluser:Invalid_phone_number_format'))
                .required(t('alluser:This_is_a_Required_field')),
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
    const router = useRouter();

    const pageConfig = {
        title: `${t('alluser:Edit_User')} #${router?.query?.id}`,
    };

    const { loading, data, error } = gqlService.getAdminStoreById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: loadingCompany, data: dataCompany } = gqlService.getCompanyOptions();
    const { loading: loadingLocation, data: dataLocation } = gqlService.getLocationOptions();
    const { loading: loadingGroup, data: dataGroup } = gqlService.getCustomerGroupOptions();
    const { loading: aclTreeLoading, data: aclTreeData } = gqlService.getAclTree();
    const { loading: aclByCustomerLoading, data: aclByCustomerData } = gqlService.getAclByCustomerId({
        customer_id: router && router.query && Number(router.query.id),
    });
    const { loading: aclManageUserAclLoading, data: aclManageUserAclData } = aclService.isAccessAllowed({
        acl_code: 'manage_user_acl',
    });
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_admin_store',
    });

    React.useEffect(() => {
        BackdropLoad(loading
            || loadingCompany
            || loadingLocation
            || loadingGroup
            || aclCheckLoading
            || aclTreeLoading
            || aclByCustomerLoading
            || aclManageUserAclLoading);
    }, [loading,
        loadingCompany,
        loadingLocation,
        loadingGroup,
        aclCheckLoading,
        aclTreeLoading,
        aclByCustomerLoading,
        aclManageUserAclLoading]);

    if (
        loading
        || loadingCompany
        || loadingLocation
        || loadingGroup
        || aclCheckLoading
        || aclTreeLoading
        || aclByCustomerLoading
        || aclManageUserAclLoading
    ) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('alluser:Data_not_found');
        const redirect = '/userdata/adminstore';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        data,
        dataCompany,
        dataLocation,
        dataGroup,
        aclTreeData: aclTreeData?.getAclTree,
        aclByCustomerData: aclByCustomerData?.getAclByCustomerId,
        aclManageUserAclData: aclManageUserAclData?.isAccessAllowed,
        t,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
