import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@modules/userconfirm/pages/default/core';

const Page = (props) => <Core {...props} />;

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'dashboard', 'userconfirm'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
