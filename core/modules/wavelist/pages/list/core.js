import Layout from '@layout';
import gqlService from '@modules/wavelist/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const pageConfig = {
        title: t('picklist:Pick_by_Wave_List'),
    };

    const { data: optionsStatus, loading: loadingOptionStatus } = gqlService.getPickByWaveStatus();
    const [getPickByWaveList, { data, loading }] = gqlService.getPickByWaveList();

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'pick_by_wave_list',
    });

    React.useEffect(() => {
        BackdropLoad(loadingOptionStatus || aclCheckLoading);
    }, [loadingOptionStatus, aclCheckLoading]);

    if (loadingOptionStatus || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        getPickByWaveList,
        data,
        loading,
        optionsStatus: optionsStatus.getPickByWaveStatus,
        t,
    };

    return (
        <Layout pageConfig={pageConfig} useBreadcrumbs={false}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
