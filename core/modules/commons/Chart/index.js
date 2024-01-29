/* eslint-disable no-unused-vars */
import * as React from 'react';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    LineSeries,
    BarSeries,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { scaleBand } from '@devexpress/dx-chart-core';
import { ArgumentScale, Stack } from '@devexpress/dx-react-chart';
import useStyles from '@common_chart/style';
import { useTranslation } from '@i18n';

const CustomCart = ({
    data = [],
    className = {},
    chartType = 'line',
    argumentField,
    seriesFields = [],
}) => {
    const { t } = useTranslation('common');
    const classes = useStyles();
    const getClassByType = (type) => {
        if (type === 'bar') {
            return classes.bar;
        }
        return classes.line;
    };
    const customClass = classNames(
        getClassByType(chartType),
        className,
    );
    const ComponentSeries = chartType === 'line' ? LineSeries : BarSeries;
    return (
        <Paper className={customClass}>
            <Chart
                data={data}
                className={classes.chart}
            >
                <ArgumentScale factory={scaleBand} />
                <ArgumentAxis />
                <ValueAxis />
                {seriesFields.map((seriesField, i) => (
                    <ComponentSeries
                        key={i}
                        valueField={seriesField.valueField}
                        argumentField={argumentField}
                        name={seriesField.name}
                        color={seriesField.color}
                    />
                ))}
                <Legend position="bottom" />
                <Stack />
            </Chart>
        </Paper>
    );
};

export default CustomCart;
