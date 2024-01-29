import { useRouter } from 'next/router';
import Layout from '@layout';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useTranslation } from '@i18n';

const Message = dynamic(() => import('@common_toast'), { ssr: false });

const ErrorRedirect = (props) => {
    const { t } = useTranslation('common');
    const {
        errMsg, redirect, pageConfig = null, isSeller = false,
    } = props;
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        if (router && redirect) {
            setTimeout(() => {
                router.push(redirect);
            }, 2000);
        }
    }, [router]);

    const message = errMsg === 'graphql-authorization'
        ? `${t('Your_session_has_expired')} ${t('Please_login_again')}` : errMsg;

    return (
        <>
            <Message open={isOpen} setOpen={(stat) => setTimeout(() => setIsOpen(stat), 5000)} variant="error" message={message} />
            <Layout pageConfig={pageConfig} seller={isSeller}>
                <div
                    style={{
                        display: 'flex',
                        color: '#435179',
                        fontWeight: 600,
                        justifyContent: 'center',
                        padding: '20px 0',
                    }}
                >
                    {message}
                </div>
            </Layout>
        </>
    );
};

export default ErrorRedirect;
