/* eslint-disable object-curly-newline */
import React from 'react';
import Router from 'next/router';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/failedreason/pages/list/components/Header';
import CustomList from '@common_customlist';
import { breakPointsUp } from '@helper_theme';

const FailedReasonListContent = (props) => {
    const { data, loading, getOrderFailedReasonList, t } = props;
    const failedReasonList = (data && data.getOrderFailedReasonList && data.getOrderFailedReasonList.items) || [];
    const failedReasonTotal = (data && data.getOrderFailedReasonList && data.getOrderFailedReasonList.total_count) || 0;

    const desktop = breakPointsUp('sm');

    const columns = [
        { field: 'reason_code', headerName: t('failedreason:Reason_Code') },
        { field: 'reason_label', headerName: t('failedreason:Reason_Label') },
        { field: 'edit', headerName: '', hidden: !desktop },
    ];

    const rows = failedReasonList.map((failedreason) => ({
        ...failedreason,
        edit: () => (
            <Link href={`/configurations/failedreason/edit/${failedreason.reason_code}`}>
                <a className="link-button">{t('failedreason:Edit')}</a>
            </Link>
        ),
    }));

    return (
        <>
            <Header t={t} />
            {
                desktop ? (
                    <Table
                        rows={rows}
                        getRows={getOrderFailedReasonList}
                        loading={loading}
                        columns={columns}
                        count={failedReasonTotal}
                        hideActions
                        hideFilters
                        hideColumns
                    />
                ) : (
                    <CustomList
                        rows={rows}
                        getRows={getOrderFailedReasonList}
                        loading={loading}
                        columns={columns}
                        count={failedReasonTotal}
                        hideActions
                        hideFilters
                        twoColumns
                        handleClickRow={(id) => Router.push(`/configurations/failedreason/edit/${id}`)}
                        usePagination
                    />
                )
            }
        </>
    );
};

export default FailedReasonListContent;
