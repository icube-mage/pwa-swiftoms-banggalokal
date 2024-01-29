import Layout from '@layout';
import gqlService from '@modules/integrationthirdpartyapps/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const [getIntegrationAppList, { data, loading, refetch }] = gqlService.getIntegrationAppList();
    const [deleteIntegrationApp] = gqlService.deleteIntegrationApp();
    const [updateIntegrationApp] = gqlService.updateIntegrationApp();

    const handleUpdateStatus = (app, checked) => {
        const variables = {
            id: app.entity_id,
            input: {
                name: app.name,
                status: checked,
                channel_ids: app.channel_ids,
                company_ids: app.company_ids,
                loc_ids: app.loc_ids,
                is_all_channels: app.is_all_channels,
                is_all_companies: app.is_all_companies,
                is_all_locations: app.is_all_locations,
                modules: app.modules.map(({
                    __typename, module_id, profile_id, ...rest
                }) => rest),
            },
        };
        window.backdropLoader(true);
        updateIntegrationApp({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('thirdpartyapps:Third_Party_Apps_has_been_updated'),
                variant: 'success',
            });
            refetch();
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'integration_third_party_apps',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading);
    }, [aclCheckLoading]);

    if (aclCheckLoading) {
        return <Layout />;
    }

    if (((aclCheckData && aclCheckData.isAccessAllowed) === false)) {
        router.push('/');
        return <Layout />;
    }

    const contentProps = {
        getIntegrationAppList,
        handleUpdateStatus,
        data,
        loading,
        t,
        deleteIntegrationApp,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
