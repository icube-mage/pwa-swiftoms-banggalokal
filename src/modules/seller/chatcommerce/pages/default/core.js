import Layout from '@layout';
import useStyles from '@sellermodules/chatcommerce/pages/default/components/style';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const pageConfig = {
        title: t('chat_commerce'),
        noPaddingContainer: true,
    };

    const classes = useStyles();

    const contentProps = {
        t,
        classes,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
