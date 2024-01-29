import React from 'react';
import classNames from 'classnames';
import FormInput from '@sellermodules/catalog/plugins/Input/index';

const FormSettingProductTime = (props) => {
    const {
        t,
        classes,
    } = props;

    return (
        <div className={classNames('master-channel-form-product-time', classes.formSettingProductTimeContainer)}>
            <FormInput
                useSwitchLabel={false}
                name="is_active"
                label={t('common:product_release_schedule')}
                inputType="switch"
                formGrid="40% 60%"
                labelHelper={(
                    <div className="label-helper">
                        {t('common:product_release_schedule_desc')}
                    </div>
                )}
                {...props}
            />
            <FormInput
                useSwitchLabel={false}
                name="is_active"
                label={t('common:product_sales_period_schedule')}
                inputType="switch"
                formGrid="40% 60%"
                labelHelper={(
                    <div className="label-helper">
                        {t('common:product_sales_period_schedule_desc')}
                    </div>
                )}
                {...props}
            />
        </div>
    );
};

export default FormSettingProductTime;
