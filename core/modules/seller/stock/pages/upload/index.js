import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@sellermodules/stock/pages/upload/components';
import Core from '@sellermodules/stock/pages/upload/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'stock', 'sellerstock'] });
export default withApollo({ ssr: false })(withTranslation()(Page));
