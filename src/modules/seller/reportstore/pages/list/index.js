import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@sellermodules/reportstore/pages/list/components';
import Core from '@sellermodules/reportstore/pages/list/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'sellerreport'] });
export default withApollo({ ssr: false })(withTranslation()(Page));
