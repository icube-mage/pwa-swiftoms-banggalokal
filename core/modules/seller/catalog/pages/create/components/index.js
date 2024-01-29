import clsx from 'clsx';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import Button from '@common_button';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

import FormInput from '@sellermodules/catalog/plugins/Input';
import CategoryTree from '@sellermodules/catalog/plugins/CategoryTree';
import VariantsContent from '@sellermodules/catalog/plugins/Variants';
import useStyles from '@sellermodules/catalog/pages/create/components/style';

const CatalogOrganizeContent = (props) => {
    const {
        t, handleDropFile, formik, shippingOptions, shipConfig, dataEtalase,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    React.useEffect(() => {
        if (!formik.isSubmitting) return;
        const keys = Object.keys(formik.errors);
        if (keys.length > 0) {
            const keyName = keys[0];
            const node = document.getElementsByName(keyName);
            if (node.length) {
                node[0].scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
                node[0].focus();
            }
        }
    }, [formik]);

    const skuRef = React.useRef(null);

    const handleClickSkuWarning = () => {
        skuRef.current.focus();
    };

    return (
        <div className={classes.container}>
            <div className={classes.headerContainer}>
                <div className="left">
                    <IconButton aria-label="back" onClick={() => router.push('/seller/catalog')}>
                        <ArrowBackOutlinedIcon />
                    </IconButton>
                    <h2 className={classes.title}>{t('sellercatalog:Catalog_Page')}</h2>
                </div>
                <Button
                    className={classes.btn}
                    startIcon={<img alt="" src="/assets/img/save-white.svg" className="icon" />}
                    onClick={formik.handleSubmit}
                >
                    {t('sellercatalog:Save')}
                </Button>
            </div>
            <Paper className={classes.paper}>
                <h2 className={clsx(classes.title, 'paper')}>{t('sellercatalog:Product_Information')}</h2>
                <FormInput
                    name="name"
                    label={t('sellercatalog:Product_Name')}
                    placeholder={t('sellercatalog:Input_min_40_characters_to_make_it_more_attractive_and_easy_for_buyers_to_find')}
                    required
                    {...props}
                />
                <FormInput
                    name="sku"
                    label={t('sellercatalog:SKU')}
                    placeholder={t('sellercatalog:Stock_keeping_unit')}
                    required
                    inputRef={skuRef}
                    {...props}
                />
                <FormInput
                    name="price"
                    label={t('sellercatalog:Price')}
                    placeholder={!formik.values.is_variant ? t('sellercatalog:Input_price') : ''}
                    required={!formik.values.is_variant}
                    type="float"
                    disabled={formik.values.is_variant}
                    {...props}
                />
                <FormInput
                    name="minimum_order_quantity"
                    label={t('sellercatalog:Minimum_Order_Quantity')}
                    placeholder={t('sellercatalog:Minimum_order')}
                    required
                    type="integer"
                    {...props}
                />
                <div className={clsx(classes.formFieldsGrid, 'start')}>
                    <InputLabel htmlFor="category" className={classNames(classes.label, classes.required)}>
                        {t('sellercatalog:Category')}
                    </InputLabel>
                    <CategoryTree {...props} name="category_id" />
                </div>
                <FormInput
                    name="etalase_ids"
                    label={t('sellercatalog:Display_Window')}
                    placeholder={t('sellercatalog:Choose_display_window')}
                    inputType="select"
                    options={dataEtalase}
                    primaryKey="entity_id"
                    labelKey="name"
                    multiple
                    {...props}
                />
            </Paper>
            <Paper className={classes.paper}>
                <h2 className={clsx(classes.title, 'paper')}>{t('sellercatalog:Product_Details')}</h2>
                <FormInput
                    name="description"
                    label={t('sellercatalog:Product_Descriptions')}
                    labelPosition="start"
                    multiline
                    rows={8}
                    {...props}
                />
                <FormInput
                    name="short_description"
                    label={t('sellercatalog:Important_Information')}
                    labelPosition="start"
                    multiline
                    rows={5}
                    {...props}
                />
            </Paper>
            <Paper className={classes.paper}>
                <h2 className={clsx(classes.title, 'paper')}>{t('sellercatalog:Product_Photo')}</h2>
                <FormInput
                    name="images"
                    label={t('sellercatalog:Product_Photos')}
                    labelPosition="start"
                    inputType="image"
                    getBase64={(e, i) => handleDropFile(e, 'images', i)}
                    formatFile=".jpg, .jpeg, .png, .gif"
                    required
                    {...props}
                />
                <div className={clsx(classes.formFieldsGrid, 'start', 'image')} name="images">
                    <div />
                    <div className={clsx(classes.helper, 'mt20')}>
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
                </div>
            </Paper>
            <Paper className={classes.paper}>
                <h2 className={clsx(classes.title, 'paper')}>{t('sellercatalog:Product_Variants')}</h2>
                {!formik.values.sku && (
                    <div className={classes.warningDiv}>
                        {t('sellercatalog:Please_fill')}
                        {' '}
                        <span className="clickable" onClick={handleClickSkuWarning} aria-hidden="true">{t('sellercatalog:SKU_field')}</span>
                        {' '}
                        {t('sellercatalog:to_continue_create_product_variants')}
                    </div>
                )}
                <div className={classes.desc}>
                    <div className={classes.helper}>
                        {t('sellercatalog:Please_select_the_product_variant_you_want')}
                    </div>
                    <div className={classes.btnContainer}>
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
                {formik.values.is_variant
                    && <VariantsContent {...props} />}
            </Paper>
            <Paper className={classes.paper}>
                <h2 className={clsx(classes.title, 'paper')}>{shipConfig ? t('sellercatalog:Weight__Shipping') : t('sellercatalog:Weight')}</h2>
                {shipConfig && (
                    <FormInput
                        name="shipping"
                        label={t('sellercatalog:Shipping')}
                        placeholder={t('sellercatalog:Choose_a_delivery_service')}
                        inputType="select"
                        labelPosition="start"
                        options={shippingOptions}
                        primaryKey="entity_id"
                        labelKey="label"
                        multiple
                        required
                        helper={shippingOptions.length ? null
                            : (
                                <>
                                    {t('sellercatalog:No_shipping_methods_are_available_Please_setup_shipping_method_in')}
                                    {' '}
                                    <a
                                        className={classes.helperLink}
                                        aria-hidden="true"
                                        href="/seller/storesetting/location"
                                        target="_blank"
                                    >
                                        {t('sellercatalog:store_setting_menu')}
                                    </a>
                                </>
                            )}
                        {...props}
                    />
                )}
                <FormInput
                    label={t('sellercatalog:Dimension')}
                    grid={3}
                    inputs={[
                        {
                            name: 'dimension_package_length',
                            placeholder: t('sellercatalog:Long'),
                            inputType: 'adornment',
                            adornText: 'Cm',
                            type: 'float',
                        },
                        {
                            name: 'dimension_package_width',
                            placeholder: t('sellercatalog:Wide'),
                            inputType: 'adornment',
                            adornText: 'Cm',
                            type: 'float',
                        },
                        {
                            name: 'dimension_package_height',
                            placeholder: t('sellercatalog:Tall'),
                            inputType: 'adornment',
                            adornText: 'Cm',
                            type: 'float',
                        },
                    ]}
                    {...props}
                />
                <FormInput
                    name="weight"
                    label={t('sellercatalog:Weight')}
                    placeholder={!formik.values.is_variant ? t('sellercatalog:Weight') : ''}
                    inputType="adornment"
                    adornText="Kg"
                    type="float"
                    required={!formik.values.is_variant}
                    disabled={formik.values.is_variant}
                    {...props}
                />
            </Paper>
        </div>
    );
};

export default CatalogOrganizeContent;
