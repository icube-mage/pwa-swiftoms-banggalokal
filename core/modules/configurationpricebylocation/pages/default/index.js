import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/configurationpricebylocation/pages/default/components';
import Core from '@modules/configurationpricebylocation/pages/default/core';

const Page = (props) => <Core Content={Content} {...props} />;

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'configuration', 'pricebylocationconfiguration'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
