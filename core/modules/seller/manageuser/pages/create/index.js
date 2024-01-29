import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@sellermodules/manageuser/pages/create/components';
import Core from '@sellermodules/manageuser/pages/create/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'sellermanageuser'] });
export default withApollo({ ssr: false })(withTranslation()(Page));
