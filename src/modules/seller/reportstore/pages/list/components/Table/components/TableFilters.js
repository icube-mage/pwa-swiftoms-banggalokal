/* eslint-disable object-curly-newline */
import React from 'react';
import Autocomplete from '@common_autocomplete';
import makeStyles from '@material-ui/core/styles/makeStyles';
import formatDate from '@helper_date';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {
    PRIMARY_DARK, BORDER_COLOR, PRIMARY, WHITE, BLACK, GRAY_LIGHT,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    input: {
        paddingTop: '8.5px',
        paddingBottom: '8.5px',
    },
    gridFilters: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
        '& .MuiTextField-root': {
            width: '100%',
        },
        '& .col-filter': {
            padding: 12,
        },
        '& .col-filter h4': {
            margin: 0,
            marginBottom: 10,
        },
        '& div.react-datepicker .react-datepicker__month-text--keyboard-selected': {
            backgroundColor: 'transparent',
            color: BLACK,
        },
        '& div.react-datepicker .react-datepicker__month-text--in-range': {
            backgroundColor: PRIMARY,
            color: WHITE,
        },
        '& div.react-datepicker .react-datepicker__month-text--in-selecting-range': {
            backgroundColor: 'rgb(133, 21, 102)',
            color: WHITE,
        },
        '& div.react-datepicker .react-datepicker-year-header': {
            backgroundColor: GRAY_LIGHT,
        },
        '& div.react-datepicker .react-datepicker__navigation-icon::before': {
            borderColor: 'rgba(0, 0, 0, 0.54)',
        },
        '& div.react-datepicker .react-datepicker__month-text': {
            width: '6rem',
            margin: '5px',
            fontSize: 16,
            padding: '4px 0',
            [theme.breakpoints.down('xs')]: {
                width: '5rem',
                fontSize: 12,
            },
        },
    },
    dateContainer: {
        display: 'flex',
        alignItems: 'center',
        border: `1px solid ${BORDER_COLOR}`,
        borderColor: 'rgba(0, 0, 0, 0.23)',
        borderRadius: 4,
        height: 36,
        padding: '13px 15px',
        '& .MuiTypography-body1': {
            margin: 0,
        },
        '& .MuiSvgIcon-root': {
            fill: PRIMARY_DARK,
            width: 17,
            height: 17,
        },
        '& .MuiPickersDay-root.Mui-selected': {
            backgroundColor: PRIMARY_DARK,
        },
    },
    inputDate: {
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
        '&:hover': {
            '& .MuiInput-underline:before': {
                borderBottom: 'none',
            },
        },
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '& .MuiInput-root': {
            backgroundColor: 'transparent',
            borderRadius: 6,
            width: 90,
        },
        '& .MuiInputBase-input': {
            fontSize: 13,
            fontWeight: 600,
            color: PRIMARY_DARK,
            textAlign: 'center',
        },
        '& .MuiAutocomplete-inputRoot': {
            height: 42,
            borderBottom: 'none',
        },
        '& .MuiInput-underline.Mui-disabled:before': {
            borderBottomStyle: 'none',
        },
    },
    dateRangeClass: {
        width: '100%',
        '& .react-datepicker__calendar-icon': {
            padding: 0,
            top: 10,
            right: 10,
        },
        '& input': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
            borderRadius: 4,
            padding: '9px 15px',
            width: '100%',
        },
        '& .react-datepicker__close-icon': {
            right: 35,
            top: -1,
        },
        '& .react-datepicker__close-icon::after': {
            backgroundColor: GRAY_LIGHT,
        },
    },
}));

const filterField = {
    period: [{
        field: 'period',
        name: 'period_from',
        type: 'from',
        value: '',
        format: 'date',
    }, {
        field: 'period',
        name: 'period_to',
        type: 'to',
        value: '',
        format: 'date',
    }],
};

const TableFilters = (props) => {
    const {
        filters, setFilters, sorts, setSorts, columns,
        selectedDate, setSelectedDate, t,
    } = props;
    const classes = useStyles();

    const [filterValue, setFilterValue] = React.useState();

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
            ...filterField.period[0],
            value: formatDate(e[0], 'YYYY-MM'),
        }, {
            ...filterField.period[1],
            value: formatDate(e[1], 'YYYY-MM'),
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
        setFilters([]);
    };

    const setSortByField = (field) => {
        setSorts(
            sorts.map((sort) => ({
                ...sort,
                ...(sort.field === field && { value: 'DESC' }),
                ...(sort.field !== field && { value: undefined }),
            })),
        );
    };

    return (
        <div style={{ padding: '15px 12px' }}>
            <div className={classes.gridFilters}>
                <div className="col-filter">
                    <h4>{t('sellerreport:period_time')}</h4>
                    <DatePicker
                        onChange={(update) => {
                            if (update.every((e) => e === null)) {
                                handleReset();
                            } else {
                                setSelectedDate(update);
                            }
                        }}
                        startDate={selectedDate[0]}
                        endDate={selectedDate[1]}
                        selectsRange
                        dateFormat="MMM yyyy"
                        showMonthYearPicker
                        showFullMonthYearPicker
                        onCalendarClose={handleDateClose}
                        placeholderText={t('sellerreport:choose_period')}
                        showIcon
                        isClearable
                        wrapperClassName={classes.dateRangeClass}
                    />
                </div>
                <div className="col-filter">
                    <h4>{t('common:sort')}</h4>
                    <Autocomplete
                        value={columns.find((e) => e.field === filterValue)}
                        onChange={(newValue) => {
                            setFilterValue(newValue && newValue.field);
                            setSortByField(newValue && newValue.field);
                        }}
                        options={columns.filter((e) => e.sortable)}
                        primaryKey="field"
                        labelKey="headerName"
                    />
                </div>
            </div>
        </div>
    );
};

export default TableFilters;
