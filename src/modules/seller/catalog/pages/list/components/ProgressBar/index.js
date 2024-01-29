/* eslint-disable no-unused-vars */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useTranslation } from '@i18n';
import useStyles from './style';

const ProgressBar = (props) => {
    const { t } = useTranslation('common');
    const { title, total, value } = props;
    const BorderLinearProgress = withStyles((theme) => ({
        root: {
            height: 4,
            borderRadius: 0,
            marginTop: -30,
        },
        colorPrimary: {
            backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
        },
        bar: {
            borderRadius: 5,
            backgroundColor: '#B92790',
        },
    }))(LinearProgress);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div>
                <h3 className={classes.title}>{title}</h3>
                <div className={classes.totalValue}>
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
