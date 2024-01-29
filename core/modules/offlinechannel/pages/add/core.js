/* eslint-disable no-unused-expressions */
import Layout from '@layout';
import gqlService from '@modules/offlinechannel/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        Content,
        t,
    } = props;
    const router = useRouter();

    const [createWebstoreChannel] = gqlService.createWebstoreChannel();

    const handleSubmit = (variables) => {
        window.backdropLoader(true);
        createWebstoreChannel({
            variables: {
                input: {
                    ...variables,
                },
            },
        }).then((res) => {
            window.backdropLoader(false);
            if (res?.data?.createWebstoreChannel) {
                window.toastMessage({
                    open: true,
                    text: t('offlinechannel:The_channel_has_been_successfully_integrated'),
                    variant: 'success',
                });
                router.push('/integration/offlinechannel');
            } else {
                throw new Error(t('offlinechannel:Error_Something_is_wrong_when_create_webstore_channel'));
            }
        }).catch((e) => {
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
            framework: 'Offline',
            loc_id: [],
            channel_code: '',
            channel_name: '',
        },
        validationSchema: Yup.object().shape({
            loc_id: Yup.array().of(Yup.object().shape({
                loc_id: Yup.number().required(t('offlinechannel:This_is_a_Required_field')),
            }).typeError(t('offlinechannel:This_is_a_Required_field')))
                .min(1, t('offlinechannel:Minimum_1_location_must_be_selected'))
                .required(t('offlinechannel:This_is_a_Required_field')),
            channel_code: Yup.string().required(t('offlinechannel:This_is_a_Required_field')),
            channel_name: Yup.string().required(t('offlinechannel:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            const { loc_id, ...restValues } = values;
            const valuesToSubmit = {
                loc_id: loc_id.map((loc) => (
                    loc.loc_id
                )),
                ...restValues,
            };
            handleSubmit(valuesToSubmit);
        },
    });

    const contentProps = {
        formik,
        t,
        ...props,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('offlinechannel:Add_Offline_Channel'),
    };
    const router = useRouter();

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'offline_channels',
    });
    const { data, loading, error } = gqlService.getWebstoreCapability({
        variables: {
            framework: 'Offline',
        },
    });

    const { loading: loadingConfigApi, data: dataConfigApi } = gqlService.getStoreConfig({
        path: 'swiftoms_general/google_map/api_key',
    });

    const { loading: loadingConfigEnable, data: dataConfigEnable } = gqlService.getStoreConfig({
        path: 'swiftoms_general/google_map/enabled',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading || loadingConfigApi || loadingConfigEnable);
    }, [loading, aclCheckLoading, loadingConfigApi, loadingConfigEnable]);

    if (loading || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (error) {
        const errMsg = error?.message || t('offlinechannel:Data_not_found');
        const redirect = '/integration/offlinechannel/add';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/integration/offlinechannel/add');
    }

    const contentProps = {
        capabilitiesData: (data && data.getWebstoreCapability
            && data.getWebstoreCapability) || { capabilities: [], image_url: '', name: '' },
        enableMap: dataConfigEnable?.getStoreConfig === '1',
        gmapKey: dataConfigApi?.getStoreConfig || '',
        ...props,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...contentProps} />
        </Layout>
    );
};

export default Core;
