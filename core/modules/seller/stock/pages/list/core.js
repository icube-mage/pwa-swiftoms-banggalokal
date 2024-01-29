import React from 'react';
import Layout from '@layout';
import gqlService from '@sellermodules/stock/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;
    const router = useRouter();
    const pageConfig = {
        title: t('sellerstock:Stock'),
    };
    const [detail, setDetail] = React.useState({});
    const [getSellerStocks, { data, loading, refetch }] = gqlService.getSellerStocks();
    const [downloadSellerStocks] = gqlService.downloadSellerStocks();
    const [editSellerStock] = gqlService.editSellerStock();
    const { data: dataLoc, loading: loadLoc } = gqlService.getSellerStoreOptions();
    const totalLoc = dataLoc?.getSellerStoreOptions?.length;
    const [open, setOpen] = React.useState(false);

    const handleDownload = (source_id) => {
        window.backdropLoader(true);
        downloadSellerStocks({
            variables: { source_id },
        }).then((res) => {
            router.push(res.data.downloadSellerStocks);
            window.backdropLoader(false);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const handleDownloadAll = (selected, clicked) => {
        if (clicked) {
            const selectedArray = selected.map((e) => Number(e.value));
            setOpen(false);
            window.backdropLoader(true);
            downloadSellerStocks({
                variables: { loc_id: selectedArray },
            }).then((res) => {
                router.push(res.data.downloadSellerStocks);
                window.backdropLoader(false);
            }).catch((e) => {
                setOpen(true);
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
        } else if (totalLoc > 1) {
            setOpen(true);
        } else {
            window.backdropLoader(true);
            downloadSellerStocks({
                variables: { source_id: [] },
            }).then((res) => {
                router.push(res.data.downloadSellerStocks);
                window.backdropLoader(false);
            }).catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
        }
    };

    const handleEdit = () => {
        const temp = { ...detail };
        window.backdropLoader(true);
        setDetail({});
        editSellerStock({
            variables: {
                input: {
                    qty: Number(detail.qty_saleable),
                    source_id: detail.source_id,
                },
            },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('sellerstock:Product_stock_has_been_updated'),
                variant: 'success',
            });
            refetch();
        }).catch((e) => {
            setDetail(temp);
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    React.useEffect(() => {
        BackdropLoad(loadLoc);
    }, [loadLoc]);

    if (loadLoc) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    const contentProps = {
        ...props,
        getSellerStocks,
        data,
        loading,
        refetch,
        handleDownload,
        handleDownloadAll,
        detail,
        setDetail,
        handleEdit,
        dataLocations: dataLoc?.getSellerStoreOptions || [],
        open,
        setOpen,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
