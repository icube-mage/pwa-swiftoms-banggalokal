import React from 'react';
import Button from '@common_button/index';
import VariantsContent from '@sellermodules/catalog/plugins/Variants';
import classNames from 'classnames';
import clsx from 'clsx';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import configGqlService from '@modules/theme/services/graphql';

const FormMasterProductVariant = (props) => {
    const {
        t,
        classes,
        formik,
        handleClickSkuWarning,
    } = props;

    const { data: dataDocs } = configGqlService.getStoreConfig({
        path: 'swiftoms_vendorportal/seller_docs/variant_product_catalog',
    });

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
            <div className={classNames('form-variant-desc', classes.desc)}>
                <div className={classNames('form-variant-helper', classes.helper)}>
                    {t('sellercatalog:Please_select_the_product_variant_you_want')}
                    &nbsp;
                    <a
                        className="_help"
                        href={dataDocs?.getStoreConfig}
                        rel="noreferrer"
                        target="_blank"
                    >
                        <strong>{t('common:learn_how_to_manage_variant')}</strong>
                    </a>
                </div>
                <div className={classNames('form-variant-btn-container', classes.btnContainer)}>
                    {formik.values.is_variant
                        ? (
                            <Button
                                className={clsx(classes.btn, 'outlined', !formik.values.sku && 'disabled')}
                                startIcon={<CloseIcon />}
                                onClick={() => {
                                    formik.setFieldValue('is_variant', false);
                                    formik.setFieldValue('variants', [{}]);
                                    formik.setFieldValue('variant_table', []);
                                }}
                                disabled={!formik.values.sku}
                            >
                                {t('sellercatalog:Delete_Variant')}
                            </Button>
                        )
                        : (
                            <Button
                                className={clsx(classes.btn, 'outlined', !formik.values.sku && 'disabled')}
                                startIcon={<AddIcon />}
                                onClick={() => formik.setFieldValue('is_variant', true)}
                                disabled={!formik.values.sku}
                            >
                                {t('sellercatalog:Add_Variant')}
                            </Button>
                        )}
                </div>
            </div>
            {formik.values.is_variant && <VariantsContent {...props} />}
        </div>
    );
};
export default FormMasterProductVariant;
