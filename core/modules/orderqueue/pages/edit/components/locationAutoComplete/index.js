/* eslint-disable no-unused-expressions */
import Autocomplete from '@common_autocomplete';
import gqlService from '@modules/orderqueue/services/graphql';
import { useEffect, useRef } from 'react';

const locationAutoComplete = (props) => {
    const {
        classes, item, idx, touched, errors, setFieldValue, channelCode, values,
    } = props;
    const [getLocationBySourceAndChannel, getLocationBySourceAndChannelRes] = gqlService.getLocationBySourceAndChannel();

    const firstRender = useRef(true);

    const handleChange = (val) => {
        setFieldValue(`order_items.[${idx}].loc_code`, val);
        if (item.bundle_children?.length) {
            item.bundle_children?.forEach((child) => {
                const cidx = values.order_items.findIndex((value) => value.id === child.id);
                if (cidx >= 0) {
                    setFieldValue(`order_items.[${cidx}].loc_code`, val);
                }
            });
        }
    };

    useEffect(() => {
        if (firstRender.current) {
            if (typeof item.loc_code === 'string') {
                getLocationBySourceAndChannel({
                    variables: {
                        sku: item.sku,
                        channel_code: channelCode,
                    },
                });
            }
            firstRender.current = false;
            return;
        }
        getLocationBySourceAndChannel({
            variables: {
                sku: item.sku,
                channel_code: channelCode,
            },
        });
    }, [item]);

    const locationOptions = getLocationBySourceAndChannelRes?.data?.getLocationBySourceAndChannel || [];
    return (
        <Autocomplete
            mode="lazy"
            className={classes.autocompleteRoot}
            name={`order_items.[${idx}].loc_code`}
            value={(() => {
                if (typeof item.loc_code === 'string') {
                    if (locationOptions && Array.isArray(locationOptions)) {
                        const location = locationOptions.find((loc) => loc.loc_code === item.loc_code);
                        return location || { loc_code: item.loc_code, loc_name: item.loc_code };
                    }
                    return { loc_code: item.loc_code, loc_name: item.loc_code };
                }
                return item.loc_code;
            })()}
            onChange={(val) => handleChange(val)}
            primaryKey="loc_code"
            labelKey="loc_name"
            options={locationOptions}
            getOptions={() => {
                getLocationBySourceAndChannel({
                    variables: {
                        sku: item.sku,
                        channel_code: channelCode,
                    },
                });
            }}
            loading={!firstRender.current && getLocationBySourceAndChannelRes?.loading}
            error={!!(touched.location && errors.location)}
            helperText={(touched.location && errors.location) || ''}
            fullWidth
        />
    );
};

export default locationAutoComplete;
