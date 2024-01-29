import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/login/pages/default/components';
import Core from '@modules/login/pages/default/core';

const Page = (props) => <Core Content={Content} {...props} />;

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'dashboard', 'login', 'selleraccount'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
