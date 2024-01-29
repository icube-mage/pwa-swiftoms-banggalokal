/* eslint-disable eqeqeq */
/* eslint-disable no-inner-declarations */
import React, { useCallback } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

import gqlService from '@modules/configurationintegrations/services/graphql';
import aclService from '@modules/theme/services/graphql';

import gqlCompany from '@modules/company/services/graphql';
import gqlLocation from '@modules/location/services/graphql';
import gqlChannel from '@modules/channel/services/graphql';

import ErrorRedirect from '@common_errorredirect';

import { conditionsOptions, allIdTree } from '@modules/configurationintegrations/helpers';
import Layout from '@layout';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        data, Content, t, channelList, locList, companyList, dataTree,
    } = props;
    const router = useRouter();
    const integration = data.getIntegrationById;
    const [updateIntegration] = gqlService.updateIntegration();

    const handleSubmit = (input) => {
        window.backdropLoader(true);
        updateIntegration({
            variables: { input },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('configurationintegrations:integration_has_been_updated'),
                variant: 'success',
            });
            setTimeout(() => router.push('/configurations/integrations'), 250);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const findValues = useCallback((val, attribute) => {
        let options = [];
        switch (attribute) {
        case 'channel_id':
            options = channelList;
            break;
        case 'company_id':
            options = companyList;
            break;
        case 'loc_id':
            options = locList;
            break;
        default:
            break;
        }
        const valArray = val.split(',');
        return valArray.map((v) => options.find((opt) => opt[attribute] == v));
    }, [channelList, companyList, locList, data]);

    const formik = useFormik({
        initialValues: {
            name: integration.name,
            password: '',
            conditions: integration.conditions?.map(({ attribute, value }) => ({
                type: conditionsOptions.find((opt) => opt.value === attribute),
                value: findValues(value, attribute),
            })) || [],
            resource: integration.resource?.includes('Magento_Backend::all') ? allIdTree(dataTree)
                : integration.resource?.filter((id) => id !== 'Magento_Backend::admin' && id != 'Magento_Backend::all') || [],
            all_resources: integration.all_resources || integration.resource?.find((res) => res === 'Magento_Backend::all') ? 'true' : 'false',
            integration_id: integration.integration_id,
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('configurationintegrations:This_is_a_Required_field')),
            password: Yup.string().required(t('configurationintegrations:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            const {
                resource, all_resources, conditions, ...restValues
            } = values;
            const valuesToSubmit = {
                ...restValues,
                all_resources: all_resources === 'true',
                resource: all_resources === 'true' ? [] : resource,
            };
            if (conditions.filter(({ value }) => !!value.length).length) {
                valuesToSubmit.conditions = conditions.filter(({ value }) => !!value.length).map(({ type, value }) => ({
                    attribute: type.value,
                    operator: 'in',
                    value: value.map((val) => String(val[type.value]))?.join(','),
                }));
            } else {
                valuesToSubmit.conditions = null;
            }
            handleSubmit(valuesToSubmit);
        },
    });

    const contentProps = {
        ...props,
        formik,
        t,
        integration,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const { loading, data, error } = gqlService.getIntegrationById({
        id: router && router.query && Number(router.query.id),
    });
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_config_integrations',
    });
    const { loading: resourceLoading, data: resourceData } = gqlService.getAclResource();

    const [getCompanyList, getCompanyListRes] = gqlCompany.getCompanyList();
    const [getLocationList, getLocationListRes] = gqlLocation.getLocationList();
    const [getChannelList, getChannelListRes] = gqlChannel.getChannelList();

    React.useEffect(() => {
        if (data?.getIntegrationById?.conditions?.length) {
            const { conditions } = data.getIntegrationById;

            function isExist(param) {
                return conditions?.find(({ attribute }) => attribute === param);
            }

            function sortedValue(val) {
                return val.split(',').sort();
            }

            const companyCondition = isExist('company_id');
            const locCondition = isExist('loc_id');
            const channelCondition = isExist('channel_id');

            if (companyCondition) {
                getCompanyList({
                    variables: {
                        filter: {
                            company_id: {
                                from: sortedValue(companyCondition.value)[0],
                                to: sortedValue(companyCondition.value)[sortedValue(companyCondition.value).length - 1],
                            },
                        },
                        pageSize: 1000,
                        currentPage: 1,
                    },
                });
            }

            if (locCondition) {
                getLocationList({
                    variables: {
                        filter: {
                            loc_id: {
                                from: sortedValue(locCondition.value)[0],
                                to: sortedValue(locCondition.value)[sortedValue(locCondition.value).length - 1],
                            },
                        },
                        pageSize: 1000,
                        currentPage: 1,
                    },
                });
            }

            if (channelCondition) {
                getChannelList({
                    variables: {
                        filter: {
                            channel_id: {
                                from: sortedValue(channelCondition.value)[0],
                                to: sortedValue(channelCondition.value)[sortedValue(channelCondition.value).length - 1],
                            },
                        },
                        pageSize: 1000,
                        currentPage: 1,
                    },
                });
            }
        }
    }, [data]);

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading || resourceLoading
            || getCompanyListRes.loading || getLocationListRes.loading || getChannelListRes.loading);
    }, [loading, aclCheckLoading, resourceLoading, getCompanyListRes.loading, getLocationListRes.loading, getChannelListRes.loading]);

    if (loading || aclCheckLoading || resourceLoading || getCompanyListRes.loading || getLocationListRes.loading || getChannelListRes.loading) {
        return <Layout />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('integrationconfigurations:Data_not_found');
        const redirect = '/configurations/integrations';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        ...props,
        dataTree: resourceData?.getAclResource?.find(({ id }) => id === 'Magento_Backend::admin')?.children || [],
        data,
        channelList: getChannelListRes.data?.getChannelList?.items || [],
        locList: getLocationListRes.data?.getLocationList?.items || [],
        companyList: getCompanyListRes.data?.getCompanyList?.items || [],
    };

    return (
        <Layout>
            <ContentWrapper
                {...contentProps}
            />
        </Layout>
    );
};

export default Core;
