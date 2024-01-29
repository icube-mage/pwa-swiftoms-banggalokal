/* eslint-disable */
import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@common_button';
import Card from '@sellermodules/storeintegration/pages/list/components/Card';
import { BLACK, WHITE } from '@theme_color';
import useStyles from '@sellermodules/storeintegration/pages/list/components/style';
import Tabs from '@common_tabsseller';
import ModalDialog from '@sellermodules/storeintegration/pages/list/components/Card/createStoreModal';
import Alert from '@common_alert';
import configGqlService from '@modules/theme/services/graphql';
import AppModal from '@common_appmodal/index';

const MarketplaceListContent = (props) => {
    const { data, t, handleIntegrate, getWebstoreList, webstoreInput, isEnableChat, chatModal } = props;

    const classes = useStyles();

    const [activeTab, setActiveTab] = React.useState('marketstore');
    const storeList = ['chat', 'marketstore'].includes(activeTab) ? (
        activeTab === 'marketstore' ? 
            data?.filter((e) => !e?.marketplace_code?.toLowerCase()?.includes('chat') && !e?.marketplace_code?.toLowerCase()?.includes('shopify')) : 
            data?.filter((e) => e?.marketplace_code?.toLowerCase()?.includes('chat'))
        ) : getWebstoreList;

    const dataTabs = [
        { label: t('sellerstorelist:Marketplace_Store'), value: 'marketstore' },
        { label: t('sellerstorelist:Webstore'), value: 'webstore' },
        ...(isEnableChat ? [{ label: t('chat_commerce'), value: 'chat' }] : []),
    ];

    const mappingTab = (key) => {
        try {
            const [{value}] = dataTabs?.filter((e) => e.label === key);
            setActiveTab(value);
        } catch (e) {}

        return 'marketstore';
    };

    const { data: dataDocs } = configGqlService.getStoreConfig({
        path: 'swiftoms_vendorportal/seller_docs/marketplace_integration',
    });
    const handleClickDocs = () => {
        window.open(dataDocs?.getStoreConfig);
    };

    return (
        <div className={classes.container}>
            <div className={classes.headerContainer}>
                <div className={classes.header}>{t('sellerstoreintegration:Store_Integration')}</div>
                <Button
                    className="help-button"
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
            </div>
            <Alert
                info={ t('sellerstorelist:section_info_integrate_header')}
            />
            <div className={classes.tabsContainer}>
                <Tabs data={dataTabs} onChange={(e) => mappingTab(e.target.innerHTML)} value={activeTab} allItems={false} />
            </div>

            {!storeList?.length || !storeList[0]?.marketplace_code ? <div className={classes.noText}>{t('no_store')}</div> : (
                <Grid container spacing={3}>
                    {storeList.map((mp) => mp.marketplace_code && (
                        <Grid key={mp.marketplace_code} item xs={12} lg={4}>
                            <Card {...props} t={t} mp={mp} handleIntegrate={handleIntegrate} activeTab={activeTab} />
                        </Grid>
                    ))}
                </Grid>
            )}

            <ModalDialog
                classes={classes}
                webstoreInput={webstoreInput}
                getWebstoreList={getWebstoreList}
                setActiveTab={setActiveTab}
                t={t}
            />

            <AppModal
                title={t('sellerstoreintegration:Select_Marketplace')}
                show={chatModal.open}
                onHandleClose={() => {
                    chatModal.setOpen(false);
                }}
                closeButton="x"
            >
                { chatModal.loading === true ? t('sellerstoreintegration:please_wait') : <>
                    { chatModal?.channels?.length > 0 && (<>
                            <p>{t('sellerstoreintegration:You_must_be_connected_to_the_marketplace_whose_chat_service_you_want_to_use')}</p>
                            { chatModal?.channels?.map((item) => <div onClick={() => {
                                handleIntegrate(`${item?.marketplace_code?.toUpperCase()}-CHAT`, item.brand_id);
                            }} className={classes.selectParent}>
                                <img src={item.image_url} className={classes.icon} />
                                <span style={{ fontSize: 15, marginLeft: 10 }}>{item.channel_name}</span>
                            </div>)}
                        </>
                        )}
                    </>
                }

                {chatModal?.channels?.length === 0 && (<>
                    <p>{t('sellerstoreintegration:To_be_able_to_connect_to_the_marketplace_chat_service_Make_sure_your_account_is_connected_to_the_marketplaced')}</p>
                </>)}
            </AppModal>
        </div>
    );
};

export default MarketplaceListContent;
