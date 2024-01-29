/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import gqlService from '@modules/requestreturn/services/graphql';
import BackdropLoad from '@helper_backdropload';

const Loading = dynamic(() => import('@common_loaders/Backdrop'), { ssr: false });
const Message = dynamic(() => import('@common_toast'), { ssr: false });

const ContentWrapper = (props) => {
    const { data, Content } = props;
    const router = useRouter();
    const [backdropLoader, setBackdropLoader] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState({
        open: false,
        variant: '',
        text: '',
    });
    const handleCloseMessage = () => {
        setToastMessage({ ...toastMessage, open: false });
    };
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.backdropLoader = setBackdropLoader;
            window.toastMessage = setToastMessage;
        }
    }, []);

    const requestreturn = data.getRequestReturnById;
    const [saveRequestReturn] = gqlService.saveRequestReturn();
    const [sendPackage] = gqlService.sendPackage();

    const handleSubmit = ({
        id,
        message,
        items,
    }) => {
        const input = {
            id,
            message,
            items: items.map((e) => (
                {
                    item_id: e.id,
                    attachment: {
                        binary_data: e.attachment.binary_data,
                        filename: e.attachment.filename,
                    },
                }
            )),
        };
        window.backdropLoader(true);
        saveRequestReturn({
            variables: { input },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Request has been updated',
                variant: 'success',
            });
            setTimeout(window.location.reload(), 250);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const handleSendPackage = () => {
        const variables = {
            id: requestreturn.id,
        };
        window.backdropLoader(true);
        sendPackage({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Order was packaged',
                variant: 'success',
            });
            setTimeout(window.location.reload(), 250);
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
            id: requestreturn.id,
            message: '',
            items: requestreturn.items?.map((e) => (
                {
                    id: e.id,
                    attachment: {
                        binary_data: e.binary_data,
                        filename: e.filename,
                    },
                }
            )),
        },
        validationSchema: Yup.object().shape({
            message: Yup.string().required('Required!'),
        }),
        onSubmit: (values) => {
            const { items, ...valueToSubmit } = values;
            valueToSubmit.items = items.map((e) => (
                {
                    id: e.id,
                    attachment: {
                        binary_data: e.binary_data || '',
                        filename: e.filename || '',
                    },
                }
            ));
            handleSubmit(valueToSubmit);
        },
    });

    const handleDropFile = (files, i) => {
        const fileName = files[0].file.name;
        const { baseCode } = files[0];
        const idx = baseCode.indexOf('base64,');
        formik.setFieldValue(`items[${i}].filename`, fileName);
        formik.setFieldValue(`items[${i}].binary_data`, baseCode.slice(idx + 7));
    };

    const detailReturn = {
        incrementId: requestreturn.increment_id,
        status: requestreturn.status_label,
        statusCode: requestreturn.status_code,
        type: requestreturn.return_type_label,
        order: requestreturn.channel_order_increment_id,
        shipping: requestreturn.shipping_address,
        itemsx: requestreturn.items,
        message: requestreturn.message,
    };

    const formikSendPackage = useFormik({
        initialValues: {
            id: requestreturn.id,
        },
        onSubmit: (values) => {
            handleSendPackage(values);
        },
    });

    const contentProps = {
        formik,
        detailReturn,
        handleDropFile,
        formikSendPackage,
    };

    useEffect(() => {
        document.title = `Return #${requestreturn.increment_id}`;
    }, []);

    return (
        <>
            <Loading open={backdropLoader} />
            <Content {...contentProps} />
            <Message
                open={toastMessage.open}
                variant={toastMessage.variant}
                setOpen={handleCloseMessage}
                message={toastMessage.text}
            />
        </>
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getRequestReturnById({
        id: router && router.query && Number(router.query.id),
    });

    if (loading) {
        return <span />;
    }

    if (!data) {
        return <span>Data not found!</span>;
    }

    return (
        <ContentWrapper data={data} {...props} />
    );
};

export default Core;
