/* eslint-disable no-nested-ternary */
/* eslint-disable object-curly-newline */
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import IconButton from '@material-ui/core/IconButton';
import Radio from '@material-ui/core/Radio';

import AddIcon from '@material-ui/icons/Add';

import Button from '@common_button';
import Table from '@common_tableseller';
import Switch from '@common_switch';
import Alert from '@common_alert';
import ConfirmModal from '@sellermodules/warehouse/pages/list/components/ConfirmModal';

import { breakPointsUp } from '@helper_theme';
import MobileList from '@sellermodules/warehouse/pages/list/components/MobileList';
import useStyles from '@sellermodules/warehouse/pages/list/components/style';

const WarehouseListContent = (props) => {
    const { t, getSellerStores, data, loading, handleAction,
    } = props;

    const router = useRouter();
    const classes = useStyles();
    const isDesktop = breakPointsUp('sm');
    const [openDialog, setOpenDialog] = React.useState(false);
    const [productSelected, setProductSelected] = React.useState({});

    const storeList = (data && data.getSellerStores && data.getSellerStores.items) || [];
    const storeTotal = (data && data.getSellerStores && data.getSellerStores.total_count) || 0;

    const columns = [
        { field: 'id', headerName: 'ID', hidden: true },
        { field: 'loc_name', headerName: t('sellerwarehouse:Location_Name'), sortable: true },
        { field: 'street', headerName: t('sellerwarehouse:Address'), hiddenMobile: true },
        { field: 'city', headerName: t('sellerwarehouse:City__Districts') },
        { field: 'postcode', headerName: t('sellerwarehouse:Postcode'), hiddenMobile: true },
        { field: 'status', headerName: t('sellerwarehouse:Status'), hiddenMobile: true },
        { field: 'main_location', headerName: t('sellerwarehouse:Main_Location'), centering: true, hiddenMobile: true },
        { field: 'action', headerName: t('sellerwarehouse:Action'), hiddenMobile: true },
        { field: 'delete', headerName: '', hiddenMobile: true },
    ];

    const rows = storeList.map((store) => ({
        ...store,
        id: store.id,
        loc_name: store.name,
        status: () => (
            <Switch
                name="sync"
                trueLabel=""
                falseLabel=""
                useLabel={false}
                value={store.is_active}
                onChange={(e) => handleAction({ input: { id: store.id, is_active: e.target.checked } }, 'status')}
                rootClass={classes.switch}
            />
        ),
        main_location: () => (
            <Radio
                color="default"
                classes={{
                    root: classes.radioRoot,
                    checked: classes.radioCheckedRoot,
                }}
                checked={store.is_default}
                onClick={() => (store.is_default ? null : handleAction({ loc_id: store.id, is_default: true }, 'is_default'))}
            />
        ),
        action: () => (
            <Link href={`/seller/warehouse/edit/${store.id}`}>
                <a className={classes.link}>{t('sellerwarehouse:Edit')}</a>
            </Link>
        ),
        delete: () => (
            <IconButton
                onClick={() => {
                    if (store.is_default) {
                        window.toastMessage({
                            open: true,
                            text: t('sellerwarehouse:You_cannot_delete_the_main_location'),
                            variant: 'error',
                        });
                    } else {
                        setOpenDialog(true);
                        setProductSelected(store);
                    }
                }}
                classes={{ root: classes.iconButtonRoot }}
            >
                <img src="/assets/img/delete-trash-purple.svg" alt="trash" className={classes.trash} />
            </IconButton>
        ),
    }));

    return (
        <div className={classes.container}>
            <div className={classes.headerContainer}>
                <div className={classes.header}>{t('sellerwarehouse:Manage_Location')}</div>
                <Button
                    startIcon={<AddIcon />}
                    onClick={() => router.push('/seller/warehouse/add')}
                >
                    {t('sellerwarehouse:Add_Location')}
                </Button>
            </div>
            <Alert
                info={t('sellerwarehouse:section_info_warehouse')}
            />
            {isDesktop
                ? (
                    <Table
                        hideHead
                        loading={loading}
                        columns={columns}
                        getRows={getSellerStores}
                        rows={rows}
                        count={storeTotal}
                    />
                )
                : (
                    <MobileList
                        {...props}
                        loading={loading}
                        columns={columns}
                        getRows={getSellerStores}
                        rows={rows}
                        count={storeTotal}
                    />
                )}
            <ConfirmModal productSelected={productSelected} openDialog={openDialog} setOpenDialog={setOpenDialog} {...props} />
        </div>
    );
};

export default WarehouseListContent;
