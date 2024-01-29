import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/orderslireport/pages/default/components';
import Core from '@modules/orderslireport/pages/default/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'orderslireport'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
