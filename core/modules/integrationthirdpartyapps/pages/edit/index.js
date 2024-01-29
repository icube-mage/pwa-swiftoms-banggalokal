import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/integrationthirdpartyapps/pages/edit/components';
import Core from '@modules/integrationthirdpartyapps/pages/edit/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'integrationthirdpartyapps'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
