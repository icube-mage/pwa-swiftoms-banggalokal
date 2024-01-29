import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/productbulktools/pages/tutorialproductimage/components';
import Core from '@modules/productbulktools/pages/tutorialproductimage/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'catalog', 'productbulktools'] });
export default withApollo({ ssr: false })(withTranslation()(Page));
