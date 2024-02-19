import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@sellermodules/pyb/facebookads/components';
import Core from '@sellermodules/pyb/facebookads/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common'] });
export default withApollo({ ssr: false })(withTranslation()(Page));
