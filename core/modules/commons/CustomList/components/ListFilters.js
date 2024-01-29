/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable object-curly-newline */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import PropTypes from 'prop-types';
import classnames from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
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

const defaultFilterComponent = ({ filterValue, setFilterValue, disabled }) => (
    <TextField
        variant="outlined"
        size="small"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        disabled={disabled}
    />
);

const ListFilters = (props) => {
    const {
        initialFilters,
        parentFilters,
        setParentFilters,
        handleReset = () => { },
        t,
    } = props;
    const classes = useStyles();
    // state
    const [filters, setFilters] = React.useState(parentFilters);
    const emptyFiltersField = filters && !filters.length;

    // methods
    const getFilterValueByField = (field) => {
        const index = filters.findIndex((filter) => filter.name === field.name);
        return index >= 0 ? filters[index].value : '';
    };
    const setFilterValueByField = (field, value) => {
        const index = filters.findIndex((filter) => filter.name === field.name);
        if (index >= 0) {
            setFilters(filters.map((filter) => ({
                ...filter,
                ...(filter.name === field.name && { ...field, value }),
            })));
        } else {
            setFilters([...filters, { ...field, value }]);
        }
    };

    return (
        <div style={{ padding: 12 }}>
            {!emptyFiltersField && (
                <div style={{ padding: 12 }}>{t('common:Filter_fields_is_empty')}</div>
            )}
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
                        <div>
                            {field.label}
                        </div>
                        {(field.component || defaultFilterComponent)({
                            get filterValue() { return getFilterValueByField(field); },
                            setFilterValue: (value) => setFilterValueByField(field, value),
                            disabled: field.disabled,
                        })}
                    </div>
                ))}
            </div>
            <div style={{ padding: 12 }}>
                <Button
                    buttonType="primary-rounded"
                    onClick={() => {
                        // only set filters which have value
                        if (!emptyFiltersField) setParentFilters(filters);
                    }}
                >
                    {t('common:Apply')}
                </Button>
                <Button
                    buttonType="link"
                    onClick={async () => {
                        if (!emptyFiltersField) {
                            const resetedFilters = await initialFilters.map((filter) => ({ ...filter, value: filter.initialValue }));
                            setFilters(resetedFilters);
                            setParentFilters(resetedFilters);
                            handleReset();
                        }
                    }}
                >
                    {t('common:Clear')}
                </Button>
            </div>
        </div>
    );
};

ListFilters.propTypes = {
    initialFilters: PropTypes.array,
};

ListFilters.defaultProps = {
    initialFilters: [],
};

export default ListFilters;
