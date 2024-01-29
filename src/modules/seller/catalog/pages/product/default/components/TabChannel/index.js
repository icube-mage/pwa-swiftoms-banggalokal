/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import BoxCardSimple from '@common_boxcardsimple/index';
import BoxCardSimpleTab from '@common_boxcardsimpletab/index';
import Button from '@common_button/index';
import AppModal from '@common_appmodal/index';
import FormChannelAssignProduct from '@root/src/modules/seller/catalog/pages/product/default/components/TabChannel/FormChannelAssign/index';
import FormChannelEmpty from '@sellermodules/catalog/pages/product/default/components/TabChannel/FormChannelEmpty/index';
import FormChannel from '@sellermodules/catalog/pages/product/default/components/TabChannel/FormChannel/index';
import gqlService from '@sellermodules/catalog/services/graphql/index';
import useStyles from '@sellermodules/catalog/pages/product/default/components/TabChannel/style';
import Show from '@common_show/index';
import { BLACK, WHITE } from '@theme_color';
import { breakPointsUp } from '@helper_theme';
import clsx from 'clsx';

const TabChannel = (props) => {
    const {
        t,
        router,
        productId,
        isParentLoadingState,
        isTabChannelAdd,
        isEmptyListChannel,
        isEmptyListChannelProduct,
        listDataChannelProduct,
        getSellerChannelRequest,
        tabChannel,
    } = props;

    const [showConfirmation, setShowConfirmation] = React.useState(false);
    const [deletedProductItem, setDeletedProductItem] = React.useState(null);
    const [onDeleteSellerChannelProduct] = gqlService.deleteSellerChannelProduct();
    const [selectedChannel, setSelectedChannel] = React.useState(null);
    const [loadingFormAssign, setLoadingFormAssign] = React.useState(true);
    const isFormAssignSelectedChannel = selectedChannel != null;
    const queryPath = tabChannel ? { status: 'channel', channel: tabChannel } : { status: 'channel' };
    const urlRedirect = { pathname: `/seller/catalog/product/edit/${productId}`, query: queryPath };
    const ctxCatalogProduct = props?.ctxCatalogProduct;
    const isDirty = ctxCatalogProduct?.isDirty ?? false;
    const setIsDirty = ctxCatalogProduct?.setIsDirty ?? null;
    const onPreventHandleClick = props?.onPreventHandleClick;
    const classes = useStyles();
    const desktop = breakPointsUp('sm');
    const padding = desktop ? 30 : 15;

    const onHandleClose = React.useCallback(() => {
        setShowConfirmation(false);
    }, []);

    const onCloseTabCallback = (item) => {
        setShowConfirmation(true);
        setDeletedProductItem(item);
    };

    const onClickDeleteProductItem = () => {
        const deletedItemChannelCode = deletedProductItem?.code;
        window.backdropLoader(false);
        onDeleteSellerChannelProduct({
            variables: {
                id: Number(productId),
                channel_code: deletedItemChannelCode,
            },
        })
            .then((res) => {
                const isSuccess = res?.data?.deleteSellerChannelProduct;
                window.backdropLoader(false);
                onHandleClose();
                if (isSuccess) {
                    getSellerChannelRequest({
                        variables: { id: Number(productId) },
                    });
                    // redirect default channel after delete
                    router.push({
                        ...urlRedirect,
                        query: { status: 'channel' },
                    });
                }
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

    const propsChild = {
        ctxCatalogProduct,
        isDirty,
        setIsDirty,
        onPreventHandleClick,
        classes,
        urlRedirect,
        selectedChannel,
        onCloseTabCallback,
        setSelectedChannel,
        setLoadingFormAssign,
    };

    if (isParentLoadingState) return null;

    if (isEmptyListChannel) {
        return (
            <div id="product-tab-channel-container" className={classes.productTabChannelContainer}>
                <BoxCardSimple
                    bg={WHITE}
                    border={1}
                    borderRadius={5}
                    marginTop={10}
                    padding={padding}
                    title={t('common:to_add_product_create_channel')}
                    content={(
                        <FormChannelEmpty {...props} {...propsChild} />
                    )}
                />
            </div>
        );
    }

    if (isTabChannelAdd) {
        return (
            <div id="product-tab-channel-container" className={clsx(classes.productTabChannelContainer)}>
                <BoxCardSimple
                    bg={WHITE}
                    border={1}
                    borderRadius="0px 5px 5px 5px"
                    marginTop={-1}
                    padding={padding}
                    headerComponent={(
                        <BoxCardSimpleTab
                            onPreventHandleClick={onPreventHandleClick}
                            urlPlusHref="/seller/catalog/product/create"
                            isDirty={isDirty}
                            setIsDirty={setIsDirty}
                            dataTabs={listDataChannelProduct}
                            isEmptyListChannelProduct={isEmptyListChannelProduct}
                            onCloseTabCallback={onCloseTabCallback}
                        />
                    )}
                    title={isFormAssignSelectedChannel ? null : t('sellercatalog:choose_store_to_add_product')}
                    titleButtonComponent={isFormAssignSelectedChannel ? null : (
                        <Button
                            nextLink="/seller/saleschannels/storeintegration"
                            bg={WHITE}
                            color={BLACK}
                            border={1}
                            classic
                            classicButtonIcon={<img src="/assets/img/icon_plus.svg" alt="icon plus" />}
                            classicButtonLabel={t('common:add_new_store')}
                        />
                    )}
                    content={(
                        <>
                            <Show when={loadingFormAssign}>
                                {`${t('common:loading')}...`}
                            </Show>
                            <FormChannelAssignProduct {...props} {...propsChild} />
                        </>
                    )}
                />

                <AppModal
                    className={classes.appModalItemChannel}
                    show={showConfirmation}
                    title={t('common:are_you_sure_want_to_delete_this_data')}
                    closeButton
                    onHandleClose={onHandleClose}
                    negativeLabel={t('common:no_skip')}
                    onClickNegative={onHandleClose}
                    positiveLabel={t('common:Delete')}
                    onClickPositive={onClickDeleteProductItem}
                />
            </div>
        );
    }

    return (
        <>
            <FormChannel {...props} {...propsChild} />
            <AppModal
                className={classes.appModalItemChannel}
                show={showConfirmation}
                title={t('common:are_you_sure_want_to_delete_this_data')}
                closeButton
                onHandleClose={onHandleClose}
                negativeLabel={t('common:no_skip')}
                onClickNegative={onHandleClose}
                positiveLabel={t('common:Delete')}
                onClickPositive={onClickDeleteProductItem}
            />
        </>
    );
};

export default TabChannel;
