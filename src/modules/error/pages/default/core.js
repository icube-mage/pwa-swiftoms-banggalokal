import { withTranslation } from '@i18n';
import { useRouter } from 'next/router';
import { loginRedirect } from '@config';

const Error = (props) => {
    const {
        statusCode, Content, isSeller,
    } = props;
    const router = useRouter();
    if (typeof window !== 'undefined' && isSeller && router.route === '/') {
        router.replace(loginRedirect.seller);
        return <div />;
    }
    const statusCodes = {
        400: 'Bad Request',
        404: 'This page could not be found',
        405: 'Method Not Allowed',
        500: 'Internal Server Error',
    };

    // eslint-disable-next-line react/destructuring-assignment
    const title = props.title || statusCodes[statusCode] || 'An unexpected error has occurred';

    return (
        <Content statusCode={statusCode} title={title} isSeller={isSeller} />
    );
};

export default withTranslation()(Error);
