import Layout from '@layout';
import gqlService from '@modules/integrationautomation/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const [getAutomationList, { data, loading, refetch }] = gqlService.getAutomationList();
    const [deleteAutomation] = gqlService.deleteAutomation();
    const [updateAutomationStatus] = gqlService.updateAutomationStatus();

    const handleUpdateStatus = (ids, checked) => {
        const variables = {
            ids,
            status: checked,
        };
        window.backdropLoader(true);
        updateAutomationStatus({
            variables,
        }).then((res) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('integrationautomation:count_integration_automation_statuses_has_been_updated', { count: res.data.updateAutomationStatus }),
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
        acl_code: 'integration_automation',
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
        getAutomationList,
        data,
        loading,
        t,
        deleteAutomation,
        handleUpdateStatus,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
