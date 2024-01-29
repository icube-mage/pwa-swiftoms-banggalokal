/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
import React from 'react';

import CardList from '@sellermodules/notification/pages/default/components/List';

const NotificationContent = (props) => {
    const { data, loading, getSellerNotifications, t, dataProvider } = props;
    const rows = (data && data.getSellerNotifications && data.getSellerNotifications.items) || [];
    const count = (data && data.getSellerNotifications && data.getSellerNotifications.total_count) || 0;

    return (
        <CardList
            header={t('sellernotification:Notification')}
            getRows={getSellerNotifications}
            rows={rows}
            loading={loading}
            count={count}
            showCheckbox
            searchPlaceholder={t('sellernotification:Search_notification')}
            useTabs
            t={t}
            dataProvider={dataProvider}
        />
    );
};

export default NotificationContent;
