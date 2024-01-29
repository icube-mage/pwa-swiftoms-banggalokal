/* eslint-disable no-prototype-builtins */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-newline */
import Link from 'next/link';
import IconButton from '@material-ui/core/IconButton';

import Table from '@sellermodules/manageuser/pages/list/components/Table';
import Confirmation from '@sellermodules/manageuser/pages/list/components/Confirmation';

import useStyles from '@sellermodules/manageuser/pages/list/components/style';

const CatalogListContent = (props) => {
    const { data, getSellerUsers, t, dataLocations, handleDelete, dataUser, setDataUser, open, setOpen } = props;
    const classes = useStyles();

    const stockList = (data && data.getSellerUsers && data.getSellerUsers.items) || [];
    const stockTotal = (data && data.getSellerUsers && data.getSellerUsers.total_count) || 0;

    const columns = [
        { field: 'name', headerName: t('sellermanageuser:Name'), sortable: true },
        { field: 'email', headerName: t('sellermanageuser:Email') },
        { field: 'telephone', headerName: t('sellermanageuser:Phone') },
        { field: 'location', headerName: t('sellermanageuser:Location') },
        { field: 'action', headerName: t('sellermanageuser:Action') },
        { field: 'delete', headerName: '' },
    ];

    const handleClickDelete = (user) => {
        setDataUser(user);
        setOpen(true);
    };

    const rows = stockList.map((user) => ({
        ...user,
        location: user.locations.map(({ loc_name }) => loc_name).join(', '),
        action: () => (
            <Link href={`/seller/manageuser/edit/${user.id}`}>
                <a className={classes.link}>{t('sellermanageuser:View')}</a>
            </Link>
        ),
        delete: () => (
            <IconButton onClick={() => handleClickDelete(user)} className={classes.trash}>
                <img src="/assets/img/trash-new.svg" alt="trash" />
            </IconButton>
        ),
    }));

    return (
        <>
            <Table
                {...props}
                header={t('sellermanageuser:Manage_User')}
                columns={columns}
                getRows={getSellerUsers}
                rows={rows}
                count={stockTotal}
                searchPlaceholder={t('sellermanageuser:Search_user_name')}
                dataLocations={dataLocations}
            />
            <Confirmation
                open={open}
                onConfirm={handleDelete}
                onCancel={() => setOpen(false)}
                data={dataUser}
                t={t}
            />
        </>
    );
};

export default CatalogListContent;
