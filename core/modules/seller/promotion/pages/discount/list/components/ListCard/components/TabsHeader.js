import clsx from 'clsx';
import { useRouter } from 'next/router';

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
import Tabs from '@common_tabsseller';
import TextField from '@common_textfield';
import Checkbox from '@common_checkbox';
import DateModal from '@common_daterangemodal';

import formatDate from '@helper_date';
import { useDebounce, isEmpty } from '@sellermodules/promotion/pages/discount/list/components/ListCard/helpers';
import useStyles from '@sellermodules/promotion/pages/discount/list/components/ListCard/style';

const TabsHeader = (props) => {
    const {
        header = '', searchPlaceholder = '', filters = [], setFilters, setOpenModalAdd,
        search, setSearch, t, dataTabs, tab,
        selectedDate, setSelectedDate, dataCat = [], dataEtalase = [],
    } = props;

    const router = useRouter();

    const classes = useStyles();
    const [openPeriod, setOpenPeriod] = React.useState(false);
    const [filterProduct, setFilterProduct] = React.useState({ category: [], window: [] });
    const [anchorEl, setAnchorEl] = React.useState({ category: null, window: null });

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

    const handleDateChange = async (e) => {
        setSelectedDate(e);

        const filterField = [{
            field: 'discount_from_date',
            name: 'discount_from_date',
            type: 'eq',
            value: '',
            format: 'date',
        }, {
            field: 'discount_to_date',
            name: 'discount_to_date',
            type: 'eq',
            value: '',
            format: 'date',
        }];

        const fields = [{
            ...filterField[0],
            value: formatDate(e[0], 'YYYY-MM-DD 00:00:00'),
        }, {
            ...filterField[1],
            value: formatDate(e[1], 'YYYY-MM-DD 23:59:59'),
        }];
        let temp = [...filters];
        temp = insertFilter(fields[0], temp);
        temp = insertFilter(fields[1], temp);

        setFilters([...temp]);
    };

    const onChangeTab = (e, v) => {
        const routeParams = v === 'on_going' ? '' : `/${v}`;
        router.replace(`/seller/promotion/discount${routeParams}`, undefined, { shallow: true });
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
        setFilterProduct({ category: [], window: [] });
    };

    const getArrowClass = (anchor) => (anchor ? classes.arrowUp : classes.arrowDown);

    const renderFilterDateText = () => {
        let res = '';
        if (selectedDate.every((date) => date !== null)) {
            res = `${formatDate(selectedDate[0], 'DD MMM YYYY')} - ${formatDate(selectedDate[1], 'DD MMM YYYY')}`;
        } else if (selectedDate[0] !== null) {
            res = formatDate(selectedDate[0], 'DD MMM YYYY');
        } else {
            res = formatDate(selectedDate[1], 'DD MMM YYYY');
        }
        return res;
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
            <div className={clsx(classes.header, 'nopad')}>
                <div className={clsx(classes.headerTitle)}>
                    {header}
                </div>
                <div className={classes.btnDiv}>
                    <Button
                        className={clsx(classes.btn, 'gray')}
                        onClick={() => router.push('/seller/promotion/discount/upload')}
                    >
                        {t('common:Set_Discount_at_Once')}
                    </Button>
                    <Button
                        className={classes.btn}
                        onClick={() => setOpenModalAdd(true)}
                    >
                        {t('common:Add_Product')}
                    </Button>
                </div>
            </div>
            <Tabs data={dataTabs} onChange={onChangeTab} value={tab} allItems={false} />
            <div className={classes.tableToolbar}>
                <div className="top-buttons-wrapper nopad">
                    <div className="top-item-left">
                        <div className="top-item">
                            <TextField
                                name="email"
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
                                onClick={() => setOpenPeriod(true)}
                                startIcon={<img alt="" src="/assets/img/calendar.svg" />}
                            >
                                {t('sellercatalog:Period')}
                            </Button>
                            <DateModal
                                {...props}
                                open={openPeriod}
                                setOpen={setOpenPeriod}
                                handleDateChange={handleDateChange}
                                useTimePeriod={false}
                            />
                        </div>
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
                                MenuListProps={{ onMouseLeave: (e) => handleClickCloseButton(e, 'category') }}
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
                                MenuListProps={{ onMouseLeave: (e) => handleClickCloseButton(e, 'window') }}
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
                    </div>
                </div>
                <div className={classes.expandContainer}>
                    <Collapse in={search || !filters.filter((filt) => filt.name !== 'status' && filt.name !== 'track_status')
                        .every((field) => isEmpty(field.value))}
                    >
                        <div className={classes.expandGrid}>
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
                                style={{ marginTop: 17 }}
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
                                {selectedDate.some((date) => date !== null)
                                    ? (
                                        <Grid item className="filter-item" xs="auto">
                                            {renderFilterDateText()}
                                            <IconButton className={classes.closeButton} onClick={() => handleDateChange([null, null])}>
                                                <CloseIcon className={classes.closeIcon} />
                                            </IconButton>
                                        </Grid>
                                    )
                                    : null}
                                {filterProduct.category.map((tamp) => (
                                    <Grid item className="filter-item" xs="auto" key={tamp.id}>
                                        {tamp.name}
                                        <IconButton className={classes.closeButton} onClick={() => handleChecked(false, tamp, 'category')}>
                                            <CloseIcon className={classes.closeIcon} />
                                        </IconButton>
                                    </Grid>
                                ))}
                                {filterProduct.window.map((tamp) => (
                                    <Grid item className="filter-item" xs="auto" key={tamp.entity_id}>
                                        {tamp.name}
                                        <IconButton className={classes.closeButton} onClick={() => handleChecked(false, tamp, 'window')}>
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
    );
};

export default TabsHeader;
