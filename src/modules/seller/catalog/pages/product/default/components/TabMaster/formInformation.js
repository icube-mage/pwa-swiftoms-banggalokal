import React from 'react';
import classNames from 'classnames';
import FormInput from '@sellermodules/catalog/plugins/Input/index';

const FormMasterProductInformation = (props) => {
    const {
        t,
        classes,
        skuRef,
        formik,
        handleDropFile,
        isEdit,
        limitSizeConfig,
    } = props;
    const { limit_size_image, product_image_min_width, product_image_min_height } = limitSizeConfig;

    return (
        <div className={classNames('master-product-form-information-container', classes.formInformationContainer)}>
            <FormInput
                name="name"
                label={t('sellercatalog:Product_Name')}
                required
                formGrid="40% 60%"
                labelHelper={(
                    <div className="label-helper">
                        {t('common:put_type')}
                        ,
                        {t('common:Brand')}
                        ,
                        {t('common:or_product_characteristic')}
                    </div>
                )}
                onBlur={false}
                {...props}
            />
            <FormInput
                name="sku"
                label={t('sellercatalog:SKU')}
                required
                formGrid="40% 60%"
                inputRef={skuRef}
                disabled={isEdit && (formik.values.sku !== '' || formik.values.sku !== null)}
                labelHelper={(
                    <div className="label-helper">
                        {t('common:put_type')}
                        ,
                        {t('common:Brand')}
                        ,
                        {t('common:or_product_characteristic')}
                    </div>
                )}
                onBlur={false}
                {...props}
            />
            {
                !formik.values.is_variant && (
                    <FormInput
                        name="price"
                        label={t('sellercatalog:Price')}
                        required={!formik.values.is_variant}
                        formGrid="40% 60%"
                        type="float"
                        inputType="price"
                        disabled={formik.values.is_variant}
                        onBlur={false}
                        {...props}
                    />
                )
            }
            <FormInput
                name="description"
                inputType="description"
                label={t('sellercatalog:Product_Descriptions')}
                labelPosition="start"
                formGrid="40% 60%"
                multiline
                rows={8}
                labelHelper={(
                    <div className="label-helper">
                        {t('common:write_product_detail')}
                    </div>
                )}
                onBlur={false}
                required
                {...props}
            />
            <FormInput
                required
                name="images"
                label={t('sellercatalog:Product_Photos')}
                labelPosition="start"
                inputType="image"
                getBase64={(e, i) => handleDropFile(e, 'images', i)}
                formatFile=".jpg, .jpeg, .png, .gif"
                classNameContainer="form-master-product-image-container"
                classNameContent="form-master-product-image-content"
                multiple
                labelHelper={(
                    <div className="label-helper">
                        {t('sellercatalog:Minimum_photo_size')}
                        <span className="primary">{` ${product_image_min_width} x ${product_image_min_height}px `}</span>
                        {t('sellercatalog:with_format')}
                        <span className="primary"> JPG, JPEG, </span>
                        {t('sellercatalog:and')}
                        <span className="primary"> PNG. </span>
                        (
                        {t('sellercatalog:For_optimal_images_use_a_minimum_size_of')}
                        <span className="primary"> 700 x 700px</span>
                        )
                        {'. '}
                        {`${t('storesetting:Maximum')} ${limit_size_image} Megabytes `}
                    </div>
                )}
                {...props}
            />
        </div>
    );
};

export default FormMasterProductInformation;
