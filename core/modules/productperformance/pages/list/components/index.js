/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Header from '@modules/productperformance/pages/list/components/Header';
import useStyles from '@modules/productperformance/pages/list/components/style';

const ProductPerformanceContent = (props) => {
    const { data, loading, getCompanyList } = props;
    const companyList = (data && data.getCompanyList && data.getCompanyList.items) || [];
    const companyTotal = (data && data.getCompanyList && data.getCompanyList.total_count) || 0;
    const classes = useStyles();

    const columns = [
        { field: 'company_code', headerName: 'Product Name' },
        { field: 'company_id', headerName: 'SKU' },
        { field: 'company_code', headerName: 'Items Sold' },
        { field: 'company_code', headerName: 'Subtotal' },
        { field: 'company_code', headerName: 'Tax' },
        { field: 'company_code', headerName: 'Discounts' },
        { field: 'company_code', headerName: 'Total' },
        { field: 'company_code', headerName: 'Invoiced' },
        { field: 'company_code', headerName: 'Refunded' },
        { field: 'company_code', headerName: 'Total Revenue (excl. Tax)' },
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
                            <th className={classes.th}>Items sold</th>
                            <th className={classes.th}>Total</th>
                            <th className={classes.th}>Invoiced</th>
                        </tr>
                        <tr>
                            <td className={classes.td}>0</td>
                            <td className={classes.td}>0</td>
                            <td className={classes.td}>IDR 0.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Table rows={rows} getRows={getCompanyList} loading={loading} columns={columns} count={companyTotal} />
        </>
    );
};

export default ProductPerformanceContent;
