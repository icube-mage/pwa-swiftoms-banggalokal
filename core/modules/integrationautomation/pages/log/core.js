import Layout from '@layout';
import { useRouter } from 'next/router';

import ErrorRedirect from '@common_errorredirect';

import gqlService from '@modules/integrationautomation/services/graphql';
import aclService from '@modules/theme/services/graphql';

import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const { t, Content } = props;
    const router = useRouter();

    const pageConfig = {
        title: `${t('integrationautomation:Log')} ${router.query.key?.split('_')
            ?.map((str) => str.charAt(0).toUpperCase() + str.slice(1))?.join(' ')}`,
    };

    const { loading, data, error } = gqlService.getAutomationLog({
        filter: {
            log_id: { eq: router.query.log_id },
        },
        pageSize: 1,
        currentPage: 1,
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'integration_automation',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading || loading);
    }, [aclCheckLoading, loading]);

    if (aclCheckLoading || loading) {
        return <Layout pageConfig={pageConfig} plainMode />;
    }

    if (((aclCheckData && aclCheckData.isAccessAllowed) === false)) {
        router.push(`/integration/automation/${router.query.id}`);
        return <Layout pageConfig={pageConfig} plainMode />;
    }

    if (!data || !data?.getAutomationLogList?.items?.length || !router.query.log_id) {
        const errMsg = (error?.message) ?? t('integrationautomation:Data_not_found');
        const redirect = `/integration/automation/edit/${router.query.id}`;
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    const contentProps = {
        ...props,
        data: data?.getAutomationLogList?.items?.[0] || {},
        dataKey: router.query.key,
    };

    return (
        <Layout pageConfig={pageConfig} plainMode>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
