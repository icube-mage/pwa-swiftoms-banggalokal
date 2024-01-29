import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@sellermodules/income/pages/list/components';
import Core from '@sellermodules/income/pages/list/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'sellerincome'] });
export default withApollo({ ssr: false })(withTranslation()(Page));
