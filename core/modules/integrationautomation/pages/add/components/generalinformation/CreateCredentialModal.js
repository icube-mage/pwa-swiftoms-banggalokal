import clsx from 'clsx';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import DeleteIcon from '@material-ui/icons/Delete';

import TextField from '@common_textfield';
import Button from '@common_button';

import useStyles from '@modules/integrationautomation/pages/add/components/generalinformation/style';

const CreteCredentialModal = (props) => {
    const {
        open = '',
        onCancel,
        onConfirm,
        t,
        formikCredential,
        handleDeleteCredential,
    } = props;
    const classes = useStyles();

    return (
        <Dialog
            open={!!open}
            onClose={onCancel}
            className={classes.dialogContainer}
            fullWidth
            maxWidth="xs"
        >
            <DialogTitle className={classes.title}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={2}>
                        <div className={clsx(classes.iconDiv, 'file')}>
                            <DescriptionOutlinedIcon className={classes.icon} />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <div className={classes.sectionName}>
                            <h5 className={classes.sectionTitle}>{t('integrationautomation:Create_Credential')}</h5>
                            <h6 className={classes.sectionDesc}>
                                {t('integrationautomation:Complete_this_form_to_create_your_RabbitMQ_credentials')}
                            </h6>
                        </div>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <div className={classes.formFieldAction}>
                    <h5 className={clsx(classes.labelModalForm, classes.labelRequired)}>{t('integrationautomation:Credential_Name')}</h5>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="credential_name"
                        value={formikCredential.values.credential_name}
                        onChange={formikCredential.handleChange}
                        error={!!(formikCredential.touched.credential_name && formikCredential.errors.credential_name)}
                        helperText={(formikCredential.touched.credential_name && formikCredential.errors.credential_name) || ''}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </div>
                <div className={classes.formFieldAction}>
                    <h5 className={classes.labelModalForm}>{t('integrationautomation:Host_Name')}</h5>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="hostname"
                        value={formikCredential.values.hostname}
                        onChange={formikCredential.handleChange}
                        error={!!(formikCredential.touched.hostname && formikCredential.errors.hostname)}
                        helperText={(formikCredential.touched.hostname && formikCredential.errors.hostname) || ''}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </div>
                <div className={classes.formFieldAction}>
                    <h5 className={classes.labelModalForm}>{t('integrationautomation:Port')}</h5>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="port"
                        value={formikCredential.values.port}
                        onChange={formikCredential.handleChange}
                        error={!!(formikCredential.touched.port && formikCredential.errors.port)}
                        helperText={(formikCredential.touched.port && formikCredential.errors.port) || ''}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </div>
                <div className={classes.formFieldAction}>
                    <h5 className={classes.labelModalForm}>{t('integrationautomation:User')}</h5>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="user"
                        value={formikCredential.values.user}
                        onChange={formikCredential.handleChange}
                        error={!!(formikCredential.touched.user && formikCredential.errors.user)}
                        helperText={(formikCredential.touched.user && formikCredential.errors.user) || ''}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </div>
                <div className={classes.formFieldAction}>
                    <h5 className={classes.labelModalForm}>{t('integrationautomation:Password')}</h5>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="password"
                        value={formikCredential.values.password}
                        onChange={formikCredential.handleChange}
                        error={!!(formikCredential.touched.password && formikCredential.errors.password)}
                        helperText={(formikCredential.touched.password && formikCredential.errors.password) || ''}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                        type="password"
                    />
                </div>
                <div className={classes.formFieldAction}>
                    <h5 className={classes.labelModalForm}>{t('integrationautomation:VHost')}</h5>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="Vhost"
                        value={formikCredential.values.Vhost}
                        onChange={formikCredential.handleChange}
                        error={!!(formikCredential.touched.Vhost && formikCredential.errors.Vhost)}
                        helperText={(formikCredential.touched.Vhost && formikCredential.errors.Vhost) || ''}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </div>
                <div className={classes.buttonFormContainer}>
                    {!!formikCredential.values.id
                    && (
                        <IconButton
                            onClick={handleDeleteCredential}
                            className={classes.iconBtn}
                        >
                            <DeleteIcon />
                        </IconButton>
                    )}
                    <Button className={classes.btn} onClick={onCancel} buttonType="outlined" color="primary">
                        {t('common:Cancel')}
                    </Button>
                    <Button className={classes.btn} onClick={onConfirm} color="primary">
                        {t('common:Save')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreteCredentialModal;
