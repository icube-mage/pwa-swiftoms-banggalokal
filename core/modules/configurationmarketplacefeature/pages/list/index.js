import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/configurationmarketplacefeature/pages/list/components';
import Core from '@modules/configurationmarketplacefeature/pages/list/core';

const Page = (props) => <Core Content={Content} {...props} />;

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'configuration', 'marketplacefeatureconfiguration'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
