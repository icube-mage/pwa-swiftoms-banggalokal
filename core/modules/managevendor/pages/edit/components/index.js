import React from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import ImageViewer from 'react-simple-image-viewer';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import InputAdornment from '@material-ui/core/InputAdornment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import TextField from '@common_textfield';
import Button from '@common_button';
import { breakPointsUp } from '@helper_theme';
import { integerReg } from '@helper_regex';
import useStyles from '@modules/managevendor/pages/edit/components/style';

const ManageVendorEditContent = (props) => {
    const {
        formik, t, dataApproval, vendor, dataLocations,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const isDesktop = breakPointsUp('sm');

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
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
                <div>
                    <Button
                        className={classes.btnBack}
                        onClick={() => router.push('/vendorportal/managevendor')}
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
                        {t('managevendor:Manage_Vendor')}
                        {' '}
                        {formik.values.company_name}
                    </h2>
                </div>
            </div>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>{t('managevendor:General_Information')}</h5>
                    <Grid container spacing={2}>
                        <Hidden mdUp>
                            <Grid item xs={12}>
                                <div className={classes.logoContainer}>
                                    <img
                                        className="logo"
                                        alt="logo"
                                        src={formik.values.logo}
                                        style={{ height: 128, width: 'auto', marginLeft: 20 }}
                                    />
                                </div>
                            </Grid>
                        </Hidden>
                        <Grid item xs={12} md={8}>
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('managevendor:Name')}</span>
                                </div>
                                <TextField
                                    className={classes.fieldRoot}
                                    variant="outlined"
                                    disabled
                                    name="company_name"
                                    value={vendor.company_name}
                                    InputProps={{
                                        className: classes.fieldInput,
                                    }}
                                />
                            </div>
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('managevendor:Description')}</span>
                                </div>
                                <TextField
                                    className={classes.fieldRoot}
                                    variant="outlined"
                                    disabled
                                    name="company_note"
                                    value={vendor.company_note}
                                    InputProps={{
                                        className: clsx(classes.fieldInput, 'multi'),
                                    }}
                                    multiline
                                    maxRows={5}
                                    minRows={5}
                                />
                            </div>
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('managevendor:Status')}</span>
                                </div>
                                <TextField
                                    className={classes.fieldRoot}
                                    variant="outlined"
                                    disabled
                                    name="company_status"
                                    value={vendor.company_status ? 'Active' : 'Inactive'}
                                    InputProps={{
                                        className: classes.fieldInput,
                                    }}
                                />
                            </div>
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('managevendor:Email')}</span>
                                </div>
                                <TextField
                                    className={classes.fieldRoot}
                                    variant="outlined"
                                    disabled
                                    name="email"
                                    value={vendor.email}
                                    InputProps={{
                                        className: classes.fieldInput,
                                    }}
                                />
                            </div>
                        </Grid>
                        <Hidden smDown>
                            <Grid item xs={4}>
                                <div className={classes.logoContainer}>
                                    <div
                                        className={classes.imgBack}
                                        style={{
                                            backgroundImage: `url(${vendor.logo || '/assets/img/placeholder_image.jpg'})`,
                                        }}
                                    />
                                </div>
                            </Grid>
                        </Hidden>
                    </Grid>
                </div>

                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>{t('managevendor:Configuration')}</h5>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('managevendor:Margin')}</span>
                                </div>
                                <TextField
                                    className={classes.fieldRoot}
                                    variant="outlined"
                                    name="company_margin"
                                    value={formik.values.company_margin}
                                    onChange={(e) => formik.setFieldValue('company_margin', e.target.value.replace(integerReg, ''))}
                                    error={!!(formik.touched.company_margin && formik.errors.company_margin)}
                                    helperText={(formik.touched.company_margin && formik.errors.company_margin) || ''}
                                    InputProps={{
                                        className: clsx(classes.fieldInput, 'width-small'),
                                        endAdornment: (
                                            <InputAdornment className={clsx(classes.adornment, 'end')} position="end">
                                                %
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('managevendor:Product_Auto_Approval')}</span>
                                </div>
                                <div className={clsx(classes.fieldRoot, classes.fieldRootDesc)} style={{ display: 'inline-block' }}>
                                    <RadioGroup
                                        className={classes.radioGroup}
                                        name="is_product_approval"
                                        value={formik.values.is_product_approval}
                                        onChange={(e) => formik.setFieldValue('is_product_approval', Number(e?.target?.value) || 0)}
                                        error={!!(formik.touched.is_product_approval && formik.errors.is_product_approval)}
                                        helperText={t('managevendor:Can_auto_approve_product')}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                    >
                                        {dataApproval.map((approval, i) => (
                                            <FormControlLabel
                                                key={i}
                                                value={Number(approval.value)}
                                                label={approval.label}
                                                control={<Radio />}
                                            />

                                        ))}
                                    </RadioGroup>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>

                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>{t('managevendor:Location')}</h5>
                    <Grid container spacing={2}>
                        {dataLocations?.map((location) => (
                            <Grid item xs={12} md={6}>
                                <div className={classes.bgGray}>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>{t('managevendor:Name')}</span>
                                        </div>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>{location.loc_name}</span>
                                        </div>
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>{t('managevendor:Address')}</span>
                                        </div>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>
                                                {location.loc_street || '-'}
                                                <br />
                                                {location.loc_city?.label || '-'}
                                                <br />
                                                {location.loc_region?.label || '-'}
                                                <br />
                                                {location.loc_country?.label || '-'}
                                                <br />
                                                {location.loc_postcode || '-'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>{t('managevendor:Phone')}</span>
                                        </div>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>{location.loc_telephone}</span>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </div>

                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>{t('managevendor:Additional_Information')}</h5>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <div className={classes.formFieldCol}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('requestvendor:KTP')}</span>
                                </div>

                                <div className={classes.bgGray}>
                                    <Grid container spacing={isDesktop ? 3 : 0}>
                                        <Grid item xs={12} sm={6}>
                                            <div className={classes.formFieldCol}>
                                                <div className={classes.divLabel}>
                                                    <span className={clsx(classes.label, 'attach')}>{t('requestvendor:Attachment')}</span>
                                                </div>
                                                <div
                                                    className={classes.attachment}
                                                    style={{
                                                        backgroundImage: `url('${vendor.id_card.file_url || '/assets/img/img_palceholder.svg'}')`,
                                                        backgroundSize: vendor.id_card.file_url ? 'contain' : 'auto',
                                                        cursor: vendor.id_card.file_url ? 'pointer' : 'unset',
                                                    }}
                                                    onClick={() => (vendor.id_card.file_url ? openImageViewer(vendor.id_card.file_url) : null)}
                                                    aria-hidden="true"
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <div className={classes.formFieldCol}>
                                                <div className={classes.divLabel}>
                                                    <span className={clsx(classes.label, 'attach')}>{t('requestvendor:NPWP_Number')}</span>
                                                </div>
                                                <div className={classes.divLabel}>
                                                    <span className={clsx(classes.label, 'attach')}>{vendor.id_card.number || '-'}</span>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <div className={classes.formFieldCol}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('requestvendor:NPWP')}</span>
                                </div>

                                <div className={classes.bgGray}>
                                    <Grid container spacing={isDesktop ? 3 : 0}>
                                        <Grid item xs={12} sm={6}>
                                            <div className={classes.formFieldCol}>
                                                <div className={classes.divLabel}>
                                                    <span className={clsx(classes.label, 'attach')}>{t('requestvendor:Attachment')}</span>
                                                </div>
                                                <div
                                                    className={classes.attachment}
                                                    style={{
                                                        backgroundImage: `url('${vendor.taxpayer.file_url || '/assets/img/img_palceholder.svg'}')`,
                                                        backgroundSize: vendor.taxpayer.file_url ? 'contain' : 'auto',
                                                        cursor: vendor.taxpayer.file_url ? 'pointer' : 'unset',
                                                    }}
                                                    onClick={() => (vendor.taxpayer.file_url ? openImageViewer(vendor.taxpayer.file_url) : null)}
                                                    aria-hidden="true"
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <div className={classes.formFieldCol}>
                                                <div className={classes.divLabel}>
                                                    <span className={clsx(classes.label, 'attach')}>{t('requestvendor:NPWP_Number')}</span>
                                                </div>
                                                <div className={classes.divLabel}>
                                                    <span className={clsx(classes.label, 'attach')}>{vendor.taxpayer.number || '-'}</span>
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
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        {t('managevendor:Submit')}
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

export default ManageVendorEditContent;
