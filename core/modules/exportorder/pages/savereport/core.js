import React, { useEffect } from 'react';
import Layout from '@layout';
import gqlService from '@modules/exportorder/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        Content,
        t,
    } = props;

    const router = useRouter();
    const queryExport = router.query.export;
    const queryDateFrom = router.query.date_from;
    const queryDateTo = router.query.date_to;

    const [pdfDetail, setPdfDetail] = React.useState(null);

    const [getOrderReportPdf, { loading }] = gqlService.getOrderReportPdf({
        variables: {
            export: queryExport,
            date_from: queryDateFrom,
            date_to: queryDateTo,
        },
        onCompleted: (res) => {
            if (res && res.getOrderReportPdf && res.getOrderReportPdf) {
                setPdfDetail(res.getOrderReportPdf);
            }
        },
    });

    const printPdf = {
        print_date: pdfDetail && pdfDetail.print_date,
        data: pdfDetail && pdfDetail.data,
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'export_order',
    });

    const contentProps = {
        printPdf,
        aclCheckData,
        t,
    };

    useEffect(() => {
        getOrderReportPdf();
    }, []);

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading || loading);
    }, [aclCheckLoading, loading]);

    if (aclCheckLoading || loading) {
        return <Layout plainMode />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => (
    <>
        <ContentWrapper {...props} />
    </>
);

export default Core;
