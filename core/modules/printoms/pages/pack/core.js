import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/printoms/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const { data, Content, storeLogo } = props;
    const packlist = data.getPackList;

    const packList = {
        title: packlist.title,
        dataPack: packlist.data,
        createdBy: packlist.created_by,
        checkedBy: packlist.checked_by,
        approvedBy: packlist.approved_by,
        receivedBy: packlist.received_by,
        slot: ['10', '22', '55'],
    };

    const contentProps = {
        packList,
        storeLogo,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data, error } = gqlService.getPackList({
        id: router && router.query && router.query.slug.map((e) => Number(e)),
    });

    React.useEffect(() => {
        BackdropLoad(loading);
    }, [loading]);

    if (loading) {
        return <Layout />;
    }

    if (!data) {
        const errMsg = error?.message ?? 'Data not found!';
        const redirect = '/';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    return <ContentWrapper data={data} {...props} />;
};

export default Core;
