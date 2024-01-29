/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useRouter } from 'node_modules/next/router';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import useStyles from '@modules/productbulktools/pages/tutorialupload/components/style';

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
            <h2 className={classes.titleTop}>{t('productbulktools:Product_Import_Tutorial')}</h2>
            <Paper>
                <div className={classes.contentWithoutBorder}>
                    <p>{t('productbulktools:To_upload_the_product_list_please_follow_these_steps')}</p>
                    <ol>
                        <li>
                            <p style={{ marginTop: 0 }}>
                                {t('productbulktools:Please_prepare_a_product_list_to_upload_in_CSV_format_You_can_use_the_existing_template_containing_the_required_data_that_can_be_downloaded_from')}
                                {' '}
                                <a href={urlDownload} className="link-button">
                                    {t('catalogProduct_Upload_Template')}
                                </a>
                            </p>
                            <img className={classes.imgImage} src="/assets/img/tutorial_content/product_import/tutorial01.jpg" alt="excel-example" />
                        </li>
                        <li>
                            <p>
                                {t('productbulktools:If_you_want_to_use_a_different_template_for_product_upload_you_can_change_it_on_the_')}
                                <b>{t('productbulktools:Configuration_Menu')}</b>
                            </p>
                            <ul className={classes.ulChild}>
                                <li>
                                    <p>
                                        {t('productbulktools:Prepare_the_template_in')}
                                        {' '}
                                        <b>{t('productbulktools:CSV')}</b>
                                        {' '}
                                        {t('productbulktools:file_format_with_commaseparated_values_This_format_is_required_for_product_import_The_first_row_is_the_column_name_and_below_it_is_the_product_data_For_example')}
                                    </p>
                                    <p className={classes.exampleP}>
                                        <span>{t('productbulktools:skunamepricestockqty')}</span>
                                        <br />
                                        <span>{t('productbulktools:X9HC01DEMINERALIZED_WATER_1000L130000010')}</span>
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        {t('productbulktools:On_the')}
                                        {' '}
                                        <b>{t('productbulktools:Configuration_Menu')}</b>
                                        {' '}
                                        {t('productbulktools:select')}
                                        {' '}
                                        <b>{t('productbulktools:Product')}</b>
                                        {t('productbulktools:_and_expand_on')}
                                        {' '}
                                        <b>{t('productbulktools:Product_Import')}</b>
                                        {' '}
                                        {t('productbulktools:section')}
                                    </p>
                                    <img className={classes.imgImage} src="/assets/img/tutorial_content/product_import/tutorial02.jpg" alt="excel-example" />
                                </li>
                                <li>
                                    <p>
                                        {t('productbulktools:On_the')}
                                        {' '}
                                        <b>{t('productbulktools:Upload_File_Product_Template')}</b>
                                        {t('productbulktools:_click')}
                                        {' '}
                                        <b>{t('productbulktools:Choose_File')}</b>
                                        {' '}
                                        {t('productbulktools:button_and_select_the_CSV_file_you_have_been_prepared_before')}
                                    </p>
                                    <img className={classes.imgImage} src="/assets/img/tutorial_content/product_import/tutorial03.jpg" alt="excel-example" />
                                    <p>
                                        {t('productbulktools:If_the_template_file_has_been_selected_the_')}
                                        {' '}
                                        <b>{t('productbulktools:Delete')}</b>
                                        {' '}
                                        {t('productbulktools:button_will_be_visible_and_you_can_use_it_to_delete_the_existing_file_selection_This_action_will_restore_the_template_to_the_default_version')}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        {t('productbulktools:Click')}
                                        {' '}
                                        <b>{t('productbulktools:Submit')}</b>
                                        {' '}
                                        {t('productbulktools:button_to_save_configuration_changes')}
                                    </p>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <p>
                                {t('productbulktools:Open_the_product_upload_template_using_any_supported_application_The_columns_in_this_file_are_the_minimum_requirements_to_upload_product_data_You_can_add_another_column_that_is_included_in_the_product_attributeAlso_please_note_that_only_commaseparated_values_are_supported_for_product_upload')}
                            </p>
                        </li>
                        <li>
                            <p>
                                {t('productbulktools:Select_file_for_product_list_csv_format_by_clicking_')}
                                <b>{t('productbulktools:Choose_File')}</b>
                            </p>
                            <img className={classes.imgImage} src="/assets/img/tutorial_content/product_import/tutorial04.jpg" alt="excel-example" />
                        </li>
                        <li>
                            <p>
                                {t('productbulktools:Click')}
                                {' '}
                                <b>{t('productbulktools:Submit')}</b>
                                {' '}
                                {t('productbulktools:button_to_upload_and_please_wait_till_the_process_is_finished_The_updated_product_table_will_be_updated_shortly_after_it')}
                            </p>
                        </li>
                    </ol>
                </div>
            </Paper>
        </>
    );
};

export default TutorialUploadContent;
