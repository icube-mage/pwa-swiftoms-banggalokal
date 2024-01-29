import { withTranslation } from '@i18n';
import Content from '@modules/stockadjustment/pages/edit/components';
import Core from '@modules/stockadjustment/pages/edit/core';
import { withApollo } from '@lib/apollo';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'stockadjustment'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
