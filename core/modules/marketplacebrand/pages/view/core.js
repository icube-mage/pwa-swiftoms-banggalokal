import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/marketplacebrand/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';

const ContentWrapper = (props) => {
    const {
        data, Content, dataLocation, refetch,
    } = props;
    const router = useRouter();
    const mpData = data.getAvailableMpToConnect;

    const [mpActive, setMpActive] = React.useState({});
    const [showModal, setShowModal] = React.useState(false);

    // mutation
    const [registerMarketplaceChannel] = gqlService.registerMarketplaceChannel();
    const [updateMarketplaceLocation] = gqlService.updateMarketplaceLocation();
    const [reconnectMarketplaceChannel] = gqlService.reconnectMarketplaceChannel();
    const [disconnectMarketplaceChannel] = gqlService.disconnectMarketplaceChannel();
    const [getMarketplaceShippingMethods, marketplaceShippingMethodsRes] = gqlService.getMarketplaceShippingMethods({
        marketplace_code: mpActive.marketplace_code,
    });

    const schemaObj = (schemaType) => {
        const initialValue = {};
        const type = {
            string: Yup.string().required('Required!'),
            number: Yup.number().required('Required!'),
        };
        if (mpActive?.credentials?.type === 'oauth2') {
            return initialValue;
        }
        return mpActive?.credentials?.fields?.reduce(
            (obj, item) => ({
                ...obj,
                [item.name]: schemaType === 'validation' ? type[item.type] : '',
            }),
            initialValue,
        );
    };

    const handleSubmit = (input) => {
        setShowModal(false);
        const variables = { input };
        window.backdropLoader(true);
        registerMarketplaceChannel({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Marketplace has been registered successfully',
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
                setShowModal(true);
            });
    };

    const handleUpdateLocation = (variables) => {
        setShowModal(false);
        window.backdropLoader(true);
        updateMarketplaceLocation({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'The marketplace details has been saved.',
                    variant: 'success',
                });
                setTimeout(() => router.push(mpActive.credentials?.url), 250);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
                setShowModal(true);
            });
    };

    const handleDisconnect = (mp) => {
        window.backdropLoader(true);
        disconnectMarketplaceChannel({
            variables: {
                input: {
                    brand_id: mpData.brand_id,
                    marketplace_code: mp.marketplace_code,
                },
            },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'The marketplace has been disconnected.',
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

    const handleReconnect = (mp) => {
        window.backdropLoader(true);
        reconnectMarketplaceChannel({
            variables: {
                input: {
                    brand_id: mpData.brand_id,
                    marketplace_code: mp.marketplace_code,
                },
            },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'The marketplace has been reconnected',
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
            location: [],
            ...schemaObj(),
        },
        validationSchema: Yup.object().shape({
            location: Yup.array().of(Yup.object()).min(1).required('Required!'),
            ...schemaObj('validation'),
        }),
        onSubmit: (values) => {
            const { location, ...restValues } = values;
            const valueToSubmit = {
                brand_id: mpData.brand_id,
                loc_id: location.map((loc) => Number(loc.loc_id)),
                marketplace_code: mpActive.marketplace_code,
            };
            if (mpActive?.credentials?.type === 'oauth2') {
                handleUpdateLocation(valueToSubmit);
            } else {
                const keys = Object.keys(restValues);
                if (keys.length) {
                    let credentials = {};
                    keys.forEach((key) => {
                        let data_type = 'string';
                        let value = String(restValues[key]);
                        if (mpActive.marketplace_code === 'TKPD' && (key === 'fs_id' || key === 'shop_id')) {
                            data_type = 'integer';
                            value = Number(restValues[key]);
                        }
                        credentials[key] = { data_type, value };
                    });
                    credentials = {
                        ...credentials,
                        type: {
                            data_type: 'string',
                            value: mpActive.credentials.type,
                        },
                    };
                    if (mpActive.marketplace_code === 'JDID') {
                        credentials = {
                            ...credentials,
                            callback_success: {
                                data_type: 'string',
                                value: `${window.origin}${router.asPath}`,
                            },
                            callback_failure: {
                                data_type: 'string',
                                value: `${window.origin}${router.asPath}`,
                            },
                        };
                    }
                    valueToSubmit.credentials = JSON.stringify(credentials);
                } else {
                    valueToSubmit.credentials = '{}';
                }
                handleSubmit(valueToSubmit);
            }
        },
    });

    const contentProps = {
        formik,
        mpData,
        dataLocation: dataLocation.getLocationList.items,
        mpActive,
        setMpActive,
        handleDisconnect,
        handleReconnect,
        getMarketplaceShippingMethods,
        marketplaceShippingMethodsRes,
        showModal,
        setShowModal,
    };

    return <Content {...contentProps} />;
};

const SecondCore = (props) => {
    const router = useRouter();
    const pageConfig = {
        title: `View Marketplace Brand #${router?.query?.id}`,
    };
    const { loading: loadingLocation, data: dataLocation } = gqlService.getLocationList();
    const {
        loading, data, refetch, error,
    } = gqlService.getAvailableMpToConnect({
        store_id: router && router.query && Number(router.query.id),
        callback_url: `${window.origin}${router.asPath}`,
    });

    if (loading || loadingLocation) {
        return (
            <div
                style={{
                    display: 'flex',
                    color: '#435179',
                    fontWeight: 600,
                    justifyContent: 'center',
                    padding: '20px 0',
                }}
            >
                Loading get Marketplaces . . .
            </div>
        );
    }

    if (!data) {
        const errMsg = error?.message ?? 'Data not found!';
        const redirect = '/configurations/marketplacebrand';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    const contentProps = {
        data,
        dataLocation,
        refetch,
    };

    return (
        <ContentWrapper {...contentProps} {...props} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const pageConfig = {
        title: `View Marketplace Brand #${router?.query?.id}`,
    };
    const [updateConnectedMarketplace, { loading }] = gqlService.updateConnectedMarketplace({});

    React.useEffect(() => {
        updateConnectedMarketplace({
            variables: { store_id: router && router.query && Number(router.query.id) },
        });
    }, []);

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_header_mpadapter',
    });

    if (loading || aclCheckLoading) {
        return (
            <Layout pageConfig={pageConfig}>
                <div
                    style={{
                        display: 'flex',
                        color: '#435179',
                        fontWeight: 600,
                        justifyContent: 'center',
                        padding: '20px 0',
                    }}
                >
                    Loading update Marketplaces . . .
                </div>
            </Layout>
        );
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout pageConfig={pageConfig}>
            <SecondCore {...props} />
        </Layout>
    );
};

export default Core;
