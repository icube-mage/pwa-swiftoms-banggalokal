import React, { useState, useEffect } from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import gqlService from '@modules/categories/services/graphql';
import aclService from '@modules/theme/services/graphql';

import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const { Content, t } = props;

    const [nodeAct, setNodeAct] = useState(null);
    const [open, setOpen] = useState(false);
    const [addMode, setAddMode] = useState(false);

    const [getCategoryList, { loading, data, refetch }] = gqlService.getCategoryList();
    const [deleteCategory] = gqlService.deleteCategory();
    const [createCategory] = gqlService.createCategory();
    const [updateCategory] = gqlService.updateCategory();

    const handleUpdate = (id, input, resetForm) => {
        window.backdropLoader(true);
        updateCategory({ variables: { id, input } })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('categories:Selected_category_has_been_updated'),
                    variant: 'success',
                });
                setAddMode(false);
                resetForm();
                setTimeout(() => refetch(), 250);
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

    const handleCreate = (input, resetForm) => {
        window.backdropLoader(true);
        createCategory({ variables: { input } })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('categories:Category_has_been_created'),
                    variant: 'success',
                });
                setAddMode(false);
                resetForm();
                setTimeout(() => refetch(), 250);
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

    const formik = useFormik({
        initialValues: {
            id: null,
            after: null,
            before: null,
            description: '',
            is_active: true,
            level: null,
            name: '',
            parent_id: null,
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().typeError(t('categories:This_is_a_Required_field')).required(t('categories:This_is_a_Required_field')),
        }),
        onSubmit: (values, { resetForm }) => {
            const { id, ...restValues } = values;
            if (id) {
                handleUpdate(id, restValues, resetForm);
            } else {
                handleCreate(restValues, resetForm);
            }
        },
    });

    const handleDelete = () => {
        setOpen(false);
        window.backdropLoader(true);
        deleteCategory({ variables: { id: [nodeAct?.id] } })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('categories:Selected_category_has_been_deleted'),
                    variant: 'success',
                });
                setAddMode(false);
                formik.resetForm();
                setTimeout(() => refetch(), 250);
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

    useEffect(() => {
        getCategoryList();
    }, []);

    const contentProps = {
        ...props,
        categories: data?.getCategoryList || [],
        loading,
        handleDelete,
        open,
        setOpen,
        nodeAct,
        setNodeAct,
        formik,
        addMode,
        setAddMode,
    };
    return <Content {...contentProps} />;
};

const Core = (props) => {
    const router = useRouter();

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'product_category',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading);
    }, [aclCheckLoading]);

    if (aclCheckLoading) {
        return <Layout />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        ...props,
    };

    return (
        <Layout>
            <ContentWrapper {...contentProps} />
        </Layout>
    );
};

export default Core;
