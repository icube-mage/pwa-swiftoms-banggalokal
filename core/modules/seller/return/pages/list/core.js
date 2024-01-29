import React from 'react';
import Layout from '@layout';
import gqlService from '@sellermodules/return/services/graphql';
import gqlTheme from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;
    const pageConfig = {
        title: t('sellerreturn:Return'),
    };

    const [getSellerReturnList, { data, loading }] = gqlService.getSellerReturnList();
    const { data: dataLoc, loading: loadLoc } = gqlService.getSellerStoreOptions();
    const { loading: loadingReturnType, data: dataReturnType } = gqlTheme.getStoreConfig({
        path: 'swiftoms_rma/rma_request/return_type',
    });
    const { data: dataStatus, loading: loadStatus } = gqlService.getRmaStatusList({
        pageSize: 1000,
        currentPage: 1,
        sort: { position: 'ASC' },
    });

    React.useEffect(() => {
        BackdropLoad(loadLoc || loadingReturnType || loadStatus);
    }, [loadLoc, loadingReturnType, loadStatus]);

    if (loadLoc || loadingReturnType || loadStatus) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    const contentProps = {
        ...props,
        getSellerReturnList,
        data,
        loading,
        dataLocations: dataLoc?.getSellerStoreOptions || [],
        dataReturnType: dataReturnType.getStoreConfig ? Object.values(JSON.parse(dataReturnType.getStoreConfig)) : [],
        dataStatus: dataStatus?.getRmaStatusList?.items || [],
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
