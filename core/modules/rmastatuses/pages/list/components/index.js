/* eslint-disable object-curly-newline */
import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Table from '@common_table';
import CustomList from '@common_customlist';
import Header from '@modules/rmastatuses/pages/list/components/Header';
import { breakPointsUp } from '@helper_theme';

const RmaStatusesListContent = (props) => {
    const { data, loading, getRmaStatusList, t } = props;
    const rmaStatusesList = (data && data.getRmaStatusList && data.getRmaStatusList.items) || [];
    const rmaStatusesTotal = (data && data.getRmaStatusList && data.getRmaStatusList.total_count) || 0;
    const desktop = breakPointsUp('sm');

    const columns = [
        { field: 'status_code', headerName: t('rmastatuses:Code'), hideable: true, sortable: 'true' },
        { field: 'status_label', headerName: t('rmastatuses:Title'), hideable: true, sortable: 'true' },
        { field: 'position', headerName: t('rmastatuses:Position'), hideable: true, sortable: 'true' },
        { field: 'actions', headerName: t('rmastatuses:Action') },
    ];

    const rows = rmaStatusesList.map((rmaStatuses) => ({
        ...rmaStatuses,
        id: rmaStatuses.status_code,
        actions: () => (
            <Link href={`/return/rmastatuses/edit/${rmaStatuses.status_code}`}>
                <a className="link-button">{t('rmastatuses:View')}</a>
            </Link>
        ),
    }));

    return (
        <>
            <Header t={t} />
            {desktop ? (
                <Table
                    hideActions
                    hideFilters
                    hideColumns
                    rows={rows}
                    getRows={getRmaStatusList}
                    loading={loading}
                    columns={columns}
                    count={rmaStatusesTotal}
                />
            )
                : (
                    <CustomList
                        hideActions
                        hideFilters
                        hideColumns
                        rows={rows}
                        getRows={getRmaStatusList}
                        loading={loading}
                        columns={columns}
                        count={rmaStatusesTotal}
                        twoColumns
                        handleClickRow={(id) => Router.push(`/return/rmastatuses/edit/${id}`)}
                        usePagination
                    />
                )}
        </>
    );
};

export default RmaStatusesListContent;
