/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useRouter } from 'node_modules/next/router';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import useStyles from '@modules/productbulktools/pages/tutorialconfigurableproduct/components/style';

const TutorialUploadContent = (props) => {
    const {
        urlDownload, t,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/product/productbulktools')}
                variant="contained"
                style={{ marginRight: 16 }}
            >
                <ChevronLeftIcon
                    style={{
                        fontSize: 30,
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            </Button>
            <h2 className={classes.titleTop}>{t('productbulktools:Product_Configurable_Import_Tutorial')}</h2>
            <Paper>
                <div className={classes.contentWithoutBorder}>
                    <p>{t('productbulktools:To_import_configurable_products_please_follow_these_steps')}</p>
                    <ol>
                        <li>
                            <p style={{ marginTop: 0 }}>
                                {t('productbulktools:Please_prepare_a_product_configurable_list_to_import_in_a_CSV_format_You_can_use_the_template_containing_the_required_data_that_can_be_downloaded_from')}
                                {' '}
                                <a href={urlDownload} className="link-button">
                                    {t('productbulktools:Configurable_Product_Upload_Template')}
                                </a>
                            </p>
                        </li>
                        <li>
                            <p>
                                {t('productbulktools:Open_the_configurable_product_import_template_using_any_supported_application_The_first_column_is_the_fieldcolumn_name_while_below_it_is_the_configurable_products_data_Also_please_note_that_only_commaseparated_values_are_supported_for_configurable_product_import_For_example')}
                            </p>
                            <img className={classes.imgImage} src="/assets/img/tutorial_content/configurable_product/tutorial01.jpg" alt="excel-example" />
                            <p>
                                {t('productbulktools:Required_data_on_CSV_file')}
                            </p>
                            <ul className={classes.ulChild}>
                                <li>
                                    <p>
                                        <b>{t('productbulktools:Sku')}</b>
                                        {' '}
                                        :
                                        {' '}
                                        {t('productbulktools:Product’s_SKU_Stock_Keeping_Unit')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>{t('productbulktools:Group')}</b>
                                        {' '}
                                        :
                                        {' '}
                                        {t('productbulktools:SKU_of_the_parent_product_for_the_child_product_entry_Leave_this_column_empty_if_the_entry_is_parent_product')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>{t('productbulktools:Attribute_set_code')}</b>
                                        {' '}
                                        :
                                        {' '}
                                        {t('productbulktools:Code_for_attribute_set_that_is_used_in_the_product')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>{t('productbulktools:Name')}</b>
                                        {' '}
                                        :
                                        {' '}
                                        {t('productbulktools:Product_name')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>{t('productbulktools:Description')}</b>
                                        {' '}
                                        :
                                        {' '}
                                        {t('productbulktools:Description_of_the_product')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>{t('productbulktools:Product_type')}</b>
                                        {' '}
                                        :
                                        {' '}
                                        {t('productbulktools:For_parent_product_the_type_is')}
                                        <b>{` "${t('productbulktools:configurable')}" `}</b>
                                        {t('productbulktools:while_for_the_child_product_is')}
                                        <b>{` "${t('productbulktools:simple')}" `}</b>
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>{t('productbulktools:Visibility')}</b>
                                        {' '}
                                        :
                                        {' '}
                                        {t('productbulktools:To_make_the_parent_product_visible_in_the_search_or_catalog_please_set_the_visibility_to')}
                                        <b>{` "${t('productbulktools:Catalog_Search')}"`}</b>
                                        .
                                        {' '}
                                        {t('productbulktools:For_the_child_product_use')}
                                        <b>{` "${t('productbulktools:Not_Visible_Individually')}" `}</b>
                                        .
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>{t('productbulktools:Price')}</b>
                                        {' '}
                                        :
                                        {' '}
                                        {t('productbulktools:Product_price_only_applies_to_the_child_product_Leave_this_field_empty_if_the_entry_is_a_parent_product')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>{t('productbulktools:Qty')}</b>
                                        {' '}
                                        :
                                        {' '}
                                        {t('productbulktools:Similar_to_product_price_only_child_product_that_is_required_qty_For_parent_products_leave_this_field_blank')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>{t('productbulktools:Status')}</b>
                                        {' '}
                                        :
                                        {' '}
                                        {t('productbulktools:Use__to_enable_the_product_and_use__value_to_disable_it').split('$')[0]}
                                        <b>"1"</b>
                                        {t('productbulktools:Use__to_enable_the_product_and_use__value_to_disable_it').split('$')[1]}
                                        <b>"0"</b>
                                        {t('productbulktools:Use__to_enable_the_product_and_use__value_to_disable_it').split('$')[2]}
                                    </p>
                                </li>
                            </ul>
                            <p>
                                {t('productbulktools:The_fields_below_are_the_product_attributes_that_are_currently_used_This_might_be_different_depending_on_your_needs')}
                            </p>
                            <ul>
                                <li>
                                    <p>
                                        <b>{t('productbulktools:Size')}</b>
                                        {' '}
                                        :
                                        {' '}
                                        {t('productbulktools:Product_size_only_used_for_child_products_For_parent_products_leave_this_field_blank')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>{t('productbulktools:Color')}</b>
                                        {' '}
                                        :
                                        {' '}
                                        {t('productbulktools:Same_as_product_price_add_color_only_in_child_products_entry_Leave_this_field_empty_if_the_entry_is_a_parent_product')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>{t('productbulktools:Configurable_variations')}</b>
                                        {' '}
                                        :
                                        {' '}
                                        {t('productbulktools:Variation_that_is_used_for_the_configurable_products_For_example_if_you_use_size_and_color_in_product_attributes_the_values_for_this_field_should_besizecolor').split('$')[0]}
                                        {' '}
                                        <b>
                                            "
                                            {t('productbulktools:Variation_that_is_used_for_the_configurable_products_For_example_if_you_use_size_and_color_in_product_attributes_the_values_for_this_field_should_besizecolor').split('$')[1]}
                                            "
                                        </b>
                                        .
                                    </p>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <p>
                                {t('productbulktools:Select_the_CSV_file_you_have_edited_earlier_by_clicking')}
                                {' '}
                                <b>{t('productbulktools:Choose_File__button').split('$')[0]}</b>
                                {t('productbulktools:Choose_File__button').split('$')[1]}
                            </p>
                            <img className={classes.imgImage} src="/assets/img/tutorial_content/configurable_product/tutorial02.jpg" alt="excel-example" />
                        </li>
                        <li>
                            <p>
                                {t('productbulktools:Click__Submit').split('$')[0]}
                                {' '}
                                <b>{t('productbulktools:Click__Submit').split('$')[1]}</b>
                                {' '}
                                {t('productbulktools:button_to_upload_and_please_wait_till_the_process_is_finished_The_product_table_with_the_newly_added_configurable_products_will_be_updated_shortly_after_it')}
                            </p>
                        </li>
                    </ol>
                </div>
            </Paper>
        </>
    );
};

export default TutorialUploadContent;
