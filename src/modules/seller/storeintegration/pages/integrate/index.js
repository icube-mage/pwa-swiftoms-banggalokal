import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@sellermodules/storeintegration/pages/integrate/components';
import Core from '@sellermodules/storeintegration/pages/integrate/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'home', 'sellerstoreintegration'] });
export default withApollo({ ssr: false })(withTranslation()(Page));
