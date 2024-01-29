/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import clsx from 'clsx';
import { useRouter } from 'next/router';
import Link from 'next/link';

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

import { useDebounce, isEmpty } from '@sellermodules/order/pages/list/components/ListCard/helpers';
import useStyles from '@sellermodules/catalog/pages/list/components/Table/style';

const TabsHeader = (props) => {
    const {
        header = '', searchPlaceholder = '', filters = [], setFilters,
        search, setSearch, t, categories, dataEtalase,
    } = props;
    const router = useRouter();

    const menuAdd = [
        {
            label: t('sellercatalog:Add_at_Once'),
            link: '/seller/catalog/organize/add',
        },
        {
            label: t('sellercatalog:Change_at_Once'),
            link: '/seller/catalog/organize/change',
        },
    ];

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElCat, setAnchorElCat] = React.useState(null);
    const [anchorElOther, setAnchorElOther] = React.useState(null);
    const [anchorElDis, setAnchorElDis] = React.useState(null);
    const [filterCatName, setFilterCatName] = React.useState([]);
    const [filterDisName, setFilterDisName] = React.useState([]);
    const [filterProduct, setFilterProduct] = React.useState({ category: [], displayW: [] });
    const debouncedFilterCat = useDebounce(filterProduct.category, 100);
    const debouncedFilterDis = useDebounce(filterProduct.displayW, 100);

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
        const typeName = v.__typename;
        const entity_id = String(v.entity_id);
        if (check) {
            if (typeName === 'SellerEtalase') {
                setFilterProduct({ ...filterProduct, displayW: [entity_id] });
                setFilterDisName([v]);
            } else {
                setFilterProduct({ ...filterProduct, category: [...filterProduct.category, id] });
                setFilterCatName((prev) => [...prev, v]);
            }
        } else {
            setFilterProduct({ category: [...filterProduct.category, id].filter((p) => p !== id), displayW: [...filterProduct.displayW, entity_id].filter((p) => p !== entity_id) });
            setFilterCatName((prev) => prev.filter((p) => p.id !== v.id));
            setFilterDisName((prev) => prev.filter((p) => p.entity_id !== v.entity_id));
        }
    };

    const handleReset = () => {
        setSearch('');
        setFilterCatName([]);
        setFilterDisName([]);
        setFilters([]);
        setFilterProduct({ category: [], displayW: [] });
    };

    const getArrowClass = (anchor) => (anchor ? classes.arrowUp : classes.arrowDown);

    React.useEffect(() => {
        const catTemp = {
            field: 'category_id',
            name: 'category_id',
            type: 'in',
            value: '',
        };
        let temp = [...filters];

        filterProduct.category.forEach((z) => {
            catTemp.value = [...catTemp.value, z];
        });
        temp = insertFilter(catTemp, temp);

        setFilters([...temp]);
    }, [debouncedFilterCat]);

    React.useEffect(() => {
        const disTemp = {
            field: 'etalase_id',
            name: 'etalase_id',
            type: 'eq',
            value: '',
        };
        let temp = [...filters];

        filterProduct.displayW.forEach((z) => {
            disTemp.value = z;
        });
        temp = insertFilter(disTemp, temp);

        setFilters([...temp]);
    }, [debouncedFilterDis]);

    return (
        <>
            <Paper className={classes.paperHead} style={{ marginBottom: 20 }}>
                <div className={classes.tableToolbar}>
                    <div className="top-buttons-wrapper nopad">
                        <div className={clsx(classes.header, 'nopad top-item-left')}>
                            {header}
                        </div>
                        <div className="top-item-right">
                            <div className="top-item">
                                <Button
                                    className={clsx(classes.btnAdd, 'gray')}
                                    onClick={(e) => handleClickOpenButton(e, setAnchorElOther)}
                                    endIcon={
                                        <KeyboardArrowRightIcon className={getArrowClass(anchorElOther)} />
                                    }
                                >
                                    {t('sellercatalog:Other_Settings')}
                                </Button>
                                <Menu
                                    elevation={0}
                                    getContentAnchorEl={null}
                                    anchorEl={anchorElOther}
                                    keepMounted
                                    open={Boolean(anchorElOther)}
                                    onClose={() => setAnchorElOther(null)}
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
                                    <MenuItem
                                        component={() => (
                                            <Link href="/seller/storesetting/displaywindow">
                                                <a className={classes.menuItem}>{t('sellercatalog:Display_Window')}</a>
                                            </Link>
                                        )}
                                        onClick={() => setAnchorEl(null)}
                                    />
                                </Menu>
                            </div>
                            <div className="top-item">
                                <Button
                                    className={clsx(classes.btnAdd, 'gray')}
                                    onClick={(e) => handleClickOpenButton(e, setAnchorEl)}
                                    endIcon={
                                        <KeyboardArrowRightIcon className={getArrowClass(anchorEl)} />
                                    }
                                >
                                    {t('sellercatalog:Set_at_Once')}
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
                                    {menuAdd.map((menuItem, i) => (
                                        <MenuItem
                                            key={i}
                                            component={() => (
                                                <Link href={menuItem.link}>
                                                    <a className={classes.menuItem}>{menuItem.label}</a>
                                                </Link>
                                            )}
                                            onClick={() => setAnchorEl(null)}
                                        />
                                    ))}
                                </Menu>
                            </div>
                            <div className="top-item">
                                <Button
                                    className={classes.btnAdd}
                                    onClick={() => router.push('/seller/catalog/new')}
                                    startIcon={
                                        <img src="/assets/img/add.svg" alt="add-icon" />
                                    }
                                >
                                    <Link href="/seller/catalog/new">
                                        {t('common:Add_Product')}
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Paper>
            <Paper className={classes.paperHead} style={{ borderRadius: '8px 8px 0 0' }}>
                <div className={classes.tableToolbar}>
                    <div className="top-buttons-wrapper nopad">
                        <div className="top-item-left">
                            <div className="top-item">
                                <TextField
                                    placeholder={searchPlaceholder}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className={clsx(classes.textInput, 'full')}
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
                                    onClick={(e) => handleClickOpenButton(e, setAnchorElCat)}
                                    endIcon={
                                        <KeyboardArrowRightIcon className={getArrowClass(anchorElCat)} />
                                    }
                                >
                                    {t('sellercatalog:Category')}
                                </Button>
                                <Menu
                                    elevation={1}
                                    getContentAnchorEl={null}
                                    anchorEl={anchorElCat}
                                    open={Boolean(anchorElCat)}
                                    onClose={() => setAnchorElCat(null)}
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
                                    {categories.map((tamp, i) => (
                                        <MenuItem key={i} className={classes.menuItem}>
                                            <Checkbox
                                                label={tamp.name}
                                                checked={filterProduct.category.includes(String(tamp.id))}
                                                setChecked={(e) => handleChecked(e.target.checked, tamp)}
                                                className={classes.checkboxOption}
                                            />
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                            <div className="top-item">
                                <Button
                                    className={clsx(classes.btnAdd, 'gray')}
                                    style={{ marginRight: 0 }}
                                    onClick={(e) => handleClickOpenButton(e, setAnchorElDis)}
                                    endIcon={
                                        <KeyboardArrowRightIcon className={getArrowClass(anchorElDis)} />
                                    }
                                >
                                    {t('sellercatalog:Display_Window')}
                                </Button>
                                <Menu
                                    elevation={0}
                                    getContentAnchorEl={null}
                                    anchorEl={anchorElDis}
                                    keepMounted
                                    open={Boolean(anchorElDis)}
                                    onClose={() => setAnchorElDis(null)}
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
                                                checked={filterProduct.displayW.includes(String(tamp.entity_id))}
                                                setChecked={(e) => handleChecked(e.target.checked, tamp)}
                                                className={classes.checkboxOption}
                                            />
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                        </div>
                    </div>
                    <div className={classes.expandContainer}>
                        <Collapse in={!!(search || !filters.filter((filt) => filt.name !== 'status').every((field) => isEmpty(field.value)))}>
                            <div className={classes.expandGrid} style={{ marginTop: 20 }}>
                                {(!!search || !filters.every((field) => isEmpty(field.value)))
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
                                    {filterCatName.map((tamp) => (
                                        <Grid item className="filter-item" xs="auto">
                                            {tamp.name}
                                            <IconButton className={classes.closeButton} onClick={() => handleChecked(false, tamp)}>
                                                <CloseIcon className={classes.closeIcon} />
                                            </IconButton>
                                        </Grid>

                                    ))}
                                    {filterDisName.map((tamp) => (
                                        <Grid item className="filter-item" xs="auto">
                                            {tamp.name}
                                            <IconButton className={classes.closeButton} onClick={() => handleChecked(false, tamp)}>
                                                <CloseIcon className={classes.closeIcon} />
                                            </IconButton>
                                        </Grid>

                                    ))}
                                </Grid>
                            </div>
                        </Collapse>
                    </div>
                </div>
            </Paper>
        </>
    );
};

export default TabsHeader;
