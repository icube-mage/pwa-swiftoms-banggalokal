import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/batchlist/pages/picklistitem/scan/components';
import Core from '@modules/batchlist/pages/picklistitem/scan/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'batchlist'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
