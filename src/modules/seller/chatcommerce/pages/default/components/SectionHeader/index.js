/* eslint-disable */
import React from 'react';
import useStyles from '@sellermodules/dashboard/pages/default/components/sectionHeader/style';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Button from '@common_button';
import { WHITE, BLACK } from '@theme_color';
import { getStoreConfig } from '@sellermodules/chat/services/graphql/index';
import Cookies from 'js-cookie';
import { decrypt } from '@helper_encryption';
import { sendDataLayer } from '@helper_gtm';
import gqlService from '@sellermodules/storelist/services/graphql';

const SectionHeader = ({ t, dataSeller, loadingSeller }) => {
    const classes = useStyles();

    const [getSellerChannelList, { data }] = gqlService.getSellerChannelList();
    const [loadChannel, setLoadChannel] = React.useState(false);

    React.useEffect(async () => {
        if (loadChannel === false) {
            await getSellerChannelList({variables: {
                pageSize: 100,
                currentPage: 1,
            }});
            setLoadChannel(true);
        }
    });

    const channelList = data?.getSellerChannelList?.items?.filter((e) => e?.marketplace_chat_status === 1) || [];

    const { data: dataChat } = getStoreConfig({
        path: 'swiftoms_vendorportal/seller_chat/chat_redirect_url',
    });

    const redirectUrl = dataChat && dataChat.getStoreConfig;
    const getToken = () => {
        try {
            return decrypt(Cookies.get("t_id"));
        } catch (e) {}
        return '';
    };

    const goToChat = () => {
        const dataLayer = {
            event: 'chat_dashboard',
            eventLabel: 'Chat - Enter Dashboard',
        };
        sendDataLayer(dataLayer);
        window.location.href=`${redirectUrl}?token=${getToken()}`;
    };


    return (
        <div className={classes.sectionHeaderContainer}>
            <div className={classNames('section-header-title', classes.sectionHeaderTitle)}>
                <span>{t('chatcommerce:commerce_title')}</span>
            </div>
            { channelList.length > 0 && (
                <div className={classNames('section-header-content', classes.sectionHeaderContent)}>
                    <Grid className={classes.sectionHederContentContainer} container>
                        <Grid className={classes.sectionContentRight} item md={8} sm={4} xs={12} onClick={() => goToChat()}>
                            <Button
                                bg={WHITE}
                                color={BLACK}
                                classic
                                classicButtonLabel={t('enter_chat')}
                            />
                        </Grid>
                    </Grid>
                </div>
            )}
        </div>
    );
};

export default SectionHeader;
