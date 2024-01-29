/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import TextField from '@common_textfield';
import PhoneInput from '@common_phoneinput';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import Autocomplete from '@common_autocomplete';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import useStyles from '@modules/adminstore/pages/create/components/style';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckboxTree from '@modules/commons/CheckBoxTree';
import IOSSwitch from '@common_iosswitch';
import gqlService from '@modules/adminstore/services/graphql';
import CheckBoxExistGroup from '@modules/adminstore/pages/edit/components/checkBoxExistGroup';

const AdminStoreCreateContent = (props) => {
    const {
        formik,
        dataCompany,
        dataLocation,
        dataGroup,
        aclTreeData,
        aclManageUserAclData,
        t,
        setDialCode,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const firstRenderPhone = React.useRef(true);

    const [expandAccordion, setExpandAccordion] = useState(null);
    const handleChangeExpand = (e) => (event, isExpanded) => {
        setExpandAccordion(isExpanded ? e : false);
    };

    const [getAclByGroupIdLazy, getAclByGroupIdLazyRes] = gqlService.getAclByGroupIdLazy();

    useEffect(() => {
        if (Array.isArray(getAclByGroupIdLazyRes?.data?.getAclByGroupId?.acl_code)) {
            const res = getAclByGroupIdLazyRes?.data?.getAclByGroupId?.acl_code;
            formik.setFieldValue('acl_code', [...res]);
        }
    }, [getAclByGroupIdLazyRes?.data]);

    return (
        <>
            <Button className={classes.btnBack} onClick={() => router.push('/userdata/adminstore')} variant="contained" style={{ marginRight: 16 }}>
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
            <h2 className={classes.titleTop}>{t('alluser:Create_User')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('alluser:Firstname')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="firstname"
                            value={formik.values.firstname}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.firstname && formik.errors.firstname)}
                            helperText={(formik.touched.firstname && formik.errors.firstname) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                            inputProps={{
                                autocomplete: 'new-password',
                                form: {
                                    autocomplete: 'off',
                                },
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('alluser:Lastname')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="lastname"
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.lastname && formik.errors.lastname)}
                            helperText={(formik.touched.lastname && formik.errors.lastname) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                            inputProps={{
                                autocomplete: 'new-password',
                                form: {
                                    autocomplete: 'off',
                                },
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('alluser:Email')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.email && formik.errors.email)}
                            helperText={(formik.touched.email && formik.errors.email) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                            inputProps={{
                                autocomplete: 'new-password',
                                form: {
                                    autocomplete: 'off',
                                },
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('alluser:Phone_Number')}</span>
                        </div>
                        <PhoneInput
                            name="phone_number"
                            value={formik.values.phone_number}
                            onChange={(e, c) => {
                                formik.setFieldValue('phone_number', e);
                                setDialCode(c.dialCode);
                            }}
                            error={!!(formik.touched.phone_number && formik.errors.phone_number)}
                            helperText={(formik.touched.phone_number && formik.errors.phone_number) || ''}
                            containerClass={classes.fieldPhoneContainer}
                            rootClasses={classes.fieldPhoneRoot}
                            onFocus={(e, c) => {
                                setDialCode(c.dialCode);
                                if (firstRenderPhone.current) {
                                    firstRenderPhone.current = false;
                                    e.target.blur();
                                }
                            }}
                            inputProps={{ autoFocus: true }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('alluser:Password')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.password && formik.errors.password)}
                            helperText={(formik.touched.password && formik.errors.password) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                            inputProps={{
                                autocomplete: 'new-password',
                                form: {
                                    autocomplete: 'off',
                                },
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('alluser:Location')}</span>
                        </div>
                        <Autocomplete
                            multiple
                            className={classes.autocompleteRoot}
                            name="customer_loc_code"
                            value={
                                typeof formik.values.customer_loc_code === 'object'
                                    ? formik.values.customer_loc_code
                                    : [formik.values.customer_loc_code]
                            }
                            onChange={(e) => formik.setFieldValue('customer_loc_code', e)}
                            primaryKey="value"
                            labelKey="label"
                            options={dataLocation}
                            fullWidth
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('alluser:Group')}</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            name="group"
                            value={formik.values.group}
                            onChange={(e) => formik.setFieldValue('group', e)}
                            primaryKey="value"
                            labelKey="label"
                            options={dataGroup}
                            error={!!(formik.touched.group && formik.errors.group)}
                            helperText={(formik.touched.group && formik.errors.group) || ''}
                            fullWidth
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('alluser:Company_vendor_only')}</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            name="company"
                            value={formik.values.company}
                            onChange={(e) => formik.setFieldValue('company', e)}
                            primaryKey="value"
                            labelKey="label"
                            options={dataCompany}
                            fullWidth
                            helperText={t('alluser:user_can_only_view_Products_Sources_Locations_and_Shipments_belonging_to_the_selected_company')}
                        />
                    </div>
                </div>
            </Paper>
            {aclManageUserAclData && (
                <div className={classes.contentAccordion}>
                    <Accordion elevation={0} expanded={expandAccordion === 'acl'} onChange={handleChangeExpand('acl')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                            <h4 className={classes.title}>{t('alluser:Access_Control_List_Setting')}</h4>
                        </AccordionSummary>
                        <AccordionDetails classes={{ root: classes.accordionDetailRoot }}>
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('alluser:Use_Group_ACL')}</span>
                                </div>
                                <IOSSwitch name="use_group_acl" value={formik.values?.use_group_acl} onChange={formik.handleChange} />
                            </div>
                            {!formik.values?.use_group_acl && (
                                <>
                                    <div className={classes.formField} style={{ display: 'flex' }}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label} />
                                        </div>
                                        <CheckBoxExistGroup options={dataGroup || []} classes={classes} getCheckedGroup={getAclByGroupIdLazy} t={t} />
                                    </div>
                                    <div className={classes.formField} style={{ display: 'flex' }}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label} />
                                        </div>
                                        <CheckboxTree
                                            nodes={aclTreeData}
                                            checked={formik.values?.acl_code}
                                            onCheck={(c) => {
                                                if (!formik.values?.use_group_acl) {
                                                    formik.setFieldValue('acl_code', c);
                                                }
                                            }}
                                        />
                                    </div>
                                </>
                            )}
                        </AccordionDetails>
                    </Accordion>
                </div>
            )}
            <div className={classes.contentAccordion}>
                <Accordion elevation={0} expanded={expandAccordion === 'notification'} onChange={handleChangeExpand('notification')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                        <h4 className={classes.title}>{t('alluser:Notifications')}</h4>
                    </AccordionSummary>
                    <AccordionDetails classes={{ root: classes.accordionDetailRoot }}>
                        <div className={classes.formField}>
                            <div className={classes.divLabel}>
                                <span className={classes.label}>{t('alluser:Error_Order_Notification')}</span>
                            </div>
                            <IOSSwitch name="notif_error_order_queue" value={formik.values?.notif_error_order_queue} onChange={formik.handleChange} />
                        </div>
                        <div className={classes.formField}>
                            <div className={classes.divLabel}>
                                <span className={classes.label}>{t('alluser:Reallocation_Order_Notification')}</span>
                            </div>
                            <IOSSwitch name="notif_reallocation_order" value={formik.values?.notif_reallocation_order} onChange={formik.handleChange} />
                        </div>
                        <div className={classes.formField}>
                            <div className={classes.divLabel}>
                                <span className={classes.label}>{t('alluser:New_Order_Notification')}</span>
                            </div>
                            <IOSSwitch name="notif_new_order" value={formik.values?.notif_new_order} onChange={formik.handleChange} />
                        </div>
                        <div className={classes.formField}>
                            <div className={classes.divLabel}>
                                <span className={classes.label}>{t('alluser:RMA_Notification')}</span>
                            </div>
                            <IOSSwitch name="notif_rma" value={formik.values?.notif_rma} onChange={formik.handleChange} />
                        </div>
                        <div className={classes.formField}>
                            <div className={classes.divLabel}>
                                <span className={classes.label}>{t('alluser:New_User_Creation')}</span>
                            </div>
                            <IOSSwitch name="notif_new_user" value={formik.values?.notif_new_user} onChange={formik.handleChange} />
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>

            <div className={classes.formFieldButton}>
                <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained">
                    {t('alluser:Submit')}
                </Button>
            </div>
        </>
    );
};

export default AdminStoreCreateContent;
