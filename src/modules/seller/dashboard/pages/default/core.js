import Layout from '@layout';
import useStyles from '@sellermodules/dashboard/pages/default/components/style';
import gqlService from '@sellermodules/dashboard/services/graphql/index';
import gqlSeller from '@sellermodules/storesetting/services/graphql';
import gqlProfileService from '@sellermodules/manageaccount/services/graphql';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const pageConfig = {
        title: t('common:beranda'),
        noPaddingContainer: true,
    };

    const classes = useStyles();
    const { loading, data } = gqlService.getSellerActivitySummary();
    const { loading: loadingSeller, data: dataSeller } = gqlSeller.getSeller();
    const getSellerActivitySummary = data?.getSellerActivitySummary;
    const orderNew = getSellerActivitySummary?.new_order ?? 0;
    const updateStock = getSellerActivitySummary?.update_stock || 0;
    const orderHomeDelivery = getSellerActivitySummary?.home_delivery ?? 0;
    const linkOrder = '/seller/order';
    const linkStock = '/seller/stock';

    const { data: dataPicture, loading: loadPicture } = gqlProfileService.getUserProfilePicture();

    React.useEffect(() => {
        window.backdropLoader(true);
    }, []);

    React.useEffect(() => {
        BackdropLoad(loading, loadingSeller);
    }, [loading, loadingSeller]);

    const contentProps = {
        t,
        classes,
        loading,
        loadingSeller,
        data,
        dataSeller,
        orderNew,
        orderHomeDelivery,
        linkOrder,
        linkStock,
        updateStock,
        dataPicture,
    };

    if (loading || loadingSeller || loadPicture) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    return (
        <Layout pageConfig={pageConfig} seller>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
