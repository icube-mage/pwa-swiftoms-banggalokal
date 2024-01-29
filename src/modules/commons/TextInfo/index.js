/* eslint-disable max-len */
import React from 'react';
import useStyles from '@common_textinfo/style';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import { GRAY_LIGHT3, PRIMARY_DARK_OLD, WHITE } from '@theme_color';

const TextInfo = ({
    textHelp,
    textHelpPlacement,
    padding,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingHorizontal,
    paddingVertical,
    margin,
    marginTop,
    marginLeft,
    marginRight,
    marginBottom,
    marginHorizontal,
    marginVertical,
    size = 11,
}) => {
    const classes = useStyles();
    const popoverAnchor = React.useRef(null);
    const [showPopover, setShowPopover] = React.useState(false);

    const onMouseEnter = React.useCallback(() => {
        setShowPopover(true);
    }, []);

    const onMouseLeave = React.useCallback(() => {
        setShowPopover(false);
    }, []);

    return (
        <div
            className={classes.textInfoContainer}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{
                ...(padding ? { padding } : null),
                ...(paddingTop ? { paddingTop } : null),
                ...(paddingBottom ? { paddingBottom } : null),
                ...(paddingLeft ? { paddingLeft } : null),
                ...(paddingRight ? { paddingRight } : null),
                ...(paddingHorizontal ? { paddingHorizontal } : null),
                ...(paddingVertical ? { paddingVertical } : null),
                ...(margin ? { margin } : null),
                ...(marginTop ? { marginTop } : null),
                ...(marginBottom ? { marginBottom } : null),
                ...(marginLeft ? { marginLeft } : null),
                ...(marginRight ? { marginRight } : null),
                ...(marginHorizontal ? { marginHorizontal } : null),
                ...(marginVertical ? { marginVertical } : null),
            }}
        >
            <svg
                ref={popoverAnchor}
                className="text-helper"
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 11 11"
            >
                <g id="help" transform="translate(-0.25 0.231)">
                    <circle
                        id="Ellipse_5"
                        data-name="Ellipse 5"
                        cx="5"
                        cy="5"
                        r="5"
                        transform="translate(0.75 0.269)"
                        fill={showPopover ? PRIMARY_DARK_OLD : 'none'}
                        stroke={showPopover ? PRIMARY_DARK_OLD : GRAY_LIGHT3}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                    />
                    <path
                        id="Path_3436"
                        data-name="Path 3436"
                        d="M7.505,5.929c.023-.279.381-.781,1.261-.786a1.048,1.048,0,0,1,1.084.88,1.329,1.329,0,0,1-.637,1.3c-.615.423-.638.667-.638.953"
                        transform="translate(-2.934 -2.316)"
                        fill="none"
                        stroke={GRAY_LIGHT3}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                    />
                    <line
                        id="Line_2"
                        data-name="Line 2"
                        y2="0.165"
                        transform="translate(5.634 7.546)"
                        fill={showPopover ? WHITE : 'none'}
                        stroke={showPopover ? WHITE : GRAY_LIGHT3}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                    />
                </g>
            </svg>
            <Popper
                className={classes.popperHelpContainer}
                open={showPopover}
                placement={textHelpPlacement}
                anchorEl={popoverAnchor.current}
                transition
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <div className={textHelpPlacement === 'top' ? 'text-help' : 'text-help-before'}>{textHelp}</div>
                    </Fade>
                )}
            </Popper>
        </div>
    );
};

export default TextInfo;
