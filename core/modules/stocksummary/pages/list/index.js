import { withTranslation } from '@i18n';
import Content from '@modules/stocksummary/pages/list/components';
import Core from '@modules/stocksummary/pages/list/core';
import { withApollo } from '@lib/apollo';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'stocksummary'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
