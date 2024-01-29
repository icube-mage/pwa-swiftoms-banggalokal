import Layout from '@layout';
import gqlService from '@modules/offlinechannel/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;
    const router = useRouter();
    const [firstLoad, setFirstLoad] = React.useState(true);

    const [getChannelList, { data, loading, error }] = gqlService.getChannelList();

    const [deleteChannel] = gqlService.deleteChannel({
        onCompleted: () => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('offlinechannel:The_channel_has_been_removed'),
                variant: 'success',
            });
            getChannelList();
        },
        onError: (e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        },
    });

    React.useEffect(() => {
        getChannelList();
    }, []);

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'offline_channels',
    });

    React.useEffect(() => {
        BackdropLoad((firstLoad && loading) || aclCheckLoading);
    }, [firstLoad, loading, aclCheckLoading]);

    if ((firstLoad && loading) || aclCheckLoading) {
        return <Layout />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    if (firstLoad && (error || !data)) {
        const errMsg = error?.message ?? t('offlinechannel:Data_not_found');
        const redirect = '/';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    const contentProps = {
        data,
        loading,
        getChannelList,
        firstLoad,
        setFirstLoad,
        deleteChannel,
        t,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
