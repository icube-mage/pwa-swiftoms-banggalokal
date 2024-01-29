import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/dashboard/pages/edit/components';
import Core from '@modules/dashboard/pages/edit/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'dashboard'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
