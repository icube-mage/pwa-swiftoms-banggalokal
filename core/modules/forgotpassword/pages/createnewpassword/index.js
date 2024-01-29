import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/forgotpassword/pages/createnewpassword/components';
import Core from '@modules/forgotpassword/pages/createnewpassword/core';

const Page = (props) => <Core Content={Content} {...props} />;

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'dashboard', 'forgotpassword'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
