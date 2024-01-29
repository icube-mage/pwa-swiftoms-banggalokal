import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/configurationinventory/pages/default/components';
import Core from '@modules/configurationinventory/pages/default/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'configuration', 'inventoryconfiguration'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
