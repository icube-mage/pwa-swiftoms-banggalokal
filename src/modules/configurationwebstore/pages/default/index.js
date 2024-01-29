import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/configurationwebstore/pages/default/components';
import Core from '@modules/configurationwebstore/pages/default/core';

const Page = (props) => <Core Content={Content} {...props} />;

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'webstoreconfiguration'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
