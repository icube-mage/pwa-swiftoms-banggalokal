/* eslint-disable max-len */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import useStyles from '@common_boxcard/style';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import { PRIMARY_SOFT } from '@theme_color';

const BoxCard = ({
    boxTitle,
    boxDescription,
    boxLeftBorderColor = PRIMARY_SOFT,
    isFinish = false,
    content,
    gridWidth = 4,
    gridWidthMobile = 12,
    boxPaddingLeft,
    boxPaddingRight,
    boxPaddingLeftMobile,
    boxPaddingRightMobile,
    boxFilter,
    boxFilterCallback,
    boxFilterSelectedLabel = 'Selected Label',
}) => {
    const styleProps = {
        boxPaddingLeft,
        boxPaddingRight,
        boxPaddingLeftMobile,
        boxPaddingRightMobile,
    };
    const classes = useStyles(styleProps);
    const popoverAnchor = React.useRef(null);
    const popoverContainerAnchor = React.useRef(null);
    const [showPopover, setShowPopover] = React.useState(false);

    React.useEffect(() => {
        const handleClick = (event) => {
            if (popoverContainerAnchor.current && !popoverContainerAnchor.current.contains(event.target)) {
                setShowPopover(false);
            }
        };
        document.addEventListener('click', handleClick, true);
        return () => {
            document.removeEventListener('click', handleClick, true);
        };
    }, [popoverContainerAnchor]);

    const onShowPopover = React.useCallback(() => setShowPopover(true), []);

    const onClosePopover = React.useCallback(() => setShowPopover(false), []);

    const onClickFilterItem = React.useCallback((params) => {
        onClosePopover();
        boxFilterCallback(params);
    }, []);

    return (
        <div
            id="box-card"
            className={classNames(classes.boxCard)}
        >
            <Grid className={classes.boxCardContainer} container>
                <Grid className={classes.boxCardItem} item sm={gridWidth} xs={gridWidthMobile}>
                    <Grid container className={classes.sectionContent}>
                        <Grid className={classes.sectionContentLeft} item sm={12} xs={12}>
                            <div style={{ background: `${boxLeftBorderColor } 0% 0% no-repeat padding-box` }} className="left-tag" />
                            <div className={classes.sectionContentLeftInformation}>
                                <div className={classNames(classes.infoTitle, { linethrough: isFinish })}>
                                    {boxTitle}
                                </div>
                                <div className={classNames(classes.infoDesc, { linethrough: isFinish })}>
                                    {boxDescription}
                                    {
                                        boxFilter && (
                                            <>
                                                <button
                                                    type="button"
                                                    className={classes.buttonFilter}
                                                    ref={popoverAnchor}
                                                    onClick={onShowPopover}
                                                >
                                                    {boxFilterSelectedLabel}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="8.411" height="5.206" viewBox="0 0 8.411 5.206">
                                                        <path
                                                            id="Path_3455"
                                                            data-name="Path 3455"
                                                            d="M490.086-1774.34l3.5,4,3.5-4"
                                                            transform="translate(-489.38 1775.046)"
                                                            fill="none"
                                                            stroke="#be1f93"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="1"
                                                        />
                                                    </svg>
                                                </button>
                                                <Popper
                                                    ref={popoverContainerAnchor}
                                                    className={classes.popperFilterContainer}
                                                    open={showPopover}
                                                    placement="bottom"
                                                    anchorEl={popoverAnchor.current}
                                                    transition
                                                >
                                                    {({ TransitionProps }) => (
                                                        <Fade {...TransitionProps} timeout={350}>
                                                            <div className="popper-filter">
                                                                {
                                                                    boxFilter?.map((value, index) => (
                                                                        <div key={`popper-filter-${index}`} className="popper-filter-item">
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => onClickFilterItem({ value, index })}
                                                                            >
                                                                                {value.name}
                                                                            </button>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </Fade>
                                                    )}
                                                </Popper>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    {content}
                </Grid>
            </Grid>
        </div>
    );
};

export default BoxCard;
