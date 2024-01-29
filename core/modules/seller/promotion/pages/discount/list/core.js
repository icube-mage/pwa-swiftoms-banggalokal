import Layout from '@layout';
import gqlProduct from '@sellermodules/catalog/services/graphql';
import gqlService from '@sellermodules/promotion/services/graphql';
import themeService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';
import { useRouter } from 'next/router';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const router = useRouter();
    const pageConfig = {
        title: t('sellerpromotion:Discount_Product'),
        customBreadcrumb: [
            { url: '', label: 'Promotion' },
            { url: router.asPath, label: t('sellerpromotion:Seller_Promotion') },
        ],
    };
    const { loading: aclCheckLoading, data: aclCheckData } = themeService.isAccessAllowed({
        acl_code: 'seller_promotion_discount',
    });

    const [getSellerDiscountList, { data, loading, refetch }] = gqlService.getSellerDiscountList();
    const { data: dataCat, loading: loadCat } = gqlProduct.getCategoryList();
    const { data: dataEtalase, loading: loadEtalase } = gqlProduct.getSellerEtalaseList({
        filter: {
            exclude_all_products: { eq: '1' },
        },
    });
    const [deleteSellerDiscount] = gqlService.deleteSellerDiscount();

    React.useEffect(() => {
        BackdropLoad(loadCat || loadEtalase || aclCheckLoading);
    }, [loadCat, loadEtalase, aclCheckLoading]);

    if (loadCat || loadEtalase || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/seller/unauthorized');
        return <Layout pageConfig={pageConfig} seller />;
    }

    const handleSingleDelete = (row, isParent, childSku, after = () => {}) => {
        const input = {
            sku: row.sku,
        };
        if (isParent && row.variants?.length) {
            input.variants = row?.variants?.map((variant) => ({ sku: variant.sku }));
        } else if (childSku) {
            input.variants = [{ sku: childSku }];
        }
        window.backdropLoader(true);
        deleteSellerDiscount({
            variables: { input: [input] },
        }).then((res) => {
            window.backdropLoader(false);
            if (res.data.deleteSellerDiscount) {
                window.toastMessage({
                    open: true,
                    text: t('sellerpromotion:count_discount_products_has_been_deleted', { count: res.data.deleteSellerDiscount }),
                    variant: 'success',
                });
                refetch();
                after();
            } else {
                throw new Error(t('sellerpromotion:Something_went_wrong_while_trying_to_delete_discount_product'));
            }
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const handleDelete = (rows, before = () => {}, after = () => {}) => {
        before();
        const input = rows.map((row) => {
            const res = { sku: row.sku };
            if (row.variants?.length) {
                res.variants = row?.variants?.map((variant) => ({
                    sku: variant.sku,
                }));
            }
            return res;
        });
        window.backdropLoader(true);
        deleteSellerDiscount({
            variables: { input },
        }).then((res) => {
            if (res.data.deleteSellerDiscount) {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('sellerpromotion:count_discount_products_has_been_deleted', { count: res.data.deleteSellerDiscount }),
                    variant: 'success',
                });
                after();
                refetch();
            } else {
                throw new Error(t('sellerpromotion:Something_went_wrong_while_trying_to_delete_discount_product'));
            }
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
        getSellerDiscountList,
        data,
        loading,
        t,
        dataCat: dataCat?.getCategoryList,
        dataEtalase: dataEtalase?.getSellerEtalaseList?.items,
        handleDelete,
        handleSingleDelete,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
