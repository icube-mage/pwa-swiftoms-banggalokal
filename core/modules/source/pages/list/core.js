import Layout from '@layout';
import gqlService from '@modules/source/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content, t,
    } = props;

    const [getSourceList, { data, loading, refetch }] = gqlService.getSourceList();

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_source',
    });

    const { loading: aclCreateSourceLoading, data: aclCreateSourceData } = aclService.isAccessAllowed({
        acl_code: 'source_create',
    });
    const { loading: aclUpdateSourceLoading, data: aclUpdateSourceData } = aclService.isAccessAllowed({
        acl_code: 'source_update',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading || aclCreateSourceLoading || aclUpdateSourceLoading);
    }, [aclCheckLoading, aclCreateSourceLoading, aclUpdateSourceLoading]);

    if (aclCheckLoading || aclCreateSourceLoading || aclUpdateSourceLoading) {
        return <Layout />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        getSourceList,
        data,
        loading,
        refetch,
        t,
        isAllowCreateSource: (aclCreateSourceData && aclCreateSourceData.isAccessAllowed) || false,
        isAllowUpdateSource: (aclUpdateSourceData && aclUpdateSourceData.isAccessAllowed) || false,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
