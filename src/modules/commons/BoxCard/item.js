/* eslint-disable max-len */
import useStyles from '@common_boxcard/style';
import Button from '@common_button';
import TextInfo from '@common_textinfo';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import {
    PURPLE,
} from '@theme_color';

const BoxCardItem = ({
    t,
    loading,
    title = 'Title',
    textAmount = 0,
    textAmountCurrency,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    borderRadiusTopLeft,
    borderRadiusTopRight,
    borderRadiusBottomLeft,
    borderRadiusBottomRight,
    gridWidth = 12,
    gridWidthMobile = 12,
    labelButton = 'Button Label',
    textHelp,
    textHelpPlacement = 'bottom-start',
    onClickLink,
}) => {
    const classes = useStyles();

    return (
        <Grid sm={gridWidth} xs={gridWidthMobile} item className={classes.boxCardItemGrid}>
            <div
                id="box-item-grid-container"
                className={classNames({
                    borderTop,
                    borderRight,
                    borderBottom,
                    borderLeft,
                    borderRadiusTopLeft,
                    borderRadiusTopRight,
                    borderRadiusBottomLeft,
                    borderRadiusBottomRight,
                })}
            >
                <div className="title">
                    <span>{title}</span>
                    {
                        textHelp && (
                            <TextInfo
                                textHelp={textHelp}
                                textHelpPlacement={textHelpPlacement}
                            />
                        )
                    }
                </div>
                <div className="amount">
                    { textAmountCurrency && <span>{textAmountCurrency}</span> }
                    { loading ? t('storesetting:Loading') : textAmount }
                </div>
                <div className="footer">
                    {
                        onClickLink && (
                            <Button
                                nextLink={onClickLink}
                                color={PURPLE}
                                bg="transparent"
                                fontSize={12}
                                padding="0"
                                classic
                                classicButtonLabel={labelButton}
                                classicButtonIconRight={(
                                    <svg
                                        style={{ marginLeft: 5 }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="5.206"
                                        height="8.411"
                                        viewBox="0 0 5.206 8.411"
                                    >
                                        <path
                                            id="Path_3438"
                                            data-name="Path 3438"
                                            d="M490.086-1774.34l3.5,4,3.5-4"
                                            transform="translate(1775.046 497.791) rotate(-90)"
                                            fill="none"
                                            stroke="#be1f93"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1"
                                        />
                                    </svg>
                                )}
                            />
                        )
                    }
                    { !onClickLink && <span>{labelButton}</span> }
                </div>
            </div>
        </Grid>
    );
};

export default BoxCardItem;
