import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/source/pages/importdata/components';
import Core from '@modules/source/pages/importdata/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'source'] });
export default withApollo({ ssr: false })(withTranslation()(Page));
