import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@sellermodules/storesetting/pages/default/components';
import Core from '@sellermodules/storesetting/pages/default/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'storesetting'] });
export default withApollo({ ssr: false })(withTranslation()(Page));
