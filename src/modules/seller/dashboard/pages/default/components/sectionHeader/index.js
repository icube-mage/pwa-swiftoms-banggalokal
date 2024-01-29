import React from 'react';
import useStyles from '@sellermodules/dashboard/pages/default/components/sectionHeader/style';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Button from '@common_button';
import cookies from 'js-cookie';
import { WHITE, BLACK } from '@theme_color';

const SectionHeader = ({
    t, dataSeller, loadingSeller, dataPicture,
}) => {
    const classes = useStyles();
    const getSellerName = dataSeller?.getSeller?.name;
    const sellerProfile = dataPicture?.getUserProfilePicture;
    const getLoginData = cookies.get('cdt');
    let fullname = null;
    let email = null;
    if (getLoginData) {
        const obj = JSON?.parse(getLoginData ?? null);
        email = obj?.email ?? '';
        fullname = obj?.firstname ?? '';
        if (obj?.lastname) {
            fullname += ` ${obj?.lastname ?? ''}`;
        }
    }

    return (
        <div className={classes.sectionHeaderContainer}>
            <div className={classNames('section-header-title', classes.sectionHeaderTitle)}>
                <span>{loadingSeller ? t('storesetting:Loading') : `${t('dashboard:Hello')}! ${getSellerName}`}</span>
            </div>
            <div className={classNames('section-header-content', classes.sectionHeaderContent)}>
                <Grid className={classes.sectionHederContentContainer} container>
                    <Grid className={classes.sectionContentLeft} item md="auto" sm="auto" xs={9}>
                        <div className={classes.sectionContentLeftIcon}>
                            {sellerProfile ? (
                                <div className={classes.iconContainer}>
                                    <img src={sellerProfile} alt="seller-profile" height="40" width="40" />
                                </div>
                            ) : (
                                <img src="/assets/img/dashboard/icon_avatar.svg" alt="icon avatar" />
                            )}
                        </div>
                        <div className={classes.sectionContentLeftInformation}>
                            <div className={classes.infoTitle}>{fullname}</div>
                            <div className={classes.infoEmail}>{email}</div>
                        </div>
                    </Grid>
                    <Grid className={classes.sectionContentRight} item md={7} sm={4} xs={3}>
                        <Button
                            nextLink="/seller/account"
                            bg={WHITE}
                            color={BLACK}
                            classic
                            classicButtonLabel={t('common:Edit')}
                            classicButtonIcon={<img src="/assets/img/dashboard/icon_edit.svg" alt="icon edit" />}
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default SectionHeader;
