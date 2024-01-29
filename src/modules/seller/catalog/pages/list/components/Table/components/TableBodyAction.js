/* eslint-disable no-shadow */
import React from 'react';
import TableBodyActionMenu from '@sellermodules/catalog/pages/list/components/Table/components/TableBodyActionMenu';
import { useRouter } from 'next/router';
import { breakPointsUp } from '@helper_theme';

const TableBodyAction = ({
    t,
    row,
    setProductSelected,
    isCatalogFailed,
}) => {
    const router = useRouter();
    const desktop = breakPointsUp('sm');

    const rowActions = React.useMemo(() => [
        {
            label: t('sellercatalog:Edit_Product'),
            confirmDialog: true,
            hide: !desktop || isCatalogFailed,
            onClick: (row) => {
                router.push({
                    pathname: '/seller/catalog/product/edit/[id]',
                    query: { id: row.entity_id },
                });
            },
            link: (row) => `/seller/catalog/product/edit/${row.entity_id}`,
        },
        {
            label: t('sellercatalog:Duplicate_Product'),
            confirmDialog: true,
            hide: isCatalogFailed,
            onClick: (row) => {
                router.push({
                    pathname: '/seller/catalog/product/duplicate/[id]',
                    query: { id: row.entity_id },
                });
            },
            message: t('common:Are_you_sure_want_to_delete_selected_items'),
            link: (row) => `/seller/catalog/product/duplicate/${row.entity_id}`,
        },
        {
            label: t('Remove_Product'),
            confirmDialog: true,
            hide: isCatalogFailed,
            message: t('common:Are_you_sure_want_to_delete_selected_items'),
            onClick: (row) => setProductSelected(row),
        },
        {
            label: t('common:sync_retry'),
            confirmDialog: true,
            hide: !isCatalogFailed,
            onClick: (row) => {
                setProductSelected({
                    ...row,
                    message_title: t('common:sync_retry'),
                    message_content: t('common:sync_retry_confirmation', { name: row?.name }),
                    sync: true,
                });
            },
        },
    ], [desktop]);

    return (
        <TableBodyActionMenu
            openButton={{ label: '' }}
            row={row}
            isCatalogFailed={isCatalogFailed}
            menuItems={
                rowActions.map((action) => ({
                    label: action.label,
                    hide: action.hide,
                    onClick: () => action.onClick(row),
                    link: action.link ? action.link(row) : null,
                }))
            }
        />
    );
};

export default TableBodyAction;
