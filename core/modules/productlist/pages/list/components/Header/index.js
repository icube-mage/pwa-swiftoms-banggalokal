/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/productlist/pages/list/components/Header/style';
import clsx from 'clsx';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const HeaderContent = (props) => {
    const classes = useStyles();
    const router = useRouter();
    const { handleFetchManual, aclProductList, handleSyncToMarketplace, t, aclSyncToMp } = props;

    const menuCreate = [
        {
            label: t('productlist:Simple_Product'),
            onClick: () => router.push('/product/productlist/create'),
        },
        {
            label: t('productlist:Bundle_Product'),
            onClick: () => router.push('/product/productlist/createbundle'),
        },
        {
            label: t('productlist:Configurable_Product'),
            onClick: () => router.push('/product/productlist/createconfigurable'),
        },
    ];

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickMenuItem = (onClick) => {
        handleClose();
        if (onClick) onClick();
    };

    const handleClickOpenButton = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('productlist:Product')}</h2>
            <div className={classes.buttonContainer}>
                {
                    aclSyncToMp && (
                        <Button
                            className={classes.buttonAdd}
                            onClick={handleSyncToMarketplace}
                            style={{ marginRight: 10 }}
                        >
                            {t('productList:Sync_All_to_Marketplace')}
                        </Button>
                    )
                }
                {
                    aclProductList.product_fetch_from_marketplace && (
                        <Button className={classes.buttonAdd} onClick={handleFetchManual}>
                            {t('productlist:Fetch_from_Marketplace')}
                        </Button>
                    )
                }
                {
                    aclProductList.product_export && (
                        <Button
                            className={clsx(classes.buttonAdd, 'mid')}
                            onClick={() => router.push('/product/productlist/export')}
                            style={{ marginRight: 10 }}
                        >
                            {t('productlist:Export')}
                        </Button>
                    )
                }
                {
                    aclProductList.product_create && (
                        <>
                            <Button
                                className={classes.buttonAdd}
                                style={{ marginRight: 10 }}
                                onClick={handleClickOpenButton}
                            >
                                {t('productlist:Create')}
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                {menuCreate.map((menuItem, i) => (
                                    <MenuItem key={i} onClick={() => handleClickMenuItem(menuItem.onClick)}>
                                        {menuItem.label}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default HeaderContent;
