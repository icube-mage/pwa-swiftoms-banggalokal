/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useRouter } from 'node_modules/next/router';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import useStyles from '@modules/shipmentmarketplace/pages/tutorialbulkconfirmed/components/style';

const TutorialBulkConfirmed = (props) => {
    const {
        t,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/shipment/shipmentmarketplace/confirmed')}
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
            <h2 className={classes.titleTop}>{t('shipmentmarketplace:Bulk_Confirmed_Tutorial')}</h2>
            <Paper>
                <div className={classes.contentWithoutBorder}>
                    <p>
                        {t('shipmentmarketplace:Bulk_Confirmed_feature_is_used_to_confirm_allocation_status_for_marketplace_shipment_This_will_update_allocation_status_from')}
                        {' '}
                        {' '}
                        <b>{t('shipmentmarketplace:Unconfirmed')}</b>
                        {' '}
                        {' '}
                        {t('shipmentmarketplace:to')}
                        {' '}
                        {' '}
                        <b>
                            {t('shipmentmarketplace:Confirmed')}
                            .
                        </b>
                        <br />
                        {t('shipmentmarketplace:For_this_action_please_use_the_CSV_file_that_exported_using_the')}
                        {' '}
                        {' '}
                        <b>{t('shipmentmarketplace:Exports')}</b>
                        {t('shipmentmarketplace:button_as_a_template')}
                        <br />
                        {t('shipmentmarketplace:Here_are_the_complete_steps_for_bulk_confirmation')}
                    </p>
                    <ol>
                        <li>
                            <p style={{ marginTop: 0 }}>
                                {t('shipmentmarketplace:Please_prepare_a_shipment_list_to_upload_in_CSV_format_To_download_the_template_go_to_the')}
                                {' '}
                                {' '}
                                <b>{t('shipmentmarketplace:Process_for_Shipping')}</b>
                                {' '}
                                {' '}
                                {t('shipmentmarketplace:tab_and_filter_shipment_with')}
                                {' '}
                                {' '}
                                <b>{t('shipmentmarketplace:Unconfirmed')}</b>
                                {' '}
                                {' '}
                                {t('shipmentmarketplace:allocation_status')}
                            </p>
                        </li>
                        <li>
                            <p>
                                {t('shipmentmarketplace:Select_shipment_data_you_want_to_confirm_click_the')}
                                {' '}
                                {' '}
                                <b>{t('shipmentmarketplace:Exports')}</b>
                                {' '}
                                {' '}
                                {t('shipmentmarketplace:button_and_select')}
                                {' '}
                                {' '}
                                <b>
                                    {t('shipmentmarketplace:Export_Without_Items')}
                                    .
                                </b>
                                {' '}
                                {' '}
                                {t('shipmentmarketplace:Shipment_data_will_be_downloaded_into_a_CSV_file')}
                            </p>
                            <img className={classes.imgImage} src="/assets/img/tutorial_content/marketplace_bulk_confirm01.jpg" alt="excel-example" />
                        </li>
                        <li>
                            <p>
                                {t('shipmentmarketplace:Select_file_you_have_exported_earlier_csv_format_by_clicking')}
                                {' '}
                                {' '}
                                <b>{t('shipmentmarketplace:Choose_File')}</b>
                                {' '}
                                {' '}
                                {t('shipmentmarketplace:button')}
                                .
                            </p>
                            <img className={classes.imgImage} src="/assets/img/tutorial_content/marketplace_bulk_confirm02.jpg" alt="excel-example" />
                        </li>
                        <li>
                            <p>
                                {t('shipmentmarketplace:Click')}
                                {' '}
                                {' '}
                                <b>{t('shipmentmarketplace:Submit')}</b>
                                {' '}
                                {' '}
                                {t('shipmentmarketplace:button_to_run_bulk_confirmed_and_please_wait_till_the_process_is_finished_Allocation_status_for_the_updated_shipment_data_will_be_updated_automatically_to')}
                                {' '}
                                {' '}
                                <b>
                                    {t('shipmentmarketplace:Confirmed')}
                                    .
                                </b>
                            </p>
                        </li>
                    </ol>
                </div>
            </Paper>
        </>
    );
};

export default TutorialBulkConfirmed;
