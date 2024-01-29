import React, { useEffect } from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useStyles from '@modules/aclgroup/pages/edit/components/style';
import CheckBoxExistGroup from '@modules/aclgroup/pages/edit/components/checkBoxExistGroup';
import CheckboxTree from '@common_checkboxtree';
import IOSSwitch from '@common_iosswitch';
import gqlService from '@modules/aclgroup/services/graphql';

const AclGroupEditContent = (props) => {
    const { formik, aclTreeData, t } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getCustomerGroupOptions, { data, loading }] = gqlService.getCustomerGroupOptions();
    const [getAclByGroupIdLazy, getAclByGroupIdLazyRes] = gqlService.getAclByGroupIdLazy();

    useEffect(() => {
        if (Array.isArray(getAclByGroupIdLazyRes?.data?.getAclByGroupId?.acl_code)) {
            const res = getAclByGroupIdLazyRes?.data?.getAclByGroupId?.acl_code;
            formik.setFieldValue('input.acl_code', [...res]);
        }
    }, [getAclByGroupIdLazyRes?.data]);

    return (
        <>
            <Button className={classes.btnBack} onClick={() => router.push('/userdata/group')} variant="contained" style={{ marginRight: 16 }}>
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
            <h2 className={classes.titleTop}>{t('usergroup:Edit_Acl_Group')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h2 className={classes.title}>{t('usergroup:General_Information')}</h2>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={[classes.label, classes.labelRequired].join(' ')}>{t('usergroup:Group_Name')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="input.code"
                            value={formik.values.input.code}
                            onChange={formik.handleChange}
                            error={!!(formik.touched?.input?.code && formik.errors?.input?.code)}
                            helperText={(formik.touched?.input?.code && formik.errors?.input?.code) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <h2 className={classes.title}>{t('usergroup:Access_Control_List')}</h2>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('usergroup:Grant_All_Access_Control')}</span>
                        </div>
                        <IOSSwitch name="input.is_all_acl" value={formik?.values?.input?.is_all_acl} onChange={formik.handleChange} />
                    </div>
                    {!formik.values?.input?.is_all_acl && (
                        <>
                            <div className={classes.formField} style={{ display: 'flex' }}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label} />
                                </div>
                                <CheckBoxExistGroup
                                    getOptions={getCustomerGroupOptions}
                                    options={(data && data.getCustomerGroupOptions) || []}
                                    loading={loading}
                                    classes={classes}
                                    getCheckedGroup={getAclByGroupIdLazy}
                                    t={t}
                                />
                            </div>

                            <div className={classes.formField} style={{ display: 'flex' }}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label} />
                                </div>
                                <CheckboxTree
                                    disabled={formik.values?.input?.is_all_acl}
                                    nodes={aclTreeData ?? []}
                                    checked={formik.values?.input?.is_all_acl ? [] : formik?.values?.input?.acl_code}
                                    onCheck={(c) => {
                                        if (!formik.values?.input?.is_all_acl) {
                                            formik.setFieldValue('input.acl_code', c);
                                        }
                                    }}
                                />
                            </div>
                        </>
                    )}
                </div>
                <div className={classes.formFieldButton}>
                    <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained">
                        {t('usergroup:Submit')}
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default AclGroupEditContent;
