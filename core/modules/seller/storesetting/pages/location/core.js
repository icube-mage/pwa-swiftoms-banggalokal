import Layout from '@layout';
import themeService from '@modules/theme/services/graphql';
import gqlLocation from '@modules/location/services/graphql';
import gqlService from '@sellermodules/storesetting/services/graphql';
import BackdropLoad from '@helper_backdropload';
import ErrorRedirect from '@common_errorredirect';
import { regexPhoneDial } from '@helper_regex';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

const ContentWrapper = (props) => {
    const {
        Content, t, dataStore, dataShipment, dataShipping, isEdit,
        countryOptions,
        regionOptions,
        cityOptions,
    } = props;
    const router = useRouter();

    const [getCountries, getCountriesRes] = gqlLocation.getCountries();
    const [getCountry, getCountryRes] = gqlLocation.getCountry();
    const [getCityKecByRegionCode, getCityKecByRegionCodeRes] = gqlLocation.getCityKecByRegionCode();

    const [first, setFirst] = React.useState(true);
    const [dialCode, setDialCode] = React.useState('62');
    const flatRate = dataShipment.find((shipment) => shipment.provider === 'FLATRATE');

    const [mapPosition, setMapPosition] = React.useState({
        lat: dataStore?.latitude ? String(dataStore?.latitude) : '-6.197361',
        lng: dataStore?.longitude ? String(dataStore?.longitude) : '106.774535',
    });

    const displayLocationInfo = (position) => {
        const lng = dataStore?.longitude ? String(dataStore?.longitude) : position.coords.longitude;
        const lat = dataStore?.latitude ? String(dataStore?.latitude) : position.coords.latitude;

        setMapPosition({
            lat,
            lng,
        });
    };

    const shipmentGroup = () => {
        const values = [];
        const keys = {};
        const valid = {};
        const shipping = [];
        if (dataShipment?.length) {
            dataShipment.forEach((shipment) => {
                const code = `${shipment.provider.replaceAll(' ', '')}_${shipment.shipping_code}`;
                const value = [keys[code]
                    ?.value, (dataStore?.shipping_methods || [])
                        ?.includes(shipment.entity_id)]
                    .some((el) => (el) === true);

                keys[code] = {
                    services_id: [...(keys[code]?.services_id || []), shipment.entity_id],
                    value,
                };

                if (value && !shipping.includes(code)) {
                    shipping.push(code);
                }

                keys[code].selected = dataStore?.shipping_methods
                    ?.filter((v) => keys[code]?.services_id?.includes(v));

                const existIdx = values.findIndex((data) => ((data.provider === shipment.provider)
                    && (data.shipping_code === shipment.shipping_code)));

                if (existIdx >= 0) {
                    values[existIdx] = {
                        ...values[existIdx],
                        service: `${values[existIdx].service}, ${shipment.service}`,
                        options: [...values[existIdx].options, shipment],
                        shipping_code: shipment.shipping_code,
                    };
                } else {
                    values.push({
                        code,
                        provider: shipment.provider,
                        service: shipment.service,
                        shipping_method_logo_url: shipment.shipping_method_logo_url,
                        options: [shipment],
                        shipping_code: shipment.shipping_code,
                    });
                }

                const temp = [];
                temp.push(['value', Yup.boolean()]);
                if (shipment.provider !== 'FLATRATE') {
                    temp.push(['selected', Yup.array().of(Yup.number()).when('value', {
                        is: true,
                        then: Yup.array().of(Yup.number()).min(1, t('storesetting:Choose_at_least_min_key', { min: 1, key: 'service' })),
                    })]);
                }
                valid[code] = Yup.object().shape(Object.fromEntries(temp));
            });
        }
        return {
            values, keys, valid, shipping,
        };
    };

    const [saveSellerStore] = gqlService.saveSellerStore();
    const handleSubmit = (input) => {
        window.backdropLoader(true);
        saveSellerStore({
            variables: { input },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('storesetting:Location_has_been_saved'),
                variant: 'success',
            });
            setTimeout(() => router.push('/seller/storesetting/location'), 250);
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

    const useRegexPhone = regexPhoneDial(dialCode);
    const formik = useFormik({
        initialValues: {
            city: cityOptions.find((city) => city.value === (dataStore?.city)) || null,
            country_id: countryOptions.find((country) => country.id === (dataStore?.country_id || 'ID')),
            flatrate_price: dataStore?.flatrate_price || 0,
            is_active: dataStore?.is_active ?? true,
            latitude: dataStore?.latitude ? Number(dataStore?.latitude) : '',
            longitude: dataStore?.longitude ? Number(dataStore?.longitude) : '',
            name: dataStore?.name || '',
            postcode: dataStore?.postcode || '',
            region: regionOptions.find((region) => region.code === (dataStore?.region))
                || regionOptions.find((region) => region.name === (dataStore?.region)) || null,
            street: dataStore?.street || '',
            telephone: dataStore?.telephone || '',
            address: '',
            shipping: shipmentGroup().shipping,
            is_flatrate: !!dataStore?.shipping_methods?.find((id) => Number(id) === Number(flatRate?.entity_id)) || false,
            ...shipmentGroup().keys,
        },
        validationSchema: Yup.object().shape({
            country_id: Yup.object().typeError(t('storesetting:This_is_a_Required_field'))
                .required(t('storesetting:This_is_a_Required_field')),
            region: Yup.object().typeError(t('storesetting:This_is_a_Required_field'))
                .required(t('storesetting:This_is_a_Required_field')),
            city: Yup.object().typeError(t('storesetting:This_is_a_Required_field'))
                .required(t('storesetting:This_is_a_Required_field')),
            latitude: Yup.number().typeError(t('storesetting:Value_must_be_a_number')).required(t('storesetting:This_is_a_Required_field')),
            longitude: Yup.number().typeError(t('storesetting:Value_must_be_a_number')).required(t('storesetting:This_is_a_Required_field')),
            name: Yup.string().required(t('storesetting:This_is_a_Required_field')),
            postcode: Yup.number().typeError(t('storesetting:Value_must_be_a_number')).required(t('storesetting:This_is_a_Required_field')),
            street: Yup.string().required(t('storesetting:This_is_a_Required_field')),
            telephone: Yup.string().required(t('storesetting:This_is_a_Required_field')).typeError(t('storesetting:This_is_a_Required_field'))
                .matches(useRegexPhone, t('storesetting:Invalid_phone_number_format')),
            shipping: dataShipping && Yup.array().of(Yup.string()).min(1, t('storesetting:Choose_at_least_min_key', { min: 1, key: 'provider' })),
            is_flatrate: Yup.boolean(),
            flatrate_price: !!flatRate && Yup.number().when('is_flatrate', {
                is: true,
                then: Yup.number()
                    .nullable()
                    .typeError(t('storesetting:Value_must_be_a_number')),
            }),
            ...shipmentGroup().valid,
        }),
        onSubmit: (values) => {
            const {
                country_id, region, city, latitude, longitude, postcode, address, shipping,
                is_flatrate, flatrate_price, ...restValues
            } = values;
            const valueToSubmit = {
                ...restValues,
                country_id: country_id.id,
                region: region.code,
                city: city.value,
                latitude: String(latitude),
                longitude: String(longitude),
                postcode: String(postcode),
                shipping_methods: [],
            };
            const keys = Object.keys(shipmentGroup().keys);
            if (dataShipping) {
                let temp = [];
                keys.filter((key) => key !== 'FLATRATE').forEach((key) => {
                    if (valueToSubmit[key].value) {
                        temp = [...temp, ...valueToSubmit[key].selected];
                    }
                });
                valueToSubmit.shipping_methods = temp;
            }
            keys.forEach((key) => {
                delete valueToSubmit[key];
            });
            if (is_flatrate && !!flatRate) {
                valueToSubmit.flatrate_price = flatrate_price ? Number(flatrate_price) : 0;
                valueToSubmit.shipping_methods.push(Number(flatRate?.entity_id));
            }
            if (isEdit) {
                valueToSubmit.id = Number(dataStore?.id);
            }
            handleSubmit(valueToSubmit);
        },
    });

    const handleDragPosition = (value) => {
        if (first) {
            setFirst(false);
        } else {
            setMapPosition(value);
            formik.setFieldValue('longitude', value.lng);
            formik.setFieldValue('latitude', value.lat);
        }
    };

    React.useMemo(() => {
        if (typeof window !== 'undefined' && navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(displayLocationInfo);
        }
    }, []);

    const contentProps = {
        ...props,
        formik,
        getCountries,
        getCountriesRes,
        getCountry,
        getCountryRes,
        getCityKecByRegionCode,
        getCityKecByRegionCodeRes,
        mapPosition,
        setMapPosition,
        handleDragPosition,
        setDialCode,
        shipmentGroup: shipmentGroup().values,
        dataShipping,
        flatRate,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();

    const { id } = router.query;
    const isEdit = !!id;
    const pageConfig = {
        title: isEdit ? t('storesetting:Edit_Location') : t('storesetting:Add_Location'),
    };

    const {
        loading: loadStore, data: dataStore, error,
    } = gqlService.getSellerStores({
        skip: !isEdit,
        variables: {
            pageSize: 1,
            currentPage: 1,
            filter: {
                loc_id: {
                    eq: id,
                },
            },
        },
    });
    const { loading: loadShipment, data: dataShipment } = gqlService.getSellerShippingMethods();

    const { loading: loadMap, data: dataMap } = themeService.getStoreConfig({
        path: 'swiftoms_general/google_map/api_key',
    });
    const { loading: loadEnableMap, data: dataEnableMap } = themeService.getStoreConfig({
        path: 'swiftoms_general/google_map/enabled',
    });
    const { loading: loadShipping, data: dataShipping } = gqlService.getStoreConfig({
        path: 'swiftoms_vendorportal/store/general/enable_store_shipping',
    });
    const { loading: loadCurrency, data: dataCurrency } = themeService.getCurrency();

    const [getCountries, getCountriesRes] = gqlLocation.getCountries();
    const [getCountry, getCountryRes] = gqlLocation.getCountry();
    const [getCityKecByRegionCode, getCityKecByRegionCodeRes] = gqlLocation.getCityKecByRegionCode();

    React.useEffect(() => {
        getCountries();
        if (dataStore?.getSellerStores?.items?.[0]) {
            if (dataStore?.getSellerStores?.items?.[0]?.country_id) {
                getCountry({ variables: { id: dataStore?.getSellerStores?.items?.[0]?.country_id } });
            }
            if (dataStore?.getSellerStores?.items?.[0]?.region) {
                getCityKecByRegionCode({ variables: { region_code: dataStore?.getSellerStores?.items?.[0]?.region } });
            }
        }
    }, [dataStore?.getSellerStores]);

    React.useEffect(() => {
        BackdropLoad(loadMap || loadEnableMap || loadStore || loadShipment || loadShipping || loadCurrency
            || getCountriesRes.loading || getCountryRes.loading || getCityKecByRegionCodeRes.loading);
    }, [loadMap, loadEnableMap, loadStore, loadShipment, loadShipping, loadCurrency,
        getCountriesRes.loading, getCountryRes.loading, getCityKecByRegionCodeRes.loading]);

    if (loadMap || loadEnableMap || loadStore || loadShipment || loadShipment || loadShipping || loadCurrency
        || getCountriesRes.loading || getCountryRes.loading || getCityKecByRegionCodeRes.loading) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    if (isEdit && !dataStore?.getSellerStores?.items?.[0]) {
        const errMsg = error?.message ?? t('productlist:Data_not_found');
        const redirect = '/seller/storesetting/location';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} isSeller />;
    }

    const contentProps = {
        ...props,
        isEdit,
        enableMap: dataEnableMap?.getStoreConfig === '1',
        gmapKey: dataMap?.getStoreConfig,
        dataStore: dataStore?.getSellerStores?.items?.[0],
        dataShipment: dataShipment.getSellerShippingMethods,
        countryOptions: (getCountriesRes && getCountriesRes.data && getCountriesRes.data.countries) || [],
        regionOptions: (getCountryRes && getCountryRes.data && getCountryRes.data.country && getCountryRes.data.country.available_regions) || [],
        cityOptions: (getCityKecByRegionCodeRes && getCityKecByRegionCodeRes.data && getCityKecByRegionCodeRes.data.getCityKecByRegionCode) || [],
        dataShipping: JSON.parse(dataShipping.getStoreConfig),
        currency: dataCurrency?.currency?.base_currency_symbol || dataCurrency?.currency?.base_currency_code,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <ContentWrapper {...contentProps} />
        </Layout>
    );
};

export default Core;
