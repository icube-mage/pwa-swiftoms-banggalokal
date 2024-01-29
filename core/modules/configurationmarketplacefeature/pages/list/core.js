import Layout from '@layout';
import gqlService from '@modules/configurationmarketplacefeature/services/graphql';
import { useState } from 'react';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const { Content, t } = props;

    const {
        data, loading, refetch, error,
    } = gqlService.getMarketplaceFeatureList();
    const [addMarketplaceFeature] = gqlService.addMarketplaceFeature();
    const [selectedFeature, setSelectedFeature] = useState([]);

    const addFeatures = () => {
        window.backdropLoader(true);
        addMarketplaceFeature({
            variables: {
                features: selectedFeature,
            },
        })
            .then(() => {
                window.backdropLoader(false);
                refetch();
                window.toastMessage({
                    open: true,
                    text: t('marketplacefeatureconfiguration:The_marketplace_feature_has_been_saved'),
                    variant: 'success',
                });
            })
            .catch((e) => {
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
        title: t('marketplacefeatureconfiguration:Marketplace_Feature_Configuration'),
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_marketplace_feature',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('marketplacefeatureconfiguration:Data_not_found');
        const redirect = '/';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        data,
        addFeatures,
        setSelectedFeature,
        t,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
