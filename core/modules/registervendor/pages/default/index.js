import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/registervendor/pages/default/components';
import Core from '@modules/registervendor/pages/default/core';

const Page = (props) => <Core Content={Content} {...props} />;

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'dashboard', 'registervendor'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
