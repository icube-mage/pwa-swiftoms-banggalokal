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
        title: t('sellerpromotion:Coupon'),
        customBreadcrumb: [
            { url: '', label: 'Promotion' },
            { url: router.asPath, label: t('sellerpromotion:Seller_Promotion') },
        ],
    };

    const { loading: aclCheckLoading, data: aclCheckData } = themeService.isAccessAllowed({
        acl_code: 'seller_promotion_coupon',
    });
    const [getSellerPromotions, { data, loading }] = gqlService.getSellerPromotions();

    const contentProps = {
        getSellerPromotions,
        data,
        loading,
        t,
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
