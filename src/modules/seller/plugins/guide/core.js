import React, { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '@helper_localstorage';
import { breakPointsUp } from '@helper_theme';
import DummyResponse from './dummydata';

const CoreGuide = (props) => {
    const {
        Content,
        page,
        pageHints = false,
        t,
    } = props;

    const getGuideData = DummyResponse()[page].data;
    const enableGuide = getLocalStorage(`GUIDE_${page}`);
    const isDesktop = breakPointsUp('sm');
    const isHomepage = page === 'HOMEPAGE';

    const [stepEnable, setStepEnable] = React.useState(!isHomepage);
    const [isDelayed, setIsDelayed] = React.useState(true);
    const [introOptions] = useState({
        options: {
            doneLabel: 'Done',
            tooltipClass: 'tooltip-container',
            hidePrev: true,
            nextLabel: '<img class="arrow-right " src="/assets/img/arrowRight.svg" />',
            prevLabel: '<img class="arrow-left " src="/assets/img/arrowRight.svg" />',
            showStepNumbers: true,
            showBullets: false,
            exitOnOverlayClick: false,
        },
    });

    useEffect(() => {
        const delay = setInterval(() => {
            setIsDelayed(false);
        }, 1000);

        return () => {
            clearInterval(delay);
        };
    }, []);

    const tampLocalStorage = (pagex) => {
        if (getLocalStorage(`GUIDE_${pagex}`) === null) {
            setLocalStorage(`GUIDE_${pagex}`, true);
        }
    };

    useEffect(() => {
        tampLocalStorage(page);
    }, []);

    return (
        <>
            {enableGuide && !isDelayed && (
                <Content
                    getGuideData={getGuideData}
                    introOptions={introOptions}
                    stepEnable={stepEnable}
                    setStepEnable={setStepEnable}
                    isDesktop={isDesktop}
                    isHomepage={isHomepage}
                    page={page}
                    pageHints={pageHints}
                    t={t}
                />
            )}
        </>
    );
};

export default CoreGuide;
