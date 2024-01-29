/* eslint-disable react/no-danger */
/* eslint-disable max-len */
import React from 'react';
import clsx from 'clsx';
import Editor from '@monaco-editor/react';

import Button from '@common_button';
import TextField from '@common_textfield';

import useStyles from '@modules/integrationthirdpartyapps/pages/output/components/OutputFormat/style';

const LocationCreateContent = (props) => {
    const {
        t, formikField, formikOutputTest, testWebhookOutputTemplateRes, formikOutputFormat,
    } = props;
    const classes = useStyles();

    const formattedText = (text) => text.split('\n').map((str) => <p style={{ marginTop: 0 }}>{str}</p>);

    return (
        <>
            <div className={classes.actionContainer}>
                <div className="btn">
                    <Button
                        className={classes.button}
                        buttonType="outlined"
                        onClick={formikOutputTest.handleSubmit}
                    >
                        {t('integrationthirdpartyapps:Test_XSL_Template')}
                    </Button>
                    <Button
                        className={classes.button}
                        buttonType="outlined"
                        onClick={formikField.handleSubmit}
                    >
                        {t('integrationthirdpartyapps:Show_Fields_Available')}
                    </Button>
                </div>
                <div className="field">
                    <div>{t('integrationthirdpartyapps:Shipment_Number_to_test_withshow_fields_for')}</div>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="shipment_number"
                        value={formikField.values.shipment_number}
                        onChange={(e) => {
                            formikField.handleChange(e);
                            formikOutputTest.setFieldValue('increment_id', e.target.value);
                        }}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                        error={!!(formikField.touched.shipment_number && formikField.errors.shipment_number)
                            || !!(formikOutputTest.touched.increment_id && formikOutputTest.errors.increment_id)}
                        helperText={(formikField.touched.shipment_number && formikField.errors.shipment_number)
                            || (formikOutputTest.touched.increment_id && formikOutputTest.errors.increment_id) || ''}
                    />
                </div>
            </div>
            <div className={classes.borderContainer}>
                <Editor
                    name="xsl_template"
                    height="50vh"
                    defaultLanguage="xml"
                    value={formikOutputTest.values.xsl_template}
                    onChange={(e) => {
                        formikOutputTest.setFieldValue('xsl_template', e);
                        formikOutputFormat.setFieldValue('xsl_template', e);
                    }}
                />
            </div>
            {!!testWebhookOutputTemplateRes?.data?.testWebhookOutputTemplate
                && (
                    <>
                        <div className={classes.divider} />
                        <div>{t('integrationthirdpartyapps:Test__Validation_Results')}</div>
                        <div
                            className={clsx(classes.borderContainer, 'small')}
                        >
                            {formattedText(testWebhookOutputTemplateRes?.data?.testWebhookOutputTemplate)}
                        </div>
                    </>
                )}
        </>
    );
};

export default LocationCreateContent;
