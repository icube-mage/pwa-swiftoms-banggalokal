import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@sellermodules/stock/pages/organize/components';
import Core from '@sellermodules/stock/pages/organize/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'sellerstock'] });
export default withApollo({ ssr: false })(withTranslation()(Page));
