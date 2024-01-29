/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Header from '@modules/salesoverview/pages/list/components/Header';
import useStyles from '@modules/salesoverview/pages/list/components/style';

const SalesOverviewListContent = (props) => {
    const { data, loading, getCompanyList } = props;
    const companyList = (data && data.getCompanyList && data.getCompanyList.items) || [];
    const companyTotal = (data && data.getCompanyList && data.getCompanyList.total_count) || 0;
    const classes = useStyles();

    const columns = [
        { field: 'company_code', headerName: 'Period' },
        { field: 'company_id', headerName: 'Number of Orders' },
        { field: 'company_code', headerName: 'Items Ordered' },
        { field: 'company_code', headerName: 'Subtotal' },
        { field: 'company_code', headerName: 'Tax' },
        { field: 'company_code', headerName: 'Shiping' },
        { field: 'company_code', headerName: 'Discounts' },
        { field: 'company_code', headerName: 'Other Discounts' },
        { field: 'company_code', headerName: 'Total' },
        { field: 'company_code', headerName: 'Invoiced' },
        { field: 'company_code', headerName: 'Refunded' },
        { field: 'company_code', headerName: 'Avg. Order Value' },
        { field: 'company_code', headerName: 'Avg. Item Final Price' },
    ];

    const rows = companyList.map((company) => ({
        ...company,
        id: company.company_id,
    }));

    return (
        <>
            <Header />
            <div className={classes.container}>
                <table className={classes.table}>
                    <tbody>
                        <tr className={classes.tr}>
                            <th className={classes.th}>Number of orders</th>
                            <th className={classes.th}>Items ordered</th>
                            <th className={classes.th}>Total</th>
                            <th className={classes.th}>Invoiced</th>
                        </tr>
                        <tr>
                            <td className={classes.td}>0</td>
                            <td className={classes.td}>0</td>
                            <td className={classes.td}>IDR 0.00</td>
                            <td className={classes.td}>IDR 0.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Table rows={rows} getRows={getCompanyList} loading={loading} columns={columns} count={companyTotal} />
        </>
    );
};

export default SalesOverviewListContent;
