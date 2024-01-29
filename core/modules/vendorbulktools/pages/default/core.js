import React, { useEffect, useRef, useState } from 'react';
import Layout from '@layout';
import gqlService from '@modules/vendorbulktools/services/graphql';
import { bulkToolsOptions } from '@modules/vendorbulktools/helpers';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const { Content, t } = props;
    const [isAccessAllowedLazy, { data, loading }] = gqlService.isAccessAllowedLazy();
    const [bulkToolsOptionsState, setBulkToolsOptionsState] = useState([]);
    const [bulkType, setBulkType] = useState(null);
    const indexRef = useRef(0);

    useEffect(() => {
        if (indexRef.current < bulkToolsOptions.length) {
            isAccessAllowedLazy({
                variables: {
                    acl_code: bulkToolsOptions[indexRef.current]?.acl ?? '',
                },
            });
        }
    }, [indexRef.current]);

    useEffect(() => {
        if (data && data.isAccessAllowed && bulkToolsOptions[indexRef.current]) {
            setBulkToolsOptionsState([...bulkToolsOptionsState, bulkToolsOptions[indexRef.current]]);
            indexRef.current += 1;
        }
        if (!indexRef.current < bulkToolsOptions.length) {
            setBulkType(bulkToolsOptionsState[0]);
        }
    }, [data, loading]);

    React.useEffect(() => {
        BackdropLoad(indexRef.current < bulkToolsOptions.length);
    }, [indexRef.current, bulkToolsOptions.length]);

    if (indexRef.current < bulkToolsOptions.length) {
        return <Layout />;
    }

    const contentProps = {
        bulkToolsOptionsState,
        setBulkType,
        bulkType,
        t,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'vendor_bulk_tools',
    });

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            if (aclCheckLoading) {
                window.backdropLoader(true);
            } else {
                window.backdropLoader(false);
            }
        }
    }, [aclCheckLoading]);

    if (aclCheckLoading) {
        return <Layout />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        t,
    };

    return (
        <>
            <ContentWrapper {...contentProps} {...props} />
        </>
    );
};

export default Core;
