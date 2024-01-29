import { withApollo } from '@lib_apollo';
import { withTranslation } from '@i18n';
import Content from '@modules/cms/pages/default/components';
import Core from '@modules/cms/pages/default/core';

const Page = (props) => (<Core {...props} Content={Content} />);

Page.getInitialProps = async () => ({ namespacesRequired: ['common'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
