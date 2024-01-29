import Layout from '@layout';
import Error from '@modules/error/pages/default';
import { useRouter } from 'next/router';
import { getCmsPage } from '@modules/cms/services/graphql';
import BackdropLoad from '@helper_backdropload';

const CmsSlug = (props) => {
    const {
        Content, pageConfig, t,
    } = props;
    const router = useRouter();
    const { slug } = router.query;

    const { data, error, loading } = getCmsPage({ identifier: slug[0] });

    const Config = {
        title: data && data.cmsPage ? data.cmsPage.title : '',
        headerTitle: data && data.cmsPage ? data.cmsPage.title : '',
        bottomNav: false,
        header: 'relative', // available values: "absolute", "relative", false (default)
    };

    React.useEffect(() => {
        BackdropLoad(loading);
    }, [loading]);

    if (loading) {
        return <Layout pageConfig={pageConfig || Config} plainMode />;
    }

    if (!data || error) {
        return <Error statusCode={404} />;
    }

    return (
        <Layout {...props} pageConfig={pageConfig || Config} plainMode>
            <Content
                data={data}
                t={t}
                loading={loading}
                error={error}
            />
        </Layout>
    );
};

export default CmsSlug;
