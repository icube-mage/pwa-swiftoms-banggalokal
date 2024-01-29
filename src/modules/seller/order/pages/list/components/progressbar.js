/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import useStyles from '@common_progressbar/style';
import { useTranslation } from '@i18n';

const ProgressBar = (props) => {
    const { t } = useTranslation('common');
    const { total, value, barBgColor = '' } = props;
    const percent = Math.floor((value / total) * 100) ? Math.floor((value / total) * 100) : 0;
    const BorderLinearProgress = withStyles((theme) => ({
        root: {
            height: 6,
            borderRadius: 5,
        },
        colorPrimary: {
            backgroundColor: barBgColor,
        },
        bar: {
            borderRadius: 5,
            backgroundColor: () => {
                if (percent >= 0 && percent < 55) {
                    return '#BE1F93';
                } else if (percent >=55 && percent < 80) {
                    return '#FFBB39';
                } else {
                    return '#F43030';
                }
            },
        },
        textPercent: {
            fontSize: 12,
        }
    }))(LinearProgress);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <p style={{fontSize: 11, margin: 0, marginBottom: 5 }}>{total ? `${t('used')} ${value} ${t('of')} ${total} ${t('order')}` : t('unlimited_order')}</p>
            <BorderLinearProgress variant="determinate" value={total ? percent : 100 } />
        </div>
    );
};

export default ProgressBar;
