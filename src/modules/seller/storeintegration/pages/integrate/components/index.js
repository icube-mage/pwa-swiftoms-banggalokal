import React from 'react';
import { useRouter } from 'next/router';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Autocomplete from '@common_autocomplete';
import TextField from '@common_textfield';
import Button from '@common_button';
import TextInfo from '@common_textinfo';
import BackHeader from '@common_backheaderseller';
import Alert from '@common_alert/index';
import gqlService from '@sellermodules/storeintegration/services/graphql';
import { translateFeature } from '@sellermodules/storeintegration/helpers';
import HelpModal from '@sellermodules/storeintegration/pages/integrate/components/HelpModal';
import useStyles from '@sellermodules/storeintegration/pages/integrate/components/style';
import { getDocsGuide } from '@helper_config';
import classNames from 'classnames';

const StoreIntegrationContent = (props) => {
    const {
        t, data, marketplace_code, formik, setOpenHelp,
    } = props;

    const classes = useStyles();
    const router = useRouter();

    const getMarketplaceCode = (marketplace) => {
        switch (marketplace) {
        case 'BLIB':
            return 'integrasi-blibli';
        case 'TKPD':
            return 'integrasi-tokopedia';
        default:
            return 'integrasi-toko';
        }
    };
    const handleClickDocs = () => {
        window.open(`${getDocsGuide()}/${getMarketplaceCode(marketplace_code)}`);
    };

    const [getMarketplaceDefaultShippingMethods, getMarketplaceDefaultShippingMethodsRes] = gqlService.getMarketplaceDefaultShippingMethods();

    return (
        <>
            <BackHeader title={t('sellerstoreintegration:Store_Integration')} route="/seller/saleschannels/storeintegration" />
            <Paper className={classes.container}>
                <div className={classes.topSection}>{data.marketplace_name}</div>
                {marketplace_code === 'ZLRA' && data.credentials?.url_callback ? (
                    <div className={classes.warning}>
                        <ErrorIcon />
                        <div>
                            {t('sellerstoreintegration:Make_sure_you_have_registered_the_following_url_callbacks')}
                            {' '}
                            <b>{data.credentials.url_callback}</b>
                            {' '}
                            {t('sellerstoreintegration:on_your_Zalora_Seller_Center_You_can_read_more_details')}
                            {' '}
                            <a
                                href="https://docs.google.com/document/d/1uQg9D1Fkxp35ZOWcgtjtoiEVNJUKKqYzEtlZcOpJhXY/edit"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {t('sellerstoreintegration:here')}
                            </a>
                            .
                        </div>
                    </div>
                ) : null}
                <Grid container spacing={6} justifyContent="space-between">
                    <Hidden mdUp>
                        <Grid item xs={12}>
                            <div className={classes.capability}>
                                <div className={classes.capabilityImg}>
                                    <img src="/assets/img/icon-connect.svg" alt="" className="connect" />
                                    <img src={data.image_url} alt="" className={classes.icon} />
                                </div>
                                <Grid container spacing={2} justifyContent="flex-start">
                                    {data.features?.map((feature) => (
                                        <Grid key={feature} item xs={12} md={6}>
                                            <div className={classes.feature}>
                                                <CheckCircleIcon className="check" />
                                                <p className="text">{t(`sellerstoreintegration:${translateFeature(feature)}`)}</p>
                                            </div>
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                            <div className={classes.helper}>
                                {t('sellerstoreintegration:Need_help')}
                                {' '}
                                <Button classes={{ root: classes.buttonRootText }} buttonType="link" onClick={handleClickDocs}>
                                    {t('sellerstoreintegration:See_How_to_Integrate_Stores')}
                                </Button>
                            </div>
                            {marketplace_code?.toLowerCase().includes('tkpd') && (
                                <Alert
                                    titleMultiple={[
                                        {
                                            title: t('sellerstoreintegration:section_title_integrate_tokped'),
                                            info: (
                                                <>
                                                    <ul className={classes.ulStyle}>
                                                        <li>{t('sellerstoreintegration:section_info_integrate_tokped1')}</li>
                                                        <li>{t('sellerstoreintegration:section_info_integrate_tokped2')}</li>
                                                        <li>{t('sellerstoreintegration:section_info_integrate_tokped3')}</li>
                                                    </ul>
                                                </>
                                            ),
                                        },
                                    ]}
                                />
                            )}
                        </Grid>
                    </Hidden>
                    <Grid item xs={12} md={6}>
                        <div>
                            {data?.credentials?.fields?.map((field) => (field.name === 'default_shipping_method' ? (
                                <div className={classes.gridFormContainer} key={field.name}>
                                    <div className="label">
                                        {field.description}
                                        {field.required && <span className="required">*</span>}
                                    </div>
                                    <div className="form">
                                        <Autocomplete
                                            name={field.name}
                                            variant="standard"
                                            mode="lazy"
                                            className={classes.textInput}
                                            value={
                                                typeof formik.values.default_shipping_method === 'object'
                                                    ? formik.values.default_shipping_method
                                                    : [formik.values.default_shipping_method]
                                            }
                                            onChange={(e) => formik.setFieldValue('default_shipping_method', e)}
                                            loading={getMarketplaceDefaultShippingMethodsRes.loading}
                                            options={getMarketplaceDefaultShippingMethodsRes.data?.getMarketplaceDefaultShippingMethods || []}
                                            getOptions={getMarketplaceDefaultShippingMethods}
                                            getOptionsVariables={{
                                                variables: {
                                                    marketplace_code: router.query.mp_code,
                                                },
                                            }}
                                            primaryKey="value"
                                            labelKey="label"
                                            error={!!(formik.touched.default_shipping_method && formik.errors.default_shipping_method)}
                                            helperText={(formik.touched.default_shipping_method && formik.errors.default_shipping_method) || ''}
                                        />
                                        {!!field.tooltip && <TextInfo textHelp={field.tooltip} textHelpPlacement="top" size={16} />}
                                    </div>
                                </div>
                            ) : (
                                field.name !== 'cutoff_date' && (
                                    <div className={classes.gridFormContainer} key={field.name}>
                                        <div className="label">
                                            {field.description}
                                            {field.required && <span className="required"> *</span>}
                                        </div>
                                        <div className="form">
                                            <TextField
                                                type={field.name === 'cutoff_date' ? 'date' : 'string'}
                                                multiple
                                                name={field.name}
                                                value={formik.values[field.name]}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className={classes.textInput}
                                                variant="standard"
                                                error={
                                                    field.name === 'cutoff_date'
                                                        ? !!formik.errors[field.name]
                                                        : !!(formik.touched[field.name] && formik.errors[field.name])
                                                }
                                                helperText={
                                                    (field.name === 'cutoff_date'
                                                        ? formik.errors[field.name]
                                                        : formik.touched[field.name] && formik.errors[field.name]) || ''
                                                }
                                            />
                                            {!!field.tooltip && <TextInfo textHelp={field.tooltip} textHelpPlacement="top" size={16} />}
                                        </div>
                                    </div>
                                )
                            )))}
                            {marketplace_code?.toLowerCase().includes('tkpd') && (
                                <div className={classes.helperRequest}>
                                    {t('sellerstoreintegration:Need_access')}
                                    {' '}
                                    <div
                                        className={classNames(classes.divRequest, classes.buttonRootText)}
                                        onClick={() => setOpenHelp(true)}
                                        aria-hidden="true"
                                    >
                                        {t('sellerstoreintegration:Request_access')}
                                    </div>
                                </div>
                            )}
                            <Button classes={{ root: classes.buttonRoot }} onClick={formik.handleSubmit} fullWidth>
                                {t('sellerstoreintegration:Start_Integration')}
                            </Button>
                        </div>
                    </Grid>
                    <Hidden smDown>
                        <Grid item xs={12} md={6} style={{ position: 'relative' }}>
                            <div className={classes.capability}>
                                <div className={classes.capabilityImg}>
                                    <img src="/assets/img/icon-connect.svg" alt="" className="connect" />
                                    <img src={data.image_url} alt="" className="icon" />
                                </div>
                                <Grid container spacing={2} justifyContent="flex-start">
                                    {data.features?.map((feature) => (
                                        <Grid key={feature} item xs={12} md={6}>
                                            <div className={classes.feature}>
                                                <CheckCircleIcon className="check" />
                                                <p className="text">{t(`sellerstoreintegration:${translateFeature(feature)}`)}</p>
                                            </div>
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                            <div className={classes.helper}>
                                {t('sellerstoreintegration:Need_help')}
                                {' '}
                                <Button classes={{ root: classes.buttonRootText }} buttonType="link" onClick={handleClickDocs}>
                                    {t('sellerstoreintegration:See_How_to_Integrate_Stores')}
                                </Button>
                            </div>
                            {marketplace_code?.toLowerCase().includes('tkpd') && (
                                <Alert
                                    titleMultiple={[
                                        {
                                            title: t('sellerstoreintegration:section_title_integrate_tokped'),
                                            info: (
                                                <>
                                                    <ul className={classes.ulStyle}>
                                                        <li>{t('sellerstoreintegration:section_info_integrate_tokped1')}</li>
                                                        <li>{t('sellerstoreintegration:section_info_integrate_tokped2')}</li>
                                                        <li>{t('sellerstoreintegration:section_info_integrate_tokped3')}</li>
                                                    </ul>
                                                </>
                                            ),
                                        },
                                    ]}
                                />
                            )}
                        </Grid>
                    </Hidden>
                </Grid>
            </Paper>
            <HelpModal {...props} />
        </>
    );
};

export default StoreIntegrationContent;
