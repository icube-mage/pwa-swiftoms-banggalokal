import React from 'react';
import VariantsContentChannel from '@sellermodules/catalog/plugins/VariantsChannel';
import classNames from 'classnames';

const FormChannelProductVariant = (props) => {
    const {
        t,
        classes,
        formik,
        handleClickSkuWarning,
    } = props;

    return (
        <div className={classNames('master-product-form-variant', classes.formVariantContainer)}>
            {!formik.values.sku && (
                <div className={classNames('warning-sku', classes.formVariantwarningDiv)}>
                    {t('sellercatalog:Please_fill')}
                    {' '}
                    <span className="clickable" onClick={handleClickSkuWarning} aria-hidden="true">{t('sellercatalog:SKU_field')}</span>
                    {' '}
                    {t('sellercatalog:to_continue_create_product_variants')}
                </div>
            )}
            {formik.values.is_variant && <VariantsContentChannel {...props} />}
        </div>
    );
};
export default FormChannelProductVariant;
