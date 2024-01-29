import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/warehouse/pages/create/components';
import Core from '@modules/warehouse/pages/create/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'marketplace'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
