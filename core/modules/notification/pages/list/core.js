import Layout from '@layout';
import gqlService from '@modules/notification/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const [getNotificationList, { data, loading, refetch }] = gqlService.getNotificationList();
    const [multiReadNotification] = gqlService.multiReadNotification();
    const [readAllNotification] = gqlService.readAllNotification();

    const handleAllRead = () => {
        readAllNotification().then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('notification:All_Notification_was_read'),
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

    const pageConfig = {
        title: t('notification:Manage_Notification'),
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_notification',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading);
    }, [aclCheckLoading]);

    if (aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        multiReadNotification,
        getNotificationList,
        data,
        loading,
        handleAllRead,
        t,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content refetch={refetch} {...contentProps} />
        </Layout>
    );
};

export default Core;
