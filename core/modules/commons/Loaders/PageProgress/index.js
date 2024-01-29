/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import LinearProgress from '@material-ui/core/LinearProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useTranslation } from '@i18n';

const useStyles = makeStyles(() => ({
    linearProgressWrapper: {
        position: 'fixed',
        width: '100%',
        left: '0',
        top: '0',
        zIndex: '999999',
    },
}));

const PageProgressLoader = () => {
    const { t } = useTranslation('common');
    const styles = useStyles();
    const [progress, setProgress] = useState();
    const [show, setShow] = useState(false);
    let timer = null;

    const handleRouteChangeStart = () => {
        setProgress(0);
        setShow(true);
        timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 100;
                }
                const diff = Math.random() * 10;
                let newProgress;
                if (oldProgress + diff > 90) {
                    newProgress = 90;
                } else {
                    newProgress = oldProgress + diff;
                }

                return Math.min(newProgress, 90);
            });
        }, 500);
    };

    const handleRouteChangeComplete = () => {
        clearInterval(timer);
        setProgress(100);
        setTimeout(() => {
            setShow(false);
        }, 1000);
    };

    const handleRouteChangeError = () => {
        clearInterval(timer);
        setProgress(100);
        setTimeout(() => {
            setShow(false);
        }, 500);
    };

    useEffect(() => {
        Router.events.on('routeChangeStart', handleRouteChangeStart);
        Router.events.on('routeChangeComplete', handleRouteChangeComplete);
        Router.events.on('RouteChangeError', handleRouteChangeError);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className={styles.linearProgressWrapper}>
            {show ? <LinearProgress variant="determinate" value={progress} color="primary" /> : null}
        </div>
    );
};

export default PageProgressLoader;
