import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@sellermodules/plugins/guide/components';
import Core from '@sellermodules/plugins/guide/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'guide'] });
export default withApollo({ ssr: false })(withTranslation()(Page));
