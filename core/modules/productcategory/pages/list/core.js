import Layout from '@layout';
import gqlService from '@modules/productcategory/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const [getProductCategoryList, { data, loading }] = gqlService.getProductCategoryList();
    const [multidisableProductCategory] = gqlService.multidisableProductCategory();
    const [pullProductCategory, { data: dataPull }] = gqlService.pullProductCategory();

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_marketplace_product_categories',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading);
    }, [aclCheckLoading]);

    if (aclCheckLoading) {
        return <Layout />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const handlePull = () => {
        window.backdropLoader(true);
        pullProductCategory()
            .then(() => {
                window.backdropLoader(false);
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

    const contentProps = {
        getProductCategoryList,
        multidisableProductCategory,
        handlePull,
        dataPull,
        data,
        loading,
        t,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
