/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-expressions */
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import AppModal from '@common_appmodal/index';
import TextField from '@common_textfield';
import Button from '@common_button';
import gqlService from '@sellermodules/storeintegration/services/graphql';
import { sendDataLayer } from '@helper_gtm';

const createStoreModal = (prop) => {
    const router = useRouter();
    const {
        classes, webstoreInput, getWebstoreList, setActiveTab, t,
    } = prop;
    const webstoreCode = webstoreInput?.selectedWebstore?.webstore_code;
    const [isSubmit, setIsSubmit] = React.useState(false);
    const [modalDisabled, setModalDisabled] = React.useState(false);
    const { data: getWebstoreConfig } = gqlService.getWebstoreConfiguration();

    const [createWebstore] = gqlService.createWebstore();
    const [registerBrandMp] = gqlService.registerBrandMp();
    const [connectSellerMp] = gqlService.connectSellerMp();

    const getCoreDomain = () => {
        const [filterConfig] = getWebstoreConfig?.getWebstoreConfiguration[0]
            ?.fields?.filter((e) => e.id === 'webstore_multitenant/general/url') || [];
        const filterResult = filterConfig?.value || '';
        const domainName = filterResult.replace(/^(https?:\/\/)?/, '');
        return domainName;
    };

    const webstoreValidation = [
        {
            webstore_code: 'SHOPIFY',
            required_data: ['shop_id', 'shop_secret'],
            submit: (values, brand_id = false) => {
                setIsSubmit(true);
                webstoreInput.setCreationStatus('in-progress');
                window.backdropLoader(false);

                setTimeout(async () => {
                    const mpCode = 'shopify';
                    let brandId;

                    if (brand_id !== false) {
                        brandId = brand_id;
                    } else {
                        const registerBrand = await registerBrandMp({
                            variables: {
                                marketplace_code: mpCode,
                            },
                        });
                        brandId = registerBrand?.data?.registerBrandMp;
                    }

                    const credentials = {
                        shop_id: {
                            data_type: 'string',
                            value: values.shop_id,
                        },
                        shop_secret: {
                            data_type: 'string',
                            value: values.shop_secret,
                        },
                        type: {
                            data_type: 'string',
                            value: 'secret_key',
                        },
                    };

                    await connectSellerMp({
                        variables: {
                            input: {
                                brand_id: brandId,
                                marketplace_code: mpCode,
                                credentials: JSON.stringify(credentials),
                            },
                        },
                    }).then(() => {
                        const dataLayer = {
                            event: 'store_integration',
                            eventLabel: 'Sales Channel - Store Integration',
                            event_data: {
                                marketplace_code: mpCode,
                            },
                        };
                        sendDataLayer(dataLayer);

                        window.backdropLoader(true);
                        webstoreInput.setModal(false);
                        webstoreInput.setCreationStatus(null);
                        webstoreInput.setUrlEditMode(false);
                        window.toastMessage({
                            open: true,
                            text: t('sellerstoreintegration:The_store_has_been_successfully_integrated'),
                            variant: 'success',
                        });

                        setIsSubmit(false);

                        setTimeout(() => router.push('/seller/saleschannels/storelist'), 3000);
                    }).catch((error) => {
                        webstoreInput.setCreationStatus(false);
                        webstoreInput.setUrlEditMode(false);
                        webstoreInput.setCreationStatus(null);
                        window.toastMessage({
                            open: true,
                            text: error.message,
                            variant: 'error',
                        });

                        setIsSubmit(false);
                    });
                }, 1500);
            },
        },
        {
            webstore_code: 'SWIFTSTORE',
            required_data: ['store_name', 'store_code'],
            submit: (values) => {
                setIsSubmit(true);
                webstoreInput.setCreationStatus('in-progress');
                window.backdropLoader(false);

                setTimeout(async () => {
                    await createWebstore({
                        variables: {
                            input: {
                                ...values,
                                framework: webstoreInput?.selectedWebstore?.framework,
                            },
                        },
                    }).then(() => {
                        window.backdropLoader(true);
                        webstoreInput.setModal(false);
                        webstoreInput.setCreationStatus(null);
                        webstoreInput.setUrlEditMode(false);
                        window.toastMessage({
                            open: true,
                            text: t('sellerstoreintegration:The_store_has_been_successfully_integrated'),
                            variant: 'success',
                        });

                        setIsSubmit(false);

                        setTimeout(() => router.push('/seller/saleschannels/storelist'), 3000);
                    }).catch(() => {
                        if (webstoreInput.modal === true) {
                            webstoreInput.setCreationStatus(false);
                            webstoreInput.setUrlEditMode(false);
                        } else {
                            webstoreInput.setCreationStatus(null);

                            window.toastMessage({
                                open: true,
                                text: t('domain_taken'),
                                variant: 'error',
                            });
                        }
                        setIsSubmit(false);
                        window.backdropLoader(false);
                    });
                }, 1500);
            },
        },
    ];

    const formik = useFormik({
        initialValues: {},
        onSubmit: (values) => {
            const submitData = {};
            const [data] = webstoreValidation?.filter((e) => e?.webstore_code === webstoreCode) || [];
            data?.required_data?.forEach((e) => {
                submitData[e] = values[e];
            });

            if (webstoreCode.toLowerCase() === 'shopify') {
                data.submit(submitData, webstoreInput.currentStore);
            } else {
                data.submit(submitData);
            }
        },
    });

    const validationSchema = (type = false) => {
        try {
            const [data] = webstoreValidation?.filter((e) => e?.webstore_code === webstoreCode) || [];
            const checkValue = data?.required_data?.map((e) => formik?.values[e] || false).filter((e) => e !== false);
            if (type === 'reset') {
                data?.required_data?.forEach((e) => {
                    formik.setFieldValue(e, '');
                });
            }
            return data?.required_data && checkValue.length >= data?.required_data?.length;
            // eslint-disable-next-line no-empty
        } catch (e) { }

        return false;
    };

    React.useEffect(() => {
        if (webstoreInput.currentStore !== false && modalDisabled === false) {
            const [searchWebtoreItem] = getWebstoreList?.filter((item) => item.marketplace_code.toLowerCase() === 'shopify') || [];
            if (searchWebtoreItem) {
                setModalDisabled(true);
                webstoreInput.setSelectedWebstore(searchWebtoreItem);
                webstoreInput.setModal(true);
                webstoreInput.setUrlEditMode(false);
                webstoreInput.setCreationStatus(null);
                setActiveTab('webstore');
            }
        }
    }, [getWebstoreList]);

    return (
        <AppModal
            title={<strong style={{ fontSize: 20 }}>{webstoreInput?.selectedWebstore?.marketplace_name}</strong>}
            show={webstoreInput.modal}
            onHandleClose={() => {
                if (webstoreInput.currentStore === false) {
                    webstoreInput.setModal(false);
                } else {
                    router.push('/seller/saleschannels/storelist');
                }

                validationSchema('reset');
                if (isSubmit === true) {
                    window.backdropLoader(true);
                }
            }}
            closeButton="x"
        >
            <div style={{ marginTop: 20 }}>
                {webstoreInput?.creationStatus === 'in-progress' && (
                    <p style={{ fontSize: 16 }}>{t('please_wait')}</p>
                )}
                {!webstoreInput?.creationStatus && (
                    <>
                        {webstoreInput?.selectedWebstore?.webstore_code === 'SWIFTSTORE' && (
                            <>
                                <div style={{ marginBottom: 10 }}><label style={{ fontWeight: 600 }}>{t('store_name')}</label></div>
                                <div style={{ marginBottom: 20 }}>
                                    <input
                                        name="store_name"
                                        className={classes.inputField}
                                        disabled={webstoreInput.urlEditMode}
                                        onChange={(e) => {
                                            if (!webstoreInput.urlEditMode) {
                                                formik.setFieldValue('store_name', e?.target?.value.trim());
                                            }
                                            formik.setFieldValue('store_code', e?.target?.value?.toLowerCase()?.trim()
                                                ?.replace(/[^a-zA-Z0-9]+/g, '-'));
                                            webstoreInput.setCreationStatus(null);
                                        }}
                                        style={{ width: '100%' }}
                                    />

                                    <p title={`https://${formik?.values?.store_code || 'domain-name'}.${getCoreDomain()}`}>

                                        <img
                                            src="/assets/img/link.png"
                                            style={{
                                                width: 20, marginRight: 10, position: 'relative', top: 5,
                                            }}
                                            alt="link"
                                        />
                                        {' '}
                                        https://

                                        {webstoreInput.urlEditMode === true && (
                                            <>
                                                <input
                                                    className={classes.inputUrl}
                                                    value={formik?.values?.store_code}
                                                    onChange={(e) => {
                                                        formik.setFieldValue('store_code', e?.target?.value?.toLowerCase()
                                                            ?.trim()?.replace(/[^a-zA-Z0-9]+/g, '-'));
                                                    }}
                                                />
                                                .
                                                {getCoreDomain()}
                                            </>
                                        )}

                                        {webstoreInput.urlEditMode !== true && (
                                            <>
                                                <strong style={{ fontWeight: 600 }}>{formik?.values?.store_code || 'domain-name'}</strong>
                                                .
                                                {getCoreDomain()}
                                            </>
                                        )}

                                        {formik?.values?.store_name && (
                                            <button
                                                className={classes.btnGrey}
                                                onClick={() => webstoreInput.setUrlEditMode(!webstoreInput.urlEditMode)}
                                            >
                                                {webstoreInput.urlEditMode ? t('Save') : t('change_url')}
                                            </button>
                                        )}
                                        {webstoreInput.creationStatus === false && (
                                            <p className={classes.errorAlert}>{t('domain_taken')}</p>
                                        )}
                                    </p>
                                </div>
                            </>
                        )}

                        {webstoreInput?.selectedWebstore?.webstore_code === 'SHOPIFY' && (
                            <>
                                <div style={{ marginBottom: 10 }}><label style={{ fontWeight: 600 }}>Shop ID</label></div>
                                <div style={{ marginBottom: 20 }}>
                                    <TextField
                                        name="shop_id"
                                        onChange={formik?.handleChange}
                                        style={{ width: '100%' }}
                                        disabled={isSubmit}
                                    />
                                </div>
                                <div style={{ marginBottom: 10 }}><label style={{ fontWeight: 600 }}>Shop Secret</label></div>
                                <div style={{ marginBottom: 20 }}>
                                    <TextField
                                        name="shop_secret"
                                        onChange={formik?.handleChange}
                                        style={{ width: '100%', border: '1px transparent solid' }}
                                        disabled={isSubmit}
                                    />
                                </div>
                            </>
                        )}

                        <div style={{ marginTop: 30 }}>
                            <Button
                                disabled={!validationSchema() || isSubmit || webstoreInput.urlEditMode}
                                onClick={formik.handleSubmit}
                            >
                                {t('sellerstoreintegration:Integrate')}
                            </Button>

                            <p>
                                {t('Need_help')}
                                {' '}
                                <a href="#" className={classes.link}>{t('integrate_store')}</a>
                            </p>
                        </div>
                    </>
                )}
            </div>
        </AppModal>
    );
};

export default createStoreModal;
