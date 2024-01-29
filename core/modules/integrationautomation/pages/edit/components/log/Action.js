/* eslint-disable no-nested-ternary */
import React from 'react';
import Link from 'next/link';

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
            display: 'grid',
        },
    },
    menuItem: {
        fontSize: 13,
        color: TEXT_COLOR,
        padding: '6px 16px',
    },
}));

const MenuPopover = (props) => {
    const {
        actions,
        row,
    } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();

    const handleClickOpenButton = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
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
                {actions.map((act, i) => (
                    <MenuItem
                        key={i}
                        component={() => (
                            <Link href={act.link(row.log_id)} passHref>
                                <a target="_blank" className={classes.menuItem}>{act.label}</a>
                            </Link>
                        )}
                    />
                ))}
            </Menu>
        </div>
    );
};

export default MenuPopover;
