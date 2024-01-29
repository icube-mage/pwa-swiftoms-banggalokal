import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@sellermodules/order/pages/printinvoice/components';
import Core from '@sellermodules/order/pages/printinvoice/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'order', 'sellerorder'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
