/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/adminstore/pages/list/components/Header';
import Autocomplete from '@common_autocomplete';
import gqlService from '@modules/adminstore/services/graphql';

const AdminStoreContent = (props) => {
    const { data, loading, getAdminStoreList, groupOptions, t } = props;
    const adminList = (data && data.getAdminStoreList && data.getAdminStoreList.items) || [];
    const adminTotal = (data && data.getAdminStoreList && data.getAdminStoreList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: t('alluser:ID'), sortable: true },
        { field: 'name', headerName: t('alluser:Name'), hideable: true, sortable: true },
        { field: 'email', headerName: t('alluser:Email'), hideable: true, sortable: true },
        { field: 'location', headerName: t('alluser:Location'), hideable: true },
        { field: 'group_label', headerName: t('alluser:Group'), hideable: true },
        { field: 'actions', headerName: t('alluser:Action'), hideable: true },
    ];

    const rows = adminList.map((admin) => ({
        ...admin,
        id: admin.entity_id,
        location: admin.customer_loc_code.join(', '),
        name: `${admin.firstname} ${admin.lastname}`,
        actions: () => (
            <Link href={`/userdata/adminstore/edit/${admin.entity_id}`}>
                <a className="link-button">{t('alluser:View')}</a>
            </Link>
        ),
    }));

    const filters = [
        { field: 'entity_id', name: 'entity_id_from', type: 'from', label: t('alluser:ID_from'), initialValue: '' },
        { field: 'entity_id', name: 'entity_id_to', type: 'to', label: t('alluser:ID_to'), initialValue: '' },
        { field: 'name', name: 'name', type: 'like', label: t('alluser:Name'), initialValue: '' },
        { field: 'email', name: 'email', type: 'like', label: t('alluser:Email'), initialValue: '' },
        {
            field: 'group_id',
            name: 'group_id',
            type: 'like',
            label: t('alluser:Group'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const options = groupOptions.slice().map((item) => ({
                    name: item.label,
                    id: item.value,
                }));
                return (
                    <Autocomplete
                        value={options.find((e) => e.id === filterValue)}
                        onChange={(newValue) => setFilterValue(newValue && newValue.id)}
                        options={options}
                    />
                );
            },
        },
    ];

    const [deleteAdminStore] = gqlService.deleteAdminStore();

    return (
        <>
            <Header t={t} />
            <Table
                rows={rows}
                getRows={getAdminStoreList}
                loading={loading}
                columns={columns}
                count={adminTotal}
                filters={filters}
                deleteRows={deleteAdminStore}
                showCheckbox
                hideColumns
                recordName="user"
            />
        </>
    );
};

export default AdminStoreContent;
