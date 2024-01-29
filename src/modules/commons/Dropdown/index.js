import React from 'react';
import Button from '@common_button/index';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useStyles from '@common_dropdown/style';
import clsx from 'clsx';
import { BLACK } from '@theme_color';

const Dropdown = ({
    className,
    menuActiveLabel = 'Label',
    menuList = [],
    onClickMenuItem,
}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onClickItem = (item) => {
        handleClose();
        onClickMenuItem(item);
    };

    if (menuList?.length < 1) return null;
    return (
        <div className={clsx(className, 'dropdown-container', classes.dropdownContainer)}>
            <Button
                bg="transparent"
                color={BLACK}
                classic
                classicButtonLabel={menuActiveLabel}
                classicButtonOnClick={handleClick}
                classicButtonIconRight={
                    <img src="/assets/img/icon_chevron_down.svg" alt="icon right dropdown" />
                }
            />
            <Menu
                id="simple-menu"
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {
                    menuList && menuList?.map((item, index) => (
                        <MenuItem
                            key={`menu-item-${index}`}
                            onClick={() => onClickItem(item)}
                        >
                            {item?.name ?? ''}
                        </MenuItem>
                    ))
                }
            </Menu>
        </div>
    );
};

export default Dropdown;
