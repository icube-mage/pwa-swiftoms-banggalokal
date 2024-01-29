/* eslint-disable no-nested-ternary */
import React from 'react';
import Link from 'next/link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { BORDER_COLOR, PRIMARY_DARK, TEXT_COLOR } from '@theme_color';

const useStyles = makeStyles(() => ({
    btnMore: {
        '& .MuiSvgIcon-root': {
            fill: PRIMARY_DARK,
            height: 15,
            width: 'auto',
        },
    },
    menuAction: {
        '& .MuiMenuItem-root': {
            fontSize: 13,
            color: TEXT_COLOR,
        },
        '& .MuiMenu-paper': {
            marginTop: -10,
        },
        '& .MuiMenu-list': {
            borderRadius: 5,
            border: `1px solid ${BORDER_COLOR}`,
            display: 'grid',
            paddingTop: '10px !important',
            paddingBottom: '10px !important',
        },
    },
    menuItem: {
        fontSize: 13,
        color: TEXT_COLOR,
        padding: '6px 16px',
    },
}));

const TableBodyActionMenu = (props) => {
    const {
        openButton,
        menuItems,
        row,
        isCatalogFailed,
    } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();

    const handleClickOpenButton = (event) => {
        setAnchorEl(event.currentTarget);
        if (openButton && openButton.onClick) openButton.onClick();
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickMenuItem = (onClick) => {
        handleClose();
        if (onClick) onClick();
    };

    return (
        <>
            {(isCatalogFailed && row?.status.code !== 'failed') ? (
                <div style={{ textAlign: 'center' }}>-</div>
            ) : (
                <div>
                    <IconButton
                        onClick={handleClickOpenButton}
                        className={classes.btnMore}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        elevation={0}
                        getContentAnchorEl={null}
                        className={classes.menuAction}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        {menuItems.map((menuItem, i) => {
                            if (menuItem.hide) return null;
                            if (menuItem.link) {
                                return (
                                    <MenuItem
                                        key={i}
                                        component={() => (
                                            <Link href={menuItem.link}>
                                                <a className={classes.menuItem}>{menuItem.label}</a>
                                            </Link>
                                        )}
                                    />
                                );
                            }

                            return (
                                <MenuItem
                                    key={i}
                                    onClick={() => {
                                        handleClickMenuItem(menuItem.onClick);
                                    }}
                                >
                                    {menuItem.label}
                                </MenuItem>
                            );
                        })}
                    </Menu>
                </div>
            )}
        </>
    );
};

export default TableBodyActionMenu;
