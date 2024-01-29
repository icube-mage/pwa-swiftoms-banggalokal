/* eslint-disable */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/support/informationupdate/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const { Content, t } = props;
    const router = useRouter();
    const [createInformationUpdate] = gqlService.createInformationUpdate();
    const [origin, setOrigin] = React.useState();
  
    React.useEffect( () => {  
        setOrigin(window.location.origin);
    }, []);

    const handleSubmit = (input) => {
        window.backdropLoader(true);
        const variables = input;
        createInformationUpdate({ variables })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('published_article'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/support/informationupdate'), 250);
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
            app_name: "Swiftoms",
            topic: "notificationspwa",
            title: '',
            body: '',
            description: '',
            image: '',
            path: '',
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().required(t('master:This_is_a_Required_field')),
            body: Yup.string().required(t('master:This_is_a_Required_field')),
            description: Yup.string().required(t('master:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            values.path = `${origin}/seller/update`;
            handleSubmit({message: values});
        },
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'information_update',
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
        formik,
        t,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
