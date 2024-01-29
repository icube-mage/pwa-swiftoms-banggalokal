/* eslint-disable linebreak-style */
import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/configurationrma/pages/default/components';
import Core from '@modules/configurationrma/pages/default/core';

const Page = (props) => <Core Content={Content} {...props} />;

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'configuration', 'returnconfiguration'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
