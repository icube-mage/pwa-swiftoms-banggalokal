import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@sellermodules/onlinestore/pages/default/components';
import Core from '@sellermodules/onlinestore/pages/default/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'home', 'selleronlinestore'] });
export default withApollo({ ssr: false })(withTranslation()(Page));
