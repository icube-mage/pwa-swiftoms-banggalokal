import React from 'react';
import useStyles from '@sellermodules/dashboard/pages/default/components/boxCardIntro/style';
import BoxCardIntroItem from '@sellermodules/dashboard/pages/default/components/boxCardIntro/item';
import Grid from '@material-ui/core/Grid';
import { PRIMARY_DARK_OLD } from '@theme_color';

const BoxCardIntro = ({
    t,
    title,
    dataSeller,
}) => {
    const classes = useStyles();

    if (dataSeller?.is_company_profile_complete && dataSeller?.is_finish_product_complete) return <div style={{ height: 40 }} />;

    return (
        <div id="dashboard-box-card-intro" className={classes.boxCardIntro}>
            <Grid className={classes.boxCardIntroContainer} container>
                <Grid id="guide-boxcard" className={classes.boxCardIntroItem} item md={8} xs={12}>
                    <h3>{title}</h3>
                    <BoxCardIntroItem
                        isFinish={dataSeller?.is_company_profile_complete}
                        classes={classes}
                        boxIcon="/assets/img/dashboard/icon_checklist.svg"
                        boxTitle={t('common:set_store_identity')}
                        boxDescription={t('common:set_store_identity_desc')}
                    />
                    <BoxCardIntroItem
                        isFinish={dataSeller?.is_finish_product_complete}
                        classes={classes}
                        boxIconColor={PRIMARY_DARK_OLD}
                        boxIcon="/assets/img/dashboard/icon_folder_white.svg"
                        boxTitle={t('common:add_product')}
                        boxDescription={t('common:add_product_desc')}
                        buttonLabel={t('common:add_product')}
                        onClickNextLink={dataSeller?.is_finish_product_complete ? false : 'catalog/product/create'}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default BoxCardIntro;
