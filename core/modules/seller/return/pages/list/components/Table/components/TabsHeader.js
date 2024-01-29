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
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import EventIcon from '@material-ui/icons/Event';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Button from '@common_button';
import Tabs from '@common_tabsseller';
import TextField from '@common_textfield';
import Checkbox from '@common_checkbox';

import formatDate from '@helper_date';
import { useDebounce, isEmpty } from '@sellermodules/return/pages/list/components/Table/helpers';
import useStyles from '@sellermodules/return/pages/list/components/Table/style';

const filterField = {
    return_type: {
        field: 'return_type',
        name: 'return_type',
        type: 'in',
        value: [],
        format: 'array',
    },
    created_at: [{
        field: 'created_at',
        name: 'created_at_from',
        type: 'from',
        value: '',
        format: 'date',
    }, {
        field: 'created_at',
        name: 'created_at_to',
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
        field: 'status_code',
        name: 'status_code',
        type: 'in',
        value: [],
        format: 'array',
    },
};

const TabsHeader = (props) => {
    const {
        header = '', t, searchPlaceholder = '', filters = [], setFilters,
        search, setSearch, dataTabs, tab, dataLocations = [], dataReturnType = [],
        selectedDate, setSelectedDate, dataStatus = [],
    } = props;
    const router = useRouter();
    const classes = useStyles();

    const [anchorElLoc, setAnchorElLoc] = React.useState(null);
    const [locations, setLocations] = React.useState([]);
    const debouncedLocations = useDebounce(locations, 100);

    const [anchorElType, setAnchorElType] = React.useState(null);
    const [types, setTypes] = React.useState([]);
    const debouncedTypes = useDebounce(types, 100);

    const [anchorElStatus, setAnchorElStatus] = React.useState(null);
    const [statuses, setStatuses] = React.useState([]);
    const debouncedStatus = useDebounce(statuses, 100);

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
            ...filterField.created_at[0],
            value: formatDate(e[0], 'YYYY-MM-DD 00:00:00'),
        }, {
            ...filterField.created_at[1],
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

    const onChangeTab = (e, v) => {
        const routeParams = v === 'all' ? '' : `/${v}`;
        setStatuses([]);
        router.replace(`/seller/return${routeParams}`, undefined, { shallow: true });
    };

    const handleChecked = (check, v, filterName) => {
        switch (filterName) {
        case 'location':
            if (check) {
                return setLocations((prev) => [...prev, v]);
            }
            return setLocations((prev) => prev.filter((p) => p.value !== v.value));
        case 'type':
            if (check) {
                return setTypes((prev) => [...prev, v]);
            }
            return setTypes((prev) => prev.filter((p) => p.code !== v.code));
        case 'status':
            if (check) {
                return setStatuses((prev) => [...prev, v]);
            }
            return setStatuses((prev) => prev.filter((p) => p.status_code !== v.status_code));
        default:
            return null;
        }
    };

    const handleReset = () => {
        setSelectedDate([null, null]);
        setSearch('');
        setLocations([]);
        setTypes([]);
        setStatuses([]);
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
        const filterLocation = { ...filterField.location };
        let temp = [...filters];

        locations.forEach((e) => {
            filterLocation.value = [...filterLocation.value, e.value];
        });
        temp = insertFilter(filterLocation, temp);

        setFilters([...temp]);
    }, [debouncedLocations]);

    React.useEffect(() => {
        const filterType = { ...filterField.return_type };
        let temp = [...filters];

        types.forEach((e) => {
            filterType.value = [...filterType.value, e.code];
        });
        temp = insertFilter(filterType, temp);

        setFilters([...temp]);
    }, [debouncedTypes]);

    React.useEffect(() => {
        const filterStatus = { ...filterField.status };
        let temp = [...filters];

        statuses.forEach((e) => {
            filterStatus.value = [...filterStatus.value, e.status_code];
        });
        temp = insertFilter(filterStatus, temp);

        setFilters([...temp]);
    }, [debouncedStatus]);

    return (
        <Paper className={classes.paperHead} style={{ marginBottom: 20 }}>
            <div className={clsx(classes.header, 'nopad')}>
                {header}
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
                                onClick={(e) => handleClickOpenButton(e, setAnchorElType)}
                                endIcon={
                                    <KeyboardArrowRightIcon className={getArrowClass(anchorElType)} />
                                }
                            >
                                {t('sellerreturn:Return_Type')}
                            </Button>
                            <Menu
                                elevation={1}
                                getContentAnchorEl={null}
                                anchorEl={anchorElType}
                                open={Boolean(anchorElType)}
                                onClose={() => setAnchorElType(null)}
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
                                {dataReturnType?.map((type, i) => (
                                    <MenuItem key={i} className={classes.menuItem}>
                                        <Checkbox
                                            label={type.title}
                                            checked={!!types.find((ty) => ty.code === String(type.code))}
                                            setChecked={(e) => handleChecked(e.target.checked, type, 'type')}
                                            className={classes.checkboxOption}
                                        />
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>
                        <div className={clsx('top-item', tab !== 'all' ? 'hide' : '')}>
                            <Button
                                className={clsx(classes.btnFilter, 'gray')}
                                onClick={(e) => handleClickOpenButton(e, setAnchorElStatus)}
                                endIcon={
                                    <KeyboardArrowRightIcon className={getArrowClass(anchorElStatus)} />
                                }
                            >
                                {t('sellerreturn:Status')}
                            </Button>
                            <Menu
                                elevation={1}
                                getContentAnchorEl={null}
                                anchorEl={anchorElStatus}
                                open={Boolean(anchorElStatus)}
                                onClose={() => setAnchorElStatus(null)}
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
                                {dataStatus?.map((status, i) => (
                                    <MenuItem key={i} className={classes.menuItem}>
                                        <Checkbox
                                            label={status.status_label}
                                            checked={!!statuses.find((ty) => ty.status_code === String(status.status_code))}
                                            setChecked={(e) => handleChecked(e.target.checked, status, 'status')}
                                            className={classes.checkboxOption}
                                        />
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>
                        <div className="top-item">
                            <Button
                                className={clsx(classes.btnFilter, 'gray')}
                                onClick={(e) => handleClickOpenButton(e, setAnchorElLoc)}
                                endIcon={
                                    <KeyboardArrowRightIcon className={getArrowClass(anchorElLoc)} />
                                }
                            >
                                {t('sellerreturn:Location')}
                            </Button>
                            <Menu
                                elevation={1}
                                getContentAnchorEl={null}
                                anchorEl={anchorElLoc}
                                open={Boolean(anchorElLoc)}
                                onClose={() => setAnchorElLoc(null)}
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
                                {dataLocations?.map((dl, i) => (
                                    <MenuItem key={i} className={classes.menuItem}>
                                        <Checkbox
                                            label={dl.label}
                                            checked={!!locations.find((loc) => loc.value === String(dl.value))}
                                            setChecked={(e) => handleChecked(e.target.checked, dl, 'location')}
                                            className={classes.checkboxOption}
                                        />
                                    </MenuItem>
                                ))}
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
                                            <TextField className={classes.inputDate} {...startProps.inputProps} placeholder="From" />
                                            <DateRangeDelimiter> - </DateRangeDelimiter>
                                            <TextField className={classes.inputDate} {...endProps.inputProps} placeholder="To" />
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
                                        {t('sellerreturn:Reset_Filter')}
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
                                {types.map((type) => (
                                    <Grid item className="filter-item" xs="auto" key={type.code}>
                                        {type.title}
                                        <IconButton className={classes.closeButton} onClick={() => handleChecked(false, type, 'type')}>
                                            <CloseIcon className={classes.closeIcon} />
                                        </IconButton>
                                    </Grid>
                                ))}
                                {locations.map((loc) => (
                                    <Grid item className="filter-item" xs="auto" key={loc.value}>
                                        {loc.label}
                                        <IconButton className={classes.closeButton} onClick={() => handleChecked(false, loc, 'location')}>
                                            <CloseIcon className={classes.closeIcon} />
                                        </IconButton>
                                    </Grid>
                                ))}
                                {statuses.map((stat) => (
                                    <Grid item className="filter-item" xs="auto" key={stat.value}>
                                        {stat.status_label}
                                        <IconButton className={classes.closeButton} onClick={() => handleChecked(false, stat, 'status')}>
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
