import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/categories/pages/default/components';
import Core from '@modules/categories/pages/default/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'categories', 'catalog'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
