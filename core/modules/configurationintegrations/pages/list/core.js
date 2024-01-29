import Layout from '@layout';
import gqlService from '@modules/configurationintegrations/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const [getIntegrationList, { data, loading, refetch }] = gqlService.getIntegrationList();
    const [deleteIntegration] = gqlService.deleteIntegration();
    const [generateIntegration] = gqlService.generateIntegration();

    const handleReauthorize = (
        integration_id, clear_exist_token,
    ) => {
        const variables = {
            integration_id, clear_exist_token,
        };
        window.backdropLoader(true);
        generateIntegration({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('configurationintegrations:Success_Reauthorize'),
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

    const handleActivate = (
        integration_id, clear_exist_token,
    ) => {
        const variables = {
            integration_id, clear_exist_token,
        };
        window.backdropLoader(true);
        generateIntegration({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('configurationintegrations:Success_Activate'),
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
        acl_code: 'oms_lite_config_integrations',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading);
    }, [aclCheckLoading]);

    if (aclCheckLoading) {
        return <Layout />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        getIntegrationList,
        deleteIntegration,
        data,
        loading,
        handleReauthorize,
        handleActivate,
        t,
    };

    return (
        <Layout>
            <Content refetch={refetch} {...contentProps} />
        </Layout>
    );
};

export default Core;
