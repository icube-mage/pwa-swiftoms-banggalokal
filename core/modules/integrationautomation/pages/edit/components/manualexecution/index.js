import React from 'react';
import clsx from 'clsx';

import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';

import TextField from '@common_textfield';
import Button from '@common_button';

import useStyles from '@modules/integrationautomation/pages/edit/components/manualexecution/style';

const ManualExecutionContent = (props) => {
    const {
        t, formik, formikExecution,
    } = props;
    const classes = useStyles();

    return (
        <>
            <div className={classes.content}>
                <div className={classes.topField}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>
                                {t('integrationautomation:Perform_action_for')}
                                {' '}
                                <bold>{formik.values.events?.entity_id_field_name}</bold>
                            </span>
                        </div>
                        <div className="textfield">
                            <TextField
                                className={classes.fieldRoot}
                                variant="outlined"
                                name="entity_id"
                                onChange={formikExecution.handleChange}
                                value={formikExecution.values.entity_id}
                                error={!!(formikExecution.touched.entity_id && formikExecution.errors.entity_id)}
                                helperText={(formikExecution.touched.entity_id && formikExecution.errors.entity_id) || ''}
                                InputProps={{
                                    className: classes.fieldInput,
                                }}
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
                <Button className={classes.btn} onClick={formikExecution.handleSubmit} variant="contained">
                    {t('integrationautomation:Execute')}
                </Button>
            </div>
        </>
    );
};

export default ManualExecutionContent;
