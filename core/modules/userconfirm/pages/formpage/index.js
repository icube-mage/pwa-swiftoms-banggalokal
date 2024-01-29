import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/userconfirm/pages/formpage/components';
import Core from '@modules/userconfirm/pages/formpage/core';

const Page = (props) => <Core Content={Content} {...props} />;

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'dashboard', 'userconfirm'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
