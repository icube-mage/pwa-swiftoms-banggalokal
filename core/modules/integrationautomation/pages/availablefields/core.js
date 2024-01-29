/* eslint-disable object-curly-newline */
import Layout from '@layout';
import { useRouter } from 'next/router';

import ErrorRedirect from '@common_errorredirect';

import gqlService from '@modules/integrationautomation/services/graphql';
import aclService from '@modules/theme/services/graphql';

import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const { Content } = props;
    const contentProps = {
        ...props,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const {
        t,
    } = props;

    const pageConfig = {
        title: t('integrationautomation:Fields_Available_for_Webhook_Input'),
    };
    const router = useRouter();

    const { loading, data, error } = gqlService.getExportAvailableFields({
        variables: {
            event_id: Number(router.query.event_id),
            export_id: router.query.export_id,
        },
        skip: !router.query.event_id || !router.query.export_id,
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'integration_automation',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading || loading);
    }, [aclCheckLoading, loading]);

    if (aclCheckLoading || loading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (((aclCheckData && aclCheckData.isAccessAllowed) === false)) {
        router.push('/');
        return <Layout pageConfig={pageConfig} />;
    }

    if (!data || !router.query.export_id || !router.query.event_id) {
        const errMsg = (error?.message) ?? t('integrationautomation:Data_not_found');
        const redirect = '/integration/automation';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    const contentProps = {
        ...props,
        dataTree: data?.getExportAvailableFields || [],
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...contentProps} />
        </Layout>
    );
};

export default Core;
