/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import {
    GoogleMap,
    Autocomplete,
    Marker,
    useJsApiLoader,
} from '@react-google-maps/api';
import CustomTextField from '@common_textfield';
import { useTranslation } from '@i18n';
import { ERROR } from '@theme_color';

// Set map container size
const containerStyle = {
    width: '100%',
    height: '230px',
};

const containerErrorStyle = {
    border: `1px solid ${ERROR}`,
};

// Set initial refs for google maps instance
const refs = {
    marker: null,
    autoComplete: null,
    googleMap: null,
};

// Get autocomplete components instance
const autoCompleteLoad = (ref) => {
    refs.autoComplete = ref;
};

// Get marker components instance
const markerLoad = (ref) => {
    refs.marker = ref;
};

// Get google map instance
const mapLoad = (ref) => {
    refs.googleMap = ref;
};

const IcubeMapsAutocomplete = (props) => {
    const { t } = useTranslation('common');
    const {
        gmapKey,
        formik,
        dragMarkerDone,
        defaultZoom = 17,
        formikName = 'addressDetail',
        addressLabel = t('common:Address_Detail'),
        placeholder = t('common:Please_input_your_address_detail'),
        className = {},
        customLabel = () => { },
        mapStyle = {},
        mapPosition: mapPositionProps = {},
        required = true,
        ...other
    } = props;

    const capitalizeEachWord = (str = '') => str.toLowerCase().split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    // set libraries to use in Google Maps API
    const [error, setError] = useState('');
    const [mapContainerStyle, setMapContainerStyle] = useState({ ...containerStyle, ...mapStyle });
    const [libraries] = useState(['places', 'geometry']);
    const isErrorForm = required && formik && (!!(formik.touched.latitude && formik.errors.latitude) || !!(formik.touched.longitude && formik.errors.longitude));
    // Set initial bounds to autocomplete services
    const [stateBounds, setStateBounds] = useState({
        northeast: {},
        southwest: {},
    });

    // Initiate google maps instance with configurations
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: gmapKey,
        libraries,
    });

    const setZeroIfEmpty = (value) => {
        const emptyValues = [undefined, null, '', 'undefined', 'null'];
        return emptyValues.includes(value) ? 0 : Number(value);
    };

    // Get initial map coordinates if user already saved an address before or fetch from browser's navigator location
    const mapPosition = {
        lat: setZeroIfEmpty(mapPositionProps && mapPositionProps.lat),
        lng: setZeroIfEmpty(mapPositionProps && mapPositionProps.lng),
    };

    // Set a new coordinates information when user drag the marker icon
    const handleDragEnd = (event) => {
        const newPosition = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };
        dragMarkerDone(newPosition);
    };

    // Set address detail fields value on formik when user select a location on autocomplete box
    const onPlaceChanged = () => {
        // const compareStreetName = () => {}
        if (refs.autoComplete !== null) {
            const { name, address_components, geometry } = refs.autoComplete.getPlace();
            const tempInputValue = formik.values[formikName];
            const street_name = address_components.filter((item) => item.types.includes('route'));

            dragMarkerDone({
                lat: geometry.location.lat(),
                lng: geometry.location.lng(),
            });

            if (tempInputValue !== name) {
                if (street_name[0] !== undefined) {
                    if (street_name[0].long_name === name) {
                        if (tempInputValue === street_name[0].long_name || tempInputValue === street_name[0].short_name) {
                            formik.setFieldValue(formikName, `${street_name[0].long_name}`);
                        } else if (tempInputValue.length < street_name[0].long_name.length || tempInputValue.length === street_name[0].long_name.length) {
                            formik.setFieldValue(formikName, `${street_name[0].long_name}`);
                        } else {
                            formik.setFieldValue(formikName, capitalizeEachWord(tempInputValue));
                        }
                    } else if (tempInputValue.length > name.length) {
                        if (tempInputValue.toLowerCase().includes(street_name[0].long_name.toLowerCase()) || tempInputValue.toLowerCase().includes(street_name[0].short_name.toLowerCase()) || tempInputValue.toLowerCase().includes(name.toLowerCase())) {
                            // eslint-disable-next-line max-len
                            if (tempInputValue.toLowerCase().includes(`${street_name[0].long_name.toLowerCase()} ${name.toLowerCase()}`) || tempInputValue.toLowerCase().includes(`${street_name[0].short_name.toLowerCase()} ${name.toLowerCase()}`)) {
                                formik.setFieldValue(formikName, capitalizeEachWord(tempInputValue));
                            } else {
                                formik.setFieldValue(formikName, `${street_name[0].short_name} ${name}`);
                            }
                        } else {
                            formik.setFieldValue(formikName, capitalizeEachWord(tempInputValue));
                        }
                    } else if (name.length > street_name[0].short_name.length && (name.toLowerCase().includes(street_name[0].short_name.toLowerCase()) || name.toLowerCase().includes(street_name[0].long_name.toLowerCase()))) {
                        formik.setFieldValue(formikName, name);
                    } else if (name.toLowerCase().includes('street')) {
                        formik.setFieldValue(formikName, `${street_name[0].short_name}`);
                    } else {
                        formik.setFieldValue(formikName, `${street_name[0].short_name} ${name}`);
                    }
                } else if (tempInputValue.length > name.length) {
                    formik.setFieldValue(formikName, capitalizeEachWord(tempInputValue));
                } else {
                    formik.setFieldValue(formikName, name);
                }
            } else {
                formik.setFieldValue(formikName, name);
            }
        }
    };

    useEffect(() => {
        if (formik !== false) {
            if (formik.values.city !== '' && formik.values.city !== undefined && formik.values.city !== null) {
                fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${formik.values?.city?.label?.split(', ').join('+')}&language=id&key=${gmapKey}`)
                    .then((response) => response.json())
                    .then((responseData) => {
                        setError('');
                        if (responseData.results.length > 0) {
                            const { bounds, location } = responseData.results[0].geometry;
                            formik.setFieldValue('longitude', location.lng);
                            formik.setFieldValue('latitude', location.lat);
                            dragMarkerDone(location);
                            setStateBounds({
                                northeast: {
                                    lat: parseFloat(bounds.northeast.lat),
                                    lng: parseFloat(bounds.northeast.lng),
                                },
                                southwest: {
                                    lat: parseFloat(bounds.southwest.lat),
                                    lng: parseFloat(bounds.southwest.lng),
                                },
                            });
                        } else if (responseData.error_message) {
                            throw Error(responseData.error_message);
                        }
                    })
                    .catch((e) => {
                        setError(e);
                    });
            }
        }
    }, [formik.values.city]);

    useEffect(() => {
        if (error) {
            window.toastMessage({
                open: true,
                text: t('common:Something_went_wrong_while_trying_to_get_your_location_error_Please_check_your_API_key', { error }),
                variant: 'error',
            });
        }
    }, [error]);

    useEffect(() => {
        if (isErrorForm) {
            setMapContainerStyle({ ...containerStyle, ...mapStyle, ...containerErrorStyle });
        } else {
            setMapContainerStyle({ ...containerStyle, ...mapStyle });
        }
    }, [isErrorForm]);

    // eslint-disable-next-line arrow-body-style
    const renderMap = () => {
        return (
            <>
                <Autocomplete
                    onLoad={autoCompleteLoad}
                    onPlaceChanged={onPlaceChanged}
                    options={{
                        // eslint-disable-next-line no-undef
                        bounds: new google.maps.LatLngBounds(
                            // eslint-disable-next-line no-undef
                            new google.maps.LatLng(parseFloat(stateBounds.southwest.lat !== undefined ? stateBounds.southwest.lat : mapPosition.lat),
                                parseFloat(stateBounds.southwest.lng !== undefined ? stateBounds.southwest.lng : mapPosition.lng)),
                            // eslint-disable-next-line no-undef
                            new google.maps.LatLng(parseFloat(stateBounds.northeast.lat !== undefined ? stateBounds.northeast.lat : mapPosition.lat),
                                parseFloat(stateBounds.northeast.lng !== undefined ? stateBounds.northeast.lng : mapPosition.lng)),
                        ),
                        strictBounds: true,
                    }}
                >
                    <>
                        {customLabel && customLabel()}
                        <CustomTextField
                            autoComplete="new-password"
                            label={customLabel ? null : addressLabel}
                            placeholder={placeholder}
                            name={formikName}
                            value={formik.values[formikName]}
                            onChange={(e) => { formik.handleChange(e); }}
                            error={!!(formik.touched[formikName] && formik.errors[formikName])}
                            helperText={(formik.touched[formikName] && formik.errors[formikName]) || null}
                            onFocus={(e) => {
                                e.target.setAttribute('autocomplete', 'off');
                                e.target.setAttribute('autocorrect', 'false');
                                e.target.setAttribute('aria-autocomplete', 'both');
                                e.target.setAttribute('aria-haspopup', 'false');
                                e.target.setAttribute('spellcheck', 'off');
                                e.target.setAttribute('autocapitalize', 'off');
                                e.target.setAttribute('autofocus', '');
                                e.target.setAttribute('role', 'combobox');
                            }}
                            fullWidth
                            className={className}
                            {...other}
                        />
                    </>
                </Autocomplete>
                <GoogleMap
                    id="google-maps-container"
                    mapContainerStyle={mapContainerStyle}
                    center={mapPosition}
                    onLoad={mapLoad}
                    onError={(e) => setError(e)}
                    zoom={defaultZoom}
                    options={{
                        restriction: {
                            // eslint-disable-next-line no-undef
                            latLngBounds: new google.maps.LatLngBounds(
                                // eslint-disable-next-line no-undef
                                new google.maps.LatLng(parseFloat(stateBounds.southwest.lat !== undefined ? stateBounds.southwest.lat : mapPosition.lat - 0.025),
                                    parseFloat(stateBounds.southwest.lng !== undefined ? stateBounds.southwest.lng : mapPosition.lng - 0.025)),
                                // eslint-disable-next-line no-undef
                                new google.maps.LatLng(parseFloat(stateBounds.northeast.lat !== undefined ? stateBounds.northeast.lat : mapPosition.lat + 0.025),
                                    parseFloat(stateBounds.northeast.lng !== undefined ? stateBounds.northeast.lng : mapPosition.lng + 0.025)),
                            ),
                            strictBounds: true,
                        },
                    }}
                >
                    <Marker
                        onLoad={markerLoad}
                        position={mapPosition}
                        onDragEnd={(event) => handleDragEnd(event)}
                        draggable
                    />
                </GoogleMap>
                {
                    isErrorForm
                    && (
                        <div style={{
                            color: ERROR,
                            fontSize: '.75rem',
                            marginTop: 10,
                        }}
                        >
                            {t('common:Please_pinpoint_your_location')}
                        </div>
                    )
                }
            </>
        );
    };

    if (loadError) {
        return <div>{t('common:_please_check_your_internet_connection')}</div>;
    }

    return isLoaded ? renderMap() : <div>Loading map...</div>;
};

export default IcubeMapsAutocomplete;
