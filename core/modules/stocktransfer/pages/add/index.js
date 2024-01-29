import { withTranslation } from '@i18n';
import Content from '@modules/stocktransfer/pages/add/components';
import Core from '@modules/stocktransfer/pages/add/core';
import { withApollo } from '@lib/apollo';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'stocktransfer'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
