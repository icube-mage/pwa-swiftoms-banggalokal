import Layout from '@layout';
import gqlService from '@modules/productcategory/services/graphql';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const [pullProductCategory, { data, loading }] = gqlService.pullProductCategory();

    const contentProps = {
        pullProductCategory,
        data,
        loading,
        t,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
