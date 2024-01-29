import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/marketplace/pages/edit/components';
import Core from '@modules/marketplace/pages/edit/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'marketplace'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
