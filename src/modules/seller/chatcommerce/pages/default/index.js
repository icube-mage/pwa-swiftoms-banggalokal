import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@sellermodules/chatcommerce/pages/default/components';
import Core from '@sellermodules/chatcommerce/pages/default/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'chatcommerce'] });
export default withApollo({ ssr: false })(withTranslation()(Page));
