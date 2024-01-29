/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import useStyles from '@common_barcodescanner/style';

const ManualScan = (props) => {
    const {
        handleDetect, barcode, showHint = false,
    } = props;

    const classes = useStyles();
    const [isMatch, setIsMatch] = useState(null);

    const onDetected = (code) => {
        if (barcode) {
            if (barcode === code) {
                setIsMatch(1);
            } else {
                setIsMatch(0);
            }
        } else {
            setIsMatch(null);
        }
        handleDetect(code);
    };

    const inputBar = document.getElementById('inputbar');

    useEffect(() => {
        const handleDown = (e) => {
            if (e.which === 0) {
                const inputbar = document.getElementById('inputbar');
                inputbar.focus();
                setTimeout(() => { inputbar.setAttribute('inputMode', ''); }, 1);
            }
        };

        window.addEventListener('keydown', handleDown);

        return () => {
            window.removeEventListener('keydown', handleDown);
        };
    }, []);

    return (
        <>
            <input
                onChange={(e) => onDetected(e.nativeEvent?.data)}
                id="inputbar"
                style={{ opacity: 0, height: 1 }}
                inputMode="none"
                onBlur={() => inputBar.setAttribute('inputMode', 'none')}
            />
            <div className={clsx(classes.matchIconManual, 'hidden-sorting')}>
                {barcode ? isMatch !== null ? isMatch === 1 ? <CheckCircleIcon className={clsx(classes.icon, 'check')} />
                    : <CancelIcon className={clsx(classes.icon, 'cancel')} />
                    : <RemoveCircleIcon className={clsx(classes.icon, 'none')} />
                    : <div className={classes.scanText}>Press SCAN button on your device</div>}
            </div>
            {showHint && (
                <div className={classes.matchIconManual}>
                    <div className={classes.scanText}>Press SCAN button on your device</div>
                </div>
            )}
        </>
    );
};

export default ManualScan;
