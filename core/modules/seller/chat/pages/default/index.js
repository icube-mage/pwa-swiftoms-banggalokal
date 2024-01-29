import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@sellermodules/chat/pages/default/components';
import Core from '@sellermodules/chat/pages/default/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'sellerchat'] });
export default withApollo({ ssr: false })(withTranslation()(Page));
