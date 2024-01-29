/* eslint-disable object-curly-newline */
import Layout from '@layout';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';

import ErrorRedirect from '@common_errorredirect';

import gqlService from '@modules/integrationthirdpartyapps/services/graphql';
import aclService from '@modules/theme/services/graphql';
import locationService from '@modules/location/services/graphql';
import vendorService from '@modules/managevendor/services/graphql';
import channelService from '@modules/channel/services/graphql';

import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const { t, Content, data, dataLoc, dataChan, dataComp, dataMod } = props;
    const router = useRouter();
    const [updateIntegrationApp] = gqlService.updateIntegrationApp();

    const handleSubmit = (input) => {
        window.backdropLoader(true);
        updateIntegrationApp({
            variables: { input, id: Number(router.query?.id) },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('integrationthirdpartyapps:Third_Party_Apps_has_been_updated'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/integration/thirdpartyapps'), 250);
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

    const moduleVal = () => {
        const values = [];
        const validation = [];
        const key = [];
        // eslint-disable-next-line no-unused-expressions
        dataMod.forEach((mod) => (
            mod?.modules?.forEach((mdl) => {
                key.push(mdl.module_code);
                values.push([mdl.module_code,
                    data.modules?.find(({ module_code }) => module_code === mdl.module_code)?.webhook_url || '']);
                values.push([`${mdl.module_code}_check`,
                    data.modules?.find(({ module_code }) => module_code === mdl.module_code)?.status ?? false]);
                validation.push([mdl.module_code, Yup.string()
                    .max(255, t('integrationthirdpartyapps:This_field_must_be_at_most_max_characters', { max: 255 })).nullable()
                    .when(`${mdl.module_code}_check`, {
                        is: true,
                        then: Yup.string()
                            .typeError(t('integrationthirdpartyapps:This_is_a_Required_field'))
                            .max(255, t('integrationthirdpartyapps:This_field_must_be_at_most_max_characters', { max: 255 }))
                            .required(t('integrationthirdpartyapps:This_is_a_Required_field')),
                    }),
                ]);
                validation.push([`${mdl.module_code}_check`, Yup.boolean()]);
            })
        ));

        return {
            key,
            values: Object.fromEntries(values),
            validation: Object.fromEntries(validation),
        };
    };

    const formik = useFormik({
        initialValues: {
            name: data.name,
            status: data.status,
            channel_ids: data.is_all_channels ? []
                : data.channel_ids?.map((id) => dataChan.find(({ channel_id }) => Number(channel_id) === Number(id))) || [],
            company_ids: data.is_all_companies ? []
                : data.company_ids?.map((id) => dataComp.find(({ company_id }) => Number(company_id) === Number(id))) || [],
            loc_ids: data.is_all_locations ? []
                : data.loc_ids?.map((id) => dataLoc.find(({ loc_id }) => Number(loc_id) === Number(id))) || [],
            webhook_secret_key: data.modules?.[0]?.webhook_secret_key || '',
            ...moduleVal().values,
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .typeError(t('integrationthirdpartyapps:This_is_a_Required_field'))
                .max(255, t('integrationthirdpartyapps:This_field_must_be_at_most_max_characters', { max: 255 }))
                .required(t('integrationthirdpartyapps:This_is_a_Required_field')),
            webhook_secret_key: Yup.string()
                .typeError(t('integrationthirdpartyapps:This_is_a_Required_field'))
                .max(255, t('integrationthirdpartyapps:This_field_must_be_at_most_max_characters', { max: 255 })),
            ...moduleVal().validation,
        }),
        onSubmit: (values) => {
            const {
                loc_ids, channel_ids, company_ids, webhook_secret_key, name, status,
            } = values;
            const valueToSubmit = {
                name,
                status,
                channel_ids: channel_ids.length === 1 && channel_ids[0]?.channel_id === 0 ? [] : channel_ids.map(({ channel_id }) => channel_id),
                company_ids: company_ids.length === 1 && company_ids[0]?.company_id === 0 ? [] : company_ids.map(({ company_id }) => company_id),
                loc_ids: loc_ids.length === 1 && loc_ids[0]?.loc_id === 0 ? [] : loc_ids.map(({ loc_id }) => loc_id),
                is_all_channels: !!(channel_ids.length === 1 && channel_ids[0]?.channel_id === 0),
                is_all_companies: !!(company_ids.length === 1 && company_ids[0]?.company_id === 0),
                is_all_locations: !!(loc_ids.length === 1 && loc_ids[0]?.loc_id === 0),
                modules: moduleVal().key?.map((key) => ({
                    module_code: key, status: values[`${key}_check`], webhook_secret_key, webhook_url: values[key],
                })),
            };
            handleSubmit(valueToSubmit);
        },
    });

    const contentProps = {
        ...props,
        formik,
        newShipmentWebhook: data.modules?.find(({ module_code }) => module_code === 'webhookshipment_new') || {},
        updateShipmentWebhook: data.modules?.find(({ module_code }) => module_code === 'webhookshipment_update_status') || {},
    };

    return (
        <Content {...contentProps} />
    );
};
const Core = (props) => {
    const {
        t,
    } = props;

    const router = useRouter();
    const { loading, data, error } = gqlService.getIntegrationApp({
        pageSize: 1000,
        currentPage: 1,
        filter: {
            entity_id: { eq: String(router.query?.id) },
        },
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'integration_third_party_apps',
    });

    const { loading: loadingMod, data: dataMod } = gqlService.getIntegrationAppModules();
    const { loading: loadingLoc, data: dataLoc } = locationService.getLocationListQuery({
        pageSize: 1000,
        currentPage: 1,
    });
    const { loading: loadingComp, data: dataComp } = vendorService.getCompanyListQuery({
        pageSize: 1000,
        currentPage: 1,
    });
    const { loading: loadingChan, data: dataChan } = channelService.getChannelListQuery({
        pageSize: 1000,
        currentPage: 1,
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading || loading || loadingLoc || loadingComp || loadingChan || loadingMod);
    }, [aclCheckLoading, loading, loadingLoc, loadingComp, loadingChan, loadingMod]);

    if (aclCheckLoading || loading || loadingLoc || loadingComp || loadingChan || loadingMod) {
        return <Layout />;
    }

    if (((aclCheckData && aclCheckData.isAccessAllowed) === false)) {
        router.push('/');
        return <Layout />;
    }

    if (!data || !(Number(router.query?.id) >= 0)) {
        const errMsg = (error?.message) ?? t('integrationthirdpartyapps:Data_not_found');
        const redirect = '/integration/thirdpartyapps';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    const contentProps = {
        ...props,
        data: data.getIntegrationAppList?.items?.[0] || {},
        dataLoc: dataLoc.getLocationList?.items || [],
        dataComp: dataComp.getCompanyList?.items || [],
        dataChan: dataChan.getChannelList?.items || [],
        dataMod: dataMod.getIntegrationAppModules || [],
    };

    return (
        <Layout>
            <ContentWrapper {...contentProps} />
        </Layout>
    );
};

export default Core;
