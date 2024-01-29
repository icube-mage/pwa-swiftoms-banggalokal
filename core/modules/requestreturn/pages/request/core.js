/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
import React, { useEffect } from 'react';
import gqlService from '@modules/requestreturn/services/graphql';
import Layout from '@layout';

const Core = (props) => {
    const {
        Content,
    } = props;

    const [getRequestReturnList, { data, loading }] = gqlService.getRequestReturnList();
    const [emailParam, setEmailParam] = React.useState('');
    const [oderNumberParam, setOrderNumberParam] = React.useState('');
    const [channelCodeParam, setChannelCodeParam] = React.useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            setEmailParam(urlParams.get('email'));
            setOrderNumberParam(urlParams.get('order_number'));
            setChannelCodeParam(urlParams.get('channel_code'));
        }
    }, []);

    if (!emailParam || !oderNumberParam || !channelCodeParam) {
        return (
            <span>Loading...</span>
        );
    }

    const contentProps = {
        getRequestReturnList,
        data,
        loading,
        emailParam,
        oderNumberParam,
        channelCodeParam,
    };

    const pageConfig = {
        header: false,
        sidebar: false,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
