import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import ImageViewer from 'react-simple-image-viewer';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import TextField from '@common_textfield';
import PhoneInput from '@common_phoneinput';
import Button from '@common_button';

import { breakPointsUp } from '@helper_theme';
import useStyles from '@modules/requestvendor/pages/edit/components/style';

const RequestVendorEditContent = (props) => {
    const {
        vendor,
        handleApprove,
        handleNotApprove,
        t,
    } = props;
    const classes = useStyles();
    const isDesktop = breakPointsUp('sm');
    const router = useRouter();
    const disabledButton = (vendor.status === 'approved' || vendor.status === 'not_approved');

    const [image, setImage] = React.useState('');
    const [isViewerOpen, setIsViewerOpen] = React.useState(false);

    const openImageViewer = React.useCallback((src) => {
        setImage(src);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setImage('');
        setIsViewerOpen(false);
    };

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/vendorportal/requestvendor')}
                variant="contained"
                style={{ marginRight: 16 }}
            >
                <ChevronLeftIcon style={{
                    fontSize: 30,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                />
            </Button>
            <h2 className={classes.titleTop}>
                {`Edit Vendor ${vendor.companyName}`}
            </h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <Grid container spacing={isDesktop ? 3 : 0}>
                        <Grid item xs={12} sm={6}>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('requestvendor:Name')}</span>
                                </div>
                                <TextField
                                    className={classes.fieldRoot}
                                    variant="outlined"
                                    name="firstname"
                                    value={vendor.firstname}
                                    disabled
                                    InputProps={{
                                        className: classes.fieldInput,
                                    }}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('requestvendor:Store_Name')}</span>
                                </div>
                                <TextField
                                    className={classes.fieldRoot}
                                    variant="outlined"
                                    name="companyName"
                                    value={vendor.companyName}
                                    disabled
                                    InputProps={{
                                        className: classes.fieldInput,
                                    }}
                                />
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container spacing={isDesktop ? 3 : 0}>
                        <Grid item xs={12} sm={6}>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('requestvendor:Email')}</span>
                                </div>
                                <TextField
                                    className={classes.fieldRoot}
                                    variant="outlined"
                                    name="email"
                                    value={vendor.email}
                                    disabled
                                    InputProps={{
                                        className: classes.fieldInput,
                                    }}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('requestvendor:Phone_Number')}</span>
                                </div>
                                <PhoneInput
                                    disabled
                                    value={vendor.phone}
                                    containerClass={classes.fieldPhoneContainer}
                                    rootClasses={classes.fieldPhoneRoot}
                                />
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container spacing={isDesktop ? 3 : 0}>
                        <Grid item xs={12} sm={6}>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('requestvendor:Province')}</span>
                                </div>
                                <TextField
                                    className={classes.fieldRoot}
                                    variant="outlined"
                                    name="region"
                                    value={vendor.region}
                                    disabled
                                    InputProps={{
                                        className: classes.fieldInput,
                                    }}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('requestvendor:City')}</span>
                                </div>
                                <TextField
                                    className={classes.fieldRoot}
                                    variant="outlined"
                                    name="city"
                                    value={vendor.city}
                                    disabled
                                    InputProps={{
                                        className: classes.fieldInput,
                                    }}
                                />
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container spacing={isDesktop ? 3 : 0}>
                        <Grid item xs={12} sm={6}>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('requestvendor:Postal_Code')}</span>
                                </div>
                                <TextField
                                    className={classes.fieldRoot}
                                    variant="outlined"
                                    name="region"
                                    value={vendor.postCode}
                                    disabled
                                    InputProps={{
                                        className: classes.fieldInput,
                                    }}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('requestvendor:Status')}</span>
                                </div>
                                <TextField
                                    className={classes.fieldRoot}
                                    variant="outlined"
                                    name="statusLabel"
                                    value={vendor.statusLabel}
                                    disabled
                                    InputProps={{
                                        className: classes.fieldInput,
                                    }}
                                />
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container spacing={isDesktop ? 3 : 0}>
                        <Grid item xs={12} sm={6}>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('requestvendor:KTP')}</span>
                                </div>
                                <div className={classes.attachDiv}>
                                    <Grid container spacing={isDesktop ? 3 : 0}>
                                        <Grid item xs={12} sm={6}>
                                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                                <div className={classes.divLabel}>
                                                    <span className={clsx(classes.label, 'attach')}>{t('requestvendor:Attachment')}</span>
                                                </div>
                                                <div
                                                    className={classes.attachment}
                                                    style={{
                                                        backgroundImage: `url('${vendor.ktp || '/assets/img/img_palceholder.svg'}')`,
                                                        backgroundSize: vendor.ktp ? 'contain' : 'auto',
                                                        cursor: vendor.ktp ? 'pointer' : 'unset',
                                                    }}
                                                    onClick={() => (vendor.ktp ? openImageViewer(vendor.ktp) : null)}
                                                    aria-hidden="true"
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                                <div className={classes.divLabel}>
                                                    <span className={clsx(classes.label, 'attach')}>{t('requestvendor:KTP_Number')}</span>
                                                </div>
                                                <div className={classes.divLabel}>
                                                    <span className={clsx(classes.label, 'attach')}>{vendor.ktpNumber || '-'}</span>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('requestvendor:NPWP')}</span>
                                </div>

                                <div className={classes.attachDiv}>
                                    <Grid container spacing={isDesktop ? 3 : 0}>
                                        <Grid item xs={12} sm={6}>
                                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                                <div className={classes.divLabel}>
                                                    <span className={clsx(classes.label, 'attach')}>{t('requestvendor:Attachment')}</span>
                                                </div>
                                                <div
                                                    className={classes.attachment}
                                                    style={{
                                                        backgroundImage: `url('${vendor.npwp || '/assets/img/img_palceholder.svg'}')`,
                                                        backgroundSize: vendor.npwp ? 'contain' : 'auto',
                                                        cursor: vendor.npwp ? 'pointer' : 'unset',
                                                    }}
                                                    onClick={() => (vendor.npwp ? openImageViewer(vendor.npwp) : null)}
                                                    aria-hidden="true"
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                                <div className={classes.divLabel}>
                                                    <span className={clsx(classes.label, 'attach')}>{t('requestvendor:NPWP_Number')}</span>
                                                </div>
                                                <div className={classes.divLabel}>
                                                    <span className={clsx(classes.label, 'attach')}>{vendor.npwpNumber || '-'}</span>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </Grid>
                    </Grid>

                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        className={clsx(classes.btn, 'btn-not')}
                        onClick={handleNotApprove}
                        variant="contained"
                        disabled={disabledButton}
                    >
                        {t('requestvendor:Not_Approve')}
                    </Button>
                    <Button
                        className={classes.btn}
                        onClick={handleApprove}
                        variant="contained"
                        disabled={disabledButton}
                    >
                        {t('requestvendor:Approve')}
                    </Button>
                </div>
            </Paper>
            {isViewerOpen && (
                <ImageViewer
                    src={[image]}
                    currentIndex={0}
                    onClose={closeImageViewer}
                    backgroundStyle={{
                        backgroundColor: 'rgba(0,0,0,0.9)',
                    }}
                    closeOnClickOutside
                />
            )}
        </>
    );
};

export default RequestVendorEditContent;
