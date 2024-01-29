import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/aclgroup/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        Content, aclTreeData, aclByGroup, t,
    } = props;
    const router = useRouter();
    const [updateUserGroup] = gqlService.updateUserGroup();

    const aclChecked = (tree, list = []) => {
        const assigned = [...list];
        const push = (arr) => {
            if (Array.isArray(arr)) {
                arr.forEach((acl) => {
                    const exist = acl.children?.find((child) => assigned.includes(child.value));
                    if (exist?.value && !assigned.includes(acl.value)) {
                        assigned.push(acl.value);
                    }
                    push(acl.children);
                });
            }
        };
        push(tree);
        return assigned;
    };

    const formik = useFormik({
        initialValues: {
            group_id: aclByGroup?.group_id ?? null,
            input: {
                acl_code: aclChecked(aclTreeData, aclByGroup?.acl_code || []) ?? [],
                is_all_acl: aclByGroup?.is_all_acl ?? false,
                code: aclByGroup?.name ?? '',
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

            updateUserGroup({
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
    const { name } = router.query;

    const pageConfig = {
        title: `${t('usergroup:Edit_Acl_Group')} #${router?.query?.id}`,
    };

    const { loading: aclTreeLoading, data: aclTreeData } = gqlService.getAclTree();

    const { loading: aclByGroupLoading, data: aclByGroupData } = gqlService.getAclByGroupId({
        group_id: Number(router?.query?.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'manage_user_group',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading || aclTreeLoading || aclByGroupLoading);
    }, [aclCheckLoading, aclTreeLoading, aclByGroupLoading]);

    if (aclCheckLoading || aclTreeLoading || aclByGroupLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (!name || !aclByGroupData) {
        router.push('/userdata/group');
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false || !name) {
        router.push('/');
    }

    const contentProps = {
        aclTreeData: aclTreeData?.getAclTree,
        aclByGroup: {
            ...aclByGroupData?.getAclByGroupId,
            group_id: Number(router?.query?.id),
            name,
        },
        t,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
