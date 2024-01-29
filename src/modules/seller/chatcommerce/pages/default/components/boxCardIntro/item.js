import React from 'react';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import Button from '@common_button';
import { PRIMARY_SOFT } from '@theme_color';

const BoxCardIntroItem = ({
    classes,
    boxIconColor = PRIMARY_SOFT,
    boxIcon = '/assets/img/dashboard/icon_avatar.svg',
    boxTitle,
    boxDescription,
    boxLeftBorderColor = PRIMARY_SOFT,
    buttonSrcIcon = '/assets/img/dashboard/icon_add.svg',
    buttonLabel = 'Button',
    onClickLink,
    onClickButton,
    onClickNextLink,
    isFinish = false,
}) => (
    <div id="box-card-intro-item" className={classes.boxCardIntroBoxItem}>
        <Grid className={classes.sectionContentLeft} item sm={8} xs={12}>
            <div className={classes.sectionContentLeftIcon}>
                <div style={{ background: `${boxLeftBorderColor } 0% 0% no-repeat padding-box` }} className="left-tag" />
                <div style={{ backgroundColor: boxIconColor }} className="left-icon-container">
                    <img src={boxIcon} alt="icon source box" />
                </div>
            </div>
            <div className={classes.sectionContentLeftInformation}>
                <div className={classNames(classes.infoTitle, { linethrough: isFinish })}>{boxTitle}</div>
                <div className={classNames(classes.infoDesc, { linethrough: isFinish })}>{boxDescription}</div>
            </div>
        </Grid>
        {
            onClickButton && (
                <Grid className={classes.sectionContentRight} item md={4} sm={12} xs={12}>
                    <Button
                        classic
                        classicButtonLabel={buttonLabel}
                        classicButtonOnClick={onClickButton}
                        classicButtonIcon={(
                            <img src={buttonSrcIcon} alt="icon source box intro" />
                        )}
                    />
                </Grid>
            )
        }
        {
            onClickNextLink && (
                <Grid className={classes.sectionContentRight} item md={4} sm={12} xs={12}>
                    <Button
                        nextLink={onClickNextLink}
                        classic
                        classicButtonLabel={buttonLabel}
                        classicButtonIcon={(
                            <img src={buttonSrcIcon} alt="icon source box intro" />
                        )}
                    />
                </Grid>
            )
        }
        {
            onClickLink && (
                <Grid className={classes.sectionContentRight} item md={4} sm={12} xs={12}>
                    <a href={onClickLink} className={classes.sectionContentRightLink}>
                        <img src={buttonSrcIcon} alt="icon button src icon" />
                        {buttonLabel}
                    </a>
                </Grid>
            )
        }
    </div>
);

export default BoxCardIntroItem;
