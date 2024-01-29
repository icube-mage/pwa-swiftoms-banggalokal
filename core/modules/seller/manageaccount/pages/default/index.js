import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@sellermodules/manageaccount/pages/default/components';
import Core from '@sellermodules/manageaccount/pages/default/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'seller', 'selleraccount'] });
export default withApollo({ ssr: false })(withTranslation()(Page));
