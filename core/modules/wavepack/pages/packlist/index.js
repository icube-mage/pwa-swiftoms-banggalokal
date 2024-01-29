import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/wavepack/pages/packlist/components';
import Core from '@modules/wavepack/pages/packlist/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'packlist'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
