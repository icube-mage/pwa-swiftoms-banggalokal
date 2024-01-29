import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/batchcreate/pages/manualorder/components';
import Core from '@modules/batchcreate/pages/manualorder/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'createpickbybatch'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
