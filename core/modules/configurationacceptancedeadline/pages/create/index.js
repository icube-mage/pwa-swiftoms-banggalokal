import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/configurationacceptancedeadline/pages/create/components';
import Core from '@modules/configurationacceptancedeadline/pages/create/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['menu', 'common', 'configuration', 'acceptancedeadlineconfiguration'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
