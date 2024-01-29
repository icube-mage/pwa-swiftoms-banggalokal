/* eslint-disable no-lonely-if */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable react/button-has-type */
import React, { useState, useLayoutEffect } from 'react';
import Quagga from '@ericblade/quagga2';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from '@common_barcodescanner/style';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import clsx from 'clsx';

const App = ({
    barcode, handleDetect = () => { }, handleClose = () => { },
}) => {
    const classes = useStyles();
    const [isMatch, setIsMatch] = useState(null);
    const [readers, setReaders] = useState(['ean_reader', 'ean_8_reader', 'upc_reader', 'code_128_reader']);

    const readersType1 = ['ean_reader', 'ean_8_reader', 'upc_reader', 'code_128_reader'];
    const readersType2 = ['upc_reader', 'code_128_reader'];

    const _onDetected = (res) => {
        if (typeof barcode !== 'object') {
            if (barcode === res.codeResult.code) {
                setIsMatch(1);
                handleDetect(res.codeResult.code);
            } else {
                if (readers[0] === 'ean_reader') {
                    setReaders(readersType2);
                } else {
                    setIsMatch(0);
                }
            }
        } else if (typeof barcode === 'object') {
            if (readers[0] === 'ean_reader' && barcode.length && !barcode.includes(res.codeResult.code)) {
                setReaders(readersType2);
            } else {
                setIsMatch(1);
                handleDetect(res.codeResult.code);
            }
        } else {
            setIsMatch(1);
            handleDetect(res.codeResult.code);
        }
        setTimeout(() => { setIsMatch(null); setReaders(readersType1); }, 3000);
    };

    useLayoutEffect(() => {
        Quagga.init({
            inputStream: {
                type: 'LiveStream',
                target: document.querySelector('#scanner-container'),
                constraints: {
                    facingMode: 'environment', // or user
                },
            },
            numOfWorkers: navigator.hardwareConcurrency,
            locate: true,
            frequency: 1,
            debug: {
                drawBoundingBox: true,
                showFrequency: true,
                drawScanline: true,
                showPattern: true,
            },
            multiple: false,
            locator: {
                halfSample: false,
                patchSize: 'large', // x-small, small, medium, large, x-large
                debug: {
                    showCanvas: false,
                    showPatches: false,
                    showFoundPatches: false,
                    showSkeleton: false,
                    showLabels: false,
                    showPatchLabels: false,
                    showRemainingPatchLabels: false,
                    boxFromPatches: {
                        showTransformed: false,
                        showTransformedBox: false,
                        showBB: false,
                    },
                },
            },
            decoder: {
                readers,
            },
        }, (err) => {
            if (err) {
                return;
            }
            Quagga.start();
        });
        Quagga.onDetected(_onDetected);
        return () => {
            Quagga.offDetected(_onDetected);
            Quagga.offProcessed();
            Quagga.stop();
        };
    }, [readers]);

    return (
        <div style={{ marginBottom: 35 }}>
            <div className={classes.scan}>
                <div id="scanner-container">
                    <IconButton className={clsx(classes.closeButton, 'hidden-mobile')} onClick={handleClose}>
                        <CloseIcon className={classes.closeIcon} />
                    </IconButton>
                </div>
                <IconButton className={clsx(classes.closeButton, 'hidden-desktop')} onClick={handleClose}>
                    <CloseIcon className={classes.closeIcon} />
                </IconButton>

            </div>
            <div className={clsx(classes.matchIcon, 'hidden-sorting')}>
                {isMatch !== null ? isMatch === 1 ? <CheckCircleIcon className={clsx(classes.icon, 'check')} />
                    : <CancelIcon className={clsx(classes.icon, 'cancel')} /> : null}
            </div>
        </div>
    );
};

export default App;
