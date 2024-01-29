/* eslint-disable no-nested-ternary */
import React from 'react';
import clsx from 'clsx';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';

import { makeStyles, withStyles } from '@material-ui/core/styles';

import {
    PRIMARY_DARK, GRAY_LIGHT, GRAY_BG,
} from '@theme_color';
import { breakPointsUp } from '@helper_theme';
import useStyles from '@sellermodules/return/pages/detail/components/style';

const Connector = withStyles((theme) => ({
    alternativeLabel: {
        top: 47,
        [theme.breakpoints.down('sm')]: {
            top: 11,
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: GRAY_BG,
        borderRadius: 1,
    },
}))(StepConnector);

const ColorLabel = withStyles({
    label: {
        fontWeight: 'bold',
        color: PRIMARY_DARK,
        '&$active': {
            color: PRIMARY_DARK,
            fontWeight: 'bold',
        },
        '&$completed': {
            color: PRIMARY_DARK,
            fontWeight: 'bold',
        },
        '& .track': {
            fontSize: 12,
        },
    },
    alternativeLabel: {
        color: GRAY_LIGHT,
    },
    active: {
        color: PRIMARY_DARK,
    },
    completed: {
        color: PRIMARY_DARK,
    },
})(StepLabel);

const useStepStyles = makeStyles((theme) => ({
    root: {
        zIndex: 1,
        color: '#fff',
        width: 100,
        height: 100,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            width: 75,
            height: 75,
        },
    },
    bgImage: {
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: 100,
        height: 100,
    },
}));

function ColorlibStepIcon(props) {
    const classes = useStepStyles();
    const {
        active, completed, icon, canceled = false,
    } = props;

    const icons = {
        1: '/assets/img/seller_return_status/pending_approval',
        2: '/assets/img/seller_return_status/approved',
        3: '/assets/img/seller_return_status/package_sent',
        4: '/assets/img/seller_return_status/package_received',
        5: '/assets/img/seller_return_status/processing',
        6: '/assets/img/seller_return_status/complete',
        7: '/assets/img/seller_return_status/canceled',
    };

    const backgroundImage = `url(${canceled ? icons[7] : icons[String(icon)]}${!(active || completed) ? '_inactive' : ''}.svg)`;
    return (
        <div
            className={clsx(classes.root)}
        >
            <div
                className={clsx(classes.bgImage)}
                style={{ backgroundImage }}
            />
        </div>
    );
}

export default function CustomizedSteppers(props) {
    const {
        stepActive, dataStatus, data,
    } = props;
    const classes = useStyles();
    const isDesktop = breakPointsUp('md');

    const completeIndex = dataStatus?.findIndex(({ status_code }) => status_code === 'complete') + 1;

    return (
        isDesktop ? (
            <Stepper className={classes.stepContainer} alternativeLabel activeStep={stepActive} connector={<Connector />}>
                {stepActive < 6
                    ? dataStatus?.slice(0, completeIndex).map(({ status_code, status_label }) => (
                        <Step key={status_code}>
                            <ColorLabel StepIconComponent={ColorlibStepIcon}>
                                {status_label}
                            </ColorLabel>
                        </Step>
                    )) : (
                        <Step>
                            <ColorLabel StepIconComponent={(e) => ColorlibStepIcon({ ...e, canceled: true })}>
                                {dataStatus.find(({ status_code }) => data.status_code === status_code)?.status_label}
                            </ColorLabel>
                        </Step>
                    )}
            </Stepper>
        )
            : (
                <Stepper className={classes.stepContainer} alternativeLabel activeStep={stepActive} connector={<Connector />}>
                    <Step>
                        <ColorLabel
                            StepIconComponent={(e) => ColorlibStepIcon({
                                ...e,
                                icon: stepActive < 6 ? stepActive + 1 : 1,
                                canceled: !(stepActive < 6),
                            })}
                        >
                            {dataStatus.find(({ status_code }) => data.status_code === status_code)?.status_label}
                        </ColorLabel>
                    </Step>
                </Stepper>
            )
    );
}
