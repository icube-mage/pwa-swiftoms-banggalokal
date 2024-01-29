import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/configurationopenapi/pages/default/components';
import Core from '@modules/configurationopenapi/pages/default/core';

const Page = (props) => <Core Content={Content} {...props} />;

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'configuration', 'openapiconfiguration'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
