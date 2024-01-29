import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/configurationshipment/pages/default/components';
import Core from '@root/core/modules/configurationshipment/pages/default/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'configuration', 'shipmentconfiguration'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
