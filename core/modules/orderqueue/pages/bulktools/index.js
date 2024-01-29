import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/orderqueue/pages/bulktools/components';
import Core from '@modules/orderqueue/pages/bulktools/core';

const Page = (props) => <Core Content={Content} {...props} />;

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'order', 'bulktools'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
