import Layout from '@layout';
import gqlService from '@modules/configurationacceptancedeadline/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content, t,
    } = props;

    const pageConfig = {
        title: t('acceptancedeadlineconfiguration:Acceptance_Deadline'),
    };

    const [getAcceptanceDeadlineList, { data, loading }] = gqlService.getAcceptanceDeadlineList();
    const [deleteAcceptanceDeadline] = gqlService.deleteAcceptanceDeadline();

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'acceptance_deadline',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading);
    }, [aclCheckLoading]);

    if (aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        getAcceptanceDeadlineList,
        deleteAcceptanceDeadline,
        data,
        loading,
        ...props,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
