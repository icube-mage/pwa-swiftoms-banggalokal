import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/printoms/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const { data, Content, storeLogo } = props;
    const invoicelist = data.getInvoice;

    const invoiceList = {
        date: invoicelist.print_date,
        datainvoice: invoicelist.data,
    };

    const contentProps = {
        invoiceList,
        storeLogo,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data, error } = gqlService.getInvoice({
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
