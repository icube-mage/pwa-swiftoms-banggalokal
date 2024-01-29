/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import Badge from '@material-ui/core/Badge';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import useStyles from '@sellermodules/chat/pages/default/components/style';
import formatDate from '@root/core/helpers/date';
import { initialName } from '@sellermodules/chat/helpers/index';
import clsx from 'clsx';

const User = (props) => {
    const {
        chat,
        selectUserToChat,
        user,
        db,
    } = props;
    const classes = useStyles();
    const [dataUnread, setDataUnread] = useState([]);
    const chatId = user && user.chatId;
    const activeChat = () => (chatId === chat.chatId ? 'active' : 'unactive');

    useEffect(() => {
        const refereceUserDb = db.collection('messages');
        const customerUnreadQuery = refereceUserDb
            .doc(chatId)
            .collection('chat')
            .where('is_admin_read', 'in', [0]);

        const unsub = customerUnreadQuery.onSnapshot((querySnapshot) => {
            const adminUnread = querySnapshot.docs.map((doc) => doc.data());
            setDataUnread(adminUnread);
        });

        return unsub;
    }, [chatId]);

    const agentEmail = user && user.customer_email;
    const [dataStatus, setDataStatus] = React.useState('0');
    const doc = db.collection('status').doc(agentEmail);
    doc.onSnapshot((docSnapshot) => {
        const agentStatus = docSnapshot.data();
        setDataStatus(agentStatus?.status);
    });

    return (
        <div onClick={() => selectUserToChat(user)} className={classes.userWrapper}>
            <div className={clsx(classes.userContent, activeChat())}>
                <div className={classes.userImage}>
                    {/* <img alt="" src="/assets/img/userchat.svg" /> */}
                    <span>
                        {initialName(user.customer_name)}
                    </span>
                </div>
                <div className={classes.userText}>
                    <div className={classes.userName}>
                        {user.customer_name}
                        <FiberManualRecordIcon
                            className={`${classes.userStatus} ${dataStatus === '1' ? classes.onlineStatus : classes.offlineStatus}`}
                        />
                    </div>
                    <div className={classes.userLastMessage}>{user.lastMessage.message}</div>
                </div>
                <div className={classes.userInfo}>
                    <div className={classes.userDate}>
                        {formatDate(user.lastMessage.time, 'HH:mm')}
                    </div>
                    <Badge
                        badgeContent={dataUnread.length}
                        invisible={dataUnread && dataUnread.length === 0}
                        color="error"
                        classes={{
                            root: classes.customBadge,
                        }}
                        overlap="rectangular"
                    />
                </div>
            </div>
        </div>
    );
};

export default User;
