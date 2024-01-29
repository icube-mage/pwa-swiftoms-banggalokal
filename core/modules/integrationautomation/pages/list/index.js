import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/integrationautomation/pages/list/components';
import Core from '@modules/integrationautomation/pages/list/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'integrationautomation'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
