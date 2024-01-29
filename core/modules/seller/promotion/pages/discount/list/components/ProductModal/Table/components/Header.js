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
import Checkbox from '@common_checkbox';

import { useDebounce, isEmpty } from '@sellermodules/promotion/pages/discount/list/components/ProductModal/Table/helpers';
import useStyles from '@sellermodules/promotion/pages/discount/list/components/ProductModal/Table/style';

const TabsHeader = (props) => {
    const {
        searchPlaceholder = '', filters = [], setFilters,
        search, setSearch, t, dataCat = [], dataEtalase = [], setSorts,
    } = props;

    const menuSort = [
        {
            label: `${t('sellerpromotion:Name')}: A - Z`,
            field: 'name',
            value: 'ASC',
        },
        {
            label: `${t('sellerpromotion:Name')}: Z - A`,
            field: 'name',
            value: 'DESC',
        },
        {
            label: t('sellerpromotion:Highest_Price'),
            field: 'price',
            value: 'DESC',
        },
        {
            label: t('sellerpromotion:Lowest_Price'),
            field: 'price',
            value: 'ASC',
        },
    ];

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState({ category: null, window: null, sort: null });
    const [filterProduct, setFilterProduct] = React.useState({ category: [], window: [] });
    const [sortSelected, setSortSelected] = React.useState({});

    const debouncedFilterCat = useDebounce(filterProduct.category, 100);
    const debouncedFilterDis = useDebounce(filterProduct.window, 100);

    const handleClickOpenButton = (e, name) => {
        const temp = { ...anchorEl };
        temp[name] = e.currentTarget;
        setAnchorEl(temp);
    };

    const handleClickCloseButton = (e, name) => {
        const temp = { ...anchorEl };
        temp[name] = null;
        setAnchorEl(temp);
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

    const handleChecked = (check, v, name) => {
        const id = String(v.id);
        const entity_id = String(v.entity_id);
        if (check) {
            if (name === 'window') {
                setFilterProduct({ ...filterProduct, window: [...filterProduct.window, v] });
            } else {
                setFilterProduct({ ...filterProduct, category: [...filterProduct.category, v] });
            }
        } else {
            const temp = { ...filterProduct };
            if (name === 'window') {
                temp.window = temp.window.filter((p) => Number(p.entity_id) !== Number(entity_id));
            } else {
                temp.category = temp.category.filter((p) => Number(p.id) !== Number(id));
            }
            setFilterProduct(temp);
        }
    };

    const handleReset = () => {
        setSearch('');
        setFilters([]);
        setSorts([]);
        setSortSelected({});
        setFilterProduct({ category: [], window: [] });
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
            value: [],
        };
        let temp = [...filters];

        catTemp.value = filterProduct.category.map((cat) => String(cat.id));

        temp = insertFilter(catTemp, temp);

        setFilters([...temp]);
    }, [debouncedFilterCat]);

    React.useEffect(() => {
        const disTemp = {
            field: 'etalase_id',
            name: 'etalase_id',
            type: 'in',
            value: [],
        };
        let temp = [...filters];

        disTemp.value = filterProduct.window.map((window) => String(window.entity_id));

        temp = insertFilter(disTemp, temp);

        setFilters([...temp]);
    }, [debouncedFilterDis]);

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
                                className={clsx(classes.btnFilter, 'gray')}
                                onClick={(e) => handleClickOpenButton(e, 'category')}
                                endIcon={
                                    <KeyboardArrowRightIcon className={getArrowClass(anchorEl.category)} />
                                }
                            >
                                {t('sellercatalog:Category')}
                            </Button>
                            <Menu
                                elevation={1}
                                getContentAnchorEl={null}
                                anchorEl={anchorEl.category}
                                open={Boolean(anchorEl.category)}
                                onClose={(e) => handleClickCloseButton(e, 'category')}
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
                                {dataCat.map((tamp, i) => (
                                    <MenuItem key={i} className={classes.menuItem}>
                                        <Checkbox
                                            label={tamp.name}
                                            checked={!!filterProduct.category.find((cat) => cat.id === tamp.id)}
                                            setChecked={(e) => handleChecked(e.target.checked, tamp, 'category')}
                                            className={classes.checkboxOption}
                                        />
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>
                        <div className="top-item">
                            <Button
                                className={clsx(classes.btnFilter, 'gray')}
                                onClick={(e) => handleClickOpenButton(e, 'window')}
                                endIcon={
                                    <KeyboardArrowRightIcon className={getArrowClass(anchorEl.window)} />
                                }
                            >
                                {t('sellercatalog:Display_Window')}
                            </Button>
                            <Menu
                                elevation={0}
                                getContentAnchorEl={null}
                                anchorEl={anchorEl.window}
                                open={Boolean(anchorEl.window)}
                                keepMounted
                                onClose={(e) => handleClickCloseButton(e, 'window')}
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
                                {dataEtalase?.map((tamp, i) => (
                                    <MenuItem key={i} className={clsx(classes.menuItem, classes.menuSingle)}>
                                        <Checkbox
                                            label={tamp.name}
                                            checked={!!filterProduct.window.find((w) => w.entity_id === tamp.entity_id)}
                                            setChecked={(e) => handleChecked(e.target.checked, tamp, 'window')}
                                            className={classes.checkboxOption}
                                        />
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>
                        <div className="top-item">
                            <Button
                                className={clsx(classes.btnAdd, 'gray')}
                                onClick={(e) => handleClickOpenButton(e, 'sort')}
                                endIcon={
                                    <KeyboardArrowRightIcon className={getArrowClass(anchorEl.sort)} />
                                }
                            >
                                {t('sellerpromotion:Sort_By')}
                            </Button>
                            <Menu
                                elevation={0}
                                getContentAnchorEl={null}
                                anchorEl={anchorEl.sort}
                                open={Boolean(anchorEl.sort)}
                                keepMounted
                                onClick={(e) => handleClickCloseButton(e, 'sort')}
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
                                {menuSort.map((menuItem, i) => (
                                    <MenuItem
                                        key={i}
                                        href={menuItem.link}
                                        onClick={() => { setSortByField(menuItem); handleClickCloseButton(null, 'sort'); }}
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
                                {filterProduct.category.map((tamp) => (
                                    <Grid item className="filter-item" xs="auto">
                                        {tamp.name}
                                        <IconButton className={classes.closeButton} onClick={() => handleChecked(false, tamp, 'category')}>
                                            <CloseIcon className={classes.closeIcon} />
                                        </IconButton>
                                    </Grid>
                                ))}
                                {filterProduct.window.map((tamp) => (
                                    <Grid item className="filter-item" xs="auto">
                                        {tamp.name}
                                        <IconButton className={classes.closeButton} onClick={() => handleChecked(false, tamp, 'window')}>
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
