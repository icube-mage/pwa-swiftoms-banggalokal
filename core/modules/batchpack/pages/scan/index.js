import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/batchpack/pages/scan/components';
import Core from '@modules/batchpack/pages/scan/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'packlist'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
