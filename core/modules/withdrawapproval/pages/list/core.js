import Layout from '@layout';
import gqlService from '@modules/withdrawapproval/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const { Content, t } = props;

    const [getVendorIrisPayoutApprovalList, { data, loading }] = gqlService.getVendorIrisPayoutApprovalList();
    const [vendorIrisPayoutApprove] = gqlService.vendorIrisPayoutApprove();
    const [vendorIrisPayoutReject] = gqlService.vendorIrisPayoutReject();
    const [show, setShow] = React.useState(false);

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_vendor_iris',
    });

    const { loading: configLoading, data: configData } = aclService.getStoreConfig({
        path: 'swiftoms_vendorportal/configuration/beneficiaries',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading || configLoading);
    }, [aclCheckLoading, configLoading]);

    if (aclCheckLoading) {
        return <Layout />;
    }

    if (((aclCheckData && aclCheckData.isAccessAllowed) === false)
        || (configData && configData.getStoreConfig === '0')) {
        router.push('/');
        return <Layout />;
    }

    const contentProps = {
        getVendorIrisPayoutApprovalList,
        vendorIrisPayoutApprove,
        vendorIrisPayoutReject,
        data,
        loading,
        t,
        show,
        setShow,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
