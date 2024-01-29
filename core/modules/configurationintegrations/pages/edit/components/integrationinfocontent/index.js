/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from 'react';
import clsx from 'clsx';

import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';

import gqlCompany from '@modules/company/services/graphql';
import gqlLocation from '@modules/location/services/graphql';
import gqlChannel from '@modules/channel/services/graphql';

import { conditionsOptions } from '@modules/configurationintegrations/helpers';
import useStyles from '@modules/configurationintegrations/pages/edit/components/integrationinfocontent/style';

const IntegrationInfoContent = (props) => {
    const {
        formik, t, integration,
    } = props;
    const classes = useStyles();

    const [getCompanyList, getCompanyListRes] = gqlCompany.getCompanyList();
    const [companyOption, setCompanyOption] = useState([]);
    const [searchCompany, setSearchCompany] = useState('');

    const [getLocationList, getLocationListRes] = gqlLocation.getLocationList();
    const [locationOption, setLocationOption] = useState([]);
    const [searchLocation, setSearchLocation] = useState('');

    const [getChannelList, getChannelListRes] = gqlChannel.getChannelList();
    const [channelOption, setChannelOption] = useState([]);
    const [searchChannel, setSearchChannel] = useState('');

    React.useEffect(() => {
        if (
            getCompanyListRes
            && getCompanyListRes.data
            && getCompanyListRes.data.getCompanyList
            && getCompanyListRes.data.getCompanyList.items
        ) {
            const ids = new Set(companyOption.map((d) => d.company_id));
            setCompanyOption([...companyOption, ...getCompanyListRes.data.getCompanyList.items.filter((d) => !ids.has(d.company_id))]);
        }
    }, [getCompanyListRes.data]);

    React.useEffect(() => {
        const onChangeTimeOut = setTimeout(() => {
            if (searchCompany) {
                getCompanyList({
                    variables: {
                        filter: {
                            company_name: {
                                like: searchCompany,
                            },
                        },
                        pageSize: 20,
                        currentPage: 1,
                    },
                });
            }

            return null;
        }, 500);

        return () => clearTimeout(onChangeTimeOut);
    }, [searchCompany]);

    React.useEffect(() => {
        if (
            getLocationListRes
            && getLocationListRes.data
            && getLocationListRes.data.getLocationList
            && getLocationListRes.data.getLocationList.items
        ) {
            const ids = new Set(locationOption.map((d) => d.loc_id));
            setLocationOption([...locationOption, ...getLocationListRes.data.getLocationList.items.filter((d) => !ids.has(d.loc_id))]);
        }
    }, [getLocationListRes.data]);

    React.useEffect(() => {
        const onChangeTimeOut = setTimeout(() => {
            if (searchLocation) {
                getLocationList({
                    variables: {
                        search: searchLocation,
                        pageSize: 20,
                        currentPage: 1,
                    },
                });
            }

            return null;
        }, 500);

        return () => clearTimeout(onChangeTimeOut);
    }, [searchLocation]);

    React.useEffect(() => {
        if (
            getChannelListRes
            && getChannelListRes.data
            && getChannelListRes.data.getChannelList
            && getChannelListRes.data.getChannelList.items
        ) {
            const ids = new Set(channelOption.map((d) => d.channel_id));
            setChannelOption([...channelOption, ...getChannelListRes.data.getChannelList.items.filter((d) => !ids.has(d.channel_id))]);
        }
    }, [getChannelListRes.data]);

    React.useEffect(() => {
        const onChangeTimeOut = setTimeout(() => {
            if (searchChannel) {
                getChannelList({
                    variables: {
                        search: searchChannel,
                        pageSize: 20,
                        currentPage: 1,
                    },
                });
            }

            return null;
        }, 500);

        return () => clearTimeout(onChangeTimeOut);
    }, [searchChannel]);

    return (
        <>
            <div className={classes.sectionHead}>
                <h5 className={classes.sectionTitle}>{t('configurationintegrations:Integration_Info')}</h5>
            </div>
            <div className={classes.content}>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={clsx(classes.label, classes.labelRequired)}>{t('configurationintegrations:Integration_Name')}</span>
                    </div>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={!!(formik.touched.name && formik.errors.name)}
                        helperText={(formik.touched.name && formik.errors.name) || ''}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                        inputProps={{
                            autocomplete: 'new-password',
                            form: {
                                autocomplete: 'off',
                            },
                        }}
                    />
                </div>
            </div>
            <div className={classes.content}>
                {formik.values.conditions?.map((cond, condIdx) => (
                    <div className={classes.conditionDiv}>
                        <div className={classes.topCondition}>
                            <h5 className={classes.titleCondition}>{t('configurationintegrations:Condition')}</h5>
                            <IconButton
                                className={classes.deleteconditions}
                                onClick={() => {
                                    const temp = formik.values.conditions;
                                    temp.splice(condIdx, 1);
                                    formik.setFieldValue('conditions', temp);
                                }}
                            >
                                <img
                                    src="/assets/img/trash.svg"
                                    alt="trash"
                                    className={classes.trash}
                                />
                            </IconButton>

                        </div>
                        <div className={classes.formField}>
                            <Autocomplete
                                className={classes.autocompleteRoot}
                                value={formik.values.conditions?.[condIdx]?.type}
                                onChange={(e) => {
                                    formik.setFieldValue(`conditions[${condIdx}].type`, e);
                                }}
                                options={conditionsOptions.filter((opt) => {
                                    const allconditions = formik.values.conditions.map((formCond) => formCond.type && formCond.type.value);
                                    return !allconditions.includes(opt.value) || opt.value === cond.type?.value;
                                })}
                                error={!!(formik.touched.conditions?.[condIdx]?.type && formik.errors.conditions?.[condIdx]?.type)}
                                helperText={(formik.touched.conditions?.[condIdx]?.type && formik.errors.conditions?.[condIdx]?.type) || ''}
                                primaryKey="value"
                                labelKey="label"
                            />
                            {cond.type?.value === 'company_id'
                                && (
                                    <Autocomplete
                                        mode={companyOption.length > 0 ? 'default' : 'lazy'}
                                        className={classes.autocompleteRoot}
                                        value={formik.values.conditions?.[condIdx]?.value}
                                        onChange={(e) => formik.setFieldValue(`conditions[${condIdx}].value`, e)}
                                        error={!!(formik.touched.conditions?.[condIdx]?.value && formik.errors.conditions?.[condIdx]?.value)}
                                        helperText={(formik.touched.conditions?.[condIdx]?.value && formik.errors.conditions?.[condIdx]?.value) || ''}
                                        getOptions={getCompanyList}
                                        getOptionsVariables={{
                                            variables: {
                                                filter: {
                                                    company_name: {
                                                        like: searchCompany,
                                                    },
                                                },
                                                pageSize: 20,
                                                currentPage: 1,
                                            },
                                        }}
                                        loading={getCompanyListRes.loading}
                                        options={companyOption}
                                        primaryKey="company_id"
                                        labelKey="company_name"
                                        onInputChange={(e) => setSearchCompany(e && e.target && e.target.value)}
                                        multiple
                                    />
                                )}

                            {cond.type?.value === 'loc_id'
                                && (
                                    <Autocomplete
                                        mode={locationOption.length > 0 ? 'default' : 'lazy'}
                                        className={classes.autocompleteRoot}
                                        value={formik.values.conditions?.[condIdx]?.value}
                                        onChange={(e) => formik.setFieldValue(`conditions[${condIdx}].value`, e)}
                                        error={!!(formik.touched.conditions?.[condIdx]?.value && formik.errors.conditions?.[condIdx]?.value)}
                                        helperText={(formik.touched.conditions?.[condIdx]?.value && formik.errors.conditions?.[condIdx]?.value) || ''}
                                        getOptions={getLocationList}
                                        getOptionsVariables={{
                                            variables: {
                                                search: searchLocation,
                                                pageSize: 20,
                                                currentPage: 1,
                                            },
                                        }}
                                        loading={getLocationListRes.loading}
                                        options={locationOption}
                                        primaryKey="loc_id"
                                        labelKey="loc_name"
                                        onInputChange={(e) => setSearchLocation(e && e.target && e.target.value)}
                                        multiple
                                    />
                                )}

                            {cond.type?.value === 'channel_id'
                                && (
                                    <Autocomplete
                                        mode={channelOption.length > 0 ? 'default' : 'lazy'}
                                        className={classes.autocompleteRoot}
                                        value={formik.values.conditions?.[condIdx]?.value}
                                        onChange={(e) => formik.setFieldValue(`conditions[${condIdx}].value`, e)}
                                        error={!!(formik.touched.conditions?.[condIdx]?.value && formik.errors.conditions?.[condIdx]?.value)}
                                        helperText={(formik.touched.conditions?.[condIdx]?.value && formik.errors.conditions?.[condIdx]?.value) || ''}
                                        getOptions={getChannelList}
                                        getOptionsVariables={{
                                            variables: {
                                                search: searchChannel,
                                                pageSize: 20,
                                                currentPage: 1,
                                            },
                                        }}
                                        loading={getChannelListRes.loading}
                                        options={channelOption}
                                        primaryKey="channel_id"
                                        labelKey="channel_name"
                                        onInputChange={(e) => setSearchChannel(e && e.target && e.target.value)}
                                        multiple
                                    />
                                )}
                        </div>
                    </div>
                ))}
                {formik.values.conditions?.length < 3
                    && (
                        <IconButton
                            className={classes.addCondition}
                            onClick={() => {
                                const temp = formik.values.conditions;
                                temp.push({ type: null, value: [] });
                                formik.setFieldValue('conditions', temp);
                            }}
                        >
                            <AddIcon />
                            {t('configurationintegrations:Add_Condition')}
                        </IconButton>
                    )}
            </div>

            <div className={classes.content}>
                <h5 className={classes.titleSmall}>{t('configurationintegrations:Current_User_Identity_Verification')}</h5>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={clsx(classes.label, classes.labelRequired)}>{t('configurationintegrations:Your_Password')}</span>
                    </div>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={!!(formik.touched.password && formik.errors.password)}
                        helperText={(formik.touched.password && formik.errors.password) || ''}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                        inputProps={{
                            autocomplete: 'new-password',
                            form: {
                                autocomplete: 'off',
                            },
                        }}
                    />
                </div>
            </div>
            <div className={classes.content}>
                <h5 className={classes.titleSmall}>{t('configurationintegrations:Integration_Details')}</h5>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>{t('configurationintegrations:Consumer_Key')}</span>
                    </div>
                    <TextField
                        disabled
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="consumer_key"
                        value={integration.consumer_key}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>{t('configurationintegrations:Consumer_Secret')}</span>
                    </div>
                    <TextField
                        disabled
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="consumer_secret"
                        value={integration.consumer_secret}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>{t('configurationintegrations:Access_Token')}</span>
                    </div>
                    <TextField
                        disabled
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="token"
                        value={integration.token}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </div>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>{t('configurationintegrations:Access_Token_Secret')}</span>
                    </div>
                    <TextField
                        disabled
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="token_secret"
                        value={integration.token_secret}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default IntegrationInfoContent;
