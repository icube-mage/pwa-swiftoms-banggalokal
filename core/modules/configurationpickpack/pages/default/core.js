/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/configurationpickpack/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
        refetch,
        t,
    } = props;

    const [saveStoreConfig] = gqlService.saveStoreConfig();

    const handleSubmit = (input) => {
        const tempArray = [];
        for (const key in input) {
            if (input[key].type === 'form') {
                const splitPath = input[key].path.split('/');
                const keyName = splitPath[splitPath.length - 1];
                const temporary = {};
                let number = 1;
                input[key].value.map((val) => {
                    let isEmpty = false;
                    input[key].form_fields.map((form) => {
                        if (!val[form.id]) {
                            isEmpty = true;
                        }
                    });
                    if (!isEmpty) {
                        temporary[`${keyName}${number}`] = val;
                        number++;
                    }
                });
                delete input[key].form_fields;
                tempArray.push({ ...input[key], value: JSON.stringify(temporary) });
            } else {
                delete input[key].form_fields;
                tempArray.push(input[key]);
            }
        }
        window.backdropLoader(true);
        saveStoreConfig({
            variables: { input: [...tempArray] },
        })
            .then((res) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: res.data.saveStoreConfig,
                    variant: 'success',
                });
                refetch();
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

    const dataConfig = [...data.getPickPackConfigurations];
    const initValue = React.useMemo(() => {
        const tempData = {};
        const validationSchema = {};
        dataConfig?.map((parent) => parent.fields.map((firstChild) => {
            if (firstChild?.fields?.length > 0) {
                firstChild?.fields?.map((secondChild) => {
                    const key = secondChild.id.replaceAll('/', '_');
                    let { value } = secondChild;
                    if (!value && secondChild.type === 'select') {
                        const optionSelected = secondChild.options?.find((option) => option.value === '0');
                        value = optionSelected?.value || '';
                    }
                    tempData[key] = {
                        path: secondChild.id,
                        value,
                        is_default: secondChild.is_default,
                        type: secondChild.type,
                        form_fields: secondChild.form_fields,
                    };
                });
            } else {
                const key = firstChild.id.replaceAll('/', '_');
                let { value } = firstChild;
                if (!value && firstChild.type === 'select') {
                    const optionSelected = firstChild.options?.find((option) => option.value === '0');
                    value = optionSelected?.value || '';
                }
                tempData[key] = {
                    path: firstChild.id,
                    value,
                    is_default: firstChild.is_default,
                    type: firstChild.type,
                    form_fields: firstChild.form_fields,
                };
            }
        }));
        return { tempData, validationSchema };
    }, [data]);

    const formik = useFormik({
        initialValues: {
            ...initValue.tempData,
        },
        validationSchema: Yup.object().shape({
            ...initValue.validationSchema,
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const contentProps = {
        ...props,
        dataConfig,
        formik,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const pageConfig = {
        title: t('pickpackconfiguration:Pick_Pack_Configuration'),
    };
    const { loading, data, refetch } = gqlService.getPickPackConfigurations();

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'pick_pack_configuration',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (!data) {
        window.toastMessage({
            open: true,
            text: t('pickpackconfiguration:Data_not_found'),
            variant: 'error',
        });
        setTimeout(() => {
            router.push('/');
        }, 1000);
        return (
            <Layout pageConfig={pageConfig}>
                <div
                    style={{
                        display: 'flex',
                        color: '#435179',
                        fontWeight: 600,
                        justifyContent: 'center',
                        padding: '20px 0',
                    }}
                >
                    {t('pickpackconfiguration:Data_not_found')}
                </div>
            </Layout>
        );
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper data={data} refetch={refetch} {...props} />
        </Layout>
    );
};

export default Core;
