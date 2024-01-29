import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@modules/thirdpartyapps/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';
import ErrorRedirect from '@common_errorredirect';

const ContentWrapper = (props) => {
    const {
        t, Content, data, dataMod,
    } = props;
    const router = useRouter();
    const [updateThirdPartyApp] = gqlService.updateThirdPartyApp();

    const handleSubmit = (input) => {
        const variables = {
            id: router && router.query && Number(router.query.id),
            input,
        };
        window.backdropLoader(true);
        updateThirdPartyApp({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('thirdpartyapps:Third_Party_Apps_has_been_updated'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/vendorportal/thirdpartyapps'), 250);
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

    const modulesArr = () => {
        const values = [];
        const additional = [];
        const validation = [];
        dataMod.forEach((mod) => {
            const tempMod = {
                ...mod,
                modules: mod.modules.map((mdl) => (
                    {
                        ...mdl,
                        status: data.modules.find((mdata) => mdata.module_code === mdl.module_code)?.status || false,
                    }
                )),
            };
            if (mod.group.includes('webhook')) {
                mod.modules.forEach((mdl) => {
                    additional.push([mdl.module_code,
                    data.modules.find((mdata) => mdata.module_code === mdl.module_code)?.status || false]);

                    additional.push([`${mdl.module_code}_url`,
                    data.modules.find((mdata) => mdata.module_code === mdl.module_code)?.webhook_url || '']);

                    validation.push([mdl.module_code, Yup.boolean()]);
                    validation.push([`${mdl.module_code}_url`, Yup.string().when(`${mdl.module_code}`, {
                        is: true,
                        then: Yup.string().required(t('thirdpartyapps:This_is_a_Required_field')),
                    })]);
                });
            }
            values.push(tempMod);
        });
        return {
            values,
            additional: Object.fromEntries(additional),
            validation: Object.fromEntries(validation),
        };
    };

    const webhookModule = data.modules.find((mod) => mod.module_code.includes('webhook'));
    const formik = useFormik({
        initialValues: {
            access_token: data.access_token,
            status: data.status,
            vendor_id: data.vendor_id,
            webhook_secret_key: webhookModule?.webhook_secret_key ?? '',
            modules: modulesArr().values,
            app_type: data.app_type,
            ...modulesArr().additional,
        },
        validationSchema: Yup.object().shape({
            ...modulesArr().validation,
        }),
        onSubmit: (values) => {
            const {
                access_token, status, vendor_id, modules, app_type, webhook_secret_key,
            } = values;
            const valueToSubmit = {
                access_token,
                app_type,
                status,
                vendor_id,
                modules: modules.map((mod) => mod.modules.map((child) => {
                    let res = {
                        module_code: child.module_code,
                        status: child.status,
                    };
                    if (mod.group.includes('webhook')) {
                        res = {
                            ...res,
                            webhook_secret_key,
                            webhook_url: child.webhook_url,
                        };
                    }
                    return res;
                })).flat(1),
            };
            handleSubmit(valueToSubmit);
        },
    });

    const [generateThirdPartyAccessToken] = gqlService.generateThirdPartyAccessToken({
        onCompleted: (res) => {
            window.backdropLoader(false);
            formik.setFieldValue('access_token', res.generateThirdPartyAccessToken);
        },
        onError: (e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        },
    });

    const handleGenerate = () => {
        window.backdropLoader(true);
        generateThirdPartyAccessToken();
    };

    const contentProps = {
        ...props,
        formik,
        handleGenerate,
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
    const { loading, data, error } = gqlService.getThirdPartyApp({
        id: router && router.query && Number(router.query.id),
    });
    const { loading: loadingMod, data: dataMod, error: errorMod } = gqlService.getThirdPartyAppModules();

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'vendor_third_party_apps',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading || loadingMod || loading);
    }, [aclCheckLoading, loadingMod, loading]);

    if (aclCheckLoading || loadingMod || loading) {
        return <Layout />;
    }

    if (((aclCheckData && aclCheckData.isAccessAllowed) === false)) {
        router.push('/');
        return <Layout />;
    }

    if (!data || !dataMod) {
        const errMsg = (error?.message || errorMod?.message) ?? t('alluser:Data_not_found');
        const redirect = '/vendorportal/thirdpartyapps';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    const contentProps = {
        ...props,
        data: data.getThirdPartyApp,
        dataMod: dataMod.getThirdPartyAppModules,
    };

    return (
        <Layout>
            <ContentWrapper {...contentProps} />
        </Layout>
    );
};

export default Core;
