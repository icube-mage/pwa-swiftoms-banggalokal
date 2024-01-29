import React from 'react';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import clsx from 'clsx';
import useStyles from '@common_button/style';
import Link from 'next/link';
import TextInfo from '@common_textinfo/index';
import { BORDER_COLOR, PRIMARY_SOFT, WHITE } from '@theme_color';

const CustomButton = ({
    variant = 'contained',
    className = {},
    buttonType = 'primary',
    disabled,
    disabledBgTransparent,
    style,
    bg = PRIMARY_SOFT,
    color = WHITE,
    nextLink,
    nextLinkQuery,
    nextLinkOnClick,
    classic,
    classicButtonLabel,
    classicButtonIcon,
    classicButtonIconRight,
    classicButtonOnClick,
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
    marginHorizontal,
    marginVertical,
    paddingTextHelper,
    paddingTopTextHelper,
    paddingBottomTextHelper,
    paddingLeftTextHelper,
    paddingRightTextHelper,
    paddingHorizontalTextHelper,
    paddingVerticalTextHelper,
    marginTextHelper,
    marginTopTextHelper,
    marginLeftTextHelper,
    marginRightTextHelper,
    marginBottomTextHelper,
    marginHorizontalTextHelper,
    marginVerticalTextHelper,
    verticalCenter,
    verticalStart,
    verticalEnd,
    horizontalCenter,
    horizontalStart,
    horizontalEnd,
    border = 0,
    borderColor = BORDER_COLOR,
    fontSize,
    fontWeight,
    textHelp,
    textHelpPlacement,
    noWrap,
    ...other
}) => {
    const classes = useStyles();
    const getClassByType = (type) => {
        if (type === 'primary-rounded') {
            return clsx(classes.primary, classes.rounded);
        } if (type === 'outlined') {
            return classes.outlined;
        } if (type === 'outlined-rounded') {
            return clsx(classes.outlined, classes.rounded);
        } if (type === 'buttonText') {
            return classes.buttonText;
        } if (type === 'link') {
            return classes.link;
        }
        return classes.primary;
    };
    const customClass = classNames(
        getClassByType(buttonType),
        className,
        disabled && classes.disabled,
    );

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
        ...(marginHorizontal ? { marginHorizontal } : null),
        ...(marginVertical ? { marginVertical } : null),
        ...(fontSize ? { fontSize } : null),
        ...(fontWeight ? { fontWeight } : null),
        ...(verticalCenter ? { justifyContent: 'center' } : null),
        ...(verticalStart ? { justifyContent: 'flex-start' } : null),
        ...(verticalEnd ? { justifyContent: 'flex-end' } : null),
        ...(horizontalCenter ? { alignItems: 'center' } : null),
        ...(horizontalStart ? { alignItems: 'flex-start' } : null),
        ...(horizontalEnd ? { alignItems: 'flex-end' } : null),
        ...(border ? { border: `${border }px solid ${ borderColor}` } : null),
        ...(noWrap ? { whiteSpace: 'nowrap' } : null),
        ...style,
    };

    const styleTextHelper = {
        padding: paddingTextHelper,
        paddingTop: paddingTopTextHelper,
        paddingBottom: paddingBottomTextHelper,
        paddingLeft: paddingLeftTextHelper,
        paddingRight: paddingRightTextHelper,
        paddingHorizontal: paddingHorizontalTextHelper,
        paddingVertical: paddingVerticalTextHelper,
        margin: marginTextHelper,
        marginTop: marginTopTextHelper,
        marginLeft: marginLeftTextHelper,
        marginRight: marginRightTextHelper,
        marginBottom: marginBottomTextHelper,
        marginHorizontal: marginHorizontalTextHelper,
        marginVertical: marginVerticalTextHelper,
    };

    if (classic) {
        if (nextLink) {
            if (disabled || disabledBgTransparent) {
                return (
                    <span
                        style={styleCustom}
                        className={
                            clsx(
                                classes.classicButton,
                                className,
                                disabled && { classicDisabled: true },
                                disabledBgTransparent && { classicDisabledBgTransparent: true },
                            )
                        }
                    >
                        {classicButtonIcon}
                        {classicButtonLabel}
                        {classicButtonIconRight}
                    </span>
                );
            }

            let nextLinkProps = { pathname: nextLink };
            if (nextLinkQuery) {
                nextLinkProps = { ...nextLinkProps, query: nextLinkQuery };
            }
            return (
                <>
                    {
                        textHelp && (
                            <TextInfo
                                {...styleTextHelper}
                                textHelp={textHelp}
                                textHelpPlacement={textHelpPlacement}
                            />
                        )
                    }
                    <Link
                        key={classicButtonLabel}
                        href={nextLinkProps}
                    >
                        <a
                            href={nextLink}
                            style={styleCustom}
                            onClick={nextLinkOnClick ? (e) => nextLinkOnClick(e, nextLinkProps) : () => {}}
                            className={
                                clsx(
                                    classes.classicButton,
                                    className,
                                    disabled && { classicDisabled: true },
                                    disabledBgTransparent && { classicDisabledBgTransparent: true },
                                )
                            }
                        >
                            {classicButtonIcon}
                            {classicButtonLabel}
                            {classicButtonIconRight}
                        </a>
                    </Link>
                </>
            );
        }
        return (
            <>
                {
                    textHelp && (
                        <TextInfo
                            {...styleTextHelper}
                            textHelp={textHelp}
                            textHelpPlacement={textHelpPlacement}
                        />
                    )
                }
                <button
                    type="button"
                    className={clsx(classes.classicButton, className, { classicDisabled: disabled })}
                    onClick={disabled ? undefined : classicButtonOnClick}
                    style={styleCustom}
                >
                    {classicButtonIcon}
                    {classicButtonLabel}
                    {classicButtonIconRight}
                </button>
            </>
        );
    }

    return (
        <Button
            variant={variant}
            className={customClass}
            disabled={disabled}
            {...other}
        />
    );
};

export default CustomButton;
