/* eslint-disable max-len */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/location/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { optionsYesNo, daysName } from '@modules/location/helpers';
import userGqlService from '@modules/dashboard/services/graphql';
import BackdropLoad from '@helper_backdropload';
import { regexPhoneDial } from '@helper_regex';

const CoreContent = (props) => {
    const { Content, t } = props;
    const router = useRouter();
    const [createLocation] = gqlService.createLocation();
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);

    const [mapPosition, setMapPosition] = React.useState({
        lat: '-6.197361',
        lng: '106.774535',
    });

    const [dialCode, setDialCode] = React.useState('62');
    const useRegexPhone = regexPhoneDial(dialCode);

    const displayLocationInfo = (position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;

        setMapPosition({
            lat,
            lng,
        });
    };

    React.useMemo(() => {
        // only set current location for add mode
        if (typeof window !== 'undefined' && navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(displayLocationInfo);
        }
        // update map position after edit data
    }, []);

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
        is_create_source_all_products,
        shipper_id,
        logistix,
        lionCode,
        loc_operational_time,
    }) => {
        const variables = {
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
            is_create_source_all_products,
            shipper_id,
            logistix_credentials_flag_wahana: logistix,
            lion_client_code: lionCode,
            loc_operational_time,
        };
        window.backdropLoader(true);
        createLocation({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('location:Location_created_successfully'),
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

    const defaultOperationTime = daysName.map((day) => ({
        day,
        is_active: false,
        open_at: '',
        close_at: '',
    }));

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
            addressDetail: '',
            company: null,
            loc_code: '',
            loc_name: '',
            street: '',
            countries: {
                full_name_english: 'Indonesia',
                id: 'ID',
            },
            region: '',
            city: '',
            telephone: '',
            postcode: '',
            longitude: '',
            latitude: '',
            zone: { id: 0, name: 'jawa' },
            warehouse: { id: 0, name: 'No' },
            useFrontend: optionsYesNo[1],
            virtualLocation: { id: 0, name: 'No' },
            priority: '',
            status: true,
            qty_buffer: '',
            is_manage_stock: optionsYesNo[1],
            is_shipment_auto_complete: optionsYesNo[0],
            is_create_source_all_products: false,
            shipper_id: '',
            logistix: '',
            lionCode: '',
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
        setMapPosition(value);
        formik.setFieldValue('longitude', value.lng);
        formik.setFieldValue('latitude', value.lat);
    };

    const contentProps = {
        formik,
        handleDragPosition,
        mapPosition,
        openConfirmDialog,
        setOpenConfirmDialog,
        t,
        setDialCode,
        ...props,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_location',
    });

    const { data: customerData, loading: customerLoading } = userGqlService.getCustomer();

    const { loading: loadingConfigApi, data: dataConfigApi } = gqlService.getStoreConfig({
        path: 'swiftoms_general/google_map/api_key',
    });

    const { loading: loadingConfigEnable, data: dataConfigEnable } = gqlService.getStoreConfig({
        path: 'swiftoms_general/google_map/enabled',
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
        BackdropLoad(aclCheckLoading || customerLoading || loadingShipperIdConfig || loadingLogistixConfig || loadingLionParcelConfig
            || loadingConfigApi || loadingConfigEnable);
    }, [aclCheckLoading, customerLoading, loadingShipperIdConfig, loadingLogistixConfig, loadingLionParcelConfig,
        loadingConfigApi, loadingConfigEnable]);

    if (aclCheckLoading || customerLoading || loadingShipperIdConfig || loadingLogistixConfig || loadingLionParcelConfig
        || loadingConfigApi || loadingConfigEnable) {
        return <Layout />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        customer: customerData?.customer,
        enableMap: dataConfigEnable?.getStoreConfig === '1',
        gmapKey: dataConfigApi?.getStoreConfig || '',
        shipperIdConfig: shipperIdConfig?.getStoreConfig,
        logistixConfig: logistixConfig?.getStoreConfig,
        lionParcelConfig: lionParcelConfig?.getStoreConfig,
        t,
        ...props,
    };

    return (
        <Layout>
            <CoreContent {...contentProps} />
        </Layout>
    );
};

export default Core;
