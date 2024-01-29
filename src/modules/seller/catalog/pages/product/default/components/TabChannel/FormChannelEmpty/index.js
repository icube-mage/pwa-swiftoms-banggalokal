import React from 'react';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Button from '@common_button/index';
import { BLACK, BORDER_COLOR } from '@theme_color';

const FormChannelEmpty = ({
    t,
    classes,
    isEdit,
    productId,
}) => {
    const url_referrer = isEdit ? `/seller/catalog/product/edit/${productId}` : '/seller/catalog/product/create';
    return (
        <div className={classNames('channel-product-form-empty', classes.formChannelEmpty)}>
            <Grid className="channel-empty-container" container>
                <Grid className="content-left" item sm={8} xs={12}>
                    <div className="content-left-container">
                        <span className="content-left-info">{t('common:create_channel_via_button')}</span>
                    </div>
                </Grid>
                <Grid className="content-right" item sm={4} xs={12}>
                    <Button
                        bg="transparent"
                        nextLink="/seller/saleschannels/storeintegration"
                        nextLinkQuery={{ url_referrer }}
                        color={BLACK}
                        border={1}
                        borderColor={BORDER_COLOR}
                        classic
                        classicButtonIcon={<img src="/assets/img/icon_plus.svg" alt="icon plus" />}
                        classicButtonLabel={t('common:create_new_channel')}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default FormChannelEmpty;
