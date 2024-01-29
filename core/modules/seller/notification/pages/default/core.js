import Layout from '@layout';
import gqlService from '@sellermodules/notification/services/graphql';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const pageConfig = {
        title: t('sellernotification:Notification'),
    };

    const [getSellerNotifications, { data, loading }] = gqlService.getSellerNotifications();

    const contentProps = {
        getSellerNotifications,
        data,
        loading,
        t,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
