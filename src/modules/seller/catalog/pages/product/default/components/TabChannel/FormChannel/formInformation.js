import React from 'react';
import classNames from 'classnames';
import FormInput from '@sellermodules/catalog/plugins/Input/index';

const FormChannelProductInformation = (props) => {
    const {
        t, classes, formik, handleDropFile, getCategoryList, onSelectSearchChange, onSelectSearchCallback, max_char, input_desc, text_help,
    } = props;
    return (
        <div className={classNames('master-product-form-information-container', classes.formInformationContainer)}>
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
                        <span className="primary"> 500 x 500px </span>
                        {t('sellercatalog:with_format')}
                        <span className="primary"> JPG, JPEG, </span>
                        {t('sellercatalog:and')}
                        <span className="primary"> PNG. </span>
                        (
                        {t('sellercatalog:For_optimal_images_use_a_minimum_size_of')}
                        <span className="primary"> 700 x 700px</span>
                        )
                    </div>
                )}
                {...props}
            />
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
                enableCounter
                maxChar={max_char}
                textHelp={text_help}
                {...props}
            />
            {!formik.values.is_variant && (
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
            )}
            <FormInput
                inputType="input-tree"
                formGrid="40% 60%"
                name="category"
                label={t('sellercatalog:Category')}
                placeholder={`${t('common:searching_category')}...`}
                options={getCategoryList}
                primaryKey="marketplace_category_id"
                labelKey="marketplace_category_name"
                onSelectSearchChange={onSelectSearchChange}
                onSelectSearchCallback={onSelectSearchCallback}
                hint={t('note_dinamic_category')}
                required
                {...props}
            />
            <FormInput
                name="description"
                inputType={input_desc === 'html_editor' ? 'description' : ''}
                label={t('sellercatalog:Product_Descriptions')}
                labelPosition="start"
                formGrid="40% 60%"
                multiline
                rows={8}
                labelHelper={<div className="label-helper">{t('common:write_product_detail')}</div>}
                required
                onBlur={false}
                {...props}
            />
        </div>
    );
};

export default FormChannelProductInformation;
