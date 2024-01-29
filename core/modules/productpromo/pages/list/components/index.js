/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-expressions */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/productpromo/pages/list/components/Header';
import TextField from '@common_textfield';
import useStyles from '@modules/productpromo/pages/list/components/style';

const ProductPromoListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getMarketplaceProductPromoList, updateMarketplaceProductPromoToMp, t } = props;
    const productPromoList = (data && data.getMarketplaceProductPromoList && data.getMarketplaceProductPromoList.items) || [];
    const productPromoTotal = (data && data.getMarketplaceProductPromoList && data.getMarketplaceProductPromoList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: t('productpromo:ID'), sortable: true, hideable: true },
        { field: 'channel_store_id', headerName: t('productpromo:Channel_Store_ID'), hideable: true },
        { field: 'name', headerName: t('productpromo:Promo_Name'), sortable: true, hideable: true },
        { field: 'start_date', headerName: t('productpromo:Start_Date'), sortable: true, hideable: true },
        { field: 'end_date', headerName: t('productpromo:End_Date'), sortable: true, hideable: true },
        { field: 'updated_at', headerName: t('productpromo:Updated_At'), hideable: true },
        { field: 'actions', headerName: t('productpromo:Action'), hideable: true },
    ];

    const filters = [
        { field: 'entity_id', name: 'id_from', type: 'from', label: t('productpromo:ID_From'), initialValue: '' },
        { field: 'entity_id', name: 'id_to', type: 'to', label: t('productpromo:ID_To'), initialValue: '' },
        {
            field: 'start_date',
            name: 'start_date_from',
            type: 'from',
            label: t('productpromo:Start_Date_From'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue?.split(' ').slice(0, 1).join('')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        newValue.target.value ? setFilterValue(`${newValue.target.value} 00:00:00`)
                            : setFilterValue(`${newValue.target.value}`);
                    }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),

        },
        {
            field: 'start_date',
            name: 'start_date_to',
            type: 'to',
            label: t('productpromo:Start_Date_To'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue?.split(' ').slice(0, 1).join('')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        newValue.target.value ? setFilterValue(`${newValue.target.value} 23:59:59`)
                            : setFilterValue(`${newValue.target.value}`);
                    }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        {
            field: 'end_date',
            name: 'end_date_from',
            type: 'from',
            label: t('productpromo:End_Date_From'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue?.split(' ').slice(0, 1).join('')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        newValue.target.value ? setFilterValue(`${newValue.target.value} 00:00:00`)
                            : setFilterValue(`${newValue.target.value}`);
                    }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),

        },
        {
            field: 'end_date',
            name: 'end_date_to',
            type: 'to',
            label: t('productpromo:End_Date_To'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue?.split(' ').slice(0, 1).join('')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        newValue.target.value ? setFilterValue(`${newValue.target.value} 23:59:59`)
                            : setFilterValue(`${newValue.target.value}`);
                    }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        { field: 'name', name: 'name', type: 'like', label: t('productpromo:Promo_Name'), initialValue: '' },
    ];

    const rows = productPromoList.map((productPromo) => ({
        ...productPromo,
        id: productPromo.entity_id,
        actions: () => (
            <Link href={`/marketplace/productpromo/item/${productPromo.entity_id}`}>
                <a className="link-button">{t('productpromo:View')}</a>
            </Link>
        ),
    }));

    const actions = [
        {
            label: t('productpromo:Update_to_marketplace'),
            message: t('productpromo:Are_you_sure_you_want_to_update'),
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                await updateMarketplaceProductPromoToMp({ variables });
            },

            confirmDialog: true,
            showMessage: true,
        },
    ];

    return (
        <>
            <Header t={t} />
            <Table
                filters={filters}
                actions={actions}
                rows={rows}
                getRows={getMarketplaceProductPromoList}
                loading={loading}
                columns={columns}
                count={productPromoTotal}
                showCheckbox
            />
        </>
    );
};

export default ProductPromoListContent;
