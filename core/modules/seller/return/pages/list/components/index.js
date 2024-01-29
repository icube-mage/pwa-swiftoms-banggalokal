/* eslint-disable object-curly-newline */
import Link from 'next/link';
import { useRouter } from 'next/router';

import Table from '@sellermodules/return/pages/list/components/Table';
import useStyles from '@modules/seller/return/pages/list/components/style';

const CatalogListContent = (props) => {
    const {
        data, loading, getSellerReturnList, t, categories, dataLocations, dataReturnType, dataStatus,
    } = props;
    const retList = (data && data.getSellerReturnList && data.getSellerReturnList.items) || [];
    const retTotal = (data && data.getSellerReturnList && data.getSellerReturnList.total_count) || 0;
    const router = useRouter();
    const classes = useStyles();

    const columns = [
        { field: 'channel_order_increment_id', headerName: t('sellerreturn:Order_Number'), sortable: true },
        { field: 'status_label', headerName: t('sellerreturn:Status'), hidden: !!router.query.status },
        { field: 'created_at', headerName: t('sellerreturn:Request_Date'), sortable: true, initialSort: 'DESC' },
        { field: 'return_type_label', headerName: t('sellerreturn:Return_Type') },
        { field: 'customer', headerName: t('sellerreturn:Customer') },
        { field: 'location', headerName: t('sellerreturn:Location') },
        { field: 'action', headerName: t('sellerreturn:Action') },
    ];

    const rows = retList.map((ret) => ({
        ...ret,
        status: ret.status?.label,
        return_type_label: dataReturnType.find(({ code }) => code === ret.return_type)?.title,
        customer: `${ret.customer_name}, ${ret.customer_email}`,
        location: ret.loc_name.join(', '),
        action: () => (
            <Link href={`/seller/return/detail/${ret.id}`}>
                <a className={classes.link}>{t('sellermanageuser:View')}</a>
            </Link>
        ),
    }));

    return (
        <Table
            header={t('sellerreturn:Return')}
            columns={columns}
            getRows={getSellerReturnList}
            rows={rows}
            loading={loading}
            count={retTotal}
            searchPlaceholder={t("sellerreturn:Search_for_buyer's_name_or_order_number")}
            t={t}
            categories={categories}
            dataLocations={dataLocations}
            dataReturnType={dataReturnType}
            dataStatus={dataStatus}
        />
    );
};

export default CatalogListContent;
