import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/unauthorized/pages/default/components';
import Core from '@modules/unauthorized/pages/default/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
