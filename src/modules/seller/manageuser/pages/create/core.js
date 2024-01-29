import React from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import cookies from 'js-cookie';

import { getHost } from '@helper_config';
import BackdropLoad from '@helper_backdropload';
import { regexPhoneDial } from '@helper_regex';

import Layout from '@layout';
import gqlService from '@sellermodules/manageuser/services/graphql';
import gqlSeller from '@sellermodules/storesetting/services/graphql';

const ContentWrapper = (props) => {
    const {
        Content, t,
    } = props;
    const router = useRouter();

    const [createSellerUser] = gqlService.createSellerUser();

    const handleSubmit = (input) => {
        window.backdropLoader(true);
        createSellerUser({
            variables: { input },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('sellermanageuser:New_user_has_been_created'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/seller/manageuser'), 250);
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

    const [dialCode, setDialCode] = React.useState('62');
    const useRegexPhone = regexPhoneDial(dialCode);
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            telephone: '',
            customer_loc_code: [],
            password: '',
            acl_code: [],
            login_url: `${getHost()}/login`,
            account_url: `${getHost()}/seller/account`,
            use_group_acl: true,
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('sellermanageuser:This_is_a_Required_field')),
            email: Yup.string().email(t('sellermanageuser:Invalid_email_format')).required(t('sellermanageuser:This_is_a_Required_field')),
            telephone: Yup.string().nullable().matches(useRegexPhone, t('registerseller:Invalid_phone_number_format'))
                .required(t('registerseller:This_is_a_Required_field')),
            customer_loc_code: Yup.array().of(Yup.object())
                .min(1, t('selercatalog:Choose_at_least_min_key', { min: 1, key: t('sellermanageuser:location') })),
            password: Yup.string().required(t('sellermanageuser:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handleSubmit({
                ...values,
                customer_loc_code: values.customer_loc_code.map((loc) => String(loc.loc_code)),
            });
        },
    });

    const contentProps = {
        ...props,
        formik,
        setDialCode,
    };

    return (
        <Content {...contentProps} />
    );
};
const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const pageConfig = {
        title: t('sellermanageuser:Manage_User'),
    };

    const { data: dataTree, loading: loadTree } = gqlService.getSellerAclTree();
    const { data: dataLoc, loading: loadLoc } = gqlService.getLocationList({
        pageSize: 1000,
        currentPage: 1,
        filter: {
            company_id: { eq: cookies.getJSON('cdt')?.customer_company_code },
        },
    });

    const { data: dataSeller, loading: dataLoading } = gqlSeller.getSeller();
    const userManageStatus = dataSeller?.getSeller?.subscribtion_plan?.limit_user || false;

    const { data: sellerList, loading: loadSellerList } = gqlService.getSellerUsers({ pageSize: 1, currentPage: 1 });

    React.useEffect(() => {
        if (!loadSellerList && !dataLoading && userManageStatus !== false && sellerList?.getSellerUsers?.total_count >= userManageStatus) {
            router.push('/seller/manageuser');
        }
    }, [loadSellerList, dataLoading]);

    React.useEffect(() => {
        BackdropLoad(loadTree, dataLoading, loadSellerList);
    }, [loadTree, dataLoading, loadSellerList]);

    if (loadTree || dataLoading || loadSellerList) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    const contentProps = {
        ...props,
        dataTree: dataTree?.getSellerAclTree || [],
        dataLoc: dataLoc?.getLocationList?.items || [],
        loadLoc,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <ContentWrapper
                {...contentProps}
            />
        </Layout>
    );
};

export default Core;
