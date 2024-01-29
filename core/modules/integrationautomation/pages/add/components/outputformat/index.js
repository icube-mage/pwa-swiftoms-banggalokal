/* eslint-disable react/no-danger */
/* eslint-disable max-len */
import React from 'react';
import clsx from 'clsx';
import Editor from '@monaco-editor/react';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import HelpIcon from '@material-ui/icons/Help';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Button from '@common_button';
import TextField from '@common_textfield';
import Switch from '@common_switch';

import useStyles from '@modules/integrationautomation/pages/add/components/outputformat/style';

const OutputFormatContent = (props) => {
    const {
        t, formikField, formikOutputTest, testExportTemplateRes, setTab, formik,
    } = props;
    const classes = useStyles();

    const copyToClipboard = () => {
        const element = document.querySelector('#copy-clipboard');
        const storage = document.createElement('textarea');
        storage.value = element.innerHTML;
        element.appendChild(storage);

        storage.select();
        storage.setSelectionRange(0, 99999);
        document.execCommand('copy');
        element.removeChild(storage);

        window.toastMessage({
            open: true,
            text: t('integrationautomation:Copied_to_clipboard'),
            variant: 'success',
        });
    };

    return (
        <>
            <div className={clsx(classes.content, 'border')}>
                <h5 className={classes.sectionTitle}>{t('integrationautomation:Data_Settings')}</h5>
                <div className={classes.formField}>
                    <div className={classes.label}>{t('integrationautomation:Execute_each_Entity_separately')}</div>
                    <Switch
                        name="execute_per_entity"
                        value={formik.values.execute_per_entity}
                        onChange={formik.handleChange}
                        trueLabel={t('integrationautomation:Yes')}
                        falseLabel={t('integrationautomation:No')}
                    />
                    <Tooltip
                        title={t('integrationautomation:If_set_to_yes_the_action_will_be_executed_repeatedly_for_each_entity_If_set_to_no_the_action_will_only_be_executed_once')}
                        placement="top"
                        arrow
                        className={classes.tooltip}
                    >
                        <IconButton aria-label="help">
                            <HelpIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>

            <div className={classes.content}>
                <div className={classes.actionContainer}>
                    <div className="btn">
                        <Button
                            className={classes.button}
                            buttonType="outlined"
                            onClick={() => {
                                formikOutputTest.handleSubmit();
                                if (!formikOutputTest.values.event_id) {
                                    setTab('info');
                                }
                            }}
                        >
                            {t('integrationautomation:Test_XSL_Template')}
                        </Button>
                        <Button
                            className={classes.button}
                            buttonType="outlined"
                            onClick={() => {
                                formikField.handleSubmit();
                                if (!formikField.values.event_id) {
                                    setTab('info');
                                }
                            }}
                        >
                            {t('integrationautomation:Show_Fields_Available')}
                        </Button>
                    </div>
                    <div className="field">
                        <div className="text">
                            <b>{formik.values.events?.entity_id_field_name}</b>
                            {' '}
                            {t('integrationautomation:to_test_withshow_fields_for')}
                        </div>
                        <div className="textfield">
                            <TextField
                                className={classes.fieldRoot}
                                variant="outlined"
                                name="export_id"
                                value={formikField.values.export_id}
                                onChange={(e) => {
                                    formikField.handleChange(e);
                                    formikOutputTest.setFieldValue('export_id', e.target.value);
                                }}
                                InputProps={{
                                    className: classes.fieldInput,
                                }}
                                error={!!(formikField.touched.export_id && formikField.errors.export_id)
                                    || !!(formikOutputTest.touched.export_id && formikOutputTest.errors.export_id)}
                                helperText={(formikField.touched.export_id && formikField.errors.export_id)
                                    || (formikOutputTest.touched.export_id && formikOutputTest.errors.export_id) || ''}
                                placeholder={formik.values.events?.entity_id_field_name}
                            />
                            <Tooltip
                                title={t('integrationautomation:Use_comma_to_separate_multiple_ids')}
                                placement="top"
                                arrow
                                className={classes.tooltip}
                            >
                                <IconButton aria-label="help">
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
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
                            formik.setFieldValue('template', e);
                        }}
                    />
                </div>
                {!!testExportTemplateRes?.data?.testExportTemplate
                    && (
                        <>
                            <div className={classes.divider} />
                            <div className={classes.label}>{t('integrationautomation:Test_Results_in_json_format')}</div>
                            {testExportTemplateRes?.data?.testExportTemplate?.map((testRes, testIdx) => (
                                <Accordion elevation={0} className={classes.accordion} key={testIdx}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon className="expand-icon" />}>
                                        <div className={classes.label}>
                                            {`${t('integrationautomation:Result')} ${testIdx + 1}`}
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Tooltip title={t(':Copy_to_Clipboard')}>
                                            <IconButton
                                                aria-label={t(':Copy_to_Clipboard')}
                                                className={classes.copyIcon}
                                                onClick={copyToClipboard}
                                            >
                                                <FileCopyOutlinedIcon className="copy-icon" />
                                            </IconButton>
                                        </Tooltip>
                                        <pre id="copy-clipboard">
                                            {JSON.stringify(JSON.parse(testRes), undefined, 4)}
                                        </pre>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </>
                    )}
            </div>
        </>
    );
};

export default OutputFormatContent;
