import Layout from '@layout';
import gqlService from '@sellermodules/order/services/graphql';
import BackdropLoad from '@helper_backdropload';
import { useRouter } from 'next/router';
import ErrorRedirect from '@common_errorredirect';
import { transformArray } from '@sellermodules/order/helpers';

const ContentWrapper = (props) => {
    const { data, Content, t } = props;
    const shippingLabel = data.printSellerOrderLabel;

    const mapingBundle = () => shippingLabel.map((order) => ({ ...order, items: transformArray(order.items) }));

    const contentProps = {
        ...props,
        shippingLabel: mapingBundle(),
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const {
        t,
    } = props;

    const router = useRouter();

    const pageConfig = {
        title: t('sellerorder:Print_Shipping_Label'),
    };

    const { data, loading, error } = gqlService.printSellerOrderLabel({
        id: router && router.query && router.query.id.map((e) => Number(e)),
    });

    React.useEffect(() => {
        BackdropLoad(loading);
    }, [loading]);

    if (loading) {
        return <Layout pageConfig={pageConfig} seller plainMode />;
    }

    if (!data) {
        const errMsg = error?.message ?? 'Data not found!';
        const redirect = '/seller/order';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    return (
        <ContentWrapper pageConfig={pageConfig} data={data} {...props} t={t} />
    );
};

export default Core;
