import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/dashboard/pages/default/components';
import Core from '@modules/dashboard/pages/default/core';
import Cookies from 'js-cookie';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => (
    { isSeller: !!Cookies.getJSON('cdt')?.customer_company_code, namespacesRequired: ['common', 'menu', 'dashboard'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
