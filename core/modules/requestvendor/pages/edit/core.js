/* eslint-disable no-use-before-define */
import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/requestvendor/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';
import { getHost } from '@helper_config';

const ContentWrapper = (props) => {
    const { data, Content, t } = props;
    const router = useRouter();
    const Vendor = data.getVendorRequestById;
    const [approveSellerRegistration] = gqlService.approveSellerRegistration();
    const [vendorRequestNotApprove] = gqlService.vendorRequestNotApprove();

    const handleApprove = () => {
        const variables = {
            id: vendor.id,
            login_url: `${getHost()}/login`,
            account_url: `${getHost()}/seller/account`,
            confirm_url: `${getHost()}/user/account/confirm`,
        };
        window.backdropLoader(true);
        approveSellerRegistration({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('requestvendor:Vendor_approved'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/vendorportal/requestvendor'), 250);
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

    const handleNotApprove = () => {
        const variables = {
            id: vendor.id,
        };
        window.backdropLoader(true);
        vendorRequestNotApprove({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('requestvendor:Vendor_not_approved'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/vendorportal/requestvendor'), 250);
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

    const vendor = {
        id: Vendor.entity_id,
        firstname: Vendor.first_name,
        email: Vendor.email,
        street: Vendor.company_street,
        region: Vendor.region_name,
        city: Vendor.company_city,
        phone: Vendor.no_telephone,
        companyName: Vendor.company_name,
        status: Vendor.status,
        statusLabel: Vendor.status_label,
        ktp: Vendor.id_card_file,
        ktpNumber: Vendor.id_card_number,
        npwp: Vendor.taxpayer_file,
        npwpNumber: Vendor.taxpayer_number,
        postCode: Vendor.post_code,
    };

    const contentProps = {
        vendor,
        handleApprove,
        handleNotApprove,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const { loading, data, error } = gqlService.getVendorRequestById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_vendor_request',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('requestvendor:Data_not_found');
        const redirect = '/vendorportal/requestvendor';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        data,
        t,
    };

    return (
        <Layout>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
