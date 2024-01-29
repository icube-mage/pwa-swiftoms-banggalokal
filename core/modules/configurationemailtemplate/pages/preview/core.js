import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/configurationemailtemplate/services/graphql';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const { t, Content } = props;
    const router = useRouter();

    const pageConfig = {
        title: t('emailtemplatesconfiguration:Template_Preview'),
    };

    const { loading, data, error } = gqlService.previewTemplateById({
        variables: { id: router && router.query && Number(router.query.id) },
        onError: (e) => {
            window.toastMessage({
                open: true,
                text: e.message || t('emailtemplatesconfiguration:Something_went_wrong_while_trying_to_show_template_preview'),
                variant: 'error',
            });
            setTimeout(() => window.close(), 1500);
        },
    });

    React.useEffect(() => {
        BackdropLoad(loading);
    }, [loading]);

    if (loading) {
        return <Layout pageConfig={pageConfig} plainMode />;
    }

    if (!data && error) {
        return <Layout pageConfig={pageConfig} plainMode />;
    }

    const contentProps = {
        ...props,
        template: data?.previewTemplateById,
    };

    return (
        <Layout pageConfig={pageConfig} plainMode>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
