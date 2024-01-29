/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Button from '@common_button';
import TextField from '@common_textfield';

import { isEmpty } from '@sellermodules/storesetting/plugins/ProductTable/Table/helpers';
import useStyles from '@sellermodules/storesetting/plugins/ProductTable/Table/style';
import React from 'react';

const TabsHeader = (props) => {
    const {
        searchPlaceholder = '', filters = [], setFilters,
        search, setSearch, t, setSorts, sorts,
    } = props;

    const menuSort = [
        {
            label: `${t('storesetting:Name')}: A - Z`,
            field: 'name',
            value: 'ASC',
        },
        {
            label: `${t('storesetting:Name')}: Z - A`,
            field: 'name',
            value: 'DESC',
        },
        {
            label: t('storesetting:Highest_Price'),
            field: 'price_formatted',
            value: 'DESC',
        },
        {
            label: t('storesetting:Lowest_Price'),
            field: 'price_formatted',
            value: 'ASC',
        },
    ];

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [sortSelected, setSortSelected] = React.useState({});

    const handleClickOpenButton = (event, set) => {
        set(event.currentTarget);
    };

    const handleReset = () => {
        setSearch('');
        setFilters([]);
        setSorts();
        setSortSelected({});
    };

    const getArrowClass = (anchor) => (anchor ? classes.arrowUp : classes.arrowDown);

    const setSortByField = (field) => {
        setSorts({ field: field.field, value: field.value });
        setSortSelected(field);
    };
    React.useEffect(() => {
        if (!sorts) {
            setSortSelected({});
        }
    }, [sorts]);

    return (
        <Paper className={classes.paperHead}>
            <div className={classes.tableToolbar}>
                <div className="top-buttons-wrapper nopad">
                    <div className="top-item-left">
                        <div className="top-item">
                            <TextField
                                placeholder={searchPlaceholder}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className={classes.textInput}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <img alt="" src="/assets/img/search.svg" className={classes.iconImg} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                    </div>
                    <div className="top-item-right">
                        <div className="top-item">
                            <Button
                                className={clsx(classes.btnAdd, 'gray')}
                                onClick={(e) => handleClickOpenButton(e, setAnchorEl)}
                                endIcon={
                                    <KeyboardArrowRightIcon className={getArrowClass(anchorEl)} />
                                }
                            >
                                {t('storesetting:Sort_By')}
                            </Button>
                            <Menu
                                elevation={0}
                                getContentAnchorEl={null}
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
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
                                {menuSort.map((menuItem, i) => (
                                    <MenuItem
                                        key={i}
                                        href={menuItem.link}
                                        onClick={() => { setSortByField(menuItem); setAnchorEl(null); }}
                                        className={classes.menuItem}
                                    >
                                        {menuItem.label}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>
                    </div>
                </div>
                <div className={classes.expandContainer}>
                    <Collapse in={!!(search || !filters.filter((filt) => filt.name !== 'status').every((field) => isEmpty(field.value))
                        || !!sortSelected?.label)}
                    >
                        <Grid
                            container
                            spacing={3}
                            alignContent="center"
                            alignItems="center"
                            className={classes.expandGrid}
                        >
                            {(!!search || !filters.every((field) => isEmpty(field.value)) || !!sortSelected?.label)
                                && (
                                    <Grid item xs="auto" className="filter-item-button">
                                        <Button
                                            className={classes.btnFilterText}
                                            onClick={handleReset}
                                        >
                                            {t('common:Reset_Filter')}
                                        </Button>
                                    </Grid>
                                )}
                            {!!search
                                && (
                                    <Grid item className="filter-item">
                                        {search}
                                        <IconButton className={classes.closeButton} onClick={() => setSearch('')}>
                                            <CloseIcon className={classes.closeIcon} />
                                        </IconButton>
                                    </Grid>
                                )}
                            {!!sortSelected?.label
                                && (
                                    <Grid item className="filter-item">
                                        {sortSelected.label}
                                        <IconButton className={classes.closeButton} onClick={() => { setSortSelected({}); setSorts(); }}>
                                            <CloseIcon className={classes.closeIcon} />
                                        </IconButton>
                                    </Grid>
                                )}
                        </Grid>
                    </Collapse>
                </div>
            </div>
        </Paper>
    );
};

export default TabsHeader;
