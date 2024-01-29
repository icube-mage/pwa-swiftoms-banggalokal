import React from 'react';
import Layout from '@layout';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/orderreallocation/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const { data, Content } = props;
    const router = useRouter();
    const orderReallocation = data.getOrderReallocationById;
    const [updateReallocation] = gqlService.updateReallocation();

    const handleSubmit = ({ company, location }) => {
        const variables = {
            id: orderReallocation.entity_id,
            company_id: company.company_id,
            loc_code: location.loc_code,
        };
        window.backdropLoader(true);
        updateReallocation({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Reallocation has been saved.',
                    variant: 'success',
                });
                setTimeout(() => router.push('/sales/orderreallocation'), 250);
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
            company: orderReallocation.company,
            location: orderReallocation.loc_code,
        },
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const reallocationDetail = {
        id: orderReallocation.entity_id,
        shipmentNumber: orderReallocation.increment_id,
        status: orderReallocation.status.label,
        orderDate: orderReallocation.created_at,
        orderNumber: orderReallocation.order_increment_id,
        channelOrderNumber: orderReallocation.channel_order_increment_id,
        item: orderReallocation.order_item,
        history: orderReallocation.status_history,
    };

    const contentProps = {
        formik,
        reallocationDetail,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data, error } = gqlService.getOrderReallocationById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'orderreallocation',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout />;
    }

    if (!data) {
        const errMsg = error?.message ?? 'Data not found!';
        const redirect = '/sales/orderreallocation';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout>
            <ContentWrapper data={data} {...props} />
        </Layout>
    );
};

export default Core;
