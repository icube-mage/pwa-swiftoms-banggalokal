import React from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import TextField from '@common_textfield';
import Button from '@common_button';
import Autocomplete from '@common_autocomplete';

import { optionsInItem, optionsEmailCustomer, optionsEmailAdmin } from '@modules/rmastatuses/helpers';
import useStyles from '@modules/rmastatuses/pages/edit/components/style';

const RmaStatusesEditContent = (props) => {
    const { formik, t, dataGroup } = props;
    const classes = useStyles();
    const router = useRouter();

    const handleAddGroup = () => {
        const groupTemp = [...formik.values.admin_groups];
        groupTemp.push({ group_id: '', by_location: false });
        formik.setFieldValue('admin_groups', groupTemp);
    };

    const handleDeleteGroup = (i) => {
        const groupTemp = [...formik.values.admin_groups];
        groupTemp.splice(i, 1);
        formik.setFieldValue('admin_groups', groupTemp);
    };

    return (
        <>
            <Button className={classes.btnBack} onClick={() => router.push('/return/rmastatuses')} variant="contained" style={{ marginRight: 16 }}>
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
            <h2 className={classes.titleTop}>{t('rmastatuses:Manage_Status')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('rmastatuses:Status_Code')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            disabled
                            variant="outlined"
                            name="code"
                            value={formik.values.code}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.code && formik.errors.code)}
                            helperText={(formik.touched.code && formik.errors.code) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('rmastatuses:Status_Label')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="label"
                            value={formik.values.label}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.label && formik.errors.label)}
                            helperText={(formik.touched.label && formik.errors.label) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('rmastatuses:Position')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="position"
                            value={formik.values.position}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.position && formik.errors.position)}
                            helperText={(formik.touched.position && formik.errors.position) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('rmastatuses:Include_in_Item_Status')}</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            value={formik.values.inItem}
                            onChange={(e) => formik.setFieldValue('inItem', e)}
                            options={optionsInItem}
                            error={!!(formik.touched.inItem && formik.errors.inItem)}
                            helperText={(formik.touched.inItem && formik.errors.inItem) || ''}
                            disableClearable
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('rmastatuses:Auto_Message_Text')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="messageText"
                            value={formik.values.messageText}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.messageText && formik.errors.messageText)}
                            helperText={(formik.touched.messageText && formik.errors.messageText) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('rmastatuses:Send_Email_to_Customer')}</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            value={formik.values.emailCustomer}
                            onChange={(e) => formik.setFieldValue('emailCustomer', e)}
                            options={optionsEmailCustomer}
                            error={!!(formik.touched.emailCustomer && formik.errors.emailCustomer)}
                            helperText={(formik.touched.emailCustomer && formik.errors.emailCustomer) || ''}
                            disableClearable
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('rmastatuses:Custom_Email_Text_to_Customer')}</span>
                        </div>
                        <div className={classes.fieldRoot}>
                            <TextareaAutosize
                                name="customerText"
                                minRows={4}
                                style={{
                                    borderRadius: 20,
                                    width: '100%',
                                    padding: '5px',
                                    borderColor: `${formik.touched.customerText && formik.errors.customerText ? 'red' : 'black'}`,
                                }}
                                value={formik.values.customerText}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.customerText && formik.errors.customerText && (
                                <p style={{ margin: 0, color: 'red', fontSize: 12 }}>{formik.errors.customerText}</p>
                            )}
                        </div>
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('rmastatuses:Send_Email_to_Admin')}</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            value={formik.values.emailAdmin}
                            onChange={(e) => {
                                if (e.id) {
                                    formik.setFieldValue('is_email_admin', true);
                                } else {
                                    formik.setFieldValue('is_email_admin', false);
                                }
                                formik.setFieldValue('emailAdmin', e);
                            }}
                            options={optionsEmailAdmin}
                            error={!!(formik.touched.emailAdmin && formik.errors.emailAdmin)}
                            helperText={(formik.touched.emailAdmin && formik.errors.emailAdmin) || ''}
                            disableClearable
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('rmastatuses:Custom_Email_Text_to_Admin')}</span>
                        </div>
                        <div className={classes.fieldRoot}>
                            <TextareaAutosize
                                minRows={4}
                                style={{
                                    borderRadius: 20,
                                    width: '100%',
                                    padding: '5px',
                                    borderColor: `${formik.touched.adminText && formik.errors.adminText ? 'red' : 'black'}`,
                                }}
                                name="adminText"
                                value={formik.values.adminText}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.adminText && formik.errors.adminText && (
                                <p style={{ margin: 0, color: 'red', fontSize: 12 }}>{formik.errors.adminText}</p>
                            )}
                        </div>
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('rmastatuses:Admin_Group')}</span>
                        </div>
                        <div className={classes.fieldRoot}>
                            <table className={classes.table}>
                                <tr className={classes.tr}>
                                    <th className={classes.th}>
                                        {t('rmastatuses:Admin_Group')}
                                    </th>
                                    <th className={classes.th}>
                                        {t('rmastatuses:By_Location')}
                                    </th>
                                    <th className={classes.th}>
                                        {t('rmastatuses:Action')}
                                    </th>
                                </tr>
                                {formik.values.admin_groups?.map((group, i) => (
                                    <tr className={classes.tr} key={i}>
                                        <td className={classes.td}>
                                            <Autocomplete
                                                className={classes.autoCompleteTable}
                                                value={dataGroup.find((dg) => dg.customer_group_id === group.group_id)}
                                                onChange={(e) => formik.setFieldValue(`admin_groups[${i}].group_id`, e.customer_group_id)}
                                                options={dataGroup}
                                                primaryKey="customer_group_id"
                                                labelKey="customer_group_code"
                                                disableClearable
                                                error={!!(formik.touched?.admin_groups?.[i]?.group_id && formik.errors?.admin_groups?.[i]?.group_id)}
                                                helperText={(formik.touched?.admin_groups?.[i]?.group_id
                                                    && formik.errors?.admin_groups?.[i]?.group_id) || ''}
                                            />
                                        </td>
                                        <td className={classes.td}>
                                            <Checkbox
                                                name={`admin_groups[${i}].by_location`}
                                                onChange={formik.handleChange}
                                                checked={group.by_location}
                                                className={classes.checkbox}
                                            />
                                        </td>
                                        <td className={classes.td}>
                                            <IconButton
                                                edge="end"
                                                onClick={() => handleDeleteGroup(i)}
                                                className={classes.trash}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </td>
                                    </tr>
                                ))}
                            </table>
                            <Button
                                className={classes.btn}
                                disabled={formik.values.admin_groups?.some(({ group_id }) => Number(group_id) < 0)}
                                onClick={handleAddGroup}
                                variant="contained"
                            >
                                {t('rmastatuses:Add_Group')}
                            </Button>
                            {!formik.values.admin_groups?.length
                            && typeof formik.errors.admin_groups === 'string'
                            && !!(formik.touched?.admin_groups && formik.errors?.admin_groups)
                                && (
                                    <div className={classes.helperText}>
                                        {(formik.touched?.admin_groups
                                            && formik.errors?.admin_groups) || ''}
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained">
                        {t('rmastatuses:Submit')}
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default RmaStatusesEditContent;
