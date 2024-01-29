import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@sellermodules/return/pages/list/components';
import Core from '@sellermodules/return/pages/list/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'sellerreturn'] });
export default withApollo({ ssr: false })(withTranslation()(Page));
