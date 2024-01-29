/* eslint-disable consistent-return */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import useStyles from '@sellermodules/plugins/guide/components/style';
import { getLocalStorage, setLocalStorage } from '@helper_localstorage';

import 'intro.js/introjs.css';

import Button from '@common_button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const Steps = dynamic(() => import('intro.js-react').then((mod) => mod.Steps), {
    ssr: false,
});

const Hints = dynamic(() => import('intro.js-react').then((mod) => mod.Hints), {
    ssr: false,
});

const IntroComponent = (props) => {
    const {
        getGuideData,
        introOptions,
        stepEnable,
        setStepEnable,
        isDesktop,
        isHomepage,
        page,
        pageHints,
        t,
    } = props;
    const classes = useStyles();

    const [openDialogHome, setOpenDialogHome] = useState(isHomepage);
    const [openConfirm, setOpenConfirm] = useState(false);

    const endConfirm = () => {
        setOpenConfirm(false);
        setLocalStorage(`GUIDE_${page}`, false);
    };

    const cancelConfirm = () => {
        setOpenConfirm(false);
        if (!stepEnable) {
            setOpenDialogHome(true);
        }
    };

    const sidebarClick = () => {
        if (!isDesktop) {
            const togle = document.querySelector('.togle-sidebar');
            if (togle) {
                togle.click();
            }
        }
    };

    const onBeforeChange = (stepIndex) => {
        if (getGuideData[stepIndex].element === '#guide-boxcard') {
            const togle = document.querySelector('.togle-sidebar');
            if (togle) {
                togle.click();
            }
        }
    };

    const handleBeforeExit = () => {
        if (getLocalStorage(`GUIDE_${page}`)) {
            setOpenConfirm(true);
            return false;
        }
    };

    useEffect(() => {
        const element = document.querySelector('.introjs-skipbutton');
        if (element && !getLocalStorage(`GUIDE_${page}`)) {
            setTimeout(() => {
                element.click();
            }, 500);
        }
    }, [openConfirm]);

    return (
        <>
            <Dialog
                open={openDialogHome}
                onClose={() => {
                    setOpenDialogHome(false);
                    setOpenConfirm(true);
                }}
                className={classes.dialogContainer}
            >
                <DialogContent className={classes.contentText}>
                    <img src="https://cdn.sirclo.com/images/onboarding/welcomeDialog-headerIllustrationDesktop.svg" alt="" className="prius355" />
                    <div className="detail">
                        <h2 style={{ margin: 0 }}>{t('guide:welcome_intro')} <span>SWIFT OMS</span></h2>
                        <p>{t('guide:welcome_text')}</p>
                    </div>
                </DialogContent>
                <DialogActions className={classes.action}>
                    <Button
                        onClick={() => {
                            sidebarClick();
                            setOpenDialogHome(false);
                            setTimeout(() => {
                                setStepEnable(true);
                            }, 500);
                        }}
                    >
                        {t('guide:start_guide')}
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openConfirm}
                onClose={cancelConfirm}
                className={classes.dialogContainerConfirm}
            >
                <DialogTitle className={classes.titleConfirm}>
                    {t('guide:sure_skip')}
                </DialogTitle>
                <DialogContent className={classes.contentTextConfirm}>
                    <p>{t('guide:sure_info')} <b>{t('guide:sure_info2')}</b></p>
                </DialogContent>
                <DialogActions className={classes.action}>
                    <Button
                        onClick={endConfirm}
                        buttonType="outlined"
                    >
                        {t('guide:yes_skip')}
                    </Button>
                    <Button
                        onClick={cancelConfirm}
                    >
                        {t('guide:no_skip')}
                    </Button>
                </DialogActions>
            </Dialog>
            {!pageHints && (
                <Steps
                    enabled={stepEnable}
                    steps={getGuideData}
                    initialStep={0}
                    onBeforeChange={onBeforeChange}
                    onBeforeExit={handleBeforeExit}
                    onComplete={() => {
                        setLocalStorage(`GUIDE_${page}`, false);
                    }}
                    onExit={endConfirm}
                    options={
                        {
                            ...introOptions.options,
                            prevLabel: isDesktop ? '<img class="arrow-left " src="/assets/img/arrowRight.svg" />' : null,
                        }
                    }
                />
            )}
            <Hints
                enabled={pageHints}
                hints={getGuideData}
                onClose={() => {
                    setLocalStorage(`GUIDE_${page}`, false);
                }}
                options={
                    {
                        hintButtonLabel: 'X',
                    }
                }
            />
        </>
    );
};

export default IntroComponent;
