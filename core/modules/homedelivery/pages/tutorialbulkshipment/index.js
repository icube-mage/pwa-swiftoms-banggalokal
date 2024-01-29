import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/homedelivery/pages/tutorialbulkshipment/components';
import Core from '@modules/homedelivery/pages/tutorialbulkshipment/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'homedelivery'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
