/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
import clsx from 'clsx';
import { useRouter } from 'next/router';

import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
    DateRangePicker,
    LocalizationProvider,
    DateRangeDelimiter,
} from '@material-ui/pickers';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import NestedMenuItem from 'material-ui-nested-menu-item';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import EventIcon from '@material-ui/icons/Event';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Button from '@common_button';
import TextField from '@common_textfield';
import Checkbox from '@common_checkbox';

import formatDate from '@helper_date';
import { useDebounce, isEmpty } from '@sellermodules/order/pages/list/components/ListCard/helpers';
import useStyles from '@sellermodules/promotion/pages/coupon/list/components/Table/style';

const filterField = {
    order_date: [{
        field: 'from_date',
        name: 'from_date',
        type: 'from',
        value: '',
        format: 'date',
    }, {
        field: 'to_date',
        name: 'to_date',
        type: 'to',
        value: '',
        format: 'date',
    }],
};

const TabsHeader = (props) => {
    const {
        header = '', searchPlaceholder = '',
        search, setSearch, t, filters = [], setFilters, selectedDate, setSelectedDate,
        statuses,
    } = props;

    const router = useRouter();
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [filterStat, setFilterStat] = React.useState([]);
    const [filterStatName, setFilterStatName] = React.useState([]);
    const debouncedFilterStat = useDebounce(filterStat, 100);

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
            setFilterStat((prev) => [...prev, id]);
            setFilterStatName((prev) => [...prev, v]);
        } else {
            setFilterStat((prev) => prev.filter((p) => p !== id));
            setFilterStatName((prev) => prev.filter((p) => p.id !== v.id));
        }
    };

    const handleDateChange = async (e) => {
        setSelectedDate(e);
        const fields = [{
            ...filterField.order_date[0],
            value: formatDate(e[0], 'YYYY-MM-DD 00:00:00'),
        }, {
            ...filterField.order_date[1],
            value: formatDate(e[1], 'YYYY-MM-DD 23:59:59'),
        }];
        let temp = [...filters];
        temp = insertFilter(fields[0], temp);
        temp = insertFilter(fields[1], temp);

        setFilters([...temp]);
    };

    const handleDateClose = () => {
        if (!selectedDate.every((date) => date === null)) {
            handleDateChange(selectedDate);
        }
    };

    const handleReset = () => {
        setSelectedDate([null, null]);
        setSearch('');
        setFilters([]);
        setFilterStat([]);
        setFilterStatName([]);
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
        const statTemp = {
            field: 'is_active',
            name: 'is_active',
            type: 'in',
            value: '',
        };
        let temp = [...filters];

        filterStat.forEach((stat) => {
            statTemp.value = [...statTemp.value, stat];
        });
        temp = insertFilter(statTemp, temp);

        setFilters([...temp]);
    }, [debouncedFilterStat]);

    return (
        <Paper className={classes.paperHead}>
            <div className={clsx(classes.header, 'nopad')}>
                {header}
            </div>
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
                        <div className="top-item">
                            <Button
                                className={clsx(classes.btnFilter, 'gray')}
                                onClick={(e) => handleClickOpenButton(e, setAnchorEl)}
                                endIcon={
                                    <KeyboardArrowRightIcon className={getArrowClass(anchorEl)} />
                                }
                            >
                                {t('sellercatalog:Filter')}
                            </Button>
                            <Menu
                                elevation={1}
                                getContentAnchorEl={null}
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                                className={classes.menuAction}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                MenuListProps={{ onMouseLeave: () => setAnchorEl(null) }}
                            >
                                <NestedMenuItem
                                    label="Status"
                                    parentMenuOpen
                                    className={clsx(classes.menuItem, 'parent')}
                                    keepMounted
                                >
                                    {statuses.map((stat, i) => (
                                        <MenuItem key={i} className={classes.menuItem}>
                                            <Checkbox
                                                label={stat.name}
                                                className={classes.checkboxOption}
                                                checked={filterStat.includes(String(stat.id))}
                                                setChecked={(e) => handleChecked(e.target.checked, stat)}
                                            />
                                        </MenuItem>
                                    ))}
                                </NestedMenuItem>
                            </Menu>
                        </div>
                        <div className="top-item">
                            <LocalizationProvider dateAdapter={DateFnsUtils}>
                                <DateRangePicker
                                    startText=""
                                    endText=""
                                    allowSameDateSelection
                                    value={selectedDate}
                                    inputFormat="dd MMM yyyy"
                                    onChange={setSelectedDate}
                                    toolbarPlaceholder="-"
                                    onAccept={(date) => handleDateChange(date)}
                                    clearable
                                    onClose={handleDateClose}
                                    renderInput={(startProps, endProps) => (
                                        <div className={classes.dateContainer}>
                                            <EventIcon />
                                            <TextField
                                                className={classes.inputDate}
                                                {...startProps.inputProps}
                                                placeholder="From"
                                                onChange={(e) => e.preventDefault}
                                            />
                                            <DateRangeDelimiter> - </DateRangeDelimiter>
                                            <TextField
                                                className={classes.inputDate}
                                                {...endProps.inputProps}
                                                placeholder="To"
                                                onChange={(e) => e.preventDefault}
                                            />
                                        </div>
                                    )}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className="top-item-right">
                        <div className="top-item">
                            <Button
                                className={classes.btn}
                                onClick={() => router.push('/seller/promotion/coupon/create')}
                                startIcon={
                                    <img src="/assets/img/add.svg" alt="add-icon" />
                                }
                            >
                                {t('sellerpromotion:Add_New_Coupon')}
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={classes.expandContainer}>
                    <Collapse in={search || !filters.filter((filt) => filt.name !== 'status').every((field) => isEmpty(field.value))}>
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
                                {filterStatName.map((stat) => (
                                    <Grid item className="filter-item" xs="auto">
                                        Status
                                        {' - '}
                                        {stat.name}
                                        <IconButton className={classes.closeButton} onClick={() => handleChecked(false, stat)}>
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
