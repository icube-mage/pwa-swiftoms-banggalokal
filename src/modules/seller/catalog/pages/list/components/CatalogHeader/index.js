/* eslint-disable */
import React from 'react';
import Button from '@common_button/index';
import useStyles from '@sellermodules/catalog/pages/list/components/CatalogHeader/style';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import { BLACK, WHITE, PRIMARY, DISABLED } from '@theme_color';
import gqlService from '@sellermodules/catalog/services/graphql/index';
import gqlSeller from '@sellermodules/storesetting/services/graphql';
import { getLocalStorage, setLocalStorage } from '@helper_localstorage';
import configGqlService from '@modules/theme/services/graphql';

import Alert from '@common_alert';

const CatalogHeader = ({
    t,
    catalogStatus,
    setShowUploadProduct,
    exportSellerProduct,
    exportSellerProductAll,
    refresh,
    setModalType,
    dataSellerChannelList,
}) => {
    const classes = useStyles();

    const [getActivity] = gqlService.getActivity();
    const { data: sellerData } = gqlSeller.getSeller();
    const companyId = sellerData?.getSeller?.id;
    const [pullStatus, setPullStatus] = React.useState(getLocalStorage('pull_status'));
    const [alertCatalog, setAlertCatalog] = React.useState(getLocalStorage('alert_catalog'));
    const [isPullPending] = React.useState({});
    const sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const updatePullActivity = async () => {
        for (const item of dataSellerChannelList) {
            await sleep(5000);
            const req = await getActivity({variables: {
                code: `pull_seller_product_${item.channel_id}`,
                by_session: false
            }});
            
            const reqResult = req?.data?.getActivity || false;
            if (reqResult?.run_status) {
                if (['pending', 'running'].includes(reqResult?.run_status)) {
                    let pathname = window?.location?.pathname;
                    if (pathname && !pathname.includes('seller/catalog') || pathname.includes('seller/catalog/product')) {
                        return false;
                    }
                    setPullStatus('pending');
                    setLocalStorage('pull_status', 'pending');
                    isPullPending[`channel_${item.channel_id}`] = false;
                    setTimeout(() => updatePullActivity(), 10000);
                    return false;
                } else if ((reqResult?.run_status === 'finished' && getLocalStorage('pull_status'))) {
                    let pendingCounter = 0;
                    Object.keys(isPullPending).forEach(key => {
                        if (isPullPending[key] === false) {
                            pendingCounter += 1;
                        }
                    });
                    if (pendingCounter === 0) {
                        setPullStatus('finished');
                        setLocalStorage('pull_status', 'finished');
                        refresh.setRefresh(true);
                    }
                    isPullPending[`channel_${item.channel_id}`] = true;
                } else if ((reqResult?.run_status === 'finished' && !getLocalStorage('pull_status'))) {
                    let pendingCounter = 0;
                    Object.keys(isPullPending).forEach(key => {
                        if (isPullPending[key] === false) {
                            pendingCounter += 1;
                        }
                    });
                    if (pendingCounter === 0) {
                        setPullStatus('');
                        setLocalStorage('pull_status', null);
                        refresh.setRefresh(true);
                    }                    
                    isPullPending[`channel_${item.channel_id}`] = true;
                }
            } else {
                let pendingCounter = 0;
                Object.keys(isPullPending).forEach(key => {
                    if (isPullPending[key] === false) {
                        pendingCounter += 1;
                    }
                });
                if (pendingCounter === 0) {
                    setPullStatus('');
                    setLocalStorage('pull_status', null);
                    refresh.setRefresh(true);
                }
            }
        }
    };

    React.useEffect(() => {
        updatePullActivity();
    }, [companyId, refresh]);

    const onExportProduct = async () => {
        window.backdropLoader(true);
        let res = null; let
            statusLabel = null;
        switch (catalogStatus) {
        case 'all':
            statusLabel = t('common:all_product');
            res = await exportSellerProductAll();
            break;
        case 'active':
            statusLabel = `${t('common:product_active') } ${ t('common:Product')}`;
            res = await exportSellerProduct({ variables: { status: true } });
            break;
        case 'inactive':
            statusLabel = `${t('common:product_nonactive') } ${ t('common:Product')}`;
            res = await exportSellerProduct({ variables: { status: false } });
            break;
        default:
            statusLabel = t('common:all_product');
            res = await exportSellerProductAll();
            break;
        }
        window.backdropLoader(false);
        if (res?.data?.exportSelerProduct?.success) {
            window.toastMessage({
                variant: 'success',
                open: true,
                text: (
                    <span>
                        {`${t('common:export_product_success', { status: statusLabel })}. ${t('common:check_and_download')} ${t('common:in')}`}
                        <Link href="/seller/report/history">
                            <a style={{ textDecoration: 'underline', color: PRIMARY }}>
                                {t('common:report_seller_history')}
                            </a>
                        </Link>
                    </span>
                ),
            });
        } else if (res?.errors[0]?.message) {
            window.toastMessage({
                variant: 'error',
                text: res?.errors[0]?.message || t('Failed'),
                open: true,
            });
        }
    };

    const onShowModalUploadProduct = React.useCallback(() => {
        setShowUploadProduct(true);
        setModalType("push");
    }, []);

    const onShowModalPullProduct = React.useCallback(() => {
        setShowUploadProduct(true);
        setModalType("pull");
    }, []);

    const { data: dataDocs } = configGqlService.getStoreConfig({
        path: 'swiftoms_vendorportal/seller_docs/product_catalog',
    });
    const handleClickDocs = () => {
        window.open(dataDocs?.getStoreConfig);
    };

    return (
        <div id="catalog-header" className="catalog-header">
            <Grid className={classes.sectionCatalogHeaderContainer} container>
                <Grid className={classes.sectionContentLeft} item sm={4} xs={12}>
                    {
                        catalogStatus !== 'failed' && (
                            <Button
                                className="section-content-left-button"
                                bg={WHITE}
                                color={BLACK}
                                border={1}
                                classic
                                classicButtonOnClick={onExportProduct}
                                classicButtonLabel={t('common:export_data')}
                                classicButtonIcon={(
                                    <img src="/assets/img/icon_document.svg" alt="icon document" />
                                )}
                            />
                        )
                    }
                    <Button
                        className="section-content-left-button"
                        classicButtonOnClick={handleClickDocs}
                        bg={WHITE}
                        color={BLACK}
                        border={1}
                        classic
                        classicButtonLabel={t('common:help')}
                        classicButtonIcon={(
                            <img src="/assets/img/icon_help.svg" alt="icon edit" />
                        )}
                    />
                </Grid>
                <Grid className={classes.sectionContentRight} item sm={8} xs={12}>
                    <Button
                        className="section-content-right-button"
                        bg={WHITE}
                        color={BLACK}
                        border={1}
                        classic
                        classicButtonLabel={t('common:pull_product')}
                        marginRightTextHelper={5}
                        textHelpPlacement="bottom"
                        classicButtonOnClick={() => onShowModalPullProduct()}
                    />
                    <Button
                        className="section-content-right-button"
                        bg={WHITE}
                        color={BLACK}
                        border={1}
                        classic
                        classicButtonLabel={t('common:push_product')}
                        marginRightTextHelper={5}
                        textHelpPlacement="bottom"
                        classicButtonOnClick={onShowModalUploadProduct}
                    />
                    <Button
                        className="section-content-right-button"
                        nextLink="/seller/catalog/product/create"
                        classic
                        classicButtonLabel={t('common:add_list_product')}
                        classicButtonIcon={(
                            <img src="/assets/img/dashboard/icon_add.svg" alt="icon edit" />
                        )}
                    />
                </Grid>
            </Grid>

            {alertCatalog !== false && (
                <div className={classes.divAlert}>
                    <Alert
                        titleMultiple={[
                            {
                                title: `${t('common:pull_product')}`,
                                info: `${t('sellercatalog:section_info_pull_product')}`,
                            },
                            {
                                title: `${t('common:push_product')}`,
                                info: `${t('sellercatalog:section_info_push_product')}`,
                            },
                        ]}
                        close={() => {
                            setLocalStorage('alert_catalog', false);
                            setAlertCatalog(false);
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default CatalogHeader;
