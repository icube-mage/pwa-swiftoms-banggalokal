/* eslint-disable */
import React from 'react';
import Router from 'next/router';
import Table from '@common_table';
import Header from '@modules/support/informationupdate/pages/list/components/Header';
import CustomList from '@common_customlist';
import { breakPointsUp } from '@helper_theme';

const InformationUpdateListContent = (props) => {
    const { t } = props;
    const { data, loading, getInformationUpdateList, deleteInformationUpdate } = props;
    const InformationUpdateList = (data && data.getInformationUpdateList && data.getInformationUpdateList.items) || [];
    const InformationUpdateTotal = (data && data.getInformationUpdateList && data.getInformationUpdateList.total_count) || 0;

    const desktop = breakPointsUp('sm');

    const columns = [
        { field: 'image', headerName: t('image')},
        { field: 'title', headerName: t('title')},
        { field: 'inserted_at', headerName: t('publish_at'), sortable: true, initialSort: 'DESC'},
    ];

    const filters = [
        { field: 'title', name: 'title', type: 'like', label: t('title'), initialValue: '' },
    ];

    const rows = InformationUpdateList.map((list) => ({
        ...list,
        id: list.entity_id,
        image: () => (list.image ? (
                <img src={list.image} style={{border: "1px #ccc solid", borderRadius: 5, background: "#f5f5f5", width: 100, minHeight: 100, maxHeight: 150 }}/>
            ) : (
                <div style={{border: "1px #ccc solid", borderRadius: 5, background: "#f5f5f5", width: 100, height: 100, textAlign: "center", paddingTop: 34, color: "#ccc" }}>No Image</div>
            )
        ),
        title: () => {
            return (<div>
                <strong>{list.title}</strong>
                <p>{list.short_content}</p>
            </div>);
        },
    }));

    return (
        <>
            <Header t={t} />
            {
                desktop ? (
                    <Table
                        filters={filters}
                        rows={rows}
                        getRows={getInformationUpdateList}
                        deleteRows={deleteInformationUpdate}
                        loading={loading}
                        columns={columns}
                        count={InformationUpdateTotal}
                        showCheckbox
                        recordName="channel"
                    />
                ) : (
                    <CustomList
                        filters={filters}
                        rows={rows}
                        getRows={getInformationUpdateList}
                        deleteRows={deleteInformationUpdate}
                        loading={loading}
                        columns={columns}
                        count={InformationUpdateTotal}
                        showCheckbox
                        recordName="channel"
                        hideColumn={false}
                        checkboxAll
                        twoColumns
                        handleClickRow={(id) => Router.push(`/oms/channel/edit/${id}`)}
                        usePagination
                    />
                )
            }
        </>
    );
};

export default InformationUpdateListContent;
