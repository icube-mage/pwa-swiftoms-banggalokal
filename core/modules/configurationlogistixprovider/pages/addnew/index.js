import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/configurationlogistixprovider/pages/addnew/components';
import Core from '@modules/configurationlogistixprovider/pages/addnew/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'configuration', 'logistixproviderconfiguration'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
