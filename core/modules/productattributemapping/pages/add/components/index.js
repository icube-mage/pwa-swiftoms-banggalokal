/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import Autocomplete from '@common_autocomplete';
import Select from '@common_select';
import TextField from '@common_textfield';
import { useRouter } from 'next/router';
import useStyles from '@modules/productattributemapping/pages/add/components/style';

const ProductAttributeMappingAddContent = (props) => {
    const {
        formik,
        dataMarketplace,
        dataMapAttribute,
        getCategoryRes,
        getAttributeRes,
        getAttributeTotalRes,
        getAttributeSettingRes,
        t,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [show, setShow] = React.useState(false);
    const total = (getAttributeTotalRes && getAttributeTotalRes.data
        && getAttributeTotalRes.data.getMarketplaceProductAttributeList
        && getAttributeTotalRes.data.getMarketplaceProductAttributeList.total_count);
    const setting = (getAttributeSettingRes && getAttributeSettingRes.data
        && getAttributeSettingRes.data.getMpProductVariantAttributeSetting) || {};

    const variantWarn = () => {
        let message = '';
        const { maximum_variant_attribute, minimum_variant_attribute } = setting;
        if (total < minimum_variant_attribute) {
            message = `${t('productattributemapping:Minimum')} ${minimum_variant_attribute} ${t('productattributemapping:variant_attribute_need_mapping')}`;
        } else if (total > maximum_variant_attribute) {
            message = `${t('productattributemapping:Maximum')} ${maximum_variant_attribute} ${t('productattributemapping:variant_attribute_need_mapping')}. ${t('productattributemapping:Please_remove')} 
            ${total - maximum_variant_attribute} ${t('productattributemapping:variant_attribute')}`;
        }
        return message;
    };

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/marketplace/productattributemapping')}
                variant="contained"
                style={{ marginRight: 16 }}
            >
                <ChevronLeftIcon style={{
                    fontSize: 30,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                />
            </Button>
            <h2 className={classes.titleTop}>{t('productattributemapping:New_Mapping')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>{t('productattributemapping:Marketplace_Data')}</h5>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('productattributemapping:Marketplace')}</span>
                        </div>
                        <Select
                            selectClasses={classes.fieldInput}
                            formControlClasses={classes.selectControl}
                            name="marketplace_code"
                            value={formik.values.marketplace_code}
                            onChange={(e) => { formik.handleChange(e, e.target.value); formik.setFieldValue('category_id', ''); }}
                            dataOptions={dataMarketplace}
                            error={!!(formik.touched.marketplace_code && formik.errors.marketplace_code)}
                            fullWidth
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('productattributemapping:Category')}</span>
                        </div>
                        {formik.values.marketplace_code ? (
                            <Autocomplete
                                className={classes.autocompleteRoot}
                                name="category_id"
                                value={formik.values.category_id}
                                onChange={(e) => { formik.setFieldValue('category_id', e); formik.setFieldValue('entity_id', ''); }}
                                primaryKey="entity_id"
                                labelKey="marketplace_category_name"
                                loading={getCategoryRes && getCategoryRes.loading}
                                options={getCategoryRes && getCategoryRes.data && getCategoryRes.data.getMpProductAttributeMappingMpCategories}
                                error={!!(formik.touched.category_id && formik.errors.category_id)}
                                helperText={(formik.touched.category_id && formik.errors.category_id) || ''}
                                fullWidth
                            />
                        ) : <span className={classes.selectFirst}>{t('productattributemapping:Select_Marketplace_First')}</span>}
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('productattributemapping:Product_Attributes')}</span>
                        </div>
                        {formik.values.marketplace_code ? (
                            formik.values.category_id
                                ? (
                                    <Autocomplete
                                        className={classes.autocompleteRoot}
                                        name="entity_id"
                                        value={formik.values.entity_id}
                                        onChange={(e) => formik.setFieldValue('entity_id', e)}
                                        primaryKey="entity_id"
                                        labelKey="marketplace_attribute_name"
                                        loading={getAttributeRes && getAttributeRes.loading}
                                        options={getAttributeRes && getAttributeRes.data && getAttributeRes.data.getMarketplaceProductAttributeList
                                            && getAttributeRes.data.getMarketplaceProductAttributeList.items}
                                        error={!!(formik.touched.entity_id && formik.errors.entity_id)}
                                        helperText={(formik.touched.entity_id && formik.errors.entity_id) || ''}
                                        fullWidth
                                    />
                                )
                                : <span className={classes.selectFirst}>{t('productattributemapping:Select_Category_First')}</span>
                        ) : <span className={classes.selectFirst}>{t('productattributemapping:Select_Marketplace_First')}</span>}
                    </div>
                    {formik.values.category_id
                        ? (
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span
                                        className={classes.label}
                                        style={{ cursor: 'pointer', color: '#0090E5' }}
                                        onClick={() => setShow(true)}
                                    >
                                        {t('productattributemapping:Show_mandatory_attribute')}

                                    </span>
                                </div>
                            </div>
                        )
                        : null}

                    {formik.values.entity_id
                        ? (
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>Input Type</span>
                                </div>
                                <TextField
                                    disabled
                                    variant="outlined"
                                    value={formik.values.entity_id?.marketplace_input_type}
                                    InputProps={{
                                        className: classes.fieldInputDisabled,
                                    }}
                                />
                            </div>
                        )
                        : null}

                    <br />
                    <h5 className={classes.titleSmall}>{t('productattributemapping:Mapping_To')}</h5>
                    <br />
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('productattributemapping:Product_Attribute')}</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            name="attribute_id"
                            value={formik.values.attribute_id}
                            onChange={(e) => formik.setFieldValue('attribute_id', e)}
                            primaryKey="value"
                            labelKey="label"
                            options={dataMapAttribute}
                            error={!!(formik.touched.attribute_id && formik.errors.attribute_id)}
                            helperText={(formik.touched.attribute_id && formik.errors.attribute_id) || ''}
                            fullWidth
                        />
                    </div>
                </div>

                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        {t('productattributemapping:Submit')}
                    </Button>
                </div>

                {formik.values.category_id && show
                    ? (
                        <div className={classes.content}>
                            <div className={classes.needMapping}>
                                <span className={classes.label}>{t('productattributemapping:List_of_mandatory_attributes_need_mapping')}</span>
                            </div>
                            <div style={{ margin: '10px 0' }}>
                                <span className={classes.redWarn}>{variantWarn()}</span>
                            </div>
                            <table className={classes.table}>
                                <tbody>
                                    <tr className={classes.tr}>
                                        <th className={classes.th}>{t('productattributemapping:No')}</th>
                                        <th className={classes.th}>{t('productattributemapping:Marketplace_Attribute_Name')}</th>
                                    </tr>
                                    {getAttributeRes && getAttributeRes.data
                                        && getAttributeRes.data.getMarketplaceProductAttributeList
                                        && getAttributeRes.data.getMarketplaceProductAttributeList.items.map((e, i) => {
                                            if (e.is_mandatory === 1) {
                                                return (
                                                    <tr key={i}>
                                                        <td className={classes.td}>{i + 1}</td>
                                                        <td className={classes.td}>{e.marketplace_attribute_name}</td>
                                                    </tr>
                                                );
                                            }
                                            return null;
                                        })}
                                </tbody>
                            </table>
                        </div>
                    ) : null}
            </Paper>
        </>
    );
};

export default ProductAttributeMappingAddContent;
