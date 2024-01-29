/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/aclgroup/pages/list/components/Header';
import gqlService from '@modules/aclgroup/services/graphql';

const AclGroupContentList = (props) => {
    const { data, loading, getCustomerGroupList, t } = props;
    const groupList = (data && data.getCustomerGroupList && data.getCustomerGroupList.items) || [];
    const groupTotal = (data && data.getCustomerGroupList && data.getCustomerGroupList.total_count) || 0;

    const columns = [
        { field: 'customer_group_id', headerName: t('usergroup:ID'), sortable: true, hideable: true },
        { field: 'customer_group_code', headerName: t('usergroup:Group'), sortable: true, hideable: true },
        { field: 'action', headerName: t('usergroup:Action') },
    ];

    const rows = groupList.map((group) => ({
        ...group,
        id: Number(group.customer_group_id),
        label: group.customer_group_code,
        action: () => (
            <Link href={`/userdata/group/edit/${group.customer_group_id}?name=${group.customer_group_code}`}>
                <a className="link-button">{t('usergroup:View')}</a>
            </Link>
        ),
    }));

    const [deleteUserGroup] = gqlService.deleteUserGroup();

    return (
        <>
            <Header t={t} />
            <Table
                rows={rows}
                getRows={getCustomerGroupList}
                loading={loading}
                columns={columns}
                count={groupTotal}
                deleteRows={deleteUserGroup}
                showCheckbox
                hideFilters
                recordName="acl"
            />
        </>
    );
};

export default AclGroupContentList;
