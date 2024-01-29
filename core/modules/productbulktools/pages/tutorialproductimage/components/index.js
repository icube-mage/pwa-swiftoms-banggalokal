/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useRouter } from 'node_modules/next/router';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import useStyles from '@modules/productbulktools/pages/tutorialproductimage/components/style';

const TutorialProductImageContent = (props) => {
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
            <h2 className={classes.titleTop}>{t('productbulktools:Product_Image_Upload_Tutorial')}</h2>
            <Paper>
                <div className={classes.contentWithoutBorder}>
                    <p>{t('productbulktools:To_upload_product_images_please_follow_these_steps')}</p>
                    <ol>
                        <li>
                            <p style={{ marginTop: 0 }}>
                                {t('productbulktools:Please_prepare_a_product_image_list_to_upload_in_a_CSV_format_You_can_use_the_template_containing_the_required_data_that_can_be_downloaded_from')}
                                {' '}
                                <a href={urlDownload} className="link-button">
                                    {t('productbulktools:Product_Image_Upload_Template')}
                                </a>
                            </p>
                        </li>
                        <li>
                            <p>
                                {t('productbulktools:Open_the_product_image_upload_template_using_any_supported_application_The_first_column_is_the_fieldcolumn_name_while_below_it_is_the_values_Also_please_note_that_only_commaseparated_values_are_supported_for_product_images_upload_For_example')}
                            </p>
                            <img className={classes.imgImage} src="/assets/img/tutorial_content/product_image/tutorial01.jpg" alt="excel-example" />
                            <p>
                                {t('productbulktools:Required_data_on_CSV_file')}
                            </p>
                            <ul className={classes.ulChild}>
                                <li>
                                    <p>
                                        <b>{t('productbulktools:SKU_')}</b>
                                        {' '}
                                        {t('productbulktools:SKU_of_the_product_you_want_to_upload_the_image_to')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>{t('productbulktools:image_')}</b>
                                        {' '}
                                        {t('productbulktools:Link_for_product_main_image')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>{t('productbulktools:small_image_')}</b>
                                        {' '}
                                        {t('productbulktools:Link_for_product’s_small_image')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>{t('productbulktools:thumbnail_')}</b>
                                        {' '}
                                        {t('productbulktools:_Link_for_product_thumbnail_image')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>{t('productbulktools:swatch_image_')}</b>
                                        {' '}
                                        {t('productbulktools:Link_for_swatch_image_small_thumbnails_that_appear_on_the_parent_page_of_a_product')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>{t('productbulktools:additional_images_')}</b>
                                        {' '}
                                        {t('productbulktools:_Link_for_additional_image_if_any')}
                                    </p>
                                </li>
                            </ul>
                            <p>
                                {t('productbulktools:You_can_add_all_images_at_once_or_add_only_specific_images_to_one_product_SKU_If_you_only_want_to_add_a_specific_image_the_values_for_the_other_image_fields_can_be_left_blank_After_that_the_SWIFT_OMS_System_will_only_update_the_product_images_that_have_a_link_as_a_value')}
                            </p>
                        </li>
                        <li>
                            <p>
                                {t('productbulktools:Select_the_CSV_file_you_edited_earlier_by_clicking')}
                                {' '}
                                <b>{t('productbulktools:Choose_File__button').split('$')[0]}</b>
                                {t('productbulktools:Choose_File__button').split('$')[1]}
                            </p>
                            <img className={classes.imgImage} src="/assets/img/tutorial_content/product_image/tutorial02.jpg" alt="excel-example" />
                        </li>
                        <li>
                            <p>
                                {t('productbulktools:Click__Submit').split('$')[0]}
                                {' '}
                                <b>{t('productbulktools:Click__Submit').split('$')[1]}</b>
                                {' '}
                                {t('productbulktools:button_to_upload_and_please_wait_till_the_process_is_finished_The_product_table_with_the_newly_added_product_images_will_be_updated_shortly_after_it')}
                            </p>
                        </li>
                    </ol>
                </div>
            </Paper>
        </>
    );
};

export default TutorialProductImageContent;
