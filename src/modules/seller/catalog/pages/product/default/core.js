/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-alert */
import React from 'react';
import Layout from '@layout';
import themeService from '@modules/theme/services/graphql';
import gqlService from '@sellermodules/catalog/services/graphql';
import BackdropLoad from '@helper_backdropload';
import AppModal from '@common_appmodal/index';
import { useRouter } from 'next/router';

const getPageTitle = ({ t, action, id }) => {
    switch (action) {
    case 'create': return t('common:Add_Product');
    case 'edit': return `${t('sellercatalog:Detail_Product')} #${id}`;
    case 'duplicate': return t('sellercatalog:Duplicate_Product');
    default: return t('common:Add_Product');
    }
};

export const CatalogProductContext = React.createContext();

const Core = ({
    t,
    Content,
}) => {
    const router = useRouter();
    const routerQuery = router?.query;
    const pageTab = routerQuery?.status;
    const tabChannel = routerQuery?.channel;
    const action = routerQuery?.action;
    const pageAction = action[0];
    const isTabMaster = pageTab === 'master';
    const isTabChannel = pageTab === 'channel';
    const isCreate = pageAction === 'create';
    const isEdit = pageAction === 'edit';
    const isDuplicate = pageAction === 'duplicate';
    const productId = isCreate ? null : action[1];
    const isHasProductId = productId !== null;
    const pageConfig = {
        title: getPageTitle({ t, action: pageAction, id: productId }),
        noPaddingContainer: true,
    };

    const [isDirty, setIsDirty] = React.useState(false);
    const [showConfirmation, setShowConfirmation] = React.useState(false);
    const [urlConfirmationRedirect, setUrlConfirmationRedirect] = React.useState(null);
    const { data: dataCat, loading: loadCat } = gqlService.getCategoryList();
    const { loading: loadCurrency, data: dataCurrency } = themeService.getCurrency();
    const { loading: loadSellerChannelList, data: dataSellerChannelList } = gqlService.getSellerChannelList();
    const { data: dataVariant, loading: loadVariant } = gqlService.getSellerVariantAttributes();
    const { data: configData, loading: configLoading } = themeService.getStoreConfig({
        path: 'swiftoms_vendorportal/product/general/enable_seller_create_variant',
    });
    const { data: brandConfig } = themeService.getStoreConfig({
        path: 'swiftoms_mpadapter/marketplace/no_brand',
    });
    const { data: sizeData, loading: sizeLoading } = themeService.storeConfigSize();

    const listDataChannel = dataSellerChannelList?.getSellerChannelList?.items;
    const isHasChannel = listDataChannel?.length > 0 ?? false;
    const [getSellerChannelRequest, {
        data: dataChannelProduct,
        loading: loadingDataChannelProduct,
    }] = gqlService.getSellerChannelProduct();

    const getSellerChannels = dataChannelProduct?.getSellerProduct?.channels;
    let getChannelCode = routerQuery?.channel;
    if (getSellerChannels?.length > 0) {
        getChannelCode = getSellerChannels[0]?.code;
    }
    const isParentLoadingState = configLoading || loadCat || loadVariant || loadCurrency || loadSellerChannelList || loadingDataChannelProduct
        || sizeLoading;
    const isEmptyListChannel = listDataChannel?.length < 1;
    const isEmptyListChannelProduct = getSellerChannels?.length < 1;
    const isTabChannelAdd = isEmptyListChannelProduct ? getChannelCode === 'add' : routerQuery?.channel === 'add';

    /**
    * ---------------------------------------------------- *
    * @method METHOD section method
    * @summary all method that using in this part
    * ---------------------------------------------------- *
    */
    const onPreventHandleClick = (event, link) => {
        if (isDirty) {
            event.preventDefault();
            setShowConfirmation(true);
            setUrlConfirmationRedirect(link);
        } else {
            router?.push(link);
        }
    };

    const onHandleClose = React.useCallback(() => {
        setShowConfirmation(false);
    }, []);

    const onClickConfirm = () => {
        setIsDirty(false);
        setShowConfirmation(false);
        router?.push(urlConfirmationRedirect);
    };

    /**
    * ---------------------------------------------------- *
    * @dependency [isEdit, isHasProductId, getChannelCode]
    * @summary for get channel list by product
    * ---------------------------------------------------- *
    */
    React.useEffect(() => {
        if (isEdit && isHasProductId) {
            getSellerChannelRequest({
                variables: { id: Number(productId) },
            });
        }
    }, [isEdit, isHasProductId, getChannelCode]);

    /**
    * ---------------------------------------------------- *
    * @dependency [isParentLoadingState]
    * @summary for handling loding changes
    * ---------------------------------------------------- *
    */
    React.useEffect(() => {
        BackdropLoad(isParentLoadingState);
    }, [isParentLoadingState]);

    /**
    * ---------------------------------------------------- *
    * @const {object}
    * @summary for props passing to child
    * ---------------------------------------------------- *
    */
    const contentProps = {
        t,
        router,
        routerQuery,
        tabChannel,
        isHasChannel,
        isTabMaster,
        isTabChannel,
        isEdit,
        isCreate,
        isDuplicate,
        isParentLoadingState,
        isTabChannelAdd,
        isEmptyListChannel,
        isEmptyListChannelProduct,
        getChannelCode,
        productId,
        pageTab,
        pageAction,
        listDataChannel,
        getSellerChannelRequest,
        listDataChannelProduct: dataChannelProduct?.getSellerProduct?.channels,
        categories: dataCat?.getCategoryList || [],
        enableCreateVariant: configData?.getStoreConfig === '1',
        brandConfig: brandConfig?.getStoreConfig,
        mpCode: () => {
            let splitChannel = routerQuery?.channel ? routerQuery?.channel?.split('_') : null;
            splitChannel = splitChannel && splitChannel[splitChannel?.length - 1];
            return splitChannel;
        },
        menuVariant: dataVariant?.getSellerVariantAttributes,
        currency: dataCurrency?.currency?.base_currency_symbol || dataCurrency?.currency?.base_currency_code,
        onPreventHandleClick,
        limitSizeConfig: sizeData?.storeConfig || {},
    };

    const ctxProps = {
        isDirty,
        setIsDirty,
    };

    if (isParentLoadingState) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    return (
        <Layout pageConfig={pageConfig} seller>
            <CatalogProductContext.Provider value={ctxProps}>
                <Content {...contentProps} />

                <AppModal
                    show={showConfirmation}
                    title={t('common:Confirmation')}
                    closeButton
                    onHandleClose={onHandleClose}
                    negativeLabel={t('common:no_skip')}
                    onClickNegative={onHandleClose}
                    positiveLabel={t('common:btn_next')}
                    onClickPositive={onClickConfirm}
                >
                    <div>{t('common:unsaved_changes')}</div>
                </AppModal>
            </CatalogProductContext.Provider>
        </Layout>
    );
};

export default Core;
