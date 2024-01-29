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

import { useDebounce, isEmpty } from '@sellermodules/storesetting/plugins/ProductModal/Table/helpers';
import useStyles from '@sellermodules/storesetting/plugins/ProductModal/Table/style';

const TabsHeader = (props) => {
    const {
        searchPlaceholder = '', filters = [], setFilters,
        search, setSearch, t, setSorts,
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
            field: 'price',
            value: 'DESC',
        },
        {
            label: t('storesetting:Lowest_Price'),
            field: 'price',
            value: 'ASC',
        },
    ];

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [filterCat, setFilterCat] = React.useState([]);
    const [filterCatName, setFilterCatName] = React.useState([]);
    const [sortSelected, setSortSelected] = React.useState({});
    const debouncedFilterCat = useDebounce(filterCat, 100);

    const handleClickOpenButton = (event, set) => {
        set(event.currentTarget);
    };

    const insertFilter = (field, array = []) => {
        const index = filters.findIndex((filter) => filter.name === field.name);
        const temp = [...array];
        if (index >= 0) {
            temp.splice(index, 1, field);
        } else {
            temp.push(field);
        }
        return temp;
    };

    const handleChecked = (check, v) => {
        const id = String(v.id);
        if (check) {
            setFilterCat((prev) => [...prev, id]);
            setFilterCatName((prev) => [...prev, v]);
        } else {
            setFilterCat((prev) => prev.filter((p) => p !== id));
            setFilterCatName((prev) => prev.filter((p) => p.id !== v.id));
        }
    };

    const handleReset = () => {
        setSearch('');
        setFilterCat([]);
        setFilterCatName([]);
        setFilters([]);
        setSorts([]);
        setSortSelected({});
    };

    const getArrowClass = (anchor) => (anchor ? classes.arrowUp : classes.arrowDown);

    const setSortByField = (field) => {
        setSorts([{ field: field.field, value: field.value }]);
        setSortSelected(field);
    };

    React.useEffect(() => {
        const catTemp = {
            field: 'category_id',
            name: 'category_id',
            type: 'in',
            value: '',
        };
        let temp = [...filters];

        filterCat.forEach((cat) => {
            catTemp.value = [...catTemp.value, cat];
        });
        temp = insertFilter(catTemp, temp);

        setFilters([...temp]);
    }, [debouncedFilterCat]);

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
                        <div className={classes.expandGrid} style={{ marginTop: 20 }}>
                            {(!!search || !filters.every((field) => isEmpty(field.value)) || !!sortSelected?.label)
                                && (
                                    <Button
                                        className={classes.btnFilterText}
                                        onClick={handleReset}
                                    >
                                        {t('common:Reset_Filter')}
                                    </Button>
                                )}
                            <Grid
                                container
                                spacing={3}
                                alignContent="center"
                                alignItems="center"
                            >
                                {!!search
                                    && (
                                        <Grid item className="filter-item">
                                            {search}
                                            <IconButton className={classes.closeButton} onClick={() => setSearch('')}>
                                                <CloseIcon className={classes.closeIcon} />
                                            </IconButton>
                                        </Grid>
                                    )}
                                {filterCatName.map((cat, i) => (
                                    <Grid item className="filter-item" xs="auto" key={i}>
                                        {cat.name}
                                        <IconButton className={classes.closeButton} onClick={() => handleChecked(false, cat)}>
                                            <CloseIcon className={classes.closeIcon} />
                                        </IconButton>
                                    </Grid>

                                ))}
                                {!!sortSelected?.label
                                    && (
                                        <Grid item className="filter-item">
                                            {sortSelected.label}
                                            <IconButton className={classes.closeButton} onClick={() => { setSortSelected({}); setSorts([]); }}>
                                                <CloseIcon className={classes.closeIcon} />
                                            </IconButton>
                                        </Grid>
                                    )}
                            </Grid>
                        </div>
                    </Collapse>
                </div>
            </div>
        </Paper>
    );
};

export default TabsHeader;
