import Layout from '@layout';
import gqlService from '@modules/configurationemailtemplate/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content, t,
    } = props;

    const pageConfig = {
        title: t('emailtemplatesconfiguration:Email_Templates'),
    };

    const [getEmailTemplateList, { data, loading }] = gqlService.getEmailTemplateList();
    const [deleteEmailTemplate] = gqlService.deleteEmailTemplate();

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'configuration_email_templates',
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
        getEmailTemplateList,
        deleteEmailTemplate,
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
