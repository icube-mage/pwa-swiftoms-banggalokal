import React from 'react';
import classNames from 'classnames';
import FormInput from '@sellermodules/catalog/plugins/Input/index';

const FormSettingProductManage = (props) => {
    const {
        t,
        classes,
    } = props;

    return (
        <div className={classNames('master-channel-form-setting-manage', classes.formSettingProductManageContainer)}>
            <FormInput
                useSwitchLabel={false}
                name="is_active"
                label={t('common:Product_Status')}
                inputType="switch"
                formGrid="40% 60%"
                labelHelper={(
                    <div className="label-helper">
                        {t('common:product_active_display')}
                    </div>
                )}
                {...props}
            />
        </div>
    );
};

export default FormSettingProductManage;
