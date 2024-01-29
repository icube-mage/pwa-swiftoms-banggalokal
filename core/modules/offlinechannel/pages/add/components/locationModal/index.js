import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@modules/location/services/graphql';
import Content from '@modules/offlinechannel/pages/add/components/locationModal/view';
import { regexPhoneDial } from '@helper_regex';

const Core = (props) => {
    const { handleOpen, handleClose, t } = props;
    const [createLocation] = gqlService.createLocation();

    const [dialCode, setDialCode] = React.useState('62');
    const useRegexPhone = regexPhoneDial(dialCode);
    const [mapPosition, setMapPosition] = React.useState({
        lat: '-6.197361',
        lng: '106.774535',
    });

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
        code,
        name,
        street,
        countries,
        region,
        city,
        telephone,
        postcode,
        longitude,
        latitude,
    }) => {
        const variables = {
            company_id: company.company_id,
            loc_code: code,
            loc_name: name,
            loc_street: street,
            loc_country_id: countries.id,
            loc_region: region.name,
            loc_city: city.value,
            loc_telephone: telephone,
            loc_postcode: postcode,
            loc_long: String(longitude),
            loc_lat: String(latitude),
        };
        handleClose();
        window.backdropLoader(true);
        createLocation({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('offlinechannel:New_Location_has_been_successfully_created'),
                    variant: 'success',
                });
            })
            .catch((e) => {
                window.backdropLoader(false);
                handleOpen();
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const formik = useFormik({
        initialValues: {
            company: null,
            code: '',
            name: '',
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
        },
        validationSchema: Yup.object().shape({
            company: Yup.object().typeError(t('offlinechannel:This_is_a_Required_field'))
                .required(t('offlinechannel:This_is_a_Required_field')),
            code: Yup.string().required(t('offlinechannel:This_is_a_Required_field')),
            name: Yup.string().required(t('offlinechannel:This_is_a_Required_field')),
            street: Yup.string().required(t('offlinechannel:This_is_a_Required_field')),
            countries: Yup.object().typeError(t('offlinechannel:This_is_a_Required_field')).required(t('offlinechannel:This_is_a_Required_field')),
            region: Yup.object().typeError(t('offlinechannel:This_is_a_Required_field')).required(t('offlinechannel:This_is_a_Required_field')),
            city: Yup.object().typeError(t('offlinechannel:This_is_a_Required_field')).required(t('offlinechannel:This_is_a_Required_field')),
            telephone: Yup.string().nullable().matches(useRegexPhone, t('offlinechannel:Invalid_phone_number_format'))
                .required(t('offlinechannel:This_is_a_Required_field')),
            postcode: Yup.string().required(t('offlinechannel:This_is_a_Required_field')),
            longitude: Yup.string().required(t('offlinechannel:This_is_a_Required_field')),
            latitude: Yup.string().required(t('offlinechannel:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const handleDragPosition = (value) => {
        setMapPosition(value);
        formik.setFieldValue('longitude', value.lng);
        formik.setFieldValue('latitude', value.lat);
    };

    const contentProps = {
        formik,
        t,
        setDialCode,
        handleDragPosition,
        mapPosition,
        ...props,
    };

    return (
        <Content {...contentProps} />
    );
};

export default Core;
