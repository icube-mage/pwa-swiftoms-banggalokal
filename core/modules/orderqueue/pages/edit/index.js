import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/orderqueue/pages/edit/components';
import Core from '@modules/orderqueue/pages/edit/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'order'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
