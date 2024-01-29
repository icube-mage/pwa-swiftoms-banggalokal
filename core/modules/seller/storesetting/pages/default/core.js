import { useState } from 'react';
import Layout from '@layout';
import themeService from '@modules/theme/services/graphql';
import gqlService from '@sellermodules/storesetting/services/graphql';
import BackdropLoad from '@helper_backdropload';
import ErrorRedirect from '@common_errorredirect';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const ContentWrapper = (props) => {
    const {
        Content, t, dataStore, refetch, refetchLocation, dataBanner, refetchBanner, refetchWindow,
    } = props;

    const [open, setOpen] = useState(false);
    const [dataLoc, setDataLoc] = useState({});

    const [saveSeller] = gqlService.saveSeller();
    const [updateSellerStoreStatus] = gqlService.updateSellerStoreStatus();
    const [deleteSellerStore] = gqlService.deleteSellerStore();

    const [saveSellerBanner] = gqlService.saveSellerBanner();

    const [deleteSellerEtalase] = gqlService.deleteSellerEtalase();
    const [updateSellerEtalase] = gqlService.updateSellerEtalase();

    // Location
    const handleUpdateStatusLocation = (id, is_active) => {
        window.backdropLoader(true);
        updateSellerStoreStatus({
            variables: { input: { id, is_active } },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('storesetting:Location_has_been_updated'),
                variant: 'success',
            });
            setTimeout(() => refetchLocation(), 250);
        })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const handleDeleteLocation = () => {
        setOpen(false);
        window.backdropLoader(true);
        deleteSellerStore({
            variables: { id: dataLoc.id },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('storesetting:Location_has_been_deleted'),
                variant: 'success',
            });
            setDataLoc({});
            setTimeout(() => refetchLocation(), 250);
        }).catch((e) => {
            window.backdropLoader(false);
            setOpen(true);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const handleSubmit = (input) => {
        window.backdropLoader(true);
        saveSeller({
            variables: { input },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('storesetting:Store_setting_has_been_saved'),
                variant: 'success',
            });
            setTimeout(() => refetch(), 250);
        })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const formik = useFormik({
        initialValues: {
            description: dataStore?.description,
            status: dataStore?.status ?? true,
            logo: dataStore?.logo,
            name: dataStore?.name || '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('storesetting:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const handleDropFile = (files) => {
        formik.setFieldValue('logo', files[0].baseCode);
    };

    // Banner
    // eslint-disable-next-line consistent-return
    const handleSaveBanner = (values, valuesMobile) => {
        // eslint-disable-next-line no-useless-escape
        const expression = /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/gi;
        const regex = new RegExp(expression);

        // Desktop
        const everyHasValue = values.every((val) => val.banner.length && val.banner.every((ban) => ban.url || ban.binary));
        const everyCarouselMin = values.filter((val) => val.type === 'carousel')
            .every((val) => val.banner.length >= 2 && val.banner.every((ban) => ban.url || ban.binary));
        const everyLinkValid = values.every((val) => val.banner.every((ban) => (ban.hyperlink ? ban.hyperlink.match(regex) : true)));

        // Mobile
        const everyMobHasValue = valuesMobile.every((val) => val.banner.length && val.banner.every((ban) => ban.url || ban.binary));
        const everyCarouselMobMin = valuesMobile.filter((val) => val.type === 'carousel')
            .every((val) => val.banner.length >= 2 && val.banner.every((ban) => ban.url || ban.binary));
        const everyLinkMobValid = valuesMobile.every((val) => val.banner.every((ban) => (ban.hyperlink ? ban.hyperlink.match(regex) : true)));

        if (!everyHasValue || !everyMobHasValue) {
            return window.toastMessage({
                open: true,
                text: t('storesetting:Make_sure_all_components_has_image_or_video'),
                variant: 'error',
            });
        }
        if (!everyCarouselMin || !everyCarouselMobMin) {
            return window.toastMessage({
                open: true,
                text: t('storesetting:Minimal_2_items_are_assigned_in_carousel'),
                variant: 'error',
            });
        }
        if (!everyLinkValid || !everyLinkMobValid) {
            return window.toastMessage({
                open: true,
                text: t('storesetting:Hyperlink_must_be_valid_URL'),
                variant: 'error',
            });
        }

        const inputDesktop = values.map((val, i) => ({
            banner: val.banner.map((ban, bi) => ({
                binary: ban.binary,
                hyperlink: ban.hyperlink,
                position: bi + 1,
                replaced_image_url: ban.url && ban.binary ? ban.url : null,
                type: ban.type,
                url: ban.binary ? '' : ban.url,
            })),
            is_mobile: false,
            position: i + 1,
            type: val.type,
        }));
        const inputMobile = valuesMobile.map((val, i) => ({
            banner: val.banner.map((ban, bi) => ({
                binary: ban.binary,
                hyperlink: ban.hyperlink,
                position: bi + 1,
                replaced_image_url: ban.url && ban.binary ? ban.url : null,
                type: ban.type,
                url: ban.binary ? '' : ban.url,
            })),
            is_mobile: true,
            position: i + 1,
            type: val.type,
        }));

        window.backdropLoader(true);
        saveSellerBanner({
            variables: { input: [...inputDesktop, ...inputMobile] },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('storesetting:Banner_has_been_saved'),
                variant: 'success',
            });
            setTimeout(() => refetchBanner(), 250);
        })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    // Display Window
    const handleFeatured = (item) => {
        let is_pinned;
        if (item.is_pinned) {
            is_pinned = false;
        } else {
            is_pinned = true;
        }
        const variables = {
            id: item.entity_id,
            input: {
                name: item.name_origin,
                is_pinned,
            },
        };
        window.backdropLoader(true);
        updateSellerEtalase({
            variables,
        })
            .then(() => {
                refetchWindow();
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('storesetting:Display_window_has_been_updated'),
                    variant: 'success',
                });
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const handleMove = (item, position) => {
        const variables = {
            id: item.entity_id,
            input: {
                name: item.name_origin,
                position: position - 1,
            },
        };
        window.backdropLoader(true);
        updateSellerEtalase({
            variables,
        })
            .then(() => {
                refetchWindow();
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('storesetting:Display_window_has_been_updated'),
                    variant: 'success',
                });
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const handleDelete = (item, set) => {
        const variables = {
            id: item.entity_id,
        };
        set({});
        window.backdropLoader(true);
        deleteSellerEtalase({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('storesetting:Display_window_has_been_deleted'),
                    variant: 'success',
                });
                setTimeout(() => refetchWindow(), 250);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
                setTimeout(() => { window.backdropLoader(false); set(item); }, 250);
            });
    };

    const handleUpload = (item, binary, set, after) => {
        const variables = {
            id: item.entity_id,
            input: {
                name: item.name_origin,
            },
        };
        if (binary) {
            variables.input.image = {
                binary,
            };
        } else {
            variables.input.image = {
                url: item.image,
            };
        }
        set({});
        window.backdropLoader(true);
        updateSellerEtalase({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('storesetting:Display_window_has_been_updated'),
                    variant: 'success',
                });
                setTimeout(() => { after(); refetchWindow(); }, 250);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
                setTimeout(() => { window.backdropLoader(false); set(item); }, 250);
            });
    };

    const contentProps = {
        ...props,
        formik,
        handleDropFile,
        handleUpdateStatusLocation,
        handleDeleteLocation,
        open,
        setOpen,
        dataLoc,
        setDataLoc,
        handleSaveBanner,
        dataBannerDesktop: dataBanner.filter((ban) => !ban.is_mobile),
        dataBannerMobile: dataBanner.filter((ban) => ban.is_mobile),
        handleFeatured,
        handleMove,
        handleDelete,
        handleUpload,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('storesetting:Store_Setting'),
    };

    const {
        loading, data, refetch, error,
    } = gqlService.getSeller();
    const {
        loading: loadLocation, data: dataLocation, refetch: refetchLocation,
    } = gqlService.getSellerStores({
        variables: {
            pageSize: 1000,
            currentPage: 1,
        },
    });
    const { loading: loadBanner, data: dataBanner, refetch: refetchBanner } = gqlService.getSellerBanners();

    const [getSellerEtalaseList, { data: dataWindow, loading: loadingWindow, refetch: refetchWindow }] = gqlService.getSellerEtalaseList();

    const { loading: loadCurrency, data: dataCurrency } = themeService.getCurrency();
    const { loading: aclCheckLoading, data: aclCheckData } = themeService.isAccessAllowed({
        acl_code: 'seller_store_location_add',
    });

    React.useEffect(() => {
        BackdropLoad(loading || loadCurrency || aclCheckLoading || loadBanner);
    }, [loading, loadCurrency, aclCheckLoading, loadBanner]);

    if (loading || loadCurrency || aclCheckLoading || loadBanner) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    if ((!data?.getSeller || error)) {
        const errMsg = (error?.message) ?? t('productlist:Data_not_found');
        const redirect = '/seller/order';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} isSeller />;
    }

    const contentProps = {
        ...props,
        dataStore: data?.getSeller,
        refetch,
        currency: dataCurrency?.currency?.base_currency_symbol || dataCurrency?.currency?.base_currency_code,
        dataLocation: dataLocation?.getSellerStores?.items || [],
        refetchLocation,
        loadLocation,
        aclAddLocation: aclCheckData?.isAccessAllowed ?? false,
        dataBanner: dataBanner.getSellerBanners || [],
        refetchBanner,
        getSellerEtalaseList,
        dataWindow: dataWindow || {},
        refetchWindow,
        loadingWindow,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <ContentWrapper {...contentProps} />
        </Layout>
    );
};

export default Core;
