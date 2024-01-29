/* eslint-disable object-curly-newline */
import React from 'react';
import clsx from 'clsx';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import Button from '@common_button';

import { translateFeature } from '@sellermodules/storeintegration/helpers';
import useStyles from '@sellermodules/storeintegration/pages/list/components/Card/style';

const MarketplaceCard = (props) => {
    const { t, mp, handleIntegrate, activeTab } = props;

    const classes = useStyles();

    return (
        <div className={classes.cardContainer}>
            <div className={classes.cardMark} />
            <div className={classes.card}>
                <Grid container spacing={2} justifyContent="space-between">
                    <Hidden smUp>
                        <h1 className={classes.title}>{mp.marketplace_name}</h1>
                    </Hidden>
                    <Hidden smUp>
                        <Grid item xs="auto" lg="auto" classes={{ root: classes.gridImageRoot }}>
                            <div className={clsx(classes.mpImageContainer, 'noMargin')}>
                                <div
                                    className={classes.mpImage}
                                    style={{ backgroundImage: `url('${mp.image_url || '/assets/img/placeholder_image.jpg'}')` }}
                                />
                            </div>
                        </Grid>
                    </Hidden>
                    <Grid item md={9} xs={7} classes={{ root: clsx(classes.gridItemRoot, activeTab === 'chat' && 'grid-chat') }}>
                        <Hidden xsDown>
                            <h1 className={classes.title}>{mp.marketplace_name}</h1>
                        </Hidden>
                        <List dense>
                            {mp.features?.map((feature) => (
                                <ListItem key={feature} disableGutters dense classes={{ dense: classes.listItemDense }}>
                                    <ListItemIcon classes={{ root: classes.listIcon }}>
                                        <CheckCircleIcon classes={{ root: classes.icon }} />
                                    </ListItemIcon>
                                    <ListItemText classes={{ root: classes.listText }}>
                                        {t(`sellerstoreintegration:${translateFeature(feature)}`)}
                                    </ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Hidden xsDown>
                        <Grid item xs="auto">
                            <div className={classes.mpImageContainer}>
                                <div
                                    className={classes.mpImage}
                                    style={{ backgroundImage: `url('${mp.image_url || '/assets/img/placeholder_image.jpg'}')` }}
                                />
                            </div>
                        </Grid>
                    </Hidden>
                </Grid>
                <div className={clsx(classes.divAction, activeTab === 'chat' && 'div-chat')}>
                    <Divider variant="middle" classes={{ root: clsx(classes.divider, mp.marketplace_code.includes('TKPD') && 'divider-chat') }} />
                    {activeTab === 'chat' && mp.marketplace_code.includes('TKPD') ? (
                        <span className={classes.listText}>{t('sellerstoreintegration:chat_integration_is_directly')}</span>
                    ) : (
                        <Button fullWidth classes={{ root: classes.buttonRoot }} onClick={() => handleIntegrate(mp.marketplace_code)}>
                            {t('sellerstoreintegration:Integrate')}
                        </Button>
                    )}
                </div>
            </div>
        </div>

    );
};

export default MarketplaceCard;
