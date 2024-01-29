import React from 'react';
import Layout from '@layout';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;
    const pageConfig = {
        title: t('sellercatalog:Change_at_Once'),
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <Content {...props} />
        </Layout>
    );
};

export default Core;
