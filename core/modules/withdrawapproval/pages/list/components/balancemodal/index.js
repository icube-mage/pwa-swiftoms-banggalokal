import React from 'react';
import gqlService from '@modules/withdrawapproval/services/graphql';
import Content from '@modules/withdrawapproval/pages/list/components/balancemodal/view';

const Core = (props) => {
    const { data, loading, error } = gqlService.getAccountIrisBalance();

    const contentProps = {
        data,
        loading,
        error,
        ...props,
    };
    return (
        <Content {...contentProps} />
    );
};

export default Core;
