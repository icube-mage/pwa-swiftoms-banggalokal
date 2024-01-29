import React, { useState } from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';

import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Button from '@common_button';

import { breakPointsUp } from '@helper_theme';
import useStyles from '@sellermodules/storelist/pages/list/components/style';

const RowAction = (props) => {
    const {
        t, menuAction,
    } = props;
    const classes = useStyles();
    const isDesktop = breakPointsUp('sm');
    const [anchor, setAnchor] = useState(null);

    return (
        <>
            {isDesktop ? (
                <Button
                    className={classes.actions}
                    onClick={(e) => setAnchor(e.currentTarget)}
                    endIcon={
                        <KeyboardArrowRightIcon className={anchor ? classes.arrowUp : classes.arrowDown} />
                    }
                >
                    {t('sellerstorelist:Set')}
                </Button>
            )
                : (
                    <IconButton classes={{ root: classes.moreRoot }} onClick={(e) => setAnchor(e.currentTarget)}>
                        <MoreVertIcon />
                    </IconButton>
                )}

            <Menu
                elevation={1}
                getContentAnchorEl={null}
                anchorEl={anchor}
                keepMounted
                open={Boolean(anchor)}
                onClose={() => setAnchor(null)}
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
                {menuAction.map(({ label, action }, actionIndex) => (
                    <MenuItem
                        key={actionIndex}
                        onClick={() => { setAnchor(null); action(); }}
                    >
                        {label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default RowAction;
