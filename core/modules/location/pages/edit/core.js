/* eslint-disable no-nested-ternary */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable max-len */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/location/services/graphql';
import aclService from '@modules/theme/services/graphql';
import {
    optionsYesNo, daysName,
} from '@modules/location/helpers';
import ErrorRedirect from '@common_errorredirect';
import userGqlService from '@modules/dashboard/services/graphql';
import BackdropLoad from '@helper_backdropload';
import { regexPhoneDial } from '@helper_regex';

const ContentWrapper = (props) => {
    const {
        data,
        customer,
        Content,
        getCountries,
        getCountriesRes,
        shipperIdConfig,
        logistixConfig,
        lionParcelConfig,
        t,
    } = props;
    const router = useRouter();
    const location = data.getLocationById;
    const [getZoneList, getZoneListRes] = gqlService.getZoneList();
    const [updateLocation] = gqlService.updateLocation();

    const [firstLoad, setFirstLoad] = React.useState(true);
    const [mapPosition, setMapPosition] = React.useState({
        lat: location.loc_lat || '-6.197361',
        lng: location.loc_long || '106.774535',
    });

    const [dialCode, setDialCode] = React.useState('62');
    const useRegexPhone = regexPhoneDial(dialCode);

    const handleSubmit = ({
        company,
        loc_code,
        loc_name,
        street,
        countries,
        region,
        city,
        telephone,
        postcode,
        longitude,
        latitude,
        zone,
        warehouse,
        useFrontend,
        virtualLocation,
        priority,
        status,
        qty_buffer,
        is_manage_stock,
        is_shipment_auto_complete,
        shipper_id,
        logistix,
        lionCode,
        loc_operational_time,
    }) => {
        const variables = {
            id: location.loc_id,
            company_id: company.company_id,
            loc_code,
            loc_name,
            loc_street: street,
            loc_country_id: countries.id,
            loc_region: region.name,
            loc_city: city.value,
            loc_telephone: telephone,
            loc_postcode: postcode,
            loc_long: String(longitude),
            loc_lat: String(latitude),
            loc_zone: zone?.zone ?? '',
            is_warehouse: warehouse?.id,
            use_in_frontend: useFrontend?.id,
            is_virtual_location: virtualLocation?.id,
            priority: Number(priority || null),
            is_active: status ? 1 : 0,
            qty_buffer: Number(qty_buffer),
            is_manage_stock: is_manage_stock?.id,
            is_shipment_auto_complete: is_shipment_auto_complete?.id,
            shipper_id,
            logistix_credentials_flag_wahana: logistix,
            lion_client_code: lionCode,
            loc_operational_time,
        };
        window.backdropLoader(true);
        updateLocation({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('location:Location_saved_successfully'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/oms/location'), 250);
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

    const defaultOperationTime = daysName.map((day) => {
        const dayToAssign = location.loc_operational_time?.find((opr) => opr?.day === day);
        return ({
            day,
            is_active: dayToAssign?.is_active || false,
            open_at: dayToAssign?.open_at || '',
            close_at: dayToAssign?.close_at || '',
        });
    });

    const operationTimeValidation = Yup.array().of(Yup.object().shape({
        day: Yup.string(),
        is_active: false,
        open_at: Yup.string().typeError(t('location:This_is_a_Required_field')).when('is_active', {
            is: true,
            then: Yup.string().typeError(t('location:This_is_a_Required_field')).required(t('location:This_is_a_Required_field')),
        }),
        close_at: Yup.string().typeError(t('location:This_is_a_Required_field')).when('is_active', {
            is: true,
            then: Yup.string().typeError(t('location:This_is_a_Required_field')).required(t('location:This_is_a_Required_field')),
        }),
    }));

    const formik = useFormik({
        initialValues: {
            company: {
                company_id: location.company.company_id,
                company_name: location.company.company_name,
            },
            loc_code: location.loc_code || '',
            loc_name: location.loc_name || '',
            street: location.loc_street || '',
            countries: getCountriesRes.data?.countries.find((e) => e.id === location.loc_country_id),
            region: {
                id: location.loc_region.id,
                name: location.loc_region.label,
            },
            city: {
                value: location.loc_city.id,
                label: location.loc_city.label,
            },
            telephone: location.loc_telephone || '',
            postcode: location.loc_postcode || '',
            longitude: location.loc_long || '',
            latitude: location.loc_lat || '',
            zone: getZoneListRes.data?.getZoneList?.items?.find((z) => z?.zone === location.loc_zone) || location.loc_zone,
            warehouse: optionsYesNo.find((e) => e.id === location.is_warehouse),
            useFrontend: optionsYesNo.find((e) => e.id === location.use_in_frontend),
            virtualLocation: optionsYesNo.find((e) => e.id === location.is_virtual_location),
            priority: location.priority || null,
            status: location.is_active === 1 ? true : false,
            qty_buffer: location.qty_buffer,
            is_manage_stock: optionsYesNo.find((e) => e.id === location.is_manage_stock),
            is_shipment_auto_complete: optionsYesNo.find((e) => e.id === location.is_shipment_auto_complete),
            shipper_id: location.shipper_id || '',
            logistix: location.logistix_credentials_flag_wahana || '',
            lionCode: location.lion_client_code || '',
            loc_operational_time: defaultOperationTime,
        },
        validationSchema: Yup.object().shape({
            company: Yup.object().typeError(t('location:This_is_a_Required_field')).required(t('location:This_is_a_Required_field')),
            loc_code: Yup.string().required(t('location:This_is_a_Required_field')),
            loc_name: Yup.string().required(t('location:This_is_a_Required_field')),
            street: Yup.string().required(t('location:This_is_a_Required_field')),
            countries: Yup.object().typeError(t('location:This_is_a_Required_field')).required(t('location:This_is_a_Required_field')),
            region: Yup.object().typeError(t('location:This_is_a_Required_field')).required(t('location:This_is_a_Required_field')),
            city: Yup.object().typeError(t('location:This_is_a_Required_field')).required(t('location:This_is_a_Required_field')),
            telephone: Yup.string().nullable().matches(useRegexPhone, t('location:Invalid_phone_number_format')).required(t('location:This_is_a_Required_field')),
            postcode: Yup.string().required(t('location:This_is_a_Required_field')),
            longitude: Yup.number().required(t('location:This_is_a_Required_field')),
            latitude: Yup.number().required(t('location:This_is_a_Required_field')),
            zone: Yup.object().nullable(),
            warehouse: Yup.object().nullable(),
            useFrontend: Yup.object().nullable(),
            virtualLocation: Yup.object().nullable(),
            priority: Yup.number().nullable(),
            status: Yup.object().nullable(),
            qty_buffer: Yup.number().nullable(),
            is_manage_stock: Yup.object().nullable(),
            is_shipment_auto_complete: Yup.object().nullable(),
            shipper_id: Yup.string().nullable(),
            logistix: Yup.string().nullable(),
            lionCode: Yup.string().nullable(),
            loc_operational_time: operationTimeValidation,
        }),
        onSubmit: (values) => {
            const { addressDetail, ...restValues } = values;
            handleSubmit(restValues);
        },
    });

    const handleDragPosition = (value) => {
        if (firstLoad) {
            setFirstLoad(false);
        } else {
            setMapPosition(value);
            formik.setFieldValue('longitude', value.lng);
            formik.setFieldValue('latitude', value.lat);
        }
    };

    React.useEffect(() => {
        if (data.getLocationById.loc_zone) {
            getZoneList({
                variables: {
                    filter: {
                        zone: { eq: data.getLocationById.loc_zone },
                    },
                    pageSize: 1,
                    currentPage: 1,
                },
            });
        }
    }, []);

    React.useEffect(() => {
        if (data.getLocationById.loc_zone && getZoneListRes.data?.getZoneList?.items) {
            const val = getZoneListRes.data?.getZoneList?.items?.find((z) => z?.zone === location.loc_zone);
            formik.setFieldValue('zone', val || location.loc_zone);
        }
    }, [getZoneListRes.data]);

    const contentProps = {
        formik,
        customer,
        getCountries,
        getCountriesRes,
        handleDragPosition,
        mapPosition,
        shipperIdConfig,
        logistixConfig,
        lionParcelConfig,
        t,
        setDialCode,
        ...props,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const { loading, data, error } = gqlService.getLocationById({
        id: router && router.query && Number(router.query.id),
    });

    const { data: customerData, loading: customerLoading } = userGqlService.getCustomer();
    const [getCountries, getCountriesRes] = gqlService.getCountries();

    const { loading: loadingConfigApi, data: dataConfigApi } = gqlService.getStoreConfig({
        path: 'swiftoms_general/google_map/api_key',
    });

    const { loading: loadingConfigEnable, data: dataConfigEnable } = gqlService.getStoreConfig({
        path: 'swiftoms_general/google_map/enabled',
    });

    React.useEffect(() => {
        getCountries();
    }, []);

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_location',
    });

    const { loading: loadingShipperIdConfig, data: shipperIdConfig } = gqlService.getStoreConfig({
        path: 'carriers/shipperid/active',
    });

    const { loading: loadingLogistixConfig, data: logistixConfig } = gqlService.getStoreConfig({
        path: 'swiftoms_logistix/general/enable_generate_awb',
    });

    const { loading: loadingLionParcelConfig, data: lionParcelConfig } = gqlService.getStoreConfig({
        path: 'carriers/lionparcel/active',
    });

    React.useEffect(() => {
        BackdropLoad(loading || customerLoading || aclCheckLoading || getCountriesRes.loading
            || loadingShipperIdConfig || loadingLogistixConfig || loadingLionParcelConfig
            || loadingConfigApi || loadingConfigEnable);
    }, [loading, customerLoading, aclCheckLoading, getCountriesRes.loading,
        loadingShipperIdConfig, loadingLogistixConfig, loadingLionParcelConfig,
        loadingConfigApi, loadingConfigEnable]);

    if (
        loading || customerLoading || aclCheckLoading || getCountriesRes.loading
        || loadingShipperIdConfig || loadingLogistixConfig || loadingLionParcelConfig
        || loadingConfigApi || loadingConfigEnable
    ) {
        return <Layout />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('location:Data_not_found');
        const redirect = '/oms/location';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        data,
        customer: customerData?.customer,
        getCountries,
        getCountriesRes,
        enableMap: dataConfigEnable?.getStoreConfig === '1',
        gmapKey: dataConfigApi?.getStoreConfig || '',
        shipperIdConfig: shipperIdConfig?.getStoreConfig,
        logistixConfig: logistixConfig?.getStoreConfig,
        lionParcelConfig: lionParcelConfig?.getStoreConfig,
        t,
    };

    return (
        <Layout>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
