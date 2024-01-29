import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@sellermodules/storelist/pages/managelocation/components';
import Core from '@sellermodules/storelist/pages/managelocation/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'home', 'sellerstorelist'] });
export default withApollo({ ssr: false })(withTranslation()(Page));
