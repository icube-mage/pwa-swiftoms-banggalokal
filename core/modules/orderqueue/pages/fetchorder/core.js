import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@modules/orderqueue/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const { Content, t } = props;

    const pageConfig = {
        title: t('order:Fetch_Marketplace_Order'),
    };

    const [finishedAfterSubmit, setFinishedAfterSubmit] = React.useState(false);
    const [activityState, setActivityState] = React.useState();
    const [firstLoad, setFirstLoad] = React.useState(true);
    const [showProgress, setshowProgress] = React.useState(false);
    const intervalRef = React.useRef(null);

    const [getActivity] = gqlService.getActivity({
        variables: {
            code: 'manual_fetch_orders',
            by_session: false,
        },
        onCompleted: (res) => {
            setActivityState(res.getActivity);
            if (firstLoad) {
                setFirstLoad(false);
            }
            if (res.getActivity.run_status === 'running') {
                clearInterval(intervalRef.current);
                setshowProgress(true);
                setTimeout(() => {
                    getActivity();
                }, 500);
            }

            if (res.getActivity.run_status === 'finished' && finishedAfterSubmit) {
                setshowProgress(true);
                clearInterval(intervalRef.current);
            }

            if ((res.getActivity.run_status !== 'running' || res.getActivity.run_status !== 'finished') && finishedAfterSubmit) {
                clearInterval(intervalRef.current);
                setshowProgress(true);
            }
        },
        onError: () => {
            clearInterval(intervalRef.current);
            setActivityState({ ...activityState });
            getActivity();
        },
    });

    React.useEffect(async () => {
        getActivity();
    }, []);

    const [marketplaceFetchOrder] = gqlService.marketplaceFetchOrder();

    const handleSubmit = (input, resetForm) => {
        const variables = { input };
        window.backdropLoader(true);

        setshowProgress(false);
        setFinishedAfterSubmit(false);
        intervalRef.current = setInterval(() => {
            getActivity();
        }, 250);

        marketplaceFetchOrder({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);

                getActivity();
                setFinishedAfterSubmit(true);

                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('order:Order_successfully_fetched_Please_wait_for_at_least_15_minutes_for_order_to_sync'),
                    variant: 'success',
                });
                resetForm();
            })
            .catch((e) => {
                setFinishedAfterSubmit(true);
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
        setTimeout(() => {
            window.backdropLoader(false);
        }, 1000);
    };

    const currentDate = new Date();

    const formik = useFormik({
        initialValues: {
            start_date: currentDate.toISOString().split('T')[0],
            end_date: currentDate.toISOString().split('T')[0],
        },
        validationSchema: Yup.object().shape({
            start_date: Yup.string().required(t('order:This_is_a_Required_field')),
            end_date: Yup.string().required(t('order:This_is_a_Required_field')),
        }),
        onSubmit: (values, { resetForm }) => {
            handleSubmit(values, resetForm);
        },
    });

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_sales_order_queue',
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
        activityState,
        firstLoad,
        showProgress,
        finishedAfterSubmit,
        t,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
