/* eslint-disable eol-last */
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/configurationorder/pages/default/components';
import Core from '@modules/configurationorder/pages/default/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'configuration', 'orderconfiguration'] });

export default withApollo({ ssr: false })(withTranslation()(Page));