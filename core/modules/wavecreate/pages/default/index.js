import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/wavecreate/pages/default/components';
import Core from '@modules/wavecreate/pages/default/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'createpickbywave'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
