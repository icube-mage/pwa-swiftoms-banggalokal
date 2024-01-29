import Layout from '@layout';
import gqlService from '@modules/configurationlogistixprovider/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;
    const [getLogistixProviderList, { data, loading }] = gqlService.getLogistixProviderList();
    const [deleteLogistixProvider] = gqlService.deleteLogistixProvider();

    const router = useRouter();

    const pageConfig = {
        title: t('logistixproviderconfiguration:Logistix_Provider_Configuration'),
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_logistix_provider',
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
        getLogistixProviderList,
        data,
        loading,
        deleteLogistixProvider,
        t,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
