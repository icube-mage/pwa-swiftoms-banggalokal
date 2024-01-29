import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@sellermodules/promotion/pages/discount/upload/components';
import Core from '@sellermodules/promotion/pages/discount/upload/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'sellerpromotion'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
