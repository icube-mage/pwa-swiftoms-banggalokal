import React from 'react';
import Layout from '@layout';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;
    const pageConfig = {
        title: t('storesetting:Banner_Video_Guide'),
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <Content {...props} />
        </Layout>
    );
};

export default Core;
