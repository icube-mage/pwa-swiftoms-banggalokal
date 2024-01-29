import Layout from '@layout';
import gqlService from '@modules/thirdpartyapps/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const [getThirdPartyAppList, { data, loading, refetch }] = gqlService.getThirdPartyAppList();
    const [deleteThirdPartyApps] = gqlService.deleteThirdPartyApps();
    const [updateThirdPartyApp] = gqlService.updateThirdPartyApp();

    const handleUpdateStatus = (app, checked) => {
        const variables = {
            id: app.entity_id,
            input: {
                vendor_id: app.vendor_id,
                status: checked,
            },
        };
        window.backdropLoader(true);
        updateThirdPartyApp({
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
        acl_code: 'vendor_third_party_apps',
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
        getThirdPartyAppList,
        handleUpdateStatus,
        data,
        loading,
        t,
        deleteThirdPartyApps,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
