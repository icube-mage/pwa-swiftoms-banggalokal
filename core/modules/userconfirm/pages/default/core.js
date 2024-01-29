/* eslint-disable prefer-destructuring */
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import Layout from '@layout';
import BackdropLoad from '@helper_backdropload';

import gqlService from '@modules/userconfirm/services/graphql';
import { getHost } from '@helper_config';

const Core = (props) => {
    const { t } = props;
    const router = useRouter();

    const [confirmUserAccount] = gqlService.confirmUserAccount();

    const pageConfig = {
        title: t('userconfirm:Confirmation'),
        header: false,
        sidebar: false,
    };
    const { email, key } = router.query;

    const confirmUser = () => {
        if (!email && !key) {
            return router.push('/login');
        }
        const input = {
            email,
            key,
            account_url: `${getHost()}/seller/account`,
            login_url: `${getHost()}/login`,
        };
        return confirmUserAccount({
            variables: { input },
        }).then(() => router.push('/login?confirm=success'))
            .catch((e) => {
                Cookies.set('error_confirmation', e.message);
                router.push('/login?confirm=failed');
            });
    };

    React.useEffect(() => {
        BackdropLoad(true);
        confirmUser();
    }, []);

    return (
        <Layout pageConfig={pageConfig} />
    );
};

export default Core;
