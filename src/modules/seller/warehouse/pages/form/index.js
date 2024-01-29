import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@sellermodules/warehouse/pages/form/components';
import Core from '@sellermodules/warehouse/pages/form/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'home', 'sellerwarehouse'] });
export default withApollo({ ssr: false })(withTranslation()(Page));
