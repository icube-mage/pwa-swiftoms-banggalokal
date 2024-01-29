/* eslint-disable no-nested-ternary */
import React from 'react';
import Link from 'next/link';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@common_button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_LIGHT, PRIMARY_DARK, TEXT_COLOR } from '@theme_color';

const useStyles = makeStyles(() => ({
    btnMore: {
        borderRadius: 6,
        background: 'white',
        boxShadow: 'none',
        textTransform: 'capitalize',
        border: '1px solid',
        borderColor: GRAY_LIGHT,
        height: 32,
        color: PRIMARY_DARK,
        '&:hover': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            borderColor: GRAY_LIGHT,
        },
        fontSize: 13,
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
            borderRadius: 8,
            border: `1px solid ${GRAY_LIGHT}`,
            display: 'grid',
        },
    },
    menuItem: {
        color: TEXT_COLOR,
        fontSize: 13,
        padding: '6px 16px',
    },
}));

const ActionContent = (props) => {
    const {
        openButton,
        menuItems,
        t,
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
        <div>
            <Button
                onClick={handleClickOpenButton}
                className={classes.btnMore}
                endIcon={
                    <ExpandMoreIcon />
                }
            >
                {t('storesetting:Manage')}
            </Button>
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
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {menuItems.map((menuItem, i) => (menuItem.hide ? null
                    : (menuItem.link
                        ? (
                            <MenuItem
                                key={i}
                                component={() => (
                                    <Link href={menuItem.link}>
                                        <a className={classes.menuItem}>{menuItem.label}</a>
                                    </Link>
                                )}
                                className={classes.menuItem}
                            />
                        )
                        : (
                            <MenuItem key={i} onClick={() => handleClickMenuItem(menuItem.onClick)}>
                                {menuItem.label}
                            </MenuItem>
                        )
                    )))}
            </Menu>
        </div>
    );
};

export default ActionContent;
