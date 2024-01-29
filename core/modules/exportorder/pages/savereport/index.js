import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/exportorder/pages/savereport/components';
import Core from '@modules/exportorder/pages/savereport/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'order', 'exportorder'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
