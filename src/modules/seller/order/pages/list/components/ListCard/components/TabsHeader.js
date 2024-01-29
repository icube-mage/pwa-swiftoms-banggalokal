/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
import clsx from 'clsx';

import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { DateRangePicker, LocalizationProvider, DateRangeDelimiter } from '@material-ui/pickers';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import Grid from '@material-ui/core/Grid';
import EventIcon from '@material-ui/icons/Event';
import CloseIcon from '@material-ui/icons/Close';

import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Button from '@common_button';
import TextField from '@common_textfield';
import Checkbox from '@common_checkbox';
import ExportDialog from '@sellermodules/order/pages/list/components/ListCard/components/exportDialog';
import SearchBar from '@sellermodules/order/pages/list/components/ListCard/components/SearchBar';
import SelectAllCheckbox from '@sellermodules/order/pages/list/components/ListCard/components/SelectAllCheckbox';

import formatDate from '@helper_date';
import { useDebounce, isEmpty } from '@sellermodules/order/pages/list/components/ListCard/helpers';
import useStyles from '@sellermodules/order/pages/list/components/ListCard/style';

import { breakPointsUp } from '@helper_theme';

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
    status: {
        field: 'status',
        name: 'status',
        type: 'eq',
        value: '',
    },
    payment_status: {
        field: 'payment_status',
        name: 'payment_status',
        type: 'in',
        value: '',
    },
    channel_code: {
        field: 'channel_code',
        name: 'channel_code',
        type: 'in',
        value: '',
    },
};

const FilterDialog = (props) => {
    const { anchorEl, setAnchorEl, children } = props;
    const classes = useStyles();
    const isDesktop = breakPointsUp('sm');

    if (!isDesktop) {
        return (
            <Dialog open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                <DialogContent>{children}</DialogContent>
            </Dialog>
        );
    }

    return (
        <Popper anchorEl={anchorEl} open={Boolean(anchorEl)} className={classes.filterPopper}>
            {children}
        </Popper>
    );
};

