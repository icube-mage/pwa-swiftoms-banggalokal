import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/configurationpybgoogle/pages/default/components';
import Core from '@modules/configurationpybgoogle/pages/default/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'configuration'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
