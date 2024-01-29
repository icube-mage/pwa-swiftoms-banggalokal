/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
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
import Tabs from '@common_tabsseller';
import TextField from '@common_textfield';
import Checkbox from '@common_checkbox';
import ExportDialog from '@sellermodules/order/pages/list/components/ListCard/components/exportDialog';

import formatDate from '@helper_date';
import { useDebounce, isEmpty } from '@sellermodules/order/pages/list/components/ListCard/helpers';
import useStyles from '@sellermodules/order/pages/list/components/ListCard/style';

const filterField = {
    providers: {
        field: 'shipping_provider',
        name: 'shipping_provider',
        type: 'in',
        value: [],
        format: 'array',
    },
    service: {
        field: 'shipping_provider_service',
        name: 'shipping_provider_service',
        type: 'in',
        value: [],
        format: 'array',
    },
    track: {
        field: 'track_status',
        name: 'track_status',
        type: 'eq',
        value: '',
    },
    order_date: [{
        field: 'order_date',
        name: 'order_date_from',
        type: 'from',
        value: '',
        format: 'date',
    }, {
        field: 'order_date',
        name: 'order_date_to',
        type: 'to',
        value: '',
        format: 'date',
    }],
    location: {
        field: 'loc_id',
        name: 'loc_id',
        type: 'in',
        value: [],
        format: 'array',
    },
};

