/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable object-curly-newline */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Autocomplete from '@common_autocomplete';
import PropTypes from 'prop-types';
import classnames from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { PRIMARY, PRIMARY_DARK } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    input: {
        paddingTop: '8.5px',
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
            backgroundColor: 'white',
            borderRadius: 6,
            padding: '5px 10px 0',
            height: 42,
        },
        '& .MuiAutocomplete-inputRoot': {
            height: 42,
            borderBottom: 'none',
        },
        '& .MuiInput-underline.Mui-disabled:before': {
            borderBottomStyle: 'none',
        },
    },
    label: {
        color: PRIMARY_DARK,
        fontWeight: 600,
        fontSize: 13,
    },
    btnFilter: {
        background: PRIMARY,
        borderRadius: 6,
        padding: '12px 15px',
        height: 42,
        fontSize: 13,
        '&:hover': {
            background: PRIMARY_DARK,
        },
        fontWeight: 600,
    },
    btnFilterText: {
        boxShadow: 'none !important',
        background: 'transparent',
        borderRadius: 6,
        padding: '12px 15px',
        height: 42,
        fontSize: 13,
        color: PRIMARY_DARK,
        '&:hover': {
            background: 'none',
        },
        fontWeight: 600,
    },
    gridFilters: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
        '& .MuiTextField-root': {
            width: '100%',
        },
    },
}));

const defaultFilterComponent = (props) => {
    const { filterValue, setFilterValue, disabled, typeInput, useTime = false, type, options = [] } = props;
    const classes = useStyles();
    const onChange = (e) => {
        if (typeInput === 'date' && useTime) {
            if (type === 'from') {
                e.target.value ? setFilterValue(`${e.target.value} 00:00:00`)
                    : setFilterValue(`${e.target.value}`);
            } else {
                e.target.value ? setFilterValue(`${e.target.value} 23:59:59`)
                    : setFilterValue(`${e.target.value}`);
            }
        } else {
            setFilterValue(e.target.value);
        }
    };
    if (typeInput === 'autocomplete') {
        return (
            <Autocomplete
                value={options.find((e) => e.value === filterValue)}
                onChange={(newValue) => setFilterValue(newValue && newValue.value)}
                options={options}
                primaryKey="value"
                labelKey="label"
                disabled={disabled}
                renderInput={(params) => (
                    <TextField
                        value={filterValue?.value}
                        size="small"
                        className={classes.input}
                        {...params}
                    />
                )}
            />
        );
    }

    return (
        <TextField
            size="small"
            type={typeInput}
            value={filterValue}
            onChange={onChange}
            className={classes.input}
            disabled={disabled}
        />
    );
};

const TableFilters = (props) => {
    const {
        initialFilters,
        setParentFilters,
        handleReset = () => { },
        t,
    } = props;
    const classes = useStyles();

    // state
    const [filters, setFilters] = React.useState(initialFilters);
    const emptyFiltersField = filters && !filters.length;

    // methods
    const getFilterValueByField = (field) => {
        const index = filters.findIndex((filter) => filter.name === field.name);
        return index >= 0 ? filters[index].value : '';
    };
    const setFilterValueByField = (field, value) => {
        const index = filters.findIndex((filter) => filter.name === field.name);
        if (index >= 0) {
            setFilters(
                filters.map((filter) => ({
                    ...filter,
                    ...(filter.name === field.name && { ...field, value }),
                })),
            );
        } else {
            setFilters([...filters, { ...field, value }]);
        }
    };

    return (
        <div style={{ padding: 12 }}>
            {emptyFiltersField && <div style={{ padding: 12 }}>{t('common:Filter_fields_is_empty')}</div>}
            <div className={classes.gridFilters}>
                {filters.filter((field) => !field.hidden).map((field, i) => (
                    <div
                        className={classnames('col-filter', field.class)}
                        key={i}
                        style={{ padding: 12, display: 'inline-block' }}
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                if (!emptyFiltersField) setParentFilters(filters);
                            }
                        }}
                    >
                        <div className={classes.label}>{field.label}</div>
                        {(field.component || defaultFilterComponent)({
                            get filterValue() {
                                return getFilterValueByField(field);
                            },
                            setFilterValue: (value) => setFilterValueByField(field, value),
                            ...field,
                        })}
                    </div>
                ))}
            </div>
            <div style={{ padding: 12 }}>
                <Button
                    className={classes.btnFilter}
                    onClick={() => {
                        if (!emptyFiltersField) setParentFilters(filters);
                    }}
                >
                    {t('common:Apply_Filters')}
                </Button>
                <Button
                    className={classes.btnFilterText}
                    onClick={() => {
                        if (!emptyFiltersField) {
                            const resetedFilters = filters.map((filter) => (
                                { ...filter, value: filter.class === 'fixed' ? filter.initialValue : '' }
                            ));
                            setFilters(resetedFilters);
                            setParentFilters(resetedFilters);
                            handleReset();
                        }
                    }}
                >
                    {t('common:Clear_Filters')}
                </Button>
            </div>
        </div>
    );
};

TableFilters.propTypes = {
    initialFilters: PropTypes.array,
};

TableFilters.defaultProps = {
    initialFilters: [],
};

export default TableFilters;
