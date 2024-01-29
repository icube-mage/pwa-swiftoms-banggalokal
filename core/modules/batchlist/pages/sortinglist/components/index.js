import React from 'react';
import Table from '@common_table';
import useStyles from '@modules/batchlist/pages/sortinglist/components/style';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@common_button';
import { useRouter } from 'next/router';

const SortingListContent = (props) => {
    const {
        getPickByBatchSortList, data, loading, batchId, t,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const list = (data && data.getPickByBatchSortList && data.getPickByBatchSortList.items) || [];
    const total = (data && data.getPickByBatchSortList && data.getPickByBatchSortList.total_count) || 0;

    const columns = [
        {
            field: 'slot_no',
            headerName: t('batchlist:Slot_No'),
            sortable: true,
            initialSort: 'ASC',
        },
        {
            field: 'shipment_increment_id',
            headerName: t('batchlist:Shipment_Number'),
            sortable: true,
        },
        {
            field: 'sku',
            headerName: t('batchlist:SKU'),
            sortable: true,
        },
        {
            field: 'qty_picked',
            headerName: t('batchlist:QTY'),
            sortable: true,
        },
    ];

    const filters = [
        {
            field: 'parent_id',
            name: 'parent_id',
            type: 'eq',
            label: t('batchlist:Parent_ID'),
            initialValue: batchId,
        },
    ];

    return (
        <>
            <div className={classes.headerContainer}>
                <Button
                    className={classes.btnBack}
                    onClick={() => router.push(`/pickpack/batchlist/edit/${batchId}`)}
                    variant="contained"
                    style={{ marginRight: 10 }}
                >
                    <ChevronLeftIcon
                        style={{
                            fontSize: 30,
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                </Button>
                <h2 className={classes.title}>{t('batchlist:Sorting_List')}</h2>
            </div>
            <Table
                rows={list}
                hideFilters
                hideActions
                hideColumns
                filters={filters}
                getRows={getPickByBatchSortList}
                loading={loading}
                columns={columns}
                count={total}
                hideFooter
                hideHeader
            />
        </>
    );
};

export default SortingListContent;
