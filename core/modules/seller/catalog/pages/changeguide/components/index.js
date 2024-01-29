/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
import React from 'react';
import { useRouter } from 'next/router';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

import { PRIMARY } from '@theme_color';
import useStyles from '@sellermodules/catalog/pages/changeguide/components/style';

const AddAtOnceGuideContent = (props) => {
    const {
        t,
    } = props;
    const router = useRouter();
    const classes = useStyles();

    return (
        <>
            <div className={classes.headerContainer}>
                <div className="left">
                    <IconButton aria-label="back" onClick={() => router.push('/seller/catalog/organize/change')}>
                        <ArrowBackOutlinedIcon />
                    </IconButton>
                    <h2 className={classes.title}>{t('sellercatalog:Change_at_Once')}</h2>
                </div>
            </div>
            <Paper>
                <div className={classes.contentWithoutBorder}>
                    <p>
                        {t('sellercatalog:To_Change_at_Once_Products_please_follow_these_steps')}
                    </p>
                    <ol>
                        <li>
                            <p style={{ marginTop: 0 }}>
                                {t('sellercatalog:First_step_you_have_to_export_all_of_your_products_on_the_menu')}
                                {' '}
                                <b>{t('sellercatalog:Catalog_>_Change_At_Once_>_Download__fill_in_CSV_files_>_Download_Template')}</b>
                            </p>
                            <div className={classes.imgDiv}>
                                <img className={classes.imgImage} src="/assets/img/tutorial_content/seller_change_catalog/tutorial01.png" alt="excel-example" />
                            </div>
                        </li>
                        <li>
                            <p>
                                {t('sellercatalog:Open_the_csv_file_using_any_supported_application_Change_data_in_the_column_that_needs_to_be_changed_and_leave_the_other_column_with_the_same_value_if_nothing_changes')}
                                <br />
                                <b>
                                    {t('sellercatalog:Sample_CSV_Data')}
                                </b>
                            </p>
                            <div className={classes.imgDiv}>
                                <img className={classes.imgImage} src="/assets/img/tutorial_content/seller_change_catalog/tutorial02.png" alt="excel-example" />
                            </div>
                            <p style={{ fontSize: 11 }}>
                                *
                                {t('sellercatalog:red_text_means_mandatory_field_cannot_be_empty')}
                            </p>
                            <p>
                                <b>
                                    {t('sellercatalog:Details_CSV_Information')}
                                </b>
                            </p>
                            <ul className={classes.ulChild}>
                                <li>
                                    <p>
                                        <b>
                                            {t('sellercatalog:SKU')}
                                            :
                                        </b>
                                        {' '}
                                        {t('sellercatalog:Product’s_SKU_Stock_Keeping_Unit_SKU_cannot_be_replaced_or_empty')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('sellercatalog:Name')}
                                            :
                                        </b>
                                        {' '}
                                        {t('sellercatalog:Full_name_of_the_product_Product_name_must_be_unique_different')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('sellercatalog:Status_EnabledDisabled')}
                                            :
                                        </b>
                                        {' '}
                                        {t('sellercatalog:Status_of_the_product_the_value_is_“Enabled”_to_enable_the_product_or_“Disabled”_to_disable_the_product')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('sellercatalog:Price')}
                                            :
                                        </b>
                                        {' '}
                                        {t('sellercatalog:Price_of_the_product_To_use_comma_for_this_field_use_symbol_“”_between_number')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('sellercatalog:Minimum_Order_Quantity')}
                                            :
                                        </b>
                                        {' '}
                                        {t('sellercatalog:Minimum_quantity_allowed_in_shopping_cart')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('sellercatalog:Category')}
                                            :
                                        </b>
                                        {' '}
                                        {t('sellercatalog:Category_of_the_product_the_value_based_on_Category_Id’s_Download_Category_list_in')}
                                        {' '}
                                        <b>{t('sellercatalog:Catalog_>_Set_At_Once_>_Change_at_Once_>_Download_list_of_category_list_of_display_window__list_of_shipping_method_>_Category')}</b>
                                        {' '}
                                        {t('sellercatalog:to_get_all_available_category_id’s')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('sellercatalog:Description')}
                                            :
                                        </b>
                                        {' '}
                                        {t('sellercatalog:Description_of_the_product_this_field_is_not_mandatory')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('sellercatalog:Important_Information')}
                                            :
                                        </b>
                                        {' '}
                                        {t('sellercatalog:Important_Information_of_the_product_for_customers_this_field_is_not_mandatory')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('sellercatalog:Photo')}
                                            {' '}
                                            1-5
                                            :
                                        </b>
                                        {' '}
                                        {t('sellercatalog:Photo_of_the_product_the_value_must_be_the_full_photo_URL_including_the_photo_type')}
                                        {' '}
                                        (
                                        <b>
                                            JPG, JPEG
                                        </b>
                                        {' '}
                                        or
                                        {' '}
                                        <b>
                                            PNG
                                        </b>
                                        ).
                                        {' '}
                                        {t('sellercatalog:Minimum_photo_size_should_be_500x500_pixels_Photo_1_is_mandatory_the_rest_is_optional_To_generate_a_photo_URL_follow_the_\"How_to_upload_product_photos_via_Imgur\"_below')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('sellercatalog:Display_Window')}
                                            :
                                        </b>
                                        {' '}
                                        {t('sellercatalog:Display_window_of_the_product_the_value_based_on_Display_Window_Id’s_Download_Display_Window_list_in')}
                                        {' '}
                                        <b>{t('sellercatalog:Catalog_>_Set_At_Once_>_Change_at_Once_>_Download_list_of_category_list_of_display_window__list_of_shipping_method_>_Display_Window')}</b>
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('sellercatalog:Shipping')}
                                            :
                                        </b>
                                        {' '}
                                        {t('sellercatalog:Shipping_Method_of_the_product_this_field_based_on_Shipping_Method_ID_of_the_product_Download_Shipping_Method_list_in')}
                                        {' '}
                                        <b>{t('sellercatalog:Catalog_>_Set_At_Once_>_Change_at_Once_>_Download_list_of_category_list_of_display_window__list_of_shipping_method_>_Shipping_Method')}</b>
                                        {' '}
                                        {t('sellercatalog:to_get_all_available_shipping_method_id’s_Make_sure_shipping_method_already_configured_in')}
                                        <b>{t('sellercatalog:Store_Setting_>_Shipping_Information')}</b>
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('sellercatalog:Dimension_Long_cm')}
                                            :
                                        </b>
                                        {' '}
                                        {t('sellercatalog:Dimension_long_of_the_product_To_use_comma_for_this_field_use_symbol_“”_between_number_This_field_is_not_mandatory')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('sellercatalog:Dimension_Wide_cm')}
                                            :
                                        </b>
                                        {' '}
                                        {t('sellercatalog:Dimension_wide_of_the_product_To_use_comma_for_this_field_use_symbol_“”_between_number_This_field_is_not_mandatory')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('sellercatalog:Dimension_Tall_cm')}
                                            :
                                        </b>
                                        {' '}
                                        {t('sellercatalog:Dimension_tall_of_the_product_To_use_comma_for_this_field_use_symbol_“”_between_number_This_field_is_not_mandatory')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>
                                            {t('sellercatalog:Weight_kg')}
                                            :
                                        </b>
                                        {' '}
                                        {t('sellercatalog:Total_weight_of_the_product_To_use_comma_for_this_field_use_symbol_“”_between_number')}
                                    </p>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <p>
                                {t('sellercatalog:Select_the_CSV_file_you_modified_earlier_by_clicking')}
                                {' '}
                                <b>{t('sellercatalog:Select_File')}</b>
                                {' '}
                                {t('sellercatalog:button_on')}
                                {' '}
                                <b>{t('sellercatalog:Upload_file_CSV')}</b>
                                {' '}
                                {t('sellercatalog:area’s')}
                            </p>
                            <div className={classes.imgDiv}>
                                <img className={classes.imgImage} src="/assets/img/tutorial_content/seller_change_catalog/tutorial03.png" alt="excel-example" />
                            </div>
                        </li>
                        <li>
                            <p>
                                {t('sellercatalog:After_selecting_csv_file_click_on_the_Upload_button_Please_wait_until_the_process_is_complete_Once_it_is_complete_the_notification_will_appear_like_this')}
                            </p>
                            <div className={classes.imgDiv}>
                                <img className={classes.imgImage} src="/assets/img/tutorial_content/seller_change_catalog/tutorial04.png" alt="excel-example" />
                            </div>
                            <p>
                                {t('sellercatalog:Make_sure_all_the_products_in_the_CSV_are_uploaded_correctly_by_checking_them_on_the_Catalog_page_If_the_upload_fails_the_notification_will_appear_like_this')}
                            </p>
                            <div className={classes.imgDiv}>
                                <img className={classes.imgImage} src="/assets/img/tutorial_content/seller_change_catalog/tutorial05.png" alt="excel-example" />
                            </div>
                            <p>
                                {t('sellercatalog:Find_the_error_details_by_clicking_on_the')}
                                {' '}
                                <b>{t('sellercatalog:Download_File')}</b>
                                {' '}
                                {t('sellercatalog:button_and_open_the_csv_file_using_any_supported_application_The_error_message_will_shown_in_the_last_column_of_csv_for_example')}
                            </p>
                            <div className={classes.imgDiv}>
                                <img className={classes.imgImage} src="/assets/img/tutorial_content/seller_change_catalog/tutorial06.png" alt="excel-example" />
                            </div>
                            <p>
                                {t('sellercatalog:Follow_an_instruction_given_in_the_error_column_to_fix_error_After_all_the_errors_are_fixed_save_the_modified_csv_file_and_reupload_the_csv_file')}
                            </p>
                        </li>
                    </ol>
                    <p>
                        <b>{t('sellercatalog:How_to_Upload_Product_Photos_via_Imgur')}</b>
                    </p>
                    <ol>
                        <li>
                            <p style={{ marginTop: 0 }}>
                                {t('sellercatalog:Open_this_url')}
                                {' '}
                                <a
                                    href="https://imgur.com/upload"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ color: PRIMARY, textDecoration: 'underline' }}
                                >
                                    https://imgur.com/upload
                                </a>
                            </p>
                            <div className={classes.imgDiv}>
                                <img className={classes.imgImage} src="/assets/img/tutorial_content/seller_change_catalog/tutorial07.png" alt="excel-example" />
                            </div>
                        </li>
                        <li>
                            <p>
                                {t('sellercatalog:Upload_your_image_by_clicking_on')}
                                {' '}
                                <b>{t('sellercatalog:Choose_PhotoVideo')}</b>
                                {' '}
                                {t('sellercatalog:and_choose_the_image_Or_you_can_easily_drop_the_image_in_the_left_form')}
                                {' '}
                                (
                                <b>{t('sellercatalog:Drop_Images_Here')}</b>
                                )
                            </p>
                        </li>
                        <li>
                            <p>
                                {t('sellercatalog:After_insert_the_image_the_image_will_be_processed_and_you_will_redirected_to_the_image_url_Right_click_on_the_image_then_choose')}
                                {' '}
                                &quot;
                                <b>{t('sellercatalog:Copy_image_address')}</b>
                                &quot;
                                .
                                {' '}
                                {t('sellercatalog:This_link_can_be_use_on_the_csv_column_field')}
                                {' '}
                                <b>
                                    {t('sellercatalog:Photo')}
                                    {' '}
                                    1-5.
                                </b>
                            </p>
                            <div className={classes.imgDiv}>
                                <img className={classes.imgImage} src="/assets/img/tutorial_content/seller_change_catalog/tutorial08.png" alt="excel-example" />
                            </div>
                        </li>
                    </ol>
                </div>
            </Paper>
        </>
    );
};

export default AddAtOnceGuideContent;
