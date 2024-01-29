import classNames from 'classnames';
import FormInput from '@sellermodules/catalog/plugins/Input/index';

const FormChannelProductShipping = (props) => {
    const {
        t,
        classes,
        formik,
    } = props;

    return (
        <div className={classNames('master-product-form-shipping', classes.formShippingContainer)}>
            <FormInput
                name="weight"
                classNameContainer="product-form-shipping-weight"
                label={t('sellercatalog:Weight')}
                placeholder={!formik.values.is_variant ? t('sellercatalog:Weight') : ''}
                type="float"
                inputType="adornment"
                startAdornment={false}
                required={!formik.values.is_variant}
                endAdornment
                endAdornmentComponent={(
                    <span className="end-adornment-container">Gr</span>
                )}
                {...props}
            />
            <FormInput
                classNameContainer="product-form-shipping-dimention-container"
                label={t('sellercatalog:Dimension')}
                grid={3}
                inputs={[
                    {
                        name: 'dimension_package_length',
                        className: 'product-form-shipping-dimention',
                        placeholder: t('sellercatalog:Long'),
                        inputType: 'adornment',
                        startAdornment: false,
                        type: 'float',
                    },
                    {
                        name: 'dimension_package_width',
                        className: 'product-form-shipping-dimention',
                        placeholder: t('sellercatalog:Wide'),
                        inputType: 'adornment',
                        startAdornment: false,
                        type: 'float',
                    },
                    {
                        name: 'dimension_package_height',
                        className: 'product-form-shipping-dimention',
                        placeholder: t('sellercatalog:Tall'),
                        inputType: 'adornment',
                        type: 'float',
                        startAdornment: false,
                        endAdornment: true,
                        endAdornmentComponent: (
                            <span className="end-adornment-container">Cm</span>
                        ),
                    },
                ]}
                {...props}
            />
        </div>
    );
};
export default FormChannelProductShipping;
