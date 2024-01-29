import Layout from '@layout';
import BackdropLoad from '@helper_backdropload';
import gqlService from '@sellermodules/promotion/services/graphql';
import themeService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const router = useRouter();
    const pageConfig = {
        title: t('sellerpromotion:Bundling'),
        customBreadcrumb: [
            { url: '', label: 'Promotion' },
            { url: router.asPath, label: t('sellerpromotion:Bundling') },
        ],
    };
    const { loading: aclCheckLoading, data: aclCheckData } = themeService.isAccessAllowed({
        acl_code: 'seller_promotion_bundling',
    });
    const [getSellerPromotionsBundle, { data, loading, refetch }] = gqlService.getSellerPromotionsBundle();
    const [disablePromotionBundle] = gqlService.disablePromotionBundle();
    const [deletePromotionBundle] = gqlService.deletePromotionBundle();

    const handleStopBundling = (id, afterRefetch = () => {}) => {
        window.backdropLoader(true);
        disablePromotionBundle({
            variables: { id },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('sellercatalog:Bundling_promotion_has_been_stopped'),
                variant: 'success',
            });
            refetch();
            afterRefetch();
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const handleDeleteBundling = (id, afterRefetch = () => {}) => {
        window.backdropLoader(true);
        deletePromotionBundle({
            variables: { id },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('sellercatalog:Bundling_promotion_has_been_deleted'),
                variant: 'success',
            });
            refetch();
            afterRefetch();
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const contentProps = {
        ...props,
        getSellerPromotionsBundle,
        data,
        loading,
        handleStopBundling,
        handleDeleteBundling,
    };

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading);
    }, [aclCheckLoading]);

    if (aclCheckLoading) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/seller/unauthorized');
        return <Layout pageConfig={pageConfig} seller />;
    }

    return (
        <Layout pageConfig={pageConfig} seller>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
