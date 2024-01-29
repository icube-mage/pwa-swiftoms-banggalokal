import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/virtualstock/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;
    const router = useRouter();
    const [createVirtualStock] = gqlService.createVirtualStock();

    const handleSubmit = ({
        name,
        notes,
        location,
    }) => {
        const variables = {
            vs_name: name,
            notes,
            location: location.map((e) => ({ loc_id: e.loc_id })),
        };
        window.backdropLoader(true);
        createVirtualStock({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('virtualstock:New_VirtualStock_has_been_saved'),
                variant: 'success',
            });
            setTimeout(() => router.push('/cataloginventory/virtualstock'), 250);
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
            name: '',
            notes: '',
            location: [],
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('virtualstock:This_is_a_Required_field')),
            notes: Yup.string().nullable(),
            location: Yup.array().nullable(),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
            // console.log(values);
        },
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_virtual_stock',
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
