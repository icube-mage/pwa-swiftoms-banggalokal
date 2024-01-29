/* eslint-disable object-curly-newline */
import Layout from '@layout';
import { useRouter } from 'next/router';

import ErrorRedirect from '@common_errorredirect';

import gqlService from '@modules/integrationthirdpartyapps/services/graphql';
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
        title: t('integrationthirdpartyapps:Fields_Available_for_Webhook_Input'),
    };
    const router = useRouter();

    const { loading, data, error } = gqlService.getWebhookOutputAvailableFields({
        variables: {
            id: router.query.shipment_number,
            profile_id: Number(router.query.profile_id),
        },
        skip: !router.query.profile_id || !router.query.shipment_number,
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'integration_third_party_apps',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading || loading);
    }, [aclCheckLoading, loading]);

    if (aclCheckLoading || loading) {
        return <Layout />;
    }

    if (((aclCheckData && aclCheckData.isAccessAllowed) === false)) {
        router.push('/');
        return <Layout />;
    }

    if (!data || !router.query.profile_id || !router.query.shipment_number) {
        const errMsg = (error?.message) ?? t('integrationthirdpartyapps:Data_not_found');
        let redirect = `/integration/thirdpartyapps/edit/${router.query.id}/output/${router.query.profile_id}`;
        if (!router.query.profile_id) {
            redirect = `/integration/thirdpartyapps/edit/${router.query.id}`;
        }
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    const contentProps = {
        ...props,
        dataTree: data?.getWebhookOutputAvailableFields || [],
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...contentProps} />
        </Layout>
    );
};

export default Core;
