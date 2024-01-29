/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import useStyles from '@modules/stocktransfer/pages/detailupload/components/style';
import Link from 'next/link';
import Head from 'next/head';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Table from '@common_table';

const detailUploadContent = (props) => {
    const router = useRouter();
    const {
        data, id, loading, t,
    } = props;
    const classes = useStyles();

    const getUploadStockTransferItems = (data && data.getUploadStockTransferItems) || [];

    const columns = [
        { field: 'entity_id', headerName: t('stocktransfer:ID'), hideable: 'true' },
        { field: 'sku', headerName: t('stocktransfer:SKU'), hideable: 'true' },
        { field: 'source_location_code', headerName: t('stocktransfer:Source_Location_Code'), hideable: 'true' },
        { field: 'target_location_code', headerName: t('stocktransfer:Target_Location_Code'), hideable: 'true' },
        { field: 'quantity', headerName: t('stocktransfer:Quantity') },
        { field: 'stock_transfer_increment_id', headerName: t('stocktransfer:Stock_Transfer_Number') },
        { field: 'error_messages', headerName: t('stocktransfer:Error_Messages') },
    ];

    const rows = getUploadStockTransferItems?.map((item, idx) => ({
        ...item,
        error_messages: () => {
            const errmsg = JSON.parse(item.error_messages);

            return (
                <ul>
                    {errmsg?.map((msg, indexmsg) => (
                        <li key={indexmsg}>{msg}</li>
                    ))}
                </ul>
            );
        },
        entity_id: idx + 1,
    }));

    return (
        <>
            <Head>
                <title>
                    {t('stocktransfer:Uploaded_Stock_Transfer_Items_')}
                    {id}
                </title>
            </Head>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/cataloginventory/stocktransfer/import')}
                variant="contained"
                style={{ marginRight: 16 }}
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
            <h2 className={classes.titleTop}>
                {t('stocktransfer:Uploaded_Stock_Transfer_Items_')}
                {id}
            </h2>
            <Paper>
                <Table
                    hideActions
                    hideFilters
                    hideFooter
                    getRows={() => {}}
                    rows={rows}
                    filters={[]}
                    loading={loading}
                    columns={columns}
                    count={rows.length}
                />
            </Paper>
        </>
    );
};

export default detailUploadContent;
