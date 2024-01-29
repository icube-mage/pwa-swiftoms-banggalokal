import React from 'react';
import useStyles from '@common_boxcardsimple/style';
import { BORDER_COLOR } from '@theme_color';
import clsx from 'clsx';

const BoxCardSimple = ({
    headerComponent,
    title,
    titleButtonComponent,
    content,
    footer,
    style,
    bg,
    color,
    height,
    width,
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
    verticalCenter,
    verticalStart,
    verticalEnd,
    horizontalCenter,
    horizontalStart,
    horizontalEnd,
    fontSize,
    border = 0,
    borderColor = BORDER_COLOR,
    borderRadius,
    borderRadiusTopLeft = 0,
    borderRadiusTopRight = 0,
    borderRadiusBottomLeft = 0,
    borderRadiusBottomRight = 0,
}) => {
    const classes = useStyles();
    const styleCustom = {
        ...(bg ? { backgroundColor: bg } : null),
        ...(color ? { color } : null),
        ...(height ? { height } : null),
        ...(width ? { width } : null),
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
        ...(fontSize ? { fontSize } : null),
        ...(verticalCenter ? { justifyContent: 'center' } : null),
        ...(verticalStart ? { justifyContent: 'flex-start' } : null),
        ...(verticalEnd ? { justifyContent: 'flex-end' } : null),
        ...(horizontalCenter ? { alignItems: 'center' } : null),
        ...(horizontalStart ? { alignItems: 'flex-start' } : null),
        ...(horizontalEnd ? { alignItems: 'flex-end' } : null),
        ...(border ? { border: `${border }px solid ${ borderColor}` } : null),
        ...(borderRadius ? { borderRadius } : null),
        ...(borderRadiusTopLeft && borderRadiusTopRight && borderRadiusBottomRight && borderRadiusBottomLeft
            ? {
                borderRadius: `${borderRadiusTopLeft}px ${borderRadiusTopRight}px ${borderRadiusBottomRight}px ${borderRadiusBottomLeft}px`,
            }
            : null
        ),
        ...style,
    };

    return (
        <div className={clsx(classes.boxCardSimpleContainer)}>
            {
                headerComponent && (
                    <div className="box-card-header">
                        {headerComponent}
                    </div>
                )
            }
            <div className="box-card" style={styleCustom}>
                <div className="box-card-header">
                    { title && <div className="title">{title}</div> }
                    { titleButtonComponent && <div className="button">{titleButtonComponent}</div>}
                </div>
                { content && <div className="content">{content}</div> }
                { footer && <div className="footer">{footer}</div> }
            </div>
        </div>
    );
};

export default BoxCardSimple;
