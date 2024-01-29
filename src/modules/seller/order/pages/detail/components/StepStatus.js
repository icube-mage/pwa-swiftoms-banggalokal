import React from 'react';
import clsx from 'clsx';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';

import { makeStyles, withStyles } from '@material-ui/core/styles';

import {
    PRIMARY_DARK, TABLE_GRAY, ERROR,
    YELLOW_STATUS, CYAN_STATUS, ORANGE_STATUS, PURPLE,
    GRAY_BG_2,
    PURPLE_STATUS,
} from '@theme_color';
import { breakPointsUp } from '@helper_theme';
import { stepNumber } from '@sellermodules/order/helpers';
import useStyles from '@sellermodules/order/pages/detail/components/style';

const Connector = withStyles((theme) => ({
    alternativeLabel: {
        top: 44,
        [theme.breakpoints.down('sm')]: {
            top: 11,
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: TABLE_GRAY,
        borderRadius: 1,
    },
}))(StepConnector);

const ALT_LABEL = '#A0A0A0';

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
        color: ALT_LABEL,
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
        backgroundColor: GRAY_BG_2,
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
        backgroundSize: '50%',
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
        1: '/assets/img/seller_order_status/Confirm',
        2: '/assets/img/seller_order_status/Processing',
        3: '/assets/img/seller_order_status/Pack',
        4: '/assets/img/seller_order_status/Shipping',
        5: '/assets/img/seller_order_status/Complete',
    };

    const colorsActive = {
        1: canceled ? ERROR : PURPLE,
        2: YELLOW_STATUS,
        3: CYAN_STATUS,
        4: PURPLE_STATUS,
        5: ORANGE_STATUS,
    };

    const backgroundImage = `url(${icons[String(icon)]}${(active || completed) && icon !== 1 ? '-white' : ''}.svg)`;

    const backgroundColor = (active || completed) && colorsActive[String(icon)];
    return (
        <div
            className={clsx(classes.root)}
            style={{ backgroundColor }}
        >
            <div
                className={clsx(classes.bgImage)}
                style={{ backgroundImage }}
            />
        </div>
    );
}

export default function CustomizedSteppers(props) {
    const { t, data, dataSellerOrderStatus } = props;
    const classes = useStyles();
    const isDesktop = breakPointsUp('md');

    const steps = [
        dataSellerOrderStatus.find((_status) => _status.value === 'unconfirmed').label,
        dataSellerOrderStatus.find((_status) => _status.value === 'confirmed').label,
        dataSellerOrderStatus.find((_status) => _status.value === 'ready_for_ship').label,
        dataSellerOrderStatus.find((_status) => _status.value === 'order_shipped').label,
        dataSellerOrderStatus.find((_status) => _status.value === 'order_delivered').label,
    ];
    const stepActive = stepNumber(data.status?.code);

    return (
        isDesktop ? (
            <Stepper className={classes.stepContainer} alternativeLabel activeStep={stepActive} connector={<Connector />}>
                {stepActive < 5 ? steps.map((label) => (
                    <Step key={label}>
                        <ColorLabel StepIconComponent={ColorlibStepIcon}>
                            {label}
                            <br />
                            <span className="track">
                                {stepActive >= 2 && label === t('sellerorder:In_Delivery') && data.tracks.status?.label
                                    ? `( ${data.tracks.status?.label} )`
                                    : ''}
                            </span>
                        </ColorLabel>
                    </Step>
                )) : (
                    <Step>
                        <ColorLabel StepIconComponent={(e) => ColorlibStepIcon({ ...e, canceled: true })}>
                            {t('sellerorder:Canceled')}
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
                                icon: stepActive < 5 ? stepActive + 1 : 1,
                                canceled: !(stepActive < 5),
                            })}
                        >
                            {stepActive < 5 ? steps[stepActive] : t('sellerorder:Canceled')}
                        </ColorLabel>
                    </Step>
                </Stepper>
            )
    );
}
