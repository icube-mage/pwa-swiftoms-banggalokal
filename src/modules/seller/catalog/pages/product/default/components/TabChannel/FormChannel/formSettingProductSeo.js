import React from 'react';
import classNames from 'classnames';
import FormInput from '@sellermodules/catalog/plugins/Input/index';

const FormSettingProductSeo = (props) => {
    const {
        t,
        classes,
    } = props;

    return (
        <div className={classNames('master-channel-form-setting-seo', classes.formSettingProductSeoContainer)}>
            <FormInput
                name="description"
                label={t('sellercatalog:Product_Descriptions')}
                labelPosition="start"
                formGrid="40% 60%"
                multiline
                rows={8}
                labelHelper={(
                    <div className="label-helper">
                        {t('common:put_type')}
                        ,
                        {t('common:Brand')}
                        ,
                        {t('common:or_product_characteristic')}
                        {t('common:improve_the_position')}
                    </div>
                )}
                {...props}
            />
            <FormInput
                name="name"
                label={t('common:keyword')}
                labelOptional={t('common:optional')}
                formGrid="40% 60%"
                labelHelper={(
                    <div className="label-helper">
                        {t('common:keyword_desc')}
                    </div>
                )}
                {...props}
            />
            <FormInput
                name="name"
                label={t('common:slug')}
                labelOptional={t('common:optional')}
                formGrid="40% 60%"
                labelHelper={(
                    <div className="label-helper">
                        {t('common:slug_desc')}
                    </div>
                )}
                {...props}
            />
        </div>
    );
};

export default FormSettingProductSeo;
