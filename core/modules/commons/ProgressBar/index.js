/* eslint-disable no-unused-vars */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import useStyles from '@common_progressbar/style';
import { useTranslation } from '@i18n';

const ProgressBar = (props) => {
    const { t } = useTranslation('common');
    const { title, total, value } = props;
    const BorderLinearProgress = withStyles((theme) => ({
        root: {
            height: 20,
            borderRadius: 5,
        },
        colorPrimary: {
            backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
        },
        bar: {
            borderRadius: 5,
            backgroundColor: '#8F8',
        },
    }))(LinearProgress);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div>
                <h3 className={classes.title}>{title}</h3>
                <div className={classes.totalValue}>
                    <h3 className={classes.total}>{`${value}/${total}`}</h3>
                    <span className={classes.percent}>
                        (
                        {' '}
                        {Math.floor((value / total) * 100) ? Math.floor((value / total) * 100) : 0}
                        %)
                    </span>
                </div>
            </div>
            <BorderLinearProgress variant="determinate" value={Math.floor((value / total) * 100) ? Math.floor((value / total) * 100) : 0} />
        </div>
    );
};

export default ProgressBar;
