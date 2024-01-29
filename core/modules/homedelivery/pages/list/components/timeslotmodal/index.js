import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Content from '@modules/homedelivery/pages/list/components/timeslotmodal/view';

const Core = (props) => {
    const {
        t, idCourier, handleSubmitTimeSlot,
    } = props;

    const formik = useFormik({
        initialValues: {
            id: idCourier,
            pickup_time: '',
        },
        validationSchema: Yup.object().shape({
            pickup_time: Yup.string().required(t('homedelivery:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handleSubmitTimeSlot(values);
        },
    });

    const contentProps = {
        formik,
        t,
        ...props,
    };

    return (
        <Content {...contentProps} />
    );
};

export default Core;
