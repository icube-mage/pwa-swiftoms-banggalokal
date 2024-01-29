import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/configurationfinance/pages/default/components';
import Core from '@modules/configurationfinance/pages/default/core';

const Page = (props) => <Core Content={Content} {...props} />;

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'configuration', 'financeconfiguration'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
