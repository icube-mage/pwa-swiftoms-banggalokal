import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@sellermodules/dashboard/pages/default/components';
import Core from '@sellermodules/dashboard/pages/default/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common'] });
export default withApollo({ ssr: false })(withTranslation()(Page));
