/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { useRouter } from 'next/router';

import Button from '@common_button';
import TextField from '@common_textfield';
import Switch from '@common_switch';
import { PRIMARY_DARK } from '@theme_color';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepConnector from '@material-ui/core/StepConnector';
import StepLabel from '@material-ui/core/StepLabel';
import ImageIcon from '@material-ui/icons/Image';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';

import ProductModal from '@sellermodules/promotion/pages/bundling/create/components/ProductModal';
import DiscountContent from '@sellermodules/promotion/pages/bundling/create/components/DiscountContent';
import { integerReg } from '@helper_regex';
import useStyles from '@sellermodules/promotion/pages/bundling/create/components/style';

const QontoConnector = withStyles({
    alternativeLabel: {
        top: 12,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    active: {
        '& $line': {
            borderColor: PRIMARY_DARK,
        },
    },
    completed: {
        '& $line': {
            borderColor: PRIMARY_DARK,
        },
    },
    line: {
        borderTopWidth: 2,
        borderRadius: 1,
    },
})(StepConnector);

const CreateBundlingContent = (props) => {
    const {
        t, formik, location,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const [checked, setChecked] = useState([]);
    const [field, setField] = useState({
        package_price: '',
        discount: '',
    });
    const [openModal, setOpenModal] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const steps = [t('sellerpromotion:Set_Product'), t('sellerpromotion:Set_Discount'), t('sellerpromotion:Bundling_Info')];

    const checkLocation = (e, id) => {
        const isChecked = e.target.checked;
        let temp = [...formik.values.quota_location];
        if (isChecked && !temp.includes(id)) {
            temp.push(id);
        } else if (!isChecked && temp.includes(id)) {
            temp = temp.filter((loc_id) => loc_id !== id);
        }
        formik.handleChange(e);
        formik.setFieldValue('quota_location', temp);
    };

    useEffect(() => {
        if (!formik.isSubmitting) return;
        const keys = Object.keys(formik.errors);
        if (keys.length > 0) {
            const keyName = keys[0];
            const node = document.getElementsByName(keyName);
            if (node.length) {
                node[0].scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
                node[0].focus();
            }
        }
    }, [formik]);

    useEffect(() => {
        if (activeStep === 2) {
            const node = document.getElementsByName('name');
            if (node.length) {
                node[0].scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
                node[0].focus();
            }
        }
    }, [activeStep]);

    return (
        <div className={classes.container}>
            <div className={classes.headerContainer}>
                <IconButton aria-label="back" onClick={() => router.push('/seller/promotion/bundling')}>
                    <ArrowBackOutlinedIcon />
                </IconButton>
                <h2 className="title">{t('sellerpromotion:Bundling')}</h2>
            </div>
            <Paper className={clsx(classes.paper, 'step')}>
                <Stepper
                    alternativeLabel
                    activeStep={activeStep}
                    className={classes.stepper}
                    connector={<QontoConnector />}
                >
                    {steps.map((step, i) => (
                        <Step key={i}>
                            <StepLabel>
                                {step}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Paper>
            <Paper className={classes.paper}>
                <h2 className={clsx(classes.title, 'paper')}>{t('sellerpromotion:Set_Product')}</h2>
                <div className={clsx(classes.formFieldsGrid)}>
                    <InputLabel htmlFor="start_period" className={classes.label}>
                        {t('sellerpromotion:Set_Bundling_Period')}
                    </InputLabel>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="start_period"
                                type="datetime-local"
                                value={formik.values.start_period}
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    if (formik.values.end_period && formik.values.end_period < e.target.value) {
                                        formik.setFieldValue('end_period', dayjs(e.target.value).add(1, 'day').format('YYYY-MM-DDTHH:mm'));
                                    }
                                }}
                                className={classes.textInput}
                                error={!!(formik.touched.start_period && formik.errors.start_period)}
                                helperText={(formik.touched.start_period && formik.errors.start_period) || ''}
                                inputProps={{ min: dayjs().format('YYYY-MM-DDTHH:mm') }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="end_period"
                                type="datetime-local"
                                placeholder=""
                                value={formik.values.end_period}
                                onChange={formik.handleChange}
                                className={classes.textInput}
                                error={!!(formik.touched.end_period && formik.errors.end_period)}
                                helperText={(formik.touched.end_period && formik.errors.end_period) || ''}
                                disabled={!formik.values.is_end}
                                inputProps={{ min: formik.values.start_period }}
                            />
                            <Switch
                                name="is_end"
                                value={formik.values.is_end}
                                onChange={formik.handleChange}
                                falseLabel={t('sellerpromotion:End_time')}
                                trueLabel={t('sellerpromotion:End_time')}
                                rootClass={classes.switch}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className={clsx(classes.formFieldsGrid)}>
                    <InputLabel htmlFor="containerImg" className={classes.label}>
                        {t('sellerpromotion:Select_Product')}
                    </InputLabel>
                    <div className={classes.containerImg}>
                        {formik.values.bundle_options?.length
                            ? formik.values.bundle_options?.map((product, idx) => (
                                <div
                                    className={classes.imgGroup}
                                    key={idx}
                                >
                                    <div
                                        className={classes.imgContainer}
                                        onClick={() => setOpenModal(true)}
                                        aria-hidden="true"
                                    >
                                        <img
                                            className={classes.img}
                                            src={product.images?.[0]?.url || '/assets/img/placeholder_image.jpg'}
                                            alt="media_img"
                                        />
                                    </div>
                                    {!!product.name
                                        && (
                                            <div className={classes.fileName}>
                                                {product.name}
                                            </div>
                                        )}
                                </div>
                            ))
                            : ([...Array(3).keys()].map((el) => (
                                <div className={classes.imgGroup} key={el}>
                                    <Button className={classes.btnImg} type="button" onClick={() => setOpenModal(true)} fullWidth>
                                        <ImageIcon className={classes.icon} />
                                        <div className={classes.textFile}>
                                            {`${t('common:Product')} ${el + 1}`}
                                        </div>
                                    </Button>
                                </div>
                            ))
                            )}
                    </div>
                </div>
                <ProductModal
                    {...props}
                    setChecked={setChecked}
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    setActiveStep={setActiveStep}
                    setField={setField}
                />
            </Paper>
            {activeStep >= 1
                && (
                    <Paper className={classes.paper}>
                        <h2 className={clsx(classes.title, 'paper')}>{t('sellerpromotion:Set_Discount')}</h2>
                        <DiscountContent
                            {...props}
                            checked={checked}
                            setChecked={setChecked}
                            setActiveStep={setActiveStep}
                            setOpenModal={setOpenModal}
                            activeStep={activeStep}
                            field={field}
                            setField={setField}
                        />
                    </Paper>
                )}
            {activeStep >= 2
                && (
                    <>
                        <Paper className={classes.paper}>
                            <h2 className={clsx(classes.title, 'paper')}>{t('sellerpromotion:Bundling_Info')}</h2>
                            <div className={clsx(classes.formFieldsGrid)}>
                                <InputLabel htmlFor="name" className={classNames(classes.label, classes.required)}>
                                    {t('sellerpromotion:Package_Info')}
                                </InputLabel>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="name"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            className={classes.textInput}
                                            error={!!(formik.touched.name && formik.errors.name)}
                                            helperText={(formik.touched.name && formik.errors.name) || ''}
                                            placeholder={t('sellerpromotion:Bundling_Name_Ex_Bundling_Promo_1111')}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                            <div className={clsx(classes.formFieldsGrid, 'start')}>
                                <InputLabel htmlFor="use_quota" className={classes.label}>
                                    {t('sellerpromotion:Activate_Bundling_Quota')}
                                </InputLabel>
                                <Grid container justifyContent="space-between" style={{ display: 'block' }}>
                                    <Grid item xs={2} sm={2}>
                                        <Switch
                                            name="use_quota"
                                            value={formik.values.use_quota}
                                            onChange={(e) => {
                                                formik.handleChange(e);
                                                if (e.target.checked) {
                                                    formik.setFieldValue('quota_location', location.map((loc) => loc.id));
                                                    const isSetCheckbox = location.map((loc) => [loc.id, true]);
                                                    formik.setFieldValue('is_checkbox', Object.fromEntries(isSetCheckbox));
                                                } else {
                                                    formik.setFieldValue('quota_location', []);
                                                }
                                            }}
                                            falseLabel=""
                                            trueLabel=""
                                        />
                                    </Grid>
                                    {formik.values.use_quota
                                        && (
                                            <>
                                                <TableContainer className={clsx(classes.tableContainer,
                                                    !!(formik.touched.quota_location && formik.errors.quota_location) && 'error')}
                                                >
                                                    <Table>
                                                        <TableHead>
                                                            <TableRow className={clsx(classes.tr, 'head')}>
                                                                <TableCell className={clsx(classes.th, 'fix')} />
                                                                <TableCell className={classes.th}>{t('sellerpromotion:Location')}</TableCell>
                                                                <TableCell className={classes.th}>{t('sellerpromotion:Activate_Bundling_Quota')}</TableCell>
                                                                <TableCell className={classes.th}>{t('sellerpromotion:Quota')}</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {location.map((loc, i) => (
                                                                <TableRow className={classNames(classes.rowItem, i % 2 && 'dark')}>
                                                                    <TableCell className={clsx(classes.td, 'border')}>
                                                                        <Checkbox
                                                                            className={classes.checkbox}
                                                                            checked={formik.values.is_checkbox[loc.id]}
                                                                            onChange={(e) => checkLocation(e, loc.id)}
                                                                            name={`is_checkbox[${[loc.id]}]`}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell className={classes.td}>{loc.name}</TableCell>
                                                                    <TableCell className={classes.td}>
                                                                        <div className={classes.divider}>
                                                                            <Switch
                                                                                name={`is_location[${[loc.id]}]`}
                                                                                value={formik.values.is_location[loc.id]}
                                                                                onChange={formik.handleChange}
                                                                                falseLabel=""
                                                                                trueLabel=""
                                                                            />
                                                                        </div>
                                                                    </TableCell>
                                                                    <TableCell className={classes.td}>
                                                                        <div className={classes.divider}>
                                                                            {formik.values.is_location[loc.id]
                                                                                && (
                                                                                    <TextField
                                                                                        name={`quota[${[loc.id]}]`}
                                                                                        value={formik.values.quota[loc.id]}
                                                                                        onChange={(e) => formik.setFieldValue(`quota[${[loc.id]}]`,
                                                                                            e.target.value.replace(integerReg, ''))}
                                                                                        className={classes.textNumber}
                                                                                        error={!!(formik.touched.quota?.[loc.id] && formik.errors.quota?.[loc.id])}
                                                                                        helperText={(formik.touched.quota?.[loc.id] && formik.errors.quota?.[loc.id]) || ''}
                                                                                        inputProps={{ style: { textAlign: 'center', fontSize: 13 } }}
                                                                                        InputProps={{
                                                                                            startAdornment: (
                                                                                                <InputAdornment className={classes.adornment} position="start">
                                                                                                    <IconButton
                                                                                                        disabled={!formik.values.quota?.[loc.id]
                                                                                                        || formik.values.quota?.[loc.id] <= 1}
                                                                                                        className="button"
                                                                                                        onClick={() => {
                                                                                                            const temp = Number(formik.values.quota?.[loc.id]) || 0;
                                                                                                            if (temp > 1) {
                                                                                                                formik.setFieldValue(`quota[${[loc.id]}]`, temp - 1);
                                                                                                            }
                                                                                                        }}
                                                                                                    >
                                                                                                        -
                                                                                                    </IconButton>
                                                                                                </InputAdornment>
                                                                                            ),
                                                                                            endAdornment: (
                                                                                                <InputAdornment className={classes.adornment} position="end">
                                                                                                    <IconButton
                                                                                                        className="button"
                                                                                                        onClick={() => {
                                                                                                            const temp = Number(formik.values.quota?.[loc.id]) || 0;
                                                                                                            formik.setFieldValue(`quota[${[loc.id]}]`, temp + 1);
                                                                                                        }}
                                                                                                    >
                                                                                                        +
                                                                                                    </IconButton>
                                                                                                </InputAdornment>
                                                                                            ),
                                                                                        }}
                                                                                    />
                                                                                )}
                                                                        </div>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                                <span className={classes.error}>{(formik.touched.quota_location && formik.errors.quota_location)}</span>
                                            </>
                                        )}
                                </Grid>
                            </div>
                        </Paper>
                        <Grid container alignItems="center">
                            <Grid item xs={12} sm={6} md={3}>
                                <Button
                                    className={classes.btn}
                                    onClick={formik.handleSubmit}
                                >
                                    {t('sellerpromotion:Save')}
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                )}
        </div>
    );
};

export default CreateBundlingContent;
