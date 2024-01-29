/* eslint-disable object-curly-newline */
import React from 'react';
import Router from 'next/router';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/productattributes/pages/list/components/Header';
import CustomList from '@common_customlist';
import { breakPointsUp } from '@helper_theme';

const ProductAttributesContent = (props) => {
    const { data, loading, getConfigurableAttributes, deleteConfigurableAttributes, t } = props;
    const attributesList = (data && data.getConfigurableAttributes && data.getConfigurableAttributes.items) || [];
    const attributesTotal = (data && data.getConfigurableAttributes && data.getConfigurableAttributes.total_count) || 0;

    const desktop = breakPointsUp('sm');

    const columns = [
        { field: 'frontend_label', headerName: t('productattributes:Attribute_Label'), sortable: true, initialSort: 'ASC', hideable: true },
        { field: 'attribute_code', headerName: t('productattributes:Attribute_Code'), sortable: true, hideable: true },
        { field: 'actions', headerName: t('productattributes:Action'), hidden: !desktop },
    ];

    const filters = [
        { field: 'frontend_label', name: 'frontend_label', type: 'like', label: t('productattributes:Attribute_Label'), initialValue: '' },
        { field: 'attribute_code', name: 'attribute_code', type: 'like', label: t('productattributes:Attribute_Code'), initialValue: '' },
    ];

    const rows = attributesList.map((attributes) => ({
        ...attributes,
        id: attributes.attribute_id,
        actions: () => (
            <Link href={`/product/productattributes/edit/${attributes.attribute_id}`}>
                <a className="link-button">{t('productattributes:View')}</a>
            </Link>
        ),
    }));

    const actions = [
        {
            label: t('common:Delete'),
            message: t('common:Are_you_sure_want_to_delete_selected_items'),
            confirmDialog: true,
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                await deleteConfigurableAttributes({ variables }).then(() => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: t('productattributes:The_product_attribute_has_been_deleted'),
                        variant: 'success',
                    });
                }).catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
            },
        },
    ];

    return (
        <>
            <Header t={t} />
            {
                desktop ? (
                    <Table
                        filters={filters}
                        rows={rows}
                        getRows={getConfigurableAttributes}
                        actions={actions}
                        loading={loading}
                        columns={columns}
                        count={attributesTotal}
                        showCheckbox
                        recordName={t('productattributes:Product_Attributes')}
                    />
                ) : (
                    <CustomList
                        filters={filters}
                        rows={rows}
                        getRows={getConfigurableAttributes}
                        actions={actions}
                        loading={loading}
                        columns={columns}
                        count={attributesTotal}
                        showCheckbox
                        recordName={t('productattributes:Product_Attributes')}
                        hideColumn={false}
                        checkboxAll
                        twoColumns
                        handleClickRow={(id) => Router.push(`/product/productattributes/edit/${id}`)}
                        usePagination
                    />
                )
            }
        </>
    );
};

export default ProductAttributesContent;