const TabsHeader = (props) => {
    const {
        header = '', searchPlaceholder = '', filters = [], setFilters,
        search, setSearch, t, dataTabs, tab, dataTrack = [], setIsCheckedAllRows,
        selectedDate, setSelectedDate, dataProvider = [], dataLocation, setCheckedRows,
    } = props;

    const router = useRouter();

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [providers, setProviders] = React.useState([]);
    const [locations, setLocations] = React.useState([]);
    const [filterLocName, setFilterLocName] = React.useState([]);
    const [track, setTrack] = React.useState();
    const debouncedProviders = useDebounce(providers, 100);
    const debouncedLocations = useDebounce(locations, 100);
    const [open, setOpen] = React.useState(false);

    const shipmentGroup = () => {
        const values = [];
        if (dataProvider?.length) {
            dataProvider.forEach((shipment) => {
                const existIdx = values.findIndex((data) => data.provider === shipment.provider);
                if (existIdx >= 0) {
                    values[existIdx] = {
                        ...values[existIdx],
                        options: [...values[existIdx].options, { ...shipment, value: `${shipment.provider} - ${shipment.service}` }],
                    };
                } else {
                    values.push({
                        provider: shipment.provider,
                        options: [{ ...shipment, value: `${shipment.provider} - ${shipment.service}` }],
                    });
                }
            });
        }
        return values;
    };

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

    const onChangeTrack = (v) => {
        let val = v;
        if (track == v) {
            val = null;
        }
        setTrack(val);
        const fields = {
            ...filterField.track,
            value: val,
        };
        let temp = [...filters];
        temp = insertFilter(fields, temp);
        setFilters([...temp]);
        setCheckedRows([]);
        setIsCheckedAllRows(false);
    };

    const onChangeTab = (e, v) => {
        if (tab === 'in_delivery' || v === 'in_delivery') {
            onChangeTrack();
        }
        const routeParams = v === 'all' ? '' : `/${v}`;
        router.replace(`/seller/order${routeParams}`, undefined, { shallow: true });
    };

    const handleChecked = (check, v, filterName) => {
        const id = String(v.value);
        switch (filterName) {
        case 'expedition':
            if (check) {
                return setProviders((prev) => [...prev, v]);
            }
            return setProviders((prev) => prev.filter((p) => p !== v));
        case 'location':
            if (check) {
                return (
                    <>
                        {setLocations((prev) => [...prev, id])}
                        {setFilterLocName((prev) => [...prev, v])}
                    </>
                );
            }
            return (
                <>
                    {setLocations((prev) => prev.filter((p) => p !== id))}
                    {setFilterLocName((prev) => prev.filter((p) => p.value !== v.value))}
                </>
            );
        default:
            return null;
        }
    };

    const handleReset = () => {
        setSelectedDate([null, null]);
        setSearch('');
        setProviders([]);
        setLocations([]);
        setFilters([]);
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
        const filterProviders = { ...filterField.providers };
        const filterService = { ...filterField.service };
        let temp = [...filters];

        providers.forEach((provider) => {
            const [p, v] = provider.split(' - ');
            if (!filterProviders.value.includes(p)) {
                filterProviders.value = [...filterProviders.value, p];
            }
            if (!filterService.value.includes(v)) {
                filterService.value = [...filterService.value, v];
            }
        });
        temp = insertFilter(filterProviders, temp);
        temp = insertFilter(filterService, temp);

        setFilters([...temp]);
    }, [debouncedProviders]);

    React.useEffect(() => {
        const filterLocation = { ...filterField.location };
        let temp = [...filters];

        locations.forEach((e) => {
            filterLocation.value = [...filterLocation.value, e];
        });
        temp = insertFilter(filterLocation, temp);

        setFilters([...temp]);
    }, [debouncedLocations]);

    return (
        <Paper className={classes.paperHead}>
            <div className={clsx(classes.header, 'nopad')}>
                {header}
            </div>
            <Tabs data={dataTabs} onChange={onChangeTab} value={tab} allItems={false} />
            <div className={classes.expandContainerTab}>
                <Collapse in={tab === 'in_delivery'}>
                    <Grid
                        container
                        spacing={2}
                        alignContent="center"
                        alignItems="center"
                    >
                        {dataTrack.map(({ label, value }) => (
                            <Grid item xs="auto" key={value}>
                                <Button
                                    className={clsx(classes.btnTab, track === value && 'active')}
                                    onClick={() => onChangeTrack(value)}
                                >
                                    {label}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Collapse>
            </div>

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
                                onClick={() => setOpen(true)}
                                startIcon={<img alt="" src="/assets/img/export.svg" />}
                            >
                                {t('sellercatalog:Export_Order')}
                            </Button>
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
                                    label="Expedition"
                                    parentMenuOpen
                                    className={clsx(classes.menuItem, 'parent')}
                                    keepMounted
                                >
                                    {shipmentGroup().map((ship) => (ship.options?.length
                                        ? (
                                            <NestedMenuItem
                                                label={ship.provider}
                                                parentMenuOpen
                                                className={classes.menuItem}
                                                keepMounted
                                                key={ship.provider}
                                            >
                                                {ship.options.map((ser) => (
                                                    <MenuItem key={ser.entity_id} className={classes.menuItem}>
                                                        <Checkbox
                                                            name={ser.service}
                                                            label={ser.service}
                                                            checked={providers.includes(ser.value)}
                                                            setChecked={(e) => handleChecked(e.target.checked, ser.value, 'expedition')}
                                                            className={classes.checkboxOption}
                                                        />
                                                    </MenuItem>
                                                ))}
                                            </NestedMenuItem>
                                        )
                                        : (
                                            null
                                        )
                                    ))}
                                </NestedMenuItem>
                                <NestedMenuItem
                                    label="Location"
                                    parentMenuOpen
                                    className={clsx(classes.menuItem, 'parent')}
                                    keepMounted
                                >
                                    {dataLocation?.length
                                        ? (
                                            <>
                                                {dataLocation.map((loc) => (
                                                    <MenuItem key={loc.id} className={classes.menuItem}>
                                                        <Checkbox
                                                            name={loc.label}
                                                            label={loc.label}
                                                            checked={locations.includes(String(loc.value))}
                                                            setChecked={(e) => handleChecked(e.target.checked, loc, 'location')}
                                                            className={classes.checkboxOption}
                                                        />
                                                    </MenuItem>
                                                ))}
                                            </>
                                        )
                                        : (null)}
                                </NestedMenuItem>
                            </Menu>
                        </div>
                        <div className="top-item">
                            <LocalizationProvider dateAdapter={DateFnsUtils}>
                                <DateRangePicker
                                    className={classes.dateRangeClass}
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
                                {providers.map((provider) => (
                                    <Grid item className="filter-item" xs="auto" key={provider}>
                                        {provider}
                                        <IconButton className={classes.closeButton} onClick={() => handleChecked(false, provider, 'expedition')}>
                                            <CloseIcon className={classes.closeIcon} />
                                        </IconButton>
                                    </Grid>
                                ))}
                                {filterLocName.map((tamp) => (
                                    <Grid item className="filter-item" xs="auto" key={tamp.id}>
                                        {tamp.label}
                                        <IconButton className={classes.closeButton} onClick={() => handleChecked(false, tamp, 'location')}>
                                            <CloseIcon className={classes.closeIcon} />
                                        </IconButton>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </Collapse>
                </div>
            </div>
            <ExportDialog {...props} open={open} setOpen={setOpen} />
        </Paper>
    );
};

export default TabsHeader;
