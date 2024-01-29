/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useRouter } from 'node_modules/next/router';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import useStyles from '@modules/productbulktools/pages/tutorialbundleproduct/components/style';

const tutorialbundleproductContent = (props) => {
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
            <h2 className={classes.titleTop}>{t('productbulktools:Bundle_Product_Import_Tutorial')}</h2>
            <Paper>
                <div className={classes.contentWithoutBorder}>
                    <p>
                        <b>{t('productbulktools:Bundle_Product')}</b>
                        {' '}
                        {t('productbulktools:is_a_type_of_product_that_allows_customers_to_add_and_configure_products_in_a_bundle_according_to_their_needs_and_build_a_“product_of_their_own”')}
                        <br />
                        {t('productbulktools:To_import_the_bundle_product_please_follow_these_steps')}
                    </p>
                    <ol>
                        <li>
                            <p style={{ marginTop: 0 }}>
                                {t('productbulktools:Add_each_product_item_that_will_be_used_as_child_products_in_the_bundle_in_the')}
                                {' '}
                                <b>{t('productbulktools:Catalog_>_Products_>_Create')}</b>
                                {' '}
                                {t('productbulktools:or')}
                                {' '}
                                <b>{t('productbulktools:Catalog_>_Product_Bulk_Tools_>_Product_Import')}</b>
                                {' '}
                                {t('productbulktools:menu_The_SKU_of_each_of_these_products_will_later_be_used_in_the_CSV_file')}
                            </p>
                        </li>
                        <li>
                            <p style={{ marginTop: 0 }}>
                                {t('productbulktools:Prepare_the_bundle_product_list_to_import_in_a_CSV_format_You_can_use_the_template_containing_the_required_data_that_can_be_downloaded_from')}
                                {' '}
                                <a href={urlDownload} className="link-button">
                                    {t('productbulktools:Import_Bundle_Product_Template')}
                                </a>
                                .
                            </p>
                        </li>
                        <li>
                            <p>
                                {t('productbulktools:Open_the_template_using_any_supported_application_and_add_the_bundle_product_data_as_needed_but_make_sure_that_all_of_the_products_have_the_same_assigned_location_Also_please_note_that_only_commaseparated_values_are_supported_for_the_template')}
                                <br />
                                {t('productbulktools:The_first_column_in_the_template_is_the_fieldcolumn_name_while_below_it_is_the_bundle_product_data')}
                                <br />
                                {t('productbulktools:Each_bundle_product_entry_has_the_structure_of_a_parent_product_option_as_a_variant_of_the_bundle_and_child_products_Likewise_if_you_want_to_import_more_than_one_bundle_product_the_following_entries_must_be_arranged_according_to_the_structure_that_is_mentioned_earlier')}
                                <br />
                                {t('productbulktools:Sample_data')}
                                {' '}
                                :
                            </p>
                            <img className={classes.imgImage} src="/assets/img/tutorial_content/product_bundle/tutorial01.png" alt="excel-example" />
                            <p>
                                {t('productbulktools:Required_data_on_CSV_file')}
                            </p>
                            <ul className={classes.ulChild}>
                                <li>
                                    <p>
                                        <b>
                                            {t('productbulktools:Typedata')}
                                            :
                                        </b>
                                        {' '}
                                        {t('productbulktools:Type_of_product_data_parent_option_or_child')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('productbulktools:SKU')}
                                            :
                                        </b>
                                        {' '}
                                        {t('productbulktools:SKU_of_the_bundle_product_All_product_data_in_the_same_bundle_should_use_the_same_SKU')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('productbulktools:Productattribute_set')}
                                            :
                                        </b>
                                        {' '}
                                        {t('productbulktools:Attribute_set_for_the_bundle_product')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('productbulktools:Name')}
                                            :
                                        </b>
                                        {' '}
                                        {t('productbulktools:Full_name_of_the_bundle_product_This_value_is_only_required_for_the_parent_product')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('productbulktools:Description')}
                                            :
                                        </b>
                                        {' '}
                                        {t('productbulktools:Description_of_the_bundle_product_This_value_is_only_required_for_the_parent_product')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('productbulktools:Status')}
                                            :
                                        </b>
                                        {' '}
                                        {t('productbulktools:Select')}
                                        {' '}
                                        <b>{t('productbulktools:Enabled')}</b>
                                        {' '}
                                        {t('productbulktools:to_enable_the_bundle_product_in_the_catalog_or_select')}
                                        {' '}
                                        <b>{t('productbulktools:Disabled')}</b>
                                        {' '}
                                        {t('productbulktools:to_disable_it')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('productbulktools:Visibility')}
                                            :
                                        </b>
                                        {' '}
                                        {t('productbulktools:To_make_the_parent_product_visible_in_the_search_or_catalog_please_set_the_visibility_to')}
                                        {' '}
                                        <b>
                                            "
                                            {t('productbulktools:Catalog_Search')}
                                            "
                                        </b>
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('productbulktools:Tax_class_id')}
                                            :
                                        </b>
                                        {' '}
                                        {t('productbulktools:Tax_class_of_the_bundle_product_This_value_is_only_required_for_the_parent_product')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('productbulktools:Price')}
                                            :
                                        </b>
                                        {' '}
                                        {t('productbulktools:bundle_product_price_This_value_is_only_required_for_the_parent_product')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('productbulktools:Is_fixed_bundle')}
                                            :
                                        </b>
                                        {' '}
                                        {t('productbulktools:Set_the_value_to')}
                                        {' '}
                                        <b>"0"</b>
                                        {' '}
                                        {t('productbulktools:to_specify_the_entry_not_as_a_fixed_bundle_product')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('productbulktools:Price_type')}
                                            :
                                        </b>
                                        {' '}
                                        {t('productbulktools:Set_the_value_to')}
                                        {' '}
                                        <b>{t('productbulktools:Dynamic')}</b>
                                        {' '}
                                        {t('productbulktools:if_the_price_of_the_bundle_product_follows_the_original_price_in_the_product_catalog_Set_the_value_to')}
                                        {' '}
                                        {t('productbulktools:Set_the_value_to')}
                                        {' '}
                                        <b>{t('productbulktools:Fixed')}</b>
                                        {' '}
                                        {t('productbulktools:if_the_product_price_follows_the_value_set_here_This_value_is_only_required_for_the_parent_product')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('productbulktools:Weight_type')}
                                            :
                                        </b>
                                        {' '}
                                        {t('productbulktools:Set_the_value_to')}
                                        {' '}
                                        <b>{t('productbulktools:Dynamic')}</b>
                                        {' '}
                                        {t('productbulktools:if_the_weight_of_the_bundle_product_follows_the_original_weight_in_the_product_catalog_Set_the_value_to_')}
                                        {' '}
                                        {t('productbulktools:Set_the_value_to')}
                                        {' '}
                                        <b>{t('productbulktools:Fixed')}</b>
                                        {' '}
                                        {t('productbulktools:if_the_product_weight_follows_the_value_set_here_This_value_is_only_required_for_the_parent_product')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('productbulktools:Default_title')}
                                            :
                                        </b>
                                        {' '}
                                        {t('productbulktools:Default_variant_option_title_All_child_products_for_the_default_variant_option_must_have_the_same_title')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('productbulktools:Position')}
                                            :
                                        </b>
                                        {' '}
                                        {t('productbulktools:Set_the_position_of_option_and_child_product_in_the_bundle_product_variant_option_For_parent_products_just_leave_this_column_blank')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('productbulktools:Required')}
                                            :
                                        </b>
                                        {' '}
                                        {t('productbulktools:If_the_variant_option_is_required_set_the_value_to_')}
                                        {' '}
                                        <b>"1"</b>
                                        .
                                        {' '}
                                        {t('productbulktools:If_not_set_it_to')}
                                        {' '}
                                        <b>"0"</b>
                                        .
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('productbulktools:Selection_sku')}
                                            :
                                        </b>
                                        {' '}
                                        {t('productbulktools:Add_the_SKU_for_child_products')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('productbulktools:Is_default')}
                                            :
                                        </b>
                                        {' '}
                                        {t('productbulktools:Set_the_value_to')}
                                        {' '}
                                        <b>"1"</b>
                                        {' '}
                                        {t('productbulktools:to_set_the_product_as_the_default_option_If_not_set_the_value_to')}
                                        {' '}
                                        <b>"0"</b>
                                        .
                                        {' '}
                                        {t('productbulktools:This_value_is_only_required_for_the_child_product')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('productbulktools:Selection_price_value')}
                                            :
                                        </b>
                                        {' '}
                                        {t('productbulktools:Add_the_price_for_each_child_product')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('productbulktools:Selection_qty')}
                                            :
                                        </b>
                                        {' '}
                                        {t('productbulktools:Add_the_available_stock_for_each_child_product')}
                                    </p>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <p>
                                {t('productbulktools:Select_the_CSV_file_you_edited_earlier_by_clicking')}
                                {' '}
                                <b>{t('productbulktools:Choose_File')}</b>
                                {' '}
                                {t('productbulktools:button')}
                            </p>
                            <img className={classes.imgImage} src="/assets/img/tutorial_content/product_bundle/tutorial02.png" alt="excel-example" />
                        </li>
                        <li>
                            <p>
                                {t('productbulktools:Click')}
                                {' '}
                                <b>{t('productbulktools:Submit')}</b>
                                {' '}
                                {t('productbulktools:button_to_start_importing_and_please_wait_for_the_process_to_finish_The_product_catalog_with_the_newly_added_bundle_product_will_be_updated_shortly_after_it')}
                            </p>
                        </li>
                    </ol>
                </div>
            </Paper>
        </>
    );
};

export default tutorialbundleproductContent;
