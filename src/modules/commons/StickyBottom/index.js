import React from 'react';
import useStyles from '@common_stickybottom/style';
import classNames from 'classnames';

const StickyBottom = ({
    show = false,
    className,
    contentLeft,
    contentRight,
    parentClasses,
}) => {
    const classes = useStyles();

    if (!show) return null;

    return (
        <div className={classNames('sticky-bottom-container', classes.stickyBottomContainer, className, parentClasses)}>
            <div className="sticky-bottom-container-fixed">
                <div className="sticky-bottom-left">
                    {contentLeft}
                </div>
                <div className="sticky-bottom-right">
                    {contentRight}
                </div>
            </div>
        </div>
    );
};

export default StickyBottom;
