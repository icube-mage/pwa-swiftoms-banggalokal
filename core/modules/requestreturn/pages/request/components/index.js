/* eslint-disable no-unused-vars */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/requestreturn/pages/request/components/Header';
import useStyles from '@modules/requestreturn/pages/request/components/style';
import { useRouter } from '@root/node_modules/next/router';

const RequestReturnContent = (props) => {
    const {
        data, loading, getRequestReturnList, emailParam, oderNumberParam, channelCodeParam,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const {
        email, order_number, channel_code, from,
    } = router.query;

    const RequestReturnList = (data && data.getRequestReturnList && data.getRequestReturnList.items) || [];
    const RequestReturnTotal = (data && data.getRequestReturnList && data.getRequestReturnList.total_count) || 0;

    if (!loading && data && data.getRequestReturnList && RequestReturnTotal === 0) {
        router.push(
            `/requestreturn/return/return?email=${email}&order_number=${order_number}&channel_code=${channel_code}${from ? `&from=${from}` : ''}`,
        );
        return <></>;
    }

    const columns = [
        { field: 'increment_id', headerName: 'Increment ID #' },
        { field: 'status_label', headerName: 'Status' },
        { field: 'actions', headerName: 'Action' },
    ];

    const filters = [
        {
            field: 'customer_email',
            name: 'customer_email',
            type: 'eq',
            label: '',
            initialValue: emailParam,
        },
        {
            field: 'channel_order_increment_id',
            name: 'channel_order_increment_id',
            type: 'eq',
            label: '',
            initialValue: oderNumberParam,
        },
        {
            field: 'channel_code',
            name: 'channel_code',
            type: 'eq',
            label: '',
            initialValue: channelCodeParam,
        },
    ];

    const rows = RequestReturnList.map((requestreturn) => ({
        ...requestreturn,
        id: requestreturn.id,
        actions: () => (
            <Link href={`/requestreturn/request/edit/${requestreturn.id}`}>
                <a className="link-button">View</a>
            </Link>
        ),
    }));

    return (
        <div className={classes.body}>
            <Header />
            <Table
                filters={filters}
                rows={rows}
                getRows={getRequestReturnList}
                loading={loading}
                columns={columns}
                count={RequestReturnTotal}
                hideActions
                hideColumns
                hideFilters
            />
        </div>
    );
};

export default RequestReturnContent;
