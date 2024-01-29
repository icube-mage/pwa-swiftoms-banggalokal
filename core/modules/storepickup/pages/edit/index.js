import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/storepickup/pages/edit/components';
import Core from '@modules/storepickup/pages/edit/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'storepickup'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
