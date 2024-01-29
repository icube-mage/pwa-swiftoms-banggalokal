/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import cookies from 'js-cookie';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import 'dayjs/locale/en';

import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';

import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Button from '@common_button/index';

import helperCookies from '@helper_cookies';
import { relativeTimeFrom } from '@sellermodules/notificationupdate/helpers/index';
import useStyles from '@sellermodules/notificationupdate/pages/default/components/style';

const NotificationContent = (props) => {
    const {
        t, dataNotif, loadMore, handleLoadMore,
    } = props;
    const classes = useStyles();
    const [userData, setUserData] = useState({});

    const initialLanguage = helperCookies.get('language');
    dayjs.locale(initialLanguage);

    useEffect(() => {
        setUserData(cookies.getJSON('cdt'));
    }, []);

    return (
        <div className={classes.container}>
            <Paper className={classes.paperContainer}>
                <div className="p30 pb25">
                    <div className="bold f20 mb10">
                        {`${t('sellernotification:Hello')}, ${userData?.firstname} ${userData?.lastname}`}
                    </div>
                    <div className="bold f14 mb20">
                        {dayjs().format('dddd, DD MMMM YYYY')}
                    </div>
                    <Divider />
                    {!dataNotif?.items?.length && (
                        <div className="mt20 bold center">
                            {t('common:There_is_no_update_information_at_this_time')}
                        </div>
                    )}
                    {dataNotif?.items?.map((dt, i) => (
                        <div key={dt.entity_id}>
                            <div className={`${i === dataNotif?.items?.length - 1 ? '' : 'mb20'} mt20`}>
                                <div className="flex-between mobile-block mb10 gap5">
                                    <div className="flex bold">
                                        <ErrorOutlineIcon classes={{ root: clsx(classes.iconRoot, 'primary') }} />
                                        {dt.title}
                                    </div>
                                    <div className="flex gap5 end-mobile">
                                        <AccessTimeIcon classes={{ root: classes.iconRoot }} />
                                        {relativeTimeFrom(dt.inserted_at, t)}
                                    </div>
                                </div>

                                <div className={classes.updateContent}>
                                    <div dangerouslySetInnerHTML={{ __html: dt.content }} />
                                    {!!dt.image && <img src={dt.image} alt="img-content" />}
                                </div>
                            </div>
                            {i !== dataNotif?.items?.length - 1
                                && <Divider />}
                        </div>
                    ))}
                </div>
                {loadMore && <div className={classes.progress}><CircularProgress size={48} /></div>}
                <Divider />
                {!loadMore && dataNotif?.items?.length < dataNotif?.total_count
                && (
                    <div className="p20 center">
                        <Button
                            buttonType="buttonText"
                            classes={{ root: classes.seeMore }}
                            onClick={handleLoadMore}
                        >
                            {t('sellernotification:see_more_down')}
                            <ExpandMoreIcon classes={{ root: clsx(classes.iconRoot, 'primary') }} />
                        </Button>
                    </div>
                )}
            </Paper>
        </div>
    );
};

export default NotificationContent;
