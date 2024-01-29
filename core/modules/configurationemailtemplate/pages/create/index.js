import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/configurationemailtemplate/pages/create/components';
import Core from '@modules/configurationemailtemplate/pages/create/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['menu', 'common', 'configuration', 'emailtemplatesconfiguration'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
