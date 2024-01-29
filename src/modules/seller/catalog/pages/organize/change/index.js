import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@sellermodules/catalog/pages/organize/change/components';
import Core from '@sellermodules/catalog/pages/organize/change/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'catalog', 'sellercatalog'] });
export default withApollo({ ssr: false })(withTranslation()(Page));
