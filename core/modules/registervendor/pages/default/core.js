/* eslint-disable prefer-destructuring */
import gqlService from '@modules/registervendor/services/graphql';
import { useRouter } from 'next/router';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { regexPhoneDial, regexEmail } from '@helper_regex';

const Core = (props) => {
    const {
        Content,
        storeLogo,
        t,
    } = props;
    const router = useRouter();
    const pageConfig = {
        header: false,
        sidebar: false,
        title: t('registervendor:Request_New_Vendor'),
    };
    const [addNewVendor] = gqlService.addNewVendorRequest();
    const [getCountries, getCountriesRes] = gqlService.getCountries();
    const [getRegion, getRegionRes] = gqlService.getRegion();
    const [getCityKecByRegionCode, getCityKecByRegionCodeRes] = gqlService.getCityKecByRegionCode();

    const [dialCode, setDialCode] = React.useState('62');
    const useRegexPhone = regexPhoneDial(dialCode);

    const handleSubmit = (input) => {
        window.backdropLoader(true);
        addNewVendor({
            variables: { input },
        }).then(() => {
            window.toastMessage({
                open: true,
                variant: 'success',
                text: t('registervendor:Congratulation_your_registration_will_be_processed_immediately'),
            });
            setTimeout(() => { router.push('/login'); }, 250);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                variant: 'error',
                text: e.message,
            });
        });
    };

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            password_confirmation: '',
            company_street: '',
            company_country_id: '',
            company_region: '',
            company_city: '',
            no_telephone: '',
            company_code: '',
            company_name: '',
        },
        validationSchema: Yup.object().shape({
            first_name: Yup.string().required(t('registervendor:This_is_a_Required_field')),
            last_name: Yup.string().required(t('registervendor:This_is_a_Required_field')),
            email: Yup.string().required(t('registervendor:This_is_a_Required_field')).matches(regexEmail, t('registervendor:Invalid_email_format')),
            no_telephone: Yup.string().nullable().matches(useRegexPhone, t('registervendor:Invalid_phone_number_format')),
            password: Yup.string().required(t('registervendor:This_is_a_Required_field')),
            password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], t('registervendor:Passwords_do_not_match'))
                .required(t('registervendor:This_is_a_Required_field')),
            company_code: Yup.string().required(t('registervendor:This_is_a_Required_field')),
            company_name: Yup.string().required(t('registervendor:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            const {
                company_country_id, company_region, company_city, ...restValues
            } = values;
            const input = {
                company_country_id: String(company_country_id?.id) || '',
                company_region: company_region.code || '',
                company_city: company_city.value || '',
                ...restValues,
            };
            handleSubmit(input);
        },
    });

    const contentProps = {
        formik,
        handleSubmit,
        getCountries,
        getCountriesRes,
        getRegion,
        getRegionRes,
        getCityKecByRegionCode,
        getCityKecByRegionCodeRes,
        storeLogo,
        t,
        setDialCode,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
