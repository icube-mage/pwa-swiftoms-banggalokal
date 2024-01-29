import React from 'react';
import classNames from 'classnames';
import FormInput from '@sellermodules/catalog/plugins/Input/index';
import Button from '@common_button/index';
import { PURPLE } from '@theme_color';

const FormSettingProductTime = (props) => {
    const {
        t,
        classes,
    } = props;

    return (
        <div className={classNames('master-channel-form-setting-related', classes.formSettingProductRelatedContainer)}>
            <FormInput
                useSwitchLabel={false}
                name="is_active"
                label={t('common:product_cross_sell')}
                inputType="switch"
                formGrid="40% 60%"
                labelHelper={(
                    <div className="label-helper">
                        {t('common:product_cross_sell_desc')}
                        <Button
                            className="content-left-link"
                            nextLink="/seller/stock/guide"
                            classic
                            classicButtonLabel={<strong>{t('common:see_example')}</strong>}
                            padding="0"
                            color={PURPLE}
                            bg="transparent"
                        />
                    </div>
                )}
                {...props}
            />
            <FormInput
                useSwitchLabel={false}
                name="is_active"
                label={t('common:product_up_sell')}
                inputType="switch"
                formGrid="40% 60%"
                labelHelper={(
                    <div className="label-helper">
                        {t('common:product_up_sell_desc')}
                        <Button
                            className="content-left-link"
                            nextLink="/seller/stock/guide"
                            classic
                            classicButtonLabel={<strong>{t('common:see_example')}</strong>}
                            padding="0"
                            color={PURPLE}
                            bg="transparent"
                        />
                    </div>
                )}
                {...props}
            />
        </div>
    );
};

export default FormSettingProductTime;
