import React from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_LIGHT, PRIMARY_DARK, TEXT_COLOR } from '@theme_color';

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
            borderRadius: 8,
            border: `1px solid ${GRAY_LIGHT}`,
        },
    },
}));

const MenuPopover = (props) => {
    const {
        openButton,
        menuItems,
        buttonType = 'primary-rounded',
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
            <IconButton
                buttonType={buttonType}
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
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {menuItems.map((menuItem, i) => (menuItem.hide ? null
                    : (
                        <MenuItem key={i} onClick={() => handleClickMenuItem(menuItem.onClick)}>
                            {menuItem.label}
                        </MenuItem>
                    )
                ))}
            </Menu>
        </div>
    );
};

export default MenuPopover;
