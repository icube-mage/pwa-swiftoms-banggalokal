import Layout from '@layout';
import gqlService from '@modules/orderqueue/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const router = useRouter();
    const pageConfig = {
        title: t('order:All_Orders'),
        customBreadcrumb: [
            { url: '', label: 'Order' },
            { url: router.asPath, label: t('order:All_Orders') },
        ],
    };

    const [varExport, setVarExport] = React.useState({});
    const [getOrderQueueList, { data, loading }] = gqlService.getOrderQueueList();
    const [setReallocation] = gqlService.setReallocation();
    const [exportOrderToCsv] = gqlService.exportOrderToCsv({
        onCompleted: (res) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('order:Order_has_been_exported_successfully'),
                variant: 'success',
            });
            router.push(res.exportOrderToCsv);
        },
        onError: (e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        },
    });

    const handleExport = () => {
        window.backdropLoader(true);
        exportOrderToCsv({
            variables: {
                ...varExport,
            },
        });
    };

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
        getOrderQueueList,
        setReallocation,
        data,
        loading,
        exportOrderToCsv,
        handleExport,
        varExport,
        setVarExport,
        t,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
