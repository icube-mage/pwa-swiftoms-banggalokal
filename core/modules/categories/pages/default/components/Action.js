import React from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    ERROR, GRAY_LIGHT, PRIMARY_DARK, TEXT_COLOR,
} from '@theme_color';

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
        '& .MuiMenu-list': {
            borderRadius: 6,
            background: 'white',
            border: `1px solid ${GRAY_LIGHT}`,
        },
    },
    red: {
        color: ERROR,
    },
    divider: {
        borderTop: `1px solid ${GRAY_LIGHT}`,
        margin: '10px 5px',
    },
}));

const MenuPopover = (props) => {
    const {
        openButton,
        t,
        node,
        parent,
        setNodeAct,
        setOpen,
        formik,
        setAddMode,
    } = props;
    const { id, level } = node;
    const { id: parentId } = parent;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();

    const handleClickOpenButton = (event) => {
        setNodeAct(node);
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
        if (openButton && openButton.onClick) openButton.onClick();
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickMenuItem = (event, onClick) => {
        event.stopPropagation();
        handleClose();
        if (onClick) onClick();
    };

    const scrollToName = () => {
        const keyName = 'name';
        const nodeHtml = document.getElementsByName(keyName);
        nodeHtml[0].scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        nodeHtml[0].focus();
    };

    const menu = [
        {
            label: t('sellercatalog:New_category_before'),
            onClick: () => {
                setAddMode(true);
                formik.setValues({
                    name: '',
                    is_active: true,
                    description: '',
                    level,
                    before: id,
                    parent_id: parentId,
                });
                setTimeout(() => { scrollToName(); }, 100);
            },
        },
        {
            label: t('sellercatalog:New_category_after'),
            onClick: () => {
                setAddMode(true);
                formik.setValues({
                    name: '',
                    is_active: true,
                    description: '',
                    level,
                    after: id,
                    parent_id: parentId,
                });
                setTimeout(() => { scrollToName(); }, 100);
            },
        },
        {
            label: t('sellercatalog:New_subcategory'),
            onClick: () => {
                setAddMode(true);
                formik.setValues({
                    name: '',
                    is_active: true,
                    description: '',
                    level: level + 1,
                    parent_id: id,
                });
                setTimeout(() => { scrollToName(); }, 100);
            },
            hide: level >= 3,
        },
    ];

    return (
        <div>
            <IconButton
                onClick={handleClickOpenButton}
                className={classes.btnMore}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
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
                {menu.map((menuItem, i) => (menuItem.hide ? null
                    : (
                        <MenuItem key={i} onClick={(e) => handleClickMenuItem(e, menuItem.onClick)}>
                            {menuItem.label}
                        </MenuItem>
                    )
                ))}
                <div className={classes.divider} />
                <MenuItem onClick={(e) => handleClickMenuItem(e, setOpen(true))}>
                    <span className={classes.red}>{t('sellercatalog:Delete')}</span>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default MenuPopover;
