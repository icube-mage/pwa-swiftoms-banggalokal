/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import BackdropLoad from '@helper_backdropload';
import fetch from 'cross-fetch';

import Layout from '@layout';
import themeService from '@modules/theme/services/graphql';
import integrationService from '@sellermodules/storeintegration/services/graphql';
import { encrypt } from '@helper_encryption';

const ContentWrapper = (props) => {
    const { t, storecode, Content } = props;

    const { data: getWebstoreConfig } = integrationService.getWebstoreConfiguration();

    const getWebstore = (config) => {
        const [filterConfig] = getWebstoreConfig?.getWebstoreConfiguration[0]?.fields?.filter((e) => e.id === config) || [];
        const filterResult = filterConfig?.value || '';
        const domainName = filterResult.replace(/^(https?:\/\/)?/, '');
        return domainName.replace('/', '');
    };

    const getCoreDomain = getWebstore('webstore_multitenant/general/url');
    const getWebstoreToken = getWebstore('webstore_multitenant/general/token');

    const [dialogOpen, setDialogOpen] = useState(false);
    const [storeData, setStoreData] = useState({ store_code: 'tokosaya', template: '' });
    const [error, setError] = useState('');

    const formik = useFormik({
        initialValues: {
            store_code: 'tokosaya',
            template: '',
        },
        validationSchema: Yup.object().shape({
            store_code: Yup.string()
                .required(t('selleronlinestore:This_is_a_Required_field'))
                .matches(/^(\S+$)/g, t('selleronlinestore:This_field_cannot_contain_blankspaces')),
        }),
        onSubmit: (values, { resetForm }) => {
            setDialogOpen(false);
            setStoreData(values);
            resetForm();
        },
    });

    const handleManageStore = () => {
        window.backdropLoader(true);
        const requestParam = JSON.stringify({
            storecode,
            target: getCoreDomain,
            token: getWebstoreToken,
        });
        fetch(`/webstore-multitenant?data=${encrypt(requestParam)}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                Auhorization: `Bearer ${getWebstoreToken}`,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                window.backdropLoader(false);
                setError('');
                if (json.status === 200) {
                    window.open(`https://${json.url}`);
                } else if (json.error_message) {
                    setError(json.error_message);
                }
            })
            .catch((e) => {
                window.backdropLoader(false);
                setError(e);
            });
    };

    useEffect(() => {
        if (error) {
            window.toastMessage({
                open: true,
                text: typeof error === 'string' ? error : t('selleronlinestore:Failed_to_fetch_webstore_data'),
                variant: 'error',
            });
        }
    }, [error]);

    const contentProps = {
        ...props,
        formik,
        dialogOpen,
        setDialogOpen,
        handleManageStore,
        storeData,
        setStoreData,
        homeUrl: `${storecode}.${getCoreDomain}`.replace('/', ''),
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();

    const pageConfig = {
        title: t('selleronlinestore:Online_Store'),
    };

    const { loading: aclCheckLoading, data: aclCheckData } = themeService.isAccessAllowed({
        acl_code: 'seller_user',
    });

    useEffect(() => {
        BackdropLoad(aclCheckLoading);
    }, [aclCheckLoading]);

    if (aclCheckLoading) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/seller/dashboard');
        return <Layout pageConfig={pageConfig} seller />;
    }

    const contentProps = {
        ...props,
        storecode: router?.query?.storecode || false,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <ContentWrapper {...contentProps} />
        </Layout>
    );
};

export default Core;
