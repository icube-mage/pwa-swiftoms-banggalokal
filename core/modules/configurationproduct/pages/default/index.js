import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/configurationproduct/pages/default/components';
import Core from '@modules/configurationproduct/pages/default/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'configuration', 'productconfiguration'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