const TabsHeader = (props) => {
    const {
        filters = [], setFilters,
        search, setSearch, t,
        selectedDate, setSelectedDate,
        paymentStatus, dataSellerChannelList, dataSellerOrderStatus,
        isFailedAllocation, isFailedSync,
        checked, checkedRows, onChange, count,
        tabStatus,
    } = props;
    const isDesktop = breakPointsUp('sm');

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [providers, setProviders] = React.useState([]);
    const [locations, setLocations] = React.useState([]);
    const [paymentConfirmationStatus, setPaymentConfirmationStatus] = React.useState([]);
    const [filterLocName, setFilterLocName] = React.useState([]);
    const debouncedProviders = useDebounce(providers, 100);
    const debouncedLocations = useDebounce(locations, 100);
    const debouncedPaymentConfirmationStatus = useDebounce(paymentConfirmationStatus, 100);
    const [open, setOpen] = React.useState(false);

    const handleClickOpenButton = (event, set) => {
        set(anchorEl ? null : event.currentTarget);
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

    const [status, setStatus] = React.useState('');
    const debouncedStatus = useDebounce(status, 100);
    const handleChangeStatus = (e, v) => {
        setStatus(e ? v : '');
    };
    React.useEffect(() => {
        let temp = [...filters];
        temp = insertFilter({
            ...filterField.status,
            value: status === 'all' ? '' : status,
        }, temp);
        setFilters([...temp]);
    }, [debouncedStatus]);

    const [sellerChannel, setSellerChannel] = React.useState([]);
    const debouncedSellerChannel = useDebounce(sellerChannel, 100);
    React.useEffect(() => {
        let temp = [...filters];
        temp = insertFilter({
            ...filterField.channel_code,
            value: sellerChannel.map(({ channel_code }) => channel_code),
        }, temp);
        setFilters([...temp]);
    }, [debouncedSellerChannel]);

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
        case 'payment_status':
            if (check) {
                return setPaymentConfirmationStatus([...paymentConfirmationStatus, v]);
            }
            return setPaymentConfirmationStatus(paymentConfirmationStatus.filter(({ value }) => value !== v.value));
        case 'seller_channel':
            if (check) {
                return setSellerChannel([...sellerChannel, v]);
            }
            return setSellerChannel(sellerChannel.filter(({ channel_code }) => channel_code !== v.channel_code));
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
        setStatus('');
        setPaymentConfirmationStatus([]);
        setSellerChannel([]);
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

    React.useEffect(() => {
        let temp = [...filters];

        temp = insertFilter({
            ...filterField.payment_status,
            value: paymentConfirmationStatus.map(({ value }) => value),
        }, temp);

        setFilters([...temp]);
    }, [debouncedPaymentConfirmationStatus]);

    return (
        <Paper className={classes.paperHead}>
            <div className={classes.tableToolbar}>
                <div className="top-buttons-wrapper nopad">
                    {isDesktop ? (
                        <div className="top-item-left">
                            <div className="top-item">
                                <SearchBar value={search} onChange={setSearch} t={t} />
                            </div>
                        </div>
                    ) : null}
                    <div className="top-item-right">
                        {!isDesktop ? (
                            <div className={classes.selectContainer}>
                                <SelectAllCheckbox
                                    checked={checked}
                                    checkedRows={checkedRows}
                                    onChange={(e) => onChange(e.target.checked)}
                                    count={count}
                                    t={t}
                                />
                            </div>
                        ) : null}
                        <div className={classes.filterContainer}>
                            {!isFailedAllocation && !isFailedSync ? (
                                <div className="top-item right-5">
                                    <Button
                                        className={clsx(classes.btnFilter, 'gray')}
                                        onClick={() => setOpen(true)}
                                        startIcon={<img alt="" src="/assets/img/export.svg" />}
                                    >
                                        {t('sellercatalog:Export_Order').split(' ')[0]}
                                    </Button>
                                </div>
                            ) : null}
                            <ClickAwayListener onClickAway={() => setAnchorEl(false)}>
                                <div className="top-item right-5">
                                    <Button
                                        className={clsx(classes.btnFilter, 'gray filter')}
                                        onClick={(e) => handleClickOpenButton(e, setAnchorEl)}
                                        startIcon={!isDesktop && <img alt="" src="/assets/img/icon_filter_sliders.svg" />}
                                        endIcon={
                                            isDesktop && <KeyboardArrowRightIcon className={getArrowClass(anchorEl)} />
                                        }
                                    >
                                        {t('sellercatalog:Filter')}
                                    </Button>
                                    <FilterDialog anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
                                        <div className="filter-container">
                                            { tabStatus !== 'failed' && (
                                                <div style={{ display: 'flex', flexDirection: 'column', padding: 10 }}>
                                                    <span style={{ fontWeight: 'bold', marginBottom: 10, textTransform: 'capitalize' }}>
                                                        {t('Order_Status')}
                                                    </span>
                                                    {dataSellerOrderStatus.map((_dt) => (
                                                        <FormControlLabel
                                                            key={_dt.value}
                                                            name={_dt.label}
                                                            label={_dt.label}
                                                            value={_dt.value}
                                                            control={(
                                                                <Radio
                                                                    checked={status === _dt.value}
                                                                    onClick={() => (status === _dt.value
                                                                        ? handleChangeStatus(false, _dt.value)
                                                                        : handleChangeStatus(true, _dt.value))}
                                                                    className={classes.radioOption}
                                                                    color="primary"
                                                                />
                                                            )}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                            <div style={{ display: 'flex', flexDirection: 'column', padding: 10 }}>
                                                <span style={{ fontWeight: 'bold', marginBottom: 10 }}>{t('channel_seller')}</span>
                                                {dataSellerChannelList.map((_dt) => (
                                                    <Checkbox
                                                        key={_dt.channel_code}
                                                        name={_dt.channel_name}
                                                        label={(
                                                            <div className={classes.flexChannel}>
                                                                <div className={classes.imgChannelContainer}>
                                                                    <div
                                                                        className={classes.imgChannel}
                                                                        style={{
                                                                            backgroundImage: `url(${_dt.image_url
                                                                            || '/assets/img/placeholder_image.jpg'})`,
                                                                        }}
                                                                        alt="channel-img"
                                                                    />
                                                                </div>
                                                                {_dt.channel_name}
                                                            </div>
                                                        )}
                                                        checked={!!sellerChannel.find(({ channel_code }) => channel_code === _dt.channel_code)}
                                                        setChecked={(e) => handleChecked(e.target.checked, _dt, 'seller_channel')}
                                                        className={classes.checkboxOption}
                                                        checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                                                        icon={<span className={classes.icon} />}
                                                    />
                                                ))}
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', padding: 10 }}>
                                                <span style={{ fontWeight: 'bold', marginBottom: 10 }}>{t('payment_status')}</span>
                                                {paymentStatus.map((_dt) => (
                                                    <Checkbox
                                                        key={_dt.value}
                                                        name={_dt.label}
                                                        label={_dt.label}
                                                        checked={!!paymentConfirmationStatus.find(({ value }) => value === _dt.value)}
                                                        setChecked={(e) => handleChecked(e.target.checked, _dt, 'payment_status')}
                                                        className={classes.checkboxOption}
                                                        checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                                                        icon={<span className={classes.icon} />}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </FilterDialog>
                                </div>
                            </ClickAwayListener>
                        </div>
                        <div className="top-item right-0 datepicker-container">
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
                    <Collapse in={search || !filters.filter((filt) => filt.name !== 'track_status').every((field) => isEmpty(field.value))}>
                        <div className={classes.expandGrid}>
                            {(!filters.every((field) => isEmpty(field.value))) && (
                                <Button className={classes.btnFilterText} onClick={handleReset}>
                                    {t('common:Reset_Filter')}
                                </Button>
                            )}
                            <Grid container spacing={3} alignContent="center" alignItems="center">
                                {selectedDate.some((date) => date !== null) ? (
                                    <Grid item className="filter-item" xs="auto">
                                        {renderFilterDateText()}
                                        <IconButton className={classes.closeButton} onClick={() => handleDateChange([null, null])}>
                                            <CloseIcon className={classes.closeIcon} />
                                        </IconButton>
                                    </Grid>
                                ) : null}
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
                                {dataSellerOrderStatus.some((_status) => !status !== 'all' && _status.value === status) ? (
                                    <Grid item className="filter-item" xs="auto">
                                        {dataSellerOrderStatus.find((_status) => _status.value === status).label}
                                        <IconButton className={classes.closeButton} onClick={() => handleChangeStatus(null, null)}>
                                            <CloseIcon className={classes.closeIcon} />
                                        </IconButton>
                                    </Grid>
                                ) : null}
                                {sellerChannel.map((tamp) => (
                                    <Grid item className="filter-item" xs="auto" key={tamp.id}>
                                        {tamp.channel_name}
                                        <IconButton className={classes.closeButton} onClick={() => handleChecked(false, tamp, 'seller_channel')}>
                                            <CloseIcon className={classes.closeIcon} />
                                        </IconButton>
                                    </Grid>
                                ))}
                                {paymentStatus.map((tamp) => (
                                    <Grid item className="filter-item" xs="auto" key={tamp.id}>
                                        {tamp.label}
                                        <IconButton className={classes.closeButton} onClick={() => handleChecked(false, tamp, 'payment_status')}>
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
