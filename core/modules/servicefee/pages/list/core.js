import Layout from '@layout';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import gqlService from '@modules/servicefee/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'vendor_service_fees',
    });
    const [getServiceFeeList, { data, loading, refetch }] = gqlService.getServiceFeeList();
    const [saveServiceFee] = gqlService.saveServiceFee();

    const [open, setOpen] = React.useState(false);
    const [detail, setDetail] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            fee: '',
        },
        validationSchema: Yup.object().shape({
            fee: Yup.number()
                .min(0, t('sellercatalog:Minimum_value_is_min', { min: 0 }))
                .max(100, t('sellercatalog:Maximum_value_is_max', { max: 100 }))
                .typeError(t('sellercatalog:Value_must_be_a_number'))
                .required(t('sellercatalog:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            setOpen(false);
            window.backdropLoader(true);
            saveServiceFee({
                variables: { category_id: Number(detail.id), fee_percent: Number(values.fee) },
            }).then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('sellercatalog:Products_has_been_updated'),
                    variant: 'success',
                });
                refetch();
            }).catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
        },
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading);
    }, [aclCheckLoading]);

    if (aclCheckLoading) {
        return <Layout />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
        return <Layout />;
    }

    const contentProps = {
        getServiceFeeList,
        data,
        loading,
        t,
        open,
        setOpen,
        detail,
        setDetail,
        formik,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
