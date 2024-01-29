/* eslint-disable no-plusplus */
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

    const capitalizeStatus = () => {
        const words = router.query?.tab_status.split('_');
        if (words?.length && words[0] === 'complete') {
            return 'Completed';
        }
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        if (words[0] === 'Order') {
            return t(`order:${words.slice(1).join(' ')}`);
        }
        return t(`order:${words.join(' ').replace('Order', '')}`);
    };

    const pageConfig = {
        title: capitalizeStatus(),
        customBreadcrumb: [
            { url: '', label: 'Order' },
            { url: router.asPath, label: capitalizeStatus() },
        ],
    };

    const tab_status = router && router.query && router.query.tab_status;
    const isSales = tab_status === 'complete' || tab_status === 'shipment_processing';
    const [load, setLoad] = React.useState(false);
    const [varExport, setVarExport] = React.useState({});
    const [getOrderQueueList, { data, loading }] = gqlService.getOrderQueueList();
    const [getSalesOrderList, { data: dataSales, loading: loadingSales }] = gqlService.getSalesOrderList();
    const [setReallocation] = gqlService.setReallocation({
        onCompleted: (res) => {
            window.backdropLoader(false);
            if (res.setReallocation) {
                window.toastMessage({
                    open: true,
                    text: t('order:A_total_of_valuescount_orders_have_been_updated', { values: { count: res.setReallocation } }),
                    variant: 'success',
                });
            } else {
                throw new Error(t('order:No_orders_have_been_updated'));
            }
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
    const [setOrderAsNew] = gqlService.setOrderAsNew({
        onCompleted: (res) => {
            window.backdropLoader(false);
            if (res.setOrderAsNew) {
                window.toastMessage({
                    open: true,
                    text: t('order:A_total_of_valuescount_orders_have_been_updated', { values: { count: res.setOrderAsNew } }),
                    variant: 'success',
                });
            } else {
                throw new Error(t('order:No_orders_have_been_updated'));
            }
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
    const [exportOrderToCsv] = gqlService.exportOrderToCsv({
        onCompleted: (res) => {
            window.backdropLoader(false);
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

    const contentProps = {
        getOrderQueueList,
        setReallocation,
        setOrderAsNew,
        data,
        loading,
        exportOrderToCsv,
        varExport,
        setVarExport,
        tab_status,
        t,
        headerTitle: capitalizeStatus(),
        getSalesOrderList,
        dataSales,
        loadingSales,
        isSales,
    };

    React.useEffect(() => {
        if (tab_status) {
            setLoad(true);
            setTimeout(() => { setLoad(false); }, 1000);
        }
    }, [tab_status]);

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_sales_order_queue',
    });

    React.useEffect(() => {
        BackdropLoad(load || aclCheckLoading);
    }, [load, aclCheckLoading]);

    if (load || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
