import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import ImageViewer from 'react-simple-image-viewer';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Radio from '@material-ui/core/Radio';

import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';
import Button from '@common_button';
import Switch from '@common_switch';
import DropFile from '@common_dropfile';

import useStyles from '@modules/marketplace/pages/edit/components/style';

const EditMarketplaceContent = (props) => {
    const {
        formik, t, handleDropFile, featuresOption, countryOption,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const [image, setImage] = useState('');
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    const openImageViewer = useCallback((src) => {
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
                        onClick={() => router.push('/marketplace/marketplace')}
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
                        {t('marketplace:Edit_Marketplace')}
                        {' '}
                        {formik.values.company_name}
                    </h2>
                </div>
            </div>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            <h5 className={classes.titleSmall}>{t('marketplace:General_Information')}</h5>
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={clsx(classes.label, classes.labelRequired)}>{t('marketplace:Marketplace_Code')}</span>
                                </div>
                                <TextField
                                    className={classes.fieldRoot}
                                    variant="outlined"
                                    name="marketplace_code"
                                    value={formik.values.marketplace_code}
                                    InputProps={{
                                        className: classes.fieldInput,
                                    }}
                                    disabled
                                />
                            </div>
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={clsx(classes.label, classes.labelRequired)}>{t('marketplace:Marketplace_Name')}</span>
                                </div>
                                <TextField
                                    className={classes.fieldRoot}
                                    variant="outlined"
                                    name="marketplace_name"
                                    value={formik.values.marketplace_name}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.marketplace_name && formik.errors.marketplace_name)}
                                    helperText={(formik.touched.marketplace_name && formik.errors.marketplace_name) || ''}
                                    InputProps={{
                                        className: classes.fieldInput,
                                    }}
                                />
                            </div>
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('marketplace:Status')}</span>
                                </div>
                                <Switch
                                    name="is_active"
                                    value={formik.values.is_active}
                                    onChange={formik.handleChange}
                                    trueLabel={t('marketplace:Active')}
                                    falseLabel={t('marketplace:Inactive')}
                                />
                            </div>
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={clsx(classes.label, classes.labelRequired)}>{t('marketplace:Country')}</span>
                                </div>
                                <Autocomplete
                                    mode="default"
                                    name="country"
                                    className={classes.autocompleteRoot}
                                    value={(formik.values.country)}
                                    onChange={(e) => {
                                        formik.setFieldValue('country', e);
                                    }}
                                    options={countryOption}
                                    primaryKey="id"
                                    labelKey="full_name_english"
                                    error={!!(formik.touched.country && formik.errors.country)}
                                    helperText={(formik.touched.country && formik.errors.country) || ''}
                                />
                            </div>
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('marketplace:Features')}</span>
                                </div>
                                <Autocomplete
                                    className={classes.autocompleteRoot}
                                    value={formik.values.features}
                                    onChange={(e) => {
                                        formik.setFieldValue('features', e);
                                    }}
                                    options={featuresOption}
                                    multiple
                                />
                            </div>
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('marketplace:Is_Open_API')}</span>
                                </div>
                                <Switch
                                    name="is_open_api"
                                    value={formik.values.is_open_api}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            {/* <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('marketplace:Can_Update_Order')}</span>
                                </div>
                                <Switch
                                    name="can_update_order"
                                    value={formik.values.can_update_order}
                                    onChange={formik.handleChange}
                                />
                            </div> */}
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('marketplace:Can_Accept_Order')}</span>
                                </div>
                                <Switch
                                    name="can_accept_order"
                                    value={formik.values.can_accept_order}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('marketplace:Can_Pack_Order')}</span>
                                </div>
                                <Switch
                                    name="can_pack_order"
                                    value={formik.values.can_pack_order}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('marketplace:Can_Complete_Order')}</span>
                                </div>
                                <Switch
                                    name="can_complete_order"
                                    value={formik.values.can_complete_order}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('marketplace:Can_Cancel_Order')}</span>
                                </div>
                                <Switch
                                    name="can_cancel_order"
                                    value={formik.values.can_cancel_order}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h5 className={classes.titleSmall}>{t('marketplace:Logo')}</h5>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm="auto">
                                    <div
                                        className={clsx(classes.imgBack, (formik.values.image_binary || formik.values.image_url) && 'white')}
                                        style={{
                                            backgroundImage: `url(${formik.values.image_binary || formik.values.image_url
                                                || '/assets/img/placeholder_image.jpg'})`,
                                        }}
                                        onClick={() => (formik.values.image_binary || formik.values.image_url
                                            ? openImageViewer(formik.values.image_binary || formik.values.image_url) : null)}
                                        aria-hidden="true"
                                    />
                                </Grid>
                                <Grid item xs={12} sm="auto">
                                    <p className={classes.helperLogo}>
                                        {t('marketplace:Allowed_format')}
                                        {' '}
                                        <span className="primary">JPG, JPEG, PNG</span>
                                        .
                                    </p>
                                    <p className={classes.helperLogo}>
                                        {t('marketplace:File_size_maximum')}
                                        {' '}
                                        <span className="primary">500 KB</span>
                                        .
                                    </p>
                                    <div className={classes.divider} />
                                    <DropFile
                                        error={formik.errors.logo && formik.touched.logo}
                                        getBase64={handleDropFile}
                                        showFiles={false}
                                        maxSize={500000}
                                        formatFile=".jpg, .jpeg, .png"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>

                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>{t('marketplace:Marketplace_Credentials')}</h5>
                    <TableContainer className={classes.tableContainer}>
                        <Table className={classes.table} size="small" aria-label="credentials table">
                            <TableHead>
                                <TableRow className={clsx(classes.tr, 'head')}>
                                    <TableCell className={clsx(classes.th, classes.required)}>
                                        {t('marketplace:Credential_Field')}
                                    </TableCell>
                                    <TableCell className={classes.th}>{t('marketplace:Description')}</TableCell>
                                    <TableCell className={classes.th} align="center">{t('marketplace:Is_Identifier')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {formik.values.credentials?.map((row, idx) => (
                                    <TableRow className={classes.rowItem} key={idx}>
                                        <TableCell className={classes.td}>
                                            <TextField
                                                className={classes.fieldRoot}
                                                variant="outlined"
                                                name={`credentials[${idx}].credentials_field`}
                                                value={row.credentials_field}
                                                InputProps={{
                                                    className: classes.fieldInput,
                                                }}
                                                disabled
                                            />
                                        </TableCell>
                                        <TableCell className={classes.td}>
                                            <TextField
                                                className={classes.fieldRoot}
                                                variant="outlined"
                                                name={`credentials[${idx}].description`}
                                                value={row.description}
                                                onChange={formik.handleChange}
                                                error={!!(formik.touched.credentials?.[idx]?.description
                                                    && formik.errors.credentials?.[idx]?.description)}
                                                helperText={(formik.touched.credentials?.[idx]?.description
                                                    && formik.errors.credentials?.[idx]?.description) || ''}
                                                InputProps={{
                                                    className: classes.fieldInput,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell className={classes.td} align="center">
                                            <Radio
                                                name="is_identifier"
                                                checked={formik.values.is_identifier === idx}
                                                onClick={() => formik.setFieldValue(
                                                    'is_identifier', formik.values.is_identifier === idx ? null : idx,
                                                )}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>{t('marketplace:Marketplace_Attribute_Map')}</h5>
                    <TableContainer className={classes.tableContainer}>
                        <Table className={classes.table} size="small" aria-label="credentials table">
                            <TableHead>
                                <TableRow className={clsx(classes.tr, 'head')}>
                                    <TableCell className={clsx(classes.th, classes.required)}>
                                        {t('marketplace:Attribute_Code')}
                                    </TableCell>
                                    <TableCell className={clsx(classes.th, classes.required)}>
                                        {t('marketplace:Marketplace_Attribute')}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {formik.values.attributes_map?.map((row, idx) => (row.is_deleted ? null
                                    : (
                                        <TableRow className={classes.rowItem} key={idx}>
                                            <TableCell className={classes.td}>
                                                <TextField
                                                    className={classes.fieldRoot}
                                                    variant="outlined"
                                                    name={`attributes_map[${idx}].attribute_code`}
                                                    value={row.attribute_code}
                                                    InputProps={{
                                                        className: classes.fieldInput,
                                                    }}
                                                    disabled
                                                />
                                            </TableCell>
                                            <TableCell className={classes.td}>
                                                <TextField
                                                    className={classes.fieldRoot}
                                                    variant="outlined"
                                                    name={`attributes_map[${idx}].marketplace_attribute`}
                                                    value={row.marketplace_attribute}
                                                    onChange={formik.handleChange}
                                                    error={!!(formik.touched.attributes_map?.[idx]?.marketplace_attribute
                                                        && formik.errors.attributes_map?.[idx]?.marketplace_attribute)}
                                                    helperText={(formik.touched.attributes_map?.[idx]?.marketplace_attribute
                                                        && formik.errors.attributes_map?.[idx]?.marketplace_attribute) || ''}
                                                    InputProps={{
                                                        className: classes.fieldInput,
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        {t('marketplace:Submit')}
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

export default EditMarketplaceContent;
