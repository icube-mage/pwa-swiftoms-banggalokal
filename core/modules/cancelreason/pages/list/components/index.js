/* eslint-disable object-curly-newline */
import React from 'react';
import Router from 'next/router';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/cancelreason/pages/list/components/Header';
import CustomList from '@common_customlist';
import { breakPointsUp } from '@helper_theme';

const CancelReasonListContent = (props) => {
    const { data, loading, getCancelReasonList, deleteCancelReason, t } = props;
    const cancelReasonList = (data && data.getCancelReasonList && data.getCancelReasonList.items) || [];
    const cancelReasonTotal = (data && data.getCancelReasonList && data.getCancelReasonList.total_count) || 0;

    const desktop = breakPointsUp('sm');

    const columns = [
        { field: 'entity_id', headerName: t('cancelreason:ID'), sortable: true, initialSort: 'ASC', hideable: true },
        { field: 'reason_code', headerName: t('cancelreason:Reason_Code'), sortable: true, hideable: true },
        { field: 'reason_label', headerName: t('cancelreason:Reason_Label'), sortable: true, hideable: true },
        { field: 'actions', headerName: t('cancelreason:Action'), hideable: true, hidden: !desktop },
    ];

    const filters = [
        { field: 'entity_id', name: 'id_from', type: 'from', label: t('cancelreason:ID_From'), initialValue: '' },
        { field: 'entity_id', name: 'id_to', type: 'to', label: t('cancelreason:ID_To'), initialValue: '' },
        { field: 'reason_code', name: 'reason_code', type: 'like', label: t('cancelreason:Reason_Code'), initialValue: '' },
        { field: 'reason_label', name: 'reason_label', type: 'like', label: t('cancelreason:Reason_Label'), initialValue: '' },
    ];

    const rows = cancelReasonList.map((cancelreason) => ({
        ...cancelreason,
        id: cancelreason.entity_id,
        actions: () => (
            <Link href={`/configurations/cancelreason/edit/${cancelreason.entity_id}`}>
                <a className="link-button">{t('cancelreason:View')}</a>
            </Link>
        ),
    }));

    return (
        <>
            <Header t={t} />
            {
                desktop ? (
                    <Table
                        filters={filters}
                        rows={rows}
                        getRows={getCancelReasonList}
                        deleteRows={deleteCancelReason}
                        loading={loading}
                        columns={columns}
                        count={cancelReasonTotal}
                        showCheckbox
                    />
                ) : (
                    <CustomList
                        filters={filters}
                        rows={rows}
                        getRows={getCancelReasonList}
                        deleteRows={deleteCancelReason}
                        loading={loading}
                        columns={columns}
                        count={cancelReasonTotal}
                        showCheckbox
                        hideColumn={false}
                        checkboxAll
                        twoColumns
                        handleClickRow={(id) => Router.push(`/configurations/cancelreason/edit/${id}`)}
                        usePagination
                    />
                )
            }
        </>
    );
};

export default CancelReasonListContent;
