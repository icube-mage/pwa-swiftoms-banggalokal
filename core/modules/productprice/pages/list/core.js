import Layout from '@layout';
import gqlService from '@modules/productprice/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;
    const router = useRouter();

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_marketplace_product_price',
    });
    const { loading: aclSyncLoading, data: aclSyncData } = aclService.isAccessAllowed({
        acl_code: 'marketplace_price_sync_to_marketplace',
    });
    const [updateMarketplaceProductPriceToMp] = gqlService.updateMarketplaceProductPriceToMp();
    const [getMarketplaceProductPriceList, { data, loading }] = gqlService.getMarketplaceProductPriceList();
    const [deleteProductPrice] = gqlService.deleteProductPrice();

    const handleUpdateMarketplace = () => {
        updateMarketplaceProductPriceToMp().then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('marketplace:Product_price_sync_to_marketplace_successfully'),
                variant: 'success',
            });
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading || aclSyncLoading);
    }, [aclCheckLoading, aclSyncLoading]);

    if (aclCheckLoading || aclSyncLoading) {
        return <Layout />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        getMarketplaceProductPriceList,
        data,
        loading,
        updateMarketplaceProductPriceToMp,
        handleUpdateMarketplace,
        deleteProductPrice,
        t,
        aclSyncToMp: aclSyncData?.isAccessAllowed,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
