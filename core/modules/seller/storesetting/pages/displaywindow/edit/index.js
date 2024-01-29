import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@sellermodules/storesetting/pages/displaywindow/edit/components';
import Core from '@sellermodules/storesetting/pages/displaywindow/edit/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'sellerdisplaywindow'] });
export default withApollo({ ssr: false })(withTranslation()(Page));
