/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import Button from '@common_button';
import TextField from '@common_textfield';

import formatDate from '@helper_date';
import { isEmpty } from '@modules/integrationautomation/pages/edit/components/log/Table/helpers';
import useStyles from '@modules/integrationautomation/pages/edit/components/log/Table/style';

const filterField = {
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
    result: {
        field: 'result',
        name: 'result',
        type: 'eq',
        value: '',
    },
};

const TabsHeader = (props) => {
    const {
        header = '', t, searchPlaceholder = '', filters = [], setFilters,
        search, setSearch, selectedDate, setSelectedDate,
    } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const resultOption = [
        { value: 'failed', label: t('integrationautomation:Failed') },
        { value: 'success', label: t('integrationautomation:Success') },
        { value: 'warning', label: t('integrationautomation:Warning') },
    ];

    const getArrowClass = (anchor) => (anchor ? classes.arrowUp : classes.arrowDown);

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

    const handleClickFilter = (value, field_name) => {
        const field = {
            ...filterField[field_name],
            value,
        };
        let temp = [...filters];
        temp = insertFilter(field, temp);
        setFilters([...temp]);
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

    const handleReset = () => {
        setSelectedDate([null, null]);
        setSearch('');
        setFilters(filters.filter(({ hidden }) => hidden));
    };

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

    return (
        <Paper className={classes.paperHead} style={{ marginBottom: 20 }}>
            <div className={clsx(classes.header, 'nopad')}>
                {header}
            </div>

            <div className={classes.tableToolbar}>
                <div className="top-buttons-wrapper nopad">
                    <div className="top-item-left">
                        <div className="top-item">
                            <TextField
                                className={classes.fieldRoot}
                                placeholder={searchPlaceholder}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                InputProps={{
                                    className: classes.fieldInput,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <img alt="" src="/assets/img/search-gray.svg" className={classes.iconImg} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                    </div>
                    <div className="top-item-right">
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
                                            <TextField className={classes.inputDate} {...startProps.inputProps} placeholder={t('common:From')} />
                                            <DateRangeDelimiter> - </DateRangeDelimiter>
                                            <TextField className={classes.inputDate} {...endProps.inputProps} placeholder={t('common:To')} />
                                        </div>
                                    )}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className="top-item">
                            <Button
                                className={clsx(classes.btnFilter, 'gray')}
                                onClick={(e) => handleClickOpenButton(e, setAnchorEl)}
                                endIcon={
                                    <KeyboardArrowRightIcon className={getArrowClass(anchorEl)} />
                                }
                            >
                                {t('integrationautomation:Status')}
                            </Button>
                            <Menu
                                elevation={1}
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
                                {resultOption.map((menuItem, i) => (
                                    <MenuItem
                                        key={i}
                                        onClick={() => setAnchorEl(null)}
                                        className={classes.menuItem}
                                    >
                                        <div
                                            onClick={() => handleClickFilter(menuItem.value, 'result')}
                                            aria-hidden="true"
                                        >
                                            {menuItem.label}
                                        </div>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>
                    </div>
                </div>
                <div className={classes.expandContainer}>
                    <Collapse in={search || !filters.filter((filt) => !filt.hidden)
                        .every((field) => isEmpty(field.value))}
                    >
                        <div className={classes.expandGrid}>
                            {(!!search || !filters.filter((filt) => !filt.hidden).every((field) => isEmpty(field.value)))
                                && (
                                    <Button
                                        className={classes.btnFilterText}
                                        onClick={handleReset}
                                    >
                                        {t('integrationautomation:Reset_Filter')}
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
                                {!!filters.find(({ name }) => name === 'result')?.value
                                    && (
                                        <Grid item className="filter-item" xs="auto">
                                            {resultOption.find(({ value }) => value === filters.find(({ name }) => name === 'result')?.value)?.label}
                                            <IconButton className={classes.closeButton} onClick={() => handleClickFilter('', 'result')}>
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
