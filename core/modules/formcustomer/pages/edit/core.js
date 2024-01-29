import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import gqlService from '@modules/formcustomer/services/graphql';

const Loading = dynamic(() => import('@common_loaders/Backdrop'), { ssr: false });
const Message = dynamic(() => import('@common_toast'), { ssr: false });

const ContentWrapper = (props) => {
    const { data, Content } = props;
    const router = useRouter();
    const formData = data.getFormDataCurbPickup;
    const [addCurbPickupInfo] = gqlService.addCurbPickupInfo();
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

    const handleSubmit = ({
        nameInput, phone, location, vehicle, vehicleDesc, notes,
    }) => {
        const variables = {
            id: router.query.id,
            name: nameInput,
            phone,
            loc_details: location.value,
            vehicle_number: vehicle,
            vehicle_desc: vehicleDesc,
            notes,
        };
        window.backdropLoader(true);
        addCurbPickupInfo({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Form has been submitted',
                    variant: 'success',
                });
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
            nameInput: formData.name,
            phone: formData.phone,
            location: {
                value: formData.pickup_id,
                label: formData.pickup_name,
            },
            isLocation: formData.is_location_enable,
            vehicle: '',
            vehicleDesc: '',
            notes: '',
        },
        validationSchema: Yup.object().shape({
            nameInput: Yup.string().required('Required!'),
            phone: Yup.string().required('Required!'),
            vehicle: Yup.string().required('Required!'),
            vehicleDesc: Yup.string().required('Required!'),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const custDetail = {
        name: formData.name,
    };

    const contentProps = {
        formik,
        custDetail,
    };

    return (
        <>
            <Loading open={backdropLoader} />
            <Content {...contentProps} />
            <Message open={toastMessage.open} variant={toastMessage.variant} setOpen={handleCloseMessage} message={toastMessage.text} />
        </>
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getFormDataCurbPickup({
        id: router && router.query && String(router.query.id),
    });

    if (loading) {
        return <></>;
    }

    if (!data) {
        return <>Data not found!</>;
    }

    return (
        <>
            <ContentWrapper data={data} {...props} />
        </>
    );
};

export default Core;
