import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/managepromotion/pages/list/components';
import Core from '@modules/managepromotion/pages/list/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'managepromotion'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
