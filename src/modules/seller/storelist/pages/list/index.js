import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@sellermodules/storelist/pages/list/components';
import Core from '@sellermodules/storelist/pages/list/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'home', 'sellerstorelist'] });
export default withApollo({ ssr: false })(withTranslation()(Page));
