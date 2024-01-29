import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/productlist/pages/editconfigurable/components';
import Core from '@modules/productlist/pages/editconfigurable/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'catalog'] });
export default withApollo({ ssr: false })(withTranslation()(Page));
