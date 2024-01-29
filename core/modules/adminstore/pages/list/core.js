/* eslint-disable no-trailing-spaces */
import Layout from '@layout';
import gqlService from '@modules/adminstore/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const [getAdminStoreList, { data, loading }] = gqlService.getAdminStoreList();
    const { loading: loadingGroup, data: dataGroup } = gqlService.getCustomerGroupOptions();

    const router = useRouter();
    
    const pageConfig = {
        title: t('alluser:All_Users'),
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_admin_store',
    });

    React.useEffect(() => {
        BackdropLoad(loadingGroup || aclCheckLoading);
    }, [loadingGroup, aclCheckLoading]);

    if (loadingGroup || aclCheckLoading) {
        return (
            <Layout />
        );
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        getAdminStoreList,
        data,
        loading,
        groupOptions: dataGroup?.getCustomerGroupOptions,
        t,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
