import React from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from '@common_boxcard/style';
import Button from '@common_button';
import { PURPLE } from '@theme_color';

const BoxCardItemContainer = ({
    children,
    labelDetail,
    onClickLink,
}) => {
    const classes = useStyles();
    return (
        <div className={classes.boxCardItemContainerParent}>
            <Grid container className={classes.boxCardItemContainer}>
                {children}
            </Grid>
            {
                onClickLink && (
                    <Grid container className={classes.boxCardItemFooter}>
                        <Button
                            nextLink={onClickLink}
                            color={PURPLE}
                            bg="transparent"
                            fontSize={12}
                            padding="0"
                            classic
                            classicButtonLabel={labelDetail}
                        />
                    </Grid>
                )
            }
        </div>
    );
};

export default BoxCardItemContainer;
