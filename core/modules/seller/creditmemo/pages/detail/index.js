import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@sellermodules/creditmemo/pages/detail/components';
import Core from '@sellermodules/creditmemo/pages/detail/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'sellercreditmemo'] });
export default withApollo({ ssr: false })(withTranslation()(Page));
