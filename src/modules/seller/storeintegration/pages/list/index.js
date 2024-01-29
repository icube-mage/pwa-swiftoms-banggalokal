import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@sellermodules/storeintegration/pages/list/components';
import Core from '@sellermodules/storeintegration/pages/list/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'home', 'sellerstoreintegration', 'ecommercechannel'] });
export default withApollo({ ssr: false })(withTranslation()(Page));
