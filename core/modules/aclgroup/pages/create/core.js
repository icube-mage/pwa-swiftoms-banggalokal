import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/aclgroup/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const { Content, aclTreeData, t } = props;
    const router = useRouter();
    const [createUserGroup] = gqlService.createUserGroup();

    const formik = useFormik({
        initialValues: {
            input: {
                acl_code: [],
                is_all_acl: false,
                code: '',
            },
        },
        validationSchema: Yup.object().shape({
            input: Yup.object().shape({
                code: Yup.string().required(t('usergroup:Group_Name_is_required')),
            }),
        }),
        onSubmit: (values) => {
            const variables = { ...values };
            delete variables.name;
            window.backdropLoader(true);

            createUserGroup({
                variables,
            })
                .then(() => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: t('usergroup:The_user_group_has_been_saved'),
                        variant: 'success',
                    });
                    setTimeout(() => router.push('/userdata/group'), 250);
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
        },
    });

    const contentProps = {
        formik,
        aclTreeData,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const pageConfig = {
        title: t('usergroup:Create_User_Group'),
    };

    const { loading: aclTreeLoading, data: aclTreeData } = gqlService.getAclTree();

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'manage_user_group',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading || aclTreeLoading);
    }, [aclCheckLoading, aclTreeLoading]);

    if (aclCheckLoading || aclTreeLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/group');
    }

    const contentProps = {
        aclTreeData: aclTreeData?.getAclTree,
        t,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
