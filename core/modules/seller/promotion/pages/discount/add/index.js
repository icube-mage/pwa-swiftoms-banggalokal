import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@sellermodules/promotion/plugins/SetDiscount';
import Core from '@sellermodules/promotion/pages/discount/add/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'sellerpromotion'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
