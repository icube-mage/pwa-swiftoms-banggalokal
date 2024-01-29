import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@sellermodules/storelist/pages/managestore/components';
import Core from '@sellermodules/storelist/pages/managestore/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'home', 'sellermanagestore'] });
export default withApollo({ ssr: false })(withTranslation()(Page));
