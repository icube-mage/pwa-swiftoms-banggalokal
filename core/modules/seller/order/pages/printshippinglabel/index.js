import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@sellermodules/order/pages/printshippinglabel/components';
import Core from '@sellermodules/order/pages/printshippinglabel/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'sellerorder'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
