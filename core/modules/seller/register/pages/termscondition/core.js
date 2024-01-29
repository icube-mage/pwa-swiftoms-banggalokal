/* eslint-disable prefer-destructuring */
import Layout from '@layout';

const Core = (props) => {
    const { t, Content } = props;

    const pageConfig = {
        header: false,
        sidebar: false,
        title: t('registerseller:Terms_and_Condition'),
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...props} />
        </Layout>
    );
};

export default Core;
