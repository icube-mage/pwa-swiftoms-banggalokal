import Layout from '@layout';
import gqlTheme from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';
import { setLocalStorage } from '@helper_localstorage';

const Core = (props) => {
    const { Content, t } = props;

    const pageConfig = {
        title: t('common:Error_Authorized'),
    };

    const contentProps = {
        t,
    };

    const [load, setLoad] = React.useState(true);

    const [getAcl] = gqlTheme.customerAccessControlListLazy();
    const [getStoreConfigWave] = gqlTheme.getStoreConfigWave();
    const [getStoreConfigBatch] = gqlTheme.getStoreConfigBatch();
    const [getStoreConfigTada] = gqlTheme.getStoreConfigTada();
    const [getStoreConfigVendor] = gqlTheme.getStoreConfigVendor();
    const [getStoreConfigBeneficiaries] = gqlTheme.getStoreConfigBeneficiaries();

    React.useEffect(async () => {
        try {
            const [resAcl, resWave, resBatch, resTada, resVendor, resBenef] = await Promise.all([
                getAcl(),
                getStoreConfigWave(),
                getStoreConfigBatch(),
                getStoreConfigTada(),
                getStoreConfigVendor(),
                getStoreConfigBeneficiaries(),
            ]);
            setLocalStorage('acl', JSON.stringify(resAcl.data.customerAccessControlList));
            setLocalStorage('config_acl', JSON.stringify({
                pickpackWave: resWave.data.getStoreConfig,
                pickpackBatch: resBatch.data.getStoreConfig,
                tada: resTada.data.getStoreConfig,
                vendor: resVendor.data.getStoreConfig,
                beneficiaries: resBenef.data.getStoreConfig,
            }));

            // eslint-disable-next-line no-empty
        } catch (error) { } finally { setLoad(false); }
    }, []);

    React.useEffect(() => {
        BackdropLoad(load);
    }, [load]);

    if (load) {
        return (
            <Layout pageConfig={pageConfig} seller />
        );
    }

    return (
        <Layout pageConfig={pageConfig} seller>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
