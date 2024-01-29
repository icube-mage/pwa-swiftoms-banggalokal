import Layout from '@layout';
import gqlService from '@modules/vendoririspayout/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const [getVendorIrisPayoutHistory, { data, loading }] = gqlService.getVendorIrisPayoutHistory();

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'vendor_manage_iris',
    });

    const { loading: configLoading, data: configData } = aclService.getStoreConfig({
        path: 'swiftoms_vendorportal/configuration/beneficiaries',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading || configLoading);
    }, [aclCheckLoading, configLoading]);

    if (aclCheckLoading || configLoading) {
        return <Layout />;
    }

    if (((aclCheckData && aclCheckData.isAccessAllowed) === false)
        || (configData && configData.getStoreConfig === '0')) {
        router.push('/');
        return <Layout />;
    }

    const contentProps = {
        getVendorIrisPayoutHistory,
        data,
        loading,
        t,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
