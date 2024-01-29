import Layout from '@layout';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        Content,
        t,
    } = props;

    const promotionList = [
        {
            label: t('sellerpromotion:Product_Coupon'),
            value: 'coupon',
            description: t('sellerpromotion:Set_special_discounts_by_creating_coupons_for_all_products_in_your_store_to_sell_faster'),
            buttonLabel: t('sellerpromotion:Make_Coupon'),
        },
        {
            label: t('sellerpromotion:Bundling'),
            value: 'bundling',
            description: t('sellerpromotion:Maximize_sales_by_fitting_products_into_one_package'),
            buttonLabel: t('sellerpromotion:Make_Package'),
        },
        {
            label: t('sellerpromotion:Discount_Product'),
            value: 'discount',
            description: t('sellerpromotion:Invite_buyers_to_shop_at_special_prices_through_packages_of_the_same_product'),
            buttonLabel: t('sellerpromotion:Make_Discount'),
        },
    ];

    return (
        <Content promotionList={promotionList} {...props} />
    );
};

const Core = (props) => {
    const {
        t,
    } = props;

    const router = useRouter();
    const pageConfig = {
        title: t('sellerpromotion:Seller_Promotion'),
        customBreadcrumb: [
            { url: '', label: 'Promotion' },
            { url: router.asPath, label: t('sellerpromotion:Seller_Promotion') },
        ],
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'seller_promotion',
    });

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
            <ContentWrapper {...props} />
        </Layout>
    );
};

export default Core;
