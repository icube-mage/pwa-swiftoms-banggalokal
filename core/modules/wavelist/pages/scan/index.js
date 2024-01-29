import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/wavelist/pages/scan/components';
import Core from '@modules/wavelist/pages/scan/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'picklist'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
