import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@sellermodules/register/pages/termscondition/components';
import Core from '@sellermodules/register/pages/termscondition/core';

const Page = (props) => <Core Content={Content} {...props} />;

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'dashboard', 'registerseller'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
