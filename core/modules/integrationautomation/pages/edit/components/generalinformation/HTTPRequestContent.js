import React from 'react';
import clsx from 'clsx';

import IconButton from '@material-ui/core/IconButton';

import AddIcon from '@material-ui/icons/Add';

import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';

import { httpMethodOptions } from '@modules/integrationautomation/helpers';
import useStyles from '@modules/integrationautomation/pages/edit/components/generalinformation/style';

const ThirdPartyIntegrationContent = (props) => {
    const {
        t, formik,
    } = props;
    const classes = useStyles();

    return (
        <div className={classes.actionProp}>
            <div className={classes.formFieldAction}>
                <h5 className={clsx(classes.titleCondition, classes.labelRequired)}>{t('integrationautomation:URL')}</h5>
                <TextField
                    className={classes.fieldRoot}
                    variant="outlined"
                    name="url"
                    value={formik.values.url}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.url && formik.errors.url)}
                    helperText={(formik.touched.url && formik.errors.url) || ''}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            </div>
            <div className={classes.formFieldAction}>
                <h5 className={clsx(classes.titleCondition, classes.labelRequired)}>{t('integrationautomation:HTTP_Method')}</h5>
                <Autocomplete
                    value={httpMethodOptions.find(({ id }) => id === formik.values.http_method)}
                    className={classes.autocompleteRoot}
                    onChange={(e) => formik.setFieldValue('http_method', e?.id)}
                    options={httpMethodOptions}
                    error={!!(formik.touched.http_method && formik.errors.http_method)}
                    helperText={(formik.touched.http_method && formik.errors.http_method) || ''}
                />
            </div>
            <div className={classes.formFieldAction}>
                <h5 className={classes.titleCondition}>{t('integrationautomation:Header_Optional')}</h5>
                {formik.values.headers?.map(({ key, value }, headIdx) => (
                    <div className={classes.divFlexAction} key={headIdx}>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name={`headers[${headIdx}].key`}
                            value={key}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.headers?.[headIdx]?.key && formik.errors.headers?.[headIdx]?.key)}
                            helperText={(formik.touched.headers?.[headIdx]?.key && formik.errors.headers?.[headIdx]?.key) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name={`headers[${headIdx}].value`}
                            value={value}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.headers?.[headIdx]?.value && formik.errors.headers?.[headIdx]?.value)}
                            helperText={(formik.touched.headers?.[headIdx]?.value && formik.errors.headers?.[headIdx]?.value) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                        <IconButton
                            className={classes.deleteCondition}
                            onClick={() => {
                                const temp = formik.values.headers;
                                temp.splice(headIdx, 1);
                                formik.setFieldValue('headers', temp);
                            }}
                        >
                            <img
                                src="/assets/img/trash.svg"
                                alt="trash"
                                className={classes.trash}
                            />
                        </IconButton>
                    </div>
                ))}
                <IconButton
                    className={classes.helperCreate}
                    onClick={() => {
                        const temp = formik.values.headers;
                        temp.push({ type: '', value: '' });
                        formik.setFieldValue('headers', temp);
                    }}
                >
                    <AddIcon className="addIcon" />
                    {t('integrationautomation:Add_Header')}
                </IconButton>
            </div>
        </div>
    );
};

export default ThirdPartyIntegrationContent;
