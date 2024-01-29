import Layout from '@layout';
import gqlService from '@modules/configurationregionmapping/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const [getChannelRegionList, { data, loading }] = gqlService.getChannelRegionList();
    const [deleteChannelRegions] = gqlService.deleteChannelRegions();

    const router = useRouter();

    const pageConfig = {
        title: t('regionmappingconfiguration:Region_Mapping_Configuration'),
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'configuration_region_mapping',
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
        getChannelRegionList,
        deleteChannelRegions,
        data,
        loading,
        t,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
