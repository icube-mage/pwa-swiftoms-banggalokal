import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/inventoryaudittrail/pages/list/components';
import Core from '@modules/inventoryaudittrail/pages/list/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'inventoryaudittrail'] });
export default withApollo({ ssr: false })(withTranslation()(Page));
