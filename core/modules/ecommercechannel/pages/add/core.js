import Layout from '@layout';
import gqlService from '@modules/ecommercechannel/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import ErrorRedirect from '@common_errorredirect';
import helperCookies from '@helper_cookies';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;
    const pageConfig = {
        title: t('ecommercechannel:Add_Channel'),
    };
    const router = useRouter();
    const [firstLoad, setFirstLoad] = React.useState(true);

    const [getMarketplaceList, { data, loading, error }] = gqlService.getMarketplaceList();
    const [getCountryForMarketplace, getCountryForMarketplaceRes] = gqlService.getCountryForMarketplace();
    const [getWebstoreList, getWebstoreListRes] = gqlService.getWebstoreList();

    React.useEffect(() => {
        getMarketplaceList({
            variables: {
                filter: {
                    is_active: { eq: '1' },
                },
            },
        });
        getWebstoreList();
        helperCookies.remove('webstore_step');
        helperCookies.remove('webstore');
        helperCookies.remove('marketplace_step');
        helperCookies.remove('marketplace');
    }, []);

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'ecommerce_channels',
    });

    React.useEffect(() => {
        BackdropLoad((firstLoad && (loading || getWebstoreListRes.loading)) || aclCheckLoading);
    }, [firstLoad, loading, getWebstoreListRes.loading, aclCheckLoading]);

    if ((firstLoad && (loading || getWebstoreListRes.loading)) || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    if (firstLoad && (error || !data || getWebstoreListRes.error || !getWebstoreListRes.data)) {
        const errMsg = error?.message || getWebstoreListRes.error?.message || t('ecommercechannel:Data_not_found');
        const redirect = '/integration/ecommercechannel';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    const contentProps = {
        getMarketplaceList,
        data,
        loading,
        firstLoad,
        getCountryForMarketplace,
        getCountryForMarketplaceRes,
        getWebstoreListRes,
        setFirstLoad,
        t,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
