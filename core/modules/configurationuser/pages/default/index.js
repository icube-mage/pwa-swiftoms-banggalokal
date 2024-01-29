import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/configurationuser/pages/default/components';
import Core from '@modules/configurationuser/pages/default/core';

const Page = (props) => <Core Content={Content} {...props} />;

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'configuration', 'userconfiguration'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
