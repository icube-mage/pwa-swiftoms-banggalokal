import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/prioritylocationbyzone/pages/list/components';
import Core from '@modules/prioritylocationbyzone/pages/list/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'master'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
